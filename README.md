# 🛵 GigShield
### *AI-Powered Parametric Income Insurance for India's Gig Delivery Workers*

<div align="center">

![GigShield Banner](https://img.shields.io/badge/Guidewire-DEVTrails%202026-FF6B35?style=for-the-badge&logoColor=white)
![Status](https://img.shields.io/badge/Status-Phase%201%20Submission-22C55E?style=for-the-badge)
![Made In India](https://img.shields.io/badge/Made%20in-India%20🇮🇳-FF9933?style=for-the-badge)

**Detect → Verify → Pay → Navigate**
*No forms. No calls. No waiting. Money in under 10 minutes.*

</div>

---

## 📖 Table of Contents

| # | Section |
|---|---------|
| 1 | [The Problem](#-the-problem) |
| 2 | [Our Solution](#-our-solution) |
| 3 | [Persona & Scenarios](#-persona--scenarios) |
| 4 | [How the System Works](#-how-the-system-works) |
| 5 | [Smart Navigation & Directions](#-smart-navigation--directions) |
| 6 | [GPS Camera & Location Proof](#-gps-camera--location-proof) |
| 7 | [Document Verification](#-document-verification) |
| 8 | [Nearby Orders Discovery](#-nearby-orders-discovery) |
| 9 | [Weekly Premium Model](#-weekly-premium-model) |
| 10 | [Parametric Triggers](#-parametric-triggers) |
| 11 | [AI & ML Integration](#-ai--ml-integration) |
| 12 | [Multilingual Support](#-multilingual-support) |
| 13 | [Adversarial Defense & Anti-Spoofing](#-adversarial-defense--anti-spoofing-strategy) |
| 14 | [Tech Stack](#-tech-stack) |
| 15 | [Development Plan](#-development-plan) |
| 16 | [Team](#-team) |

---

## 🔥 The Problem

<div align="center">

```
India has 12 million+ gig delivery workers.
They earn ONLY when they deliver.
No delivery = No income = No safety net.
```

</div>

Every monsoon, every heatwave, every curfew — **Ravi Kumar** and 12 million workers like him face the same reality:

```
☔  Heavy rain floods Andheri West
         ↓
🛵  Ravi cannot ride safely
         ↓
📦  Zero deliveries completed today
         ↓
💸  ₹0 earned — but rent, EMI & groceries still due
         ↓
😔  No insurance. No compensation. Nothing.
```

**These workers lose 20–30% of their monthly income** due to events completely outside their control.

> 💬 *"When it rains heavily, I just sit at home watching money disappear. Nobody helps me."*
> — Ravi Kumar, Zomato Delivery Partner, Andheri West, Mumbai

### The Scale of the Problem

| Metric | Value |
|--------|-------|
| Gig delivery workers in India | **12 million+** |
| Monthly income lost per worker | **₹1,500 – ₹3,600** |
| Annual income lost across all workers | **₹21,600 Crore** |
| Current insurance products covering this | **ZERO** |
| Average daily earning | **₹600** |
| Days lost per month to disruptions | **4–6 days** |

---

## 💡 Our Solution

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   DISRUPTION HITS                                           │
│        ↓                                                    │
│   APIs DETECT  (Weather + Traffic + AQI — every 15 sec)    │
│        ↓                                                    │
│   GPS + CAMERA VERIFY  (Worker is physically in zone)      │
│        ↓                                                    │
│   AI VALIDATES  (5 ML models confirm, fraud check passes)  │
│        ↓                                                    │
│   ₹480 PAID via UPI  (Under 10 minutes, zero forms)        │
│        ↓                                                    │
│   APP SHOWS SAFE ROUTE  (Nearby orders + clear roads)      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

</div>

**GigShield** is an AI-powered Progressive Web App (PWA) that:

- 🌧️ **Monitors** weather, traffic, AQI and GPS in real-time using free APIs
- 📸 **Verifies** with GPS-stamped camera photo proof from the worker's location
- 🤖 **Validates** using 5 trained ML models with fraud detection
- 💸 **Pays** via UPI in under 10 minutes — zero claim forms ever
- 🗺️ **Navigates** workers to safe routes and nearby earning opportunities
- 📄 **Verifies** identity via Aadhaar + Platform Partner ID
- 🌐 **Speaks** 7 Indian languages including Hindi, Tamil, Telugu, Kannada

### What Makes GigShield Different

| Feature | Traditional Insurance | GigShield |
|---------|----------------------|-----------|
| Claim process | Manual form → 2–3 weeks | Zero forms → 10 minutes ✅ |
| Trigger mechanism | Worker reports loss | API auto-detects ✅ |
| Fraud check | Human investigator | 5-layer AI verification ✅ |
| Location proof | Worker's word | GPS camera with watermark ✅ |
| Zone precision | City-wide | 500m hyper-zone ✅ |
| Language support | English only | 7 Indian languages ✅ |
| Navigation help | None | Safe route + nearby orders ✅ |
| Identity verification | Branch visit | Aadhaar OCR in-app ✅ |
| Pricing | Fixed for all | AI-personalised weekly ✅ |
| Storm preparation | Compensate after | Predict + buy early ✅ |

---

## 👤 Persona & Scenarios

### Our Primary Delivery Partner

```
╔═══════════════════════════════════════════════════════════╗
║   👤  RAVI KUMAR                                          ║
║   📍  Andheri West, Mumbai                                ║
║   🛵  Zomato Food Delivery Partner                        ║
║   ⏰  Works 8–10 hours per day, 6 days a week             ║
║   💰  Earns ₹600/day  (₹80/hour average)                  ║
║   📱  ₹9,000 Android phone — Chrome browser               ║
║   🗣️  Speaks Hindi and Marathi, basic English              ║
║   😟  Zero financial safety net                            ║
║   📋  No Aadhaar-linked bank loan eligibility              ║
╚═══════════════════════════════════════════════════════════╝
```

### Other Personas Supported

| Persona | City | Platform | Language | Key Disruption |
|---------|------|----------|----------|----------------|
| Deepa S | Chennai | Swiggy | Tamil | Cyclone + flooding Nov–Jan |
| Arjun R | Bangalore | BlinkIt | Kannada | Flash flooding + heat |
| Salman K | Delhi | Amazon Flex | Hindi | AQI 400+ Oct–Feb |
| Venkat P | Hyderabad | Zepto | Telugu | Extreme heat May–Jun |
| Sanjay M | Pune | Dunzo | Marathi | Monsoon flooding |

---

### 🌧️ Scenario 1 — Heavy Rainfall *(Most Common)*

**Tuesday 9:00 AM — Andheri West — Rainfall: 72mm**

```
Step 1  →  Open-Meteo API detects 72mm in Andheri West zone
Step 2  →  72mm > 60mm threshold — TRIGGER FIRES
Step 3  →  TomTom API confirms 80% roads blocked in zone
Step 4  →  Ravi's GPS shows him stationary in flooded zone
Step 5  →  Ravi gets notification: "Take a photo to confirm"
Step 6  →  Ravi takes GPS Camera photo — coordinates embedded
Step 7  →  Isolation Forest fraud score: 0.08 — CLEAN
Step 8  →  Decision Engine → AUTO_PAYOUT
Step 9  →  Razorpay UPI fires → ravi.kumar@upi → ₹480 in 8 min ✅

Simultaneously:
→  App activates Safe Zone Mode
→  Shows 3 nearby orders in Bandra (clear roads, 1.5km away)
→  Provides turn-by-turn directions avoiding all flooded roads
→  Voice alert in Hindi: "आपके खाते में ₹480 जमा हो गए"
```

---

### ☀️ Scenario 2 — Extreme Heat

**May afternoon — Kurla — Temperature: 47°C**

```
→  47°C > 45°C threshold → TRIGGER
→  GPS confirms worker in Kurla zone
→  75% of daily average → ₹450 auto-credited
→  App shows: "Avoid Zone 3 — dangerously hot"
→  Suggests nearby AC restaurant rest point
```

---

### 🌫️ Scenario 3 — Severe Pollution

**Winter morning — Delhi — AQI: 420**

```
→  AQICN reports AQI 420 > 400 threshold
→  50% daily average → ₹300 auto-credited
→  App shows: "Wear N95 mask — AQI hazardous"
→  Directions to nearest safe indoor zone
```

---

### 🚨 Scenario 4 — Curfew / Strike

**Sudden curfew declared across 3 pincodes**

```
→  Admin logs curfew event
→  47 insured workers in pincodes identified
→  100% payout fired for each → ₹600 each
→  All 47 workers paid within 10 minutes
→  App shows zone boundary map with restrictions
```

---

### 🔮 Scenario 5 — Storm Prep Mode *(Our Innovation)*

**Monday 8:00 AM — AI predicts heavy rain tomorrow**

```
→  Open-Meteo forecast: 90mm predicted tomorrow 2–6 PM
→  Ravi notified at 8 AM today:
   "Heavy rain tomorrow in your zone.
    Buy ₹8 advance coverage now (rises to ₹20 when rain starts)"
→  Ravi buys ₹8 advance coverage
→  Rain hits tomorrow → Payout fires → ₹480 credited
→  Ravi saved ₹12 by acting early
```

> 🏆 This **prevents financial damage before it happens** — not just compensating after.

---

### 🗺️ Scenario 6 — Navigation & Directions *(New Feature)*

**Disruption detected — worker needs to reach safe zone**

```
→  App detects flood in Andheri West zone
→  Ravi is at Lokhandwala Market
→  App calculates: Nearest safe earning zone = Bandra West (2.1km)
→  Turn-by-turn directions shown:
   📍 Start: Lokhandwala Market (current GPS)
   ↗️  Turn right on SV Road — CLEAR ✅
   🔴 Avoid: Link Road — FLOODED ❌
   ↗️  Continue on Linking Road — CLEAR ✅
   📦 Destination: Bandra West — 3 available orders
→  Live traffic overlay shows red/green road segments
→  Estimated travel: 18 minutes on safe route
→  Available orders at destination: ₹65, ₹80, ₹75
```

---

## ⚙️ How the System Works

```
                    ┌──────────────────────────┐
                    │      WORKER SIGNUP        │
                    └────────────┬─────────────┘
                                 │
          Phone OTP → Aadhaar OCR → Partner ID → Zone → UPI
                                 │
                    ┌────────────▼─────────────┐
                    │      POLICY ISSUED        │
                    │   ₹20/week premium        │
                    └────────────┬─────────────┘
                                 │
    ┌────────────────────────────▼──────────────────────────┐
    │          REAL-TIME MONITORING  (every 15 seconds)     │
    │   🌧️ Open-Meteo + 😷 AQICN + 🚗 TomTom + 📍 GPS     │
    └────────────────────────────┬──────────────────────────┘
                                 │
              ┌──────────────────▼──────────────────┐
              │       Threshold breached?             │
              │  NO  → Keep monitoring               │
              │  YES → Request GPS Camera Photo      │
              └──────────────────┬──────────────────┘
                                 │
    ┌────────────────────────────▼──────────────────────────┐
    │              5-LAYER FRAUD VERIFICATION               │
    │   ✓  GPS matches registered zone (±500m)             │
    │   ✓  Camera photo GPS = zone GPS                     │
    │   ✓  Speed during disruption < 20 km/h               │
    │   ✓  No duplicate claim today                        │
    │   ✓  Isolation Forest ML score < 0.30                │
    └────────────────────────────┬──────────────────────────┘
                                 │
              ┌──────────────────▼──────────────────┐
              │      All 5 checks pass?              │
              │  NO  → Flag + hold for manual review │
              │  YES → Calculate payout              │
              └──────────────────┬──────────────────┘
                                 │
    ┌────────────────────────────▼──────────────────────────┐
    │   payout = hourly_rate × hours_lost × disruption_%   │
    │   Razorpay UPI fires → Worker notified in language    │
    │   Safe Route Mode → Turn-by-turn directions shown    │
    │   Nearby Orders → Available earnings displayed        │
    └───────────────────────────────────────────────────────┘
```

---

## 🗺️ Smart Navigation & Directions

### How Directions Work

This is one of GigShield's most powerful features. When disruption hits, the worker doesn't just receive money — **the app actively guides them to the nearest safe earning zone with real-time turn-by-turn directions.**

```
DISRUPTION DETECTED IN WORKER'S ZONE
              ↓
App fetches live traffic data from TomTom API
              ↓
Calculates all roads within 5km radius
              ↓
Marks roads: 🔴 BLOCKED | 🟡 SLOW | 🟢 CLEAR
              ↓
Finds nearest safe zone with available orders
              ↓
Generates safe route avoiding all blocked roads
              ↓
Shows turn-by-turn directions with road status
              ↓
Updates directions live as conditions change
```

### Direction Card Example

```
┌─────────────────────────────────────────────┐
│  🗺️  Navigate to Safe Zone                   │
│  📍  Bandra West — 2.1 km away              │
│  ⏱️  Estimated: 18 minutes                   │
│  📦  3 orders available (₹65 + ₹80 + ₹75)   │
├─────────────────────────────────────────────┤
│  TURN-BY-TURN DIRECTIONS                    │
│                                             │
│  📍  You are here: Lokhandwala Market       │
│                                             │
│  1️⃣  ↗️  Turn RIGHT onto SV Road            │
│       Status: 🟢 CLEAR — 0.4km             │
│                                             │
│  2️⃣  ⬆️  Continue straight on Hill Road    │
│       Status: 🟢 CLEAR — 0.6km             │
│                                             │
│  ⚠️  AVOID: Link Road — 🔴 FLOODED         │
│       Water level: 3.2 feet                 │
│                                             │
│  3️⃣  ↖️  Turn LEFT onto Linking Road        │
│       Status: 🟡 SLOW — 0.8km              │
│       Reason: Minor waterlogging            │
│                                             │
│  4️⃣  ↗️  Turn RIGHT — Bandra West Market    │
│       Status: 🟢 CLEAR — 0.3km             │
│                                             │
│  🏁  DESTINATION: Bandra West              │
│       3 orders waiting for you             │
│                                             │
│  [▶ Start Navigation]  [📞 Call Support]   │
└─────────────────────────────────────────────┘
```

### Road Status Classifications

| Status | Color | Meaning | Action |
|--------|-------|---------|--------|
| Clear | 🟢 | Normal traffic, safe to ride | Proceed |
| Slow | 🟡 | Heavy traffic, minor delay | Proceed with caution |
| Blocked | 🔴 | Road closed / flooded | Avoid — reroute |
| Danger | ⛔ | Water depth > 2ft / unsafe | Do not enter |

### Live Traffic Overlay on Map

- Map shows all roads with live color overlay
- Red roads = blocked/flooded (TomTom data + weather cross-reference)
- Green roads = clear and safe
- Worker's GPS dot moves in real-time as they navigate
- Route updates automatically if a road becomes blocked mid-journey

### Why This Matters for Judges

> Most insurance products say "disruption detected — here is your money." GigShield goes further: **"Here is your money AND here is the safest way to keep earning today."** This transforms GigShield from a passive insurance product into an active income partner.

---

## 📸 GPS Camera & Location Proof

### How It Works

```
Worker opens GigShield app during disruption
              ↓
Taps "Take Proof Photo"
              ↓
Camera opens inside the browser
              ↓
Worker takes photo of surroundings (flood, blocked road, etc.)
              ↓
App automatically overlays on photo:
  📍 GPS Coordinates: 19.1136°N, 72.8697°E
  🕐 Timestamp: 9:14 AM, March 18, 2026
  🌧️ Rainfall: 74mm | 🌡️ Temp: 32°C | AQI: 145
  🚗 Traffic: 82% blocked | Zone: Andheri West
  👤 Worker: Ravi Kumar | GigShield Verified ✅
              ↓
Photo uploaded to secure storage with GPS metadata
              ↓
Backend validates: photo GPS vs zone GPS (±500m)
              ↓
Photo stored permanently as claim evidence
```

### What the Watermarked Photo Looks Like

```
┌──────────────────────────────────────────┐
│                                          │
│     [PHOTO OF FLOODED STREET/ROAD]       │
│                                          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  📍 19.1136°N, 72.8697°E               │
│  🕐 09:14 AM | March 18, 2026           │
│  🌧️ 74mm | 🌡️ 32°C | 😷 AQI: 145      │
│  🚗 Roads: 82% blocked                 │
│  📍 Zone: Andheri West, Mumbai          │
│  👤 Ravi Kumar | ID: ZMT-2847          │
│  ✅ GigShield Verified                  │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
└──────────────────────────────────────────┘
```

### Anti-Fraud Logic for Photos

```
Photo GPS vs Zone GPS deviation:
  < 500m  → ✅ VERIFIED — proceed to payout
  500m–2km → ⚠️  REVIEW — manual check triggered
  > 2km   → 🚫 BLOCKED — claim rejected + fraud flag

Additional checks:
  → Photo timestamp vs claim timestamp: must be within 30 minutes
  → Metadata GPS vs browser GPS: must match (prevents screenshot fraud)
  → Minimum photo resolution enforced (prevents stock photo upload)
  → Duplicate image hash check (same photo cannot be reused)
```

---

## 📄 Document Verification

### Onboarding Document Flow

```
Step 1: Phone OTP Login
Step 2: Upload Aadhaar Card photo
   → Tesseract.js reads 12-digit Aadhaar number
   → Format validated
   → Stored encrypted
Step 3: Upload Platform Partner ID screenshot
   → OCR reads Partner ID + city + status
   → Confirms active partner on platform
Step 4: Selfie liveness check
   → Compared to Aadhaar photo (basic match)
   → Prevents account sharing
Step 5: Profile created with verification badges
```

### Verification Tier System

```
🟡 Starter    Phone OTP only         Max payout: ₹200/event
🔵 Basic      Aadhaar verified       Max payout: ₹600/event
🟢 Verified   Aadhaar + Partner ID   Max payout: ₹1,500/event
🏆 Trusted    All docs + 12wk history Max payout: ₹3,000/week
```

### Why Document Verification Matters

- Prevents fake worker registrations
- Ensures insurance goes only to genuine delivery partners
- Fraud risk drops significantly with verified identity
- Workers with Trusted badge get lowest premium (₹10/week)
- Satisfies KYC compliance requirements for insurance products

---

## 📦 Nearby Orders Discovery

### The Feature That Goes Beyond Insurance

During any disruption, GigShield doesn't just pay the worker — it **shows them where to go to keep earning.**

```
DISRUPTION DETECTED
        ↓
Map activates with:
  🔴 Red zones  → Danger areas (avoid completely)
  🟡 Yellow zones → Caution areas (proceed carefully)
  🟢 Green zones → Safe areas with available orders
        ↓
Available orders shown in green zones:
  📦 Order 1: Bandra West → ₹75 → 1.2km → Road: Clear ✅
  📦 Order 2: Khar Road   → ₹80 → 1.8km → Road: Clear ✅
  📦 Order 3: Santacruz   → ₹55 → 2.1km → Road: Slow 🟡
        ↓
Worker taps order → Directions automatically generated
        ↓
Real-time route with live traffic overlay
```

### Earnings Maximizer Card

```
┌──────────────────────────────────────────┐
│  💡 TODAY'S EARNINGS PLAN                │
│                                          │
│  Insurance payout received:   ₹480      │
│  Nearby orders available:     ₹220      │
│                                          │
│  Total you can earn today:    ₹700      │
│  vs. staying home:            ₹480      │
│                                          │
│  Extra earned by going safe:  +₹220     │
│                                          │
│  [📍 Show Me Safe Orders →]             │
└──────────────────────────────────────────┘
```

---

## 💰 Weekly Premium Model

### Why Weekly (Not Monthly or Yearly)?

> Gig workers earn weekly. They think weekly. They plan weekly.
> A ₹20/week premium auto-deducted from Zomato settlement = less than one chai per day.
> Workers barely notice it — until the day they desperately need it.

### Premium Auto-Deduction Flow

```
Sunday night
    → Zomato/Swiggy settles Ravi's weekly earnings
    → GigShield deducts ₹20 automatically from settlement
    → New policy activates Monday 12:00 AM
    → Coverage runs Mon → Sun, 24 hours × 7 days
    → Worker gets WhatsApp/SMS confirmation
```

### AI-Driven Dynamic Pricing — Behavioral Trust Score

| Tier | Criteria | Weekly Premium | Max Payout |
|------|----------|---------------|------------|
| 🆕 Starter | Week 1–3, no history | ₹25/week | ₹1,500 |
| ✅ Standard | 4+ weeks, BTS 60+ | ₹20/week | ₹2,000 |
| ⭐ Trusted | 12+ weeks, BTS 80+ | ₹15/week | ₹2,500 |
| 👑 Elite | 6+ months, BTS 95+ | ₹10/week | ₹3,000 |

### Behavioral Trust Score (BTS) — How It's Calculated

```
BTS = (Working Consistency × 40%)
    + (Clean Claim Ratio    × 25%)
    + (GPS Zone Compliance  × 20%)
    + (Document Level       × 15%)

Example — Ravi Kumar:
  Working 6 days/week consistently    → 40/40
  2 valid claims, 0 fraudulent        → 25/25
  Always in registered zone           → 18/20
  Aadhaar verified, no Partner ID yet → 9/15
  Total BTS Score: 92/100 → ⭐ Trusted tier → ₹15/week
```

### Platform Financial Viability Model

```
Per 1,000 workers in one city zone:

💰 Weekly premium collected  →  ₹22,000
📊 Disruption rate           →  ~30% workers per event
💸 Average payout per claim  →  ₹400
📉 Weekly payout total       →  ₹12,000
✅ Platform weekly margin    →  ₹10,000

At 10,000 workers:
  Revenue:  ₹2,20,000/week
  Payouts:  ₹1,20,000/week
  Margin:   ₹1,00,000/week
```

---

## ⚡ Parametric Triggers

### All 8 Auto-Fire Triggers

```
┌──────────────────────────┬──────────────────────────┬─────────────────────┐
│ Disruption               │ Trigger Condition         │ Payout              │
├──────────────────────────┼──────────────────────────┼─────────────────────┤
│ 🌦️ Light Rain            │ Rainfall 30mm – 60mm      │ 25% of daily avg    │
│ ⛈️ Heavy Rain            │ Rainfall 60mm – 100mm     │ 50% of daily avg    │
│ 🌊 Flood Level Rain      │ Rainfall > 100mm           │ 100% of daily avg   │
│ 🌡️ Extreme Heat          │ Temperature > 45°C         │ 75% of daily avg    │
│ 😷 Mild Pollution        │ AQI 300 – 400              │ 25% of daily avg    │
│ ☣️ Severe Pollution      │ AQI > 400                  │ 50% of daily avg    │
│ 🚧 Road Closure          │ Roads blocked > 70%        │ 100% of daily avg   │
│ 🚨 Official Curfew       │ Any government declaration │ 100% of daily avg   │
└──────────────────────────┴──────────────────────────┴─────────────────────┘

Maximum weekly payout cap per worker: ₹3,000
Payout formula: hourly_rate × hours_lost × disruption_factor
```

### Triple Lock — All 3 APIs Must Agree

```
🌧️  Weather/AQI API  →  Disruption confirmed in worker's 500m zone
🚗  Traffic API      →  Roads physically blocked (>70% congestion)
📍  GPS + Camera     →  Worker stationary in zone + photo proof

           ALL THREE MUST CONFIRM
                    ↓
             PAYOUT FIRES ✅

    If any one fails → Payout held → Flagged for review
```

---

## 🤖 AI & ML Integration

### Model 1 — Risk Prediction (XGBoost Classifier)

```python
Algorithm: XGBoost Classifier
Dataset: 8,000 synthetic rows with realistic Indian city distributions

Training Features:
  rainfall_mm              historical_flood_frequency
  temperature_celsius      zone_infrastructure_score
  aqi_value               time_of_day
  traffic_congestion_pct  day_of_week
  humidity_percent        wind_speed_kmh

Output:
  risk_level: LOW | MEDIUM | HIGH
  confidence: 0.0 – 1.0
  payout_factor: 0.25 | 0.50 | 1.0
```

### Model 2 — Income Loss Estimation (LightGBM Regressor)

```python
Algorithm: LightGBM Regressor
Dataset: 8,000 rows based on Mumbai/Delhi/Bangalore earnings data

Training Features:
  hourly_rate             rainfall_intensity
  working_hours           traffic_severity
  disruption_duration     historical_earnings_trend
  demand_index            platform_order_volume
  weather_severity_score  time_slot_popularity

Output:
  predicted_loss_inr: float (₹0 – ₹1,200)
  disruption_factor: 0.0 – 1.0
```

### Model 3 — Fraud Detection (Isolation Forest)

```python
Algorithm: Isolation Forest (unsupervised anomaly detection)
Training: Trained on CLEAN data only → flags deviations

Detection Features:
  gps_deviation_km         speed_during_claim_kmh
  photo_gps_match          orders_completed_today
  claim_frequency_30days   aadhaar_verified_bool
  zone_match_score         time_since_last_claim_hrs
  network_vs_gps_match     accelerometer_motion_score

Output:
  fraud_score: 0.0 (clean) – 1.0 (fraud)
  recommendation: AUTO_APPROVE | MANUAL_REVIEW | BLOCK
```

### Model 4 — Dynamic Premium Pricing (Gradient Boosting Regressor)

```python
Algorithm: Gradient Boosting Regressor

Features:
  behavioral_trust_score   weeks_on_platform
  zone_flood_risk_score    historical_claim_rate
  daily_earning_average    document_verification_level

Output:
  weekly_premium_inr: ₹10 – ₹35
  tier: Starter | Standard | Trusted | Elite
```

### Model 5 — Zone Risk Classification (Random Forest Classifier)

```python
Algorithm: Random Forest Classifier
Applied to: Every 500m delivery zone in covered cities

Training Features:
  flood_events_5yr         road_drainage_quality_score
  avg_monsoon_rainfall_mm  elevation_above_sea_level_m
  historical_curfew_count  industrial_proximity_score

Output:
  zone_risk: HIGH | MEDIUM | LOW
  Used for: Personalising each worker's premium
```

### Decision Engine Logic

```python
def decide_payout(risk, fraud_score, in_zone, disruption_confirmed,
                  photo_verified, hourly_rate, hours_lost):

    if (risk == "HIGH"
        and fraud_score < 0.30
        and in_zone == True
        and disruption_confirmed == True
        and photo_verified == True):
        return {
            "decision": "AUTO_PAYOUT",
            "amount": hourly_rate * hours_lost * 1.0,
            "reason": "All 5 verification layers passed"
        }

    elif (risk == "MEDIUM"
          and fraud_score < 0.25
          and in_zone == True):
        return {
            "decision": "PARTIAL_PAYOUT",
            "amount": hourly_rate * hours_lost * 0.5
        }

    elif fraud_score >= 0.60:
        return {
            "decision": "BLOCK",
            "amount": 0,
            "reason": f"High fraud score: {fraud_score}"
        }

    else:
        return {"decision": "HOLD", "amount": 0}
```

### AI Explanation Engine

Every payout or denial generates a plain-language explanation in the worker's language:

```
PAYOUT EXPLANATION (English):
"You received ₹480 because heavy rainfall (74mm) was detected
in Andheri West at 9:14 AM, crossing our 60mm trigger threshold.
Your GPS confirmed you were in the zone. Your photo was taken
at the same location. Traffic API confirmed 82% road blockage.
Fraud score: 0.08 (very clean). Payout = ₹80/hr × 6hrs × 100%."

SAME EXPLANATION (Tamil):
"அண்ட்ஹேரி வெஸ்டில் காலை 9:14 மணிக்கு 74mm மழை பதிவாகியது.
உங்கள் GPS இடம் சரிபார்க்கப்பட்டது. புகைப்படம் சரிபார்க்கப்பட்டது.
₹480 உங்கள் UPI கணக்கில் வரவு வைக்கப்பட்டது."

DENIAL EXPLANATION:
"Your claim is on hold. Our GPS shows you were 6.2km outside
Andheri West when the disruption was detected. If this is
incorrect, please contact support with your photo proof.
Claims resolve within 24 hours."
```

---

## 🌐 Multilingual Support

### 7 Languages Supported From Day One

| Language | Script | Target Region | Workers |
|----------|--------|---------------|---------|
| English | Latin | All India | Default |
| हिंदी | Devanagari | Delhi, UP, Rajasthan | ~4M workers |
| தமிழ் | Tamil script | Chennai, Coimbatore | ~1.5M workers |
| తెలుగు | Telugu script | Hyderabad, Vijayawada | ~1.2M workers |
| ಕನ್ನಡ | Kannada script | Bangalore, Mysore | ~0.8M workers |
| मराठी | Devanagari | Mumbai, Pune | ~1.8M workers |
| বাংলা | Bengali script | Kolkata | ~0.7M workers |

### Language Features

```
✅ Complete UI translation — every button, label, error message
✅ Onboarding instructions in native language
✅ AI payout explanation in native language
✅ Voice alerts using Web Speech API (free, built-in browser)
✅ Turn-by-turn navigation voice in local language
✅ Push notification text in local language
✅ Worker selects language on first screen before OTP
✅ Language stored in profile — never needs to change again
```

### Voice Alert Examples

```
Hindi (payout received):
"आपके खाते में ₹480 जमा हो गए। भारी बारिश के कारण।"

Tamil (disruption warning):
"உங்கள் பகுதியில் கடும் மழை. பாதுகாப்பான பகுதிக்கு செல்லுங்கள்."

Telugu (navigation):
"కుడివైపు తిరగండి. రోడ్డు స్పష్టంగా ఉంది."
```

---

## 🛡️ Adversarial Defense & Anti-Spoofing Strategy

### The Threat: Market Crash Scenario

> 500 delivery partners. Fake GPS. Real payouts. A coordinated fraud ring just drained a platform's liquidity pool.

### Our 5-Layer Defense Architecture

```
LAYER 1: GPS PHOTO COORDINATE MATCH
  → Worker must take live photo during disruption
  → Photo GPS (from EXIF metadata) must match zone GPS ±500m
  → Screenshot detection: metadata GPS ≠ captured GPS = fraud flag
  → Same photo hash blocked: cannot reuse photos across claims

LAYER 2: SPEED ANALYSIS
  → GPS speed during claimed disruption must be < 20 km/h
  → If moving at 35+ km/h = impossible to be "stuck" in flood
  → Speed averaged over 10-minute window (single spikes ignored)
  → Consistent movement pattern during flood = automatic flag

LAYER 3: ACCELEROMETER CROSS-CHECK
  → Phone motion sensor accessed via browser DeviceMotion API
  → Stationary phone during flood claim = PASS
  → Phone in moving vehicle = FAIL (GPS spoofing attempt)
  → No motion sensor data available = elevated fraud score

LAYER 4: NETWORK TRIANGULATION
  → Browser reports approximate network location (cell towers)
  → Cross-referenced against GPS coordinates
  → GPS says Andheri West, network says Gurgaon = FLAG
  → Deviation > 5km triggers manual review

LAYER 5: ISOLATION FOREST ML PATTERN DETECTION
  → Model trained on 3 months of legitimate claim patterns
  → Flags workers whose claim pattern is 3× the zone average
  → Flags sudden spikes: 0 claims → 8 claims in 2 weeks
  → Zone-level baseline: if 40% of zone claims look identical = fraud ring alert
```

### Fraud Ring Detection Logic

```python
# Coordinated fraud ring signature
def detect_fraud_ring(claims_batch, time_window_minutes=90):

    # Signal 1: Too many claims too fast
    if len(claims_batch) > 10 and time_window_minutes < 90:
        flag_as_suspicious(claims_batch, reason="velocity_spike")

    # Signal 2: All GPS at identical coordinates
    unique_coords = set([(c.lat, c.lng) for c in claims_batch])
    if len(unique_coords) < len(claims_batch) * 0.3:
        flag_as_fraud_ring(claims_batch, reason="gps_clustering")

    # Signal 3: No photos uploaded
    photos_submitted = sum(1 for c in claims_batch if c.photo_uploaded)
    if photos_submitted / len(claims_batch) < 0.5:
        flag_as_suspicious(claims_batch, reason="no_photo_proof")

    # Signal 4: All newly registered
    new_accounts = sum(1 for c in claims_batch if c.worker.weeks_on_platform < 2)
    if new_accounts / len(claims_batch) > 0.7:
        flag_as_fraud_ring(claims_batch, reason="new_account_batch")
```

### Honest Worker vs Fraud Ring Comparison

| Signal | Honest Workers | Fraud Ring |
|--------|---------------|------------|
| Claim timing | Spread over 20–40 min | All within 90 seconds |
| GPS locations | Distributed across zone | Identical or clustered |
| Photo uploaded | Yes, from different angles | None, or same photo |
| Account age | 4+ weeks average | Mostly < 2 weeks |
| Speed during claim | Near 0 km/h | 30–60 km/h |
| BTS score | 60–90 | < 30 |
| Fraud score | 0.05 – 0.20 | 0.65 – 0.95 |

### Honeypot Zone Strategy ⭐ Innovation

```
GigShield maintains 3–5 "invisible" honeypot zones per city.

These are GPS coordinates that:
  → Do NOT appear on any map or zone list
  → NEVER have a real disruption declared for them
  → Are only known to the system backend

If any worker claims a disruption at a honeypot coordinate:
  → They could ONLY know that coordinate through GPS spoofing tools
  → Instant fraud flag + permanent account suspension
  → All associated accounts investigated

This silently catches GPS spoofers using pre-programmed coordinates.
```

### Graduated Response System

```
Fraud Score 0.00 – 0.30  →  AUTO_APPROVE  (pay immediately)
Fraud Score 0.31 – 0.50  →  SOFT_REVIEW   (pay + flag for monitoring)
Fraud Score 0.51 – 0.70  →  MANUAL_HOLD   (hold + request more proof)
Fraud Score 0.71 – 1.00  →  BLOCK         (reject + freeze account)

Key principle: DO NOT punish honest workers for
borderline scores — only block above 0.70.
Workers at 0.31–0.70 still receive help.
```

---

## 🛠️ Tech Stack

### Frontend
```
⚛️  React.js (PWA)        →  Mobile-first, offline support, no install
🗺️  Leaflet.js            →  Zone map, live GPS, route visualization
🎨  Tailwind CSS          →  Fast responsive styling
📊  Recharts              →  Analytics dashboards
🔔  Firebase Messaging    →  Real-time push notifications
🌐  Custom i18n           →  7 Indian languages
🎤  Web Speech API        →  Voice alerts in local language
```

### Backend
```
🟢  Node.js + Express     →  REST API server
🍃  MongoDB Atlas         →  Worker profiles, policies, claims, GPS history
🔥  Firebase Realtime DB  →  Live GPS streaming
🔐  Firebase Auth         →  Phone OTP login
☁️  Cloudinary            →  GPS camera photo storage
```

### AI / ML
```
🐍  Python 3.11           →  ML pipeline
📦  scikit-learn          →  Isolation Forest, preprocessing
🚀  XGBoost               →  Risk classification
💡  LightGBM              →  Income loss regression
🌲  Gradient Boosting     →  Premium pricing, zone classification
🧪  FastAPI               →  Serving all 5 models as REST endpoints
📄  Tesseract.js          →  Aadhaar + Partner ID OCR
```

### External APIs (All Free Tier)
```
🌧️  Open-Meteo            →  Rainfall, temperature, 48hr forecast (free, no key)
☁️  OpenWeatherMap        →  Storm alerts (1000 calls/day free)
😷  AQICN                 →  Air Quality Index for Indian cities (free)
🚗  TomTom Traffic API    →  Road closures + live traffic (2500 calls/day free)
🗺️  OpenStreetMap         →  Base map tiles (free, unlimited)
🗺️  OSRM                  →  Turn-by-turn routing engine (free, self-hosted)
📍  Browser GPS API       →  Worker real-time location (built into phones)
📸  MediaDevices API      →  GPS Camera (built into browser)
💳  Razorpay Sandbox      →  UPI payout simulation
```

### Deployment
```
▲   Vercel    →  React PWA frontend
🚂  Railway   →  Node.js backend API
🍃  MongoDB Atlas → Database cluster
🐍  Render    →  Python FastAPI ML service
```

---

## 📅 Development Plan

```
PHASE 1 — Weeks 1–2: Ideation & Foundation             [CURRENT ◄]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅  Problem analysis and persona definition
  ✅  All features designed and documented
  ✅  API research and selection complete
  ✅  Anti-spoofing strategy (Market Crash response)
  ✅  README documentation
  ⬜  GitHub repository structure
  ⬜  2-minute strategy video

PHASE 2 — Week 3: Backend Core
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  Worker auth API (OTP, Aadhaar OCR, Partner ID)
  ⬜  MongoDB schemas (Worker, Claim, Policy, GPS, Photo)
  ⬜  Open-Meteo + TomTom + AQICN polling (15s interval)
  ⬜  Parametric trigger threshold engine (all 8)
  ⬜  GPS location history storage and querying
  ⬜  Basic fraud detection — GPS zone + duplicate check

PHASE 3 — Week 4: ML Models
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  Synthetic dataset generation (8,000 rows each)
  ⬜  XGBoost risk classifier training
  ⬜  LightGBM income loss regressor training
  ⬜  Isolation Forest fraud model training
  ⬜  Gradient Boosting premium model training
  ⬜  Random Forest zone classifier training
  ⬜  FastAPI endpoints for all 5 models

PHASE 4 — Week 5: Frontend
━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  Login → OTP → Onboarding (3 steps) → Dashboard
  ⬜  Leaflet map with live GPS dot + red/green zones
  ⬜  Smart navigation with turn-by-turn directions
  ⬜  Nearby safe orders panel
  ⬜  GPS Camera with coordinate watermark
  ⬜  Document upload (Aadhaar + Partner ID)
  ⬜  Multilingual support (all 7 languages)
  ⬜  Worker profile with location history

PHASE 5 — Week 6: Advanced Features
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  Disruption modal with animated ML pipeline
  ⬜  AI explanation generator (payout reasons)
  ⬜  Storm Prep Mode (48hr forecast + advance pricing)
  ⬜  Voice alerts in 7 languages (Web Speech API)
  ⬜  Razorpay UPI sandbox payout integration
  ⬜  BTS score calculation and tier system
  ⬜  Honeypot zone anti-fraud system

PHASE 6 — Week 7: Polish & Demo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  Admin analytics dashboard
  ⬜  End-to-end demo: rain → photo → directions → UPI
  ⬜  3-language demo (English, Hindi, Tamil)
  ⬜  Performance testing on 2G/3G connection
  ⬜  Final presentation deck
  ⬜  Full demo video recording
```

---

## 📁 Repository Structure

```
gigshield/
│
├── 📄  README.md
├── 🖥️  frontend/                     React PWA
│   └── src/
│       ├── components/
│       │   ├── Login/               OTP auth screens
│       │   ├── Onboarding/          3-step worker setup
│       │   ├── Dashboard/           Home screen + stats
│       │   ├── Navigation/          Turn-by-turn directions
│       │   ├── Map/                 Leaflet + GPS + zones
│       │   ├── Camera/              GPS photo capture
│       │   ├── Documents/           Aadhaar + Partner ID
│       │   ├── Storm/               48hr forecast + prep
│       │   ├── Policy/              Coverage details
│       │   ├── Payout/              History + simulator
│       │   ├── Profile/             Worker profile + history
│       │   └── Languages/           i18n + voice support
│       └── hooks/
│           ├── useLiveData.js       15s polling hook
│           ├── useGPS.js            Live location tracking
│           └── useAuth.js           Auth state management
│
├── ⚙️  backend/                      Node.js + Express
│   ├── routes/
│   │   ├── auth.js                  OTP login
│   │   ├── workers.js               Onboarding + profile
│   │   ├── triggers.js              Parametric engine
│   │   ├── navigation.js            Directions + safe routes
│   │   ├── payouts.js               UPI processing
│   │   └── dashboard.js             Analytics data
│   ├── services/
│   │   ├── weatherService.js        Open-Meteo API
│   │   ├── trafficService.js        TomTom API
│   │   ├── navigationService.js     OSRM routing engine
│   │   ├── fraudDetection.js        5-layer verification
│   │   ├── payoutService.js         Razorpay UPI
│   │   └── pollingService.js        15s background monitor
│   └── models/
│       ├── Worker.js
│       ├── Claim.js
│       ├── Policy.js
│       ├── LocationHistory.js
│       └── Photo.js
│
└── 🤖  ml/                           Python ML system
    ├── train_models.py               Trains all 5 models
    ├── api.py                        FastAPI serving all models
    ├── datasets/
    │   ├── risk_dataset.csv          8,000 rows
    │   ├── loss_dataset.csv          8,000 rows
    │   ├── fraud_dataset.csv         8,000 rows
    │   ├── premium_dataset.csv       5,000 rows
    │   └── zone_dataset.csv          2,000 rows
    └── models/
        ├── risk_model.pkl
        ├── loss_model.pkl
        ├── fraud_model.pkl
        ├── premium_model.pkl
        └── zone_model.pkl
```

---

## 👥 Team

| Member | Role | Responsibility |
|--------|------|----------------|
| Keerthana R | 🎨 Frontend Lead | React PWA, GPS Map, Navigation UI, Camera |
| Shakthi Ganesh | ⚙️ Backend Lead | Node.js APIs, MongoDB, Razorpay, Routing |
| Sanjith | 🤖 AI/ML Lead | 5 models, fraud detection, training pipeline |
| Akshay Gopi | 📊 Product Lead | Strategy, Presentation, Demo Video |

---

## 🏆 Why GigShield Will Win

| Unique Feature | Why Judges Remember It |
|----------------|----------------------|
| 📸 GPS Camera with watermark | Worker photographs the flood — GPS + weather stamped on it. No other team has this. |
| 🗺️ Turn-by-turn safe directions | App navigates worker around blocked roads to nearest earning opportunity. Beyond the brief. |
| 🌐 7 Indian languages + voice | Real delivery workers can use this. 80% don't speak English. |
| 🔮 Storm Prep Mode | Buy cheap coverage before rain. Prevents loss, doesn't just compensate. |
| 🛡️ Honeypot zones | Creative anti-fraud — fake zones catch GPS spoofers. |
| 🤖 AI explains every decision | Worker knows exactly why ₹480 arrived in 10 minutes. |
| 📄 Aadhaar OCR verification | KYC in onboarding — no branch visit needed. |
| 📦 Nearby orders discovery | Insurance + income partner combined. |

---

<div align="center">

### Built for Guidewire DEVTrails 2026

*"12 million gig workers ride through India's storms every single day.*
*GigShield makes sure the storm never empties their wallet —*
*and then shows them the safest road back to earning."*

![Made in India](https://img.shields.io/badge/Made%20in-India%20🇮🇳-FF9933?style=for-the-badge)
![For Gig Workers](https://img.shields.io/badge/For-12M%20Gig%20Workers%20🛵-4CAF50?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/Powered%20by-5%20ML%20Models%20🤖-9C27B0?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-7%20Indian%20🌐-2196F3?style=for-the-badge)

</div>
