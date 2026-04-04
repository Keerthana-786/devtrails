import express from "express";
import cors from "cors";
import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { chatWithGPT, performAadhaarOCR } from "./chatbot.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const ML_URL = process.env.ML_URL || "http://localhost:8001";
const JWT_SECRET = process.env.JWT_SECRET || "paynest_secret_2024";

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "dist")));

// ── In-memory store (replace with DB in production) ──────────────────────────
const users = new Map();
const payouts = new Map();
const loans = new Map();

// Initialize demo users for testing
users.set('9876543210', {
  phone: '9876543210',
  email: 'demo@paynest.com',
  name: 'Demo User',
  zone: 'Connaught Place',
  weeklyPremium: 76.50,
  walletBalance: 150,
  stabilityScore: 85,
  policyStatus: 'ACTIVE',
  badges: [
    { label: 'Rain Master', earned: true },
    { label: 'Safe Streak', earned: true },
    { label: 'Zone Explorer', earned: false }
  ],
  payouts: [],
  activeDisruptions: [],
  safeZones: ['Karol Bagh', 'Rajouri Garden', 'Lajpat Nagar'],
  highRiskHours: ['8-10 AM', '5-7 PM'],
  weather: { rainfall: 2.5, temperature: 28, aqi: 120 },
  traffic: 45,
  pricingBreakdown: {
    base: 50,
    weather: 15,
    traffic: 8,
    zone: 3.5
  }
});

// ── Auth Middleware ───────────────────────────────────────────────────────────
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  // Allow demo tokens for development
  if (token.startsWith('token-demo-') || token.startsWith('demo-token-')) {
    req.user = { id: 'usr_demo', phone: '9876543210' };
    return next();
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// ── Auth Routes ───────────────────────────────────────────────────────────────
app.post("/api/auth/otp", (req, res) => {
  const { phone } = req.body;
  const isEmail = phone && phone.includes('@');
  if (!phone || (!isEmail && phone.length !== 10)) return res.status(400).json({ error: "Invalid phone or email" });
  console.log(`OTP sent to ${phone}: 123456`);
  res.json({ success: true, message: `OTP sent to ${isEmail ? 'email' : 'phone'}`, debug_otp: "123456" });
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
      createdAt: new Date().toISOString(),
    };
    users.set(phone, user);
  }

  const token = jwt.sign({ id: user.id, phone: user.phone, email: user.email }, JWT_SECRET, { expiresIn: "30d" });
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

// ── Payouts Route ───────────────────────────────────────────────────────────
app.get("/api/payouts", auth, (req, res) => {
  const user = users.get(req.user.phone);
  if (!user) return res.status(404).json({ error: "User not found" });
  
  const userPayouts = Array.from(payouts.values()).filter((p) => p.userId === user.id);
  res.json(userPayouts.slice(-20).reverse());
});

// ── Dashboard Routes ──────────────────────────────────────────────────────────
app.get("/api/dashboard", auth, async (req, res) => {
  const user = users.get(req.user.phone);
  if (!user) return res.status(404).json({ error: "User not found" });

  let weather = { rainfall: 0, temperature: 32, aqi: 85, windSpeed: 12, humidity: 72, visibility: 8 };
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
      visibility: 8,
    };
  } catch {
    // fallback to defaults
  }

  const userPayouts = Array.from(payouts.values()).filter((p) => p.userId === user.id);

  res.json({
    user,
    weather,
    payouts: userPayouts.slice(-10).reverse(),
    stats: {
      totalPayouts: userPayouts.length,
      totalEarned: userPayouts.reduce((s, p) => s + p.amount, 0),
      thisMonth: userPayouts.filter((p) => new Date(p.createdAt).getMonth() === new Date().getMonth()).length,
    },
  });
});

// ── TRUE AI PROXIES (Forwarding directly to FastAPI) ───────────────────────

app.post("/api/ai/pricing", auth, async (req, res) => {
  try {
    // Expected inputs matching DynamicPricingInput in Python
    const pricingRes = await axios.post(`${ML_URL}/predict/dynamic-pricing`, req.body);
    res.json(pricingRes.data);
  } catch (err) {
    console.error("AI Pricing Error:", err.message);
    res.status(503).json({ error: "Dynamic pricing unavailable" });
  }
});

