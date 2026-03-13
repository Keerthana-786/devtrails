# GigShield — AI-Powered Parametric Income Insurance for India's Gig Delivery Workers

> **Hackathon:** Guidewire DEVTrails 2026  
> **Problem Statement:** AI-Enabled Parametric Insurance Platform  
> **Persona:** Food Delivery Partners — Zomato / Swiggy, Mumbai  
> **Team Name:** Nexus4
> **Team Members**:
> Keerthana R
> Shakthi Ganesh
>Akshay Gopi
> Sanjith   

---

## Table of Contents

1. [The Problem](#the-problem)
2. [Our Solution](#our-solution)
3. [Persona and Scenarios](#persona-and-scenarios)
4. [Application Workflow](#application-workflow)
5. [Weekly Premium Model](#weekly-premium-model)
6. [Parametric Triggers](#parametric-triggers)
7. [Web vs Mobile Platform Decision](#web-vs-mobile-platform-decision)
8. [AI and ML Integration](#ai-and-ml-integration)
9. [Tech Stack](#tech-stack)
10. [Development Plan](#development-plan)
11. [What We Are NOT Covering](#what-we-are-not-covering)

---

## The Problem

India has over 12 million platform-based gig delivery workers. Workers on Zomato and Swiggy earn entirely based on how many deliveries they complete each day. There is no fixed salary. No work = no income.

External disruptions — heavy rainfall, floods, extreme heat, severe pollution, curfews — regularly stop these workers from operating. When this happens they lose 20 to 30 percent of their monthly income with absolutely no safety net.

**Nobody currently insures the income they lose.**

Traditional insurance covers health, accidents, or vehicle damage. Nobody covers the lost wages when a worker cannot ride because the roads are flooded. That is the exact gap GigShield fills.

---

## Our Solution

GigShield is an AI-powered parametric income insurance platform that:

- Monitors weather, traffic, and worker location in real time using APIs
- Automatically detects when a disruption has prevented a worker from earning
- Fires a UPI payout to the worker within 10 minutes — with zero claim forms
- Charges a simple weekly premium of ₹20 auto-deducted from the worker's Zomato payout
- Uses AI to personalise premiums, detect fraud, and predict disruptions 24 to 48 hours in advance

**Three words:** Detect. Verify. Pay. Automatically.

---

## Persona and Scenarios

### Chosen Persona
**Ravi Kumar** — Food delivery partner on Zomato, operating in Andheri West, Mumbai.  
- Works 8 to 10 hours per day  
- Earns approximately ₹600 per day  
- Owns a two-wheeler registered on the Zomato platform  
- Has no financial safety net for disruption days  

---

### Scenario 1 — Heavy Rainfall (Most Common Disruption)

**Situation:**  
It is Tuesday morning. Heavy rain hits Andheri West. Rainfall crosses 72mm within 3 hours. Roads are flooded. Ravi cannot ride his bike safely.

**What GigShield does:**  
1. Open-Meteo API reports 72mm rainfall in Andheri West zone  
2. AI checks — 72mm exceeds 60mm threshold — trigger fires  
3. TomTom Traffic API confirms 80% of roads in zone are blocked  
4. GPS confirms Ravi is stationary in the flooded zone  
5. Fraud check passes — Ravi is genuinely stuck  
6. Payout calculated: ₹80/hour × 6 hours lost = ₹480  
7. ₹480 sent to ravi.kumar@upi within 10 minutes  
8. Ravi receives notification: "Heavy rain detected. ₹480 credited."

**Safe Zone Mode activates simultaneously:**  
System shows Ravi nearby deliveries within 1.5 km radius that are safe to complete. If he accepts them, he earns partial income. Insurance covers the difference between his normal earnings and what he actually earned.

---

### Scenario 2 — Extreme Heat (Summer Disruption)

**Situation:**  
May afternoon. Temperature in Kurla reaches 47°C. Outdoor work becomes dangerous. Orders drop significantly as customers stay indoors.

**What GigShield does:**  
1. WeatherAPI reports 47°C in Kurla zone  
2. AI detects heat threshold breach (above 45°C)  
3. Payout = 75% of daily average earning  
4. Auto-credited to worker UPI  

---

### Scenario 3 — Severe Pollution (Delhi-style AQI Event)

**Situation:**  
Winter morning. AQI in the worker's zone hits 420. Outdoor activity is officially classified as hazardous. Worker cannot safely operate.

**What GigShield does:**  
1. AQICN API reports AQI 420  
2. Threshold breach — AQI above 400  
3. Payout = 50% of daily average  
4. Auto-credited within 10 minutes  

---

### Scenario 4 — Curfew or Local Strike

**Situation:**  
Sudden curfew declared in three pincodes. Worker cannot access pickup or drop locations.

**What GigShield does:**  
1. Admin panel logs official curfew declaration  
2. All insured workers in those pincodes are identified  
3. 100% payout triggered  
4. Paid within 10 minutes  

---

### Scenario 5 — Storm Prep Mode (Prediction, 24 Hours Ahead)

**Situation:**  
Weather forecast predicts 90mm rainfall tomorrow afternoon in Andheri West.

**What GigShield does:**  
1. AI detects high-risk forecast 24 to 48 hours ahead  
2. Ravi gets a notification at 8am: "Heavy rain predicted tomorrow 2pm to 6pm in your zone. Buy advance coverage for ₹8 now. Price goes to ₹20 once rain starts."  
3. Ravi buys advance coverage at discounted price  
4. When rain hits — payout fires automatically  

---

## Application Workflow

```
WORKER ONBOARDING
      ↓
Phone OTP → Name → Aadhaar verification → Zomato Partner ID
      ↓
Select delivery zone → Enter average daily earning → UPI ID
      ↓
Weekly ₹20 premium activated → Policy issued
      ↓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REAL-TIME MONITORING (runs every 15 minutes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      ↓
Weather API + Traffic API + GPS Tracker
      ↓
AI checks: Does any parameter cross threshold?
      ↓
      NO → Continue monitoring
      YES → Proceed to fraud check
      ↓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FRAUD DETECTION (Triple Verification)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      ↓
Check 1: Is worker GPS in the affected zone?
Check 2: Is worker's Zomato app showing zero orders?
Check 3: Has worker already claimed today?
      ↓
All 3 pass → Proceed to payout
Any fail → Flag as suspicious → Hold for review
      ↓
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PAYOUT CALCULATION AND PROCESSING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
      ↓
AI calculates: avg hourly rate × hours lost × payout %
      ↓
Payment API (Razorpay mock) fires UPI transfer
      ↓
Worker receives notification with breakdown
      ↓
Safe Zone Mode activates — nearby orders shown
```

---

## Weekly Premium Model

### Why Weekly?
Gig workers are paid weekly by platforms like Zomato. They think and plan week to week. A monthly premium feels large and abstract. A weekly premium of ₹20 feels manageable — it is less than one cup of chai per day.

### How it Works
- Premium of ₹20 is auto-deducted from the worker's Zomato weekly settlement
- Worker never needs to manually pay — it happens silently in the background
- Coverage period: 7 days from Monday to Sunday
- If no disruption occurs — premium is retained by the platform (standard insurance model)
- If disruption occurs — payout fires automatically, no action needed

### Dynamic Premium Using AI (Behavioral Trust Score)

The base premium of ₹20 per week adjusts based on risk profiling:

| Worker Tier | Criteria | Weekly Premium |
|---|---|---|
| New worker | Week 1 to 2, no history | ₹25 |
| Established | 4+ weeks, BTS score 60+ | ₹20 |
| Trusted | 12+ weeks, BTS score 80+ | ₹15 |
| Elite | 6+ months, BTS score 95+ | ₹10 |

**Behavioral Trust Score (BTS)** is calculated using:
- Consistency of working days per week
- Number of valid claims vs total claims
- GPS accuracy and zone compliance
- No suspicious claim patterns

Higher trust = lower premium. This creates a loyalty flywheel.

### Financial Model (Per 1000 Workers)

```
Weekly premium collected : 1000 × ₹22 avg = ₹22,000
Expected disruption days : 1.5 per week on average
Workers claiming          : ~30% of insured
Average payout per claim  : ₹400
Weekly payout amount      : 300 × ₹400 = ₹12,000
Platform operational margin: ₹10,000 per week per 1000 workers
```

---

## Parametric Triggers

These are the exact thresholds at which payouts fire automatically:

| Disruption Type | Parameter | Threshold | Payout Percentage |
|---|---|---|---|
| Light rain | Rainfall mm | 30mm to 60mm | 25% of daily average |
| Heavy rain | Rainfall mm | 60mm to 100mm | 50% of daily average |
| Flood-level rain | Rainfall mm | Above 100mm | 100% of daily average |
| Extreme heat | Temperature °C | Above 45°C | 75% of daily average |
| Mild pollution | AQI | 300 to 400 | 25% of daily average |
| Severe pollution | AQI | Above 400 | 50% of daily average |
| Road closure | % roads blocked | Above 70% | 100% of daily average |
| Official curfew | Government declaration | Any active curfew | 100% of daily average |

### Maximum Weekly Payout Cap
- Maximum payout per worker per week: ₹3,000
- Prevents over-insurance and platform loss on extreme weeks

---

## Web vs Mobile Platform Decision

### Decision: Progressive Web App (PWA) — accessible on both web and mobile

**Why not native mobile app only:**
- Many delivery workers use low-end Android phones with limited storage
- PWA works on any browser — no installation required
- Workers already use Zomato app — adding another heavy app creates friction
- PWA can send push notifications like a native app

**Why not web only:**
- GPS tracking requires mobile access
- Workers need to check zone status while on the road
- Push notifications for payouts must reach them instantly

**PWA gives the best of both:**
- Opens in browser — zero installation friction
- Works offline for basic features
- GPS access available
- Push notifications supported
- Lightweight — works on 2G/3G networks

**Language support:**
- Hindi, Tamil, Telugu, Kannada
- Voice-assisted onboarding for low-literacy users

---

## AI and ML Integration

### 1. Dynamic Premium Calculation

**Model type:** Regression model  
**Input features:**
- Worker's delivery zone (flood risk score based on historical data)
- Years of experience on platform
- Average daily earnings
- Historical claim frequency in their zone
- Current Behavioral Trust Score

**Output:** Personalised weekly premium between ₹10 and ₹35

### 2. Risk Zone Classification

**Model type:** Classification model using historical weather data  
**What it does:**  
Classifies each delivery zone into HIGH / MEDIUM / LOW risk based on:
- 5-year historical flood frequency
- Average monsoon rainfall
- Proximity to drainage-prone areas
- Historical curfew frequency

### 3. Fraud Detection

**Model type:** Anomaly detection  
**Checks performed:**

| Check | Method | Flag if |
|---|---|---|
| Location verification | GPS coordinates vs registered zone | Worker is 5km+ outside their zone |
| Speed verification | GPS speed data | Worker moving above 20 km/h during claimed disruption |
| Platform data cross-check | Zomato API order count | Worker completed 3+ orders on disruption day |
| Duplicate claim | Database lookup | Same worker claims twice in same disruption event |
| Pattern detection | ML model on claim history | Claim frequency is 3x higher than zone average |

### 4. Predictive Disruption Forecasting

**What it does:**  
Calls weather forecast API 24 to 48 hours ahead. If predicted rainfall exceeds threshold:
- Workers in affected zone get advance warning notification
- Discounted pre-event premium offered (₹8 vs ₹20 at-event price)
- Workers who buy in advance get priority payout processing

### 5. Payout Calculation Formula

```
hours_lost = disruption_duration_hours
hourly_rate = worker_avg_daily_earning / 8
payout_multiplier = trigger_payout_percentage / 100

gross_payout = hours_lost × hourly_rate × payout_multiplier
final_payout = min(gross_payout, weekly_cap_remaining)
```

---

## Tech Stack

### Frontend
| Layer | Technology | Reason |
|---|---|---|
| Framework | React.js | Component-based, fast, PWA support |
| Maps | Leaflet.js + OpenStreetMap | Free, no API key limits |
| Styling | Tailwind CSS | Rapid development |
| Charts | Recharts | Analytics dashboard |

### Backend
| Layer | Technology | Reason |
|---|---|---|
| Server | Node.js + Express | Fast API development |
| Database | MongoDB Atlas | Flexible schema for worker profiles |
| Real-time | Firebase Realtime DB | Live GPS streaming |
| Auth | Firebase Auth | OTP-based phone login |

### AI and ML
| Purpose | Tool | Details |
|---|---|---|
| Premium calculation | Python + scikit-learn | Regression model |
| Fraud detection | Python + Isolation Forest | Anomaly detection |
| Risk zone classification | Python + Random Forest | Historical weather data |
| Prediction | Open-Meteo forecast API | 48hr weather forecast |

### External APIs
| API | Purpose | Cost |
|---|---|---|
| Open-Meteo | Rainfall, temperature, forecast | Free, no key needed |
| OpenWeatherMap | Weather alerts, AQI | Free tier — 1000 calls/day |
| AQICN | Air Quality Index India | Free with API key |
| TomTom Traffic API | Road closure, traffic flow | Free — 2500 calls/day |
| Browser GPS API | Worker location tracking | Free — built into phones |
| Razorpay Sandbox | UPI payout simulation | Free sandbox |
| Firebase | GPS data streaming | Free tier |

### Deployment
- Frontend: Vercel (free tier)
- Backend: Railway or Render (free tier)
- Database: MongoDB Atlas free cluster

---

## Development Plan

### Phase 1 — Week 1 and 2 (Current Phase): Ideation and Foundation
- [x] Problem statement analysis and persona definition
- [x] Core feature design — parametric triggers, fraud detection, safe zone mode
- [x] API research and selection
- [x] Onboarding flow design
- [x] README documentation
- [ ] GitHub repository setup
- [ ] 2-minute strategy video

### Phase 2 — Week 3: Core Backend
- [ ] Worker onboarding API — phone OTP, Aadhaar mock verification, zone selection
- [ ] Open-Meteo API integration — live weather data polling every 15 minutes
- [ ] Trigger threshold engine — parametric rule checker
- [ ] Basic fraud detection — GPS zone check, duplicate claim prevention
- [ ] MongoDB schema — worker profiles, policies, claims, payouts

### Phase 3 — Week 4: Frontend and Map
- [ ] React PWA setup
- [ ] Onboarding screens — 6 step flow
- [ ] Zone map — Leaflet.js with red/green zone visualization
- [ ] Live weather overlay on map
- [ ] Safe zone near-delivery mode UI
- [ ] Worker dashboard — earnings, trust score, payout history

### Phase 4 — Week 5: AI and Payments
- [ ] AI premium calculation model — scikit-learn regression
- [ ] Fraud detection model — Isolation Forest on claim patterns
- [ ] Razorpay sandbox UPI payout integration
- [ ] Storm prep mode — 24hr advance warning notifications
- [ ] Policy card generation
- [ ] Payout breakdown screen

### Phase 5 — Week 6: Polish and Demo
- [ ] Admin analytics dashboard
- [ ] End-to-end demo flow — rain detected to UPI credited
- [ ] Performance testing
- [ ] Final presentation preparation
- [ ] Video demo recording

---

## What We Are NOT Covering

As per the problem statement golden rules, GigShield strictly excludes:

- Health insurance of any kind
- Life insurance
- Accident coverage
- Vehicle repair or damage
- Medical bills for worker or family members

GigShield covers **only the income lost** by the worker due to external, uncontrollable disruptions. Nothing else.

---

## Team

| Name | Role |
|---|---|
| [Member 1] | Frontend + UI |
| [Member 2] | Backend + APIs |
| [Member 3] | AI/ML + Data |
| [Member 4] | Product + Presentation |

---

## Repository Structure

```
gigshield/
├── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Onboarding/
│   │   │   ├── ZoneMap/
│   │   │   ├── Dashboard/
│   │   │   ├── PolicyCard/
│   │   │   └── PayoutScreen/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
├── backend/
│   ├── routes/
│   │   ├── workers.js
│   │   ├── triggers.js
│   │   ├── claims.js
│   │   └── payouts.js
│   ├── models/
│   ├── services/
│   │   ├── weatherService.js
│   │   ├── trafficService.js
│   │   ├── fraudDetection.js
│   │   └── payoutService.js
│   └── server.js
├── ml/
│   ├── premium_model.py
│   ├── fraud_detection.py
│   └── risk_zones.py
└── docs/
    └── api_documentation.md
```

---

*GigShield — Because every delivery worker deserves a safety net.*
