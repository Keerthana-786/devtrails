import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.jsx';

function MetricCard({ title, value, icon, subtitle, color = '#10b981' }) {
  return (
    <div style={{
      background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px',
      padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{ fontSize: '24px', marginBottom: '12px' }}>{icon}</div>
      <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '26px', fontWeight: '800', color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>{value}</div>
      {subtitle && <div style={{ fontSize: '11px', color: color, marginTop: '8px', fontWeight: '700' }}>{subtitle}</div>}
      {title === 'BTS Score' && (
        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginTop: '12px', overflow: 'hidden' }}>
          <div style={{ width: '92%', height: '100%', background: color }} />
        </div>
      )}
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px', marginBottom: '24px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 20px', color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h3>
      <div style={{ position: 'relative', height: '240px', width: '100%' }}>
        {children}
      </div>
    </div>
  );
}

export default function Analytics() {
  const { btsScore, daysProtected } = useApp();
  const payoutChartRef = useRef(null);
  const disruptionChartRef = useRef(null);
  const btsTrendChartRef = useRef(null);

  useEffect(() => {
    if (!window.Chart) return;

    // CHART 1 — Weekly Payout History (Bar)
    const ctx1 = payoutChartRef.current.getContext('2d');
    const chart1 = new window.Chart(ctx1, {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
        datasets: [{
          label: 'Payouts (₹)',
          data: [0, 480, 0, 320, 0, 480],
          backgroundColor: '#f59e0b',
          borderRadius: 6,
          barThickness: 24,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748B' } },
          x: { grid: { display: false }, ticks: { color: '#64748B' } }
        }
      }
    });

    // CHART 2 — Disruption Type Breakdown (Horizontal Bar)
    const ctx2 = disruptionChartRef.current.getContext('2d');
    const chart2 = new window.Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Heavy Rain', 'Extreme AQI', 'Heat Wave', 'Road Closure'],
        datasets: [{
          label: 'Count',
          data: [3, 1, 0, 0],
          backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'],
          borderRadius: 4,
          barThickness: 16,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748B', stepSize: 1 } },
          y: { grid: { display: false }, ticks: { color: '#64748B' } }
        }
      }
    });

    // CHART 3 — BTS Score Trend (Line)
    const ctx3 = btsTrendChartRef.current.getContext('2d');
    const chart3 = new window.Chart(ctx3, {
      type: 'line',
      data: {
        labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
        datasets: [{
          label: 'BTS Score',
          data: [65, 70, 75, 80, 88, 92],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#10b981'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#64748B' } },
          x: { grid: { display: false }, ticks: { color: '#64748B' } }
        }
      }
    });

    return () => {
      chart1.destroy();
      chart2.destroy();
      chart3.destroy();
    };
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px', fontFamily: "'Space Grotesk', sans-serif" }}>📊 Protection Analytics</h1>
          <p style={{ color: '#64748B', fontSize: '14px' }}>Deep dive into your income stability and behavior metrics.</p>
        </div>
        <div style={{ padding: '8px 16px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '10px', color: '#f59e0b', fontSize: '12px', fontWeight: '700' }}>
          Updated: Just Now
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <MetricCard title="Total Payouts" value="₹1,280" icon="💰" subtitle="This Week" color="#f59e0b" />
        <MetricCard title="Claims Filed" value="3" icon="✅" subtitle="2 auto, 1 pending" color="#10b981" />
        <MetricCard title="BTS Score" value={`${btsScore}/100`} icon="⭐" subtitle="Trusted Tier" color="#10b981" />
        <MetricCard title="Days Protected" value={`${daysProtected} days`} icon="🛡️" subtitle="Full coverage" color="#3b82f6" />
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        <ChartCard title="Weekly Payout History">
          <canvas ref={payoutChartRef} />
        </ChartCard>
        <ChartCard title="Disruption Type Breakdown">
          <canvas ref={disruptionChartRef} />
        </ChartCard>
        <ChartCard title="Behavioral Trust Score (BTS) Trend">
          <canvas ref={btsTrendChartRef} />
        </ChartCard>
        
        {/* Section E: Premium Impact / Savings Table */}
        <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', margin: '0 0 20px', fontFamily: "'Space Grotesk', sans-serif" }}>Behavioral Premium Impact</h3>
          <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th style={{ textAlign: 'left', padding: '12px 0', color: '#64748B' }}>Week</th>
                <th style={{ textAlign: 'left', padding: '12px 0', color: '#64748B' }}>BTS Score</th>
                <th style={{ textAlign: 'left', padding: '12px 0', color: '#64748B' }}>Premium</th>
                <th style={{ textAlign: 'left', padding: '12px 0', color: '#64748B' }}>Savings</th>
              </tr>
            </thead>
            <tbody>
              {[
                { w: 'W1', s: 65, p: 25, sv: '—' },
                { w: 'W2', s: 70, p: 23, sv: '₹2' },
                { w: 'W3', s: 75, p: 21, sv: '₹4' },
                { w: 'W4', s: 80, p: 19, sv: '₹6' },
                { w: 'W5', s: 88, p: 17, sv: '₹8' },
                { w: 'W6', s: 92, p: 15, sv: '₹10' }
              ].map(item => (
                <tr key={item.w} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '12px 0', fontWeight: '600' }}>{item.w}</td>
                  <td style={{ padding: '12px 0', color: '#f59e0b', fontWeight: '700' }}>{item.s}/100</td>
                  <td style={{ padding: '12px 0', fontWeight: '700' }}>₹{item.p}</td>
                  <td style={{ padding: '12px 0', color: item.sv === '—' ? '#64748B' : '#10b981', fontWeight: '700' }}>{item.sv}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', color: '#10b981', fontSize: '12px' }}>
            💡 <b>Efficiency Alert:</b> You saved ₹30 in total premiums by maintaining a high BTS. Staying Trusted pays off!
          </div>
        </div>
      </div>

      {/* Section F: Weekly Report Card with Share Logic */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)', 
        borderRadius: '24px', padding: '40px', textAlign: 'center', 
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)', position: 'relative', overflow: 'hidden' 
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")', opacity: 0.1 }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', fontFamily: "'Space Grotesk', sans-serif" }}>Weekly Performance Report</h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
            Outstanding performance! You are in the <b>Top 5%</b> of protected workers this week.
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '32px', fontWeight: '900' }}>₹1,280</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Payout</div>
            </div>
            <div style={{ width: '1px', height: '50px', background: 'rgba(255,255,255,0.2)' }} />
            <div>
              <div style={{ fontSize: '32px', fontWeight: '900' }}>92</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>BTS Score</div>
            </div>
            <div style={{ width: '1px', height: '50px', background: 'rgba(255,255,255,0.2)' }} />
            <div>
              <div style={{ fontSize: '32px', fontWeight: '900' }}>4</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>Triggers Avoided</div>
            </div>
          </div>

          <button 
            onClick={() => {
              const text = `🚀 Just saved my income with PayNest! ₹1,280 payout received & 92/100 BTS score. Parametric protection is the future! #PayNest #GigWorker #IncomeProtection`;
              navigator.clipboard.writeText(text);
              alert('Report summary copied to clipboard! Share it with your friends.');
            }}
            style={{ 
              background: '#fff', color: '#1E40AF', border: 'none', borderRadius: '12px', 
              padding: '14px 32px', fontWeight: '800', fontSize: '14px', cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)', transition: 'transform 0.2s'
            }}
            onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.target.style.transform = 'scale(1)'}
          >
            Share My Success Report 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
