import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, CheckCircle, XCircle, CloudRain, Thermometer, Wind, AlertCircle, Ban, Download, RefreshCw, FileText, Settings } from 'lucide-react';
import PolicyCertificateModal from '../components/PolicyCertificateModal';
import PlanSwitcherModal from '../components/PlanSwitcherModal';
import TermsModal from '../components/TermsModal';

const PolicyPage = () => {
  const { worker } = useApp();
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  
  // Load toggle states from localStorage
  const [autoClaimsEnabled, setAutoClaimsEnabled] = useState(() => {
    const saved = localStorage.getItem('autoClaimsEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [fraudProtectionEnabled, setFraudProtectionEnabled] = useState(() => {
    const saved = localStorage.getItem('fraudProtectionEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Persist toggle states to localStorage
  const handleAutoClaimsToggle = () => {
    const newState = !autoClaimsEnabled;
    setAutoClaimsEnabled(newState);
    localStorage.setItem('autoClaimsEnabled', JSON.stringify(newState));
  };

  const handleFraudProtectionToggle = () => {
    const newState = !fraudProtectionEnabled;
    setFraudProtectionEnabled(newState);
    localStorage.setItem('fraudProtectionEnabled', JSON.stringify(newState));
  };

  useEffect(() => {
    document.title = 'PayNest — My Policy';
  }, []);

  const Triggers = [
    { icon: <CloudRain color="var(--primary)" />, title: 'Heavy Rainfall', threshold: '> 35mm/hr', status: 'COVERED' },
    { icon: <Thermometer color="var(--primary)" />, title: 'Extreme Heat', threshold: '> 43°C', status: 'COVERED' },
    { icon: <Wind color="var(--primary)" />, title: 'Severe Pollution', threshold: 'AQI > 350', status: 'COVERED' },
    { icon: <AlertCircle color="var(--primary)" />, title: 'Storm Alert', threshold: 'IMD Red Alert', status: 'COVERED' },
    { icon: <Ban color="var(--primary)" />, title: 'Curfew/Strike', threshold: 'Order drop > 80%', status: 'COVERED' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>My Policy</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Standard Protection Active • Automatic Renewals On</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setIsCertModalOpen(true)}
            className="btn-primary" 
            style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--card-border)' }}
          >
            <Download size={18} /> View Certificate
          </button>
          <button 
            onClick={() => setIsPlanModalOpen(true)}
            className="btn-primary" 
          >
            <Settings size={18} /> Modify Coverage
          </button>
        </div>
      </div>

      {/* Physical Card Style */}
      <div style={{ 
        background: 'linear-gradient(135deg, #6C63FF 0%, #1A1A2E 100%)',
        borderRadius: '24px',
        padding: '1px', // for border effect
        boxShadow: '0 20px 40px rgba(108, 99, 255, 0.2)'
      }}>
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: '23px',
          padding: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundImage: 'radial-gradient(circle at top right, rgba(108, 99, 255, 0.1), transparent)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative shield */}
          <Shield size={200} style={{ position: 'absolute', right: '-40px', bottom: '-40px', opacity: 0.05, transform: 'rotate(-15deg)' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield color="white" fill="white" size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: '20px', letterSpacing: '2px' }}>PAYNEST</h2>
                <p style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: '800' }}>{worker.tier === 'pro' ? 'PLATINUM' : (worker.tier === 'basic' ? 'SILVER' : 'GOLD')} PLAN</p>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '28px', marginBottom: '4px' }}>{worker.name}</h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {worker.platform} Partner • {worker.city} <CheckCircle size={14} color="var(--success)" />
              </p>
            </div>

            <div style={{ display: 'flex', gap: '48px' }}>
              <div>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Policy ID</p>
                <p style={{ fontWeight: '700', fontFamily: 'monospace' }}>PNT-2026-8821</p>
              </div>
              <div>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Daily Coverage</p>
                <p style={{ fontWeight: '700' }}>₹{worker.coverage_per_day || 480}</p>
              </div>
              <div>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>Valid Until</p>
                <p style={{ fontWeight: '700' }}>{worker.policy_valid_until || '18 Apr 2026'}</p>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
            <div className="badge badge-approved" style={{ fontSize: '14px', padding: '8px 16px' }}>
              <span className="pulse-dot" /> ACTIVE POLICY
            </div>
            <div>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '4px' }}>WEEKLY PREMIUM</p>
              <h2 style={{ fontSize: '32px' }}>₹{worker.weeklyPremium || 49}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Protection Settings with Toggles */}
      <div className="card" style={{ padding: '24px', background: 'rgba(108, 99, 255, 0.05)', border: '1px solid var(--card-border)' }}>
        <h3 style={{ fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Settings size={20} /> Protection Settings
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Auto Claims Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            background: 'var(--card-bg)',
            borderRadius: '12px',
            border: '1px solid var(--card-border)'
          }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>Auto Claims</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>AI triggers claims automatically when disruptions occur</p>
            </div>
            <div
              onClick={handleAutoClaimsToggle}
              style={{
                width: '50px',
                height: '28px',
                borderRadius: '14px',
                background: autoClaimsEnabled ? 'var(--success)' : '#555',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'white',
                  position: 'absolute',
                  left: autoClaimsEnabled ? '24px' : '2px',
                  transition: 'left 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              />
            </div>
          </div>

          {/* Fraud Protection Toggle */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            background: 'var(--card-bg)',
            borderRadius: '12px',
            border: '1px solid var(--card-border)'
          }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '4px' }}>Fraud Protection</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Real-time ML-based fraud detection and claim verification</p>
            </div>
            <div
              onClick={handleFraudProtectionToggle}
              style={{
                width: '50px',
                height: '28px',
                borderRadius: '14px',
                background: fraudProtectionEnabled ? 'var(--success)' : '#555',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'white',
                  position: 'absolute',
                  left: fraudProtectionEnabled ? '24px' : '2px',
                  transition: 'left 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        {(!autoClaimsEnabled || !fraudProtectionEnabled) && (
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: 'rgba(239, 68, 68, 0.1)',
            borderLeft: '4px solid var(--danger)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
            color: 'var(--danger)'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span><strong>⚠️ Protection disabled</strong> — claims may require manual review</span>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ fontSize: '20px' }}>What You're Protected Against</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
            {Triggers.map((t, i) => (
              <div key={i} className="card" style={{ padding: '16px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                <div style={{ padding: '12px', background: 'rgba(108, 99, 255, 0.05)', borderRadius: '12px' }}>{t.icon}</div>
                <div>
                  <h5 style={{ fontSize: '12px', marginBottom: '4px' }}>{t.title}</h5>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{t.threshold}</p>
                </div>
                <span className="badge badge-approved" style={{ fontSize: '9px', padding: '2px 8px' }}>COVERED</span>
              </div>
            ))}
          </div>

          <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
            <h4 style={{ fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Ban size={18} color="var(--danger)" /> What's Excluded (Important)
            </h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '999px', fontSize: '12px', color: 'var(--danger)' }}>Traffic Fines</div>
              <div style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '999px', fontSize: '12px', color: 'var(--danger)' }}>App Bans</div>
              <div style={{ padding: '8px 16px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '999px', fontSize: '12px', color: 'var(--danger)' }}>Device Damage</div>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '16px' }}>
              PayNest covers <strong>INCOME LOSS ONLY</strong> resulting from external disruptions. Personal accidents and vehicle maintenance are handled under separate standard accidental insurance.
            </p>
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={20} /> Policy History</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { week: 'Week 4 (Current)', date: '11 - 18 Apr', plan: 'Standard', status: 'Active' },
              { week: 'Week 3', date: '04 - 11 Apr', plan: 'Standard', status: 'Expired' },
              { week: 'Week 2', date: '28 Mar - 04 Apr', plan: 'Standard', status: 'Expired' },
              { week: 'Week 1', date: '21 - 28 Mar', plan: 'Basic', status: 'Expired' },
            ].map((p, i) => (
              <div key={i} className="card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: i === 0 ? 1 : 0.6 }}>
                <div>
                  <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>{p.week}</h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{p.date} • {p.plan}</p>
                </div>
                <span className={`badge ${p.status === 'Active' ? 'badge-approved' : 'badge-review'}`} style={{ fontSize: '10px' }}>{p.status}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setIsTermsOpen(true)}
            className="btn-primary" 
            style={{ width: '100%', marginTop: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)', color: 'white' }}
          >
            <FileText size={18} /> View Terms & Conditions
          </button>
        </div>
      </div>

      <PolicyCertificateModal isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)} />
      <PlanSwitcherModal isOpen={isPlanModalOpen} onClose={() => setIsPlanModalOpen(false)} />
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </div>
  );
};

export default PolicyPage;
