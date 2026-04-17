import React, { useState, useEffect } from 'react';

/**
 * FIX 4 – PAYOUT PROCESSING MODAL WITH 3-STAGE ANIMATION
 * 
 * Stage 1 (0-2s): Processing with spinner
 * Stage 2 (2-4s): Verification with checkmark animation
 * Stage 3 (4s+): Success with full receipt
 */

export default function PayoutProcessingModal({ payout, onClose }) {
  const [stage, setStage] = useState(1); // 1 = Processing, 2 = Verifying, 3 = Success
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // Stage 1 → Stage 2 at 2 seconds
    const timer1 = setTimeout(() => {
      setStage(2);
    }, 2000);

    // Stage 2 → Stage 3 at 4 seconds
    const timer2 = setTimeout(() => {
      setStage(3);
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!payout) return null;

  const transactionId = `pay_${Math.random().toString(36).substr(2, 12).toUpperCase()}`;
  const upiRef = `YBL${Math.floor(100000000000000 + Math.random() * 900000000000000)}`;
  const timestamp = new Date().toLocaleString('en-IN');
  const upiId = 'worker.paynest@upi';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)',
      animation: 'fadeIn 0.3s ease both'
    }}>
      <style>{`
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        @keyframes slideUp { 
          from { transform: translateY(30px); opacity: 0; } 
          to { transform: translateY(0); opacity: 1; } 
        }
        @keyframes spin { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        @keyframes checkmark {
          0% { transform: scale(0) rotate(-45deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes slideInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div style={{
        background: '#fff', width: '380px', borderRadius: '20px', overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        animation: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        fontFamily: "'Space Grotesk', sans-serif",
        color: '#1a202c'
      }}>
        {/* ═ STAGE 1: PROCESSING ═ */}
        {stage === 1 && (
          <div style={{ padding: '48px 24px', textAlign: 'center', animation: 'fadeIn 0.4s ease both' }}>
            <div style={{
              width: '50px', height: '50px', border: '4px solid #3b82f6',
              borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 24px',
              animation: 'spin 1.2s linear infinite'
            }} />
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px', color: '#1a202c' }}>
              Processing Instant Payout
            </h3>
            <p style={{ fontSize: '13px', color: '#718096', margin: 0 }}>
              Connecting to UPI banking network...
            </p>
          </div>
        )}

        {/* ═ STAGE 2: VERIFYING ═ */}
        {stage === 2 && (
          <div style={{ padding: '48px 24px', textAlign: 'center', animation: 'slideInUp 0.4s ease both' }}>
            <div style={{
              width: '50px', height: '50px', background: '#dbeafe', borderRadius: '50%',
              margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'checkmark 0.6s ease both'
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px', color: '#1a202c' }}>
              Verifying with bank
            </h3>
            <p style={{ fontSize: '13px', color: '#718096', margin: 0 }}>
              Your payout is being verified...
            </p>
            <div style={{
              marginTop: '16px', fontSize: '12px', color: '#059669', fontWeight: '700',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}>
              <span style={{ width: '8px', height: '8px', background: '#059669', borderRadius: '50%', animation: 'pulse 1.5s ease-in-out infinite' }} />
              Almost there...
            </div>
          </div>
        )}

        {/* ═ STAGE 3: SUCCESS ═ */}
        {stage === 3 && (
          <div style={{ animation: 'slideInUp 0.5s ease both' }}>
            {/* Header: Green success state */}
            <div style={{
              padding: '32px 24px', background: '#f0fdf4', borderBottom: '1px solid #e2e8f0',
              textAlign: 'center', animation: 'fadeIn 0.4s ease both'
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: '64px', height: '64px', background: '#10b981', borderRadius: '50%',
                marginBottom: '16px', animation: 'pulse 0.6s ease-out 1'
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div style={{
                fontSize: '12px', fontWeight: '800', color: '#10b981',
                letterSpacing: '2px', marginBottom: '12px'
              }}>
                ✓ SETTLED
              </div>
              <div style={{
                fontSize: '40px', fontWeight: '900', color: '#10b981',
                marginBottom: '4px'
              }}>
                ₹{payout.amount?.toFixed(0)}
              </div>
              <div style={{ fontSize: '12px', color: '#059669', fontWeight: '600' }}>
                Amount credited to UPI
              </div>
            </div>

            {/* Receipt Details */}
            <div style={{ padding: '24px' }}>
              {/* Transaction Info Grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px',
                marginBottom: '24px'
              }}>
                {/* Transaction ID */}
                <div style={{
                  background: '#f8fafc', padding: '12px', borderRadius: '10px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '11px', color: '#718096', marginBottom: '4px' }}>
                    Transaction ID
                  </div>
                  <div style={{
                    fontSize: '12px', fontWeight: '700', color: '#1a202c',
                    wordBreak: 'break-all', fontFamily: 'monospace'
                  }}>
                    {transactionId}
                  </div>
                </div>

                {/* UPI Ref */}
                <div style={{
                  background: '#f8fafc', padding: '12px', borderRadius: '10px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ fontSize: '11px', color: '#718096', marginBottom: '4px' }}>
                    UPI Ref No.
                  </div>
                  <div style={{
                    fontSize: '12px', fontWeight: '700', color: '#1a202c',
                    wordBreak: 'break-all', fontFamily: 'monospace'
                  }}>
                    {upiRef}
                  </div>
                </div>

                {/* Timestamp */}
                <div style={{
                  background: '#f8fafc', padding: '12px', borderRadius: '10px',
                  border: '1px solid #e2e8f0', gridColumn: '1 / -1'
                }}>
                  <div style={{ fontSize: '11px', color: '#718096', marginBottom: '4px' }}>
                    Settled At
                  </div>
                  <div style={{
                    fontSize: '12px', fontWeight: '700', color: '#1a202c'
                  }}>
                    {timestamp}
                  </div>
                </div>
              </div>

              {/* UPI Account Alert */}
              <div style={{
                background: '#f0fdf4', border: '1px solid #bbf7d0',
                padding: '14px', borderRadius: '10px', fontSize: '12px',
                color: '#166534', marginBottom: '24px', display: 'flex',
                alignItems: 'flex-start', gap: '8px'
              }}>
                <span style={{ fontSize: '18px', marginTop: '-2px' }}>✓</span>
                <div>
                  Amount credited to UPI ID<br />
                  <strong style={{ color: '#059669', fontSize: '13px', fontFamily: 'monospace' }}>
                    {upiId}
                  </strong>
                </div>
              </div>

              {/* Notes */}
              <div style={{
                background: '#f3f4f6', padding: '12px', borderRadius: '10px',
                fontSize: '11px', color: '#6b7280', marginBottom: '24px',
                lineHeight: '1.6'
              }}>
                📌 <strong>Note:</strong> Check your UPI app or bank account for confirmation. Keep this receipt for records.
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                style={{
                  width: '100%', background: '#10b981', color: '#fff',
                  border: 'none', padding: '14px', borderRadius: '10px',
                  fontSize: '14px', fontWeight: '800', cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#059669';
                  e.target.style.boxShadow = '0 6px 16px rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#10b981';
                  e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                }}
              >
                Dismiss Receipt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
