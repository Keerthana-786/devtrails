import React, { useState } from 'react'

// ── Earnings Maximizer Card ───────────────────────────────────────────────────
export function EarningsMaximizer({ latestPayout, onNavigateMap }) {
  const [isNavigating, setIsNavigating] = useState(false)

  if (!latestPayout || !latestPayout.amount) return null

  const insurancePayout = latestPayout.amount
  const nearbyEarnings = 220 // Estimated from safe zone orders
  const totalPossible = insurancePayout + nearbyEarnings
  const extraEarnings = nearbyEarnings

  const handleNavigate = () => {
    setIsNavigating(true)
    if (onNavigateMap) {
      onNavigateMap()
    }
    setTimeout(() => setIsNavigating(false), 1500)
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.05) 100%)',
      border: '1px solid rgba(16,185,129,0.3)',
      borderRadius: '20px',
      padding: '24px',
      marginTop: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Accent glow */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
          <span style={{ fontSize: '24px' }}>💡</span>
          <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
            Don't just sit home — maximize today's earnings
          </h3>
        </div>

        {/* Earnings Breakdown Box */}
        <div style={{
          background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(16,185,129,0.2)',
          borderRadius: '14px', padding: '16px', marginBottom: '16px', fontSize: '14px', color: '#CBD5E1'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Insurance payout received:</span>
            <span style={{ fontWeight: '700', color: '#10b981' }}>₹{insurancePayout}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Nearby safe zone orders:</span>
            <span style={{ fontWeight: '700', color: '#3b82f6' }}>₹{nearbyEarnings} (est.)</span>
          </div>
          <div style={{
            borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '10px',
            display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '700'
          }}>
            <span>Total possible today:</span>
            <span style={{ color: '#f59e0b', fontSize: '16px' }}>₹{totalPossible} 🎯</span>
          </div>
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94A3B8' }}>
            <span>vs staying home:</span>
            <span>₹{insurancePayout}</span>
          </div>
          <div style={{
            marginTop: '8px', paddingTop: '10px', borderTop: '1px dashed rgba(255,255,255,0.1)',
            display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '700'
          }}>
            <span>Extra you can earn:</span>
            <span style={{ color: '#10b981' }}>+₹{extraEarnings}</span>
          </div>
        </div>

        {/* Sub-info */}
        <p style={{ fontSize: '12px', color: '#64748B', margin: '12px 0', lineHeight: '1.4' }}>
          <strong>3 orders waiting in Bandra West (2.1km away)</strong> — estimated earnings ₹65 + ₹80 + ₹75 = ₹{nearbyEarnings}
        </p>

        {/* Navigate Button */}
        <button onClick={handleNavigate} disabled={isNavigating} style={{
          width: '100%', padding: '14px', background: isNavigating
            ? 'rgba(16,185,129,0.5)' : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          color: '#000', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '13px',
          cursor: isNavigating ? 'default' : 'pointer',
          transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          opacity: isNavigating ? 0.8 : 1
        }}>
          <span>{isNavigating ? '🗺️ Loading map...' : '📍 Navigate to Safe Zone'}</span>
        </button>
      </div>
    </div>
  )
}
