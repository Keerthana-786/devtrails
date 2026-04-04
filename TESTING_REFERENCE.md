# ML Integration Testing Reference

## 🚀 Quick Start

### Option 1: Manual Start (All Terminals)

```bash
# Terminal 1: ML API (Port 8001)
cd /Users/keerthana/Downloads/files-6
python api.py

# Terminal 2: Express Backend (Port 8000)
node server.js

# Terminal 3: React Frontend (Port 5173)
npm run dev
```

### Option 2: Automated Start (macOS)
```bash
cd /Users/keerthana/Downloads/files-6
./start-services.sh
```

---

## ✅ Health Checks

### Check ML API
```bash
curl http://localhost:8001/health
# Response: {"status": "ok", "models": 12}
```

### Check Express Backend
```bash
curl http://localhost:8000/health
# Response: {"status": "ok", "service": "PayNest Backend", "mlService": "http://localhost:8001"}
```

### Check Frontend
Open browser to `http://localhost:5173`

---

## 🧪 Test Scenarios

### Scenario 1: Test Risk Prediction (LOW Risk)

**Scenario:** Good weather, all readings normal
```bash
curl -X POST http://localhost:8000/api/risk/predict \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-token" \
  -d '{
    "rainfall": 10,
    "aqi": 80,
    "temperature": 28,
    "traffic": 0.2,
    "month": 4
  }'
```

**Expected Response:**
```json
{
  "risk_level": "LOW",
  "probabilities": {
    "LOW": 0.85,
    "MEDIUM": 0.12,
    "HIGH": 0.03
  },
  "confidence": 0.95
}
```

**Frontend:** Dashboard should show ✅ LOW risk in green

---

### Scenario 2: Test Risk Prediction (HIGH Risk)

**Scenario:** Heavy rain, high AQI, heat wave
```bash
curl -X POST http://localhost:8000/api/risk/predict \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-token" \
  -d '{
    "rainfall": 120,
    "aqi": 400,
    "temperature": 48,
    "traffic": 0.8,
    "month": 6
  }'
```

**Expected Response:**
```json
{
  "risk_level": "HIGH",
  "probabilities": {
    "LOW": 0.02,
    "MEDIUM": 0.15,
    "HIGH": 0.83
  },
  "confidence": 0.92
}
```

**Frontend:** Dashboard should show ⚠️ HIGH risk in red

---

### Scenario 3: Payout Check with Triggers

**Scenario:** Heavy rainfall triggers income loss check
```bash
curl -X POST http://localhost:8000/api/payout/check \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-token" \
  -d '{
    "rainfall": 85,
    "aqi": 200,
    "temperature": 35
  }'
```

**Expected Response:**
```json
{
  "triggered": true,
  "triggers": [
    {
      "type": "RAINFALL",
      "value": 85,
      "threshold": 60,
      "icon": "🌧️"
    }
  ],
  "payout": 480,
  "estimatedLoss": 240.50,
  "fraudScore": 0.08,
  "fraudVerdict": "AUTO_APPROVE",
  "canPay": true
}
```

**Frontend:** PayoutEngine should show payout amount

---

### Scenario 4: Fraud Detection - Clean Profile

**Scenario:** New user with good history
```bash
curl -X POST http://localhost:8000/api/ml/fraud \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-token" \
  -d '{
    "gps_deviation_km": 0.5,
    "location_consistency": 0.95,
    "claim_frequency_30d": 0,
    "account_age_months": 2,
    "multiple_claims_per_day": 0,
    "orders_during_disruption": 0,
    "avg_payout_inr": 200,
    "trust_score": 75,
    "zone_risk_tier": 1
  }'
```

**Expected Response:**
```json
{
  "fraud_score": 0.05,
  "verdict": "AUTO_APPROVE",
  "rf_probability": 0.03
}
```

**Frontend:** Loan Page shows ✅ APPROVED badge, allows application

---

### Scenario 5: Fraud Detection - Suspicious Profile

