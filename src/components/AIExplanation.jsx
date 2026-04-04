import React, { useState } from 'react';

export function AIExplanation({ explanation }) {
  const [lang, setLang] = useState('en');

  if (!explanation) return null;

  const languages = [
    { id: 'en', label: 'English' },
    { id: 'hi', label: 'हिंदी' },
    { id: 'ta', label: 'தமிழ்' },
    { id: 'te', label: 'తెలుగు' },
  ];

  const content = explanation[lang] || explanation['en'];

  return (
    <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '20px', padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>🤖 AI Payout Explanation Engine</h2>
        <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '10px' }}>
          {languages.map(l => (
            <button
              key={l.id}
              onClick={() => setLang(l.id)}
              style={{
                padding: '6px 12px', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: '700',
                background: lang === l.id ? '#f59e0b' : 'transparent',
                color: lang === l.id ? '#000' : '#64748B',
                cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Main Explanation */}
        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <div style={{ fontSize: '12px', fontWeight: '800', color: '#f59e0b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {lang === 'en' ? 'Decision Analysis' : lang === 'hi' ? 'निर्णय विश्लेषण' : lang === 'ta' ? 'முடிவு பகுப்பாய்வு' : 'నిర్ణయ విశ్లేషణ'}
          </div>
          <p style={{ fontSize: '14px', color: '#fff', lineHeight: '1.8', whiteSpace: 'pre-line', margin: 0 }}>
            {content}
          </p>
        </div>

        {/* Verification Success */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '14px' }}>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#10b981', marginBottom: '4px' }}>✅ Auto-Approved</div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>Decision time: 8 minutes 23 seconds. No forms needed.</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: '14px' }}>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#3b82f6', marginBottom: '4px' }}>💳 Funds Credited</div>
            <div style={{ fontSize: '12px', color: '#64748B' }}>₹480 successfully sent to your registered UPI ID.</div>
          </div>
        </div>
      </div>
    </div>
  );
}