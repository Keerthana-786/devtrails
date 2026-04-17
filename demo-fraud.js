/**
 * demo-fraud.js — Demonstrate the enhanced fraud prevention layer
 *
 * Shows the 6-layer fraud scoring system with payout-to-premium ratio
 * and fraud_risk score (0-1) output.
 */

const { runFraudCheck } = require('./backend/services/fraudService');

// Sample claim data
const sampleClaim = {
  id: 'CLM_001',
  triggerType: 'HEAVY_RAIN',
  payoutAmount: 480,
  pincode: '400058',
  createdAt: new Date().toISOString()
};

// Sample worker data
const sampleWorker = {
  id: 'worker_123',
  pincode: '400058',
  lastKnownPincode: '400058',
  weeklyPremium: 25, // ₹25/week = ₹100/month
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days old
  rating: 4.2,
  platform: 'swiggy',
  vehicle: 'bike'
};

// Sample claims history
const sampleClaimsHistory = [
  { id: 'CLM_OLD', triggerType: 'HEAVY_RAIN', createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() }
];

async function demoFraudCheck() {
  console.log('🛡️ PayNest Fraud Prevention Layer Demo');
  console.log('======================================\n');

  console.log('Sample Claim:', JSON.stringify(sampleClaim, null, 2));
  console.log('\nSample Worker:', JSON.stringify(sampleWorker, null, 2));
  console.log('\nRunning 6-layer fraud check...\n');

  try {
    const result = await runFraudCheck(sampleClaim, sampleWorker, sampleClaimsHistory);

    console.log('🎯 FRAUD CHECK RESULT:');
    console.log('====================');
    console.log(`Score: ${result.score}/100`);
    console.log(`Fraud Risk: ${(result.fraudRisk * 100).toFixed(1)}% (0-1 scale: ${result.fraudRisk.toFixed(3)})`);
    console.log(`Status: ${result.status}`);
    console.log(`Action: ${result.action}`);
    console.log(`Flags: ${result.flags.join(', ') || 'None'}`);

    console.log('\n📋 LAYER BREAKDOWN:');
    console.log('==================');
    result.layers.forEach(layer => {
      const statusEmoji = layer.status === 'PASS' ? '✅' : layer.status === 'WARN' ? '⚠️' : '❌';
      console.log(`${statusEmoji} ${layer.layer}: ${layer.status} (${layer.score} pts)`);
      console.log(`   ${layer.detail}`);
    });

  } catch (error) {
    console.error('❌ Fraud check failed:', error.message);
  }
}

// Run the demo
demoFraudCheck();

/*
6-LAYER FRAUD PREVENTION SYSTEM:
================================

Layer 1: GPS Geo-fence Match (35 pts max)
- Compares claim pincode vs worker's registered + last known location
- Fails if mismatch detected

Layer 2: Claim Velocity (25 pts max)
- Checks claims in last 7 days
- Warns at 3+ claims, fails at 5+ claims

Layer 3: Duplicate Event Detection (40 pts max)
- Prevents same trigger type on same date
- Hard fail for exact duplicates

Layer 4: Account Age Check (20 pts max)
- New accounts (<14 days) flagged as high risk
- Recent accounts (<7 days) auto-fail

Layer 5: Payout-to-Premium Ratio (30 pts max)
- NEW: Compares payout amount vs monthly premium
- Warns at 3x ratio, fails at 5x ratio
- Prevents gaming the system

Layer 6: ML Anomaly Fingerprint (±15 pts)
- AI model analyzes behavioral patterns
- Can add/subtract points based on anomaly score

DECISION THRESHOLDS:
===================
0-30 pts:  AUTO_APPROVED (fraud_risk: 0.0-0.3)
31-60 pts: MANUAL_REVIEW (fraud_risk: 0.31-0.6)
61-100 pts: AUTO_REJECTED (fraud_risk: 0.61-1.0)

OUTPUT: fraud_risk (0-1 scale)
- 0.0 = Clean claim
- 1.0 = Maximum fraud risk
- Used for compliance reporting and model training
*/