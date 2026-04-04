# ML Integration Guide - PayNest

## 🚀 Overview

This document outlines all ML model connections between the frontend React app, Express backend, and Python FastAPI ML service.

**Architecture:**
```
Frontend (React) → Express Backend (Node.js) → FastAPI ML Service (Python)
     ↓                    ↓                          ↓
  Dashboard          Risk/Fraud/Loan            ML Models
  Loan Page          Predictions                Risk Model
  etc.               Dynamic Pricing            Fraud Model
                     Zone Risk                  Loss Model
                                               Loan Model
                                               Zone Model
                                               Dynamic Pricing
```

---

## 📊 Available ML Models & Endpoints

### 1. **Risk Prediction** ⚠️
Predicts disruption risk based on weather conditions

**Endpoint:** `POST /api/risk/predict`

**Request:**
```javascript
{
  rainfall: 25,           // mm
  aqi: 142,               // Air Quality Index
  temperature: 31,        // °C
  traffic: 0.3,          // 0-1 scale
  month: 4               // 1-12
}
```

**Response:**
```json
{
  "risk_level": "MEDIUM",
  "probabilities": {
    "LOW": 0.3,
    "MEDIUM": 0.5,
    "HIGH": 0.2
  },
  "confidence": 0.85
}
```

**Frontend Usage:** Dashboard, Risk Display

---

### 2. **Fraud Detection** 🚨
Detects fraudulent claims/loans with ensemble scoring

**Endpoint:** `POST /api/ml/fraud`

**Request:**
```javascript
{
  gps_deviation_km: 0.2,
  location_consistency: 0.85,
  claim_frequency_30d: 2,
  account_age_months: 6,
  multiple_claims_per_day: 0,
  orders_during_disruption: 1,
  avg_payout_inr: 380,
  trust_score: 65,
  zone_risk_tier: 2
}
```

**Response:**
```json
{
  "fraud_score": 0.15,
  "verdict": "AUTO_APPROVE",
  "rf_probability": 0.12
}
```

**Verdict Types:** `AUTO_APPROVE`, `MONITOR`, `HOLD`, `BLOCK`

**Frontend Usage:** Loan Page, Claims Review

---

### 3. **Income Loss Prediction** 💰
Predicts income loss due to disruptions

**Endpoint:** `POST /api/ml/loss`

**Request:**
```javascript
{
  hourly_rate: 80,          // ₹/hour
  normal_work_hours: 6,     // hours/day
  rainfall_mm: 25,
  traffic_disruption: 0.5,  // 0-1
  aqi: 142,
  day_of_week: 3,           // 0-6 (Sun-Sat)
  is_peak_hour: 1,          // 0 or 1
  city_index: 2             // City code
}
```

**Response:**
```json
{
  "predicted_income_loss_inr": 240.50
}
```

**Frontend Usage:** Payout Calculation, Dashboard

---

### 4. **Loan Eligibility** 🏦
Determines loan eligibility and max amount

**Endpoint:** `POST /api/loan/check`

**Backend Call:**
```javascript
{
  months_active: 6,
  trust_score: 78,
  avg_monthly_income: 12000,
  fraud_flags: 0,
  existing_loans: 0,
  claims_paid: 12,
  zone_tier: 2
}
```

**Response:**
```json
{
  "eligible": true,
  "probability": 0.85,
  "max_loan_amount_inr": 5000
}
```

**Frontend Usage:** Loan Page

---

### 5. **Zone Risk Assessment** 📍
Assesses zone-level risk and insurance multipliers

**Endpoint:** `POST /api/zone/risk`

**Request:**
```javascript
{
  floodHistory: 2,       // Years
  drainage: 0.6,         // Quality 0-1
  monsoon: 2200,         // Avg mm
  elevation: 10,         // meters
  curfew: 0,            // 0 or 1
  roadQuality: 0.7      // 0-1
}
```

**Response:**
```json
{
  "zone_risk_tier": "MEDIUM",
  "premium_multiplier": 1.0,
  "confidence": 0.88
}
```

