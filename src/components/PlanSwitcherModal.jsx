import React from 'react';
import { Shield, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

const PlanSwitcherModal = ({ isOpen, onClose }) => {
  const { worker, setWorker } = useApp();

  if (!isOpen) return null;

  const tiers = [
    { id: 'basic', name: 'Silver Shield', mult: 0.6, coverage: 300, premium: 29, desc: 'Essential protection.' },
    { id: 'standard', name: 'Gold Shield', mult: 1.0, coverage: 500, premium: 49, desc: 'Recommended level.' },
    { id: 'pro', name: 'Platinum Shield', mult: 1.6, coverage: 800, premium: 79, desc: 'Maximum protection.' }
  ];

  const handleUpdate = (tier) => {
    setWorker({
      ...worker,
      tier: tier.id,
      weeklyPremium: tier.premium,
      coverage_per_day: tier.coverage
    });
    onClose();
    alert(`Successfully upgraded to ${tier.name}! New premium: ₹${tier.premium}/week.`);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)'
    }}>
      <div className="card glass animate-zoomIn" style={{ maxWidth: '600px', width: '90%', padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px' }}>Update Protection Level</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tiers.map((t) => (
            <div 
              key={t.id}
              onClick={() => handleUpdate(t)}
              style={{
                padding: '20px',
                background: worker.tier === t.id ? 'rgba(108, 99, 255, 0.1)' : 'rgba(255,255,255,0.02)',
                border: worker.tier === t.id ? '1px solid var(--primary)' : '1px solid var(--card-border)',
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ padding: '10px', background: worker.tier === t.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                  <Shield size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', color: 'white' }}>{t.name}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>₹{t.coverage} Daily Coverage • ₹{t.premium}/wk</p>
                </div>
              </div>
              {worker.tier === t.id && (
                <div className="badge badge-approved" style={{ fontSize: '10px' }}>
                  CURRENT
                </div>
              )}
            </div>
          ))}
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '32px', textAlign: 'center' }}>
          New premium will be auto-adjusted from your next week's billing cycle.
        </p>
      </div>
    </div>
  );
};

export default PlanSwitcherModal;
