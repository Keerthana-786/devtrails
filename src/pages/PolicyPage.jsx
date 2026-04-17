import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, CheckCircle, XCircle, CloudRain, Thermometer, Wind, AlertCircle, Ban, Download, RefreshCw, FileText } from 'lucide-react';
import PolicyCertificateModal from '../components/PolicyCertificateModal';

const PolicyPage = () => {
  const { worker } = useApp();
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

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
          <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Policy History</h3>
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
          <button className="btn-primary" style={{ width: '100%', marginTop: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)', color: 'white' }}>
            <FileText size={18} /> View Terms & Conditions
          </button>
        </div>
      </div>

      <PolicyCertificateModal isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)} />
    </div>
  );
};

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
          <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Policy History</h3>
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
          <button className="btn-primary" style={{ width: '100%', marginTop: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)', color: 'white' }}>
            <FileText size={18} /> View Terms & Conditions
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
