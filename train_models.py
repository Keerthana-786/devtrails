"""
train_models.py — Full training pipeline for PayNest ML models
Trains 5 models in < 2 minutes and saves to models/ directory
"""

import json
import joblib
import numpy as np
import pandas as pd
from pathlib import Path
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier, RandomForestRegressor, IsolationForest
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, roc_auc_score, mean_absolute_error, r2_score

Path("models").mkdir(exist_ok=True)
report = {}

print("=" * 60)
print("  PayNest ML Training Pipeline")
print("=" * 60)

# ── Model 1: Risk Prediction ──────────────────────────────────────────────────
print("\n[1/5] Training Risk Prediction Model...")
df = pd.read_csv("datasets/risk_dataset.csv")
le = LabelEncoder()
X = df.drop("risk_level", axis=1)
y = le.fit_transform(df["risk_level"])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = GradientBoostingClassifier(n_estimators=200, max_depth=5, learning_rate=0.1, random_state=42)
model.fit(X_train, y_train)

acc = accuracy_score(y_test, model.predict(X_test))
cv = cross_val_score(model, X, y, cv=5, scoring="accuracy")

joblib.dump(model, "models/risk_model.pkl")
joblib.dump(le, "models/risk_label_encoder.pkl")

importances = dict(zip(X.columns, model.feature_importances_.round(4)))
report["risk_model"] = {
    "accuracy": round(acc * 100, 2),
    "cv_mean": round(cv.mean() * 100, 2),
    "cv_std": round(cv.std() * 100, 2),
    "feature_importances": importances
}
print(f"  ✓ Accuracy: {acc*100:.2f}%  |  CV: {cv.mean()*100:.2f}% ± {cv.std()*100:.2f}%")

