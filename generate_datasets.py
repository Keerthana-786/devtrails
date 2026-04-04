"""
generate_datasets.py — Synthetic dataset generator for PayNest ML models
Generates 28,000 rows across 4 datasets with realistic Indian city distributions
"""

import numpy as np
import pandas as pd
from pathlib import Path

np.random.seed(42)
Path("datasets").mkdir(exist_ok=True)

CITIES = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Ahmedabad"]
ZONES = ["Andheri West", "Kurla", "Bandra West", "Dadar", "Thane", "Malad", "Borivali", "Mulund",
         "Connaught Place", "Lajpat Nagar", "Rohini", "Dwarka", "Noida", "Gurgaon"]

# ── Dataset 1: Risk Prediction (8,000 rows, 9 features) ──────────────────────
print("Generating risk_dataset.csv...")
n = 8000
rainfall = np.random.exponential(15, n)
rainfall = np.clip(rainfall, 0, 150)
aqi = np.random.lognormal(4.5, 0.8, n)
aqi = np.clip(aqi, 30, 500)
traffic_disruption = np.random.beta(2, 5, n)
temperature = np.random.normal(32, 8, n)
temperature = np.clip(temperature, 15, 50)
flood_history = np.random.choice([0, 1, 2, 3], n, p=[0.4, 0.3, 0.2, 0.1])
visibility = np.random.uniform(0.5, 10, n)
humidity = np.random.uniform(30, 100, n)
wind_speed = np.random.exponential(10, n)
month = np.random.randint(1, 13, n)

# Risk label based on thresholds
risk_score = (
    (rainfall > 60).astype(int) * 2 +
    (rainfall > 100).astype(int) +
    (aqi > 300).astype(int) * 2 +
    (temperature > 45).astype(int) * 2 +
    (traffic_disruption > 0.6).astype(int) +
    (flood_history >= 2).astype(int) +
    np.random.randint(0, 2, n)
)
risk_label = np.where(risk_score >= 5, "HIGH", np.where(risk_score >= 2, "MEDIUM", "LOW"))

pd.DataFrame({
    "rainfall_mm": rainfall.round(1),
    "aqi": aqi.round(0).astype(int),
    "traffic_disruption": traffic_disruption.round(3),
    "temperature_c": temperature.round(1),
    "flood_history_score": flood_history,
    "visibility_km": visibility.round(1),
    "humidity_pct": humidity.round(1),
    "wind_speed_kmh": wind_speed.round(1),
    "month": month,
    "risk_level": risk_label
}).to_csv("datasets/risk_dataset.csv", index=False)
print("  ✓ risk_dataset.csv — 8,000 rows, 9 features")

# ── Dataset 2: Income Loss (8,000 rows, 8 features) ──────────────────────────
print("Generating income_loss_dataset.csv...")
hourly_rate = np.random.normal(80, 15, n)
hourly_rate = np.clip(hourly_rate, 50, 150)
normal_hours = np.random.uniform(6, 12, n)
rain_mm = np.random.exponential(12, n)
traffic_score = np.random.beta(2, 5, n)
aqi_loss = np.random.lognormal(4.2, 0.9, n)
day_of_week = np.random.randint(0, 7, n)
peak_hour = np.random.choice([0, 1], n, p=[0.6, 0.4])
city_idx = np.random.randint(0, len(CITIES), n)

disruption_pct = np.clip(
    0.3 * (rain_mm / 80) + 0.2 * traffic_score + 0.1 * (aqi_loss / 400) + np.random.normal(0, 0.05, n),
    0, 1
)
income_lost = (hourly_rate * normal_hours * disruption_pct).round(2)

pd.DataFrame({
    "hourly_rate": hourly_rate.round(0).astype(int),
    "normal_work_hours": normal_hours.round(1),
    "rainfall_mm": rain_mm.round(1),
    "traffic_disruption": traffic_score.round(3),
    "aqi": aqi_loss.round(0).astype(int),
    "day_of_week": day_of_week,
    "is_peak_hour": peak_hour,
    "city_index": city_idx,
    "income_lost_inr": income_lost
}).to_csv("datasets/income_loss_dataset.csv", index=False)
print("  ✓ income_loss_dataset.csv — 8,000 rows, 8 features")

