import { useApp } from '../context/AppContext.jsx'

// ── Storm Prep Mode for Dashboard ──────────────────────────────────────────────
export function StormPrepMode() {
  const { stormPrepActive, setStormPrepActive, setWalletBalance, addToast } = useApp()

  const forecastData = [
    { label: 'Now', rainfall: 22, emoji: '🌦️', risk: 'Low risk' },
    { label: '+6hrs', rainfall: 31, emoji: '🌧️', risk: 'Medium risk' },
    { label: '+12hrs', rainfall: 58, emoji: '🌧️', risk: 'Medium risk' },
    { label: '+18hrs', rainfall: 74, emoji: '⛈️', risk: 'HIGH RISK', highlight: true },
    { label: '+24hrs', rainfall: 89, emoji: '⛈️', risk: 'HIGH RISK', highlight: true },
    { label: '+30hrs', rainfall: 67, emoji: '🌧️', risk: 'Medium risk' },
    { label: '+36hrs', rainfall: 41, emoji: '🌦️', risk: 'Low risk' },
    { label: '+42hrs', rainfall: 19, emoji: '🌤️', risk: 'Clear' },
  ]

  const handleBuyCoverage = () => {
    setStormPrepActive(true)
    setWalletBalance(prev => Math.max(0, prev - 8))
    addToast('✅ Advance coverage activated! You will receive auto-payout if rain exceeds 60mm tomorrow.', 'success')
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(3,102,214,0.08) 100%)',
      border: '1px solid rgba(59,130,246,0.3)',
      borderRadius: '20px',
      padding: '24px',
      marginBottom: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Accent glow effect */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <span style={{ fontSize: '24px' }}>🌩️</span>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: '700', margin: '0', fontFamily: "'Space Grotesk', sans-serif" }}>
              Storm Prep Mode
            </h2>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
              Buy advance coverage before the storm hits
            </p>
          </div>
        </div>

        {/* 48-hour Forecast Strip */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: '600', color: '#60A5FA', marginBottom: '12px' }}>
            📍 48-Hour Forecast for Your Zone
          </div>
          <div style={{
            display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px',
            scrollBehavior: 'smooth'
          }}>
            {forecastData.map((slot, i) => (
              <div key={`forecast-${i}`} style={{
                flex: '0 0 auto', width: '90px', padding: '12px',
                background: slot.highlight ? 'rgba(239,68,68,0.1)' : 'rgba(0,0,0,0.2)',
                border: slot.highlight ? '1.5px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px', textAlign: 'center', transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '18px', marginBottom: '4px' }}>{slot.emoji}</div>
                <div style={{ fontSize: '11px', fontWeight: '600', marginBottom: '4px' }}>{slot.label}</div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#fff', marginBottom: '3px' }}>
                  {slot.rainfall}mm
                </div>
                <div style={{
                  fontSize: '9px',
                  color: slot.highlight ? '#ef4444' : slot.risk.includes('Medium') ? '#f59e0b' : '#10b981',
                  fontWeight: '600'
                }}>
                  {slot.risk}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Prediction Alert */}
        <div style={{
          background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.3)',
          borderRadius: '14px', padding: '14px', marginBottom: '16px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#60A5FA', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>🔮</span> AI Prediction Active
          </div>
          <p style={{ fontSize: '13px', color: '#CBD5E1', margin: 0, lineHeight: '1.4' }}>
            <strong>Heavy rain predicted tomorrow 6PM–midnight in your zone.</strong> Buy advance coverage NOW for <span style={{ color: '#10b981', fontWeight: '700' }}>₹8</span> instead of ₹20 after it starts. <span style={{ color: '#10b981', fontWeight: '700' }}>You save ₹12</span> by acting early.
          </p>
        </div>

        {/* Buy Button */}
        {!stormPrepActive ? (
          <button onClick={handleBuyCoverage} style={{
            width: '100%', padding: '14px', background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
            color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '13px',
            cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}>
            <span>⚡</span> Buy ₹8 Advance Coverage
          </button>
        ) : (
          <div style={{
            width: '100%', padding: '14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
            color: '#10b981', borderRadius: '12px', fontWeight: '700', fontSize: '13px',
            textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}>
            <span>✅</span> Coverage Active — ₹8 paid
          </div>
        )}
      </div>
    </div>
  )
}
