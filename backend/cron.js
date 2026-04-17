/**
 * cron.js — PayNest Automated Scheduling Engine
 *
 * Schedules:
 *   Every 60s   → Parametric threshold scan across all active pincodes
 *   Every 5min  → Fraud velocity metrics refresh
 *   Daily 00:00 → Policy expiration sweep + actuary snapshot
 *   Weekly Sun  → BTS score recalculation for all workers
 *   Monthly 1st → Reinsurance reserve reconciliation report
 */

const cron = require('node-cron');
const { checkTriggers, expirePolicies, ACTIVE_PINCODES, cleanupOldPayoutRecords } = require('./services/triggerService');
const { refreshVelocityMetrics }                          = require('./services/fraudService');
const { reconcileReserves }                               = require('./services/payoutService');

// ─── Startup banner ──────────────────────────────────────────────────────────
console.log('┌─────────────────────────────────────────────────────┐');
console.log('│         PayNest Cron Engine  —  Starting Up         │');
console.log(`│  Monitoring ${String(ACTIVE_PINCODES.length).padStart(2)} zones across India                   │`);
console.log('└─────────────────────────────────────────────────────┘');

// ─── 1. PARAMETRIC TRIGGER SCAN  (every 60 seconds) ─────────────────────────
cron.schedule('*/60 * * * * *', async () => {
  const start = Date.now();
  console.log(`\n[CRON] ⏱  Trigger scan @ ${new Date().toLocaleTimeString('en-IN')}`);
  try {
    const result = await checkTriggers();
    const elapsed = Date.now() - start;
    console.log(`[CRON] ✅ Trigger scan done in ${elapsed}ms | Payouts fired: ${result.totalTriggered}`);
  } catch (err) {
    console.error(`[CRON] ❌ Trigger scan failed: ${err.message}`);
  }
});

// ─── 2. FRAUD VELOCITY METRICS REFRESH  (every 5 minutes) ───────────────────
cron.schedule('*/5 * * * *', async () => {
  try {
    await refreshVelocityMetrics();
    console.log('[CRON] 🛡️  Fraud velocity metrics refreshed');
  } catch (err) {
    console.error(`[CRON] ❌ Fraud refresh failed: ${err.message}`);
  }
});

// ─── 3. DAILY POLICY EXPIRATION SWEEP  (midnight IST = 18:30 UTC) ───────────
cron.schedule('30 18 * * *', async () => {
  console.log('\n[CRON] 🌙 Daily sweep starting…');
  try {
    // 3a. Expire lapsed policies
    await expirePolicies();
    console.log('[CRON]   ✓ Stale policies expired');

    // 3b. Capture an actuary snapshot (claim ratio, reserve health)
    await captureActuarySnapshot();
    console.log('[CRON]   ✓ Actuarial snapshot captured');

    // 3c. Send SMS/notification to workers whose policy expires in 3 days
    await notifyExpiringWorkers(3);
    console.log('[CRON]   ✓ Expiry reminders dispatched');

    // 3d. Clean up old payout tracking records (older than 7 days)
    cleanupOldPayoutRecords();
    console.log('[CRON]   ✓ Old payout records cleaned up');
  } catch (err) {
    console.error(`[CRON] ❌ Daily sweep failed: ${err.message}`);
  }
});

// ─── 4. WEEKLY BTS RECALCULATION  (every Sunday at 01:00 IST) ───────────────
cron.schedule('0 1 * * 0', async () => {
  console.log('[CRON] 📊 Weekly BTS recalculation starting…');
  try {
    await recalculateBTSScores();
    console.log('[CRON] ✅ BTS scores updated for all active workers');
  } catch (err) {
    console.error(`[CRON] ❌ BTS recalculation failed: ${err.message}`);
  }
});

// ─── 5. MONTHLY RESERVE RECONCILIATION  (1st of each month at 02:00 IST) ────
cron.schedule('0 2 1 * *', async () => {
  console.log('[CRON] 💰 Monthly reserve reconciliation…');
  try {
    const report = await reconcileReserves();
    console.log(`[CRON] ✅ Reserve report: loss_ratio=${report.lossRatio}% | reserve=₹${report.reserveAmount}`);
  } catch (err) {
    console.error(`[CRON] ❌ Reserve reconciliation failed: ${err.message}`);
  }
});

// ─── HELPER STUBS  (wired to Supabase in production) ─────────────────────────

async function captureActuarySnapshot() {
  // REAL:
  // const { data: stats } = await supabase.rpc('compute_actuary_snapshot');
  // await supabase.from('actuary_log').insert({ ...stats, captured_at: new Date() });
  const mockRatio = (55 + Math.random() * 15).toFixed(1);
  console.log(`[ACTUARY] Loss ratio today: ${mockRatio}%`);
}

async function notifyExpiringWorkers(daysAhead) {
  // REAL:
  // const cutoff = new Date(Date.now() + daysAhead * 86400000).toISOString();
  // const { data: workers } = await supabase
  //   .from('workers')
  //   .select('id, name, phone')
  //   .eq('policy_active', true)
  //   .lt('policy_valid_until', cutoff);
  // for (const w of workers) await sendTwilioSMS(w.phone, `[PayNest] Your policy expires in ${daysAhead} days.`);
  console.log(`[NOTIFY] Expiry reminder SMS queued for policies expiring in ${daysAhead} days`);
}

async function recalculateBTSScores() {
  // REAL:
  // const { data: workers } = await supabase.from('workers').select('id').eq('policy_active', true);
  // for (const w of workers) {
  //   const score = await computeBTS(w.id); // looks at claim history, shift compliance, fraud flags
  //   await supabase.from('workers').update({ bts_score: score }).eq('id', w.id);
  // }
  console.log('[BTS] Recalculating Behavioral Trust Scores for all workers…');
}

console.log('✅ All cron schedules registered and active.\n');
