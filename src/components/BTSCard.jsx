import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export function BTSCard() {
  const { btsScore, btsBreakdown, weeklyPremium, user } = useApp();

  const components = [
    { label: 'Working Consistency', weight: '40%', score: btsBreakdown.consistency, max: 40, desc: 'You work 6 days/week consistently — excellent!' },
    { label: 'Clean Claim Ratio', weight: '25%', score: btsBreakdown.claimRatio, max: 25, desc: '2 claims filed, 0 fraudulent — perfect record!' },
    { label: 'GPS Zone Compliance', weight: '20%', score: btsBreakdown.gps, max: 20, desc: 'Almost always in your registered zone.' },
    { 
      label: 'Document Level', 
      weight: '15%', 
      score: user?.aadhaarUploaded ? 15 : btsBreakdown.docs, 
      max: 15, 
      desc: user?.aadhaarUploaded ? 'Aadhaar verified — full document score!' : 'Upload your vehicle RC to boost this score by +4 points.' 
    },
  ];

  const tiers = [
    { icon: '🆕', name: 'Starter', bts: '<60', prem: '₹25/week', max: '₹1,500' },
    { icon: '✅', name: 'Standard', bts: '60+', prem: '₹20/week', max: '₹2,000' },
    { icon: '⭐', name: 'Trusted', bts: '80+', prem: '₹15/week', max: '₹2,500', active: btsScore >= 80 && btsScore < 95 },
    { icon: '👑', name: 'Elite', bts: '95+', prem: '₹10/week', max: '₹3,000', active: btsScore >= 95 },
  ];

  return (
    <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>🧠 Behavioral Trust Score (BTS)</h2>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981' }}>{btsScore}<span style={{ fontSize: '14px', color: '#64748B' }}>/100</span></div>
          <div style={{ fontSize: '11px', color: '#10b981', fontWeight: '700' }}>⭐ Trusted Tier → ₹{weeklyPremium}/week</div>
        </div>
      </div>

      {/* Breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
        {components.map((comp, i) => (
          <div key={i}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
              <span style={{ fontWeight: '600' }}>{comp.label} <span style={{ color: '#64748B', fontSize: '11px' }}>({comp.weight})</span></span>
              <span style={{ fontWeight: '700' }}>{comp.score}/{comp.max}</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
              <div style={{ width: `${(comp.score / comp.max) * 100}%`, height: '100%', background: '#f59e0b', borderRadius: '3px' }} />
            </div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>"{comp.desc}"</div>
          </div>
        ))}
      </div>

      {/* Goal */}
      <div style={{ padding: '16px', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '12px', marginBottom: '28px' }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#60A5FA', marginBottom: '8px' }}>How to reach Elite tier (BTS 95+):</div>
        <div style={{ fontSize: '12px', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div>→ Upload vehicle RC document (+4 points)</div>
          <div>→ Complete 2 more clean claim cycles (+2 points)</div>
          <div>→ Stay consistent for 2 more months (+1 point)</div>
        </div>
      </div>

      {/* Tier Comparison */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <th style={{ textAlign: 'left', padding: '8px 4px', color: '#64748B' }}>Tier</th>
              <th style={{ textAlign: 'left', padding: '8px 4px', color: '#64748B' }}>BTS</th>
              <th style={{ textAlign: 'left', padding: '8px 4px', color: '#64748B' }}>Premium</th>
              <th style={{ textAlign: 'left', padding: '8px 4px', color: '#64748B' }}>Max Payout</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((t, i) => (
              <tr key={i} style={{ 
                background: t.active ? 'rgba(16,185,129,0.05)' : 'transparent',
                borderBottom: '1px solid rgba(255,255,255,0.02)'
              }}>
                <td style={{ padding: '12px 4px', fontWeight: '700' }}>{t.icon} {t.name}</td>
                <td style={{ padding: '12px 4px' }}>{t.bts}</td>
                <td style={{ padding: '12px 4px', color: '#f59e0b', fontWeight: '700' }}>{t.prem}</td>
                <td style={{ padding: '12px 4px' }}>{t.max}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
