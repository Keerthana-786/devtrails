import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Filter, ChevronDown, Download, ExternalLink, ShieldAlert, ShieldCheck } from 'lucide-react';

const ClaimsHistory = () => {
  const { claims = [] } = useApp();
  const [filter, setFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedClaim, setSelectedClaim] = useState(null);

  useEffect(() => {
    document.title = 'PayNest — Claims History';
  }, []);

  const filteredClaims = claims.filter(c => {
    const triggerMatch = filter === 'All' || c.trigger.includes(filter);
    const statusMatch = statusFilter === 'All' || c.status === statusFilter;
    return triggerMatch && statusMatch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Claims History</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Transparency in every automated payout.</p>
        </div>
        <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        <div className="card">
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '8px' }}>TOTAL CLAIMS</p>
          <h3 style={{ fontSize: '24px' }}>5</h3>
        </div>
        <div className="card">
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '8px' }}>TOTAL RECEIVED</p>
          <h3 style={{ fontSize: '24px', color: 'var(--success)' }}>₹2,400</h3>
        </div>
        <div className="card">
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '8px' }}>AUTO-APPROVAL</p>
          <h3 style={{ fontSize: '24px', color: 'var(--primary)' }}>94.2%</h3>
        </div>
        <div className="card">
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '8px' }}>AVG. TIME</p>
          <h3 style={{ fontSize: '24px' }}>47m</h3>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--card-border)', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Filter size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{ padding: '12px 16px 12px 48px', background: 'var(--dark-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', color: 'white', fontSize: '14px', width: '200px', cursor: 'pointer', appearance: 'none' }}
            >
              <option>All Triggers</option>
              <option>Heavy Rain</option>
              <option>Extreme Heat</option>
              <option>Severe AQI</option>
              <option>Fraud</option>
            </select>
          </div>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '12px 16px', background: 'var(--dark-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', color: 'white', fontSize: '14px', width: '160px', cursor: 'pointer' }}
          >
            <option>All Status</option>
            <option>SETTLED</option>
            <option>BLOCKED</option>
            <option>REVIEW</option>
          </select>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'var(--dark-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', color: 'var(--text-secondary)', fontSize: '14px' }}>
            <Calendar size={16} /> Last 30 Days
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--card-border)', textAlign: 'left' }}>
                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>CLAIM ID</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>DATE & TIME</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>TRIGGER</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>AMOUNT</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>FRAUD SCORE</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>STATUS</th>
                <th style={{ padding: '16px 24px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map((claim, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--card-border)', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }}>{claim.id}</td>
                  <td style={{ padding: '20px 24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                    <div>{claim.dateDay}</div>
                    <div style={{ fontSize: '12px', opacity: 0.6 }}>{claim.dateTime}</div>
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px' }}>{claim.triggerType === 'HEAVY_RAIN' ? '🌧️' : (claim.triggerType === 'EXTREME_HEAT' ? '☀️' : (claim.triggerType === 'SEVERE_AQI' ? '💨' : '🚫'))}</span>
                      {claim.trigger}
                    </div>
                  </td>
                  <td style={{ padding: '20px 24px', fontSize: '14px', fontWeight: '800' }}>₹{claim.amount}</td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', position: 'relative', marginBottom: '4px' }}>
                      <div style={{ 
                        position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: '3px',
                        width: `${claim.fraudScore}%`,
                        background: claim.fraudScore > 70 ? 'var(--danger)' : (claim.fraudScore > 30 ? 'var(--warning)' : 'var(--success)')
                      }} />
                    </div>
                    <span style={{ fontSize: '10px', color: claim.fraudScore > 70 ? 'var(--danger)' : (claim.fraudScore > 30 ? 'var(--warning)' : 'var(--success)') }}>
                      {claim.fraudScore}/100
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <span className={`badge ${claim.status === 'SETTLED' ? 'badge-approved' : 'badge-rejected'}`}>
                      {claim.status === 'SETTLED' ? <ShieldCheck size={12} /> : <ShieldAlert size={12} />}
                      {claim.status}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <button 
                      onClick={() => setSelectedClaim(claim)}
                      style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600', transition: 'opacity 0.2s' }}
                      onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
                      onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      View <ExternalLink size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Claim Detail Modal */}
      {selectedClaim && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }} onClick={() => setSelectedClaim(null)}>
          <div style={{
            background: 'var(--dark-bg)', borderRadius: '16px', border: '1px solid var(--card-border)', maxWidth: '500px', width: '90%', padding: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>Claim Details</h2>
              <button onClick={() => setSelectedClaim(null)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '24px', cursor: 'pointer', padding: 0 }}>×</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '4px' }}>CLAIM ID</p>
                <p style={{ fontSize: '16px', fontFamily: 'monospace', fontWeight: 'bold' }}>{selectedClaim.id}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '4px' }}>DATE</p>
                  <p style={{ fontSize: '14px' }}>{selectedClaim.dateDay}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '4px' }}>TIME</p>
                  <p style={{ fontSize: '14px' }}>{selectedClaim.dateTime}</p>
                </div>
              </div>

              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '4px' }}>TRIGGER</p>
                <p style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px' }}>{selectedClaim.triggerType === 'HEAVY_RAIN' ? '🌧️' : (selectedClaim.triggerType === 'EXTREME_HEAT' ? '☀️' : (selectedClaim.triggerType === 'SEVERE_AQI' ? '💨' : '🚫'))}</span>
                  {selectedClaim.trigger}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '4px' }}>AMOUNT</p>
                  <p style={{ fontSize: '18px', fontWeight: '800', color: 'var(--success)' }}>₹{selectedClaim.amount}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '4px' }}>STATUS</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: selectedClaim.status === 'SETTLED' ? 'var(--success)' : 'var(--danger)' }} />
                    <span style={{ fontSize: '14px', fontWeight: '600' }}>{selectedClaim.status}</span>
                  </div>
                </div>
              </div>

              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '8px' }}>FRAUD SCORE</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ 
                      position: 'absolute', left: 0, top: 0, height: '100%', borderRadius: '4px',
                      width: `${selectedClaim.fraudScore}%`,
                      background: selectedClaim.fraudScore > 70 ? 'var(--danger)' : (selectedClaim.fraudScore > 30 ? 'var(--warning)' : 'var(--success)')
                    }} />
                  </div>
                  <span style={{ fontWeight: '700', minWidth: '40px' }}>{selectedClaim.fraudScore}/100</span>
                </div>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--card-border)' }}>
                <button 
                  onClick={() => setSelectedClaim(null)}
                  style={{ width: '100%', padding: '12px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '14px' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimsHistory;
