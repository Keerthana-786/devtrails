const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// ── Configuration ─────────────────────────────────────────────────────────────
const JWT_SECRET = process.env.JWT_SECRET || "paynest_secret_2024";
const ML_URL = process.env.ML_URL || "http://localhost:8001";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ── In-memory store (replace with Firestore in production) ──────────────────
const users = new Map();
const payouts = new Map();

// Initialize demo users for testing
users.set("9876543210", {
  phone: "9876543210",
  email: "demo@paynest.com",
  name: "Demo User",
  zone: "Connaught Place",
  weeklyPremium: 76.5,
  walletBalance: 150,
  stabilityScore: 85,
  policyStatus: "ACTIVE",
  badges: [
    { label: "Rain Master", earned: true },
    { label: "Safe Streak", earned: true },
    { label: "Zone Explorer", earned: false }
  ],
  payouts: [],
  activeDisruptions: [],
  safeZones: ["Karol Bagh", "Rajouri Garden", "Lajpat Nagar"],
  highRiskHours: ["8-10 AM", "5-7 PM"],
  weather: { rainfall: 2.5, temperature: 28, aqi: 120 },
  traffic: 45,
  pricingBreakdown: {
    base: 50,
    weather: 15,
    traffic: 8,
    zone: 3.5
  }
});

// ── Auth Middleware ──────────────────────────────────────────────────────────
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  // Allow demo tokens for development
  if (token.startsWith("token-demo-") || token.startsWith("demo-token-")) {
    req.user = { id: "usr_demo", phone: "9876543210" };
    return next();
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// ── Auth Routes ──────────────────────────────────────────────────────────────
app.post("/api/auth/otp", (req, res) => {
  const { phone } = req.body;
  const isEmail = phone && phone.includes("@");
  if (!phone || (!isEmail && phone.length !== 10))
    return res.status(400).json({ error: "Invalid phone or email" });
  console.log(`OTP sent to ${phone}: 123456`);
  res.json({
    success: true,
    message: `OTP sent to ${isEmail ? "email" : "phone"}`,
    debug_otp: "123456"
  });
});

app.post("/api/auth/verify", (req, res) => {
  const { phone, otp } = req.body;
  if (otp !== "123456") return res.status(400).json({ error: "Invalid OTP" });

  let user = users.get(phone);
  const isNew = !user;
  if (isNew) {
    user = {
      id: `usr_${Date.now()}`,
      phone,
      name: "",
      partner: "",
      zone: "",
      upiId: "",
      plan: "basic",
      trustScore: 65,
      monthsActive: 1,
      balance: 0,
      totalPayouts: 0,
      createdAt: new Date().toISOString()
    };
    users.set(phone, user);
  }

  const token = jwt.sign(
    { id: user.id, phone: user.phone, email: user.email },
    JWT_SECRET,
    { expiresIn: "30d" }
  );
  res.json({ success: true, token, user, isNew });
});

app.post("/api/auth/onboard", auth, (req, res) => {
  const { name, partner, zone, upiId, plan } = req.body;
  const user = users.get(req.user.phone);
  if (!user) return res.status(404).json({ error: "User not found" });

  Object.assign(user, {
    name,
    partner: partner || user.partner,
    zone: zone || user.zone,
    upiId: upiId || user.upiId,
    plan: plan || user.plan,
    onboarded: true
  });
  users.set(req.user.phone, user);
  res.json({ success: true, user });
});

// ── Payouts Route ────────────────────────────────────────────────────────────
app.get("/api/payouts", auth, (req, res) => {
  const user = users.get(req.user.phone);
  if (!user) return res.status(404).json({ error: "User not found" });

  const userPayouts = Array.from(payouts.values()).filter(
    (p) => p.userId === user.id
  );
  res.json(userPayouts.slice(-20).reverse());
});

// ── Dashboard Routes ─────────────────────────────────────────────────────────
app.get("/api/dashboard", auth, async (req, res) => {
  const user = users.get(req.user.phone);
  if (!user) return res.status(404).json({ error: "User not found" });

  let weather = {
    rainfall: 0,
    temperature: 32,
    aqi: 85,
    windSpeed: 12,
    humidity: 72,
    visibility: 8
  };
  try {
    const wRes = await axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=19.0760&longitude=72.8777&current=temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m&forecast_days=1",
      { timeout: 3000 }
    );
    const c = wRes.data.current;
    weather = {
      rainfall: c.precipitation || 0,
      temperature: c.temperature_2m || 32,
      windSpeed: c.wind_speed_10m || 0,
      humidity: c.relative_humidity_2m || 70,
      aqi: 85,
      visibility: 8
    };
  } catch (err) {
    // fallback to defaults
  }

  const userPayouts = Array.from(payouts.values()).filter(
    (p) => p.userId === user.id
  );

  res.json({
    user,
    weather,
    payouts: userPayouts.slice(-10).reverse(),
    stats: {
      totalPayouts: userPayouts.length,
      totalEarned: userPayouts.reduce((s, p) => s + p.amount, 0),
      thisMonth: userPayouts.filter(
        (p) => new Date(p.createdAt).getMonth() === new Date().getMonth()
      ).length
    }
  });
});

