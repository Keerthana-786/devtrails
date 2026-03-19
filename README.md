# 🛵 GigShield
### *AI-Powered Parametric Income Insurance for India's Gig Delivery Workers*

<div align="center">

![Guidewire](https://img.shields.io/badge/Guidewire-DEVTrails%202026-FF6B35?style=for-the-badge)
![India](https://img.shields.io/badge/Made%20in-India%20🇮🇳-FF9933?style=for-the-badge)

**Detect → Verify → Pay → Navigate**
*No forms. No calls. Money in under 10 minutes.*

</div>

---

## 📖 Table of Contents
1. [The Problem](#1-the-problem)
2. [Persona & Scenarios](#2-persona--scenarios)
3. [Application Workflow](#3-application-workflow)
4. [Weekly Premium Model](#4-weekly-premium-model)
5. [Parametric Triggers](#5-parametric-triggers)
6. [Web vs Mobile Decision](#6-web-vs-mobile-decision)
7. [AI/ML Integration Plan](#7-aiml-integration-plan)
8. [Smart Navigation & Directions](#8-smart-navigation--directions)
9. [GPS Camera & Location Proof](#9-gps-camera--location-proof)
10. [Document Verification](#10-document-verification)
11. [Multilingual Support](#11-multilingual-support)
12. [Adversarial Defense & Anti-Spoofing](#12-adversarial-defense--anti-spoofing)
13. [Tech Stack](#13-tech-stack)
14. [Development Plan](#14-development-plan)
15. [Team](#15-team)

---

## 1. The Problem

India has **12 million+ gig delivery workers** on Zomato, Swiggy, Zepto, Amazon Flex, Dunzo and BlinkIt. These workers earn **only when they deliver**. When any external disruption stops them from working — they lose income with absolutely no protection.

```
☔ Heavy rain floods Andheri West
         ↓
🛵 Ravi Kumar cannot ride safely
         ↓
📦 Zero deliveries completed today
         ↓
💸 ₹0 earned — but rent, EMI, groceries still due
         ↓
😔 No insurance. No compensation. Nobody helps.
```

| The Scale | Numbers |
|-----------|---------|
| Gig delivery workers in India | 12 million+ |
| Monthly income lost per worker | ₹1,500 – ₹3,600 |
| Annual loss across all workers | ₹21,600 Crore |
| Insurance products covering this gap | **ZERO** |

> *"When it rains heavily, I just sit at home watching money disappear."*
> — Ravi Kumar, Zomato Delivery Partner, Andheri West, Mumbai

**Important:** We cover only **income loss** from external disruptions. We strictly exclude health, life, accidents, and vehicle repairs as required.

---

## 2. Persona & Scenarios

### Primary Persona — Ravi Kumar

```
👤  Name          :  Ravi Kumar
📍  Location      :  Andheri West, Mumbai
🛵  Platform      :  Zomato Food Delivery
⏰  Work Hours    :  8–10 hours/day, 6 days/week
💰  Daily Earning :  ₹600/day (₹80/hour average)
📱  Device        :  ₹9,000 Android phone, Chrome browser
🗣️  Language      :  Hindi + Marathi, basic English
😟  Safety Net    :  ZERO currently
```

### Other Personas Covered

| Worker | City | Platform | Language | Primary Disruption |
|--------|------|----------|----------|--------------------|
| Deepa S | Chennai | Swiggy | Tamil | Cyclones Nov–Jan |
| Arjun R | Bangalore | BlinkIt | Kannada | Flash floods + heat |
| Salman K | Delhi | Amazon Flex | Hindi | AQI 400+ Oct–Feb |
| Venkat P | Hyderabad | Zepto | Telugu | Extreme heat May–Jun |
| Sanjay M | Pune | Dunzo | Marathi | Monsoon flooding |

---

### 📋 Scenario 1 — Heavy Rainfall (Most Common)

**Tuesday 9:00 AM — Andheri West — Rainfall: 72mm**

```
1. Open-Meteo API detects 72mm rainfall in Andheri West zone
2. 72mm > 60mm threshold — TRIGGER FIRES
3. TomTom Traffic API confirms 82% roads blocked in zone
4. Ravi's GPS shows him stationary in flooded zone
5. App notifies Ravi: "Disruption detected. Take a proof photo."
6. Ravi opens GPS Camera → takes photo → coordinates embedded
7. Isolation Forest fraud check: score 0.08 → CLEAN
8. Decision Engine → AUTO_PAYOUT
9. Razorpay UPI fires → ₹480 credited in 8 minutes ✅
10. App activates Safe Zone Mode → directions to Bandra West shown
```

**Payout:** ₹80/hr × 6 hrs × 100% = **₹480**

---

### 📋 Scenario 2 — Extreme Heat

**May afternoon — Kurla — Temperature: 47°C**

```
1. Open-Meteo reports 47°C > 45°C threshold
2. GPS confirms worker is in Kurla zone
3. Fraud check passes (score: 0.12)
4. Payout: ₹80 × 6 × 75% = ₹360 auto-credited
5. App alerts: "Avoid Zone 3 — dangerously hot today"
6. Directions to nearest cool indoor safe zone shown
```

---

### 📋 Scenario 3 — Severe Pollution

**Winter morning — Delhi — AQI: 420**

```
1. AQICN API reports AQI 420 > 400 threshold
2. Worker GPS confirmed in Delhi zone
3. Payout: 50% of daily avg = ₹300 auto-credited
4. App voice alert in Hindi: "AQI खतरनाक स्तर पर है"
5. Nearest safe indoor zone shown on map
```

---

### 📋 Scenario 4 — Curfew / Strike

**Sudden curfew declared across 3 pincodes**

```
1. Admin logs curfew event in dashboard
2. System identifies 47 insured workers in affected pincodes
3. 100% payout fires for all 47 workers
4. ₹600 each credited within 10 minutes
5. App shows zone boundary map with curfew restrictions
```

---

### 📋 Scenario 5 — Storm Prep Mode (Our Innovation ⭐)

**Monday 8:00 AM — AI predicts heavy rain tomorrow**

```
1. Open-Meteo 48hr forecast: 90mm predicted tomorrow 2–6 PM
2. Ravi notified at 8 AM:
   "Heavy rain expected tomorrow in your zone.
    Buy ₹8 advance coverage now (rises to ₹20 when rain starts)"
3. Ravi buys ₹8 advance coverage → saves ₹12
4. Rain hits tomorrow → payout fires automatically → ₹480 credited
```

> This **prevents financial damage before it happens** — not just compensating after.

---

### 📋 Scenario 6 — Smart Navigation During Disruption (Our Innovation ⭐)

**Disruption in Andheri West — Ravi at Lokhandwala Market**

```
1. Flood detected in Ravi's current zone
2. App calculates nearest safe earning zone = Bandra West (2.1km)
3. Turn-by-turn directions generated in real time:

   📍 Start: Lokhandwala Market
   ↗️  SV Road          → 🟢 CLEAR (0.4km)
   ⬆️  Hill Road         → 🟢 CLEAR (0.6km)
   ❌  Link Road         → 🔴 FLOODED — AVOID
   ↖️  Linking Road      → 🟡 SLOW (0.8km)
   🏁  Bandra West       → 3 orders waiting (₹65, ₹80, ₹75)

4. Directions update live as road conditions change
5. Worker earns ₹480 insurance + ₹220 from safe orders = ₹700 total
```

---

## 3. Application Workflow

### End-to-End System Flow

```
WORKER SIGNS UP
      ↓
Phone OTP → Aadhaar OCR → Partner ID → Zone Selection → UPI ID
      ↓
POLICY ISSUED  (₹20/week, Monday 12:00 AM – Sunday 11:59 PM)
      ↓
REAL-TIME MONITORING  [every 15 seconds]
  Open-Meteo Weather + AQICN + TomTom Traffic + Browser GPS
      ↓
THRESHOLD BREACHED?
  NO  → Keep monitoring
  YES → Send notification to worker → Request GPS Camera photo
      ↓
5-LAYER VERIFICATION
  ✓ GPS in correct zone (±500m)
  ✓ Photo GPS matches zone GPS
  ✓ Speed < 20 km/h (worker is stationary)
  ✓ No duplicate claim today
  ✓ Isolation Forest ML score < 0.30
      ↓
ALL 5 PASS?
  NO  → Hold + manual review
  YES → Calculate payout
      ↓
PAYOUT CALCULATION
  hourly_rate × hours_lost × disruption_factor
      ↓
RAZORPAY UPI FIRES
  Worker notified in their language
  Voice alert in Hindi/Tamil/Telugu
      ↓
SAFE ZONE + DIRECTIONS ACTIVATED
  Turn-by-turn route to nearest safe earning zone
  Nearby available orders shown on Leaflet map
```

### Key Screens in the App

| Screen | Purpose |
|--------|---------|
| Login + OTP | Phone-based authentication |
| Onboarding (3 steps) | Name, zone, earnings, UPI, plan selection |
| Dashboard | Live conditions, BTS score, payout history, weekly chart |
| GPS Camera | Take location-stamped proof photo |
| Navigation | Turn-by-turn directions to safe zones |
| Safe Zone Map | Red/green zone overlay + nearby orders |
| Storm Forecast | 48hr prediction + advance coverage purchase |
| Policy Page | Coverage details, all 8 triggers, triple lock explanation |
| Claim History | All payouts with AI-generated explanations |
| Worker Profile | Live location, verification badges, document status |

---

## 4. Weekly Premium Model

### Why Weekly Pricing?

Gig workers are paid **weekly** by their platforms (Zomato/Swiggy settle earnings every Sunday). They think in weekly budgets. A ₹20/week premium auto-deducted from their weekly settlement is completely frictionless — they barely notice it until the day they need it.

> ₹20/week = less than **one chai per day**

### Auto-Deduction Flow

```
Sunday night
    → Platform settles Ravi's weekly earnings
    → GigShield deducts ₹20 automatically
    → New policy activates Monday 12:00 AM
    → Coverage: Mon 12:00 AM → Sun 11:59 PM (24×7)
    → Worker receives SMS/WhatsApp confirmation
```

### Dynamic Pricing Tiers (AI-Calculated via Behavioral Trust Score)

| Tier | Criteria | Weekly Premium | Max Payout/Week |
|------|----------|---------------|-----------------|
| 🆕 Starter | Week 1–3, no history | ₹25 | ₹1,500 |
| ✅ Standard | 4+ weeks, BTS 60+ | ₹20 | ₹2,000 |
| ⭐ Trusted | 12+ weeks, BTS 80+ | ₹15 | ₹2,500 |
| 👑 Elite | 6+ months, BTS 95+ | ₹10 | ₹3,000 |

### Behavioral Trust Score (BTS) Calculation

```
BTS = (Working Consistency  × 40%)
    + (Clean Claim Ratio    × 25%)
    + (GPS Zone Compliance  × 20%)
    + (Document Level       × 15%)

Example — Ravi Kumar:
  Consistent 6 days/week         →  40/40
  2 valid claims, 0 fraudulent   →  25/25
  Always in registered zone      →  18/20
  Aadhaar verified only          →   9/15
  ─────────────────────────────────────────
  BTS: 92/100  →  ⭐ Trusted tier  →  ₹15/week
```

Higher trust = lower premium = more money stays with the worker.

### Platform Financial Viability

```
Per 1,000 workers (one city zone):
  Weekly premium collected  →  ₹22,000
  Weekly payouts (30% hit)  →  ₹12,000
  Platform margin           →  ₹10,000 ✅

At 10,000 workers:
  Revenue  →  ₹2,20,000/week
  Payouts  →  ₹1,20,000/week
  Margin   →  ₹1,00,000/week
```

---

## 5. Parametric Triggers

All triggers fire **automatically** when the threshold is crossed. No worker action required.

| # | Disruption | API Source | Trigger Condition | Payout |
|---|-----------|-----------|-------------------|--------|
| 1 | 🌦️ Light Rain | Open-Meteo | 30–60mm | 25% daily avg |
| 2 | ⛈️ Heavy Rain | Open-Meteo | 60–100mm | 50% daily avg |
| 3 | 🌊 Flood Rain | Open-Meteo | >100mm | 100% daily avg |
| 4 | 🌡️ Extreme Heat | Open-Meteo | Temperature >45°C | 75% daily avg |
| 5 | 😷 Mild Pollution | AQICN | AQI 300–400 | 25% daily avg |
| 6 | ☣️ Severe Pollution | AQICN | AQI >400 | 50% daily avg |
| 7 | 🚧 Road Closure | TomTom | Roads >70% blocked | 100% daily avg |
| 8 | 🚨 Curfew / Strike | Admin input | Govt declaration | 100% daily avg |

> **Payout Formula:** `hourly_rate × hours_lost × disruption_factor`
> **Weekly cap:** ₹3,000 per worker

### Triple Lock — All 3 Must Agree Before Payout

```
Lock 1 → 🌧️  Weather/AQI API  confirms disruption in worker's 500m zone
Lock 2 → 🚗  TomTom Traffic API  confirms roads are physically blocked
Lock 3 → 📍  GPS + Camera Photo  confirms worker is stationary in zone

All 3 pass  →  PAYOUT FIRES ✅
Any 1 fails →  HOLD → Manual review
```

---

## 6. Web vs Mobile Decision

### Decision: Progressive Web App (PWA) ✅

| Criteria | Native App | PWA — Our Choice |
|----------|-----------|-----------------|
| Installation needed | Yes — uses storage | Zero — opens in Chrome ✅ |
| Works on low-end phones | Sometimes fails | Always works ✅ |
| GPS access | Full | Full ✅ |
| Camera access | Full | Full ✅ |
| Push notifications | Yes | Yes ✅ |
| Works on 2G/3G | Slow | Lightweight ✅ |
| App store approval | Required (weeks) | Instant deployment ✅ |
| Offline support | Yes | Yes (service worker) ✅ |
| Update cycle | Store review | Instant ✅ |

### Why PWA Wins for This Persona

Most Zomato/Swiggy riders use **₹8,000–₹12,000 Android phones** with limited storage and intermittent 2G/3G connectivity. A PWA opens instantly in Chrome — no download, no installation, no barriers. The GPS, camera, push notifications and offline support available in PWAs are identical to what a native app provides.

**Language support:** Hindi · Tamil · Telugu · Kannada · Marathi · Bengali · English
**Voice alerts:** Web Speech API (built into browser, free, works in all 7 languages)

---

## 7. AI/ML Integration Plan

### Overview — 5 Trained ML Models

```
Model 1 → XGBoost Classifier      →  Risk Prediction (LOW/MEDIUM/HIGH)
Model 2 → LightGBM Regressor      →  Income Loss Estimation (₹ amount)
Model 3 → Isolation Forest        →  Fraud Detection (score 0–1)
Model 4 → Gradient Boosting Reg   →  Dynamic Premium Pricing (₹10–₹35/wk)
Model 5 → Random Forest Classifier →  Zone Risk Classification per 500m
```

All models trained on **synthetic datasets** (5,000–8,000 rows each) with realistic distributions based on Indian city climate and gig economy data. Served via **Python FastAPI** as REST endpoints called by the Node.js backend.

---

### Model 1 — Risk Prediction (XGBoost Classifier)

**When called:** Every 15 seconds during monitoring, and on every claim evaluation

**Training features:**
```
rainfall_mm              temperature_celsius
aqi_value                traffic_congestion_pct
historical_flood_freq    zone_infrastructure_score
humidity_percent         time_of_day
wind_speed_kmh           day_of_week
```

**Output:**
```json
{
  "risk_level": "HIGH",
  "confidence": 0.91,
  "payout_factor": 1.0
}
```

---

### Model 2 — Income Loss Estimation (LightGBM Regressor)

**When called:** After risk is confirmed HIGH or MEDIUM, to calculate payout amount

**Training features:**
```
hourly_rate              hours_worked
rainfall_intensity       traffic_severity
demand_index             platform_order_volume
weather_severity_score   time_slot_popularity
```

**Output:**
```json
{
  "predicted_loss_inr": 480.0,
  "disruption_factor": 1.0,
  "estimated_payout": 480.0
}
```

---

### Model 3 — Fraud Detection (Isolation Forest)

**When called:** Before every payout — trained on clean data, flags deviations

**Detection features:**
```
gps_deviation_km         speed_during_claim_kmh
photo_gps_match          orders_completed_today
claim_frequency_30days   aadhaar_verified
zone_match_score         time_since_last_claim_hrs
network_vs_gps_match     accelerometer_motion_score
```

**Output:**
```json
{
  "fraud_score": 0.08,
  "is_suspicious": false,
  "recommendation": "AUTO_APPROVE"
}
```

**Fraud score thresholds:**
```
0.00–0.30  →  AUTO_APPROVE   (pay immediately)
0.31–0.50  →  MONITOR        (pay + flag for watching)
0.51–0.70  →  HOLD           (hold + request more proof)
0.71–1.00  →  BLOCK          (reject + freeze account)
```

---

### Model 4 — Dynamic Premium Pricing (Gradient Boosting Regressor)

**When called:** Every Sunday when policy renews, recalculates BTS-based premium

**Training features:**
```
behavioral_trust_score   weeks_on_platform
zone_flood_risk_score    historical_claim_rate
daily_earning_average    document_verification_level
```

**Output:**
```json
{
  "weekly_premium_inr": 15,
  "tier": "⭐ Trusted",
  "savings_vs_base": 10
}
```

---

### Model 5 — Zone Risk Classification (Random Forest Classifier)

**When called:** During onboarding and monthly zone re-evaluation

**Training features:**
```
flood_events_5yr         road_drainage_quality
avg_monsoon_rainfall     elevation_above_sea_level
historical_curfew_count  industrial_zone_proximity
```

**Output:**
```json
{
  "zone_risk": "HIGH",
  "zone_label": "Andheri West",
  "premium_multiplier": 1.2
}
```

---

### AI Decision Engine (Core Logic)

```python
def decide_payout(risk, fraud_score, in_zone,
                  disruption_confirmed, photo_verified,
                  hourly_rate, hours_lost):

    if (risk == "HIGH"
        and fraud_score < 0.30
        and in_zone
        and disruption_confirmed
        and photo_verified):
        return {
            "decision": "AUTO_PAYOUT",
            "amount": hourly_rate * hours_lost * 1.0,
            "reason": "All 5 verification layers passed"
        }

    elif risk == "MEDIUM" and fraud_score < 0.25 and in_zone:
        return {
            "decision": "PARTIAL_PAYOUT",
            "amount": hourly_rate * hours_lost * 0.5
        }

    elif fraud_score >= 0.70:
        return {"decision": "BLOCK", "amount": 0}

    else:
        return {"decision": "HOLD", "amount": 0}
```

### AI Explanation Engine

Every payout or denial generates a plain-language explanation in the worker's own language:

```
PAYOUT — English:
"You received ₹480 because heavy rain (74mm) was detected in
Andheri West at 9:14 AM — above our 60mm threshold. Your GPS
confirmed you were in the zone. Your photo matched. Roads were
82% blocked. Fraud score: 0.08 (clean). ₹80×6hrs×100% = ₹480."

SAME — Tamil:
"அண்ட்ஹேரி வெஸ்டில் 74mm மழை பதிவாகியது. உங்கள் இருப்பிடம்
சரிபார்க்கப்பட்டது. ₹480 உங்கள் கணக்கில் வரவு வைக்கப்பட்டது."

DENIED — English:
"Claim held. GPS shows you were 6.2km outside Andheri West
at the time. If incorrect, contact support with your photo proof."
```

---

## 8. Smart Navigation & Directions

When a disruption is detected, GigShield doesn't just pay the worker — it **actively guides them to the nearest safe earning zone** using real-time road data.

### How It Works

```
Disruption detected in worker's zone
         ↓
TomTom API fetches live road status for all roads within 5km
         ↓
Roads classified:  🟢 CLEAR  |  🟡 SLOW  |  🔴 BLOCKED  |  ⛔ DANGER
         ↓
OSRM routing engine finds safest path to nearest green zone with orders
         ↓
Turn-by-turn directions shown with road status on each step
         ↓
Directions update live as conditions change
         ↓
Worker arrives at safe zone → available orders shown
```

### Sample Direction Card

```
🗺️  Navigate to Safe Zone — Bandra West
📍  2.1 km away  |  ⏱️ ~18 minutes  |  📦 3 orders available

  1️⃣  ↗️  Turn RIGHT onto SV Road         🟢 CLEAR  (0.4km)
  2️⃣  ⬆️  Continue on Hill Road           🟢 CLEAR  (0.6km)
  ⚠️      AVOID: Link Road               🔴 FLOODED
  3️⃣  ↖️  Turn LEFT onto Linking Road     🟡 SLOW   (0.8km)
  4️⃣  ↗️  Turn RIGHT → Bandra West        🟢 CLEAR  (0.3km)
  🏁      Destination — Orders: ₹65, ₹80, ₹75 waiting
```

### Earnings Maximizer

```
💡 Today you can earn:
   Insurance payout:      ₹480
   Nearby safe orders:    ₹220
   ─────────────────────────────
   Total possible:        ₹700  (vs ₹480 staying home)
```

---

## 9. GPS Camera & Location Proof

### How It Works

```
Worker taps "Take Proof Photo" during disruption
         ↓
Camera opens inside browser (MediaDevices API)
         ↓
Worker photographs the disruption (flooded road, blocked traffic)
         ↓
App stamps on photo automatically:
  📍 GPS: 19.1136°N, 72.8697°E
  🕐 Time: 09:14 AM, March 18, 2026
  🌧️ Rain: 74mm  |  Temp: 32°C  |  AQI: 145
  🚗 Traffic: 82% blocked  |  Zone: Andheri West
  👤 Worker: Ravi Kumar    |  ✅ GigShield Verified
         ↓
Photo uploaded to secure storage with GPS metadata
         ↓
Backend validates: photo GPS vs zone GPS must be within 500m
```

### Anti-Fraud Logic

```
Deviation < 500m   →  ✅ VERIFIED — proceed to payout
Deviation 500m–2km →  ⚠️  REVIEW   — manual check triggered
Deviation > 2km    →  🚫 BLOCKED  — claim rejected + fraud flag
Same photo hash    →  🚫 BLOCKED  — duplicate photo rejected
Timestamp gap >30m →  ⚠️  REVIEW   — photo not taken at claim time
```

---

## 10. Document Verification

### Onboarding Verification Flow

```
Step 1 → Phone OTP login
Step 2 → Upload Aadhaar Card photo
         → Tesseract.js OCR reads 12-digit number
         → Format validated + encrypted storage
Step 3 → Upload Platform Partner ID screenshot
         → OCR reads Partner ID + active status
         → Confirms genuine delivery partner
Step 4 → Selfie liveness check
         → Compared to Aadhaar photo (basic match)
         → Prevents account sharing
Step 5 → Verification badges applied to profile
```

### Verification Tier Impact

| Badge | Documents | Max Payout | Premium Impact |
|-------|-----------|-----------|----------------|
| 🟡 Starter | Phone OTP only | ₹200/event | Full price |
| 🔵 Basic | Aadhaar verified | ₹600/event | -₹2/week |
| 🟢 Verified | Aadhaar + Partner ID | ₹1,500/event | -₹4/week |
| 🏆 Trusted | All docs + 12 weeks | ₹3,000/week | Lowest tier |

---

## 11. Multilingual Support

### 7 Languages Supported

| Language | Target Region | Workers Covered |
|----------|--------------|-----------------|
| English | All India | Default |
| हिंदी Hindi | Delhi, UP, Rajasthan | ~4M |
| தமிழ் Tamil | Chennai, Coimbatore | ~1.5M |
| తెలుగు Telugu | Hyderabad, Vijayawada | ~1.2M |
| ಕನ್ನಡ Kannada | Bangalore, Mysore | ~0.8M |
| मराठी Marathi | Mumbai, Pune | ~1.8M |
| বাংলা Bengali | Kolkata | ~0.7M |

### What Is Translated

- Every button, label, error message and screen
- Onboarding instructions in native language
- AI payout and denial explanations
- Voice alerts via Web Speech API (free, built into browser)
- Turn-by-turn navigation directions spoken aloud
- Push notification text

### Voice Alert Examples

```
Hindi  →  "आपके खाते में ₹480 जमा हो गए। भारी बारिश के कारण।"
Tamil  →  "உங்கள் கணக்கில் ₹480 வரவு வைக்கப்பட்டது"
Telugu →  "మీ ఖాతాలో ₹480 జమ చేయబడింది"
```

---

## 12. Adversarial Defense & Anti-Spoofing Strategy

*(Direct response to Phase 1 Market Crash Challenge)*

### Threat: 500 workers using fake GPS to claim payouts simultaneously

### 5-Layer Defense Architecture

```
Layer 1 — GPS Photo Match
  Photo GPS coordinate must match claimed zone GPS within ±500m.
  Screenshot detection: EXIF GPS ≠ live GPS = immediate flag.
  Duplicate image hash blocked — same photo cannot be reused.

Layer 2 — Speed Analysis
  Worker must be moving < 20 km/h during the disruption claim.
  Averaged over 10-minute GPS window (not single-point spoofing).
  Moving at 40+ km/h during "flood" = physically impossible.

Layer 3 — Accelerometer Cross-Check
  Browser DeviceMotion API checks phone motion sensor.
  Stationary phone = PASS.
  Phone in moving vehicle pattern = FAIL.

Layer 4 — Network vs GPS Triangulation
  Browser reports approximate location via network/cell towers.
  GPS says Andheri West + Network says Gurgaon = FLAG.
  Deviation > 5km triggers automatic manual review.

Layer 5 — Isolation Forest ML Pattern Detection
  Trained on 3 months of legitimate claim patterns.
  Flags workers whose claim rate is 3× the zone average.
  Detects sudden spikes: 0 claims → 8 claims in 2 weeks.
```

### Fraud Ring Detection

```python
def detect_fraud_ring(claims_batch, time_window_minutes):

    # Too many claims too fast
    if len(claims_batch) > 10 and time_window_minutes < 90:
        flag("velocity_spike")

    # All GPS at identical coordinates
    unique_coords = set([(c.lat, c.lng) for c in claims_batch])
    if len(unique_coords) < len(claims_batch) * 0.3:
        flag("gps_clustering")

    # No photos uploaded
    photos = sum(1 for c in claims_batch if c.photo_uploaded)
    if photos / len(claims_batch) < 0.5:
        flag("no_photo_proof")

    # All newly registered
    new_accs = sum(1 for c in claims_batch if c.weeks_on_platform < 2)
    if new_accs / len(claims_batch) > 0.7:
        flag("new_account_batch")
```

### Honest Worker vs Fraud Ring

| Signal | Honest Workers ✅ | Fraud Ring 🚫 |
|--------|-----------------|--------------|
| Claim timing | Spread over 20–40 min | All within 90 seconds |
| GPS coordinates | Distributed across zone | Identical / clustered |
| Photo uploaded | Yes, different angles | None, or same photo |
| Account age | 4+ weeks average | < 2 weeks mostly |
| Speed during claim | ~0–2 km/h | 30–60 km/h |
| Fraud score | 0.05–0.20 | 0.65–0.95 |

### Honeypot Zones (Our Innovation)

System secretly maintains 3–5 GPS coordinates per city that never appear in any zone list. Any worker submitting a claim from a honeypot coordinate is a GPS spoofer — instant block + full investigation.

### Graduated Response (No False Punishments)

```
Fraud 0.00–0.30  →  AUTO_APPROVE  — pay immediately, no friction
Fraud 0.31–0.50  →  MONITOR       — pay, flag for pattern watching
Fraud 0.51–0.70  →  HOLD          — hold + request additional proof
Fraud 0.71–1.00  →  BLOCK         — reject + freeze account
```

> **Critical principle:** We never block a worker purely for a borderline score. Only scores above 0.70 receive a block. Workers at 0.31–0.70 are still helped and paid, just watched more closely.

---

## 13. Tech Stack

### Frontend
```
React.js (PWA)       Mobile-first, offline support, zero install
Tailwind CSS         Responsive, fast styling
Leaflet.js           Zone map, GPS dot, live traffic overlay
Recharts             Dashboard charts and analytics
Web Speech API       Voice alerts in 7 languages (free, built-in)
MediaDevices API     GPS Camera with watermark (free, built-in)
Geolocation API      Live GPS tracking (free, built-in)
Tesseract.js         Aadhaar + Partner ID document OCR
Custom i18n JSON     7-language translation system
```

### Backend
```
Node.js + Express    REST API server
MongoDB Atlas        Worker profiles, policies, claims, GPS history
Firebase Auth        Phone OTP authentication
Firebase Realtime DB Live GPS streaming
Cloudinary           GPS camera photo secure storage
```

### ML System
```
Python 3.11          ML pipeline
scikit-learn         Isolation Forest, preprocessing
XGBoost              Risk prediction classifier
LightGBM             Income loss regressor
Gradient Boosting    Premium pricing model
Random Forest        Zone risk classifier
FastAPI              Serves all 5 models as REST endpoints
joblib / pickle      Model serialization
```

### External APIs (All Free Tier)
```
Open-Meteo           Rainfall, temperature, 48hr forecast (free, no key)
OpenWeatherMap       Storm alerts (1,000 calls/day free)
AQICN               Air Quality Index — Indian cities (free)
TomTom Traffic API   Road closures, live traffic (2,500 calls/day free)
OSRM                 Turn-by-turn routing engine (free, open source)
Razorpay Sandbox     UPI payout simulation
```

### Deployment
```
Vercel               React PWA frontend
Railway              Node.js backend API
MongoDB Atlas        Database cluster (free tier)
Render               Python FastAPI ML service
```

---

## 14. Development Plan

```
PHASE 1 — Weeks 1–2: Ideation & Foundation              ← CURRENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅  Persona research and scenario design
  ✅  All features designed and documented
  ✅  API research and free-tier selection
  ✅  Anti-spoofing strategy (Market Crash response)
  ✅  README Phase 1 submission
  ⬜  GitHub repo structure
  ⬜  2-minute strategy video

PHASE 2 — Week 3: Backend Core
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  Worker auth (OTP + Aadhaar OCR + Partner ID)
  ⬜  MongoDB schemas: Worker, Claim, Policy, GPS, Photo
  ⬜  API polling service (Open-Meteo + TomTom + AQICN, 15s)
  ⬜  Parametric trigger engine (all 8 thresholds)
  ⬜  GPS location history storage
  ⬜  OSRM routing service integration

PHASE 3 — Week 4: ML Pipeline
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  Synthetic dataset generation (5,000–8,000 rows each)
  ⬜  XGBoost risk model training
  ⬜  LightGBM income loss model training
  ⬜  Isolation Forest fraud model training
  ⬜  Gradient Boosting premium model training
  ⬜  Random Forest zone model training
  ⬜  FastAPI with all 5 model endpoints

PHASE 4 — Week 5: React PWA Frontend
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  Login → OTP → Onboarding (3 steps)
  ⬜  Dashboard: live conditions + BTS + weekly chart
  ⬜  Leaflet map: GPS dot + red/green zones
  ⬜  GPS Camera with coordinate watermark
  ⬜  Smart navigation with turn-by-turn directions
  ⬜  Nearby orders panel with earnings maximizer

PHASE 5 — Week 6: Advanced Features
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  7-language i18n + Web Speech API voice alerts
  ⬜  Document upload (Aadhaar + Partner ID OCR)
  ⬜  AI explanation generator (payout / denial reasons)
  ⬜  Storm Prep Mode (48hr forecast + advance pricing)
  ⬜  Worker profile with live location + badge system
  ⬜  Honeypot zone anti-fraud backend

PHASE 6 — Week 7: Polish & Demo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  Admin analytics dashboard
  ⬜  End-to-end demo: rain detected → photo → directions → UPI
  ⬜  3-language live demo (English + Hindi + Tamil)
  ⬜  Performance test on 2G connection
  ⬜  Final presentation deck
  ⬜  Full demo video (3–5 minutes)
```

---

## 15. Team

| Member | Role | Responsibility |
|--------|------|----------------|
| Keerthana R | 🎨 Frontend Lead | React PWA, Leaflet Map, GPS Camera, Navigation UI, Multilingual |
| Shakthi Ganesh | ⚙️ Backend Lead | Node.js APIs, MongoDB, OSRM Routing, Razorpay, Polling Engine |
| Sanjith | 🤖 ML Lead | 5 trained models, fraud detection, FastAPI, dataset generation |
| Akshay Gopi | 📊 Product Lead | Strategy, UI design, presentation, demo video, documentation |

---

## 📁 Repository Structure

```
gigshield/
├── README.md
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Login/           OTP authentication
│       │   ├── Onboarding/      3-step worker setup
│       │   ├── Dashboard/       Home screen + stats
│       │   ├── Navigation/      Turn-by-turn directions
│       │   ├── Map/             Leaflet + GPS + safe zones
│       │   ├── Camera/          GPS photo capture
│       │   ├── Documents/       Aadhaar + Partner ID verify
│       │   ├── Storm/           48hr forecast + prep mode
│       │   ├── Policy/          Coverage + triggers
│       │   ├── Payout/          History + AI explanation
│       │   └── Profile/         Worker profile + location
│       ├── hooks/
│       │   ├── useLiveData.js   15s polling
│       │   ├── useGPS.js        Live location tracking
│       │   └── useAuth.js       Auth state
│       └── languages/
│           └── i18n.js          7-language translations
├── backend/
│   ├── routes/
│   │   ├── auth.js              OTP + onboarding
│   │   ├── triggers.js          Parametric engine
│   │   ├── navigation.js        Directions + safe routes
│   │   ├── payouts.js           UPI processing
│   │   └── dashboard.js         Analytics
│   └── services/
│       ├── weatherService.js    Open-Meteo
│       ├── trafficService.js    TomTom API
│       ├── routingService.js    OSRM directions
│       ├── fraudDetection.js    5-layer verification
│       └── pollingService.js    15s background monitor
└── ml/
    ├── train_models.py          Trains all 5 models
    ├── api.py                   FastAPI endpoints
    ├── datasets/
    │   ├── risk_dataset.csv
    │   ├── loss_dataset.csv
    │   ├── fraud_dataset.csv
    │   ├── premium_dataset.csv
    │   └── zone_dataset.csv
    └── models/
        ├── risk_model.pkl
        ├── loss_model.pkl
        ├── fraud_model.pkl
        ├── premium_model.pkl
        └── zone_model.pkl
```

---

<div align="center">

### Built for Guidewire DEVTrails 2026

*"12 million gig workers ride through India's storms every single day.*
*GigShield makes sure the storm never empties their wallet —*
*and then shows them the safest road back to earning."*

![ML](https://img.shields.io/badge/ML%20Models-5%20Trained-9C27B0?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-7%20Indian-2196F3?style=for-the-badge)
![Workers](https://img.shields.io/badge/Target-12M%20Workers-FF6B35?style=for-the-badge)
![PWA](https://img.shields.io/badge/Platform-PWA%20No%20Install-22C55E?style=for-the-badge)

</div>
