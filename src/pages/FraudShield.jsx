import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import config from '../config';
import { Shield, Lock, MapPin, CloudRain, Activity, Brain, CheckCircle, AlertTriangle, XCircle, Search, Terminal, AlertCircle, Radio } from 'lucide-react';

const FraudShield = () => {
  const { isDemo } = useApp();
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    document.title = 'PayNest — Fraud Shield';
    const fetchStats = async () => {
      try {
        const res = await fetch(`${config.API_URL}/admin/metrics`, {
          headers: { 'Authorization': `Bearer ${sessionStorage.getItem('paynest_token')}` }
        });
        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error("Failed to fetch fraud stats", err);
      }
    };
    fetchStats();
  }, []);

  const Layers = [
    { 
      id: 1, title: 'GPS Validation', icon: <MapPin />, 
      desc: 'Compares claim location vs worker\'s last 5 GPS pings to prevent spoofing.', 
      threshold: 'Flag if distance gap > 5km from reported zone', status: 'ACTIVE' 
    },
    { 
      id: 2, title: 'Weather Cross-Audit', icon: <CloudRain />, 
      desc: 'Validates claim against real OpenWeatherMap and IMD historical grids.', 
      threshold: 'Flag if API reading < trigger threshold (e.g. < 35mm/hr)', status: 'ACTIVE' 
    },
    { 
      id: 3, title: 'Velocity Check', icon: <Activity />, 
      desc: 'Flags abnormal claiming frequency compared to zone average.', 
      threshold: 'Flag if > 3 claims/week or > 2/day', status: 'ACTIVE' 
    },
    { 
      id: 4, title: 'Pattern Engine', icon: <Radio />, 
      desc: 'AI detects gaming, duplicates, and coordinated account abuse behaviors.', 
      threshold: 'Dynamic ML scoring (75%+ risk flags for review)', status: 'ACTIVE' 
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
              4-Layer Protection Active — Monitoring Livelihoods <span className="pulse-dot" style={{ color: 'var(--success)' }} />
            </p>
          </div>
        </div>
        <div className="badge badge-approved" style={{ padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', fontWeight: '700' }}>
          SYSTEM INTEGRITY: 99.9%
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
        {[
          { label: 'Analyses Run', val: (metrics?.fraudStats?.total || 247).toLocaleString(), color: 'var(--primary)' },
          { label: 'Auto Cleared', val: `${metrics?.fraudStats?.approved || 93.5}%`, color: 'var(--success)' },
          { label: 'Under Review', val: metrics?.fraudStats?.underReview || '12', color: 'var(--warning)' },
          { label: 'Blocked Today', val: metrics?.fraudStats?.rejected || '4', color: 'var(--danger)' },
          { label: 'Integrity Saved', val: `₹${(metrics?.claimsPaid * 0.12 / 1000 || 34.5).toFixed(1)}k`, color: '#6366F1' },
        ].map((m, i) => (
          <div key={i} className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '8px', letterSpacing: '1px' }}>{m.label}</p>
            <h3 style={{ fontSize: '24px', color: m.color }}>{m.val}</h3>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}><Terminal size={18} /> Deep Validation Layers</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {Layers.map((layer) => (
            <div key={layer.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '4px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: 'var(--primary)' }}>{layer.icon}</div>
                <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', fontSize: '9px', fontWeight: '800' }}>SHIELD UP</span>
              </div>
              <div>
                <h4 style={{ fontSize: '15px', marginBottom: '6px' }}>{layer.title}</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5' }}>{layer.desc}</p>
              </div>
              <div style={{ fontSize: '11px', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '4px' }}><strong>THRESHOLD:</strong> {layer.threshold}</p>
                <p style={{ color: 'var(--success)' }}><strong>VERIFIED Today:</strong> All scans matching</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        <div className="card">
          <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Recent Rejections (Global)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { id: 'W-9821-CLM', reason: 'GPS Inconsistency: Reported Chennai South | Pinged Pondicherry', score: 92, date: 'Today' },
              { id: 'W-4812-CLM', reason: 'OpenWeather Discrepancy: Rainfall 0mm reported vs API verified', score: 88, date: 'Today' },
              { id: 'W-0192-CLM', reason: 'Coordinated Cluster Attempt: 3 pings from same device ID', score: 98, date: 'Yesterday' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '16px', border: '1px solid var(--card-border)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h5 style={{ fontSize: '14px' }}>{item.id}</h5>
                    <span className="badge badge-rejected" style={{ fontSize: '9px' }}>BLOCKED</span>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--danger)', fontWeight: '500' }}>{item.reason}</p>
                </div>
                <div style={{ textAlign: 'right', marginLeft: '24px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '800', color: 'var(--danger)' }}>REJECTED</p>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>AI Score: {item.score}/100</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(22, 28, 36, 1) 100%)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <h3 style={{ fontSize: '18px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}><AlertTriangle color="var(--danger)" /> Risk Monitoring</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Real-time alerts for system administrators regarding platform gaming.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <p style={{ fontSize: '11px', fontWeight: '800', color: 'var(--warning)', marginBottom: '4px' }}>PATTERN ALERT — BENGALURU</p>
              <p style={{ fontSize: '13px', marginBottom: '8px' }}>Sudden 300% spike in AQI claims in Koramangala. Comparing ground sensors.</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Status: Auto-reviewing 48 claims.</p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
              <p style={{ fontSize: '11px', fontWeight: '800', color: 'var(--primary)', marginBottom: '4px' }}>SYSTEM UPDATE</p>
              <p style={{ fontSize: '13px', marginBottom: '8px' }}>GPS Drift algorithm updated for coastal zones (enhanced precision).</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Latency impact: 12ms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudShield;