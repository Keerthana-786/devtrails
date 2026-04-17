import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, MapPin, CloudRain, Activity, Brain, CheckCircle, AlertTriangle, XCircle, Search, Terminal, AlertCircle } from 'lucide-react';

const FraudShield = () => {
  const { isDemo, triggerClaim } = useApp();

  useEffect(() => {
    document.title = 'PayNest — Fraud Shield';
  }, []);

  const Layers = [
    { 
      id: 1, title: 'GPS Verification', icon: <MapPin />, 
      desc: 'Compares claim location vs worker\'s last 5 GPS pings', 
      threshold: 'Flag if distance gap > 5km', today: '0 GPS spoofs detected', status: 'ACTIVE' 
    },
    { 
      id: 2, title: 'Weather Cross-Check', icon: <CloudRain />, 
      desc: 'Validates claim against real OpenWeatherMap historical data', 
      threshold: 'Flag if API reading < trigger threshold', today: '0 fake weather claims', status: 'ACTIVE' 
    },
    { 
      id: 3, title: 'Frequency Monitor', icon: <Activity />, 
      desc: 'Flags abnormal claiming patterns vs zone average', 
      threshold: 'Flag if > 3 claims/week', today: '2 frequency warnings', status: 'ACTIVE' 
    },
    { 
      id: 4, title: 'ML Pattern Analysis', icon: <Brain />, 
      desc: 'AI detects gaming, duplicates, and account abuse behaviors', 
      threshold: 'Dynamic ML scoring (75%+ flag)', today: '2 patterns flagged', status: 'ACTIVE' 
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(108, 99, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield color="var(--primary)" size={32} />
          </div>
          <div>
            <h1 style={{ fontSize: '32px', marginBottom: '4px' }}>AI Fraud Shield</h1>
            <p style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Shield Active — Monitoring 10,000+ workers <span className="pulse-dot" style={{ color: 'var(--success)' }} />
            </p>
          </div>
        </div>
        <button 
          className="btn-primary" 
          onClick={() => triggerClaim('FRAUD', 'GPS Spoofing')}
          style={{ background: 'var(--warning)', color: 'black' }}
        >
          Test Fraud Engine →
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
        {[
          { label: 'Claims Analyzed', val: '247', color: 'var(--primary)' },
          { label: 'Auto Approved', val: '93.5%', color: 'var(--success)' },
          { label: 'Flagged', val: '12', color: 'var(--warning)' },
          { label: 'Blocked', val: '4', color: 'var(--danger)' },
          { label: 'Money Saved', val: '₹34.5k', color: '#6366F1' },
        ].map((m, i) => (
          <div key={i} className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '8px', letterSpacing: '1px' }}>{m.label}</p>
            <h3 style={{ fontSize: '24px', color: m.color }}>{m.val}</h3>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}><Terminal size={18} /> Engine Architecture</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {Layers.map((layer) => (
            <div key={layer.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: 'var(--primary)' }}>{layer.icon}</div>
                <span className="badge badge-live" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', fontSize: '9px' }}>{layer.status}</span>
              </div>
              <div>
                <h4 style={{ fontSize: '14px', marginBottom: '4px' }}>{layer.title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{layer.desc}</p>
              </div>
              <div style={{ fontSize: '11px', padding: '10px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--card-border)' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}><strong>THRESHOLD:</strong> {layer.threshold}</p>
                <p style={{ color: 'var(--text-muted)' }}><strong>TODAY:</strong> {layer.today}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        <div className="card">
          <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Recent Attempts Blocked</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { id: 'CLM-2026-4756', reason: 'GPS Spoof + Fake Weather', score: 85, amount: 480, date: '28 Mar' },
              { id: 'CLM-2026-4721', reason: 'Duplicate claim attempt', score: 65, amount: 480, date: '15 Mar' },
              { id: 'CLM-2026-4698', reason: 'Frequency anomaly', score: 72, amount: 800, date: '10 Mar' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '16px', border: '1px solid var(--card-border)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h5 style={{ fontSize: '14px', marginBottom: '2px' }}>{item.id}</h5>
                  <p style={{ fontSize: '12px', color: 'var(--danger)' }}>{item.reason}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', fontWeight: '800' }}>₹{item.amount} blocked</p>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Score: {item.score}/100 • {item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ background: 'rgba(239, 68, 68, 0.02)', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--danger)' }}>Risk Alerts</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <AlertTriangle color="var(--warning)" size={20} style={{ marginTop: '2px' }} />
              <div>
                <p style={{ fontSize: '13px', fontWeight: '600' }}>Unusual activity in Delhi North</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Manual override suggested for 12 claims pending verification.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <AlertCircle color="var(--danger)" size={20} style={{ marginTop: '2px' }} />
              <div>
                <p style={{ fontSize: '13px', fontWeight: '600' }}>Pattern Match: Order Gaming</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Identified cluster of 4 workers in same zone with suspicious GPS pings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudShield;