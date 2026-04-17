import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Shield, ArrowRight, Video, FileText, CheckCircle } from 'lucide-react';

const DemoScript = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'PayNest — Demo Script';
  }, []);

  const steps = [
    { title: '0:00-0:30 — Problem Statement', text: 'India has 12 million delivery partners. When it rains or a curfew hits, they lose ₹500 in a single day with zero protection. PayNest fixes this.', path: '/login', btn: 'Go to Login Page' },
    { title: '0:30-1:00 — Demo Entry', text: 'Click Watch Live Demo button. Show worker profile — Raju Kumar, Swiggy partner, Anna Nagar Chennai.', path: '/', btn: 'Go to Dashboard' },
    { title: '1:00-1:30 — Policy & Coverage', text: 'Show active Standard plan — ₹49/week. Show what triggers are covered. Open policy certificate.', path: '/protection', btn: 'Go to My Policy' },
    { title: '1:30-2:30 — Trigger Rain & Claim Journey', text: 'Open Demo Controls. Click Trigger Heavy Rain. Show the complete 6-step automated claim journey. ₹480 credited with zero user action.', btn: 'Use Demo Controls', isModal: true },
    { title: '2:30-3:15 — Fraud Detection', text: 'Click Test Fraud Detection. Show 4-layer fraud analysis. Claim scored 85/100 and AUTO REJECTED. Show GPS mismatch evidence.', path: '/fraud', btn: 'Go to Fraud Shield' },
    { title: '3:15-3:45 — Payout History', text: 'Show all payouts with real transaction IDs. Click receipt — show UPI receipt styled exactly like Google Pay.', path: '/payouts', btn: 'Go to Payouts' },
    { title: '3:45-4:30 — Admin Dashboard', text: 'Login as admin (paynest2026). Show loss ratio gauge at 62.3% — healthy. Show predictive analytics.', path: '/admin', btn: 'Go to Admin' },
    { title: '4:30-5:00 — Business Case & Close', text: 'Show break-even at 3,847 workers. Annual profit ₹50.2 Lakhs. 10,000 families protected. PayNest — safety net for heroes.', path: '/admin', btn: 'Go to Admin (Footer)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>5-Minute Demo Script</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Follow this sequence to record a winning hackathon presentation.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-primary">
            <Video size={18} /> Start Recording
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        {steps.map((step, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '24px', right: '24px', fontSize: '12px', fontWeight: 'bold', color: 'var(--primary)' }}>STEP {i+1}</span>
            <h4 style={{ fontSize: '16px', fontWeight: '700' }}>{step.title}</h4>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--card-border)', fontSize: '14px', lineHeight: '1.6', flex: 1 }}>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>SAY: </span>"{step.text}"
            </div>
            <button 
              className="btn-primary" 
              style={{ padding: '10px', fontSize: '13px', background: 'rgba(108, 99, 255, 0.1)', color: 'var(--primary)', border: '1px solid var(--primary)' }}
              onClick={() => step.path && navigate(step.path)}
            >
              {step.btn} <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="card" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--success)', textAlign: 'center' }}>
        <h3 style={{ color: 'var(--success)', marginBottom: '8px' }}>Ready to Win Guidewire DEVTrails?</h3>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Perform this demo smoothly, highlight the "Automated" and "Parametric" nature, and you're good to go!</p>
      </div>
    </div>
  );
};

export default DemoScript;