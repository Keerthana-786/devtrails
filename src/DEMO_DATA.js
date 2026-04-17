/**
 * DEMO DATA — Only used when config.IS_DEMO = true
 * Never mix with real data or APIs
 */

import config from './config.js';

export const DEMO_WORKER_DATA = {
  ...config.DEMO_WORKER,
  id: 'demo_worker_001',
  trustScore: 78,
  monthsActive: 6,
  createdAt: new Date().toISOString(),
  features: ['income_protection', 'smart_routing'],
  totalProtected: 1920,
  claimsCount: 4,
  lastClaimDate: '2026-04-08T14:30:00Z'
};

export const DEMO_CLAIMS_ARRAY = config.DEMO_CLAIMS;

export const DEMO_POLICY_RESPONSE = {
  policy_id: 'demo_policy_001',
  status: 'active',
  valid_from: new Date().toISOString(),
  valid_to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  weekly_premium: config.DEMO_WORKER.weekly_premium,
  coverage_per_day: config.DEMO_WORKER.coverage_per_day
};

export const DEMO_DASHBOARD_DATA = {
  user: DEMO_WORKER_DATA,
  payouts: DEMO_CLAIMS_ARRAY,
  wallet_balance: 150.00,
  weekly_premium: config.DEMO_WORKER.weekly_premium,
  policy_status: 'ACTIVE',
  stability_score: 85,
  ai_alerts: [
    'Weather conditions optimal for next 4 hours',
    'No disruptions detected in your zone',
    'Earnings projection: ₹450-550 today'
  ],
  active_disruptions: [],
  high_risk_hours: ['17:00', '18:00', '19:00'],
  safe_zones: ['Residential areas', 'Office complexes', 'Shopping malls'],
  expected_loss_probability: 15,
  power_meter: {
    score: 78,
    label: 'Strong',
    color: '#10B981'
  }
};

// Simulate demo claim journey
export const simulateDemoClaim = async (triggerType) => {
  const claimId = `CLM-2026-${Math.floor(Math.random() * 9000) + 1000}`;
  const transactionId = `pay_Demo_${Math.random().toString(36).substr(2, 9)}`;
  const upiRef = `YBL${Math.floor(Math.random() * 900000000) + 100000000}`;

  let amount = 0;
  let description = '';

  switch (triggerType) {
    case 'HEAVY_RAIN':
      amount = 480;
      description = 'Heavy Rain 42mm/hr — Anna Nagar, Chennai';
      break;
    case 'EXTREME_HEAT':
      amount = 350;
      description = 'Extreme Heat 44.2°C — T. Nagar, Chennai';
      break;
    case 'SEVERE_AQI':
      amount = 300;
      description = 'Severe AQI 387 — Adyar, Chennai';
      break;
    case 'CURFEW':
      amount = 500;
      description = 'Curfew/Strike — 85% order volume drop';
      break;
    case 'FRAUD_DEMO':
      amount = 0;
      description = 'GPS Spoof Attempt Detected';
      break;
    default:
      amount = 400;
      description = 'Parametric Trigger Activated';
  }

  return {
    claimId,
    amount,
    triggerType,
    description,
    transactionId,
    upiRef,
    status: amount > 0 ? 'SETTLED' : 'REJECTED',
    timestamp: new Date().toISOString()
  };
};