/**
 * triggerService.js — Automated Parametric Trigger Engine
 *
 * Architecture:
 *  1. Poll OpenWeatherMap (weather) and IQAir/WAQI (AQI) for each active pincode.
 *  2. Compare readings against pre-set parametric thresholds.
 *  3. When threshold breached → query Supabase for all active policy holders in that pincode.
 *  4. Create auto-claim records → queue Razorpay payouts → log the event.
 *
 * Environment variables required:
 *   OPENWEATHER_API_KEY   — OpenWeatherMap API key
 *   WAQI_API_KEY          — World Air Quality Index token
 *   SUPABASE_URL          — Supabase project URL
 *   SUPABASE_SERVICE_KEY  — Supabase service-role secret (bypasses RLS)
 *   RAZORPAY_KEY_ID       — Razorpay key for X-Auth-Email
 *   RAZORPAY_KEY_SECRET   — Razorpay secret
 */

const axios = require('axios');
// Uncomment when Supabase client is installed:
// const { createClient } = require('@supabase/supabase-js');

// ──────────────────────────────────────────────────────────────────────────────
// CONFIG
// ──────────────────────────────────────────────────────────────────────────────

const OWM_KEY   = process.env.OPENWEATHER_API_KEY || 'DEMO_KEY';
const WAQI_KEY  = process.env.WAQI_API_KEY        || 'DEMO_TOKEN';
const SB_URL    = process.env.SUPABASE_URL;
const SB_KEY    = process.env.SUPABASE_SERVICE_KEY;

// const supabase = SB_URL && SB_KEY ? createClient(SB_URL, SB_KEY) : null;

/**
 * Parametric thresholds — all values must be met for a trigger to fire.
 * Each object maps to ONE payout type. Multiple can fire simultaneously.
 */
const THRESHOLDS = {
  HEAVY_RAIN:   { metric: 'rain_1h_mm',  operator: '>',  value: 35,  payout: 480, description: 'Rainfall > 35mm/hr'   },
  EXTREME_HEAT: { metric: 'temp_celsius', operator: '>',  value: 43,  payout: 320, description: 'Temperature > 43°C'   },
  SEVERE_AQI:   { metric: 'aqi',          operator: '>',  value: 300, payout: 200, description: 'AQI > 300 (Hazardous)' },
  CYCLONE_WIND: { metric: 'wind_kmh',     operator: '>',  value: 89,  payout: 640, description: 'Wind > 89km/h (Cat-1)' },
  COLD_WAVE:    { metric: 'temp_celsius', operator: '<',  value: 5,   payout: 180, description: 'Temperature < 5°C'    },
};

/**
 * Active monitoring zones — in production this is fetched from:
 * SELECT DISTINCT pincode FROM workers WHERE policy_active = true
 */
const ACTIVE_PINCODES = [
  { pincode: '400058', city: 'Mumbai',    lat: 19.0760,  lon: 72.8777 },
  { pincode: '110001', city: 'Delhi',     lat: 28.6139,  lon: 77.2090 },
  { pincode: '560001', city: 'Bengaluru', lat: 12.9716,  lon: 77.5946 },
  { pincode: '600040', city: 'Chennai',   lat: 13.0827,  lon: 80.2707 },
  { pincode: '700001', city: 'Kolkata',   lat: 22.5726,  lon: 88.3639 },
  { pincode: '411001', city: 'Pune',      lat: 18.5204,  lon: 73.8567 },
];

// ──────────────────────────────────────────────────────────────────────────────
// DAILY PAYOUT TRACKING — Prevent multiple payouts per day per trigger type
// ──────────────────────────────────────────────────────────────────────────────

let dailyPayoutTracker = {}; // { workerId: { triggerType: lastPayoutDate } }

function getTodayDateString() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
}

function hasReceivedPayoutToday(workerId, triggerType) {
  const today = getTodayDateString();
  const workerPayouts = dailyPayoutTracker[workerId] || {};
  return workerPayouts[triggerType] === today;
}

function recordPayoutToday(workerId, triggerType) {
  const today = getTodayDateString();
  if (!dailyPayoutTracker[workerId]) {
    dailyPayoutTracker[workerId] = {};
  }
  dailyPayoutTracker[workerId][triggerType] = today;
}

