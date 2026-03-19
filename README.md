# 🛵 GigShield
### *AI-Powered Parametric Income Insurance for India's Gig Delivery Workers*

<div align="center">

![Guidewire](https://img.shields.io/badge/Guidewire-DEVTrails%202026-FF6B35?style=for-the-badge)
![Made In India](https://img.shields.io/badge/Made%20in-India%20🇮🇳-FF9933?style=for-the-badge)

> **Detect → Verify → Pay → Navigate**
> *No forms. No calls. Money in under 10 minutes.*

</div>

---

## 🔥 The Problem

India has **12M+ gig delivery workers**. When rain, heat, or curfew stops them — they earn **₹0**. No insurance. No safety net. They lose **20–30% of monthly income** to events outside their control.

```
☔ Rain floods Andheri West  →  🛵 Ravi can't ride  →  📦 Zero deliveries  →  💸 ₹0 earned
```

---

## 💡 Our Solution

**GigShield** automatically detects disruptions using real APIs, verifies the worker is genuinely affected, and pays them via UPI — without a single form.

```
APIs detect disruption (every 15 sec)
        ↓
GPS + Camera Photo verify worker is in zone
        ↓
5 ML models validate claim + check fraud
        ↓
₹480 sent to UPI in under 10 minutes ✅
        ↓
App shows safe route + nearby orders
```

---

## 👤 Our Persona

| | |
|--|--|
| **Name** | Ravi Kumar |
| **Platform** | Zomato, Andheri West, Mumbai |
| **Earnings** | ₹600/day · ₹80/hour · 8 hrs/day |
| **Phone** | ₹9,000 Android · Chrome browser |
| **Problem** | Loses ₹1,500–₹3,600/month to disruptions |
| **Safety Net** | ZERO currently |

---

## 🌟 Key Features

### 📍 Live GPS Tracking
Worker's location sent every 60 seconds. On claim — system checks if worker was actually inside the disrupted zone. Location history stored as evidence.

### 📸 GPS Camera with Watermark ⭐
Worker takes a photo inside the app. System stamps it with:
```
📍 19.1136°N, 72.8697°E  |  🕐 09:14 AM, March 18
🌧️ 74mm rain  |  🚗 82% roads blocked  |  ✅ GigShield Verified
```
Photo GPS must match zone GPS within 500m — or claim is flagged.

### 🗺️ Smart Navigation & Directions ⭐
When disruption hits, app shows turn-by-turn directions to the **nearest safe earning zone**, avoiding all flooded/blocked roads in real time.
```
🔴 Link Road    → FLOODED — avoid
🟢 SV Road      → CLEAR — take this
🟢 Linking Road → CLEAR — 3 orders waiting (₹65, ₹80, ₹75)
```

### 📦 Nearby Safe Orders
Map shows red danger zones and green safe zones. Worker sees available orders inside safe zones with distance, estimated earnings, and road status.

### 📄 Document Verification
Aadhaar card + Platform Partner ID verified via OCR during onboarding. Selfie liveness check on large claims. Unverified workers capped at ₹200/event.

### 🌐 7 Indian Languages + Voice ⭐
Full app in English, Hindi, Tamil, Telugu, Kannada, Marathi, Bengali. Voice alerts in local language when payout fires.
> Tamil: *"உங்கள் கணக்கில் ₹480 வரவு வைக்கப்பட்டது"*

### 🤖 AI Explains Every Decision
Every payout or denial includes a plain-language reason in the worker's language. Worker always knows exactly why they were paid or not.

### 🔮 Storm Prep Mode
AI forecasts heavy rain 48 hours ahead. Worker buys advance coverage at ₹8 before rain (vs ₹20 during). Payout fires automatically when rain hits.

---

## ⚡ Parametric Triggers

| Disruption | Condition | Payout |
|------------|-----------|--------|
| 🌦️ Light Rain | 30–60mm | 25% daily avg |
| ⛈️ Heavy Rain | 60–100mm | 50% daily avg |
| 🌊 Flood Rain | >100mm | 100% daily avg |
| 🌡️ Extreme Heat | >45°C | 75% daily avg |
| 😷 Mild Pollution | AQI 300–400 | 25% daily avg |
| ☣️ Severe Pollution | AQI >400 | 50% daily avg |
| 🚧 Road Closure | >70% blocked | 100% daily avg |
| 🚨 Curfew / Strike | Govt declaration | 100% daily avg |

> **Max weekly payout cap: ₹3,000**
> **Formula: hourly\_rate × hours\_lost × disruption\_factor**

**Triple Lock — all 3 must confirm before payout fires:**
```
🌧️ Weather API  →  disruption in worker's 500m zone
🚗 Traffic API  →  roads physically blocked
📍 GPS + Photo  →  worker stationary in zone with proof
```

---

## 💰 Weekly Premium Model

| Tier | Criteria | Premium |
|------|----------|---------|
| 🆕 Starter | Week 1–3 | ₹25/week |
| ✅ Standard | 4+ weeks, BTS 60+ | ₹20/week |
| ⭐ Trusted | 12+ weeks, BTS 80+ | ₹15/week |
| 👑 Elite | 6+ months, BTS 95+ | ₹10/week |

Auto-deducted every Sunday night from platform settlement. Less than 1 chai per day.

**Platform model per 1,000 workers:**
```
Weekly premium collected  →  ₹22,000
Weekly payouts            →  ₹12,000
Platform margin           →  ₹10,000 ✅
```

---

## 🤖 ML Models (5 Trained Models)

| Model | Algorithm | Output |
|-------|-----------|--------|
| Risk Prediction | XGBoost Classifier | LOW / MEDIUM / HIGH |
| Income Loss | LightGBM Regressor | Predicted ₹ loss |
| Fraud Detection | Isolation Forest | Fraud score 0–1 |
| Premium Pricing | Gradient Boosting | ₹10–₹35/week |
| Zone Classification | Random Forest | Zone risk level |

All models trained on synthetic datasets (5,000–8,000 rows each) with realistic Indian city distributions. Served via Python FastAPI.

---

## 🛡️ Adversarial Defense & Anti-Spoofing Strategy

*(Response to Phase 1 Market Crash Challenge)*

### 5-Layer Fraud Defense

```
Layer 1 — GPS Photo Match     Photo GPS must match zone GPS ±500m
Layer 2 — Speed Analysis      Moving >20 km/h during flood = impossible
Layer 3 — Accelerometer       Phone motion confirms worker is stationary
Layer 4 — Network vs GPS      Cell tower location cross-checks GPS
Layer 5 — Isolation Forest ML Claim pattern vs historical zone baseline
```

### Fraud Ring Detection
```
Signs of a fraud ring (auto-block):
  → 10+ claims filed within 90 seconds
  → All GPS coordinates identical or clustered
  → No photos uploaded
  → All accounts registered within last 7 days

Signs of honest workers (auto-approve):
  → Claims spread over 20–40 minutes
  → GPS distributed across zone naturally
  → Photos uploaded from different angles
  → Accounts with 4+ weeks history
```

### Honeypot Zones
System maintains secret GPS coordinates that never appear in any zone list. Any worker claiming from a honeypot = GPS spoofer. Instant block + investigation.

### Response Thresholds
```
Fraud score 0.00–0.30  →  AUTO_APPROVE  (pay immediately)
Fraud score 0.31–0.50  →  MONITOR       (pay + flag for watching)
Fraud score 0.51–0.70  →  HOLD          (hold + request more proof)
Fraud score 0.71–1.00  →  BLOCK         (reject + freeze account)
```

---

## 🛠️ Tech Stack

```
Frontend    React.js PWA + Tailwind CSS + Leaflet.js
Backend     Node.js + Express + MongoDB Atlas
ML          Python + XGBoost + LightGBM + scikit-learn + FastAPI
Camera      Browser MediaDevices API + Canvas (free, built-in)
GPS         Browser Geolocation API (free, built-in)
OCR         Tesseract.js — Aadhaar document reading
Weather     Open-Meteo API (free, no key needed)
Traffic     TomTom Traffic API (2,500 free calls/day)
Routing     OSRM — turn-by-turn directions (free)
AQI         AQICN API (free)
Payments    Razorpay UPI Sandbox
Voice       Web Speech API (free, built-in)
Languages   Custom i18n JSON (7 languages)
Hosting     Vercel + Railway + Render
```

---

## 📅 Development Phases

```
Phase 1  Weeks 1–2   Ideation, README, Anti-spoofing strategy  ← HERE
Phase 2  Week 3      Backend APIs + DB + Polling engine
Phase 3  Week 4      5 ML models trained + FastAPI
Phase 4  Week 5      React PWA + Map + Camera + Directions
Phase 5  Week 6      Languages + Documents + Storm Prep
Phase 6  Week 7      Demo + Video + Admin Dashboard
```

---

## 👥 Team

| Member | Role |
|--------|------|
| Keerthana R | 🎨 Frontend — React PWA, Map, Camera, Navigation |
| Shakthi Ganesh | ⚙️ Backend — APIs, MongoDB, Routing, Razorpay |
| Sanjith kumar S | 🤖 ML — 5 models, fraud detection, FastAPI |
| Akshay Gopi | 📊 Product — Strategy, Presentation, Video |

---

<div align="center">

*"12 million gig workers ride through India's storms every day.*
*GigShield makes sure the storm never empties their wallet —*
*and shows them the safest road back to earning."*

![ML Models](https://img.shields.io/badge/ML%20Models-5%20Trained-9C27B0?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-7%20Indian-2196F3?style=for-the-badge)
![Workers](https://img.shields.io/badge/Target-12M%20Workers-FF6B35?style=for-the-badge)

</div>