**Scenario:** Multiple flags, high deviation
```bash
curl -X POST http://localhost:8000/api/ml/fraud \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-token" \
  -d '{
    "gps_deviation_km": 8.5,
    "location_consistency": 0.2,
    "claim_frequency_30d": 8,
    "account_age_months": 0.5,
    "multiple_claims_per_day": 2,
    "orders_during_disruption": 3,
    "avg_payout_inr": 4500,
    "trust_score": 15,
    "zone_risk_tier": 3
  }'
```

**Expected Response:**
```json
{
  "fraud_score": 0.92,
  "verdict": "BLOCK",
  "rf_probability": 0.88
}
```

**Frontend:** Loan Page shows ❌ BLOCKED, prevents application

---

### Scenario 6: Loan Eligibility Check

**Scenario:** Established user checking loan
```bash
curl -X POST http://localhost:8000/api/loan/check \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-token"
```

Must be called authenticated. Expected with good user:

```json
{
  "eligible": true,
  "probability": 0.88,
  "max_loan_amount_inr": 8000
}
```

**Frontend:** Loan Page shows eligibility card with amount

---

### Scenario 7: Dynamic Pricing with Good Conditions

**Scenario:** Experienced driver, low risk, good weather
```bash
curl -X POST http://localhost:8000/api/pricing/dynamic \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-token" \
  -d '{
    "basePremium": 500,
    "latitude": 19.0760,
    "longitude": 72.8777,
    "experience": 24,
    "vehicleType": "car",
    "safetyScore": 0.95,
    "weatherRisk": 0.1,
    "trafficIndex": 0.3
  }'
```

**Expected Response:**
```json
{
  "dynamic_premium_inr": 445.50,
  "base_premium_inr": 500,
  "adjustment_breakdown": {
    "zone_safety_discount": 2,
    "experience_multiplier": 0.76,
    "vehicle_risk_multiplier": 1.0,
    "time_risk_multiplier": 1.0,
    "overall_risk_multiplier": 0.89
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

**Note:** Premium reduced due to good conditions and experience

---

### Scenario 8: Dynamic Pricing with Bad Conditions

**Scenario:** New driver, high risk, heavy traffic
```bash
curl -X POST http://localhost:8000/api/pricing/dynamic \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-token" \
  -d '{
    "basePremium": 500,
    "latitude": 19.0760,
    "longitude": 72.8777,
    "experience": 1,
    "vehicleType": "bike",
    "safetyScore": 0.4,
    "weatherRisk": 0.8,
    "trafficIndex": 0.9
  }'
```

**Expected Response:**
```json
{
  "dynamic_premium_inr": 755.50,
  "base_premium_inr": 500,
  "adjustment_breakdown": {
    "zone_safety_discount": 0,
    "experience_multiplier": 0.99,
    "vehicle_risk_multiplier": 1.2,
    "time_risk_multiplier": 1.0,
    "overall_risk_multiplier": 1.51
  },
  "coverage_adjustment": {
    "base_hours": 12,
    "additional_hours": -1,
    "total_coverage_hours": 11
  },
  "recommendations": [
    "Consider route optimization"
  ]
}
```

**Note:** Premium increases significantly due to risk factors

---

### Scenario 9: Zone Risk Assessment

**Scenario:** Low-risk zone (good infrastructure)
```bash
curl -X POST http://localhost:8000/api/zone/risk \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-token" \
  -d '{
    "floodHistory": 0,
    "drainage": 0.9,
    "monsoon": 1500,
    "elevation": 50,
    "curfew": 0,
    "roadQuality": 0.95
  }'
```

**Expected Response:**
```json
{
  "zone_risk_tier": "LOW",
  "premium_multiplier": 0.8,
  "confidence": 0.94
}
```

---

### Scenario 10: Zone Risk Assessment - High Risk

**Scenario:** Flood-prone zone with bad infrastructure
```bash
curl -X POST http://localhost:8000/api/zone/risk \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer demo-token" \
  -d '{
    "floodHistory": 6,
    "drainage": 0.2,
    "monsoon": 3500,
    "elevation": 5,
    "curfew": 1,
    "roadQuality": 0.3
  }'