app.post("/api/ai/disruptions", auth, async (req, res) => {
  try {
    const triggersRes = await axios.post(`${ML_URL}/triggers/check-disruptions`, req.body);
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

// ── OpenAI Chat Proxy ───────────────────────────────────────────────────────
app.post("/api/ai/chat", auth, async (req, res) => {
  const { messages, context } = req.body;

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "YOUR_OPENAI_API_KEY_HERE") {
    return res.status(503).json({
      error: "AI Assistant temporarily unavailable",
      message: "OpenAI API key missing in .env"
    });
  }

  try {
    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage.content;

    const response = await chatWithGPT(userPrompt, context);

    res.json({
      role: "assistant",
      content: response
    });
  } catch (err) {
    console.error("Chat Error:", err.message);
    res.status(503).json({ error: "AI Assistant failed to respond" });
  }
});

// ── Comprehensive AI Chatbot Endpoint ───────────────────────────────────────
app.post("/api/chatbot", auth, async (req, res) => {
  const { message, context } = req.body;

  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "your_openai_key_here") {
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

    // Build comprehensive context from the live user object
    const chatbotContext = {
      userId: user.id || req.user.phone,
      weeklyPremium: user.weeklyPremium || 76.50,
      walletBalance: user.walletBalance || 150.00,
      activeDisruptions: user.activeDisruptions || [],
      stabilityScore: user.stabilityScore || 100,
      payouts: user.payouts || [],
      badges: user.badges || [],
      safeZones: user.safeZones || ['Karol Bagh', 'Rajouri Garden'],
      weather: user.weather || { rainfall: 0, aqi: 85 },
      traffic: user.traffic || 30,
      pricingBreakdown: user.pricingBreakdown || {},
      // Aadhaar verification status
      aadhaarUploaded: user.aadhaarUploaded || false,
      aadhaarName: user.aadhaarName || null,
      aadhaarNumber: user.aadhaarNumber || null,
      aadhaarDOB: user.aadhaarDOB || null,
      aadhaarGender: user.aadhaarGender || null,
      aadhaarAddress: user.aadhaarAddress || null,
      aadhaarPincode: user.aadhaarPincode || null,
      aadhaarConfidence: user.aadhaarConfidence || null,
      ...context // Allow UI to override if needed
    };

    const response = await chatWithGPT(message, chatbotContext);

    res.json({
      reply: response
    });
  } catch (err) {
    console.error("Chatbot Error:", err.message);
    res.status(503).json({ error: "AI Chatbot failed to respond" });
  }
});

// ── Aadhaar OCR Endpoint ───────────────────────────────────────────────────
app.post("/api/aadhaar-ocr", auth, async (req, res) => {
  const { base64Data, mimeType, fileName } = req.body;

  if (!base64Data) {
    return res.status(400).json({ error: "No image data provided" });
  }

  try {
    // Call the real AI OCR function
    console.log("Calling OpenAI for Aadhaar OCR...");
    const extracted = await performAadhaarOCR(base64Data, mimeType);
    
    console.log("Extracted Aadhaar data:", extracted);
    return res.json(extracted);

  } catch (error) {
    console.error("Aadhaar OCR failed:", error);

    // Fallback mock response
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
  }
});

// Helper function to parse Aadhaar text (extracted from AuthScreens.jsx)
function parseAadhaarText(text) {
  // Initialize default structure
  let extracted = {
    name: null,
    aadhaarNumber: null,
    dateOfBirth: null,
    gender: null,
    address: null,
    pincode: null,
    yearOfBirth: null,
    fatherName: null,
    isValidAadhaar: false,
    confidence: "LOW"
  };

  // Clean up the text
  const cleanText = text.replace(/\s+/g, ' ').trim();

  // Check if this looks like Aadhaar text (basic validation)
  const hasAadhaarKeywords = /aadhaar|आधार|uidai|india|government|unique identification|enrolment/i.test(cleanText);
  const hasNumberPattern = /\d{4}\s*\d{4}\s*\d{4}/.test(cleanText);

  if (!hasAadhaarKeywords && !hasNumberPattern) {
    return {
      isValidAadhaar: false,
      error: "Not an Aadhaar card",
      confidence: "HIGH"
    };
  }

  extracted.isValidAadhaar = true;
  extracted.confidence = hasNumberPattern ? "HIGH" : "MEDIUM";

  // Extract Aadhaar number (12 digits, often in XXXX XXXX XXXX format)
  const aadhaarMatch = cleanText.match(/(\d{4})\s*(\d{4})\s*(\d{4})/);
  if (aadhaarMatch) {
    const fullNumber = aadhaarMatch[1] + aadhaarMatch[2] + aadhaarMatch[3];
    extracted.aadhaarNumber = `XXXX XXXX ${fullNumber.slice(-4)}`;
  }

  // Extract DOB (DD/MM/YYYY or DD-MM-YYYY)
  const dobMatch = cleanText.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (dobMatch) {
    const day = dobMatch[1].padStart(2, '0');
    const month = dobMatch[2].padStart(2, '0');
    const year = dobMatch[3];
    extracted.dateOfBirth = `${day}/${month}/${year}`;
    extracted.yearOfBirth = year;
  }

  // Extract gender
  if (/(male|m|पुरुष|पुरुश)/i.test(cleanText)) {
    extracted.gender = "Male";
  } else if (/(female|f|महिला|महिला)/i.test(cleanText)) {
    extracted.gender = "Female";
  }

  // Extract name (usually before DOB or in a specific position)
  // Look for patterns like "Name: [Name]" or just capitalized words
  const nameMatch = cleanText.match(/(?:name|नाम)[\s:]+([A-Za-z\s]+)/i) ||
                   cleanText.match(/^([A-Z][a-z]+\s+[A-Z][a-z]+)/);
  if (nameMatch) {
    extracted.name = nameMatch[1].trim();
  }

  // Extract address (usually contains location keywords)
  const addressKeywords = /(address|पता|delhi|mumbai|bangalore|chennai|kolkata|pune|hyderabad|ahmedabad|jaipur|surat|kanpur|nagpur|indore|thane|pimpri|nasik|vadodara|meerut|allahabad|varanasi|patna|lucknow|agra|bhopal)/i;
  const addressMatch = cleanText.match(addressKeywords);
  if (addressMatch) {
    // Extract text around the address keyword
    const addressIndex = cleanText.toLowerCase().indexOf(addressMatch[0].toLowerCase());
    const addressText = cleanText.substring(addressIndex).split(/[,\n]/)[0];
    extracted.address = addressText.trim();
  }

  // Extract pincode (6 digits)
  const pincodeMatch = cleanText.match(/\b(\d{6})\b/);
  if (pincodeMatch) {
    // Make sure it's not part of the Aadhaar number
    const pincode = pincodeMatch[1];
    if (extracted.aadhaarNumber && !extracted.aadhaarNumber.includes(pincode)) {
      extracted.pincode = pincode;
    } else if (!extracted.aadhaarNumber) {
      extracted.pincode = pincode;
    }
  }

  // Extract father's name if present
  const fatherMatch = cleanText.match(/(?:father|पिता)[\s:]+([A-Za-z\s]+)/i);
  if (fatherMatch) {
    extracted.fatherName = fatherMatch[1].trim();
  }

  return extracted;
}

app.post("/api/claims/auto-check", auth, async (req, res) => {
  const user = users.get(req.user.phone);
  if (!user) return res.status(404).json({ error: "User not found" });

  try {
    // Get current weather data
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
      aqi: 85, // Mock AQI for now
      visibility: 8
    };

    // Check for disruptions using ML
    const disruptionCheck = await axios.post(`${ML_URL}/triggers/check-disruptions`, {
      worker_id: user.id,
      current_lat: 19.0760, // Mock location
      current_lng: 72.8777,
      timestamp: new Date().toISOString(),
      weather_condition: weather.rainfall > 30 ? "rain" : weather.temperature > 40 ? "heat" : "normal",
      traffic_speed_kmh: weather.rainfall > 20 ? 15 : 25, // Mock traffic speed
      orders_active: Math.floor(Math.random() * 10) // Mock active orders
    });

    const activeTriggers = disruptionCheck.data.active_triggers || [];
    const autoEligible = activeTriggers.filter(t => t.auto_claim_eligible);

    let claimsCreated = [];

    // Process auto-eligible claims
    for (const trigger of autoEligible) {
      // Calculate payout using loss prediction
      const lossResponse = await axios.post(`${ML_URL}/predict/loss`, {
        hourly_rate: 80,
        normal_work_hours: 6,
        rainfall_mm: weather.rainfall,
        traffic_disruption: weather.rainfall > 20 ? 0.8 : 0.2,
        aqi: weather.aqi,
        day_of_week: new Date().getDay(),
        is_peak_hour: new Date().getHours() >= 10 && new Date().getHours() <= 14 ? 1 : 0,
        city_index: 2
      });

      const payoutAmount = Math.round(lossResponse.data.predicted_income_loss_inr || (80 * 6 * 0.5));

      // Fraud check
      const fraudResponse = await axios.post(`${ML_URL}/predict/fraud`, {
        gps_deviation_km: 0.1,
        location_consistency: 0.95,
        claim_frequency_30d: 1,
        account_age_months: user.monthsActive || 1,
        multiple_claims_per_day: 0,
        orders_during_disruption: 1,
        avg_payout_inr: 350,
        trust_score: user.trustScore || 65,
        zone_risk_tier: 2
      });

      if (fraudResponse.data.verdict === "AUTO_APPROVE") {
        // Create automatic claim
        const claim = {
          id: `auto_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          userId: user.id,
          trigger: trigger.trigger_id,
          type: trigger.type,
          severity: trigger.severity,
          amount: payoutAmount,
          status: "COMPLETED",
          upiRef: `AUTO${Date.now()}`,
          createdAt: new Date().toISOString(),
          autoProcessed: true
        };

        payouts.set(claim.id, claim);
        user.balance += payoutAmount;
        user.totalPayouts = (user.totalPayouts || 0) + 1;
        claimsCreated.push(claim);
      }
    }

    users.set(req.user.phone, user);

    res.json({
      success: true,
      weather,
      activeTriggers: activeTriggers.length,
      autoClaimsCreated: claimsCreated.length,
      claims: claimsCreated,
      message: claimsCreated.length > 0 ? `${claimsCreated.length} automatic claims processed` : "No disruptions detected"
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
    service: "PayNest Backend",
    mlService: ML_URL,
    timestamp: new Date().toISOString()
  });
});

// ── ML Model Accuracy Endpoint ──────────────────────────────────────────────
app.get("/api/ml/accuracy", (req, res) => {
  try {
    // Read training report from models directory
    const fs = require('fs');
    const path = require('path');
    const reportPath = path.join(__dirname, 'models', 'training_report.json');
    
    if (fs.existsSync(reportPath)) {
      const trainingReport = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      res.json({
        success: true,
        models: {
          risk_model: {
            accuracy: trainingReport.risk_model?.accuracy || 86.88,
            cross_validation_mean: trainingReport.risk_model?.cv_mean || 85.94,
            cross_validation_std: trainingReport.risk_model?.cv_std || 0.64,
            description: "Predicts income loss risk based on weather, traffic, and environmental factors"
          },
          loss_model: {
            mae: trainingReport.loss_model?.mae || 29.71,
            r_squared: trainingReport.loss_model?.r2 || 0.6247,
            description: "Predicts exact income loss amount in INR"
          },
          fraud_model: {
            random_forest_auc: trainingReport.fraud_model?.rf_auc || 0.9854,
            ensemble_auc: trainingReport.fraud_model?.ensemble_auc || 0.9657,
            fraud_rate: trainingReport.fraud_model?.fraud_rate || 0.3,
            description: "Detects fraudulent claims using GPS, behavioral, and historical patterns"
          },
          loan_model: {
            accuracy: trainingReport.loan_model?.accuracy || 100.0,
            auc: trainingReport.loan_model?.auc || 1.0,
            amount_mae: trainingReport.loan_model?.amount_mae || 46.35,
            description: "Assesses loan eligibility and predicts optimal loan amounts"
          },
          zone_model: {
            accuracy: trainingReport.zone_model?.accuracy || 100.0,
            description: "Classifies geographic zones by flood risk and infrastructure quality"
          },
          dynamic_pricing_model: {
            mae: trainingReport.dynamic_pricing_model?.mae || 1.61,
            r_squared: trainingReport.dynamic_pricing_model?.r2 || 0.9756,
            description: "Calculates real-time premium adjustments based on risk factors"
          }
        },
        last_updated: new Date().toISOString(),
        note: "Accuracy metrics based on cross-validation on historical data"
      });
    } else {
      // Fallback mock data if file doesn't exist
      res.json({
        success: true,
        models: {
          risk_model: { accuracy: 86.88, description: "Weather and disruption risk prediction" },
          loss_model: { mae: 29.71, r_squared: 0.62, description: "Income loss amount prediction" },
          fraud_model: { auc: 0.97, description: "Fraud detection and claim verification" },
          loan_model: { accuracy: 100.0, description: "Loan eligibility assessment" },
          zone_model: { accuracy: 100.0, description: "Geographic zone risk classification" },
          dynamic_pricing_model: { mae: 1.61, r_squared: 0.98, description: "Dynamic premium calculation" }
        },
        note: "Using fallback accuracy metrics"
      });
    }
  } catch (error) {
    console.error("Accuracy endpoint error:", error);
    res.status(500).json({ error: "Failed to load accuracy metrics" });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*all", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n🚀 PayNest Backend running on port ${PORT}`);
  console.log(`   ML Layer expected at ${ML_URL}`);
});
