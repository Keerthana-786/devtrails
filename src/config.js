const config = {
  get IS_DEMO() {
    return sessionStorage.getItem('paynest_mode') === 'demo';
  },
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  
  TRIGGERS: {
    HEAVY_RAIN:   { threshold: 35, unit: 'mm/hr',  payout_rate: 0.60 },
    EXTREME_HEAT: { threshold: 43, unit: '°C',     payout_rate: 0.45 },
    SEVERE_AQI:   { threshold: 350, unit: 'AQI',   payout_rate: 0.40 },
    STORM_ALERT:  { threshold: 900, unit: 'code',  payout_rate: 0.70 },
    CURFEW:       { threshold: 80, unit: '% drop', payout_rate: 0.65 }
  },
  
  PLANS: {
    basic:    { weekly_premium: 29, coverage_per_day: 300, max_claims: 3 },
    standard: { weekly_premium: 49, coverage_per_day: 500, max_claims: 5 },
    pro:      { weekly_premium: 79, coverage_per_day: 800, max_claims: 999 }
  },

  DEMO_WORKER: {
    name: "Raju Kumar",
    phone: "9876543210",
    platform: "Swiggy",
    pincode: "600040",
    city: "Chennai",
    upi_id: "raju.swiggy@upi",
    tier: "standard",
    weekly_premium: 49,
    coverage_per_day: 500,
    totalProtected: 1920,
    claimsCount: 4,
    policy_valid_until: "18 Apr 2026"
  }
};

export default config;