# ── Model 2: Income Loss ──────────────────────────────────────────────────────
print("\n[2/5] Training Income Loss Model...")
df = pd.read_csv("datasets/income_loss_dataset.csv")
X = df.drop("income_lost_inr", axis=1)
y = df["income_lost_inr"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = RandomForestRegressor(n_estimators=200, max_depth=12, random_state=42, n_jobs=-1)
model.fit(X_train, y_train)

pred = model.predict(X_test)
mae = mean_absolute_error(y_test, pred)
r2 = r2_score(y_test, pred)

joblib.dump(model, "models/loss_model.pkl")

importances = dict(zip(X.columns, model.feature_importances_.round(4)))
report["loss_model"] = {
    "mae": round(mae, 2),
    "r2": round(r2, 4),
    "feature_importances": importances
}
print(f"  ✓ MAE: ₹{mae:.2f}  |  R²: {r2:.4f}")

# ── Model 3: Fraud Detection ──────────────────────────────────────────────────
print("\n[3/5] Training Fraud Detection Model (Ensemble)...")
df = pd.read_csv("datasets/fraud_dataset.csv")
X = df.drop("is_fraud", axis=1)
y = df["is_fraud"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

scaler = StandardScaler()
X_train_s = scaler.fit_transform(X_train)
X_test_s = scaler.transform(X_test)

rf = RandomForestClassifier(n_estimators=200, max_depth=10, random_state=42, n_jobs=-1, class_weight="balanced")
rf.fit(X_train_s, y_train)

iso = IsolationForest(n_estimators=200, contamination=0.06, random_state=42, n_jobs=-1)
iso.fit(X_train_s)

rf_proba = rf.predict_proba(X_test_s)[:, 1]
iso_scores = -iso.score_samples(X_test_s)
iso_norm = (iso_scores - iso_scores.min()) / (iso_scores.max() - iso_scores.min())
ensemble_score = 0.7 * rf_proba + 0.3 * iso_norm

auc_rf = roc_auc_score(y_test, rf_proba)
auc_ens = roc_auc_score(y_test, ensemble_score)

joblib.dump(rf, "models/fraud_rf_model.pkl")
joblib.dump(iso, "models/fraud_iso_model.pkl")
joblib.dump(scaler, "models/fraud_scaler.pkl")

importances = dict(zip(X.columns, rf.feature_importances_.round(4)))
report["fraud_model"] = {
    "rf_auc": round(auc_rf, 4),
    "ensemble_auc": round(auc_ens, 4),
    "fraud_rate": round(y.mean() * 100, 1),
    "feature_importances": importances
}
print(f"  ✓ RF AUC: {auc_rf:.4f}  |  Ensemble AUC: {auc_ens:.4f}")



# ── Model 5: Zone Risk Classification ────────────────────────────────────────
print("\n[5/5] Training Zone Risk Classifier...")
np.random.seed(42)
n_zone = 5000
zone_features = pd.DataFrame({
    "flood_history_5yr": np.random.randint(0, 10, n_zone),
    "drainage_quality": np.random.uniform(0, 1, n_zone),
    "monsoon_avg_mm": np.random.normal(800, 300, n_zone),
    "elevation_score": np.random.uniform(0, 1, n_zone),
    "curfew_history": np.random.randint(0, 5, n_zone),
    "road_quality": np.random.uniform(0, 1, n_zone)
})
zone_risk = np.where(
    (zone_features.flood_history_5yr > 5) | (zone_features.drainage_quality < 0.3), "HIGH",
    np.where(
        (zone_features.flood_history_5yr > 2) | (zone_features.drainage_quality < 0.6), "MEDIUM", "LOW"
    )
)
le_zone = LabelEncoder()
y_zone = le_zone.fit_transform(zone_risk)
X_zt, X_zv, y_zt, y_zv = train_test_split(zone_features, y_zone, test_size=0.2, random_state=42)
zone_model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
zone_model.fit(X_zt, y_zt)
zone_acc = accuracy_score(y_zv, zone_model.predict(X_zv))
joblib.dump(zone_model, "models/zone_model.pkl")
joblib.dump(le_zone, "models/zone_label_encoder.pkl")
report["zone_model"] = {"accuracy": round(zone_acc * 100, 2)}
print(f"  ✓ Zone Accuracy: {zone_acc*100:.2f}%")

# ── Model 6: Dynamic Pricing ───────────────────────────────────────────────────
print("\n[6/6] Training Dynamic Pricing Model...")
np.random.seed(42)

# Generate synthetic dynamic pricing data
n_samples = 10000
pricing_data = []

for _ in range(n_samples):
    # Base features
    base_premium = np.random.choice([50, 80, 120])  # Basic, Premium, Enterprise
    zone_lat = 19.0760 + np.random.normal(0, 0.01)  # Mumbai area
    zone_lng = 72.8777 + np.random.normal(0, 0.01)
    experience_months = np.random.randint(1, 60)
    vehicle_type = np.random.choice(['bike', 'scooter', 'car', 'van'])
    historical_safety = np.random.beta(2, 1)  # Skewed towards higher safety
    weather_risk = np.random.beta(1.5, 3)  # Skewed towards lower risk
    traffic_index = np.random.beta(2, 2)
    time_of_day = np.random.randint(0, 24)
    day_of_week = np.random.randint(0, 7)

    # Calculate dynamic premium (target)
    zone_safety_discount = 2 if historical_safety > 0.8 else 0
    experience_multiplier = max(0.7, 1 - (experience_months * 0.01))
    vehicle_risk = {"bike": 1.2, "scooter": 1.1, "car": 1.0, "van": 0.9}[vehicle_type]
    time_risk = 1.0
    if 7 <= time_of_day <= 10 or 17 <= time_of_day <= 20:
        time_risk = 1.3
    if day_of_week >= 5:
        time_risk *= 1.1

    risk_multiplier = weather_risk * 0.4 + traffic_index * 0.3 + (1 - historical_safety) * 0.3
    risk_multiplier *= experience_multiplier * vehicle_risk * time_risk
    dynamic_premium = base_premium * risk_multiplier - zone_safety_discount
    dynamic_premium = max(20, dynamic_premium)  # Minimum premium

    pricing_data.append({
        'base_premium': base_premium,
        'zone_lat': zone_lat,
        'zone_lng': zone_lng,
        'experience_months': experience_months,
        'vehicle_type': vehicle_type,
        'historical_safety_score': historical_safety,
        'current_weather_risk': weather_risk,
        'traffic_congestion_index': traffic_index,
        'time_of_day': time_of_day,
        'day_of_week': day_of_week,
        'dynamic_premium': dynamic_premium
    })

df_pricing = pd.DataFrame(pricing_data)

# Encode vehicle type
from sklearn.preprocessing import LabelEncoder
le_vehicle = LabelEncoder()
df_pricing['vehicle_encoded'] = le_vehicle.fit_transform(df_pricing['vehicle_type'])

X_pricing = df_pricing[['base_premium', 'zone_lat', 'zone_lng', 'experience_months', 'vehicle_encoded',
                       'historical_safety_score', 'current_weather_risk', 'traffic_congestion_index',
                       'time_of_day', 'day_of_week']]
y_pricing = df_pricing['dynamic_premium']

X_train_p, X_test_p, y_train_p, y_test_p = train_test_split(X_pricing, y_pricing, test_size=0.2, random_state=42)

pricing_model = GradientBoostingRegressor(n_estimators=200, max_depth=6, learning_rate=0.1, random_state=42)
pricing_model.fit(X_train_p, y_train_p)

pricing_pred = pricing_model.predict(X_test_p)
pricing_mae = mean_absolute_error(y_test_p, pricing_pred)
pricing_r2 = r2_score(y_test_p, pricing_pred)

joblib.dump(pricing_model, "models/dynamic_pricing_model.pkl")
joblib.dump(le_vehicle, "models/vehicle_type_encoder.pkl")

report["dynamic_pricing_model"] = {
    "mae": round(pricing_mae, 2),
    "r2": round(pricing_r2, 4),
    "feature_importances": dict(zip(X_pricing.columns, pricing_model.feature_importances_.round(4)))
}
print(f"  ✓ Dynamic Pricing MAE: ₹{pricing_mae:.2f}  |  R²: {pricing_r2:.4f}")

# ── Save Training Report ──────────────────────────────────────────────────────
with open("models/training_report.json", "w") as f:
    json.dump(report, f, indent=2)

print("\n" + "=" * 60)
print("  Training Complete! Summary:")
print("=" * 60)
print(f"  Risk Model     → {report['risk_model']['accuracy']}% accuracy")
print(f"  Loss Model     → R²={report['loss_model']['r2']}, MAE=₹{report['loss_model']['mae']}")
print(f"  Fraud Model    → AUC={report['fraud_model']['rf_auc']}")

print(f"  Zone Model     → {report['zone_model']['accuracy']}% accuracy")
print("\n  Models saved to models/ directory")
print("  Training report: models/training_report.json")
