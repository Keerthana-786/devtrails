from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import json
from pathlib import Path

app = FastAPI(title="PayNest ML API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Load all models at startup
models = {}
try:
    models["risk"] = joblib.load("models/risk_model.pkl")
    models["risk_le"] = joblib.load("models/risk_label_encoder.pkl")
    models["loss"] = joblib.load("models/loss_model.pkl")
    models["fraud_rf"] = joblib.load("models/fraud_rf_model.pkl")
    models["fraud_iso"] = joblib.load("models/fraud_iso_model.pkl")
    models["fraud_scaler"] = joblib.load("models/fraud_scaler.pkl")

    models["zone"] = joblib.load("models/zone_model.pkl")
    models["zone_le"] = joblib.load("models/zone_label_encoder.pkl")
    models["dynamic_pricing"] = joblib.load("models/dynamic_pricing_model.pkl")
    models["vehicle_encoder"] = joblib.load("models/vehicle_type_encoder.pkl")
    print("✅ All models loaded successfully")
except Exception as e:
    print(f"⚠️  Model loading failed: {e}. Train models first with: python train_models.py")

# ── Request Models ─────────────────────────────────────────────────────────────

class RiskInput(BaseModel):
    rainfall_mm: float
    aqi: float
    traffic_disruption: float
    temperature_c: float
    flood_history_score: int
    visibility_km: float
    humidity_pct: float
    wind_speed_kmh: float
    month: int

class LossInput(BaseModel):
    hourly_rate: int
    normal_work_hours: float
    rainfall_mm: float
    traffic_disruption: float
    aqi: float
    day_of_week: int
    is_peak_hour: int
    city_index: int

class FraudInput(BaseModel):
    gps_deviation_km: float
    location_consistency: float
    claim_frequency_30d: int
    account_age_months: float
    multiple_claims_per_day: int
    orders_during_disruption: int
    avg_payout_inr: int
    trust_score: float
    zone_risk_tier: int



class ZoneInput(BaseModel):
    flood_history_5yr: float
    drainage_quality: float
    monsoon_avg_mm: float
    elevation_score: float
    curfew_history: int
    road_quality: float

class DynamicPricingInput(BaseModel):
    base_premium: float
    zone_lat: float
    zone_lng: float
    worker_experience_months: int
    vehicle_type: str  # bike, scooter, car, van
    historical_safety_score: float  # 0-1, based on past claims
    current_weather_risk: float  # 0-1, real-time weather assessment
    traffic_congestion_index: float  # 0-1
    time_of_day: int  # 0-23
    day_of_week: int  # 0-6

class AutomatedTriggerInput(BaseModel):
    worker_id: str
    current_lat: float
    current_lng: float
    timestamp: str
    weather_condition: str
    traffic_speed_kmh: float
    orders_active: int


# ── Endpoints ──────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"status": "PayNest ML API running", "models_loaded": list(models.keys())}

@app.get("/health")
def health():
    return {"status": "ok", "models": len(models)}

@app.post("/predict/risk")
def predict_risk(data: RiskInput):
    if "risk" not in models:
        raise HTTPException(503, "Risk model not loaded. Run train_models.py first.")
    X = np.array([[data.rainfall_mm, data.aqi, data.traffic_disruption, data.temperature_c,
                   data.flood_history_score, data.visibility_km, data.humidity_pct,
                   data.wind_speed_kmh, data.month]])
    pred = models["risk"].predict(X)[0]
    proba = models["risk"].predict_proba(X)[0]
    label = models["risk_le"].inverse_transform([pred])[0]
    classes = models["risk_le"].classes_
    return {
        "risk_level": label,
        "probabilities": dict(zip(classes.tolist(), proba.round(3).tolist())),
        "confidence": float(proba.max())
    }

@app.post("/predict/loss")
def predict_loss(data: LossInput):
    if "loss" not in models:
        raise HTTPException(503, "Loss model not loaded.")
    X = np.array([[data.hourly_rate, data.normal_work_hours, data.rainfall_mm,
                   data.traffic_disruption, data.aqi, data.day_of_week,
                   data.is_peak_hour, data.city_index]])
    loss = models["loss"].predict(X)[0]
    return {"predicted_income_loss_inr": round(float(loss), 2)}

@app.post("/predict/fraud")
def predict_fraud(data: FraudInput):
    if "fraud_rf" not in models:
        raise HTTPException(503, "Fraud model not loaded.")
    X = np.array([[data.gps_deviation_km, data.location_consistency, data.claim_frequency_30d,
                   data.account_age_months, data.multiple_claims_per_day,
                   data.orders_during_disruption, data.avg_payout_inr,
                   data.trust_score, data.zone_risk_tier]])
    X_s = models["fraud_scaler"].transform(X)
    rf_proba = models["fraud_rf"].predict_proba(X_s)[0][1]
    iso_score = float(-models["fraud_iso"].score_samples(X_s)[0])
    iso_norm = max(0, min(1, (iso_score - 0.1) / 0.5))
    ensemble_score = round(0.7 * float(rf_proba) + 0.3 * iso_norm, 3)

    if ensemble_score <= 0.30:
        verdict = "AUTO_APPROVE"
    elif ensemble_score <= 0.50:
        verdict = "MONITOR"
    elif ensemble_score <= 0.70:
        verdict = "HOLD"
    else:
        verdict = "BLOCK"

    return {
        "fraud_score": ensemble_score,
        "verdict": verdict,
        "rf_probability": round(float(rf_proba), 3)
    }



@app.post("/predict/zone")
def predict_zone(data: ZoneInput):
    if "zone" not in models:
        raise HTTPException(503, "Zone model not loaded.")
    X = np.array([[data.flood_history_5yr, data.drainage_quality, data.monsoon_avg_mm,
                   data.elevation_score, data.curfew_history, data.road_quality]])
    pred = models["zone"].predict(X)[0]
    proba = models["zone"].predict_proba(X)[0]
    label = models["zone_le"].inverse_transform([pred])[0]
    multiplier = {"HIGH": 1.3, "MEDIUM": 1.0, "LOW": 0.8}.get(label, 1.0)
    return {
        "zone_risk_tier": label,
        "premium_multiplier": multiplier,
        "confidence": float(proba.max())
    }

@app.post("/predict/dynamic-pricing")
def predict_dynamic_pricing(data: DynamicPricingInput):
    """
    Advanced dynamic pricing model that adjusts premiums based on hyper-local risk factors
    """
    if "dynamic_pricing" not in models:
        raise HTTPException(503, "Dynamic pricing model not loaded. Run train_models.py first.")

    # Prepare features for ML model
    vehicle_encoded = models["vehicle_encoder"].transform([data.vehicle_type])[0]

    features = np.array([[
        data.base_premium,
        data.zone_lat,
        data.zone_lng,
        data.worker_experience_months,
        vehicle_encoded,
        data.historical_safety_score,
        data.current_weather_risk,
        data.traffic_congestion_index,
        data.time_of_day,
        data.day_of_week
    ]])

    # Get ML prediction
    predicted_premium = float(models["dynamic_pricing"].predict(features)[0])

    # Calculate adjustment breakdown for transparency
    zone_safety_discount = 2 if data.historical_safety_score > 0.8 else 0
    experience_multiplier = max(0.7, 1 - (data.worker_experience_months * 0.01))
    vehicle_risk = {"bike": 1.2, "scooter": 1.1, "car": 1.0, "van": 0.9}.get(data.vehicle_type, 1.0)
    time_risk = 1.0
    if 7 <= data.time_of_day <= 10 or 17 <= data.time_of_day <= 20:
        time_risk = 1.3
    if data.day_of_week >= 5:
        time_risk *= 1.1

    risk_multiplier = data.current_weather_risk * 0.4 + data.traffic_congestion_index * 0.3 + (1 - data.historical_safety_score) * 0.3
    risk_multiplier *= experience_multiplier * vehicle_risk * time_risk

    # Coverage hours adjustment based on predictive modeling
    base_coverage_hours = 12
    additional_hours = 0
    if data.current_weather_risk < 0.3:  # Good weather
        additional_hours = 2
    elif data.current_weather_risk > 0.7:  # Bad weather
        additional_hours = -1

    coverage_hours = base_coverage_hours + additional_hours

    # Generate recommendations
    recommendations = []
    if data.traffic_congestion_index > 0.7:
        recommendations.append("Consider route optimization")
    if additional_hours > 0:
        recommendations.append("Extra coverage activated")
    if zone_safety_discount > 0:
        recommendations.append("Premium discount applied")

    return {
        "dynamic_premium_inr": round(predicted_premium, 2),
        "base_premium_inr": data.base_premium,
        "adjustment_breakdown": {
            "zone_safety_discount": zone_safety_discount,
            "experience_multiplier": round(experience_multiplier, 3),
            "vehicle_risk_multiplier": vehicle_risk,
            "time_risk_multiplier": time_risk,
            "overall_risk_multiplier": round(risk_multiplier, 3)
        },
        "coverage_adjustment": {
            "base_hours": base_coverage_hours,
            "additional_hours": additional_hours,
            "total_coverage_hours": coverage_hours
        },
        "risk_factors": {
            "weather_risk": round(data.current_weather_risk, 3),
            "traffic_risk": round(data.traffic_congestion_index, 3),
            "historical_safety": round(data.historical_safety_score, 3)
        },
        "recommendations": recommendations
    }

@app.post("/triggers/check-disruptions")
def check_automated_triggers(data: AutomatedTriggerInput):
    """
    Automated triggers using public/mock APIs to identify income disruptions
    Returns 3-5 potential triggers that could lead to claims
    """
    triggers = []

    # Trigger 1: Heavy Rain Detection (using mock weather API)
    if "rain" in data.weather_condition.lower() or "storm" in data.weather_condition.lower():
        rain_intensity = np.random.uniform(0.5, 1.0)  # Mock API call
        if rain_intensity > 0.7:
            triggers.append({
                "trigger_id": "RAIN_INTENSITY",
                "type": "Weather Disruption",
                "severity": "HIGH",
                "description": f"Heavy rainfall detected ({rain_intensity:.1%} intensity)",
                "estimated_loss_hours": 3 + (rain_intensity * 4),  # 3-7 hours
                "auto_claim_eligible": True,
                "confidence": 0.95
            })

    # Trigger 2: Traffic Congestion (using mock traffic API)
    traffic_threshold = 15  # km/h threshold for disruption
    if data.traffic_speed_kmh < traffic_threshold:
        congestion_level = (traffic_threshold - data.traffic_speed_kmh) / traffic_threshold
        if congestion_level > 0.5:
            triggers.append({
                "trigger_id": "TRAFFIC_CONGESTION",
                "type": "Traffic Disruption",
                "severity": "MEDIUM" if congestion_level < 0.8 else "HIGH",
                "description": f"Severe traffic congestion ({data.traffic_speed_kmh:.1f} km/h)",
                "estimated_loss_hours": 1 + (congestion_level * 3),  # 1-4 hours
                "auto_claim_eligible": congestion_level > 0.7,
                "confidence": 0.88
            })

    # Trigger 3: Low Order Volume During Peak Hours (using mock delivery API)
    current_hour = int(data.timestamp.split('T')[1][:2]) if 'T' in data.timestamp else 12
    is_peak_hour = (7 <= current_hour <= 10) or (18 <= current_hour <= 21)
    expected_orders = 8 if is_peak_hour else 4  # Mock expected orders

    if data.orders_active < expected_orders * 0.3 and is_peak_hour:
        order_shortfall = (expected_orders - data.orders_active) / expected_orders
        triggers.append({
            "trigger_id": "ORDER_SHORTFALL",
            "type": "Business Disruption",
            "severity": "MEDIUM",
            "description": f"Order volume {order_shortfall:.0%} below expected during peak hours",
            "estimated_loss_hours": 2 + (order_shortfall * 4),  # 2-6 hours
            "auto_claim_eligible": order_shortfall > 0.6,
            "confidence": 0.76
        })

    # Trigger 4: Air Quality Alert (using mock AQI API)
    mock_aqi = np.random.uniform(50, 300)  # Mock AQI reading
    if mock_aqi > 150:
        aqi_severity = "MODERATE" if mock_aqi < 200 else "HIGH" if mock_aqi < 300 else "VERY_HIGH"
        triggers.append({
            "trigger_id": "AIR_QUALITY",
            "type": "Environmental Disruption",
            "severity": aqi_severity,
            "description": f"Poor air quality detected (AQI: {mock_aqi:.0f})",
            "estimated_loss_hours": 1 + ((mock_aqi - 150) / 150 * 3),  # 1-4 hours
            "auto_claim_eligible": mock_aqi > 250,
            "confidence": 0.82
        })

    # Trigger 5: GPS Route Deviation (using mock routing API)
    # Simulate checking if worker is significantly off optimal route
    route_efficiency = np.random.uniform(0.6, 1.0)  # Mock route efficiency
    if route_efficiency < 0.75:
        deviation_penalty = (1 - route_efficiency) * 100
        triggers.append({
            "trigger_id": "ROUTE_INEFFICIENCY",
            "type": "Routing Disruption",
            "severity": "LOW" if deviation_penalty < 15 else "MEDIUM",
            "description": f"Route inefficiency detected ({deviation_penalty:.1f}% deviation)",
            "estimated_loss_hours": deviation_penalty / 10,  # 0.5-2.5 hours
            "auto_claim_eligible": False,  # Manual review required
            "confidence": 0.65
        })

    # Sort by severity and confidence
    severity_order = {"VERY_HIGH": 5, "HIGH": 4, "MEDIUM": 3, "LOW": 2}
    triggers.sort(key=lambda x: (severity_order.get(x["severity"], 1), x["confidence"]), reverse=True)

    return {
        "worker_id": data.worker_id,
        "timestamp": data.timestamp,
        "location": f"{data.current_lat:.4f}, {data.current_lng:.4f}",
        "active_triggers": triggers[:5],  # Return top 5 triggers
        "total_triggers_detected": len(triggers),
        "auto_claim_candidates": [t for t in triggers if t["auto_claim_eligible"]],
        "requires_manual_review": [t for t in triggers if not t["auto_claim_eligible"]]
    }

@app.post("/claims/zero-touch")
def process_zero_touch_claim(trigger_data: AutomatedTriggerInput):
    """
    Zero-touch claim processing for eligible automated triggers
    """
    # First check for active triggers
    trigger_response = check_automated_triggers(trigger_data)

    eligible_triggers = trigger_response["auto_claim_candidates"]
    if not eligible_triggers:
        return {
            "status": "NO_AUTO_CLAIM",
            "message": "No automated triggers qualify for zero-touch processing",
            "manual_review_required": True,
            "next_steps": ["Contact support", "Submit manual claim", "Provide evidence"]
        }

    # Process the highest priority eligible trigger
    primary_trigger = eligible_triggers[0]

    # Calculate payout based on trigger
    base_hourly_rate = 75  # ₹75/hour average
    payout_amount = primary_trigger["estimated_loss_hours"] * base_hourly_rate

    # Apply fraud checks
    fraud_score = np.random.uniform(0.1, 0.4)  # Mock fraud check

    if fraud_score > 0.7:
        return {
            "status": "FRAUD_FLAGGED",
            "message": "Claim flagged for manual review due to risk indicators",
            "trigger": primary_trigger,
            "next_steps": ["Identity verification", "Location confirmation", "Activity review"]
        }

    # Auto-approve and process
    claim_id = f"ZC{Date.now()}{np.random.randint(1000, 9999)}"

    return {
        "status": "AUTO_APPROVED",
        "claim_id": claim_id,
        "trigger_processed": primary_trigger,
        "payout_amount_inr": round(payout_amount, 2),
        "processing_time": "2-5 minutes",
        "disbursement_method": "Direct bank transfer",
        "confirmation_message": f"₹{payout_amount:.0f} will be credited to your account within 24 hours",
        "support_contact": "If you don't receive payment, call 1800-XXX-XXXX",
        "next_steps": [
            "Payment will be processed automatically",
            "Check your bank account in 24-48 hours",
            "No further action required"
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)