**Premium Multipliers:**
- **HIGH**: 1.3x
- **MEDIUM**: 1.0x
- **LOW**: 0.8x

**Frontend Usage:** Premium Calculation, Zone Pages

---

### 6. **Dynamic Pricing** 💹
Calculates adjusted premiums based on real-time factors

**Endpoint:** `POST /api/pricing/dynamic`

**Request:**
```javascript
{
  basePremium: 500,
  latitude: 19.0760,
  longitude: 72.8777,
  experience: 6,           // months
  vehicleType: "bike",     // bike|scooter|car|van
  safetyScore: 0.8,        // 0-1
  weatherRisk: 0.3,        // 0-1
  trafficIndex: 0.5        // 0-1
}
```

**Response:**
```json
{
  "dynamic_premium_inr": 520.50,
  "base_premium_inr": 500,
  "adjustment_breakdown": {
    "zone_safety_discount": 0,
    "experience_multiplier": 0.94,
    "vehicle_risk_multiplier": 1.2,
    "time_risk_multiplier": 1.1,
    "overall_risk_multiplier": 1.24
  },
  "coverage_adjustment": {
    "base_hours": 12,
    "additional_hours": 2,
    "total_coverage_hours": 14
  },
  "recommendations": [
    "Extra coverage activated"
  ]
}
```

**Frontend Usage:** Pricing Pages, Premium Calculation

---

## 🔗 Backend Integration Points

### Express Server Routes (server.js)

1. **Auth Routes**
   - `POST /api/auth/otp` - Send OTP
   - `POST /api/auth/verify` - Verify OTP
   - `POST /api/auth/register` - Register user
   - `POST /api/auth/onboard` - Onboard user

2. **Payout Routes** (ML-Enabled)
   - `POST /api/payout/check` - Check with fraud + loss ML
   - `POST /api/payout/process` - Process payout
   - `POST /api/risk/predict` - Get ML risk score

3. **Loan Routes** (ML-Enabled)
   - `POST /api/loan/check` - Check eligibility with ML
   - `POST /api/loan/apply` - Apply for loan

4. **ML Routes**
   - `POST /api/ml/fraud` - Direct fraud prediction
   - `POST /api/ml/risk` - Direct risk prediction
   - `POST /api/ml/loss` - Direct loss prediction
   - `POST /api/ml/loan` - Direct loan prediction
   - `POST /api/pricing/dynamic` - Dynamic pricing
   - `POST /api/zone/risk` - Zone risk assessment

---

## 🎯 Frontend Integration Points

### Key Files Updated

1. **src/utils/api.js** (NEW)
   - Centralized API client
   - All endpoints typed and documented
   - Auto-includes auth token

2. **src/context/AppContext.jsx** (ENHANCED)
   - Calls `POST /api/risk/predict` 
   - Updates risk state with ML predictions
   - Fallback heuristics if ML service unavailable

3. **src/pages/Dashboard.jsx**
   - Displays ML risk scores
   - Shows weather data
   - Displays payout history

4. **src/pages/LoanPage.jsx** (ENHANCED)
   - Calls `POST /api/loan/check` for eligibility
   - Calls `POST /api/ml/fraud` for fraud check
   - Blocks application if fraud risk detected
   - Shows ML-based max loan amount

---

## 🧪 Testing the ML Integration

### 1. Start All Services

```bash
# Terminal 1: Python ML API
cd /Users/keerthana/Downloads/files-6
python api.py

# Terminal 2: Express Backend
node server.js

# Terminal 3: React Frontend
npm run dev
```

### 2. Test Risk Prediction

```bash
curl -X POST http://localhost:8000/api/risk/predict \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-token" \
  -d '{
    "rainfall": 75,
    "aqi": 350,
    "temperature": 42,
    "traffic": 0.7,
    "month": 6
  }'
```

Expected: HIGH risk with high confidence

### 3. Test Fraud Detection

