import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar, Legend, LineChart, Line, ResponsiveContainer } from 'recharts'

/**
 * 📊 BUSINESS INTELLIGENCE DASHBOARD
 * 
 * Shows unit economics, profitability analysis, scaling projections,
 * loss ratios, and ROI calculations with animated counters
 */

// ── Animated Counter Component ────────────────────────────────────────────
function AnimatedCounter({ value, prefix = '', suffix = '', duration = 1500 }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = value / (duration / 50)
    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setCurrent(value)
        clearInterval(timer)
      } else {
        setCurrent(Math.round(start))
      }
    }, 50)
    return () => clearInterval(timer)
  }, [value, duration])

  return <span>{prefix}{current.toLocaleString()}{suffix}</span>
}

// ── Simple Bar Chart ───────────────────────────────────────────────────────
function ScaleProjectionChart() {
  const scenarios = [
    { workers: '1,000', margin: 55000, percent: 40 },
    { workers: '10,000', margin: 550000, percent: 100 },
    { workers: '1,00,000', margin: 5500000, percent: 100 }
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {scenarios.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ minWidth: '100px', fontSize: '13px', fontWeight: '600', color: '#cbd5e1' }}>
            {s.workers} workers
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              height: '32px',
              background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.2)',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                height: '100%',
                background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                width: `${s.percent}%`,
                borderRadius: '8px',
                transition: 'width 1s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '12px',
                fontWeight: '700',
                color: '#fff',
                fontSize: '12px'
              }}>
                ₹{(s.margin / 100000).toFixed(1)}L/week
              </div>
            </div>
          </div>
          <div style={{ minWidth: '100px', textAlign: 'right', fontSize: '13px', fontWeight: '700', color: '#10b981' }}>
            ₹{(s.margin / 100000).toFixed(1)}L/week
          </div>
        </div>
      ))}
      <div style={{
        marginTop: '12px', padding: '12px', background: 'rgba(16,185,129,0.1)', 
        border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', 
        fontSize: '12px', color: '#10b981', fontWeight: '700', textAlign: 'center'
      }}>
        ✅ Break-even: Profitable from Week 1
      </div>
    </div>
  )
}

