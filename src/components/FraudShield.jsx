import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export function FraudShield() {
  const { fraudScore, honeypotStatus } = useApp();

  const layers = [
    { label: 'Layer 1 — GPS Photo Match', desc: 'Photo coordinates must match zone GPS within 500m', status: '✅ ACTIVE' },
    { label: 'Layer 2 — Speed Analysis', desc: 'Worker must be stationary (speed < 20 km/h) during claim', status: '✅ ACTIVE' },
    { label: 'Layer 3 — Duplicate Claim Block', desc: 'Only 1 claim per disruption event per worker', status: '✅ ACTIVE' },
    { label: 'Layer 4 — Isolation Forest ML', desc: 'AI model scores every claim 0.0–1.0 for fraud probability', status: `✅ ACTIVE (last score: ${fraudScore} — CLEAN)` },
    { label: 'Layer 5 — 🍯 Honeypot Zones (SECRET)', desc: 'Hidden GPS coordinates known only to PayNest. Any claim from a Honeypot coordinate = instant permanent ban.', status: `✅ ${honeypotStatus} — 3 honeypots set in your zone` },
  ];

  const scorePercentage = (fraudScore / 1) * 100;

  return (
    <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px', marginBottom: '24px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px', fontFamily: "'Space Grotesk', sans-serif" }}>🛡️ Honeypot Anti-Fraud System</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {layers.map((layer, i) => (
          <div key={i} style={{ padding: '14px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{layer.label}</span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#10b981' }}>{layer.status}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>{layer.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>Your lifetime fraud score:</span>
          <span style={{ fontSize: '15px', fontWeight: '800', color: fraudScore < 0.3 ? '#10b981' : '#ef4444' }}>{fraudScore} (Clean)</span>
        </div>
        
        <div style={{ height: '12px', background: 'linear-gradient(to right, #10b981, #f59e0b, #ef4444)', borderRadius: '6px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', top: 0, bottom: 0, left: `${scorePercentage}%`, width: '2px', background: '#fff',
            boxShadow: '0 0 8px #fff'
          }} />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '10px', color: '#64748B' }}>
          <span>CLEAN (0.00)</span>
          <span>BANNED (0.70+)</span>
        </div>
        
        <div style={{ marginTop: '16px', fontSize: '11px', color: '#64748B', fontStyle: 'italic', textAlign: 'center' }}>
          "Workers above 0.70 are permanently banned from the platform."
        </div>
      </div>
    </div>
  );
}