```bash
curl -X POST http://localhost:8000/api/ml/fraud \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-token" \
  -d '{
    "gps_deviation_km": 5.0,
    "location_consistency": 0.3,
    "claim_frequency_30d": 10,
    "account_age_months": 1,
    "multiple_claims_per_day": 0,
    "orders_during_disruption": 5,
    "avg_payout_inr": 5000,
    "trust_score": 20,
    "zone_risk_tier": 3
  }'
```

Expected: BLOCK verdict with high fraud score

### 4. Test Loan Eligibility

Navigate to Loan Page in frontend and click "Check Eligibility" - should see both ML fraud check and loan eligibility.

---

## 📈 ML Model Details

### Risk Model
- **Type**: GradientBoostingClassifier
- **Classes**: LOW, MEDIUM, HIGH
- **Features**: rainfall, aqi, traffic, temperature, visibility, humidity, wind, flood_history, month
- **Performance**: ~95% accuracy on test set

### Fraud Model
- **Type**: Ensemble (RandomForest + IsolationForest)
- **Output**: Fraud score (0-1)
- **Thresholds**:
  - 0.00-0.30: AUTO_APPROVE
  - 0.30-0.50: MONITOR
  - 0.50-0.70: HOLD
  - 0.70-1.00: BLOCK

### Loan Model
- **Type**: GradientBoostingClassifier + RandomForestRegressor
- **Input**: months_active, trust_score, income, fraud_flags, loans, claims, zone_tier
- **Output**: eligible (bool), max_amount (int)

### Dynamic Pricing Model
- **Type**: GradientBoostingRegressor
- **Features**: base_premium, location, experience, vehicle, safety_score, weather, traffic, time, day
- **Adjusts**: Premium amount (+/- %)

---

## ⚠️ Important Notes

1. **ML Service Must Run First**
   - Start `python api.py` before Express server
   - Models load on startup (~2-3 seconds)
   - Check logs for "✅ All models loaded successfully"

2. **Fallback Behavior**
   - If ML service unavailable, backend uses heuristics/defaults
   - Frontend shows "fallback: true" in error responses
   - User experience continues uninterrupted

3. **Auth Token**
   - All `/api/ml/*` endpoints require Bearer token
   - Frontend auto-includes token from localStorage
   - Use "demo-token" for testing

4. **Data Validation**
   - All inputs validated by Pydantic (backend)
   - Type mismatches return 422 error
   - See api.py request models for exact specs

---

## 🔄 Data Flow Examples

### Example 1: Payout Check
```
User clicks "Check Payout" on Dashboard
  ↓
Frontend sends weather data to /api/payout/check
  ↓
Express calls ML service with formatted data:
  - Fraud prediction
  - Loss prediction
  - Risk triggers
  ↓
Express returns combined result
  ↓
Frontend displays payout amount + fraud verdict
```

### Example 2: Loan Application
```
User navigates to Loan page
  ↓
Frontend calls /api/loan/check
  ↓
Express simultaneously calls:
  - ML loan eligibility endpoint
  - ML fraud detection endpoint
  ↓
Both results returned
  ↓
If fraud risk: Show block message
If eligible + approved: Show application form
  ↓
User submits form to /api/loan/apply
  ↓
Loan created in backend
```

---

## 📚 Next Steps

1. **Integrate more pages:**
   - DynamicPricingDemo.jsx → Use `/api/pricing/dynamic`
   - PolicyPage.jsx → Use `/api/zone/risk`
   - StormForecast.jsx → Use `/api/risk/predict`

2. **Add more features:**
   - Real-time model performance dashboard
   - User feedback loop for model improvement
   - A/B testing different model versions

3. **Optimize:**
   - Cache ML predictions for common scenarios
   - Batch requests to reduce latency
   - Add request queuing for high traffic

---

## 📞 Support

For issues with ML integration:
1. Check logs in both terminals
2. Verify all services are running
3. Test endpoints directly with curl
4. Check request/response formats match documentation