// ── Circular Loss Ratio Gauge ──────────────────────────────────────────────
function LossRatioGauge() {
  const currentLossRatio = 34
  const industryStandard = 65
  const advantage = industryStandard - currentLossRatio

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
      {/* Circular SVG Gauge */}
      <div style={{ position: 'relative', width: '160px', height: '160px' }}>
        <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="12"
          />
          {/* Progress circle (34%) */}
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="12"
            strokeDasharray={`${(currentLossRatio / 100) * 2 * Math.PI * 70} ${2 * Math.PI * 70}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 2s ease' }}
          />
        </svg>
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ fontSize: '28px', fontWeight: '900', color: '#3b82f6' }}>{currentLossRatio}%</div>
          <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>Loss Ratio</div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Current Loss Ratio</div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#fff' }}>{currentLossRatio}%</div>
        </div>

        <div>
          <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Industry Standard</div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#f59e0b' }}>{industryStandard}%</div>
        </div>

        <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', padding: '12px' }}>
          <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>PayNest Advantage</div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#10b981' }}>{advantage}% Better</div>
          <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>Lower loss ratio = better profitability</div>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
export function BusinessIntelligence() {
  const [scenarioTab, setScenarioTab] = useState('low') // low, high, extreme

  const scenarios = {
    low: {
      title: 'WEEK WITH LOW DISRUPTION',
      subtitle: 'Clear weather, good conditions',
      emoji: '☀️',
      hitRate: 10,
      payouts: 21000
    },
    high: {
      title: 'WEEK WITH HIGH DISRUPTION',
      subtitle: 'Monsoon conditions',
      emoji: '🌧️',
      hitRate: 25,
      payouts: 52000
    },
    extreme: {
      title: 'EXTREME WEEK',
      subtitle: 'Heavy floods, road closures',
      emoji: '⛈️',
      hitRate: 35,
      payouts: 68000
    },
    business_viability: {
      title: 'BUSINESS VIABILITY',
      subtitle: 'Core operational margins',
      emoji: '💼'
    }
  }

  const current = scenarios[scenarioTab]
  const premiumCollected = 76500
  const margin = scenarioTab === 'business_viability' ? 0 : premiumCollected - current.payouts

  // Static Business Viability Data
  const bWeeklyPremium = 49
  const bTotalWorkers = 10000
  const bAvgClaimPayout = 380
  const bClaimsPerWorkerPerMonth = 3.2
  
  const bWeeklyRevenue = bWeeklyPremium * bTotalWorkers
  const bAnnualRevenue = bWeeklyRevenue * 52
  const bMonthlyClaimsCost = bAvgClaimPayout * bClaimsPerWorkerPerMonth * bTotalWorkers
  // Note: this dataset says claims per month is 3.2! That's 32000 claims per month! 
  // Let's use it verbatim as requested.
  const bLossRatio = ((bMonthlyClaimsCost * 12) / bAnnualRevenue) * 100
  const bOperatingMargin = 100 - bLossRatio - 18 // 18% ops
  const fixedCosts = 500000
  const breakEvenUsers = Math.ceil(fixedCosts / (bWeeklyPremium - (bAvgClaimPayout*(bClaimsPerWorkerPerMonth/4))))

  const barChartData = [
    { week: 'W1', premium: 490000, claims: 300000 },
    { week: 'W2', premium: 495000, claims: 320000 },
    { week: 'W3', premium: 500000, claims: 310000 },
    { week: 'W4', premium: 510000, claims: 550000 }, // storm
    { week: 'W5', premium: 515000, claims: 280000 },
    { week: 'W6', premium: 520000, claims: 290000 },
    { week: 'W7', premium: 530000, claims: 305000 },
    { week: 'W8', premium: 535000, claims: 295000 },
  ];

  const lineChartData = Array.from({length: 52}).map((_, i) => ({
    week: `W${i+1}`,
    profit: -fixedCosts + (i * ((bWeeklyRevenue) - (bMonthlyClaimsCost/4) - (bWeeklyRevenue*0.18)))
  }));

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .bi-card { animation: slideIn 0.5s ease forwards; }
        .bi-section-title { font-size: 14px; font-weight: 900; color: #60a5fa; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px; display: flex; align-items: center; gap: 8px; }
        .bi-divider { height: 1px; background: 'rgba(255,255,255,0.05)'; margin: 32px 0; }
      `}</style>

      {/* PAGE HEADER */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 8px 0' }}>
          📊 Business Intelligence
        </h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>
          Financial metrics, profitability analysis, and strategic insights
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* UNIT ECONOMICS SECTION */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div style={{
        background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '20px', padding: '40px', marginBottom: '32px'
      }} className="bi-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
          <span style={{ fontSize: '20px' }}>💰</span>
          <div className="bi-section-title" style={{ margin: 0 }}>Unit Economics (Per Week)</div>
        </div>

        {/* Base Metrics */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '32px'
        }}>
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>Workers Insured</div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#60a5fa' }}>
              <AnimatedCounter value={1000} />
            </div>
          </div>

          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>Avg Weekly Premium</div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#f59e0b' }}>
              ₹<AnimatedCounter value={76.5} duration={1200} />
            </div>
          </div>

          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>Total Premium Collected</div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#3b82f6' }}>
              ₹<AnimatedCounter value={76500} suffix="" duration={1500} />
            </div>
          </div>
        </div>

        {/* Scenario Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          {['low', 'high', 'extreme', 'business_viability'].map(tab => (
            <button
              key={tab}
              onClick={() => setScenarioTab(tab)}
              style={{
                padding: '10px 16px',
                background: scenarioTab === tab ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
                border: scenarioTab === tab ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.08)',
                color: scenarioTab === tab ? '#60a5fa' : '#888',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '12px',
                transition: 'all 0.3s'
              }}
            >
              {scenarios[tab].emoji} {scenarios[tab].title.split('WEEK WITH ')[1] || scenarios[tab].title}
            </button>
          ))}
        </div>

        {/* Scenario Detail */}
        {scenarioTab !== 'business_viability' ? (
        <div style={{
          background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
          borderRadius: '14px', padding: '24px'
        }}>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '16px', fontWeight: '900', color: '#60a5fa', marginBottom: '4px' }}>
              {scenarios[scenarioTab].emoji} {scenarios[scenarioTab].title}
            </div>
            <div style={{ fontSize: '12px', color: '#888' }}>{scenarios[scenarioTab].subtitle}</div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', marginTop: '16px'
          }}>
            <div>
              <div style={{ fontSize: '10px', color: '#888', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Premium Collected</div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#10b981' }}>
                ₹<AnimatedCounter value={premiumCollected} duration={1000} />
              </div>
            </div>

            <div>
              <div style={{ fontSize: '10px', color: '#888', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Hit Rate</div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#f59e0b' }}>
                <AnimatedCounter value={current.hitRate} suffix="%" duration={1000} />
              </div>
              <div style={{ fontSize: '9px', color: '#64748b', marginTop: '2px' }}>
                ({Math.round(current.hitRate * 10)} workers claimed)
              </div>
            </div>

            <div>
              <div style={{ fontSize: '10px', color: '#888', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Total Payouts</div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#ef4444' }}>
                ₹<AnimatedCounter value={current.payouts} duration={1000} />
              </div>
            </div>

            <div style={{ background: 'rgba(16,185,129,0.15)', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '10px', color: '#888', fontWeight: '700', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>Operating Margin</div>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#10b981' }}>
                ₹<AnimatedCounter value={margin} duration={1000} />
              </div>
              <div style={{ fontSize: '9px', color: '#10b981', marginTop: '2px', fontWeight: '700' }}>✅ Profitable</div>
            </div>
          </div>
        </div>
        ) : (
          <div style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '14px', padding: '24px' }}>
            <h3 style={{ fontSize: '16px', color: '#10b981', margin: '0 0 20px 0' }}>Business Viability Analysis</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase' }}>Weekly Revenue</div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#3b82f6' }}>₹{(bWeeklyRevenue).toLocaleString()}</div>
              </div>
              <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase' }}>Annual Revenue</div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#3b82f6' }}>₹2.54 Crore</div>
              </div>
              <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase' }}>Operating Margin</div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: bOperatingMargin > 0 ? '#10b981' : '#ef4444' }}>{bOperatingMargin.toFixed(1)}%</div>
              </div>
              <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase' }}>Loss Ratio</div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: bLossRatio < 65 ? '#10b981' : bLossRatio < 75 ? '#f59e0b' : '#ef4444' }}>{bLossRatio.toFixed(1)}%</div>
              </div>
              <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
                <div style={{ fontSize: '11px', color: '#888', fontWeight: '700', textTransform: 'uppercase' }}>Break Even Users</div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#10b981' }}>{breakEvenUsers < 0 ? 'N/A' : breakEvenUsers.toLocaleString()}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ height: '240px', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', color: '#888', fontWeight: 'bold', marginBottom: '8px' }}>8-Week Premium vs Claims</div>
                <ResponsiveContainer width="100%" height="80%">
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="week" stroke="#888" fontSize={11} />
                    <YAxis stroke="#888" fontSize={11} tickFormatter={(val) => `₹${val/1000}k`} />
                    <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{background: '#161c24', border: 'none', borderRadius: '8px'}} />
                    <Legend wrapperStyle={{fontSize: '11px'}} />
                    <Bar dataKey="premium" fill="#3b82f6" name="Premium" />
                    <Bar dataKey="claims" fill="#ef4444" name="Claims" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ height: '240px', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '12px' }}>
                <div style={{ fontSize: '12px', color: '#888', fontWeight: 'bold', marginBottom: '8px' }}>52-Week Break Even Projection</div>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart data={lineChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="week" stroke="#888" fontSize={11} minTickGap={20} />
                    <YAxis stroke="#888" fontSize={11} tickFormatter={(val) => `₹${(val/100000).toFixed(0)}L`} />
                    <Tooltip cursor={{stroke: 'rgba(255,255,255,0.1)'}} contentStyle={{background: '#161c24', border: 'none', borderRadius: '8px'}} />
                    <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={false} name="Cum. Profit" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SCALE PROJECTIONS */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div style={{
        background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '20px', padding: '40px', marginBottom: '32px'
      }} className="bi-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
          <span style={{ fontSize: '20px' }}>📈</span>
          <div className="bi-section-title" style={{ margin: 0 }}>Scale Projections</div>
        </div>

        <div style={{ marginBottom: '16px', padding: '14px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', fontSize: '12px', color: '#60a5fa' }}>
          💡 Based on 10% average disruption hit rate with current margin model
        </div>

        <ScaleProjectionChart />
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* LOSS RATIO GAUGE */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div style={{
        background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '20px', padding: '40px', marginBottom: '32px'
      }} className="bi-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
          <span style={{ fontSize: '20px' }}>📊</span>
          <div className="bi-section-title" style={{ margin: 0 }}>Loss Ratio Advantage</div>
        </div>

        <div style={{ marginBottom: '20px', padding: '14px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', fontSize: '12px', color: '#60a5fa' }}>
          💡 Loss Ratio = (Payouts ÷ Premiums) × 100 | Lower = Better for Profitability
        </div>

        <LossRatioGauge />
      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* WORKER ROI */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div style={{
        background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '20px', padding: '40px'
      }} className="bi-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
          <span style={{ fontSize: '20px' }}>👥</span>
          <div className="bi-section-title" style={{ margin: 0 }}>ROI For Worker</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Calculation breakdown */}
          <div>
            <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', color: '#888', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>52-Week Cost Projection</div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline' }}>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#ef4444' }}>
                  ₹<AnimatedCounter value={3978} duration={1200} />
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  (₹<AnimatedCounter value={76.5} duration={800} /> × 52 weeks)
                </div>
              </div>
            </div>

            <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
              <div style={{ fontSize: '12px', color: '#888', fontWeight: '700', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Expected 52-Week Payout</div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline' }}>
                <div style={{ fontSize: '24px', fontWeight: '900', color: '#10b981' }}>
                  ₹<AnimatedCounter value={6115} duration={1400} />
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>
                  (₹420 × 28% probability × 52 weeks)
                </div>
              </div>
            </div>
          </div>

          {/* ROI Result */}
          <div style={{
            background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.3)',
            borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center'
          }}>
            <div style={{ fontSize: '13px', color: '#888', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
              Expected 52-Week ROI for Worker
            </div>
            <div style={{ fontSize: '40px', fontWeight: '900', color: '#10b981', marginBottom: '8px' }}>
              <AnimatedCounter value={153} suffix="%" duration={1500} />
            </div>
            <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6' }}>
              For every ₹1 spent on premiums,<br/>worker expects ₹2.53 back over 52 weeks
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
