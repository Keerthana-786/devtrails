import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Brain, TrendingUp, AlertTriangle, ShieldCheck, Clock, MapPin, Search } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Insights = () => {
  const { weatherData, worker } = useApp();

  useEffect(() => {
    document.title = 'PayNest — AI Insights';
  }, []);

  const hourlyRiskData = [
    { time: '10 AM', risk: 20, rain: 0 },
    { time: '12 PM', risk: 35, rain: 5 },
    { time: '2 PM', risk: 65, rain: 45 },
    { time: '4 PM', risk: 85, rain: 72 },
    { time: '6 PM', risk: 45, rain: 15 },
    { time: '8 PM', risk: 30, rain: 0 },
    { time: '10 PM', risk: 15, rain: 0 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>AI Insights</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Predictive intelligence for your zone: {worker.zone}, {worker.city}.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Brain size={20} color="var(--primary)" /> 24-Hour Risk Forecast
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyRiskData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D44" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} unit="%" />
                <Tooltip 
                   contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="risk" name="Disruption Risk" stroke="var(--primary)" fillOpacity={1} fill="url(#colorRisk)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>
            AI predicts a 85% risk peak around 4:00 PM due to a forecasted cloudburst.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ flex: 1 }}>
            <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Smart Decisions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--success)', marginBottom: '4px' }}>✅ Safe Window: 8 AM - 1 PM</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Typical clear weather. Ideal for high-density orders.</p>
              </div>
              <div style={{ padding: '16px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--danger)', marginBottom: '4px' }}>⚠️ Avoid: 3 PM - 7 PM</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Heavy rain surge predicted. Auto-payouts will activate.</p>
              </div>
              <div style={{ padding: '16px', background: 'rgba(108, 99, 255, 0.05)', borderRadius: '12px', border: '1px solid rgba(108, 99, 255, 0.1)' }}>
                <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)', marginBottom: '4px' }}>☕ Recommendation: Take a break at 4 PM</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Parametric payout will offset earnings gap. Resume at 7:30 PM.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <div className="card">
          <h4 style={{ fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={16} color="var(--success)" /> Income Stability
          </h4>
          <h3 style={{ fontSize: '32px', marginBottom: '8px' }}>92%</h3>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
            <div style={{ width: '92%', height: '100%', background: 'var(--success)', borderRadius: '3px' }} />
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px' }}>Your income is 24% more stable than un-insured partners.</p>
        </div>
        
        <div className="card">
          <h4 style={{ fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={16} color="var(--primary)" /> Coverage Efficiency
          </h4>
          <h3 style={{ fontSize: '32px', marginBottom: '8px' }}>100%</h3>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
            <div style={{ width: '100%', height: '100%', background: 'var(--primary)', borderRadius: '3px' }} />
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px' }}>Every disruption in your zone was covered this month.</p>
        </div>

        <div className="card">
          <h4 style={{ fontSize: '14px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} color="#3B82F6" /> Payout Velocity
          </h4>
          <h3 style={{ fontSize: '32px', marginBottom: '8px' }}>47m</h3>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
            <div style={{ width: '85%', height: '100%', background: '#3B82F6', borderRadius: '3px' }} />
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '12px' }}>Avg time from trigger to bank credit (Industry best: 48h).</p>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '18px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <MapPin size={20} color="var(--primary)" /> Suggested High-Density Zones
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { zone: 'Anna Nagar Mall', orders: '+24%', risk: 'LOW' },
            { zone: 'Nungambakkam High Rd', orders: '+18%', risk: 'LOW' },
            { zone: 'Guindy Industrial Estate', orders: '+12%', risk: 'MED' },
          ].map((z, i) => (
            <div key={i} style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)', borderRadius: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h5 style={{ fontSize: '14px' }}>{z.zone}</h5>
                <span style={{ fontSize: '10px', color: z.risk === 'LOW' ? 'var(--success)' : 'var(--warning)' }}>{z.risk} RISK</span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Estimated order volume: <strong>{z.orders}</strong> higher than average.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insights;
