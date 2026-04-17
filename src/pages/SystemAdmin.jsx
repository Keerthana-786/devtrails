import React, { useState, useEffect, useRef } from 'react';

// ─── Shared helpers ────────────────────────────────────────────────────────────
const TABS = ['Trigger Engine', 'Fraud Guard', 'Business Viability'];

const pill = (label, color) => ({
  display: 'inline-block',
  padding: '3px 10px',
  borderRadius: '12px',
  fontSize: '11px',
  fontWeight: '700',
  background: `${color}20`,
  color,
  letterSpacing: '0.5px',
});

// ─── Root component ────────────────────────────────────────────────────────────
export default function SystemAdmin() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div style={{ padding: '32px', fontFamily: "'Outfit', sans-serif", color: '#fff', maxWidth: '1200px', margin: '0 auto', animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span>⚙️</span> System Operations
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '15px', margin: 0 }}>
            Admin console for parametric triggers, AI fraud detection, and actuarial business metrics.
          </p>
        </div>
        <div style={{ display: 'flex', background: 'rgba(30,41,59,0.6)', borderRadius: '12px', padding: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              style={{ padding: '8px 16px', background: activeTab === t ? 'rgba(59,130,246,0.2)' : 'transparent', color: activeTab === t ? '#60A5FA' : '#94A3B8', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
            >{t}</button>
          ))}
        </div>
      </div>

      <div style={{ background: 'rgba(15,23,42,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', minHeight: '60vh', overflow: 'hidden' }}>
        {activeTab === 'Trigger Engine'    && <TriggerEngine />}
        {activeTab === 'Fraud Guard'       && <FraudGuard />}
        {activeTab === 'Business Viability' && <BusinessViability />}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse  { 0%,100% { opacity:1; box-shadow:0 0 8px #10B981; } 50% { opacity:0.5; box-shadow:0 0 16px #10B981; } }
        @keyframes blink  { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 1 — TRIGGER ENGINE
// ─────────────────────────────────────────────────────────────────────────────

const THRESHOLDS_UI = [
  { name: 'Heavy Rain',    metric: 'Rainfall',    threshold: '> 35mm/hr',   payout: '₹480', color: '#3B82F6', icon: '🌧️' },
  { name: 'Extreme Heat',  metric: 'Temperature', threshold: '> 43°C',      payout: '₹320', color: '#EF4444', icon: '🌡️' },
  { name: 'Severe AQI',    metric: 'AQI Index',   threshold: '> 300',       payout: '₹200', color: '#8B5CF6', icon: '😷' },
  { name: 'Cyclone Wind',  metric: 'Wind Speed',  threshold: '> 89km/h',    payout: '₹640', color: '#F59E0B', icon: '🌀' },
  { name: 'Cold Wave',     metric: 'Temperature', threshold: '< 5°C',       payout: '₹180', color: '#60A5FA', icon: '🥶' },
];

const ZONES_UI = [
  { city: 'Mumbai',    pincode: '400058', lat: '19.07°N', status: 'MONITORING', rain: 12,  temp: 31, aqi: 142 },
  { city: 'Delhi',     pincode: '110001', lat: '28.61°N', status: 'MONITORING', rain: 2,   temp: 38, aqi: 287 },
  { city: 'Bengaluru', pincode: '560001', lat: '12.97°N', status: 'MONITORING', rain: 28,  temp: 26, aqi: 98  },
  { city: 'Chennai',   pincode: '600040', lat: '13.08°N', status: 'MONITORING', rain: 4,   temp: 33, aqi: 118 },
  { city: 'Kolkata',   pincode: '700001', lat: '22.57°N', status: 'MONITORING', rain: 41,  temp: 29, aqi: 201 },
  { city: 'Pune',      pincode: '411001', lat: '18.52°N', status: 'MONITORING', rain: 8,   temp: 35, aqi: 155 },
];

function LogLine({ time, msg, color }) {
  return (
    <div style={{ padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.02)', display: 'flex', gap: '16px', fontFamily: 'monospace', fontSize: '12px' }}>
      <span style={{ color: '#64748B', flexShrink: 0 }}>{time}</span>
      <span style={{ color }}>{msg}</span>
    </div>
  );
}

function TriggerEngine() {
  const [logs, setLogs] = useState([
    { id: 1, time: '14:02:41', msg: '[WeatherAPI] Kolkata Zone_700001: Rainfall 41mm/hr detected.', color: '#3B82F6' },
    { id: 2, time: '14:02:42', msg: '[Threshold] HEAVY_RAIN breached (41mm > 35mm). Policy check initiated.', color: '#F59E0B' },
    { id: 3, time: '14:02:43', msg: '[Supabase] Fetching active policies in Zone_700001... (n=1,240)', color: '#E2E8F0' },
    { id: 4, time: '14:02:44', msg: '[FraudEngine] Batch fraud validation (1,240 claims)... avg score: 8.2', color: '#94A3B8' },
    { id: 5, time: '14:02:46', msg: '[Treasury] Auto-disbursement ₹5.95M approved (1,240 × ₹480).', color: '#10B981' },
    { id: 6, time: '14:02:49', msg: '[Razorpay] 1,240 UPI transfers queued. Avg settlement: 4.2s.', color: '#10B981' },
    { id: 7, time: '14:02:51', msg: '[Twilio] 1,240 SMS notifications dispatched.', color: '#10B981' },
    { id: 8, time: '14:05:01', msg: '[WeatherAPI] Delhi Zone_110001: AQI 287 — below 300 threshold.', color: '#64748B' },
    { id: 9, time: '14:05:01', msg: '[Scan] All other zones — All Clear.', color: '#64748B' },
  ]);
  const [ticker, setTicker] = useState(55);
  const logRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => {
      setTicker(p => {
        if (p <= 0) {
          const now = new Date().toLocaleTimeString('en-IN', { hour12: false });
          setLogs(prev => [
            { id: Date.now(), time: now, msg: `[Scan] All zones checked — All Clear (next scan in 60s)`, color: '#64748B' },
            ...prev
          ].slice(0, 20));
          return 60;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = 0;
  }, [logs]);

  const oracles = [
    { name: 'OpenWeatherMap API', endpoint: 'api.openweathermap.org/data/2.5/weather', status: 'Active', latency: '42ms', checks: '1.8K/day', color: '#10B981' },
    { name: 'WAQI Air Quality Index', endpoint: 'api.waqi.info/feed/geo', status: 'Active', latency: '88ms', checks: '1.8K/day', color: '#10B981' },
    { name: 'IMD Push Alerts',  endpoint: 'mausam.imd.gov.in/webhooks', status: 'Standby', latency: '15ms', checks: 'Push', color: '#F59E0B' },
  ];

  return (
    <div style={{ padding: '32px', animation: 'fadeIn 0.3s' }}>
      {/* Oracle Health */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{ width: '10px', height: '10px', background: '#10B981', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Live Oracle Health</h2>
        <div style={{ marginLeft: 'auto', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10B981', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
          Next scan in {ticker}s
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {oracles.map((o, i) => (
          <div key={i} style={{ background: 'rgba(30,41,59,0.5)', padding: '20px', borderRadius: '16px', border: `1px solid ${o.color}30` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '700', fontSize: '14px' }}>{o.name}</span>
              <span style={pill(o.status, o.color)}>{o.status}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '12px', fontFamily: 'monospace' }}>{o.endpoint}</div>
            <div style={{ display: 'flex', gap: '20px', fontSize: '12px', color: '#94A3B8' }}>
              <div>Latency: <strong style={{ color: '#fff' }}>{o.latency}</strong></div>
              <div>Calls: <strong style={{ color: '#fff' }}>{o.checks}</strong></div>
            </div>
          </div>
        ))}
      </div>

      {/* Parametric Thresholds Grid */}
      <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '14px', color: '#E2E8F0' }}>Parametric Trigger Thresholds</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '28px' }}>
        {THRESHOLDS_UI.map((th, i) => (
          <div key={i} style={{ background: 'rgba(0,0,0,0.25)', border: `1px solid ${th.color}30`, borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '22px', marginBottom: '8px' }}>{th.icon}</div>
            <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>{th.name}</div>
            <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>{th.metric}: <span style={{ color: th.color, fontWeight: '700' }}>{th.threshold}</span></div>
            <div style={{ fontSize: '12px', color: '#10B981', fontWeight: '700' }}>Payout: {th.payout}</div>
          </div>
        ))}
      </div>

      {/* Zone Status Table */}
      <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '14px', color: '#E2E8F0' }}>Zone Status Dashboard (Live)</h3>
      <div style={{ overflowX: 'auto', marginBottom: '28px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ color: '#64748B', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              {['City', 'Pincode', 'Latitude', 'Rain (mm/hr)', 'Temp (°C)', 'AQI', 'Status'].map(h => (
                <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: '600', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ZONES_UI.map((z, i) => {
              const rainAlert = z.rain > 35;
              const aqiAlert  = z.aqi > 300;
              const anyAlert  = rainAlert || aqiAlert;
              return (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', background: anyAlert ? 'rgba(239,68,68,0.03)' : 'transparent' }}>
                  <td style={{ padding: '12px', fontWeight: '700' }}>{z.city}</td>
                  <td style={{ padding: '12px', color: '#94A3B8', fontFamily: 'monospace' }}>{z.pincode}</td>
                  <td style={{ padding: '12px', color: '#64748B' }}>{z.lat}</td>
                  <td style={{ padding: '12px', color: rainAlert ? '#EF4444' : '#10B981', fontWeight: rainAlert ? '700' : '400' }}>
                    {z.rain} {rainAlert && '🚨'}
                  </td>
                  <td style={{ padding: '12px', color: z.temp > 42 ? '#EF4444' : '#94A3B8' }}>{z.temp}</td>
                  <td style={{ padding: '12px', color: aqiAlert ? '#EF4444' : z.aqi > 200 ? '#F59E0B' : '#10B981', fontWeight: aqiAlert ? '700' : '400' }}>
                    {z.aqi} {aqiAlert && '🚨'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={pill(anyAlert ? 'TRIGGERED' : 'CLEAR', anyAlert ? '#EF4444' : '#10B981')}>
                      {anyAlert ? 'TRIGGERED' : '✓ CLEAR'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Live Execution Log */}
      <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '12px', color: '#E2E8F0' }}>Live Parametric Execution Log</h3>
      <div ref={logRef} style={{ background: '#050810', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', padding: '16px', height: '220px', overflowY: 'auto' }}>
        {logs.map(l => <LogLine key={l.id} time={l.time} msg={l.msg} color={l.color} />)}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 2 — FRAUD GUARD
// ─────────────────────────────────────────────────────────────────────────────

const FRAUD_CASES = [
  { id: 'usr_8x92m', trigger: 'Heavy Rain Auto', score: 8,  status: 'AUTO_PAID',    flags: [],                  gps: 'PASS', freq: 'PASS', dup: 'PASS', age: 'PASS', ml: 'PASS' },
  { id: 'usr_2x11f', trigger: 'Heatwave Action', score: 75, status: 'AUTO_REJECTED', flags: ['GPS', 'VELOCITY'], gps: 'FAIL', freq: 'FAIL', dup: 'PASS', age: 'WARN', ml: 'FAIL' },
  { id: 'usr_4k99j', trigger: 'Monsoon Flood',   score: 5,  status: 'AUTO_PAID',    flags: [],                  gps: 'PASS', freq: 'PASS', dup: 'PASS', age: 'PASS', ml: 'PASS' },
  { id: 'usr_7m34z', trigger: 'Severe AQI',      score: 42, status: 'MANUAL_REVIEW', flags: ['VELOCITY'],       gps: 'PASS', freq: 'WARN', dup: 'PASS', age: 'PASS', ml: 'PASS' },
  { id: 'usr_9p01q', trigger: 'Cold Wave',        score: 60, status: 'MANUAL_REVIEW', flags: ['GPS', 'NEW_ACCT'], gps: 'FAIL', freq: 'PASS', dup: 'PASS', age: 'WARN', ml: 'PASS' },
];

const LAYER_COLOR = { PASS: '#10B981', FAIL: '#EF4444', WARN: '#F59E0B', SKIP: '#64748B' };

function FraudGuard() {
  const [selected, setSelected] = useState(null);

  const stats = {
    total: 347, approved: 298, review: 35, rejected: 14, avg: 18.4, identityMatch: 99.2,
  };

  return (
    <div style={{ padding: '32px', animation: 'fadeIn 0.3s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ width: '10px', height: '10px', background: '#EF4444', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>5-Layer AI Fraud Prevention</h2>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Reviewed (7d)',     value: stats.total,         color: '#3B82F6' },
          { label: 'Auto-Approved',     value: stats.approved,      color: '#10B981' },
          { label: 'Manual Review',     value: stats.review,        color: '#F59E0B' },
          { label: 'Auto-Rejected',     value: stats.rejected,      color: '#EF4444' },
          { label: 'Avg Fraud Score',   value: `${stats.avg}/100`,  color: '#8B5CF6' },
          { label: 'Identity Match',    value: `${stats.identityMatch}%`, color: '#10B981' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'rgba(30,41,59,0.5)', padding: '16px', borderRadius: '14px', border: `1px solid ${s.color}20` }}>
            <div style={{ fontSize: '22px', fontWeight: '800', color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Layer Legend */}
      <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '14px 20px', marginBottom: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap', fontSize: '12px', color: '#94A3B8' }}>
        <span><strong style={{ color: '#fff' }}>Layer 1</strong> GPS Geo-fence (+35)</span>
        <span><strong style={{ color: '#fff' }}>Layer 2</strong> Claim Velocity (+25)</span>
        <span><strong style={{ color: '#fff' }}>Layer 3</strong> Duplicate Event (+40)</span>
        <span><strong style={{ color: '#fff' }}>Layer 4</strong> Account Age (+20)</span>
        <span><strong style={{ color: '#fff' }}>Layer 5</strong> ML Anomaly (±15)</span>
        <span style={{ marginLeft: 'auto' }}>
          <span style={{ color: '#10B981' }}>●</span> ≤30 Auto-Pay &nbsp;
          <span style={{ color: '#F59E0B' }}>●</span> 31–60 Review &nbsp;
          <span style={{ color: '#EF4444' }}>●</span> ≥61 Reject
        </span>
      </div>

      {/* Claims Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
        <thead>
          <tr style={{ color: '#64748B', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {['User', 'Trigger', 'GPS', 'Velocity', 'Duplicate', 'Account', 'ML', 'Score', 'Decision'].map(h => (
              <th key={h} style={{ padding: '10px 8px', textAlign: 'left', fontWeight: '600', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FRAUD_CASES.map((row, i) => {
            const sc = row.score;
            const sc_color = sc <= 30 ? '#10B981' : sc <= 60 ? '#F59E0B' : '#EF4444';
            const dec_color = row.status === 'AUTO_PAID' ? '#10B981' : row.status === 'MANUAL_REVIEW' ? '#F59E0B' : '#EF4444';
            return (
              <tr key={i} onClick={() => setSelected(selected === i ? null : i)}
                style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer', background: selected === i ? 'rgba(59,130,246,0.05)' : 'transparent', transition: 'background 0.2s' }}>
                <td style={{ padding: '12px 8px', fontFamily: 'monospace', fontSize: '12px', color: '#94A3B8' }}>{row.id}</td>
                <td style={{ padding: '12px 8px' }}>{row.trigger}</td>
                {[row.gps, row.freq, row.dup, row.age, row.ml].map((v, j) => (
                  <td key={j} style={{ padding: '12px 8px' }}>
                    <span style={{ ...pill(v, LAYER_COLOR[v] || '#64748B'), fontSize: '10px' }}>{v}</span>
                  </td>
                ))}
                <td style={{ padding: '12px 8px', fontWeight: '800', color: sc_color }}>{sc}/100</td>
                <td style={{ padding: '12px 8px' }}>
                  <span style={pill(row.status, dec_color)}>{row.status.replace('_', ' ')}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Score bar for selected */}
      {selected !== null && (
        <div style={{ marginTop: '20px', background: 'rgba(30,41,59,0.6)', borderRadius: '14px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>Fraud Score Breakdown — {FRAUD_CASES[selected].id}</div>
          <div style={{ height: '12px', borderRadius: '6px', overflow: 'hidden', background: 'rgba(0,0,0,0.3)', marginBottom: '8px' }}>
            <div style={{ width: `${FRAUD_CASES[selected].score}%`, height: '100%', background: 'linear-gradient(90deg, #10B981 0%, #F59E0B 50%, #EF4444 100%)', transition: 'width 0.6s' }} />
          </div>
          <div style={{ fontSize: '12px', color: '#94A3B8' }}>
            Flags raised: <strong style={{ color: '#fff' }}>{FRAUD_CASES[selected].flags.join(', ') || 'None'}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TAB 3 — BUSINESS VIABILITY
// ─────────────────────────────────────────────────────────────────────────────

const MONTHLY_DATA = [
  { month: 'Oct', premiums: 28, claims: 16, ratio: 57 },
  { month: 'Nov', premiums: 31, claims: 17, ratio: 55 },
  { month: 'Dec', premiums: 34, claims: 18, ratio: 53 },
  { month: 'Jan', premiums: 37, claims: 21, ratio: 57 },
  { month: 'Feb', premiums: 40, claims: 24, ratio: 60 },
  { month: 'Mar', premiums: 45, claims: 28, ratio: 62 },
];

const SDG_GOALS = [
  { id: 1,  label: 'No Poverty',         icon: '🚫', color: '#E5243B', desc: 'Auto-payouts prevent income drop below poverty line during disasters' },
  { id: 8,  label: 'Decent Work',        icon: '💼', color: '#A21942', desc: 'Micro-insurance enables gig workers to sustain livelihoods year-round' },
  { id: 10, label: 'Reduced Inequality', icon: '⚖️', color: '#FD6925', desc: 'Affordable ₹15/week premiums make protection accessible to the informal sector' },
  { id: 11, label: 'Sustainable Cities', icon: '🏙️', color: '#FD9D24', desc: 'Climate-triggered coverage builds urban resilience for daily-wage earners' },
  { id: 13, label: 'Climate Action',     icon: '🌱', color: '#3F7E44', desc: 'Parametric model prices and responds to climate risk in real time' },
];

function BarChart({ data }) {
  const maxVal = Math.max(...data.map(d => d.premiums));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px', padding: '0 8px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '100%', display: 'flex', alignItems: 'flex-end', gap: '2px', height: '90px' }}>
            <div title="Premiums" style={{ flex: 1, background: '#3B82F6', borderRadius: '4px 4px 0 0', height: `${(d.premiums / maxVal) * 90}px`, transition: 'height 0.8s ease', opacity: 0.9 }} />
            <div title="Claims"   style={{ flex: 1, background: '#EF4444', borderRadius: '4px 4px 0 0', height: `${(d.claims  / maxVal) * 90}px`, transition: 'height 0.8s ease', opacity: 0.9 }} />
          </div>
          <span style={{ fontSize: '10px', color: '#64748B' }}>{d.month}</span>
        </div>
      ))}
    </div>
  );
}

function LossRatioLine({ data }) {
  const max = 80; const min = 40;
  const points = data.map((d, i) => {
    const x = 20 + (i / (data.length - 1)) * 560;
    const y = 100 - ((d.ratio - min) / (max - min)) * 80;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox="0 0 600 110" style={{ width: '100%', height: '110px' }}>
      {/* 80% danger line */}
      <line x1="20" y1="10" x2="580" y2="10" stroke="#EF444430" strokeWidth="1" strokeDasharray="4,4" />
      <text x="584" y="14" fill="#EF4444" fontSize="9">80%</text>
      {/* Polyline */}
      <polyline points={points} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => {
        const x = 20 + (i / (data.length - 1)) * 560;
        const y = 100 - ((d.ratio - min) / (max - min)) * 80;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="#10B981" />
            <text x={x} y={y - 8} fill="#10B981" fontSize="9" textAnchor="middle">{d.ratio}%</text>
          </g>
        );
      })}
    </svg>
  );
}

function BusinessViability() {
  const kpis = [
    { title: 'Loss Ratio (MTD)',       value: '62.4%',   sub: 'Healthy — target < 80%', color: '#10B981', desc: 'Claims paid vs premiums collected. Industry safe zone.' },
    { title: 'Premium Pool',           value: '₹4.52Cr', sub: '+18% MoM Growth',        color: '#3B82F6', desc: 'Total micro-premiums in active reserve fund.' },
    { title: 'Reserve Life',           value: '4.5 Yrs', sub: 'Black-swan tested',      color: '#8B5CF6', desc: 'Months the reserve survives back-to-back disasters.' },
    { title: 'Avg Premium / Worker',   value: '₹15.30',  sub: 'Per week (BTS-adjusted)',color: '#F59E0B', desc: 'Affordable entry point for informal workers.' },
    { title: 'Policies Active',        value: '42,850',  sub: '6 metro zones',          color: '#EC4899', desc: 'Live covered workers across India.' },
    { title: 'Reinsurance Buffer',     value: '₹18.5Cr', sub: 'Cat-5 event coverage',   color: '#14B8A6', desc: 'Reinsurance pool for extreme tail-risk events.' },
  ];

  return (
    <div style={{ padding: '32px', animation: 'fadeIn 0.3s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ width: '10px', height: '10px', background: '#3B82F6', borderRadius: '50%', boxShadow: '0 0 10px #3B82F6' }} />
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Actuarial Health & Business Viability</h2>
      </div>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        {kpis.map((k, i) => (
          <div key={i} title={k.desc} style={{ background: 'rgba(30,41,59,0.4)', padding: '20px', borderRadius: '16px', border: `1px solid ${k.color}25`, position: 'relative', overflow: 'hidden', cursor: 'default' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '60px', height: '60px', background: `radial-gradient(circle at top right, ${k.color}20, transparent 70%)` }} />
            <div style={{ fontSize: '11px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>{k.title}</div>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#fff', marginBottom: '4px' }}>{k.value}</div>
            <div style={{ fontSize: '11px', color: k.color, fontWeight: '600' }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div style={{ background: 'rgba(30,41,59,0.4)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📊 Premium vs Claims (₹L)
            <span style={{ marginLeft: 'auto', fontSize: '11px' }}>
              <span style={{ color: '#3B82F6' }}>■ Premiums</span> &nbsp;
              <span style={{ color: '#EF4444' }}>■ Claims</span>
            </span>
          </div>
          <BarChart data={MONTHLY_DATA} />
        </div>
        <div style={{ background: 'rgba(30,41,59,0.4)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px' }}>📉 Loss Ratio Trend</div>
          <LossRatioLine data={MONTHLY_DATA} />
          <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '8px' }}>
            Maintained below 80% threshold across 6 months — actuarially sound.
          </div>
        </div>
      </div>

      {/* Dynamic Pricing Model */}
      <div style={{ background: 'linear-gradient(145deg, rgba(30,41,59,0.5), rgba(15,23,42,0.8))', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '28px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🤖 AI Dynamic Pricing Sustainability
        </h3>
        <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.7', marginBottom: '20px' }}>
          PayNest replaces flat-rate insurance with <strong style={{ color: '#60A5FA' }}>ML-driven localized risk pricing</strong>.
          Each worker's weekly premium is computed from zone risk (flood history, elevation), seasonal risk (monsoon cycles,
          AQI forecasts), and platform behavior (order velocity, delivery distance). This allows premiums as low as <strong style={{ color: '#10B981' }}>₹8/week</strong> for
          safe zones, rising to <strong style={{ color: '#F59E0B' }}>₹32/week</strong> for high-risk flood zones during monsoon —
          matching actuarial cost with hyper-accuracy.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {[
            { label: 'Base Premium Floor',  value: '₹8/week',  color: '#10B981' },
            { label: 'Monsoon Surge Cap',   value: '₹32/week', color: '#F59E0B' },
            { label: 'BTS Max Discount',    value: '40%',       color: '#3B82F6' },
            { label: 'Reinsurance Trigger', value: 'LR > 80%', color: '#EF4444' },
          ].map((m, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: '10px', borderLeft: `3px solid ${m.color}` }}>
              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{m.label}</div>
              <div style={{ fontSize: '20px', fontWeight: '800', color: m.color }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SDG Alignment */}
      <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>🌱 UN SDG Alignment</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        {SDG_GOALS.map(g => (
          <div key={g.id} style={{ background: 'rgba(30,41,59,0.4)', borderRadius: '14px', padding: '16px', border: `1px solid ${g.color}30` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{ background: g.color, color: '#fff', borderRadius: '8px', padding: '4px 8px', fontSize: '11px', fontWeight: '800' }}>SDG {g.id}</div>
              <span style={{ fontSize: '16px' }}>{g.icon}</span>
            </div>
            <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px', color: '#fff' }}>{g.label}</div>
            <div style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.5' }}>{g.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