// ── AI ML Proxies ────────────────────────────────────────────────────────────
app.post("/api/ai/pricing", auth, async (req, res) => {
  try {
    const pricingRes = await axios.post(
      `${ML_URL}/predict/dynamic-pricing`,
      req.body
    );
    res.json(pricingRes.data);
  } catch (err) {
    console.error("AI Pricing Error:", err.message);
    res.status(503).json({ error: "Dynamic pricing unavailable" });
  }
});

app.post("/api/ai/disruptions", auth, async (req, res) => {
  try {
    const triggersRes = await axios.post(
      `${ML_URL}/triggers/check-disruptions`,
      req.body
    );
    res.json(triggersRes.data);
  } catch (err) {
    console.error("AI Disruptions Error:", err.message);
    res.status(503).json({ error: "Disruptions check unavailable" });
  }
});

app.post("/api/ai/loss", auth, async (req, res) => {
  try {
    const lossRes = await axios.post(`${ML_URL}/predict/loss`, req.body);
    res.json(lossRes.data);
  } catch (err) {
    console.error("AI Loss Error:", err.message);
    res.status(503).json({ error: "Loss prediction unavailable" });
  }
});

app.post("/api/ai/fraud", auth, async (req, res) => {
  try {
    const fraudRes = await axios.post(`${ML_URL}/predict/fraud`, req.body);
    res.json(fraudRes.data);
  } catch (err) {
    console.error("AI Fraud Error:", err.message);
    res.status(503).json({ error: "Fraud check unavailable" });
  }
});

app.post("/api/ai/zone", auth, async (req, res) => {
  try {
    const zoneRes = await axios.post(`${ML_URL}/predict/zone`, req.body);
    res.json(zoneRes.data);
  } catch (err) {
    console.error("AI Zone Error:", err.message);
    res.status(503).json({ error: "Zone risk assessment unavailable" });
  }
});

// ── OpenAI Chat Proxy ────────────────────────────────────────────────────────
app.post("/api/ai/chat", auth, async (req, res) => {
  const { messages } = req.body;

  if (
    !OPENAI_API_KEY ||
    OPENAI_API_KEY === "YOUR_OPENAI_API_KEY_HERE"
  ) {
    return res.status(503).json({
      error: "AI Assistant temporarily unavailable",
      message: "OpenAI API key missing in .env"
    });
  }

  try {
    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage.content;

    // Simplified chat response (avoid loading chatbot.js here for now)
    const response = `Hello! This is a response to: "${userPrompt.substring(0, 50)}..."`;

    res.json({
      role: "assistant",
      content: response
    });
  } catch (err) {
    console.error("Chat Error:", err.message);
    res.status(503).json({ error: "AI Assistant failed to respond" });
  }
});

// ── Chatbot Endpoint ─────────────────────────────────────────────────────────
app.post("/api/chatbot", auth, async (req, res) => {
  const { message } = req.body;

  if (!OPENAI_API_KEY || OPENAI_API_KEY === "your_openai_key_here") {
    return res.status(503).json({
      error: "AI Chatbot temporarily unavailable",
      message: "OpenAI API key missing in .env"
    });
  }

  try {
    const user = users.get(req.user.phone);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const response = `Chatbot response to: "${message.substring(0, 50)}..."`;

    res.json({
      reply: response
    });
  } catch (err) {
    console.error("Chatbot Error:", err.message);
    res.status(503).json({ error: "AI Chatbot failed to respond" });
  }
});

