import React, { useState, useEffect } from 'react';import { useApp } from '../context/AppContext.jsx';

export default function ClaimJourney({ data, onComplete }) {
  const [step, setStep] = useState(1);
  const { user } = useApp();

  const amount = data.customAmt ?? 480;
  const fraudScore = data.customFraud ?? 0;
  const isRejected = fraudScore >= 60;
  const rejectReason = data.rejectReason || 'Policy Violation Detected';

  const claimId = data.claimId || `CLM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const transactionId = data.transactionId || (isRejected ? 'N/A' : `pay_Demo_${Math.random().toString(36).substr(2, 10).toUpperCase()}`);
  const upiRef = data.upiRef || (isRejected ? 'N/A' : `YBL${Math.floor(1000000000000 + Math.random() * 9000000000000)}`);

  useEffect(() => {
    let timer;
    if (step === 1) timer = setTimeout(() => setStep(2), 2000);
    else if (step === 2) timer = setTimeout(() => setStep(3), 2000);
    else if (step === 3) timer = setTimeout(() => {
      if (isRejected) setStep(99);
      else setStep(4);
    }, 3000);
    else if (step === 4) timer = setTimeout(() => setStep(5), 2000);
    else if (step === 5) timer = setTimeout(() => {
      setStep(6);
    }, 2000); 
    return () => clearTimeout(timer);
  }, [step, isRejected]);

  // For step 3 animations
  const [s3Rows, setS3Rows] = useState(0);
  useEffect(() => {
    if (step === 3) {
      setTimeout(() => setS3Rows(1), 600);
      setTimeout(() => setS3Rows(2), 1200);
      setTimeout(() => setS3Rows(3), 1800);
      setTimeout(() => setS3Rows(4), 2400);
    }
  }, [step]);

  const getProgress = () => {
    if (step === 2) return '33%';
    if (step === 3) return '50%';
    if (step === 4) return '66%';
    if (step === 5) return '83%';
    if (step === 6 || step === 99) return '100%';
    return '16%';
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.9)', 
      backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', 
      alignItems: 'center', justifyContent: 'center', fontFamily: "'Space Grotesk', sans-serif"
    }}>
      <style>{`
        @keyframes slideDown { from { transform: translateY(-50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulseAlert { 0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.7); } 70% { box-shadow: 0 0 0 10px rgba(239,68,68,0); } 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); } }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>

      {/* STEP 1 */}
      {step === 1 && (
        <div style={{
          position: 'absolute', top: '40px', background: '#374151', color: '#fff', 
          padding: '24px 32px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          animation: 'slideDown 0.5s ease-out forwards', display: 'flex', alignItems: 'center', gap: '16px',
          border: '1px solid #4B5563'
        }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#EF4444', animation: 'pulseAlert 1.5s infinite' }} />
          <div>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#FCA5A5' }}>⚠️ {data.trigger} Detected</div>
            <div style={{ fontSize: '14px', color: '#D1D5DB', marginTop: '4px' }}>Location: {user.zone} ({user.pincode})</div>
            <div style={{ fontSize: '14px', color: '#D1D5DB', marginTop: '2px' }}>Measured: {data.value}</div>
            <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '6px' }}>Source: OpenWeatherMap API • {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
      )}

      {/* STEPS 2 - 5 Cards */}
      {step > 1 && step < 6 && step !== 99 && (
        <div style={{
          background: '#1F2937', border: '1px solid #374151', borderRadius: '24px', 
          width: '450px', overflow: 'hidden', animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{ height: '6px', background: '#374151', width: '100%' }}>
            <div style={{ height: '100%', background: '#3B82F6', width: getProgress(), transition: 'width 0.5s ease-in-out' }} />
          </div>
          
          <div style={{ padding: '32px' }}>
            {step === 2 && (
              <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                <h2 style={{ color: '#fff', margin: '0 0 16px', fontSize: '22px' }}>📋 Claim Automatically Created</h2>
                <div style={{ background: '#111827', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #3B82F6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#9CA3AF', fontSize: '13px' }}>Claim ID</span>
                    <span style={{ color: '#60A5FA', fontSize: '14px', fontWeight: 'bold' }}>{claimId}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ color: '#9CA3AF', fontSize: '13px' }}>Worker</span>
                    <span style={{ color: '#F3F4F6', fontSize: '13px' }}>{user.name} | {user.platform}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF', fontSize: '13px' }}>Event</span>
                    <span style={{ color: '#F3F4F6', fontSize: '13px' }}>{data.trigger} | {user.pincode}</span>
                  </div>
                </div>
                <div style={{ color: '#60A5FA', fontSize: '14px', textAlign: 'center', padding: '12px', background: 'rgba(59,130,246,0.1)', borderRadius: '8px' }}>
                  Zero action required from worker
                </div>
              </div>
            )}

            {step === 3 && (
               <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                 <h2 style={{ color: '#fff', margin: '0 0 24px', fontSize: '22px' }}>🤖 AI Fraud Analysis</h2>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', fontSize: '13px', color: '#D1D5DB', fontFamily: 'monospace' }}>
                   <div>🔍 GPS Verification............ {s3Rows >= 1 && <span style={{ color: isRejected ? '#EF4444' : '#10B981', fontWeight: 'bold' }}>{isRejected ? '❌ FAIL — Spoofed GPS Detected' : '✅ PASS — Worker confirmed in flood zone'}</span>}</div>
                   <div>🔍 Claim Frequency............. {s3Rows >= 2 && <span style={{ color: isRejected ? '#EF4444' : '#10B981', fontWeight: 'bold' }}>{isRejected ? '❌ FAIL — 5 claims in 7 days' : '✅ PASS — 1 claim this week (limit: 3)'}</span>}</div>
                   <div>🔍 Duplicate Check............. {s3Rows >= 3 && <span style={{ color: '#10B981', fontWeight: 'bold' }}>✅ PASS — No duplicate event found</span>}</div>
                   <div>🔍 Historical Pattern.......... {s3Rows >= 4 && <span style={{ color: '#10B981', fontWeight: 'bold' }}>✅ PASS — Account in good standing (180 days)</span>}</div>
                 </div>
                 {s3Rows >= 4 && (
                   <div style={{ background: isRejected ? '#450a0a' : '#064E3B', color: isRejected ? '#EF4444' : '#34D399', padding: '12px', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold', fontSize: '15px', animation: 'fadeIn 0.3s' }}>
                     🤖 AI Fraud Score: {fraudScore} / 100 — {isRejected ? 'REJECTED ❌' : 'CLEAN ✅'}
                   </div>
                 )}
               </div>
            )}

            {step === 4 && (
               <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
                 <div style={{ background: '#064E3B', padding: '16px', borderRadius: '12px', textAlign: 'center', marginBottom: '24px', border: '1px solid #10B981' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>✅</div>
                    <h2 style={{ color: '#fff', margin: '0', fontSize: '18px' }}>Claim Approved — AI Confidence: 99.2%</h2>
                 </div>
                 <div style={{ background: '#111827', padding: '20px', borderRadius: '12px', color: '#E5E7EB', fontSize: '14px', lineHeight: '1.8' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Daily average:</span> <strong>₹900</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Hours disrupted:</span> <strong>5 hrs (3:00 PM – 8:00 PM)</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Coverage rate:</span> <strong>60%</strong></div>
                    <div style={{ borderTop: '1px solid #374151', margin: '12px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10B981', fontSize: '18px' }}><span>Payout:</span> <strong>₹{amount} ✅</strong></div>
                 </div>
               </div>
            )}

            {step === 5 && (
               <div style={{ textAlign: 'center', animation: 'fadeIn 0.3s ease-out', padding: '20px 0' }}>
                 <div style={{ width: '60px', height: '60px', border: '4px solid #374151', borderTopColor: '#3B82F6', borderRadius: '50%', margin: '0 auto 24px', animation: 'spin 1s linear infinite' }} />
                 <h2 style={{ color: '#fff', margin: '0 0 12px', fontSize: '20px' }}>Transferring ₹{amount}</h2>
                 <div style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '8px' }}>To: {user.upi_id || 'raju.swiggy@upi'}</div>
                 <div style={{ color: '#60A5FA', fontSize: '13px', marginBottom: '20px' }}>Via: Razorpay Instant Payout</div>
                 <div style={{ color: '#E5E7EB', fontSize: '14px', fontWeight: 'bold' }}>Processing...</div>
               </div>
            )}
          </div>
        </div>
      )}

      {/* REJECTED (Step 99) */}
      {step === 99 && (
         <div style={{ background: '#1F2937', border: '1px solid #374151', borderRadius: '24px', width: '450px', padding: '32px', animation: 'fadeIn 0.3s ease-out' }}>
           <div style={{ background: '#450a0a', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '1px solid #EF4444' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚫</div>
              <h2 style={{ color: '#FCA5A5', margin: '0 0 8px', fontSize: '24px' }}>CLAIM REJECTED</h2>
              <div style={{ color: '#FECACA', fontSize: '14px' }}>Reason: {rejectReason}</div>
           </div>
           <button onClick={() => { 
                data.goToClaims && data.goToClaims(); 
                onComplete({...data, claimId, fraudScore, amount: 0, status: 'BLOCKED', verdict: 'REJECTED'}); 
            }} style={{ width: '100%', marginTop: '24px', padding: '16px', background: '#374151', border: 'none', color: '#fff', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
             ✕ Close & Return to Dashboard
           </button>
         </div>
      )}

      {/* STEP 6 - Receipt */}
      {step === 6 && (
        <div style={{ animation: 'fadeIn 0.5s ease-out', width: '450px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', padding: '32px', color: '#111827', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', background: '#10B981', borderRadius: '50%', marginBottom: '12px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#10B981', letterSpacing: '1px' }}>✅ PAYMENT SUCCESSFUL</div>
            </div>
            
            <table style={{ width: '100%', fontSize: '14px', lineHeight: '2.2' }}>
              <tbody>
                <tr><td style={{ color: '#6B7280' }}>Amount</td><td style={{ fontWeight: 'bold', textAlign: 'right', fontSize: '18px' }}>₹{amount}</td></tr>
                <tr><td style={{ color: '#6B7280' }}>To UPI</td><td style={{ fontWeight: 'bold', textAlign: 'right' }}>{user.upi_id || 'raju.swiggy@upi'}</td></tr>
                <tr><td style={{ color: '#6B7280' }}>Transaction ID</td><td style={{ fontWeight: 'bold', textAlign: 'right', fontFamily: 'monospace' }}>{transactionId}</td></tr>
                <tr><td style={{ color: '#6B7280' }}>UPI Ref No.</td><td style={{ fontWeight: 'bold', textAlign: 'right', fontFamily: 'monospace' }}>{upiRef}</td></tr>
                <tr><td style={{ color: '#6B7280' }}>Date & Time</td><td style={{ fontWeight: 'bold', textAlign: 'right' }}>{new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</td></tr>
                <tr><td style={{ color: '#6B7280' }}>Status</td><td style={{ fontWeight: 'bold', color: '#10B981', textAlign: 'right' }}>SETTLED ✅</td></tr>
                <tr><td style={{ color: '#6B7280' }}>Claim ID</td><td style={{ fontWeight: 'bold', textAlign: 'right' }}>{claimId}</td></tr>
                <tr><td style={{ color: '#6B7280' }}>Trigger</td><td style={{ fontWeight: 'bold', textAlign: 'right' }}>{data.trigger} {data.value}</td></tr>
                <tr><td style={{ color: '#6B7280' }}>Zone</td><td style={{ fontWeight: 'bold', textAlign: 'right' }}>{user.zone}, {user.city}</td></tr>
              </tbody>
            </table>

            <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#EF4444', marginTop: '24px', padding: '12px', textAlign: 'center', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px' }}>
              ⚠️ DEMO — No real money transferred
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            <button onClick={() => window.print()} style={{ width: '100%', padding: '16px', background: 'transparent', border: '2px solid #10B981', color: '#10B981', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              📄 Download Demo Receipt
            </button>
            <button onClick={() => { 
                data.goToClaims && data.goToClaims(); 
                onComplete({...data, claimId, amount, fraudScore, transactionId, upiRef, status: 'SETTLED', verdict: 'AUTO APPROVED'}); 
            }} style={{ width: '100%', padding: '16px', background: '#374151', border: 'none', color: '#fff', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
              ✕ Close & Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
