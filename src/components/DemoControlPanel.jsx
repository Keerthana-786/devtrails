import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

export default function DemoControlPanel() {
  const { startClaimJourney } = useApp();
  const [disabled, setDisabled] = useState(false);

  const handleTrigger = (triggerConfigs) => {
    setDisabled(true);
    startClaimJourney({
      ...triggerConfigs,
      goToClaims: () => {
        document.getElementById('nav-claims')?.click();
      }
    });
    setTimeout(() => {
      setDisabled(false);
    }, 10000);
  };

  return (
    <>
      {/* FLOATING BADGE */}
      <div 
        title="This is a demonstration. No real money is involved."
        style={{
          position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)',
          background: '#F97316', color: '#fff', padding: '6px 16px', borderRadius: '20px',
          fontWeight: '900', fontSize: '12px', letterSpacing: '1px', boxShadow: '0 4px 12px rgba(249,115,22,0.4)',
          zIndex: 9999, cursor: 'help', display: 'flex', alignItems: 'center', gap: '6px'
        }}
      >
        <span>🎭</span> DEMO MODE
      </div>

      {/* CONTROL PANEL */}
      <div style={{
        position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)',
        background: '#1F2937', border: '1px solid #374151', borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.8)', padding: '16px', zIndex: 9998,
        width: 'auto', display: 'flex', flexDirection: 'column', gap: '12px',
        animation: 'slideUp 0.5s ease-out'
      }}>
        <style>{`@keyframes slideUp { from { transform: translate(-50%, 100px); opacity: 0; } to { transform: translate(-50%, 0); opacity: 1; } }`}</style>
        <div style={{ fontSize: '13px', color: '#9CA3AF', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '1px' }}>
          🎮 Demo Controls — Trigger Events
        </div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button 
            disabled={disabled}
            onClick={() => handleTrigger({ trigger: 'Heavy Rain', value: '42mm/hr', customAmt: 480, claimId: `CLM-2026-${Math.floor(1000+Math.random()*9000)}`, customFraud: 0 })}
            style={{ opacity: disabled ? 0.5 : 1, background: 'rgba(59,130,246,0.2)', border: '1px solid rgba(59,130,246,0.5)', color: '#60A5FA', padding: '10px 16px', borderRadius: '10px', fontWeight: 'bold', cursor: disabled ? 'not-allowed' : 'pointer' }}
          >
            🌧️ Heavy Rain
          </button>
          
          <button 
            disabled={disabled}
            onClick={() => handleTrigger({ trigger: 'Extreme Heat', value: '44.2°C', customAmt: 350, claimId: `CLM-2026-${Math.floor(1000+Math.random()*9000)}`, customFraud: 0 })}
            style={{ opacity: disabled ? 0.5 : 1, background: 'rgba(249,115,22,0.2)', border: '1px solid rgba(249,115,22,0.5)', color: '#FB923C', padding: '10px 16px', borderRadius: '10px', fontWeight: 'bold', cursor: disabled ? 'not-allowed' : 'pointer' }}
          >
            🌡️ Extreme Heat
          </button>

          <button 
            disabled={disabled}
            onClick={() => handleTrigger({ trigger: 'Severe AQI', value: '387 AQI', customAmt: 300, claimId: `CLM-2026-${Math.floor(1000+Math.random()*9000)}`, customFraud: 0 })}
            style={{ opacity: disabled ? 0.5 : 1, background: 'rgba(156,163,175,0.2)', border: '1px solid rgba(156,163,175,0.5)', color: '#D1D5DB', padding: '10px 16px', borderRadius: '10px', fontWeight: 'bold', cursor: disabled ? 'not-allowed' : 'pointer' }}
          >
            😷 Severe AQI
          </button>

          <button 
            disabled={disabled}
            onClick={() => handleTrigger({ trigger: 'Curfew / Strike', value: '85% Order Drop', customAmt: 500, claimId: `CLM-2026-${Math.floor(1000+Math.random()*9000)}`, customFraud: 0 })}
            style={{ opacity: disabled ? 0.5 : 1, background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.5)', color: '#F87171', padding: '10px 16px', borderRadius: '10px', fontWeight: 'bold', cursor: disabled ? 'not-allowed' : 'pointer' }}
          >
            🚫 Curfew / Strike
          </button>

          <button 
            disabled={disabled}
            onClick={() => handleTrigger({ trigger: 'Suspicious Claim', value: 'Multiple Flags', customAmt: 0, customFraud: 75, claimId: `CLM-2026-${Math.floor(1000+Math.random()*9000)}`, rejectReason: 'GPS Spoofing & High Frequency' })}
            style={{ opacity: disabled ? 0.5 : 1, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.5)', color: '#34D399', padding: '10px 16px', borderRadius: '10px', fontWeight: 'bold', cursor: disabled ? 'not-allowed' : 'pointer' }}
          >
            🕵️ Show Fraud
          </button>
        </div>
      </div>
    </>
  );
}