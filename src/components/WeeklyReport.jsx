import React from 'react';
import { useApp } from '../context/AppContext.jsx';

export function WeeklyReport() {
  const { addToast, weeklyPremium } = useApp();

  const report = {
    week: 6,
    period: 'March 29 – April 4, 2026',
    daysWorked: 5,
    disruptions: 1,
    protectedIncome: 480,
    premium: weeklyPremium,
    netBenefit: 480 - weeklyPremium,
    roi: Math.round(((480 - weeklyPremium) / weeklyPremium) * 100)
  };

  const handleShare = () => {
    const text = `📊 This week PayNest protected ₹${report.protectedIncome} of my income from heavy rain. I paid ₹${report.premium} premium. Net benefit: +₹${report.netBenefit}. ROI: ${report.roi}%. 🛵 @PayNest #GigWorkerProtection`;
    navigator.clipboard.writeText(text);
    addToast('📋 Report copied to clipboard! Share it with your fellow riders.', 'success');
  };

  return (
    <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px', marginBottom: '24px' }}>
      <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px', fontFamily: "'Space Grotesk', sans-serif" }}>📊 Weekly Protection Report</h2>
      
      <div style={{ paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '800', color: '#fff', marginBottom: '4px' }}>Week {report.week} Summary</div>
        <div style={{ fontSize: '12px', color: '#64748B' }}>Period: {report.period}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Days worked', val: `${report.daysWorked} of 6` },
          { label: 'Disruption days', val: `${report.disruptions} (Heavy Rain)` },
          { label: 'Income protected', val: `₹${report.protectedIncome}`, color: '#10b981', bold: true },
          { label: 'Premium paid', val: `₹${report.premium.toFixed(2)}`, color: '#ef4444' },
          { label: 'Net benefit', val: `+₹${report.netBenefit.toFixed(2)}`, color: '#10b981', bold: true },
          { label: 'ROI this week', val: `${report.roi}% return`, color: '#f59e0b', bold: true },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span style={{ color: '#94a3b8' }}>{item.label}</span>
            <span style={{ color: item.color || '#fff', fontWeight: item.bold ? '800' : '500' }}>{item.val}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '16px', background: 'rgba(59,130,246,0.05)', borderRadius: '12px', marginBottom: '24px' }}>
        <div style={{ fontSize: '13px', color: '#CBD5E1', lineHeight: '1.5' }}>
          Your protection saved you from losing <strong>₹{report.protectedIncome}</strong> in earnings. That's <strong>{Math.round(report.protectedIncome / report.premium)}×</strong> your weekly premium.
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={handleShare} style={{
          flex: 1, padding: '12px', background: '#10b981', color: '#000', border: 'none', borderRadius: '10px',
          fontWeight: '800', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s'
        }}>
          Share Report 🚀
        </button>
      </div>
    </div>
  );
}
