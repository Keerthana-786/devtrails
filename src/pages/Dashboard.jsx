import React, { useState, useEffect } from 'react'
import { Badge } from '../components/UI.jsx'
import { useApp } from '../context/AppContext.jsx'
import { StormPrepMode } from '../components/StormPrepCard.jsx'
import { BTSCard } from '../components/BTSCard.jsx'
import { WeeklyReport } from '../components/WeeklyReport.jsx'
import PayoutProcessingModal from '../components/PayoutProcessingModal.jsx'

// ── Animated number that counts up from 0 → value ────────────────────────────
function ProgressiveNumber({ value, isStreaming }) {
  const [current, setCurrent] = useState(isStreaming ? 0 : value)

  useEffect(() => {
    if (!isStreaming || current >= value) { setCurrent(value); return }
    const step = Math.max(1, Math.floor(value / 12))
    const timer = setInterval(() => {
      setCurrent(prev => {
        if (prev + step >= value) { clearInterval(timer); return value }
        return prev + step
      })
    }, 100)
    return () => clearInterval(timer)
  }, [value, isStreaming])

  return <span>{Math.round(current)}</span>
}

// ── 7-bar Premium Forecast Sparkline (pure CSS) ───────────────────────────────
function ForecastChart({ history }) {
  if (!history || history.length === 0) return null
  const max = Math.max(...history.map(h => h.premium))
  const min = Math.min(...history.map(h => h.premium))
  const range = max - min || 1

  return (
    <div>
      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#60A5FA', marginBottom: '10px' }}>
        📈 7-Day Premium Forecast
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '60px' }}>
        {history.map((h, i) => {
          const ratio = (h.premium - min) / range
          const pct = 20 + ratio * 80
          const clr = ratio > 0.66 ? '#EF4444' : ratio > 0.33 ? '#F59E0B' : '#10B981'
          return (
            <div key={i} title={`${h.day}: ₹${h.premium}`}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div style={{
                width: '100%', height: `${pct}%`,
                background: clr,
                borderRadius: '4px 4px 0 0',
                opacity: h.isToday ? 1 : 0.55,
                boxShadow: h.isToday ? `0 0 8px ${clr}` : 'none',
                transition: 'height 0.6s ease',
                position: 'relative',
              }}>
                {h.isToday && (
                  <div style={{
                    position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)',
                    fontSize: '9px', color: clr, fontWeight: 'bold', whiteSpace: 'nowrap'
                  }}>
                    ₹{h.premium}
                  </div>
                )}
              </div>
              <div style={{ fontSize: '9px', color: h.isToday ? '#fff' : '#64748B' }}>{h.day}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Gamification Badge Pill ───────────────────────────────────────────────────
function BadgePill({ badge }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: '600',
      background: badge.earned ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.03)',
      border: `1px solid ${badge.earned ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.06)'}`,
      color: badge.earned ? '#93C5FD' : '#475569',
      boxShadow: badge.earned ? '0 0 10px rgba(59,130,246,0.3)' : 'none',
      transition: 'all 0.5s ease',
      cursor: 'help',
      filter: badge.earned ? 'none' : 'grayscale(1)',
      opacity: badge.earned ? 1 : 0.5,
    }} title={badge.desc}>
      <span style={{ fontSize: '16px' }}>{badge.icon}</span>
      {badge.label}
      {badge.earned && <span style={{ fontSize: '10px', color: '#60A5FA' }}>✓</span>}
    </div>
  )
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const {
    user, walletBalance, weeklyPremium, pricingBreakdown,
    policyStatus, payouts, weather, traffic,
    activeDisruptions, stabilityScore, aiAlerts, aiLossEstimate,
    highRiskHours, safeZones, expectedLossProbability, powerMeter,
    orders, acceptOrder, getBestOrders, expectedEarnings,
    premiumHistory, badges, policySuggestion,
    showPayoutModal, setShowPayoutModal, activePayout
  } = useApp()

  const [expandedPayouts, setExpandedPayouts] = useState({})
  const [dismissedSuggestion, setDismissedSuggestion] = useState(false)
  const [stormPrepToast, setStormPrepToast] = useState(null)

  const toggleWhyPayout = (id) =>
    setExpandedPayouts(prev => ({ ...prev, [id]: !prev[id] }))

  const handleStormPrepBuy = () => {
    setStormPrepToast('✅ Advance coverage activated! You will receive auto-payout if rain exceeds 60mm tomorrow.')
    setTimeout(() => setStormPrepToast(null), 4000)
  }

  const getStatusColor = (s) =>
    s === 'ACTIVE' ? 'var(--accent-green)' : s === 'PAUSED' ? 'var(--accent-red)' : 'var(--text-secondary)'

  const bestOrders = getBestOrders()

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', fontFamily: "'Outfit', sans-serif" }}>

      {/* ── HEADER ────────────────────────────────────────────────────────── */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>
              Hello, {user?.name || 'Worker'} 👋
            </h1>
            {user?.aadhaarUploaded && (
              <div style={{ fontSize: '10px', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '4px 8px', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.3)', fontWeight: '600' }}>
                ✅ KYC Verified
              </div>
            )}
          </div>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Live AI-Powered Zero-Touch Income Protection</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '14px', background: 'rgba(51,65,85,0.7)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '18px' }}>{stabilityScore > 70 ? '😊' : stabilityScore > 45 ? '😐' : '😟'}</span>
            <div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>Risk Mood</div>
              <div style={{ fontSize: '13px', fontWeight: '700' }}>{stabilityScore > 70 ? 'Stable' : stabilityScore > 45 ? 'Watchful' : 'High risk'}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', padding: '10px 14px', borderRadius: '14px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.12)' }}>
            <div style={{ fontSize: '11px', color: '#94A3B8' }}>PayNest Power Meter</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: powerMeter.color }}>{powerMeter.label} · {powerMeter.score}%</div>
          </div>
        </div>
      </div>

      {/* ── GAMIFICATION BADGE STRIP ───────────────────────────────────────── */}
      <div style={{ marginBottom: '24px', display: 'flex', gap: '10px', flexWrap: 'wrap', padding: '16px', background: 'rgba(22,28,36,0.5)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', alignSelf: 'center', marginRight: '4px' }}>🏆 Badges:</span>
        {badges.map(b => <BadgePill key={b.id} badge={b} />)}
      </div>

      {/* Unique Feature 2: Storm Prep */}
      <StormPrepMode />

      {stormPrepToast && (
        <div style={{
          position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(16,185,129,0.95)', color: '#fff', padding: '14px 24px',
          borderRadius: '12px', fontSize: '13px', fontWeight: '600', zIndex: 1000,
          border: '1px solid rgba(16,185,129,0.5)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          animation: 'slideUp 0.3s ease'
        }}>
          {stormPrepToast}
        </div>
      )}

      {/* ── TOP ROW: Orders | Policy + Wallet ─────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)', gap: '24px', marginBottom: '24px' }}>

        {/* LIVE ORDERS */}
        <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px solid #10B981', borderRadius: '20px', padding: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 8px #10B981', animation: 'pulse 1.5s infinite', display: 'inline-block' }} />
            📦 Live Orders Near You
          </h2>

          <div style={{ marginBottom: '16px', padding: '16px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '14px', boxShadow: '0 4px 12px rgba(59,130,246,0.1)' }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#60A5FA', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '16px' }}>🤖</span> AI STRATEGIC ADVISOR
            </div>
            <div style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: '1.4' }}>
              {aiAlerts && aiAlerts.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: '18px' }}>
                  {aiAlerts.map((alert, idx) => <li key={idx} style={{ marginBottom: '4px' }}>{alert}</li>)}
                </ul>
              ) : (
                "Conditions optimal. ML predicts stable earnings for the next 4 hours. No manual action required."
              )}
            </div>
            {bestOrders.length > 0 && (
              <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(59,130,246,0.2)', fontSize: '12px', fontWeight: '600', color: '#10B981' }}>
                🎯 Recommended Pick: {bestOrders[0].id} (₹{bestOrders[0].payout})
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '320px', overflowY: 'auto' }}>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>No orders active.</div>
            ) : orders.map(order => {
              const isRec = bestOrders.some(b => b.id === order.id)
              const isHigh = order.risk_level === 'HIGH'
              return (
                <div key={order.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px',
                  background: isHigh ? 'rgba(239,68,68,0.05)' : 'rgba(0,0,0,0.2)', borderRadius: '12px',
                  border: `1px solid ${isRec ? '#3B82F6' : isHigh ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.03)'}`
                }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {order.distance_km} km
                      {isHigh && <span style={{ fontSize: '10px', background: '#EF4444', color: '#fff', padding: '1px 6px', borderRadius: '4px' }}>HIGH RISK</span>}
                      {isRec && <span style={{ fontSize: '10px', background: '#3B82F6', color: '#fff', padding: '1px 6px', borderRadius: '4px' }}>AI PICK</span>}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{order.id}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ fontSize: '16px', fontWeight: '800', color: isHigh ? '#475569' : '#10B981' }}>₹{order.payout}</div>
                    <button onClick={() => acceptOrder(order.id)} style={{
                      background: isHigh ? 'transparent' : '#10B981', color: isHigh ? '#475569' : '#000',
                      border: isHigh ? '1px dashed #EF4444' : 'none', padding: '7px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px'
                    }}>{isHigh ? 'Avoid' : 'Accept'}</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* POLICY + WALLET */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Policy Card */}
          <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>🛡 Live Policy</h2>
              <Badge label={policyStatus} color={getStatusColor(policyStatus)} />
            </div>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: '12px', marginBottom: '14px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Weekly AI Premium</div>
              <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--accent-blue)' }}>₹{weeklyPremium.toFixed(2)}</div>
              {pricingBreakdown && (
                <div style={{ marginTop: '10px', borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '10px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                  <div style={{ fontWeight: 'bold', color: '#60A5FA', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Why this premium?</span>
                    <span>ML Predicted</span>
                  </div>
                  {[
                    ['Risk Multiplier', `x${pricingBreakdown.overall_risk_multiplier}`, pricingBreakdown.overall_risk_multiplier > 1 ? '#EF4444' : '#10B981'],
                    ['Exp. Multiplier', `x${pricingBreakdown.experience_multiplier || '1.0'}`, '#10B981'],
                    ['Vehicle Risk', `x${pricingBreakdown.vehicle_risk_multiplier || '1.0'}`, '#F59E0B'],
                    ['Zone Discount', `-₹${pricingBreakdown.zone_safety_discount || '0'}`, '#10B981'],
                  ].map(([label, val, clr]) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <span>{label}</span><span style={{ color: clr, fontWeight: '600' }}>{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Forecast Sparkline */}
            <ForecastChart history={premiumHistory} />
          </div>

          {/* Wallet Card */}
          <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 16px 0' }}>💳 Wallet</h2>
            <div style={{ fontSize: '30px', fontWeight: '800', color: walletBalance < weeklyPremium ? 'var(--accent-red)' : '#fff' }}>
              ₹{walletBalance.toFixed(2)}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px' }}>Auto-deductions active on schedule.</div>
          </div>

          {/* Policy Suggestion Banner */}
          {policySuggestion && !dismissedSuggestion && (
            <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '14px', padding: '16px', position: 'relative' }}>
              <button onClick={() => setDismissedSuggestion(true)} style={{ position: 'absolute', top: '10px', right: '12px', background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '16px' }}>✕</button>
              <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#60A5FA', marginBottom: '6px' }}>🤖 AI Policy Recommendation</div>
              <div style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: '1.5' }}>{policySuggestion}</div>
            </div>
          )}

          {/* Unique Feature 4: BTS Score Card */}
          <BTSCard />

          {/* Unique Feature 7: Weekly Protection Report */}
          <WeeklyReport />
        </div>
      </div>

      {/* ── BOTTOM ROW: Disruptions | Income Stability ─────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr)', gap: '24px' }}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Active Disruptions */}
          <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 16px 0' }}>🚨 Live Triggers</h2>
            {activeDisruptions && activeDisruptions.length > 0 ? activeDisruptions.map((dis, i) => (
              <div key={i} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '14px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#EF4444' }}>⚠️ {dis.type}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '3px' }}>{dis.description}</div>
                </div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: dis.auto_claim_eligible ? '#10B981' : '#F59E0B', textAlign: 'right' }}>
                  {dis.auto_claim_eligible ? 'Processing...' : 'Monitoring'}
                </div>
              </div>
            )) : (
              <div style={{ textAlign: 'center', padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                ✅ No active disruptions. Operations normal.
              </div>
            )}
          </div>

          {/* Auto-Claims Log */}
          <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 16px 0' }}>⚡ AI Auto-Claims Log</h2>
            {(payouts || []).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>No claims yet.</div>
            ) : (payouts || []).slice(0, 4).map((p, i) => (
              <div key={p?.id || i} style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.03)', marginBottom: '10px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>
                      {p?.aiGenerated ? '🤖 AI-calculated payout' : 'Claim'} · #{p?.id ? p.id.substring(4, 12) : 'N/A'}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{new Date(p?.createdAt || Date.now()).toLocaleString()}</div>
                    {p?.fraudVerdict && (
                      <div style={{ fontSize: '10px', color: p.fraudVerdict === 'AUTO_APPROVE' ? '#10B981' : '#F59E0B', marginTop: '3px' }}>
                        🛡 Fraud: {p.fraudVerdict}
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#10B981', marginBottom: '4px' }}>
                      +₹<ProgressiveNumber value={p?.amount || 0} isStreaming={p?.streaming} />
                    </div>
                    <Badge label={p?.status || 'PENDING'} color={p?.status === 'COMPLETED' ? 'var(--accent-green)' : '#F59E0B'} />
                  </div>
                </div>
                {p?.why_payout && (
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <div onClick={() => toggleWhyPayout(p.id)}
                      style={{ padding: '8px 14px', fontSize: '11px', color: '#60A5FA', cursor: 'pointer', background: 'rgba(59,130,246,0.04)' }}>
                      💡 Why this payout? {expandedPayouts[p.id] ? '▲' : '▼'}
                    </div>
                    {expandedPayouts[p.id] && (
                      <div style={{ padding: '10px 14px', fontSize: '11px', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.25)' }}>
                        {p.why_payout}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Income Stability */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px' }}>
            <h2 style={{ fontSize: '17px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 16px 0' }}>🔮 Income Stability</h2>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '14px', borderRadius: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'baseline' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Stability Score</span>
                <span style={{ fontSize: '22px', fontWeight: '900', color: stabilityScore > 70 ? '#10B981' : stabilityScore > 40 ? '#F59E0B' : '#EF4444' }}>
                  {Math.round(stabilityScore)}<span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>/100</span>
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${stabilityScore}%`, height: '100%',
                  background: stabilityScore > 70 ? '#10B981' : stabilityScore > 40 ? '#F59E0B' : '#EF4444',
                  transition: 'width 1s ease, background 1s ease'
                }} />
              </div>
            </div>

            <div style={{ fontSize: '13px', color: '#fff', fontWeight: '600', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
              🧠 AI Predictions
            </div>
            {aiAlerts && aiAlerts.length > 0 ? aiAlerts.map((a, i) => (
              <div key={i} style={{ padding: '10px 12px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.18)', borderRadius: '8px', fontSize: '12px', color: '#60A5FA', marginBottom: '8px' }}>
                💡 {a}
              </div>
            )) : (
              <div style={{ padding: '10px 12px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: '8px', fontSize: '12px', color: '#10B981' }}>
                ✓ Predictive horizon clear — earnings likely stable.
              </div>
            )}
          </div>

          {/* Live Telemetry */}
          <div style={{ border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'monospace', lineHeight: '1.8' }}>
              // Live Input Telemetry<br />
              traffic = {traffic} km/h<br />
              rainfall = {weather.rainfall} mm<br />
              aqi = {weather.aqi}<br />
              ai_loss_est = ₹{aiLossEstimate.toFixed(0)}<br />
              orders_active = {orders.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
