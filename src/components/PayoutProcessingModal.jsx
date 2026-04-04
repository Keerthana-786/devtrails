import React, { useState, useEffect } from 'react'

export default function PayoutProcessingModal({ payout, onClose }) {
  const [step, setStep] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false)

  const steps = [
    { id: 0, label: 'Verifying Parametric Trigger...', sub: 'Confirming sensor data (92mm Rainfall)' },
    { id: 1, label: 'Calculating Predicted Loss...', sub: 'AI running disruption analysis' },
    { id: 2, label: 'Anti-Fraud Check...', sub: 'Clearing compliance & identity' },
    { id: 3, label: 'Initiating UPI Transfer...', sub: 'Connecting to SBI-XXXX1234' }
  ]

  useEffect(() => {
    if (step < steps.length) {
      const timer = setTimeout(() => {
        setStep(prev => prev + 1)
      }, 1200)
      return () => clearTimeout(timer)
    } else {
      setTimeout(() => setIsSuccess(true), 500)
    }
  }, [step])

  if (!payout) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
      animation: 'fadeIn 0.3s ease both'
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes checkmark { 0% { stroke-dashoffset: 50; } 100% { stroke-dashoffset: 0; } }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div style={{
        background: '#111', width: '360px', borderRadius: '24px', overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        animation: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both'
      }}>
        {!isSuccess ? (
          <div style={{ padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ 
              width: '48px', height: '48px', border: '3px solid #f97316', 
              borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 24px',
              animation: 'rotate 1s linear infinite'
            }} />
            
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>
              {steps[step]?.label || 'Completing Transfer...'}
            </h3>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '32px' }}>
              {steps[step]?.sub || 'Securing your instant payout'}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
              {steps.map((s, i) => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: i > step ? 0.3 : 1, transition: 'all 0.3s' }}>
                  <div style={{ 
                    width: '18px', height: '18px', borderRadius: '50%', 
                    border: i === step ? '2px solid #f97316' : (i < step ? 'none' : '2px solid rgba(255,255,255,0.1)'),
                    background: i < step ? '#10b981' : (i === step ? 'transparent' : 'transparent'),
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff'
                  }}>
                    {i < step ? '✓' : ''}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: '600', color: i === step ? '#f97316' : '#fff' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease both' }}>
            <div style={{ background: '#10b981', padding: '40px 24px' }}>
              <div style={{ width: '64px', height: '64px', background: '#fff', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'checkmark 0.5s ease forwards' }}>
                  <polyline points="20 6 9 17 4 12" strokeDasharray="50" strokeDashoffset="50" />
                </svg>
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '900', color: '#fff', margin: 0 }}>Payment Successful!</h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>UPI Transfer Complete</p>
            </div>

            <div style={{ padding: '32px 24px' }}>
              <div style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Amount Transferred</div>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#fff', marginTop: '4px' }}>₹{payout.amount?.toFixed(0)}</div>

              <div style={{ 
                margin: '24px 0', padding: '16px', borderRadius: '16px', 
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: '#888' }}>Transaction ID</span>
                  <span style={{ color: '#fff', fontFamily: 'monospace' }}>{payout.upiRef || 'UPI'+Date.now()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: '#888' }}>To Bank Account</span>
                  <span style={{ color: '#fff' }}>SBI-XXXX1234</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: '#888' }}>UPI ID</span>
                  <span style={{ color: '#fff' }}>hero_gig_1@oksbi</span>
                </div>
              </div>

              <button 
                onClick={onClose}
                style={{
                  width: '100%', background: '#fff', color: '#000', border: 'none',
                  padding: '16px', borderRadius: '14px', fontSize: '15px', fontWeight: '800',
                  cursor: 'pointer', transition: 'transform 0.2s'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Back to Dashboard
              </button>
              
              <div style={{ fontSize: '10px', color: '#555', marginTop: '16px' }}>
                Bank transfer initiated via PayNest Smart Payout Bridge. <br/>
                Parametric insurance trigger verified.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
