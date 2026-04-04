import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useApp } from '../context/AppContext.jsx'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// ── Hourly risk for 24h based on typical rain/traffic patterns ───────────────
function getHourlyRisk(hour, rainfall, traffic) {
  const trafficRisk = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20) ? 0.7 : 0.2
  const rainRisk = rainfall > 60 ? 0.9 : rainfall > 30 ? 0.6 : rainfall > 10 ? 0.3 : 0.1
  const combined = trafficRisk * 0.4 + rainRisk * 0.6
  if (combined > 0.65) return 'HIGH'
  if (combined > 0.35) return 'MEDIUM'
  return 'LOW'
}

const RISK_COLOR = { HIGH: '#EF4444', MEDIUM: '#F59E0B', LOW: '#10B981' }
const RISK_LABEL = { HIGH: 'Risky', MEDIUM: 'Caution', LOW: 'Safe' }

export default function Insights() {
  const {
    weather, traffic, aiLossEstimate, weeklyPremium,
    aiAlerts, stabilityScore, token,
    safeZones, expectedLossProbability,
    whatIfRainfall, setWhatIfRainfall,
    whatIfTraffic, setWhatIfTraffic,
  } = useApp()

  const [showWhatIf, setShowWhatIf] = useState(false)
  const [mlWhatIf, setMlWhatIf] = useState(null)   // ML API what-if results
  const [mlWhatIfLoading, setMlWhatIfLoading] = useState(false)
  const debounceRef = useRef(null)
  const currentHour = new Date().getHours()

  // ── ML-powered What-If: debounced API call when sliders change ────────────
  // PARAMETRIC COMPLIANCE: What-If inputs are hypothetical only and only used
  // for display. Real payouts are always sourced from verified external APIs.
  useEffect(() => {
    if (!showWhatIf) return
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      setMlWhatIfLoading(true)
      try {
        const [premRes, lossRes] = await Promise.all([
          fetch(`${API_BASE}/predict/dynamic-pricing`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
              base_premium: 76.50,
              zone_lat: 19.0760, zone_lng: 72.8777,
              worker_experience_months: 6,
              vehicle_type: 'bike',
              historical_safety_score: 0.8,
              current_weather_risk: whatIfRainfall > 50 ? 0.9 : whatIfRainfall > 30 ? 0.6 : 0.2,
              traffic_congestion_index: whatIfTraffic < 15 ? 0.9 : whatIfTraffic < 25 ? 0.5 : 0.2,
              time_of_day: new Date().getHours(),
              day_of_week: new Date().getDay()
            })
          }),
          fetch(`${API_BASE}/predict/loss`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
              hourly_rate: 80, 
              normal_work_hours: 8,
              rainfall_mm: parseFloat(whatIfRainfall),
              traffic_disruption: whatIfTraffic < 20 ? 0.8 : 0.2,
              aqi: weather.aqi || 85,
              day_of_week: new Date().getDay(),
              is_peak_hour: 1, 
              city_index: 2
            })
          })
        ])
        const premData = premRes.ok ? await premRes.json() : null
        const lossData = lossRes.ok ? await lossRes.json() : null
        setMlWhatIf({
          premium: premData?.dynamic_premium_inr || null,
          loss: lossData?.predicted_income_loss_inr || null,
          source: 'ML'
        })
      } catch {
        // Fallback to client-side estimates if ML unreachable
        const rainMult = whatIfRainfall > 80 ? 1.5 : whatIfRainfall > 50 ? 1.3 : whatIfRainfall > 30 ? 1.1 : 1.0
        const trafficMult = whatIfTraffic < 10 ? 1.3 : whatIfTraffic < 20 ? 1.15 : 1.0
        const rainLoss = whatIfRainfall > 80 ? 380 : whatIfRainfall > 50 ? 220 : whatIfRainfall > 30 ? 120 : 0
        const tLoss = whatIfTraffic < 10 ? 160 : whatIfTraffic < 20 ? 90 : 0
        setMlWhatIf({
          premium: +(weeklyPremium * rainMult * trafficMult).toFixed(2),
          loss: rainLoss + tLoss,
          source: 'estimate'
        })
      }
      setMlWhatIfLoading(false)
    }, 700) // 700ms debounce — avoids hammering API on every slider tick
    return () => clearTimeout(debounceRef.current)
  }, [whatIfRainfall, whatIfTraffic, showWhatIf, token])

  // 24h hourly risk timeline
  const hourlyRisks = useMemo(() => {
    return Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      label: h === 0 ? '12a' : h < 12 ? `${h}a` : h === 12 ? '12p' : `${h - 12}p`,
      risk: getHourlyRisk(h, weather.rainfall, traffic),
      isCurrent: h === currentHour,
    }))
  }, [weather.rainfall, traffic, currentHour])

  // Weekly pattern: 7-day safe/risky prediction
  const weeklyPattern = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    return days.map((d, i) => {
      const isWeekend = i >= 5
      const predictedRain = isWeekend ? weather.rainfall * 0.6 : weather.rainfall
      const predictedTraffic = isWeekend ? traffic * 1.4 : traffic
      const risk = getHourlyRisk(9, predictedRain, predictedTraffic)
      const predictedLoss = isWeekend ? aiLossEstimate * 0.5 : aiLossEstimate
      return { day: d, risk, predictedLoss: Math.round(predictedLoss), safeHours: risk === 'LOW' ? 10 : risk === 'MEDIUM' ? 6 : 3 }
    })
  }, [weather.rainfall, traffic, aiLossEstimate])

  // Smart decisions
  const safeHours = hourlyRisks.filter(h => h.risk === 'LOW').map(h => h.label)
  const riskyHours = hourlyRisks.filter(h => h.risk === 'HIGH').map(h => h.label)

  const card = (children, style = {}) => (
    <div style={{
      background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '20px', padding: '24px', ...style
    }}>
      {children}
    </div>
  )

  const sectionTitle = (text) => (
    <h2 style={{ fontSize: '17px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 18px 0' }}>
      {text}
    </h2>
  )

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', fontFamily: "'Outfit', sans-serif" }}>

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 8px 0' }}>
          🧠 AI Insights
        </h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Real-time risk intelligence powered by ML models.</p>
      </div>

      {/* ROW 1: Income prediction + Stability */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '24px' }}>
        {card(
          <>
            {sectionTitle('💸 Income at Risk Today')}
            <div style={{ fontSize: '36px', fontWeight: '900', color: aiLossEstimate > 0 ? '#EF4444' : '#10B981', marginBottom: '8px' }}>
              {aiLossEstimate > 0 ? `₹${Math.round(aiLossEstimate)}` : '₹0'}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', flexWrap: 'wrap', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <span>
                {aiLossEstimate > 0
                  ? 'ML model predicts income disruption today. Parametric coverage active.'
                  : 'No disruptions predicted. Expected earnings on track.'}
              </span>
              <span style={{ color: expectedLossProbability > 60 ? '#EF4444' : '#10B981', fontWeight: 700 }}>
                {expectedLossProbability}% chance of loss
              </span>
            </div>
          </>
        )}
        {card(
          <>
            {sectionTitle('📊 Stability Score')}
            <div style={{ fontSize: '36px', fontWeight: '900', color: stabilityScore > 70 ? '#10B981' : stabilityScore > 40 ? '#F59E0B' : '#EF4444', marginBottom: '8px' }}>
              {Math.round(stabilityScore)}<span style={{ fontSize: '16px', color: 'var(--text-secondary)' }}>/100</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${stabilityScore}%`, height: '100%', background: stabilityScore > 70 ? '#10B981' : stabilityScore > 40 ? '#F59E0B' : '#EF4444', transition: 'width 1s ease' }} />
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
              {stabilityScore > 70 ? 'Earnings stable — good conditions.' : stabilityScore > 40 ? 'Moderate disruption risk.' : 'High disruption risk — AI coverage triggered.'}
            </div>
          </>
        )}
        {card(
          <>
            {sectionTitle('🌡️ Live Conditions')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Rainfall', value: `${weather.rainfall} mm`, bar: Math.min(100, weather.rainfall), clr: weather.rainfall > 50 ? '#EF4444' : weather.rainfall > 20 ? '#F59E0B' : '#10B981' },
                { label: 'Traffic Speed', value: `${traffic} km/h`, bar: Math.min(100, traffic * 2), clr: traffic < 20 ? '#EF4444' : traffic < 35 ? '#F59E0B' : '#10B981' },
                { label: 'AQI', value: `${weather.aqi}`, bar: Math.min(100, weather.aqi / 5), clr: weather.aqi > 200 ? '#EF4444' : weather.aqi > 100 ? '#F59E0B' : '#10B981' },
              ].map(({ label, value, bar, clr }) => (
                <div key={label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                    <span style={{ color: clr, fontWeight: '700' }}>{value}</span>
                  </div>
                  <div style={{ height: '5px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${bar}%`, height: '100%', background: clr, transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ROW 2: Hourly Timeline */}
      {card(
        <>
          {sectionTitle('⏱️ 24-Hour Risk Timeline')}
          <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '80px', overflowX: 'auto', paddingBottom: '8px' }}>
            {hourlyRisks.map(h => (
              <div key={h.hour} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', minWidth: '34px', flex: 1 }}>
                <div
                  title={`${h.label}: ${RISK_LABEL[h.risk]}`}
                  style={{
                    width: '100%', height: h.risk === 'HIGH' ? '60px' : h.risk === 'MEDIUM' ? '38px' : '20px',
                    background: RISK_COLOR[h.risk],
                    borderRadius: '4px 4px 0 0',
                    opacity: h.isCurrent ? 1 : 0.6,
                    boxShadow: h.isCurrent ? `0 0 10px ${RISK_COLOR[h.risk]}` : 'none',
                    transition: 'height 0.4s ease',
                    position: 'relative',
                  }}
                >
                  {h.isCurrent && (
                    <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', fontSize: '9px', color: '#fff', fontWeight: 'bold', whiteSpace: 'nowrap' }}>NOW</div>
                  )}
                </div>
                <div style={{ fontSize: '9px', color: h.isCurrent ? '#fff' : '#475569' }}>{h.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '11px', color: 'var(--text-secondary)' }}>
            {Object.entries(RISK_COLOR).map(([k, c]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: c }} />
                {RISK_LABEL[k]}
              </div>
            ))}
          </div>
        </>,
        { marginBottom: '24px' }
      )}

      {/* ROW 3: Smart Decisions + Weekly Pattern */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {card(
          <>
            {sectionTitle('🎯 Smart Decisions')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {safeHours.length > 0 && (
                <div style={{ padding: '14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#10B981', marginBottom: '4px' }}>✅ Best Hours to Work</div>
                  <div style={{ fontSize: '12px', color: '#CBD5E1' }}>
                    {safeHours.slice(0, 6).join(', ')} — low disruption probability
                  </div>
                </div>
              )}
              {riskyHours.length > 0 && (
                <div style={{ padding: '14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#EF4444', marginBottom: '4px' }}>⚠️ Avoid These Hours</div>
                  <div style={{ fontSize: '12px', color: '#CBD5E1' }}>
                    {riskyHours.slice(0, 4).join(', ')} — high traffic + rain risk
                  </div>
                </div>
              )}
              {aiAlerts.length > 0 && aiAlerts.slice(0, 2).map((a, i) => (
                <div key={i} style={{ padding: '12px 14px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '10px', fontSize: '12px', color: '#60A5FA' }}>
                  💡 {a}
                </div>
              ))}
              {/* Smart Break Suggestion */}
              <div style={{ padding: '14px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#F59E0B', marginBottom: '6px' }}>☕ AI Break Optimizer</div>
                <div style={{ fontSize: '12px', color: '#CBD5E1', lineHeight: '1.4' }}>
                  {riskyHours.length > 4
                    ? "ML predicts severe disruption between 5-7 PM. AI suggests taking a 90-min break; parametric payout will offset the gap."
                    : "Stable window detected. Continue working to capitalize on low-traffic surge. Next high-risk window in 6+ hours."}
                </div>
              </div>
            </div>
          </>
        )}

        {card(
          <>
            {sectionTitle('📅 Weekly Risk Pattern')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {weeklyPattern.map(({ day, risk, predictedLoss, safeHours }) => (
                <div key={day} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '32px', fontSize: '12px', color: 'var(--text-secondary)', flexShrink: 0 }}>{day}</div>
                  <div style={{ flex: 1, height: '24px', background: 'rgba(255,255,255,0.04)', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
                    <div style={{
                      width: `${(safeHours / 12) * 100}%`, height: '100%',
                      background: RISK_COLOR[risk], opacity: 0.7, transition: 'width 0.6s ease'
                    }} />
                  </div>
                  <div style={{ fontSize: '11px', color: RISK_COLOR[risk], fontWeight: '700', minWidth: '50px', textAlign: 'right' }}>
                    {predictedLoss > 0 ? `-₹${predictedLoss}` : '✓ Safe'}
                  </div>
                  <div style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', background: `${RISK_COLOR[risk]}22`, color: RISK_COLOR[risk] }}>
                    {RISK_LABEL[risk]}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {card(
        <>
          {sectionTitle('🗺️ Next 3-Day Optimal Earnings Zones')}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            {safeZones.slice(0, 3).map(zone => (
              <div key={zone} style={{ padding: '16px', background: 'rgba(255,255,255,0.04)', borderRadius: '16px' }}>
                <div style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>{zone}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Predicted to deliver lower loss probability and a more stable earning window.
                </div>
              </div>
            ))}
          </div>
        </>,
        { marginBottom: '24px' }
      )}

      {/* ROW 4: What-If Simulator */}
      <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px dashed rgba(59,130,246,0.3)', borderRadius: '20px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showWhatIf ? '20px' : 0 }}>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>
              🔬 What-If Simulator
              <span style={{ fontSize: '11px', background: 'rgba(59,130,246,0.2)', color: '#60A5FA', padding: '2px 8px', borderRadius: '6px', marginLeft: '10px' }}>HIDDEN FEATURE</span>
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>Sliders change simulate ML inputs — the AI model recalculates premium + loss automatically via API.</div>
          </div>
          <button
            onClick={() => setShowWhatIf(v => !v)}
            style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', color: '#60A5FA', padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
          >
            {showWhatIf ? 'Hide ▲' : 'Open Simulator ▼'}
          </button>
        </div>

        {showWhatIf && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
            {/* Rainfall Slider */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '12px', color: '#94A3B8' }}>
                🌧 Simulated Rainfall: <span style={{ color: '#60A5FA' }}>{whatIfRainfall} mm</span>
              </div>
              <input
                type="range" min={0} max={120} value={whatIfRainfall}
                onChange={e => setWhatIfRainfall(+e.target.value)}
                style={{ width: '100%', accentColor: '#3B82F6' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#475569', marginTop: '4px' }}>
                <span>0 mm</span><span>60 mm</span><span>120 mm</span>
              </div>
            </div>

            {/* Traffic Slider */}
            <div>
              <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '12px', color: '#94A3B8' }}>
                🚗 Traffic Speed: <span style={{ color: '#60A5FA' }}>{whatIfTraffic} km/h</span>
              </div>
              <input
                type="range" min={5} max={60} value={whatIfTraffic}
                onChange={e => setWhatIfTraffic(+e.target.value)}
                style={{ width: '100%', accentColor: '#3B82F6' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#475569', marginTop: '4px' }}>
                <span>Jam (5)</span><span>Avg (30)</span><span>Clear (60)</span>
              </div>
            </div>

            {/* Impact Results — prefer ML result, fall back to estimate */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '14px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Estimated Weekly Premium</div>
                  {mlWhatIf && <div style={{ fontSize: '9px', color: mlWhatIf.source === 'ML' ? '#10B981' : '#F59E0B' }}>{mlWhatIf.source === 'ML' ? '🤖 ML' : '📐 Est.'}</div>}
                </div>
                {mlWhatIfLoading ? (
                  <div style={{ fontSize: '13px', color: '#475569' }}>Calling ML model...</div>
                ) : (
                  <div style={{ fontSize: '22px', fontWeight: '800', color: (mlWhatIf?.premium || weeklyPremium) > weeklyPremium ? '#EF4444' : '#10B981' }}>
                    ₹{(mlWhatIf?.premium ?? weeklyPremium).toFixed(2)}
                    <span style={{ fontSize: '12px', marginLeft: '6px', color: 'var(--text-secondary)' }}>
                      ({((mlWhatIf?.premium ?? weeklyPremium) - weeklyPremium) >= 0 ? '+' : ''}{((mlWhatIf?.premium ?? weeklyPremium) - weeklyPremium).toFixed(2)})
                    </span>
                  </div>
                )}
              </div>
              <div style={{ padding: '14px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Estimated Income Loss</div>
                  {mlWhatIf && <div style={{ fontSize: '9px', color: mlWhatIf.source === 'ML' ? '#10B981' : '#F59E0B' }}>{mlWhatIf.source === 'ML' ? '🤖 ML' : '📐 Est.'}</div>}
                </div>
                {mlWhatIfLoading ? (
                  <div style={{ fontSize: '13px', color: '#475569' }}>Calling ML model...</div>
                ) : (
                  <div style={{ fontSize: '22px', fontWeight: '800', color: (mlWhatIf?.loss ?? 0) > 0 ? '#EF4444' : '#10B981' }}>
                    {(mlWhatIf?.loss ?? 0) > 0 ? `₹${Math.round(mlWhatIf?.loss ?? 0)}` : '₹0 — No disruption'}
                  </div>
                )}
              </div>
              {(mlWhatIf?.loss ?? 0) > 200 && (
                <div style={{ fontSize: '11px', color: '#F59E0B', padding: '8px 12px', background: 'rgba(245,158,11,0.1)', borderRadius: '8px' }}>
                  ⚠️ These conditions would trigger auto-claim processing.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