# ── Dataset 3: Fraud Detection (8,000 rows, 9 features, ~5.9% fraud) ─────────
print("Generating fraud_dataset.csv...")
gps_deviation = np.random.exponential(0.5, n)
location_consistency = np.random.beta(8, 2, n)
claim_freq_30d = np.random.poisson(2, n)
account_age_months = np.random.exponential(18, n)
account_age_months = np.clip(account_age_months, 0.5, 60)
multiple_claims_day = np.random.poisson(0.3, n)
orders_during_disruption = np.random.poisson(1, n)
avg_payout = np.random.normal(350, 100, n)
trust_score = np.random.beta(6, 2, n) * 100

fraud_prob = (
    0.3 * (gps_deviation > 2).astype(float) +
    0.25 * (location_consistency < 0.3).astype(float) +
    0.2 * (claim_freq_30d > 5).astype(float) +
    0.15 * (account_age_months < 1).astype(float) +
    0.1 * (multiple_claims_day > 2).astype(float)
)
is_fraud = (fraud_prob + np.random.normal(0, 0.1, n) > 0.45).astype(int)

pd.DataFrame({
    "gps_deviation_km": gps_deviation.round(3),
    "location_consistency": location_consistency.round(3),
    "claim_frequency_30d": claim_freq_30d,
    "account_age_months": account_age_months.round(1),
    "multiple_claims_per_day": multiple_claims_day,
    "orders_during_disruption": orders_during_disruption,
    "avg_payout_inr": avg_payout.round(0).astype(int),
    "trust_score": trust_score.round(1),
    "zone_risk_tier": np.random.randint(1, 4, n),
    "is_fraud": is_fraud
}).to_csv("datasets/fraud_dataset.csv", index=False)
fraud_rate = is_fraud.mean() * 100
print(f"  ✓ fraud_dataset.csv — 8,000 rows, 9 features, {fraud_rate:.1f}% fraud")

# ── Dataset 4: Loan Eligibility (4,000 rows, 7 features) ─────────────────────
print("Generating loan_dataset.csv...")
n_loan = 4000
months_active = np.random.exponential(12, n_loan)
months_active = np.clip(months_active, 0.5, 48)
trust_score_l = np.random.beta(5, 3, n_loan) * 100
avg_monthly_income = np.random.normal(12000, 4000, n_loan)
avg_monthly_income = np.clip(avg_monthly_income, 3000, 30000)
fraud_flags = np.random.poisson(0.1, n_loan)
existing_loans = np.random.choice([0, 1, 2, 3], n_loan, p=[0.5, 0.3, 0.15, 0.05])
claims_paid = np.random.poisson(3, n_loan)
zone_tier = np.random.randint(1, 4, n_loan)

eligible = (
    (months_active >= 3) &
    (trust_score_l >= 40) &
    (avg_monthly_income >= 8000) &
    (fraud_flags == 0) &
    (existing_loans < 2)
).astype(int)

max_loan = np.where(
    eligible,
    np.clip(avg_monthly_income * 0.5 * (1 + months_active / 24), 1000, 10000),
    0
).round(0).astype(int)

pd.DataFrame({
    "months_active": months_active.round(1),
    "trust_score": trust_score_l.round(1),
    "avg_monthly_income": avg_monthly_income.round(0).astype(int),
    "fraud_flags": fraud_flags,
    "existing_loans": existing_loans,
    "claims_paid": claims_paid,
    "zone_tier": zone_tier,
    "is_eligible": eligible,
    "max_loan_amount": max_loan
}).to_csv("datasets/loan_dataset.csv", index=False)
eligibility_rate = eligible.mean() * 100
print(f"  ✓ loan_dataset.csv — 4,000 rows, 7 features, {eligibility_rate:.1f}% eligible")

print("\n✅ All datasets generated successfully!")
print(f"   Total rows: {8000+8000+8000+4000:,}")