```

**Expected Response:**
```json
{
  "zone_risk_tier": "HIGH",
  "premium_multiplier": 1.3,
  "confidence": 0.91
}
```

---

## 📊 API Response Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Risk prediction successful |
| 400 | Bad Request | Invalid input format |
| 401 | Unauthorized | Missing bearer token |
| 422 | Validation Error | Wrong data type |
| 503 | Service Down | ML service not available |

---

## 🔍 Debugging Tips

### 1. Check ML Service is Running
```bash
ps aux | grep "python api.py"
```
Should see the Python process running

### 2. Check Express Backend is Running
```bash
ps aux | grep "node server.js"
```
Should see the Node process running

### 3. Test ML API Directly
```bash
# Skip Express, hit Python directly
curl http://localhost:8001/health
```

### 4. Check Request Format
```bash
# Print raw request before sending
curl -v http://localhost:8000/api/health
```

### 5. View Express Logs
Look for:
- "🚀 PayNest Backend running on port 8000"
- "ML Layer expected at http://localhost:8001"

### 6. View ML API Logs
Look for:
- "✅ All models loaded successfully"
- "⚠️ Model loading failed" (indicates issues)

### 7. Frontend Console Errors
Open DevTools (F12) → Console tab
Check for:
- Network errors (backend not reachable)
- Auth errors (invalid token)
- JSON parsing errors

---

## 📈 Expected Performance

| Endpoint | Typical Latency | Notes |
|----------|-----------------|-------|
| /api/risk/predict | 50-100ms | Depends on data |
| /api/ml/fraud | 100-200ms | Ensemble model slow |
| /api/loan/check | 150-300ms | Calls 2 models |
| /api/pricing/dynamic | 80-150ms | Real-time calc |
| /api/zone/risk | 50-100ms | Quick assessment |

---

## 🎯 Integration Checklist

#### Dashboard
- [ ] Risk score updates from ML
- [ ] Weather displays real-time data
- [ ] Risk badge color changes with level
- [ ] Payout engine shows ML-predicted loss

#### Loan Page
- [ ] Fraud check runs before eligibility
- [ ] Max loan amount shown from ML
- [ ] Fraud block prevents application
- [ ] Approval probability displays

#### Payout Engine
- [ ] Checks both fraud + loss
- [ ] Shows triggers that are active
- [ ] Payout amount calculated with ML

#### Other Pages
- [ ] Dynamic pricing page integrated
- [ ] Zone risk assessment working
- [ ] Risk forecasts using ML

---

## 💡 Common Issues & Solutions

### Issue: "ML service unavailable"
**Solution:** Make sure `python api.py` is running on port 8001

### Issue: "401 Unauthorized"
**Solution:** Pass `-H "Authorization: Bearer demo-token"` in curl

### Issue: "Cannot POST /api/ml/fraud"
**Solution:** Check Express server is routing correctly (restart `node server.js`)

### Issue: Frontend shows fallback data
**Solution:** ML service is down → check Python API logs

### Issue: Port already in use
**Solution:** Kill existing process:
```bash
lsof -ti:8000 | xargs kill -9  # Express
lsof -ti:8001 | xargs kill -9  # ML API
lsof -ti:5173 | xargs kill -9  # Frontend
```

---

## 🧬 Model Files for Reference

```
models/
├── risk_model.pkl              # Risk classifier
├── risk_label_encoder.pkl      # Risk class encoder
├── loss_model.pkl              # Income loss regressor
├── fraud_rf_model.pkl          # Random forest fraud detector
├── fraud_iso_model.pkl         # Isolation forest anomaly
├── fraud_scaler.pkl            # Feature scaler
├── loan_model.pkl              # Loan eligibility classifier
├── loan_amount_model.pkl       # Loan amount regressor
├── zone_model.pkl              # Zone risk classifier
├── zone_label_encoder.pkl      # Zone class encoder
├── dynamic_pricing_model.pkl   # Dynamic pricing regressor
└── vehicle_type_encoder.pkl    # Vehicle type encoder
```

All models auto-load when `python api.py` starts