// Clean up old entries (keep only last 7 days)
function cleanupOldPayoutRecords() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const cutoffDate = sevenDaysAgo.toISOString().split('T')[0];

  for (const workerId in dailyPayoutTracker) {
    const workerPayouts = dailyPayoutTracker[workerId];
    for (const triggerType in workerPayouts) {
      if (workerPayouts[triggerType] < cutoffDate) {
        delete workerPayouts[triggerType];
      }
    }
    if (Object.keys(workerPayouts).length === 0) {
      delete dailyPayoutTracker[workerId];
    }
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// WEATHER FETCHER
// ──────────────────────────────────────────────────────────────────────────────

async function fetchWeather(lat, lon) {
  if (OWM_KEY === 'DEMO_KEY') {
    // Deterministic mock so log output is reproducible during demos
    return {
      temp_celsius:  35 + Math.sin(Date.now() / 100000) * 10,
      rain_1h_mm:    Math.random() < 0.15 ? 38 + Math.random() * 20 : Math.random() * 30,
      wind_kmh:      20 + Math.random() * 40,
      humidity_pct:  60 + Math.random() * 30,
      description:   'partly cloudy',
      source:        'MOCK',
    };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OWM_KEY}&units=metric`;
  const { data } = await axios.get(url, { timeout: 8000 });

  return {
    temp_celsius: data.main.temp,
    rain_1h_mm:   data.rain?.['1h'] ?? 0,
    wind_kmh:     (data.wind?.speed ?? 0) * 3.6, // m/s → km/h
    humidity_pct: data.main.humidity,
    description:  data.weather?.[0]?.description ?? '',
    source:       'OPENWEATHERMAP',
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// AQI FETCHER  (World Air Quality Index — free token available at aqicn.org)
// ──────────────────────────────────────────────────────────────────────────────

async function fetchAQI(lat, lon) {
  if (WAQI_KEY === 'DEMO_TOKEN') {
    return {
      aqi:    Math.floor(80 + Math.random() * 250),
      source: 'MOCK',
    };
  }

  const url = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=${WAQI_KEY}`;
  const { data } = await axios.get(url, { timeout: 8000 });

  if (data.status !== 'ok') throw new Error(`WAQI error: ${data.data}`);
  return {
    aqi:    data.data.aqi,
    source: 'WAQI',
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// SUPABASE HELPERS
// ──────────────────────────────────────────────────────────────────────────────

async function getActivePoliciesForPincode(pincode) {
  // REAL implementation:
  // const { data, error } = await supabase
  //   .from('workers')
  //   .select('id, name, upi_id, policy_tier')
  //   .eq('pincode', pincode)
  //   .eq('policy_active', true);
  // if (error) throw error;
  // return data;

  // Mock — returns synthetic policy holders
  const count = Math.floor(800 + Math.random() * 600);
  return Array.from({ length: count }, (_, i) => ({
    id: `worker_${pincode}_${i}`,
    name: `Worker ${i + 1}`,
    upi_id: `worker${i + 1}@upi`,
    policy_tier: ['BASIC', 'STANDARD', 'PREMIUM'][i % 3],
  }));
}

async function createClaimRecord(workerId, triggerType, payoutAmount, zoneData) {
  // REAL implementation:
  // const { data, error } = await supabase
  //   .from('claims')
  //   .insert({
  //     worker_id:      workerId,
  //     trigger_type:   triggerType,
  //     payout_amount:  payoutAmount,
  //     status:         'auto_approved',
  //     pincode:        zoneData.pincode,
  //     weather_data:   JSON.stringify(zoneData.reading),
  //     created_at:     new Date().toISOString(),
  //   })
  //   .select()
  //   .single();
  // return data;

  return { id: `CLM_${Date.now()}_${workerId}`, status: 'auto_approved' };
}

async function expireStalePolicies() {
  // REAL implementation:
  // const { error } = await supabase
  //   .from('workers')
  //   .update({ policy_active: false })
  //   .lt('policy_valid_until', new Date().toISOString());
  // if (error) throw error;
  console.log('[SUPABASE] Stale policy expiration query executed.');
}

// ──────────────────────────────────────────────────────────────────────────────
// PAYOUT QUEUE
// ──────────────────────────────────────────────────────────────────────────────

async function queuePayouts(affectedWorkers, triggerType, payoutAmount, zoneInfo) {
  // Filter out workers who have already received this trigger type payout today
  const eligibleWorkers = affectedWorkers.filter(worker =>
    !hasReceivedPayoutToday(worker.id, triggerType)
  );

  const skippedCount = affectedWorkers.length - eligibleWorkers.length;

  console.log(`[PAYOUT_QUEUE] Queuing ${eligibleWorkers.length} payouts of ₹${payoutAmount} for ${triggerType} in ${zoneInfo.city} (${skippedCount} skipped - already paid today)`);

  let successCount = 0;
  let failCount    = 0;

  for (const worker of eligibleWorkers) {
    try {
      await createClaimRecord(worker.id, triggerType, payoutAmount, zoneInfo);

      // Record that this worker received this payout type today
      recordPayoutToday(worker.id, triggerType);

      // REAL: call Razorpay Payout API here
      // const payout = await razorpay.payouts.create({ ... fund_account_id: worker.fund_account_id ... });

      successCount++;
    } catch (err) {
      failCount++;
      console.error(`[PAYOUT_QUEUE] Failed for worker ${worker.id}: ${err.message}`);
    }
  }

  console.log(`[PAYOUT_QUEUE] ✅ ${successCount} paid | ❌ ${failCount} failed | ⏭️ ${skippedCount} skipped | Zone: ${zoneInfo.city}`);
  return { successCount, failCount, skippedCount };
}

// ──────────────────────────────────────────────────────────────────────────────
// THRESHOLD EVALUATOR
// ──────────────────────────────────────────────────────────────────────────────

function evaluateThresholds(reading) {
  const fired = [];

  for (const [name, rule] of Object.entries(THRESHOLDS)) {
    const actual = reading[rule.metric];
    if (actual === undefined) continue;

    const breached =
      rule.operator === '>' ? actual > rule.value :
      rule.operator === '<' ? actual < rule.value :
      false;

    if (breached) {
      fired.push({ name, rule, actual });
    }
  }

  return fired;
}

// ──────────────────────────────────────────────────────────────────────────────
// POLLING SERVICE — Lightweight cron replacement for demo
// ──────────────────────────────────────────────────────────────────────────────

let pollingInterval = null;

exports.startPolling = (intervalMinutes = 15) => {
  if (pollingInterval) {
    console.log('[TRIGGER_POLLING] Polling already running');
    return;
  }

  const intervalMs = intervalMinutes * 60 * 1000;
  console.log(`[TRIGGER_POLLING] Starting ${intervalMinutes}-minute polling cycle`);

  // Run immediately on start
  this.checkTriggers();

  // Then poll every interval
  pollingInterval = setInterval(async () => {
    try {
      await this.checkTriggers();
    } catch (err) {
      console.error('[TRIGGER_POLLING] Error in polling cycle:', err.message);
    }
  }, intervalMs);
};

exports.stopPolling = () => {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
    console.log('[TRIGGER_POLLING] Polling stopped');
  }
};

// ──────────────────────────────────────────────────────────────────────────────
// MAIN EXPORTED FUNCTION — called by cron.js or polling
// ──────────────────────────────────────────────────────────────────────────────

exports.checkTriggers = async () => {
  console.log('\n[TRIGGER_ENGINE] ─── Starting parametric scan ───────────────');
  const timestamp = new Date().toISOString();
  let totalTriggered = 0;
  let totalPoliciesAffected = 0;

  for (const zone of ACTIVE_PINCODES) {
    try {
      // 1. Fetch sensor data in parallel
      const [weather, aqiData] = await Promise.all([
        fetchWeather(zone.lat, zone.lon),
        fetchAQI(zone.lat, zone.lon),
      ]);

      const fullReading = { ...weather, aqi: aqiData.aqi };

      console.log(
        `[${zone.city}] Rain:${fullReading.rain_1h_mm?.toFixed(1)}mm ` +
        `Temp:${fullReading.temp_celsius?.toFixed(1)}°C ` +
        `Wind:${fullReading.wind_kmh?.toFixed(0)}km/h ` +
        `AQI:${fullReading.aqi} ` +
        `[src: ${weather.source}/${aqiData.source}]`
      );

      // 2. Check thresholds
      const triggered = evaluateThresholds(fullReading);

      if (triggered.length === 0) {
        console.log(`[${zone.city}] ✅ All Clear — no parametric breaches`);
        continue;
      }

      // 3. For each breached threshold → process payouts
      for (const event of triggered) {
        console.log(
          `[${zone.city}] 🚨 BREACH: ${event.name} — ` +
          `${event.rule.metric} = ${event.actual} (threshold: ${event.rule.operator}${event.rule.value}) | ` +
          `Payout: ₹${event.rule.payout}`
        );

        const affectedWorkers = await getActivePoliciesForPincode(zone.pincode);

        if (affectedWorkers.length > 0) {
          const result = await queuePayouts(
            affectedWorkers,
            event.name,
            event.rule.payout,
            { ...zone, reading: fullReading }
          );

          totalTriggered++;
          totalPoliciesAffected += result.successCount;

          const totalDisbursed = result.successCount * event.rule.payout;
          console.log(
            `[${zone.city}] 💰 Auto-disbursed ₹${totalDisbursed.toLocaleString('en-IN')} ` +
            `to ${result.successCount} workers`
          );
        }
      }

    } catch (err) {
      console.error(`[TRIGGER_ENGINE] ❌ Error processing ${zone.city}: ${err.message}`);
    }
  }

  console.log(
    `[TRIGGER_ENGINE] ─── Scan complete @ ${timestamp} ` +
    `| Triggers: ${totalTriggered} ` +
    `| Policies affected: ${totalPoliciesAffected} ───\n`
  );

  return { totalTriggered, totalPoliciesAffected };
};

// Policy lifecycle management (called by daily cron)
exports.expirePolicies = expireStalePolicies;

// Daily cleanup of old payout tracking records
exports.cleanupOldPayoutRecords = cleanupOldPayoutRecords;

// Reset daily payout tracker (for testing)
exports.resetDailyPayoutTracker = () => {
  dailyPayoutTracker = {};
  console.log('[TRIGGER_SERVICE] Daily payout tracker reset');
};

// Export threshold config for the admin UI
exports.THRESHOLDS = THRESHOLDS;
exports.ACTIVE_PINCODES = ACTIVE_PINCODES;
