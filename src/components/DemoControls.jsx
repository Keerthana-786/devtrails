import React, { useState, useEffect } from 'react';
import { Play, CloudRain, Thermometer, Wind, AlertCircle, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

const DemoControls = () => {
  const { isDemo, triggerClaim, worker } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [cooldown, setCooldown] = useState({});

  if (!isDemo) return null;

  const startCooldown = (type) => {
    setCooldown(prev => ({ ...prev, [type]: 12 }));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCooldown(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          if (next[key] > 0) next[key] -= 1;
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const Triggers = [
    { id: 'HEAVY_RAIN', label: 'Trigger Heavy Rain', icon: <CloudRain size={16} />, color: '#3B82F6', value: '42mm/hr' },
    { id: 'EXTREME_HEAT', label: 'Trigger Extreme Heat', icon: <Thermometer size={16} />, color: '#F59E0B', value: '44°C' },
    { id: 'SEVERE_AQI', label: 'Trigger Severe AQI', icon: <Wind size={16} />, color: '#8B5CF6', value: '382' },
    { id: 'CURFEW', label: 'Trigger Curfew', icon: <AlertCircle size={16} />, color: '#EF4444', value: 'Stay Home' },
    { id: 'FRAUD', label: 'Test Fraud Detection', icon: <ShieldAlert size={16} />, color: '#6366F1', value: 'Spoofing' },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '12px'
    }}>
      {isExpanded && (
        <div className="card" style={{
          width: '280px',
          background: 'var(--card-bg)',
          padding: '24px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          border: '1px solid var(--primary)',
          animation: 'slideUp 0.3s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Demo Controls <span style={{ fontSize: '10px', padding: '2px 6px', background: 'var(--warning)', color: 'black', borderRadius: '4px', fontWeight: 'bold' }}>DEMO</span>
            </h4>
            <button onClick={() => setIsExpanded(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>✕</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Triggers.map((t) => (
              <button
                key={t.id}
                disabled={cooldown[t.id] > 0}
                onClick={() => {
                  triggerClaim(t.id, t.value);
                  startCooldown(t.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: cooldown[t.id] > 0 ? 'rgba(255,255,255,0.05)' : `${t.color}20`,
                  border: `1px solid ${cooldown[t.id] > 0 ? 'transparent' : `${t.color}50`}`,
                  borderRadius: '12px',
                  color: cooldown[t.id] > 0 ? 'var(--text-muted)' : 'white',
                  cursor: cooldown[t.id] > 0 ? 'not-allowed' : 'pointer',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
              >
                <div style={{ color: cooldown[t.id] > 0 ? 'var(--text-muted)' : t.color }}>{t.icon}</div>
                <span style={{ flex: 1 }}>{t.label}</span>
                {cooldown[t.id] > 0 && <span style={{ fontSize: '11px', opacity: 0.6 }}>{cooldown[t.id]}s</span>}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--card-border)', fontSize: '11px', color: 'var(--text-muted)' }}>
            <p><strong>Worker:</strong> {worker?.name || 'Guest'} | {worker?.platform || 'N/A'}</p>
            <p><strong>Zone:</strong> {worker?.city || 'N/A'} ({worker?.pincode || '000000'})</p>
            <p><strong>Policy:</strong> {worker?.tier?.toUpperCase() || 'STANDARD'} — Active</p>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          padding: '12px 20px',
          background: 'var(--primary)',
          color: 'white',
          border: 'none',
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(108, 99, 255, 0.4)',
          animation: isExpanded ? 'none' : 'shake 4s infinite'
        }}
      >
        <Play size={18} fill="white" />
        DEMO
      </button>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 80%, 100% { transform: translateX(0); }
          85%, 95% { transform: translateX(-5px); }
          90% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default DemoControls;
