import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Wallet, CheckCircle, Download, ExternalLink, ArrowRight, Zap, TrendingUp, Clock } from 'lucide-react';

const PayoutHistory = () => {
  const { payouts } = useApp();

  useEffect(() => {
    document.title = 'PayNest — Payout History';
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Payout History</h1>
          <p style={{ color: 'var(--text-secondary)' }}>All income protection payouts transferred via Razorpay Instant Payouts.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-primary" style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--card-border)' }}>
            <Download size={18} /> Download All Receipts
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        <div className="card">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}><Wallet color="var(--success)" /></div>
            <div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>TOTAL PAID OUT</p>
              <h3 style={{ fontSize: '24px' }}>₹2,400</h3>
            </div>
          </div>
        </div>
        <div className="card">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ padding: '12px', background: 'rgba(108, 99, 255, 0.1)', borderRadius: '12px' }}><TrendingUp color="var(--primary)" /></div>
            <div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>THIS WEEK</p>
              <h3 style={{ fontSize: '24px' }}>₹480</h3>
            </div>
          </div>
        </div>
        <div className="card">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}><CheckCircle color="var(--success)" /></div>
            <div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>SUCCESS RATE</p>
              <h3 style={{ fontSize: '24px' }}>100%</h3>
            </div>
          </div>
        </div>
        <div className="card">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px' }}><Clock color="#3B82F6" /></div>
            <div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>FASTEST PAYOUT</p>
              <h3 style={{ fontSize: '24px' }}>1m 58s</h3>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>Recent Transfers</h3>
        {payouts.map((payout, i) => (
          <div key={i} className="card" style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', transition: 'all 0.3s' }}>
            <div style={{ 
              width: '48px', height: '48px', borderRadius: '12px', 
              background: 'rgba(108, 99, 255, 0.1)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', marginRight: '24px'
            }}>
              {payout.triggerType === 'HEAVY_RAIN' ? '🌧️' : '☀️'}
            </div>
            
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--success)' }}>₹{payout.amount}</h4>
                <div style={{ height: '12px', width: '1px', background: 'var(--card-border)' }} />
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{payout.trigger} Disruption</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {payout.date} • {payout.claimId}
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-approved" style={{ marginBottom: '4px' }}>{payout.status}</span>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{payout.id}</p>
              </div>
              <button 
                className="btn-primary" 
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', color: 'white', padding: '10px 16px' }}
              >
                Receipt <ExternalLink size={14} style={{ marginLeft: '8px', opacity: 0.6 }} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '2px dashed var(--card-border)' }}>
        <Zap color="var(--primary)" size={32} style={{ marginBottom: '16px', opacity: 0.5 }} />
        <h4 style={{ fontSize: '16px', marginBottom: '8px' }}>Real-time settlements active</h4>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto' }}>
          All payouts are handled by the PayNest automated treasury. We use RazorpayX for direct bank transfers to your UPI ID.
        </p>
      </div>
    </div>
  );
};

export default PayoutHistory;