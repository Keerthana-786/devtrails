import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import config from '../config';
import { TrendingUp, Shield, Clock, Users, Flame, MapPin, Search, ChevronRight, CheckCircle, Smartphone, AlertCircle, Radio } from 'lucide-react';

import PlanSwitcherModal from '../components/PlanSwitcherModal';

const WorkerDashboard = () => {
  const { worker, setWorker, setClaims, claims } = useApp();
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [monitoringLogs, setMonitoringLogs] = useState([]);
  const [weather, setWeather] = useState({ rainfall: 0, temperature: 32, aqi: 85 });
  const [stats, setStats] = useState({ totalPayouts: 0, totalEarned: 0 });

  const fetchDashboardData = async () => {
    try {
      const res = await fetch(`${config.API_URL}/dashboard`, {
        headers: { 'Authorization': `Bearer ${sessionStorage.getItem('paynest_token')}` }
      });
      if (!res.ok) throw new Error('API not available');
      const data = await res.json();
      if (data.user) setWorker(data.user);
      if (data.payouts) setClaims(data.payouts.map(p => ({
        ...p,
        dateDay: new Date(p.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        triggerType: p.trigger === 'Heavy Rain' ? 'HEAVY_RAIN' : 'EXTREME_HEAT'
      })));
      if (data.monitoringLogs) setMonitoringLogs(data.monitoringLogs);
      if (data.weather) setWeather(data.weather);
      if (data.stats) setStats(data.stats);
    } catch (err) {
      // API not available - use mock data from AppContext
      console.log("Using mock data from AppContext");
    }
  };

  useEffect(() => {
    document.title = 'PayNest — Dashboard';
    fetchDashboardData();
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          fetchDashboardData();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Top Row: Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Income Protected</p>
            <div style={{ padding: '6px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}><TrendingUp size={16} color="var(--success)" /></div>
          </div>
          <h3 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '4px' }}>₹{(worker.walletBalance || 0).toLocaleString()}</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Across {stats.totalPayouts} successful claims</p>
          <p style={{ fontSize: '11px', color: 'var(--success)', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={12} /> Live Protection Active
          </p>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Policy Status</p>
            <div style={{ padding: '6px', background: 'rgba(108, 99, 255, 0.1)', borderRadius: '8px' }}><Shield size={16} color="var(--primary)" /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: worker.policyStatus === 'ACTIVE' ? 'var(--success)' : 'var(--danger)' }}>
              {worker.policyStatus || 'ACTIVE'}
            </h3>
            <span className="pulse-dot" style={{ color: 'var(--success)' }} />
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Weekly Income Insurance</p>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>Premium: ₹{worker.weeklyPremium || 49}/week</p>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #3B82F6' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>4-Layer Fraud Shield</p>
            <div style={{ padding: '6px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}><Radio size={16} color="#3B82F6" /></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <p style={{ fontSize: '11px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={10} /> GPS Validation</p>
            <p style={{ fontSize: '11px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={10} /> Weather Cross-Audit</p>
            <p style={{ fontSize: '11px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={10} /> Velocity Check</p>
            <p style={{ fontSize: '11px', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={10} /> Pattern Engine</p>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--warning)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Risk Profile</p>
            <div style={{ padding: '6px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}><Flame size={16} color="var(--warning)" /></div>
          </div>
          <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px' }}>{worker.trustScore || 85}</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>AI Reliability Score</p>
          <div style={{ height: '4px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginTop: '12px' }}>
             <div style={{ height: '100%', width: `${worker.trustScore || 85}%`, background: 'var(--warning)', borderRadius: '2px' }} />
          </div>
        </div>
      </div>

      {/* Middle Row: Live Monitor and Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Live Environment Monitor <span className="badge badge-live"><span className="pulse-dot" /> AUTO MODE ACTIVE</span>
            </h3>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Syncing in: <span style={{ color: 'var(--primary)', fontWeight: '700', fontFamily: 'monospace' }}>{countdown}s</span>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>TEMPERATURE</p>
              <p style={{ fontSize: '13px', fontWeight: '600' }}>{weather.temperature?.toFixed(1) || '32'}°C</p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>RAINFALL</p>
              <p style={{ fontSize: '13px', fontWeight: '600' }}>{weather.rainfall?.toFixed(1) || '0'}mm/hr</p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>AQI LEVEL</p>
              <p style={{ fontSize: '13px', fontWeight: '600', color: weather.aqi > 300 ? 'var(--danger)' : 'var(--success)' }}>{weather.aqi || 84}</p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>LOCATION</p>
              <p style={{ fontSize: '13px', fontWeight: '600' }}>{worker.zone || 'Mumbai'}</p>
            </div>
          </div>

          <div style={{ padding: '12px 20px', background: weather.rainfall > 35 || weather.temperature > 43 ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {weather.rainfall > 35 || weather.temperature > 43 ? <AlertCircle size={18} color="var(--danger)" /> : <CheckCircle size={18} color="var(--success)" />}
            <span style={{ fontSize: '14px', color: weather.rainfall > 35 || weather.temperature > 43 ? 'var(--danger)' : 'var(--success)', fontWeight: '600' }}>
              {weather.rainfall > 35 || weather.temperature > 43 ? 'DISRUPTION DETECTED - Processing Auto Claim' : 'Stable conditions – Monitoring for parametric triggers...'}
            </span>
          </div>

          <div>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '12px', letterSpacing: '1px' }}>SYSTEM EVENT LOG (AUTO-MODE)</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '150px', overflowY: 'auto' }}>
              {monitoringLogs.map((log, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', fontSize: '12px', fontFamily: 'monospace' }}>
                  <span style={{ color: 'var(--text-muted)' }}>[{log.time}]</span>
                  <span style={{ color: log.message.includes('✅') || log.message.includes('sent') ? 'var(--success)' : log.message.includes('🚨') ? 'var(--danger)' : 'var(--text-secondary)' }}>
                     {log.message}
                  </span>
                </div>
              ))}
              {monitoringLogs.length === 0 && <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Waiting for first scan...</p>}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Protection Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
               <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>CURRENT PLAN</p>
               <h4 style={{ fontSize: '16px' }}>Income Protection - Weekly</h4>
               <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>Covers: Rain, Heat, AQI, Curfews</p>
            </div>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
               <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px' }}>PAYOUT METHOD</p>
               <h4 style={{ fontSize: '16px' }}>VPA: {worker.upiId || 'worker@upi'}</h4>
               <p style={{ fontSize: '11px', color: 'var(--success)', marginTop: '4px' }}>Instant Razorpay Payout Enabled</p>
            </div>
            <button 
              onClick={() => setIsPlanModalOpen(true)}
              className="btn-primary" 
              style={{ width: '100%', marginTop: '8px' }}
            >
              Modify Coverage
            </button>
          </div>

          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px' }}>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#3B82F6', marginBottom: '8px' }}>Guidewire DEVTrails 2026</p>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>System fully compliant with parametric insurance standards for Indian gig workers.</p>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Claims & UI Simulations */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px' }}>Recent Automatic Payouts</h3>
            <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>View All →</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--card-border)', textAlign: 'left' }}>
                  <th style={{ padding: '12px 0', fontSize: '12px', color: 'var(--text-muted)' }}>ID</th>
                  <th style={{ padding: '12px 0', fontSize: '12px', color: 'var(--text-muted)' }}>TRIGGER</th>
                  <th style={{ padding: '12px 0', fontSize: '12px', color: 'var(--text-muted)' }}>AMOUNT</th>
                  <th style={{ padding: '12px 0', fontSize: '12px', color: 'var(--text-muted)' }}>STATUS</th>
                  <th style={{ padding: '12px 0' }}></th>
                </tr>
              </thead>
              <tbody>
                {claims.length > 0 ? claims.slice(0, 5).map((claim, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--card-border)' }}>
                    <td style={{ padding: '16px 0', fontSize: '12px', fontFamily: 'monospace' }}>{claim.id.slice(-8)}</td>
                    <td style={{ padding: '16px 0', fontSize: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>{claim.trigger === 'Heavy Rain' ? '🌧️' : (claim.trigger === 'Extreme Heat' ? '☀️' : '💨')}</span>
                        {claim.trigger}
                      </div>
                    </td>
                    <td style={{ padding: '16px 0', fontSize: '14px', fontWeight: '700' }}>₹{claim.amount}</td>
                    <td style={{ padding: '16px 0' }}>
                      <span className={`badge ${claim.status === 'SETTLED' ? 'badge-approved' : 'badge-rejected'}`} style={{ fontSize: '10px' }}>
                        {claim.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px 0', textAlign: 'right' }}>
                       {claim.upiRef && <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>UPI ID: {claim.upiRef.slice(0,10)}...</span>}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="5" style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
                      No auto-payouts yet. Monitoring conditions...
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>UPI Receipt Preview</h3>
          {claims.filter(c => c.status === 'SETTLED').length > 0 ? (
            <div style={{ background: '#fff', color: '#000', borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
               <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '6px', background: 'var(--primary)' }} />
               <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '48px', height: '48px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                     <CheckCircle size={24} />
                  </div>
               </div>
               <h4 style={{ textAlign: 'center', fontSize: '18px', marginBottom: '4px' }}>Payment Successful</h4>
               <p style={{ textAlign: 'center', fontSize: '32px', fontWeight: '800', marginBottom: '24px' }}>₹{claims.find(c => c.status === 'SETTLED').amount}</p>
               
               <div style={{ borderTop: '1px dashed #eee', paddingTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                     <span style={{ color: '#666' }}>To:</span>
                     <span style={{ fontWeight: '600' }}>{worker.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                     <span style={{ color: '#666' }}>Bank Ref:</span>
                     <span style={{ fontWeight: '600' }}>{claims.find(c => c.status === 'SETTLED').upiRef}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                     <span style={{ color: '#666' }}>Time:</span>
                     <span style={{ fontWeight: '600' }}>{new Date(claims.find(c => c.status === 'SETTLED').createdAt).toLocaleTimeString()}</span>
                  </div>
               </div>
               <div style={{ marginTop: '24px', textAlign: 'center' }}>
                  <p style={{ fontSize: '10px', color: '#999' }}>Powered by Razorpay Simulated Engine</p>
               </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', border: '2px dashed var(--card-border)', borderRadius: '16px' }}>
               <Smartphone size={32} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
               <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>UPI receipts will appear here after an automatic payout.</p>
            </div>
          )}
        </div>
      </div>
      <PlanSwitcherModal isOpen={isPlanModalOpen} onClose={() => setIsPlanModalOpen(false)} />
    </div>
  );
};

export default WorkerDashboard;