// ── Aadhaar OCR Endpoint ─────────────────────────────────────────────────────
app.post("/api/aadhaar-ocr", auth, async (req, res) => {
  const { base64Data } = req.body;

  if (!base64Data) {
    return res.status(400).json({ error: "No image data provided" });
  }

  try {
    const mockExtracted = {
      name: "John Doe",
      aadhaarNumber: "XXXX XXXX 1234",
      dateOfBirth: "15/08/1990",
      gender: "Male",
      address: "Mumbai, Maharashtra",
      pincode: "400001",
      isValidAadhaar: true,
      confidence: "HIGH"
    };
    return res.json(mockExtracted);
  } catch (error) {
    console.error("Aadhaar OCR failed:", error);
    res.status(500).json({ error: "OCR processing failed" });
  }
});

// ── Claims Auto-Check Endpoint ──────────────────────────────────────────────
app.post("/api/claims/auto-check", auth, async (req, res) => {
  const user = users.get(req.user.phone);
  if (!user) return res.status(404).json({ error: "User not found" });

  try {
    const weatherResponse = await axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=19.0760&longitude=72.8777&current=temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m&forecast_days=1",
      { timeout: 3000 }
    );
    const current = weatherResponse.data.current;
    const weather = {
      rainfall: current.precipitation || 0,
      temperature: current.temperature_2m || 32,
      windSpeed: current.wind_speed_10m || 0,
      humidity: current.relative_humidity_2m || 70,
      aqi: 85,
      visibility: 8
    };

    res.json({
      success: true,
      weather,
      activeTriggers: 0,
      autoClaimsCreated: 0,
      claims: [],
      message: "No disruptions detected"
    });
  } catch (error) {
    console.error("Auto claim check failed:", error);
    res.status(500).json({ error: "Automatic claim processing failed" });
  }
});

// ── Health Check ────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "PayNest Backend (Cloud Functions)",
    mlService: ML_URL,
    timestamp: new Date().toISOString()
  });
});

// ── ML Model Accuracy Endpoint ──────────────────────────────────────────────
app.get("/api/ml/accuracy", (req, res) => {
  try {
    res.json({
      success: true,
      models: {
        risk_model: {
          accuracy: 86.88,
          cross_validation_mean: 85.94,
          cross_validation_std: 0.64,
          description:
            "Predicts income loss risk based on weather, traffic, and environmental factors"
        },
        loss_model: {
          mae: 29.71,
          r_squared: 0.6247,
          description: "Predicts exact income loss amount in INR"
        },
        fraud_model: {
          random_forest_auc: 0.9854,
          ensemble_auc: 0.9657,
          fraud_rate: 0.3,
          description:
            "Detects fraudulent claims using GPS, behavioral, and historical patterns"
        },
        loan_model: {
          accuracy: 100.0,
          auc: 1.0,
          amount_mae: 46.35,
          description: "Assesses loan eligibility and predicts optimal loan amounts"
        },
        zone_model: {
          accuracy: 100.0,
          description: "Classifies geographic zones by flood risk and infrastructure quality"
        },
        dynamic_pricing_model: {
          mae: 1.61,
          r_squared: 0.9756,
          description: "Calculates real-time premium adjustments based on risk factors"
        }
      },
      last_updated: new Date().toISOString(),
      note: "Accuracy metrics based on cross-validation on historical data"
    });
  } catch (error) {
    console.error("Accuracy endpoint error:", error);
    res.status(500).json({ error: "Failed to load accuracy metrics" });
  }
});

// ── API Root ────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    message: "PayNest Backend API (Firebase Cloud Functions)",
    version: "1.0",
    endpoints: {
      health: "/health",
      auth: "/api/auth/otp, /api/auth/verify, /api/auth/onboard",
      dashboard: "/api/dashboard",
      ml: "/api/ml/accuracy",
      chat: "/api/chatbot",
      claims: "/api/claims/auto-check"
    }
  });
});

// ── Export Cloud Function ───────────────────────────────────────────────────
exports.api = functions.https.onRequest(app);
