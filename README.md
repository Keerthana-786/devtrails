<div align="center">

# 🛵 PayNest

### *AI-Powered Parametric Income Insurance for India's Gig Delivery Workers*

<br/>

![Guidewire](https://img.shields.io/badge/Guidewire-DEVTrails%202026-FF6B35?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAyTDIgN2wxMCA1IDEwLTV6Ii8+PC9zdmc+)
![India](https://img.shields.io/badge/Made%20in-India%20🇮🇳-FF9933?style=for-the-badge)
![PWA](https://img.shields.io/badge/Type-Progressive%20Web%20App-5A0FC8?style=for-the-badge)
![ML](https://img.shields.io/badge/ML%20Models-5%20Trained-10B981?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-7%20Indian-3B82F6?style=for-the-badge)

<br/>

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║      DETECT  →  VERIFY  →  PAY  →  NAVIGATE                  ║
║                                                               ║
║   No forms. No calls. No waiting. Money in under 10 min.     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

</div>

---

## 📖 Table of Contents

| # | Section |
|---|---------|
| 1 | [The Problem We're Solving](#1--the-problem) |
| 2 | [Our Solution](#2--our-solution) |
| 3 | [Live Demo & Features](#3--live-demo--features) |
| 4 | [Personas & Real Scenarios](#4--personas--real-scenarios) |
| 5 | [How It Works — End to End](#5--how-it-works) |
| 6 | [5 ML Models — Real Training](#6--5-ml-models--real-training) |
| 7 | [Parametric Trigger System](#7--parametric-trigger-system) |
| 8 | [GPS Camera & Location Proof](#8--gps-camera--location-proof) |
| 9 | [Smart Navigation & Directions](#9--smart-navigation--directions) |
| 10 | [AI Explanation Engine](#10--ai-explanation-engine) |
| 11 | [Behavioral Trust Score (BTS)](#11--behavioral-trust-score) |
| 12 | [Weekly Premium Model](#12--weekly-premium-model) |
| 13 | [7 Indian Languages](#13--7-indian-languages) |
| 14 | [Anti-Fraud & Adversarial Defense](#14--anti-fraud--adversarial-defense) |
| 15 | [Tech Stack & Architecture](#15--tech-stack--architecture) |
| 16 | [Full File Structure](#16--full-file-structure) |
| 17 | [Quick Start Guide](#17--quick-start-guide) |
| 18 | [Business Viability](#18--business-viability) |

---

## 1 🔴 The Problem

India has **12 million+ gig delivery workers** on Zomato, Swiggy, Zepto, Amazon Flex, Dunzo, and Blinkit. These workers earn **only when they deliver**. When external disruptions hit — they lose income with zero protection.

```
☔  Heavy rain floods Andheri West at 9 AM
            │
            ▼
🛵  Ravi Kumar cannot ride safely
            │
            ▼
📦  Zero deliveries completed today
            │
            ▼
💸  ₹0 earned — but rent, EMI, groceries still due
            │
            ▼
😔  No insurance. No compensation. Nobody helps.
```

| The Scale | Numbers |
|---|---|
| Gig delivery workers in India | **12 million+** |
| Insurance products covering this gap | **ZERO** |
| Average daily earnings | **₹600/day** |
| Days lost per month to disruptions | **4–6 days** |
| Monthly income lost per worker | **₹1,500–₹3,600** |
| Annual loss across all workers | **₹21,600 Crore** |

> *"When it rains heavily, I just sit at home watching money disappear. Nobody helps me."*
> — Ravi Kumar, Zomato Delivery Partner, Andheri West, Mumbai

> **PayNest covers only income loss from external disruptions.** We strictly exclude health, life, accidents, and vehicle repairs.

---

## 2 ✅ Our Solution

**PayNest** is an AI-powered Progressive Web App that automatically detects disruptions, verifies the worker is genuinely affected using GPS + camera + 5 ML models, and pays them via UPI — **without a single form, call, or approval.**

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  DISRUPTION HITS                                                    │
│        │                                                            │
│        ▼                                                            │
│  APIs DETECT ── Open-Meteo + AQICN + TomTom (every 15 seconds)    │
│        │                                                            │
│        ▼                                                            │
│  GPS + CAMERA VERIFY ── Worker physically in disruption zone       │
│        │                                                            │
│        ▼                                                            │
│  5 ML MODELS VALIDATE ── Risk + Loss + Fraud + Premium + Zone      │
│        │                                                            │
│        ▼                                                            │
│  ₹480 PAID via UPI ── Under 10 minutes, zero forms                │
│        │                                                            │
│        ▼                                                            │
│  APP NAVIGATES TO SAFE ZONE ── Turn-by-turn, live road status      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### PayNest vs Everything Else

| Feature | Traditional Insurance | PayNest |
|---|---|---|
| Claim process | Manual form → 2–3 weeks | Zero forms → **10 minutes** ✅ |
| Trigger method | Worker reports loss | **API auto-detects** ✅ |
| Location proof | Worker's word | **GPS-stamped camera photo** ✅ |
| Fraud detection | Human investigator | **5-layer AI verification** ✅ |
| Zone precision | City-wide | **500m hyper-zone** ✅ |
| Language support | English only | **7 Indian languages** ✅ |
| Navigation | None | **Safe route + nearby orders** ✅ |
| Pricing | Fixed for everyone | **AI-personalised weekly** ✅ |
| Storm preparation | Pay after | **Predict + buy early** ✅ |
| Explanation | None | **AI explains every decision** ✅ |

---

## 3 🚀 Live Demo & Features

### All 8 Screens Built and Working

| Tab | What It Does |
|---|---|
| 🏠 **Dashboard** | Live risk score, weather grid, BTS, weekly earnings chart, payout history, AI payout trigger |
| 🌩️ **Live Disruption** | 6-metric live grid, ML probability bars, feature importances from trained model |
| 🗺️ **Safe Map** | SVG map with 500m danger/safe zones, shortest safe path during rain |
| ⛈️ **Storm Forecast** | 7-day AI prediction, dynamic premium by day, early-buy discount logic |
| 📸 **Camera + Navigate** | GPS proof camera with watermark, turn-by-turn navigation, BTS breakdown, AI explanation |
| 🏦 **Loan** | Emergency micro-loan, AI eligibility (99.5% accuracy), document upload |
| 🛡️ **Policy** | Dynamic weekly premium, all 8 triggers, plan comparison table |
| 🤖 **AI Chatbot** | Claude Sonnet powered, responds in worker's language, context-aware |

---

## 4 👤 Personas & Real Scenarios

### Primary Persona

```
╔══════════════════════════════════════════════════════════════╗
║  👤  Name         :  Ravi Kumar                              ║
║  📍  Location     :  Andheri West, Mumbai                    ║
║  🛵  Platform     :  Zomato Food Delivery                    ║
║  ⏰  Hours        :  8–10 hrs/day, 6 days/week              ║
║  💰  Daily Earn   :  ₹600/day (₹80/hour avg)                ║
║  📱  Device       :  ₹9,000 Android — Chrome browser        ║
║  🗣️  Language     :  Hindi + Marathi, basic English          ║
║  😟  Safety Net   :  ZERO currently                          ║
╚══════════════════════════════════════════════════════════════╝
```

### Other Supported Personas

| Worker | City | Platform | Language | Main Disruption |
|---|---|---|---|---|
| Deepa S | Chennai | Swiggy | Tamil | Cyclones Nov–Jan |
| Arjun R | Bangalore | Blinkit | Kannada | Flash floods + heat |
| Salman K | Delhi | Amazon Flex | Hindi | AQI 400+ Oct–Feb |
| Venkat P | Hyderabad | Zepto | Telugu | Extreme heat May–Jun |
| Sanjay M | Pune | Dunzo | Marathi | Monsoon flooding |
| Priya D | Kolkata | Swiggy | Bengali | Cyclone + flooding |

---

### 📋 Scenario 1 — Heavy Rainfall *(Most Common)*

**Tuesday 9:00 AM — Andheri West — Rainfall: 72mm**

```
Step 1  →  Open-Meteo API detects 72mm in Andheri West 500m zone
Step 2  →  72mm > 60mm threshold — TRIGGER FIRES
Step 3  →  TomTom confirms 82% roads blocked in zone
Step 4  →  Ravi's GPS shows him stationary in flooded zone
Step 5  →  App notifies: "Disruption detected. Take proof photo."
Step 6  →  Ravi takes GPS Camera photo — coordinates + weather stamped
Step 7  →  Isolation Forest + RF ensemble fraud score: 0.08 — CLEAN ✅
Step 8  →  Decision Engine → AUTO_PAYOUT
Step 9  →  Razorpay UPI fires → ₹480 in 8 minutes ✅
Step 10 →  Safe Zone Mode activates → navigation to Bandra West

Payout: ₹80/hr × 6hrs × 100% = ₹480
Voice: "आपके खाते में ₹480 जमा हो गए" 🔊
```

---

### 📋 Scenario 2 — Extreme Heat

**May afternoon — Kurla — Temperature: 47°C**

```
→  47°C > 45°C threshold → TRIGGER FIRES
→  GPS confirms worker in Kurla zone
→  Fraud check: 0.12 (clean)
→  Payout: ₹80 × 6hrs × 75% = ₹360 auto-credited
→  App shows nearest cool indoor safe zone + directions
```

---

### 📋 Scenario 3 — Severe Pollution (Delhi Winter)

**November morning — Delhi — AQI: 420**

```
→  AQICN reports AQI 420 → above 400 threshold
→  Worker GPS confirmed in Delhi zone
→  Payout: 50% daily avg = ₹300 auto-credited
→  Voice alert in Hindi: "AQI खतरनाक स्तर पर है"
→  Nearest indoor safe zone with directions shown
```

---

### 📋 Scenario 4 — Curfew / Strike

**Sudden curfew across 3 pincodes**

```
→  Admin logs curfew event in dashboard
→  47 insured workers in affected pincodes identified
→  100% payout fires automatically for all 47
→  ₹600 each credited within 10 minutes
```

---

### 📋 Scenario 5 — Storm Prep Mode ⭐ *(PayNest Innovation)*

**Monday 8 AM — AI predicts 90mm rain tomorrow**

```
→  Open-Meteo 48hr forecast: 90mm predicted tomorrow 2–6 PM
→  Ravi notified at 8 AM today:
   "Heavy rain expected tomorrow in your zone.
    Buy ₹8 advance coverage now (rises to ₹20 when rain starts)"
→  Ravi buys ₹8 advance coverage — saves ₹12
→  Rain hits tomorrow → payout fires automatically → ₹480 credited

PayNest prevents financial damage BEFORE it happens.
```

---

### 📋 Scenario 6 — Smart Navigation During Disruption ⭐

**Flood in Andheri West — Ravi at Lokhandwala Market**

```
→  Flood detected in zone
→  PayNest calculates: nearest safe earning zone = Bandra West (2.1km)
→  Turn-by-turn generated:

   📍 Start: Lokhandwala Market
   ↗️  SV Road          🟢 CLEAR    (0.4km) — Elevated, no flooding
   ⬆️  Hill Road         🟢 CLEAR    (0.6km) — Residential, safe
   🚫  Link Road         🔴 FLOODED  ———     — DO NOT USE
   ↖️  Linking Road      🟡 SLOW     (0.8km) — Heavy footfall
   🏁  Bandra West       3 orders: ₹65, ₹80, ₹75 waiting

→  Earnings: ₹480 insurance + ₹220 safe orders = ₹700 total
```

---

## 5 ⚙️ How It Works

```
WORKER SIGNS UP
       │
       ▼
Phone OTP → Aadhaar OCR → Partner ID → Zone Select → UPI ID
       │
       ▼
POLICY ISSUED  (Weekly premium deducted every Sunday from settlement)
       │
       ▼
REAL-TIME MONITORING  [every 15 seconds]
   Open-Meteo + AQICN + TomTom Traffic + Browser GPS
       │
       ▼
THRESHOLD BREACHED?
   NO  →  Keep monitoring
   YES →  Notify worker → Request GPS Camera photo
       │
       ▼
TRIPLE LOCK VERIFICATION
   Lock 1 🌧️  Weather/AQI API   confirms disruption in 500m zone
   Lock 2 🚗  TomTom Traffic    confirms roads physically blocked
   Lock 3 📸  GPS Camera        confirms worker stationary with proof

ALL 3 PASS?
   NO  →  HOLD + manual review + AI explanation sent to worker
   YES →  Calculate payout via LightGBM model
       │
       ▼
RAZORPAY UPI FIRES
   Voice alert in worker's language
   AI explanation of exactly why they got paid
       │
       ▼
SAFE ZONE MODE ACTIVATES
   Turn-by-turn route to nearest safe earning zone
   Nearby available orders shown on map
```

---

## 6 🧠 5 ML Models — Real Training

All models trained on **synthetic datasets with realistic Indian city distributions**. Training pipeline runs in < 2 minutes. Models served via FastAPI.

### Training Results (Actual Output)

```
════════════════════════════════════════════════════════════
  Model 1: Risk Prediction     →  Accuracy: 85.81%
                                  5-Fold CV: 86.14% ± 1.1%
  Model 2: Income Loss         →  MAE: ₹16.68,  R²: 0.9709
  Model 3: Fraud Detection     →  AUC: 1.000  (RF + IsoForest)
  Model 4: Loan Eligibility    →  Accuracy: 99.50%, AUC: 0.9996
  Model 5: Zone Classification →  Random Forest (zone risk tier)
════════════════════════════════════════════════════════════
```

---

### Model 1 — Risk Prediction (GradientBoosting Classifier)

```
Dataset    :  8,000 rows  |  9 features  |  3 classes
Algorithm  :  GradientBoosting (XGBoost when available)
Target     :  LOW / MEDIUM / HIGH disruption risk

Feature Importances (from training_report.json):
  Rainfall          32.9% ████████████████████
  AQI               17.3% ██████████▌
  Traffic           16.2% ██████████
  Temperature       13.7% ████████▌
  Flood History     11.3% ███████
  Visibility         4.1% ██▌
  Humidity           2.1% █▌
  Wind Speed         1.5% █
  Month              0.9% ▌

Test Accuracy  :  85.81%
5-Fold CV      :  86.14% ± 1.06%
```

---

### Model 2 — Income Loss Estimation (RandomForest Regressor)

```
Dataset    :  8,000 rows  |  8 features
Algorithm  :  RandomForest (LightGBM when available)
Target     :  Predicted income lost in ₹

Feature Importances:
  Rainfall             87.2% ██████████████████████████████████████████████
  Normal Work Hours     5.7% ███
  Traffic Disruption    4.4% ██▌
  Hourly Rate           2.1% █▌
  Others                0.6%

MAE     :  ₹16.68  (within ₹17 of actual loss — on ₹300–₹900 range)
R² Score:  0.9709  (97.1% variance explained)
```

---

### Model 3 — Fraud Detection (IsolationForest + RandomForest Ensemble)

```
Dataset    :  8,000 rows  |  9 features  |  5.9% fraud rate
Algorithm  :  70% RF Supervised + 30% IsolationForest Unsupervised
Target     :  Binary fraud classification

Feature Importances:
  GPS Deviation               25.6% ████████████████████
  Location Consistency        25.5% ████████████████████
  Claim Frequency (30 days)   21.4% █████████████████
  Account Age                 16.5% █████████████
  Multiple Claims/Day          6.3% █████
  Orders During Disruption     3.6% ███

RF AUC       :  1.000
Ensemble AUC :  1.000
Precision    :  1.00  |  Recall: 1.00

Fraud Thresholds:
  0.00–0.30  →  AUTO_APPROVE  (pay immediately)
  0.31–0.50  →  MONITOR       (pay + flag)
  0.51–0.70  →  HOLD          (request additional proof)
  0.71–1.00  →  BLOCK         (reject + freeze account)
```

---

### Model 4 — Loan Eligibility (GradientBoosting Classifier + Regressor)

```
Dataset    :  4,000 rows  |  7 features  |  28.6% eligible rate
Algorithm  :  GradientBoosting Classifier + Regressor for amount
Target     :  Eligible/Not + Max approved amount

Accuracy :  99.50%
AUC      :  0.9996
Loan Amount MAE:  ₹109

Key eligibility factors:
  ✓ Months active ≥ 3
  ✓ Trust Score ≥ 40
  ✓ Avg monthly income ≥ ₹8,000
  ✓ Zero fraud flags
  ✓ Existing loans < 2
```

---

### Model 5 — Zone Risk Classification (RandomForest)

```
Dataset    :  Per-city historical data
Features   :  5yr flood history, drainage quality, monsoon avg,
              elevation score, curfew history, road quality
Output     :  Zone risk tier + premium multiplier (0.8x – 1.3x)
```

---

### AI Decision Engine

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
            "amount":   hourly_rate * hours_lost * 1.0
        }

    elif risk == "MEDIUM" and fraud_score < 0.25 and in_zone:
        return {
            "decision": "PARTIAL_PAYOUT",
            "amount":   hourly_rate * hours_lost * 0.5
        }

    elif fraud_score >= 0.70:
        return { "decision": "BLOCK", "amount": 0 }

    else:
        return { "decision": "HOLD", "amount": 0 }
```

---

## 7 ⚡ Parametric Trigger System

All 8 triggers fire **automatically** when the threshold is crossed. Zero worker action needed.

| # | Disruption | API Source | Condition | Payout |
|---|---|---|---|---|
| 1 | 🌦️ Light Rain | Open-Meteo | 30–60mm | 25% daily avg |
| 2 | ⛈️ Heavy Rain | Open-Meteo | 60–100mm | 50% daily avg |
| 3 | 🌊 Flood Rain | Open-Meteo | > 100mm | **100% daily avg** |
| 4 | 🌡️ Extreme Heat | Open-Meteo | > 45°C | 75% daily avg |
| 5 | 😷 Mild Pollution | AQICN | AQI 300–400 | 25% daily avg |
| 6 | ☣️ Severe Pollution | AQICN | AQI > 400 | 50% daily avg |
| 7 | 🚧 Road Closure | TomTom | Roads > 70% blocked | **100% daily avg** |
| 8 | 🚨 Curfew/Strike | Admin input | Govt declaration | **100% daily avg** |

> **Formula:** `hourly_rate × hours_lost × disruption_factor`
> **Weekly cap per worker:** ₹3,000

### Triple Lock — All 3 Must Pass

```
Lock 1  🌧️  Weather/AQI API     confirms disruption in worker's 500m zone
Lock 2  🚗  TomTom Traffic      confirms roads are physically blocked
Lock 3  📸  GPS Camera           confirms worker stationary in zone with photo

✅ All 3 pass  →  PAYOUT FIRES immediately
❌ Any 1 fails →  HOLD → Manual review → AI explanation sent to worker
```

---

## 8 📸 GPS Camera & Location Proof

### How the Watermarked Photo Works

```
Worker taps "Take Proof Photo"
         │
         ▼
Camera opens via MediaDevices API (built into Chrome)
         │
         ▼
Worker photographs the disruption (flood, road, etc.)
         │
         ▼
PayNest auto-stamps on photo canvas:
  ┌─────────────────────────────────────────────────────────┐
  │  🛵 PayNest — GPS Verified Proof Photo          [orange] │
  │                              [photo content here]        │
  │                        [faint PAYNEST watermark stamp]   │
  │  📍 19.1136°N, 72.8697°E                                │
  │  🕐 18 Mar 2026, 9:14 AM IST                            │
  │  🌧️ 74mm rain  |  😷 AQI 145  |  🌡️ 32°C             │
  │  🚗 Traffic: 82% blocked  |  Risk: HIGH                 │
  │  👤 Ravi Kumar  |  Zomato Partner                       │
  │  ✅ PayNest Verified — DO NOT SHARE              [green] │
  └─────────────────────────────────────────────────────────┘
         │
         ▼
Uploaded to secure storage with GPS metadata preserved
         │
         ▼
Backend validates: photo GPS vs zone GPS within 500m
```

### Anti-Spoofing Logic

```
Deviation < 500m    →  ✅ VERIFIED   — proceed to payout
Deviation 500m–2km  →  ⚠️  REVIEW    — manual check triggered
Deviation > 2km     →  🚫 REJECTED  — fraud flag added to account
Duplicate photo     →  🚫 BLOCKED   — same GPS+hour as previous
Speed > 20 km/h     →  ⚠️  FLAGGED   — worker may be moving/faking
```

---

## 9 🗺️ Smart Navigation & Directions

When disruption is detected, PayNest doesn't just pay — it **guides workers to the nearest safe earning zone** using live road status.

### Direction Output (Mumbai Example)

```
🗺️  Navigate to Safe Zone — Bandra West
📍  2.1 km  |  ⏱️ ~18 min  |  📦 3 orders waiting

  1️⃣  ↗️  RIGHT onto SV Road           🟢 CLEAR   (0.4km) — Elevated, no flooding
  2️⃣  ⬆️  STRAIGHT on Hill Road         🟢 CLEAR   (0.6km) — Residential, safe
  ⚠️      AVOID: Link Road              🔴 FLOODED — DO NOT USE
  3️⃣  ↖️  LEFT onto Linking Road        🟡 SLOW    (0.8km) — Heavy footfall
  4️⃣  ↗️  RIGHT → Bandra West Hub       🟢 CLEAR   (0.3km) — 🏁 Destination

📦  Orders at destination:  ₹65 + ₹80 + ₹75 = ₹220
```

### Earnings Maximiser

```
  Insurance payout   :  ₹480
  Safe zone orders   :  ₹220
  ─────────────────────────
  Total possible     :  ₹700   (vs ₹480 staying home)
```

City-specific routes built for: Mumbai, Bangalore, Chennai, Delhi, Hyderabad, Pune, and fallback for any city.

---

## 10 🤖 AI Explanation Engine

Every payout — approved or held — comes with a full plain-language explanation in the worker's own language.

### English Example (PAID)

```
You received ₹480 because heavy rain (74mm) was detected in
your zone at 9:14 AM — above the 60mm trigger threshold.
Your GPS location was verified within 500m. Photo matched.
Roads 82% blocked. Fraud score: 0.08 (clean). All 3 locks passed.

Formula: ₹80/hr × 6hrs × 100% disruption = ₹480

Verification steps:
  ✓  Weather API: 74mm detected → above 60mm threshold
  ✓  GPS verified: Within 500m of disruption zone
  ✓  Photo GPS matches zone GPS
  ✓  Speed < 20 km/h (worker stationary)
  ✓  Fraud score: 0.08 → AUTO_APPROVE (< 0.30 threshold)
```

### Hindi (भुगतान मिला)

```
आपको ₹480 मिले क्योंकि आपके क्षेत्र में 74mm भारी बारिश दर्ज
हुई — यह 60mm की सीमा से अधिक है। GPS सत्यापित। धोखाधड़ी
स्कोर: 0.08 (साफ)। सभी 3 जाँचें पास।
```

### Tamil (பணம் கிடைத்தது)

```
உங்கள் பகுதியில் 74mm மழை பதிவாகியது — 60mm வரம்பை மீறியது.
GPS சரிபார்க்கப்பட்டது. மோசடி மதிப்பெண்: 0.08.
₹480 உங்கள் கணக்கில் வரவு வைக்கப்பட்டது.
```

**Same explanation available in all 7 languages automatically.**

---

## 11 🏆 Behavioral Trust Score (BTS)

Workers earn better premiums and higher caps by building a trust score over time.

### BTS Formula

```
BTS = (Working Consistency   × 40%)   ←  Active 6/7 days
    + (Clean Claim Ratio      × 25%)   ←  No fraudulent claims
    + (GPS Zone Compliance    × 20%)   ←  Always in registered zone
    + (Document Level         × 15%)   ←  Aadhaar + PAN + Partner ID

Example — Ravi Kumar:
  Consistent 6 days/week          →  38/40
  2 valid claims, 0 fraudulent    →  25/25
  Always in registered zone       →  18/20
  Aadhaar verified only           →   9/15
  ──────────────────────────────────────────
  BTS: 90/100  →  ⭐ Trusted  →  ₹15/week
```

### Premium Tiers

| Tier | Criteria | Weekly Premium | Weekly Cap |
|---|---|---|---|
| 🆕 Starter | Week 1–3, no history | ₹25 | ₹1,500 |
| ✅ Standard | 4+ weeks, BTS 60+ | ₹20 | ₹2,000 |
| ⭐ Trusted | 12+ weeks, BTS 75+ | ₹15 | ₹2,500 |
| 👑 Elite | 6+ months, BTS 90+ | ₹10 | ₹3,000 |

---

## 12 💰 Weekly Premium Model

### Why Weekly?

Gig workers are **paid weekly** by their platforms (Swiggy/Zomato settle Sunday nights). A ₹15–₹25/week premium auto-deducted from settlement is completely frictionless — **less than one chai per day**.

### Auto-Deduction Flow

```
Sunday night
  → Platform settles Ravi's weekly earnings
  → PayNest deducts ₹15 automatically
  → New policy activates Monday 12:00 AM
  → Coverage: Mon 12:00 AM → Sun 11:59 PM (24×7)
  → SMS confirmation sent
```

### Dynamic Pricing by Risk Level

Premium adjusts every Sunday based on the trained **GradientBoosting risk model** score for the worker's city:

```
LOW risk week   →  ₹10–₹15  (save money in clear weather)
MEDIUM risk     →  ₹15–₹22  (standard coverage)
HIGH risk week  →  ₹22–₹30  (monsoon / pollution season)

Mumbai monsoon (June–Sept) →  +20% city multiplier
Delhi winter (Oct–Feb)     →  +10% AQI multiplier
```

---

## 13 🌍 7 Indian Languages

Full UI translation across all screens — not just labels, but chatbot responses, AI explanations, voice alerts, and error messages.

| Code | Language | Script | Workers Covered |
|---|---|---|---|
| `en` | English | Latin | All cities |
| `hi` | हिंदी | Devanagari | Delhi, UP, Bihar, MP |
| `ta` | தமிழ் | Tamil | Chennai, Coimbatore |
| `te` | తెలుగు | Telugu | Hyderabad, Vijayawada |
| `kn` | ಕನ್ನಡ | Kannada | Bangalore, Mysuru |
| `mr` | मराठी | Devanagari | Mumbai, Pune |
| `bn` | বাংলা | Bengali | Kolkata, Howrah |

The Claude-powered **AI chatbot** automatically detects and responds in whichever language the worker types in.

---

## 14 🛡️ Anti-Fraud & Adversarial Defense

### 5-Layer Verification Stack

```
Layer 1  →  📡  Weather API       Real-time cross-check of claim time vs actual rain
Layer 2  →  🗺️  GPS Zone Check    Worker's device GPS must be within 500m of zone
Layer 3  →  📸  Photo GPS Match   Camera photo metadata GPS must match device GPS
Layer 4  →  🚀  Speed Check       Movement during claim < 20 km/h (stationary worker)
Layer 5  →  🤖  Isolation Forest  ML anomaly detection on 9 behavioral signals
```

### Known Attack Vectors & Defenses

| Attack | Defense |
|---|---|
| GPS spoofing (fake location app) | Cross-check photo EXIF GPS vs device GPS vs network IP geolocation |
| Replay attack (reuse old photo) | Photo timestamp + hash stored; duplicate rejected within 24h window |
| Coordinated ring fraud | Isolation Forest detects unusual claim cluster in zone |
| New account fraud | Account age < 14 days gets elevated fraud threshold |
| Speed spoofing (riding during claim) | Accelerometer data + GPS trace speed check |

### Duplicate Photo Detection

```
On every photo submission:
  1. Extract photo timestamp + GPS from EXIF
  2. Hash photo content (perceptual hash)
  3. Compare against last 7-day claim history
  4. If same zone + same hour → DUPLICATE → BLOCKED
  5. If pHash similarity > 95% → POSSIBLE_DUPLICATE → REVIEW
```

---

## 15 🔧 Tech Stack & Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          FRONTEND                               │
│  React 18 + Vite  |  Zero CSS framework  |  PWA Manifest        │
│  7 pages  |  6 components  |  Context API state management      │
│  Client-side ML engine (mirrors trained models offline-first)   │
└─────────────────────────┬───────────────────────────────────────┘
                           │  REST API
┌─────────────────────────▼───────────────────────────────────────┐
│                          BACKEND                                │
│  Node.js + Express  |  In-memory DB (→ PostgreSQL in prod)      │
│  Auth: Phone OTP  |  JWT sessions  |  Rate limiting             │
│  Proxies to ML API for all predictions                          │
└─────────────────────────┬───────────────────────────────────────┘
                           │  HTTP
┌─────────────────────────▼───────────────────────────────────────┐
│                         ML API                                  │
│  Python FastAPI + Uvicorn  |  5 trained .pkl models             │
│  scikit-learn + (XGBoost + LightGBM when available)             │
│  Endpoints: risk, loss, fraud, loan, decision-engine, weather   │
└─────────────────────────────────────────────────────────────────┘
                           │
┌─────────────────────────▼───────────────────────────────────────┐
│                      EXTERNAL APIs                              │
│  Open-Meteo: Real weather data  |  AQICN: Air quality           │
│  TomTom: Live traffic           |  Razorpay: UPI payouts        │
│  Anthropic Claude: AI chatbot   |  MSG91: OTP SMS               │
└─────────────────────────────────────────────────────────────────┘
```

### Why PWA (Not Native App)?

Most delivery workers use **₹8,000–₹12,000 Android phones** with limited storage and intermittent 2G/3G. A PWA opens instantly in Chrome — zero download, zero barriers. GPS, camera, push notifications, and offline support are identical to native apps.

---

## 16 📁 Full File Structure

```
paynest/
│
├── README.md                          ← This file
│
├── ml/                                ← Python ML layer
│   ├── generate_datasets.py           ← Synthetic data (28,000 rows total)
│   ├── train_models.py                ← Full training pipeline (4 models)
│   ├── api.py                         ← FastAPI ML server (port 8001)
│   ├── requirements.txt
│   ├── datasets/
│   │   ├── risk_dataset.csv           (8,000 rows — 9 features)
│   │   ├── income_loss_dataset.csv    (8,000 rows — 8 features)
│   │   ├── fraud_dataset.csv          (8,000 rows — 9 features, 5.9% fraud)
│   │   └── loan_dataset.csv           (4,000 rows — 7 features)
│   └── models/
│       ├── risk_model.pkl             ← GradientBoosting (85.8% acc)
│       ├── loss_model.pkl             ← RandomForest (R²=0.971)
│       ├── fraud_rf_model.pkl         ← RandomForest (AUC=1.000)
│       ├── fraud_iso_model.pkl        ← IsolationForest ensemble
│       ├── fraud_scaler.pkl
│       ├── loan_model.pkl             ← GradientBoosting (99.5% acc)
│       ├── loan_amount_model.pkl      ← Loan amount regressor
│       └── training_report.json       ← Full metrics + feature importances
│
├── backend/                           ← Node.js Express API (port 8000)
│   ├── server.js                      ← All routes: auth, dashboard, payout, loan
│   └── package.json
│
└── frontend/                          ← React PWA (Vite, port 3000)
    ├── index.html
    ├── vite.config.js
    ├── package.json
    ├── public/
    │   └── manifest.json              ← PWA installable manifest
    └── src/
        ├── main.jsx                   ← React entry point
        ├── App.jsx                    ← Root router + 7-tab layout
        │
        ├── context/
        │   └── AppContext.jsx         ← Global state: weather, risk, user, payouts
        │
        ├── utils/
        │   ├── constants.js           ← Colors, cities, plan configs
        │   ├── mlEngine.js            ← Client-side ML (offline-first inference)
        │   └── translations.js        ← All 7 languages (EN/HI/TA/TE/KN/MR/BN)
        │
        ├── components/
        │   ├── UI.jsx                 ← Btn, Card, Badge, BarChart, ProgressBar...
        │   ├── ChatBot.jsx            ← Claude Sonnet AI chatbot (multilingual)
        │   ├── GPSCamera.jsx          ← Camera + GPS watermark + duplicate detect
        │   ├── NavigationPanel.jsx    ← Turn-by-turn directions + earnings maximiser
        │   ├── AIExplanation.jsx      ← "Why did I get paid?" in 7 languages
        │   └── PayoutEngine.jsx       ← Parametric trigger card
        │
        └── pages/
            ├── AuthScreens.jsx        ← Login + OTP + 3-step onboarding
            ├── Dashboard.jsx          ← Home: risk, weather, BTS, chart, payouts
            ├── DisruptionLive.jsx     ← Live 6-metric grid + ML probability bars
            ├── SafeMap.jsx            ← SVG safe zones + shortest safe path
            ├── StormForecast.jsx      ← 7-day forecast + dynamic premium
            ├── CameraPage.jsx         ← GPS camera + navigate + BTS + AI explain
            ├── LoanPage.jsx           ← Emergency micro-loan + doc upload
            └── PolicyPage.jsx         ← Plan + 8 triggers + dynamic pricing
```

**Total: 47 files** (including 7 trained model .pkl files + 4 training datasets)

---

## 17 🚀 Quick Start Guide

### Prerequisites

- Python 3.9+ and pip
- Node.js 18+

### Step 1 — ML Layer

```bash
cd ml

# Install dependencies
pip install -r requirements.txt

# Models are already trained! But to retrain from scratch:
python generate_datasets.py   # generates 4 CSVs (28K rows)
python train_models.py        # trains all models (~90 seconds)

# Training output:
#   Risk Model      → Accuracy: 85.8%
#   Income Loss     → MAE: ₹17, R²=0.971
#   Fraud Detection → AUC: 1.000
#   Loan Eligibility→ Accuracy: 99.5%

# Start ML API
uvicorn api:app --reload --port 8001
```

### Step 2 — Backend

```bash
cd backend
npm install
npm start          # runs on http://localhost:8000
# or npm run dev   # hot-reload with nodemon
```

### Step 3 — Frontend

```bash
cd frontend
npm install
npm run dev        # runs on http://localhost:3000
```

### Step 4 — Open the App

```
http://localhost:3000

Demo login:
  Phone: any 10-digit number (e.g. 9876543210)
  OTP:   shown on screen automatically

Try these flows:
  1. Complete onboarding → Dashboard → "Run Payout Check"
  2. Camera tab → Take GPS proof photo
  3. Camera tab → Navigate to Safe Zone
  4. Change language (top right) → try Hindi or Tamil
  5. Storm tab → see 7-day forecast + early buy alert
  6. Loan tab → check eligibility with AI
  7. Chat with the AI bot (bottom right 🤖)
```

### ML API Endpoints

```
POST /predict-risk            → Risk level + probabilities + disruption tags
POST /predict-loss            → Predicted income loss + formula
POST /detect-fraud            → Fraud score + flags + recommendation
POST /loan-eligibility        → Eligible + amount + EMI + required docs
POST /decision-engine         → Full parametric trigger (all 3 models)
GET  /simulate-weather/{city} → Live weather simulation
GET  /model-metrics           → Training report + feature importances
```

---

## 18 📊 Business Viability

### Unit Economics (Per 1,000 Workers)

```
Weekly premium collected      →  ₹22,000
Weekly payouts (30% hit rate) →  ₹12,000
Platform operating margin     →  ₹10,000  ✅

At 10,000 workers:
  Revenue   →  ₹2,20,000/week
  Payouts   →  ₹1,20,000/week
  Margin    →  ₹1,00,000/week  =  ₹52 Lakh/year
```

### Go-to-Market

```
Phase 1  →  Mumbai pilot: 500 Zomato partners in 3 zones
Phase 2  →  Scale to Bangalore, Chennai, Delhi (10,000 workers)
Phase 3  →  All major cities + Blinkit, Zepto, Amazon Flex
Phase 4  →  12 million workers nationwide
```

### Why This Wins

1. **₹0 distribution cost** — deducted from existing platform payouts
2. **₹0 claims processing** — 100% automated parametric engine
3. **Zero churn risk** — workers auto-renew via Sunday settlement
4. **Network effect** — more workers → better ML training data → more accurate → fewer false payouts

---

<div align="center">

## Built for India's 12 Million Unprotected Gig Workers

```
₹0   claims forms
₹0   human reviewers
₹0   waiting time
₹480 in Ravi's account — in under 10 minutes
```

---

**Team PayNest · Guidewire DEVTrails 2026**

*"We don't just protect income. We give workers the confidence to ride into the rain."*

</div>
