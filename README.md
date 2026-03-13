<div align="center">

<img src="https://img.shields.io/badge/Guidewire-DEVTrails%202026-FF6B35?style=for-the-badge"/>

# 🛵 GigShield

### *AI-Powered Parametric Income Insurance for India's Gig Delivery Workers*

<br/>

[![Made With](https://img.shields.io/badge/Made%20With-React%20%2B%20Node.js-61DAFB?style=flat-square&logo=react)](https://reactjs.org)
[![AI Powered](https://img.shields.io/badge/AI%20Powered-Python%20%2B%20scikit--learn-3776AB?style=flat-square&logo=python)](https://python.org)
[![Maps](https://img.shields.io/badge/Maps-Leaflet.js%20%2B%20OpenStreetMap-7EBC6F?style=flat-square)](https://leafletjs.com)
[![Payments](https://img.shields.io/badge/Payments-Razorpay%20UPI-02042B?style=flat-square)](https://razorpay.com)

<br/>

> **Detect a disruption. Verify in seconds. Pay the worker. Automatically.**
> No claim forms. No waiting. No paperwork. Just money in 10 minutes.

<br/>

[🚀 Live Demo](#) &nbsp;·&nbsp; [📹 2-Minute Video](#) &nbsp;·&nbsp; [📄 Docs](#table-of-contents)

---

</div>

## 📖 Table of Contents

| # | Section |
|---|---------|
| 1 | [🔥 The Problem](#-the-problem) |
| 2 | [💡 Our Solution](#-our-solution) |
| 3 | [👤 Persona and Scenarios](#-persona-and-scenarios) |
| 4 | [⚙️ How the System Works](#️-how-the-system-works) |
| 5 | [💰 Weekly Premium Model](#-weekly-premium-model) |
| 6 | [⚡ Parametric Triggers](#-parametric-triggers) |
| 7 | [📱 Web vs Mobile Decision](#-web-vs-mobile-decision) |
| 8 | [🤖 AI and ML Integration](#-ai-and-ml-integration) |
| 9 | [🛠️ Tech Stack](#️-tech-stack) |
| 10 | [📅 Development Plan](#-development-plan) |
| 11 | [🚫 What We Do NOT Cover](#-what-we-do-not-cover) |
| 12 | [👥 Team](#-team) |

<br/>

---

## 🔥 The Problem

<div align="center">

```
India has 12 million+ gig delivery workers.
They earn only when they deliver.
No work = No income. No safety net. Nothing.
```

</div>

Every monsoon, every heatwave, every curfew — **Ravi Kumar** and 12 million workers like him face the same reality:

```
☔ Heavy rain floods Andheri West
       ↓
🛵 Ravi cannot ride his bike safely
       ↓
📦 Zero deliveries completed today
       ↓
💸 ₹0 earned — but EMI, rent and groceries still due
```

**These workers lose 20–30% of their monthly income** due to events completely outside their control. No insurance product in India currently covers this gap.

> 💬 *"When it floods, I just sit at home and watch money I need disappear."*
> — Ravi Kumar, Zomato delivery partner, Andheri West

<br/>

---

## 💡 Our Solution

<div align="center">

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  RAIN HITS → API DETECTS → AI VERIFIES → ₹ PAID     │
│                                                      │
│        Under 10 minutes. Zero human involvement.    │
│                                                      │
└──────────────────────────────────────────────────────┘
```

</div>

GigShield is an AI-powered Progressive Web App that:

- 🌧️ **Monitors** weather, traffic and GPS in real-time using free APIs
- 🤖 **Detects** when a disruption has prevented a worker from earning
- 🔍 **Verifies** using triple-lock AI fraud detection
- 💸 **Pays** via UPI in under 10 minutes — no claim forms ever
- 📊 **Predicts** disruptions 24–48 hours ahead using AI forecasting
- 🗺️ **Guides** workers to nearby safe deliveries during disruptions

### ✨ What Makes Us Different

| Feature | Other Solutions | GigShield |
|---------|----------------|-----------|
| Claim process | Manual form → 2–3 weeks | Zero forms → 10 minutes ✅ |
| Trigger | Worker reports loss | API auto-detects ✅ |
| Fraud check | Human investigator | Triple AI verification ✅ |
| Zone detection | City-wide | 500m hyper-zone precision ✅ |
| Disruption response | Pay and sit home | Safe nearby orders shown ✅ |
| Pricing | Fixed for all | AI-personalised weekly ✅ |

<br/>

---

## 👤 Persona and Scenarios

### Our Delivery Partner

```
╔══════════════════════════════════════════════╗
║  👤  RAVI KUMAR                              ║
║  📍  Andheri West, Mumbai                    ║
║  🛵  Zomato Food Delivery Partner            ║
║  ⏰  Works 8–10 hours per day               ║
║  💰  Earns ₹600/day  (₹80/hour average)     ║
║  📱  Android smartphone — Zomato app         ║
║  😟  Zero financial safety net               ║
╚══════════════════════════════════════════════╝
```

---

### 🌧️ Scenario 1 — Heavy Rainfall *(Most Common)*

**Tuesday, 9am. Andheri West. Rainfall = 72mm.**

```
Open-Meteo API  →  72mm detected in Andheri West zone
        ↓
AI checks       →  72mm > 60mm threshold  →  TRIGGER FIRES
        ↓
TomTom API      →  80% roads blocked in zone  →  CONFIRMED
        ↓
GPS check       →  Ravi stationary in flooded zone  →  VERIFIED
        ↓
Zomato data     →  0 orders completed today  →  FRAUD CHECK CLEAN
        ↓
Payout          →  ₹80/hr × 6 hrs × 100%  =  ₹480
        ↓
UPI transfer    →  ravi.kumar@upi  →  ₹480 credited in 8 minutes ✅
```

**Simultaneously:** Safe Zone Mode activates — Ravi sees 3 nearby deliveries within 1.5km that are safe to complete. He earns ₹190 more. Insurance covers the rest.

---

### ☀️ Scenario 2 — Extreme Heat

**May afternoon. Kurla. Temperature = 47°C.**

> AI detects 47°C > 45°C threshold → 75% of daily average paid → ₹450 auto-credited

---

### 🌫️ Scenario 3 — Severe Pollution

**Winter morning. AQI = 420. Outdoor work hazardous.**

> AQICN API reports AQI 420 > 400 threshold → 50% daily average → ₹300 auto-credited

---

### 🚨 Scenario 4 — Curfew or Local Strike

**Sudden curfew declared across 3 pincodes.**

> Admin logs curfew → 47 insured workers in those pincodes identified → 100% payout fired → ₹600 each in under 10 minutes

---

### 🔮 Scenario 5 — Storm Prep Mode *(Our Innovation)*

```
AI forecast  →  90mm rain predicted tomorrow 2pm–6pm in Andheri West
        ↓
Ravi notified at 8am:
"Heavy rain predicted in your zone tomorrow.
 Buy coverage now for ₹8 — price goes to ₹20 when rain starts."
        ↓
Ravi buys ₹8 advance coverage
        ↓
Rain hits tomorrow  →  Payout fires automatically  →  ₹480 credited
```

> 🏆 This **prevents financial damage before it happens** — not just compensating after.

<br/>

---

## ⚙️ How the System Works

```
                   ┌────────────────────┐
                   │   WORKER SIGNUP    │
                   └─────────┬──────────┘
                             │
           Phone OTP → Aadhaar → Zomato Partner ID
           Zone Selection → Daily Earning → UPI ID
                             │
                   ┌─────────▼──────────┐
                   │   POLICY ISSUED    │
                   │   ₹20/week plan    │
                   └─────────┬──────────┘
                             │
   ┌─────────────────────────▼─────────────────────────┐
   │          REAL-TIME MONITORING  (every 15 min)     │
   │   🌧️ Weather API + 🚗 Traffic API + 📍 GPS Tracker │
   └─────────────────────────┬─────────────────────────┘
                             │
             ┌───────────────▼───────────────┐
             │  Threshold breached?          │
             │  NO  →  Keep monitoring       │
             │  YES →  Run fraud checks      │
             └───────────────┬───────────────┘
                             │
   ┌─────────────────────────▼─────────────────────────┐
   │                TRIPLE FRAUD CHECK                 │
   │   ✓  GPS in affected zone?                        │
   │   ✓  Zomato showing zero completed orders?        │
   │   ✓  No duplicate claim filed today?              │
   └─────────────────────────┬─────────────────────────┘
                             │
             ┌───────────────▼───────────────┐
             │  All 3 pass?                  │
             │  NO  →  Flag + hold for review │
             │  YES →  Calculate payout       │
             └───────────────┬───────────────┘
                             │
   ┌─────────────────────────▼─────────────────────────┐
   │   Payout = avg_hourly × hours_lost × trigger_%    │
   │   Razorpay UPI fires  →  Worker notified          │
   │   Safe Zone Mode activates  →  Nearby orders shown│
   └────────────────────────────────────────────────────┘
```

<br/>

---

## 💰 Weekly Premium Model

### Why Weekly?

> Gig workers earn weekly. They think weekly. They plan weekly.
> A ₹20/week premium auto-deducted from Zomato settlement = less than one chai per day.
> Workers barely notice it — until the day they desperately need it.

### How Premium Auto-Deduction Works

```
Sunday night  →  Zomato settles Ravi's weekly earnings
                          ↓
              GigShield deducts ₹20 automatically
                          ↓
              New policy activates Monday 12:00am
                          ↓
              Coverage runs Mon → Sun, 24×7
```

### AI-Driven Dynamic Pricing — Behavioral Trust Score

```
┌──────────────────┬─────────────────────────────┬──────────┐
│ Tier             │ Criteria                    │ Premium  │
├──────────────────┼─────────────────────────────┼──────────┤
│ 🆕 New Worker   │ Week 1–2, no history         │ ₹25/week │
│ ✅ Established   │ 4+ weeks, BTS 60+            │ ₹20/week │
│ ⭐ Trusted       │ 12+ weeks, BTS 80+           │ ₹15/week │
│ 👑 Elite         │ 6+ months, BTS 95+           │ ₹10/week │
└──────────────────┴─────────────────────────────┴──────────┘
```

**Behavioral Trust Score (BTS)** factors:
- Consistency of working days per week
- Valid claims vs suspicious claims ratio
- GPS accuracy and zone compliance
- Claim pattern anomalies over time

*Higher trust = Lower premium = More money stays with the worker*

### Platform Financial Viability

```
Per 1,000 workers in one city zone:

💰 Weekly premium collected    →   ₹22,000
📊 Disruption rate             →   ~30% workers per disruption day
💸 Average payout per claim    →   ₹400
📉 Weekly payout total         →   ₹12,000
✅ Platform weekly margin      →   ₹10,000
```

<br/>

---

## ⚡ Parametric Triggers

Exact thresholds — payout fires automatically when these are crossed:

```
┌───────────────────────┬─────────────────────────┬─────────────────────┐
│ Disruption            │ Trigger Condition        │ Payout              │
├───────────────────────┼─────────────────────────┼─────────────────────┤
│ 🌧️ Light Rain         │ Rainfall 30mm – 60mm    │ 25% of daily avg    │
│ ⛈️ Heavy Rain         │ Rainfall 60mm – 100mm   │ 50% of daily avg    │
│ 🌊 Flood Level Rain   │ Rainfall > 100mm         │ 100% of daily avg   │
│ 🌡️ Extreme Heat       │ Temperature > 45°C       │ 75% of daily avg    │
│ 😷 Mild Pollution     │ AQI 300 – 400            │ 25% of daily avg    │
│ ☣️ Severe Pollution   │ AQI > 400                │ 50% of daily avg    │
│ 🚧 Road Closure       │ Roads blocked > 70%      │ 100% of daily avg   │
│ 🚨 Official Curfew    │ Any govt declaration     │ 100% of daily avg   │
└───────────────────────┴─────────────────────────┴─────────────────────┘

Maximum weekly payout cap per worker: ₹3,000
```

### Triple Lock — All 3 APIs Must Agree

```
🌧️ Weather API   →  Disruption confirmed in worker's zone
🚗 Traffic API   →  Roads physically blocked
📍 GPS Tracker   →  Worker genuinely stationary in zone

          ALL THREE MUST CONFIRM
                   ↓
            PAYOUT FIRES ✅

   If any one fails → Payout held → Flagged for review
```

<br/>

---

## 📱 Web vs Mobile Decision

### Decision: Progressive Web App (PWA)

| Criteria | Native App | PWA — Our Choice |
|----------|-----------|-----------------|
| Installation needed | Yes — uses storage | Zero — opens in browser ✅ |
| Works on low-end phones | Sometimes fails | Always works ✅ |
| GPS access | Full | Full ✅ |
| Push notifications | Yes | Yes ✅ |
| Works on 2G/3G | Slow | Lightweight ✅ |
| Updates | App store review | Instant deployment ✅ |

> Most Zomato riders use ₹8,000–₹12,000 Android phones with limited storage.
> PWA = zero friction. Opens in Chrome. No install. No barriers.

**Language support:** Hindi · Tamil · Telugu · Kannada · Voice-assisted onboarding

<br/>

---

## 🤖 AI and ML Integration

### 1. 💰 Dynamic Premium Calculation

```python
# Gradient Boosting Regressor
features = {
    "zone_flood_risk_score": 0.82,       # Historical flood frequency
    "years_on_platform": 1.5,            # Worker experience
    "avg_daily_earning": 600,            # Earning baseline
    "historical_claim_rate_zone": 0.31,  # Zone claim history
    "behavioral_trust_score": 74         # Worker BTS
}
weekly_premium = model.predict(features)  # Output: ₹10 to ₹35
```

### 2. 🔍 Fraud Detection

```python
# Isolation Forest anomaly detection
fraud_signals = {
    "gps_in_claimed_zone": True,
    "worker_speed_km_h": 2.1,          # Should be near 0 during flood
    "zomato_orders_completed": 0,
    "duplicate_claim_today": False,
    "claim_rate_vs_zone_avg": 1.1      # Flag if 3x or above
}
```

| Check | Method | Flag if |
|-------|--------|---------|
| 📍 Location | GPS vs registered zone | Worker 5km+ outside zone |
| 🏎️ Speed | GPS speed data | Moving > 20 km/h during disruption |
| 📦 Platform data | Zomato API order count | 3+ orders on disruption day |
| 🔁 Duplicate | Database lookup | Same event claimed twice |
| 📈 Pattern | ML anomaly detection | Claim rate 3× zone average |

### 3. 🌤️ Predictive Forecasting

```
Open-Meteo 48hr Forecast API
         ↓
AI scans: predicted rainfall > 60mm tomorrow?
         ↓
YES → Push alert to workers in affected zone
    "Buy advance coverage for ₹8 now (₹20 after rain starts)"
         ↓
Rain hits → Payout fires automatically
```

### 4. 🗺️ Risk Zone Classification

**Model:** Random Forest Classifier
**Input:** 5-year weather history, flood records, curfew frequency
**Output:** Zone classified as HIGH / MEDIUM / LOW risk
**Used for:** Personalising each worker's weekly premium

<br/>

---

## 🛠️ Tech Stack

### Frontend
```
⚛️  React.js (PWA)        →  Component UI, offline support
🗺️  Leaflet.js            →  Zone map — free, no rate limits
🎨  Tailwind CSS          →  Fast responsive styling
📊  Recharts              →  Analytics dashboards
🔔  Firebase Messaging    →  Real-time payout notifications
```

### Backend
```
🟢  Node.js + Express     →  REST API server
🍃  MongoDB Atlas         →  Worker profiles, policies, claims
🔥  Firebase Realtime DB  →  Live GPS streaming
🔐  Firebase Auth         →  Phone OTP — no passwords needed
```

### AI / ML
```
🐍  Python 3.11           →  ML model development
📦  scikit-learn          →  Premium regression model
🔍  Isolation Forest      →  Fraud anomaly detection
🌲  Random Forest         →  Risk zone classification
🧪  FastAPI               →  Serving ML models as REST endpoints
```

### External APIs — All Free Tier

```
🌧️  Open-Meteo            →  Rainfall, temperature, 48hr forecast
☁️  OpenWeatherMap        →  Storm alerts (1000 calls/day free)
😷  AQICN                 →  Air Quality Index for Indian cities
🚗  TomTom Traffic API    →  Road closures (2500 calls/day free)
📍  Browser GPS API       →  Worker location — built into phones
💳  Razorpay Sandbox      →  UPI payout simulation
```

### Deployment
```
▲   Vercel      →  Frontend PWA
🚂  Railway     →  Node.js backend
🍃  MongoDB Atlas → Database cluster
🐍  Render      →  Python ML API
```

<br/>

---

## 📅 Development Plan

```
PHASE 1 — Week 1 & 2: Ideation and Foundation     [CURRENT ◄]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅ Problem analysis and persona definition
  ✅ Core features designed — triggers, fraud, safe zone mode
  ✅ API research and selection complete
  ✅ Onboarding flow designed — 6 steps
  ✅ README documentation
  ⬜ GitHub repository structured
  ⬜ 2-minute strategy video

PHASE 2 — Week 3: Core Backend
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜ Worker onboarding API (OTP, Aadhaar mock, zone)
  ⬜ Open-Meteo polling every 15 minutes
  ⬜ Parametric trigger threshold engine
  ⬜ Basic fraud detection — GPS zone, duplicate check
  ⬜ MongoDB schema — workers, policies, claims, payouts

PHASE 3 — Week 4: Frontend and Map
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜ React PWA with Tailwind
  ⬜ 6-step onboarding screens
  ⬜ Leaflet.js zone map — red/green zones
  ⬜ Live weather overlay
  ⬜ Safe Zone near-delivery mode UI
  ⬜ Worker dashboard — earnings, BTS, payout history

PHASE 4 — Week 5: AI and Payments
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜ Premium ML model — Gradient Boosting
  ⬜ Fraud detection — Isolation Forest
  ⬜ Razorpay sandbox UPI integration
  ⬜ Storm prep mode — advance warning + pricing
  ⬜ Policy card screen
  ⬜ Payout breakdown transparency screen

PHASE 5 — Week 6: Polish and Final Demo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜ Admin analytics dashboard
  ⬜ End-to-end live demo — rain detected → UPI credited
  ⬜ Performance testing
  ⬜ Final presentation deck
  ⬜ Full demo video
```



---

## 📁 Repository Structure

```
gigshield/
│
├── 📄 README.md
├── 🖥️  frontend/
│   └── src/
│       ├── components/
│       │   ├── Onboarding/        ←  6-step signup flow
│       │   ├── ZoneMap/           ←  Leaflet red/green map
│       │   ├── Dashboard/         ←  Worker analytics
│       │   ├── PolicyCard/        ←  Active policy view
│       │   ├── PayoutScreen/      ←  Payout breakdown
│       │   └── SafeZoneMode/      ←  Nearby orders during disruption
│       └── App.jsx
├── ⚙️  backend/
│   ├── routes/
│   │   ├── workers.js             ←  Onboarding and profiles
│   │   ├── triggers.js            ←  Parametric threshold engine
│   │   ├── claims.js              ←  Fraud detection
│   │   └── payouts.js             ←  UPI payment processing
│   └── services/
│       ├── weatherService.js      ←  Open-Meteo polling
│       ├── trafficService.js      ←  TomTom API
│       ├── fraudDetection.js      ←  Triple verification
│       └── payoutService.js       ←  Razorpay integration
├── 🤖 ml/
│   ├── premium_model.py           ←  Gradient Boosting regressor
│   ├── fraud_detection.py         ←  Isolation Forest
│   └── risk_zones.py              ←  Zone classification model
└── 📚 docs/
    └── api_documentation.md
```

<br/>

---

## 👥 Team

<div align="center">

| Member | Role | Responsibility |
|--------|------|----------------|
| [keerthana R] | 🎨 Frontend Lead | React PWA, Zone Map, UI/UX |
| [shakthi ganesh] | ⚙️ Backend Lead | Node.js APIs, MongoDB, Razorpay |
| [sanjith] | 🤖 AI/ML Lead | Premium model, Fraud detection |
| [akshay gopi} | 📊 Product Lead | Strategy, Presentation, Video |

</div>

<br/>

---

<div align="center">

### Built for Guidewire DEVTrails 2026

*"12 million gig workers ride through India's storms every single day.*
*GigShield makes sure the storm never empties their wallet."*

<br/>

![Made in India](https://img.shields.io/badge/Made%20in-India%20🇮🇳-FF9933?style=for-the-badge)
![For Gig Workers](https://img.shields.io/badge/For-Gig%20Workers%20🛵-4CAF50?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/Powered%20by-AI%20🤖-9C27B0?style=for-the-badge)

</div>
