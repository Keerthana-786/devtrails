# 🛵 PayNest
### *AI-Powered Parametric Income Insurance for India's Gig Delivery Workers*

<div align="center">

![Guidewire](https://img.shields.io/badge/Guidewire-DEVTrails%202026-FF6B35?style=for-the-badge)
![India](https://img.shields.io/badge/Made%20in-India%20🇮🇳-FF9933?style=for-the-badge)

**Detect → Verify → Pay → Navigate**
*No forms. No calls. No waiting. Money in under 10 minutes.*

</div>

---

## 📖 Table of Contents

| # | Section |
|---|---------|
| 1 | [The Problem](#1-the-problem) |
| 2 | [Our Solution](#2-our-solution) |
| 3 | [Persona & Scenarios](#3-persona--scenarios) |
| 4 | [Application Workflow](#4-application-workflow) |
| 5 | [Weekly Premium Model](#5-weekly-premium-model) |
| 6 | [Parametric Triggers](#6-parametric-triggers) |
| 7 | [Web vs Mobile Decision](#7-web-vs-mobile-decision) |
| 8 | [AI/ML Integration Plan](#8-aiml-integration-plan) |
| 9 | [Smart Navigation & Directions](#9-smart-navigation--directions) |
| 10 | [GPS Camera & Location Proof](#10-gps-camera--location-proof) |
| 11 | [Document Verification](#11-document-verification) |
| 12 | [Multilingual Support](#12-multilingual-support) |
| 13 | [Adversarial Defense & Anti-Spoofing](#13-adversarial-defense--anti-spoofing-strategy) |
| 14 | [Tech Stack](#14-tech-stack) |
| 15 | [Development Plan](#15-development-plan) |
| 16 | [Team](#16-team) |

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
| Average daily earning | ₹600 |
| Days lost per month to disruptions | 4–6 days |

> *"When it rains heavily, I just sit at home watching money disappear. Nobody helps me."*
> — Ravi Kumar, Zomato Delivery Partner, Andheri West, Mumbai

**Important:** PayNest covers only **income loss** from external disruptions. We strictly exclude health, life, accidents, and vehicle repairs as required by the problem statement.

---

## 2. Our Solution

**PayNest** is an AI-powered Progressive Web App that automatically detects disruptions, verifies the worker is genuinely affected using GPS + camera + 5 ML models, and pays them via UPI — without a single form, call, or approval.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   DISRUPTION HITS                                            │
│        ↓                                                     │
│   APIs DETECT  (Weather + Traffic + AQI — every 15 sec)     │
│        ↓                                                     │
│   GPS + CAMERA VERIFY  (Worker physically in zone)          │
│        ↓                                                     │
│   5 ML MODELS VALIDATE  (Risk + Loss + Fraud + Premium)     │
│        ↓                                                     │
│   ₹480 PAID via UPI  (Under 10 minutes, zero forms)         │
│        ↓                                                     │
│   APP NAVIGATES TO SAFE ZONE  (Turn-by-turn directions)     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### PayNest vs Everything Else

| Feature | Traditional Insurance | PayNest |
|---------|----------------------|---------|
| Claim process | Manual form → 2–3 weeks | Zero forms → 10 minutes ✅ |
| Trigger | Worker reports loss | API auto-detects ✅ |
| Fraud check | Human investigator | 5-layer AI verification ✅ |
| Location proof | Worker's word | GPS camera with watermark ✅ |
| Zone precision | City-wide | 500m hyper-zone ✅ |
| Language | English only | 7 Indian languages ✅ |
| Navigation | None | Safe route + nearby orders ✅ |
| Identity verification | Branch visit | Aadhaar OCR in-app ✅ |
| Pricing | Fixed for all | AI-personalised weekly ✅ |
| Storm prep | Pay after | Predict + buy early ✅ |

---

## 3. Persona & Scenarios

### Primary Persona — Ravi Kumar

```
╔══════════════════════════════════════════════════════════╗
║   👤  Name          :  Ravi Kumar                        ║
║   📍  Location      :  Andheri West, Mumbai              ║
║   🛵  Platform      :  Zomato Food Delivery              ║
║   ⏰  Work Hours    :  8–10 hours/day, 6 days/week       ║
║   💰  Daily Earning :  ₹600/day (₹80/hour average)       ║
║   📱  Device        :  ₹9,000 Android, Chrome browser    ║
║   🗣️  Language      :  Hindi + Marathi, basic English     ║
║   😟  Safety Net    :  ZERO currently                    ║
╚══════════════════════════════════════════════════════════╝
```

### Other Personas Supported

| Worker | City | Platform | Language | Primary Disruption |
|--------|------|----------|----------|--------------------|
| Deepa S | Chennai | Swiggy | Tamil | Cyclones Nov–Jan |
| Arjun R | Bangalore | BlinkIt | Kannada | Flash floods + heat |
| Salman K | Delhi | Amazon Flex | Hindi | AQI 400+ Oct–Feb |
| Venkat P | Hyderabad | Zepto | Telugu | Extreme heat May–Jun |
| Sanjay M | Pune | Dunzo | Marathi | Monsoon flooding |

---

### 📋 Scenario 1 — Heavy Rainfall *(Most Common)*

**Tuesday 9:00 AM — Andheri West — Rainfall: 72mm**

```
Step 1  →  Open-Meteo API detects 72mm in Andheri West zone
Step 2  →  72mm > 60mm threshold — TRIGGER FIRES
Step 3  →  TomTom confirms 82% roads blocked in zone
Step 4  →  Ravi's GPS shows him stationary in flooded zone
Step 5  →  App notifies: "Disruption detected. Take proof photo."
Step 6  →  Ravi takes GPS Camera photo — coordinates stamped
Step 7  →  Isolation Forest fraud score: 0.08 — CLEAN ✅
Step 8  →  Decision Engine → AUTO_PAYOUT
Step 9  →  Razorpay UPI fires → ₹480 in 8 minutes ✅
Step 10 →  Safe Zone Mode activates → directions to Bandra West
```

**Payout:** ₹80/hr × 6 hrs × 100% = **₹480**
**Voice alert in Hindi:** *"आपके खाते में ₹480 जमा हो गए"*

---

### 📋 Scenario 2 — Extreme Heat

**May afternoon — Kurla — Temperature: 47°C**

```
→  47°C > 45°C threshold → TRIGGER FIRES
→  GPS confirms worker in Kurla zone
→  Fraud check passes (score: 0.12)
→  Payout: ₹80 × 6 × 75% = ₹360 auto-credited
→  App shows nearest cool indoor safe zone + directions
```

---

### 📋 Scenario 3 — Severe Pollution

**Winter morning — Delhi — AQI: 420**

```
→  AQICN reports AQI 420 > 400 threshold
→  Worker GPS confirmed in Delhi zone
→  Payout: 50% daily avg = ₹300 auto-credited
→  Voice alert in Hindi: "AQI खतरनाक स्तर पर है"
→  Nearest safe indoor zone shown on map with directions
```

---

### 📋 Scenario 4 — Curfew / Strike

**Sudden curfew across 3 pincodes**

```
→  Admin logs curfew event in dashboard
→  47 insured workers in affected pincodes identified
→  100% payout fires for all 47 workers
→  ₹600 each credited within 10 minutes
→  Zone boundary map shown with curfew area highlighted
```

---

### 📋 Scenario 5 — Storm Prep Mode *(PayNest Innovation ⭐)*

**Monday 8:00 AM — AI predicts 90mm rain tomorrow**

```
→  Open-Meteo 48hr forecast: 90mm predicted tomorrow 2–6 PM
→  Ravi notified at 8 AM today:
   "Heavy rain expected tomorrow in your zone.
    Buy ₹8 advance coverage now (rises to ₹20 when rain starts)"
→  Ravi buys ₹8 advance coverage — saves ₹12
→  Rain hits tomorrow → payout fires automatically → ₹480 credited
```

> This **prevents financial damage before it happens** — not just compensating after.

---

### 📋 Scenario 6 — Smart Navigation During Disruption *(PayNest Innovation ⭐)*

**Flood in Andheri West — Ravi at Lokhandwala Market**

```
→  Flood detected in Ravi's current zone
→  PayNest calculates: nearest safe earning zone = Bandra West (2.1km)
→  Turn-by-turn directions generated:

   📍 Start: Lokhandwala Market
   ↗️  SV Road          🟢 CLEAR    (0.4km)
   ⬆️  Hill Road         🟢 CLEAR    (0.6km)
   ❌  Link Road         🔴 FLOODED — AVOID
   ↖️  Linking Road      🟡 SLOW     (0.8km)
   🏁  Bandra West       3 orders: ₹65, ₹80, ₹75 waiting

→  Directions update live as road conditions change
→  Worker earns ₹480 insurance + ₹220 safe orders = ₹700 total today
```

---

## 4. Application Workflow

### End-to-End System Flow

```
WORKER SIGNS UP
       ↓
Phone OTP → Aadhaar OCR → Partner ID Verify → Zone Select → UPI ID
       ↓
POLICY ISSUED  (Weekly premium deducted every Sunday from settlement)
       ↓
REAL-TIME MONITORING  [every 15 seconds]
   Open-Meteo + AQICN + TomTom Traffic + Browser GPS
       ↓
THRESHOLD BREACHED?
   NO  → Keep monitoring
   YES → Notify worker → Request GPS Camera photo
       ↓
5-LAYER VERIFICATION
   ✓ GPS in correct zone (±500m)
   ✓ Photo GPS matches zone GPS
   ✓ Speed < 20 km/h (worker is stationary)
   ✓ No duplicate claim today
   ✓ Isolation Forest ML fraud score < 0.30
       ↓
ALL 5 PASS?
   NO  → Hold + manual review + AI explanation to worker
   YES → Calculate payout via LightGBM model
       ↓
RAZORPAY UPI FIRES
   Worker notified in their own language
   Voice alert plays automatically
       ↓
SAFE ZONE + DIRECTIONS ACTIVATED
   Turn-by-turn route to nearest safe earning zone
   Nearby available orders shown on Leaflet map
```

### Key Screens

| Screen | Purpose |
|--------|---------|
| Login + OTP | Phone authentication |
| Onboarding (3 steps) | Name, zone, earnings, UPI, plan |
| Dashboard | Live conditions, BTS, chart, payouts |
| GPS Camera | Location-stamped proof photo |
| Navigation | Turn-by-turn safe route directions |
| Safe Zone Map | Red/green zones + nearby orders |
| Storm Forecast | 48hr prediction + advance coverage |
| Policy Page | All 8 triggers + triple lock explained |
| Claim History | All payouts with AI explanations |
| Worker Profile | Live location, badges, documents |

---

## 5. Weekly Premium Model

### Why Weekly?

Gig workers are paid **weekly** by their platforms. They think in weekly budgets. A ₹20/week premium auto-deducted from their Sunday settlement is completely frictionless — less than one chai per day.

### Auto-Deduction Flow

```
Sunday night
   → Platform (Zomato/Swiggy) settles Ravi's weekly earnings
   → PayNest deducts weekly premium automatically
   → New policy activates Monday 12:00 AM
   → Coverage: Mon 12:00 AM → Sun 11:59 PM (24×7)
   → Worker receives SMS/WhatsApp confirmation
```

### Dynamic Pricing Tiers (AI via Behavioral Trust Score)

| Tier | Criteria | Weekly Premium | Max Payout/Week |
|------|----------|---------------|-----------------|
| 🆕 Starter | Week 1–3, no history | ₹25 | ₹1,500 |
| ✅ Standard | 4+ weeks, BTS 60+ | ₹20 | ₹2,000 |
| ⭐ Trusted | 12+ weeks, BTS 80+ | ₹15 | ₹2,500 |
| 👑 Elite | 6+ months, BTS 95+ | ₹10 | ₹3,000 |

### Behavioral Trust Score (BTS) Formula

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
  ──────────────────────────────────────────
  BTS: 92/100  →  ⭐ Trusted  →  ₹15/week
```

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

## 6. Parametric Triggers

All 8 triggers fire **automatically** when the threshold is crossed. Zero worker action needed.

| # | Disruption | API Source | Trigger Condition | Payout |
|---|-----------|-----------|-------------------|--------|
| 1 | 🌦️ Light Rain | Open-Meteo | 30–60mm | 25% daily avg |
| 2 | ⛈️ Heavy Rain | Open-Meteo | 60–100mm | 50% daily avg |
| 3 | 🌊 Flood Rain | Open-Meteo | >100mm | 100% daily avg |
| 4 | 🌡️ Extreme Heat | Open-Meteo | >45°C | 75% daily avg |
| 5 | 😷 Mild Pollution | AQICN | AQI 300–400 | 25% daily avg |
| 6 | ☣️ Severe Pollution | AQICN | AQI >400 | 50% daily avg |
| 7 | 🚧 Road Closure | TomTom | Roads >70% blocked | 100% daily avg |
| 8 | 🚨 Curfew / Strike | Admin input | Govt declaration | 100% daily avg |

> **Payout Formula:** `hourly_rate × hours_lost × disruption_factor`
> **Weekly cap per worker:** ₹3,000

### Triple Lock — All 3 Must Confirm

```
Lock 1  →  🌧️  Weather/AQI API   confirms disruption in worker's 500m zone
Lock 2  →  🚗  TomTom Traffic   confirms roads are physically blocked
Lock 3  →  📍  GPS + Camera     confirms worker stationary in zone with photo proof

All 3 pass  →  PAYOUT FIRES ✅
Any 1 fails →  HOLD → Manual review + worker notified with reason
```

---

## 7. Web vs Mobile Decision

### Decision: Progressive Web App (PWA) ✅

| Criteria | Native App | PWA — Our Choice |
|----------|-----------|-----------------|
| Installation needed | Yes — uses storage | Zero — opens in Chrome ✅ |
| Low-end phone support | Sometimes fails | Always works ✅ |
| GPS access | Full | Full ✅ |
| Camera access | Full | Full ✅ |
| Push notifications | Yes | Yes ✅ |
| 2G/3G performance | Slow | Lightweight ✅ |
| App store approval | Required (weeks) | Instant deploy ✅ |
| Offline support | Yes | Yes (service worker) ✅ |

### Why PWA Wins for This Persona

Most delivery workers use **₹8,000–₹12,000 Android phones** with limited storage and intermittent 2G/3G connectivity. A PWA opens instantly in Chrome — zero download, zero installation, zero barriers. GPS, camera, push notifications and offline support in PWAs are identical to native apps.

---

## 8. AI/ML Integration Plan

### 5 Trained ML Models Overview

| Model | Algorithm | When Called | Output |
|-------|-----------|------------|--------|
| Risk Prediction | XGBoost Classifier | Every 15s + on claim | LOW / MEDIUM / HIGH |
| Income Loss | LightGBM Regressor | After risk confirmed | Predicted ₹ loss |
| Fraud Detection | Isolation Forest | Before every payout | Fraud score 0–1 |
| Premium Pricing | Gradient Boosting | Every Sunday renewal | ₹10–₹35/week |
| Zone Classification | Random Forest | Onboarding + monthly | Zone risk level |

All models trained on **synthetic datasets** (5,000–8,000 rows) with realistic Indian city distributions. Served via **Python FastAPI** as REST endpoints.

---

### Model 1 — Risk Prediction (XGBoost Classifier)

```
Training Features:
  rainfall_mm              temperature_celsius
  aqi_value                traffic_congestion_pct
  historical_flood_freq    zone_infrastructure_score
  humidity_percent         time_of_day
  wind_speed_kmh           day_of_week

Output:
  { "risk_level": "HIGH", "confidence": 0.91, "payout_factor": 1.0 }
```

---

### Model 2 — Income Loss Estimation (LightGBM Regressor)

```
Training Features:
  hourly_rate              hours_worked
  rainfall_intensity       traffic_severity
  demand_index             platform_order_volume
  weather_severity_score   time_slot_popularity

Output:
  { "predicted_loss_inr": 480.0, "disruption_factor": 1.0 }
```

---

### Model 3 — Fraud Detection (Isolation Forest)

```
Detection Features:
  gps_deviation_km         speed_during_claim_kmh
  photo_gps_match          orders_completed_today
  claim_frequency_30days   aadhaar_verified
  zone_match_score         time_since_last_claim_hrs
  network_vs_gps_match     accelerometer_motion_score

Output:
  { "fraud_score": 0.08, "recommendation": "AUTO_APPROVE" }

Thresholds:
  0.00–0.30  →  AUTO_APPROVE  (pay immediately)
  0.31–0.50  →  MONITOR       (pay + flag)
  0.51–0.70  →  HOLD          (hold + request proof)
  0.71–1.00  →  BLOCK         (reject + freeze)
```

---

### Model 4 — Dynamic Premium Pricing (Gradient Boosting)

```
Features: BTS score, weeks on platform, zone risk, claim rate, daily earning
Output:  { "weekly_premium_inr": 15, "tier": "⭐ Trusted", "savings": 10 }
```

---

### Model 5 — Zone Risk Classification (Random Forest)

```
Features: 5yr flood history, drainage quality, monsoon avg, elevation, curfew history
Output:  { "zone_risk": "HIGH", "premium_multiplier": 1.2 }
```

---

### AI Decision Engine

```python
def decide_payout(risk, fraud_score, in_zone,
                  disruption_confirmed, photo_verified,
                  hourly_rate, hours_lost):

    if (risk == "HIGH" and fraud_score < 0.30
        and in_zone and disruption_confirmed and photo_verified):
        return {
            "decision": "AUTO_PAYOUT",
            "amount": hourly_rate * hours_lost * 1.0
        }
    elif risk == "MEDIUM" and fraud_score < 0.25 and in_zone:
        return {
            "decision": "PARTIAL_PAYOUT",
            "amount": hourly_rate * hours_lost * 0.5
        }
    elif fraud_score >= 0.70:
        return { "decision": "BLOCK", "amount": 0 }
    else:
        return { "decision": "HOLD", "amount": 0 }
```

### AI Explanation Engine

```
PAYOUT — English:
"You received ₹480 because heavy rain (74mm) hit Andheri West
at 9:14 AM — above our 60mm threshold. GPS confirmed your
location. Photo matched. Roads 82% blocked. Fraud: 0.08 (clean).
₹80 × 6hrs × 100% = ₹480."

PAYOUT — Tamil:
"அண்ட்ஹேரி வெஸ்டில் 74mm மழை பதிவாகியது.
உங்கள் இருப்பிடம் சரிபார்க்கப்பட்டது.
₹480 உங்கள் கணக்கில் வரவு வைக்கப்பட்டது."

DENIED — English:
"Claim held. GPS shows you were 6.2km outside your zone
at claim time. Contact support with your photo proof."
```

---

## 9. Smart Navigation & Directions

When disruption is detected, PayNest doesn't just pay — it **guides workers to the nearest safe earning zone** using live traffic data.

```
Disruption detected in worker's zone
         ↓
TomTom API fetches live road status for all roads within 5km
         ↓
Roads marked: 🟢 CLEAR | 🟡 SLOW | 🔴 BLOCKED | ⛔ DANGER
         ↓
OSRM routing finds safest path to nearest green zone with orders
         ↓
Turn-by-turn directions shown with live road status each step
         ↓
Directions update automatically as conditions change
         ↓
Worker arrives → available orders shown
```

### Sample Direction Output

```
🗺️  Navigate to Safe Zone — Bandra West
📍  2.1 km  |  ⏱️ ~18 min  |  📦 3 orders (₹65 + ₹80 + ₹75)

  1️⃣  ↗️  RIGHT onto SV Road         🟢 CLEAR  (0.4km)
  2️⃣  ⬆️  STRAIGHT on Hill Road       🟢 CLEAR  (0.6km)
  ⚠️      AVOID: Link Road            🔴 FLOODED
  3️⃣  ↖️  LEFT onto Linking Road      🟡 SLOW   (0.8km)
  4️⃣  ↗️  RIGHT → Bandra West         🟢 CLEAR  (0.3km)
  🏁      DESTINATION — 3 orders waiting
```

### Earnings Maximizer

```
💡 PayNest Earnings Plan — Today:
   Insurance payout:     ₹480
   Nearby safe orders:   ₹220
   ───────────────────────────
   Total possible:       ₹700  (vs ₹480 staying home)
```

---

## 10. GPS Camera & Location Proof

### How It Works

```
Worker taps "Take Proof Photo" in PayNest app
         ↓
Camera opens in browser (MediaDevices API — free, built-in)
         ↓
Worker photographs disruption (flood, blocked road, etc.)
         ↓
PayNest auto-stamps on photo:
  📍 19.1136°N, 72.8697°E  |  🕐 09:14 AM, March 18, 2026
  🌧️ 74mm rain  |  🌡️ 32°C  |  😷 AQI: 145
  🚗 Traffic: 82% blocked  |  📍 Zone: Andheri West
  👤 Ravi Kumar  |  ID: ZMT-2847  |  ✅ PayNest Verified
         ↓
Photo uploaded to secure storage with GPS metadata
         ↓
Backend validates: photo GPS vs zone GPS within 500m
```

### Anti-Fraud Logic

```
Deviation < 500m    →  ✅ VERIFIED — proceed to payout
Deviation 500m–2km  →  ⚠️  REVIEW   — manual check triggered
Deviation > 2km     →  🚫 BLOCKED  — claim rejected + fraud flag
Duplicate photo     →  🚫 BLOCKED  — same photo cannot be reused
Timestamp gap >30m  →  ⚠️  REVIEW   — photo not taken at claim time
```

---

## 11. Document Verification

### Onboarding Flow

```
Step 1  →  Phone OTP login
Step 2  →  Upload Aadhaar Card photo
            Tesseract.js OCR reads 12-digit Aadhaar number
            Format validated + stored encrypted
Step 3  →  Upload Platform Partner ID screenshot
            OCR reads Partner ID + active delivery status
            Confirms genuine registered delivery partner
Step 4  →  Selfie liveness check (compared to Aadhaar photo)
Step 5  →  Verification badges applied to profile
```

### Verification Tier Impact

| Badge | Documents | Max Payout | Premium |
|-------|-----------|-----------|---------|
| 🟡 Starter | Phone OTP only | ₹200/event | Full price |
| 🔵 Basic | Aadhaar verified | ₹600/event | -₹2/week |
| 🟢 Verified | Aadhaar + Partner ID | ₹1,500/event | -₹4/week |
| 🏆 Trusted | All + 12 weeks | ₹3,000/week | Lowest tier |

---

## 12. Multilingual Support

### 7 Languages From Day One

| Language | Script | Region | Workers Covered |
|----------|--------|--------|-----------------|
| English | Latin | All India | Default |
| हिंदी | Devanagari | Delhi, UP | ~4M |
| தமிழ் | Tamil | Chennai | ~1.5M |
| తెలుగు | Telugu | Hyderabad | ~1.2M |
| ಕನ್ನಡ | Kannada | Bangalore | ~0.8M |
| मराठी | Marathi | Mumbai, Pune | ~1.8M |
| বাংলা | Bengali | Kolkata | ~0.7M |

Every button, label, error message, AI explanation, voice alert and navigation instruction is available in all 7 languages. Language selected on first screen — never needs to be changed again.

### Voice Alerts (Web Speech API — Free)

```
Hindi  →  "आपके खाते में ₹480 जमा हो गए। भारी बारिश के कारण।"
Tamil  →  "உங்கள் கணக்கில் ₹480 வரவு வைக்கப்பட்டது"
Telugu →  "మీ ఖాతాలో ₹480 జమ చేయబడింది"
```

---

## 13. Adversarial Defense & Anti-Spoofing Strategy

*(Direct response to Phase 1 Market Crash Challenge)*

**Threat:** 500 workers with fake GPS claiming payouts simultaneously — a coordinated fraud ring draining the liquidity pool.

### 5-Layer Defense

```
Layer 1 — GPS Photo Match
  Camera photo GPS must match claimed zone GPS within ±500m.
  Screenshot detection: EXIF GPS ≠ live GPS = immediate flag.
  Duplicate image hash blocked — same photo cannot be reused.

Layer 2 — Speed Analysis
  Worker must be < 20 km/h during disruption (averaged over 10 min).
  Moving at 40+ km/h during "flood" = physically impossible.

Layer 3 — Accelerometer Check
  Browser DeviceMotion API confirms phone is stationary.
  Phone in moving vehicle pattern = FAIL immediately.

Layer 4 — Network vs GPS Triangulation
  Cell tower location cross-checked against GPS.
  GPS says Andheri West + Network says Gurgaon = FLAG.

Layer 5 — Isolation Forest ML
  Trained on legitimate claim patterns — flags all deviations.
  Claim rate 3× zone average = automatic review.
  Sudden spike: 0 claims → 8 claims in 2 weeks = FLAG.
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

    # All newly registered accounts
    new_accs = sum(1 for c in claims_batch if c.weeks_on_platform < 2)
    if new_accs / len(claims_batch) > 0.7:
        flag("new_account_batch")
```

### Honest Worker vs Fraud Ring

| Signal | Honest Workers ✅ | Fraud Ring 🚫 |
|--------|-----------------|--------------|
| Claim timing | Spread over 20–40 min | All within 90 seconds |
| GPS coordinates | Distributed across zone | Identical / clustered |
| Photo uploaded | Yes, different angles | None or same photo |
| Account age | 4+ weeks average | Mostly < 2 weeks |
| Speed at claim | ~0–2 km/h | 30–60 km/h |
| Fraud score | 0.05–0.20 | 0.65–0.95 |

### Honeypot Zones *(PayNest Innovation)*

PayNest secretly maintains 3–5 GPS coordinates per city that **never appear in any public zone list**. Any worker submitting a claim from a honeypot coordinate used GPS spoofing tools. Instant block + full investigation of all linked accounts.

### Graduated Response

```
Fraud 0.00–0.30  →  AUTO_APPROVE  — pay immediately, no friction
Fraud 0.31–0.50  →  MONITOR       — pay + flag for pattern watching
Fraud 0.51–0.70  →  HOLD          — hold + request additional proof
Fraud 0.71–1.00  →  BLOCK         — reject + freeze account
```

> **Key principle:** Never punish honest workers. Only scores above 0.70 get blocked. Workers at 0.31–0.70 are still paid and helped — just watched more closely.

---

## 14. Tech Stack

### Frontend
```
React.js (PWA)         Mobile-first, offline support, zero install
Tailwind CSS           Responsive fast styling
Leaflet.js             Zone map, GPS dot, live traffic overlay
Recharts               Dashboard charts and weekly graph
Web Speech API         Voice alerts in 7 languages (free, built-in)
MediaDevices API       GPS Camera with watermark (free, built-in)
Geolocation API        Live GPS tracking (free, built-in)
Tesseract.js           Aadhaar + Partner ID document OCR
Custom i18n JSON       7-language translation system
```

### Backend
```
Node.js + Express      REST API server
MongoDB Atlas          Worker profiles, policies, claims, GPS history
Firebase Auth          Phone OTP authentication
Firebase Realtime DB   Live GPS streaming
Cloudinary             GPS camera photo secure storage
```

### ML System
```
Python 3.11            ML pipeline
scikit-learn           Isolation Forest, preprocessing
XGBoost                Risk prediction classifier
LightGBM               Income loss regressor
Gradient Boosting      Premium pricing + zone classifier
FastAPI                Serves all 5 models as REST endpoints
joblib                 Model serialization (.pkl files)
```

### External APIs *(All Free Tier)*
```
Open-Meteo             Rainfall, temperature, 48hr forecast (free, no key)
OpenWeatherMap         Storm alerts (1,000 calls/day free)
AQICN                  Air Quality Index — Indian cities (free)
TomTom Traffic API     Road closures, live traffic (2,500 calls/day free)
OSRM                   Turn-by-turn routing engine (free, open source)
Razorpay Sandbox       UPI payout simulation
```

### Deployment
```
Vercel                 React PWA frontend
Railway                Node.js backend
MongoDB Atlas          Database (free tier)
Render                 Python FastAPI ML service
```

---

## 15. Development Plan

```
PHASE 1 — Weeks 1–2: Ideation & Foundation               ← CURRENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ✅  Persona research and scenario design
  ✅  All features designed and documented
  ✅  API research and free-tier selection completed
  ✅  Anti-spoofing strategy (Market Crash response)
  ✅  README Phase 1 document
  ⬜  GitHub repository structure
  ⬜  2-minute strategy video

PHASE 2 — Week 3: Backend Core
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  Worker auth (OTP + Aadhaar OCR + Partner ID verify)
  ⬜  MongoDB schemas: Worker, Claim, Policy, GPS, Photo
  ⬜  API polling (Open-Meteo + TomTom + AQICN, 15s interval)
  ⬜  Parametric trigger engine (all 8 thresholds)
  ⬜  GPS location history storage and querying
  ⬜  OSRM routing service integration

PHASE 3 — Week 4: ML Pipeline
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  Synthetic dataset generation (5,000–8,000 rows each)
  ⬜  XGBoost risk classifier training + evaluation
  ⬜  LightGBM income loss regressor training
  ⬜  Isolation Forest fraud model training
  ⬜  Gradient Boosting premium model training
  ⬜  Random Forest zone model training
  ⬜  FastAPI with all 5 model endpoints + docs

PHASE 4 — Week 5: React PWA Frontend
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  Login → OTP → Onboarding (3 steps) → Dashboard
  ⬜  Dashboard: live conditions + BTS score + weekly chart
  ⬜  Leaflet map: GPS dot + red/green zones + traffic overlay
  ⬜  GPS Camera with coordinate watermark overlay
  ⬜  Smart navigation with turn-by-turn directions
  ⬜  Nearby orders panel with earnings maximizer card

PHASE 5 — Week 6: Advanced Features
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  7-language i18n + Web Speech API voice alerts
  ⬜  Document upload: Aadhaar OCR + Partner ID verify
  ⬜  AI explanation generator for every payout/denial
  ⬜  Storm Prep Mode (48hr forecast + advance pricing)
  ⬜  Worker profile: live location + verification badges
  ⬜  Honeypot zone anti-fraud backend

PHASE 6 — Week 7: Polish & Demo
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ⬜  Admin analytics dashboard (live heatmap + fraud stats)
  ⬜  End-to-end demo: rain → photo → directions → UPI paid
  ⬜  3-language live demo: English + Hindi + Tamil
  ⬜  Performance test on 2G connection
  ⬜  Final presentation deck
  ⬜  Full demo video (3–5 minutes)
```

---

## 16. Team

| Member | Role | Responsibilities |
|--------|------|-----------------|
| Keerthana R | 🎨 Frontend Lead | React PWA, Leaflet Map, GPS Camera, Navigation UI, Multilingual |
| Shakthi Ganesh | ⚙️ Backend Lead | Node.js APIs, MongoDB, OSRM Routing, Razorpay, Polling Engine |
| Sanjith | 🤖 ML Lead | 5 trained models, fraud detection, FastAPI, dataset generation |
| Akshay Gopi | 📊 Product Lead | Strategy, UI/UX design, presentation, demo video, docs |

---

## 📁 Repository Structure

```
paynest/
├── README.md
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Login/           OTP authentication screens
│       │   ├── Onboarding/      3-step worker setup
│       │   ├── Dashboard/       Home + stats + chart
│       │   ├── Navigation/      Turn-by-turn directions
│       │   ├── Map/             Leaflet + GPS + safe zones
│       │   ├── Camera/          GPS photo capture + watermark
│       │   ├── Documents/       Aadhaar + Partner ID verify
│       │   ├── Storm/           48hr forecast + prep mode
│       │   ├── Policy/          Coverage + triggers explained
│       │   ├── Payout/          History + AI explanation
│       │   └── Profile/         Worker profile + location
│       ├── hooks/
│       │   ├── useLiveData.js   15s API polling
│       │   ├── useGPS.js        Live location tracking
│       │   └── useAuth.js       Auth state management
│       └── languages/
│           └── i18n.js          7-language translations
├── backend/
│   ├── routes/
│   │   ├── auth.js              OTP + onboarding APIs
│   │   ├── triggers.js          Parametric engine
│   │   ├── navigation.js        Directions + safe routes
│   │   ├── payouts.js           UPI processing
│   │   └── dashboard.js         Analytics data
│   └── services/
│       ├── weatherService.js    Open-Meteo integration
│       ├── trafficService.js    TomTom Traffic API
│       ├── routingService.js    OSRM directions engine
│       ├── fraudDetection.js    5-layer verification
│       └── pollingService.js    15s background monitor
└── ml/
    ├── train_models.py          Trains all 5 models
    ├── api.py                   FastAPI serving endpoints
    ├── datasets/
    │   ├── risk_dataset.csv     8,000 rows
    │   ├── loss_dataset.csv     8,000 rows
    │   ├── fraud_dataset.csv    8,000 rows
    │   ├── premium_dataset.csv  5,000 rows
    │   └── zone_dataset.csv     2,000 rows
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
*PayNest makes sure the storm never empties their wallet —*
*and then shows them the safest road back to earning."*

![ML](https://img.shields.io/badge/ML%20Models-5%20Trained-9C27B0?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-7%20Indian-2196F3?style=for-the-badge)
![Workers](https://img.shields.io/badge/Target-12M%20Workers-FF6B35?style=for-the-badge)
![PWA](https://img.shields.io/badge/Platform-PWA%20No%20Install-22C55E?style=for-the-badge)

</div>
