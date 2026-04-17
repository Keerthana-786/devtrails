import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Brain, TrendingUp, AlertTriangle, ShieldCheck, Clock, MapPin, Search } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Insights = () => {
  const { weatherData, worker } = useApp();

  useEffect(() => {
    document.title = 'PayNest — AI Insights';
  }, []);

  // Simulate a 24h risk forecast based on current weather
  const hourlyRiskData = useMemo(() => {
    const baseRisk = weatherData.rainfall > 35 ? 80 : (weatherData.rainfall > 10 ? 40 : 15);
    return [
      { time: '10 AM', risk: baseRisk - 10, rain: weatherData.rainfall * 0.5 },
      { time: '12 PM', risk: baseRisk, rain: weatherData.rainfall },
      { time: '2 PM', risk: Math.min(100, baseRisk + 20), rain: weatherData.rainfall * 1.5 },
      { time: '4 PM', risk: Math.min(100, baseRisk + 35), rain: weatherData.rainfall * 2 },
      { time: '6 PM', risk: Math.max(10, baseRisk - 5), rain: weatherData.rainfall * 0.8 },
      { time: '8 PM', risk: Math.max(5, baseRisk - 20), rain: weatherData.rainfall * 0.2 },
      { time: '10 PM', risk: 5, rain: 0 },
    ];
  }, [weatherData]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>AI Insights</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Predictive intelligence for {worker.city} • Zone: {worker.zone}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
           <div className="badge badge-live" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', fontWeight: '800' }}>MONITORING ACTIVE</div>
           <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Last sync: Just now</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '32px' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '24px', border: '1px solid rgba(108, 99, 255, 0.2)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <h3 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <Brain size={20} color="var(--primary)" /> 24-Hour Risk Forecast
             </h3>
             <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Confidence: 94.8%</div>
          </div>
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyRiskData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={weatherData.rainfall > 35 ? '#EF4444' : 'var(--primary)'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D44" vertical={false} />
                <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} unit="%" />
                <Tooltip 
                   contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '16px', boxShadow: '0 12px 32px rgba(0,0,0,0.4)' }}
                />
                <Area type="monotone" dataKey="risk" name="Disruption Risk" stroke={weatherData.rainfall > 35 ? '#EF4444' : 'var(--primary)'} fillOpacity={1} fill="url(#colorRisk)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--card-border)' }}>
             <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
               <ShieldCheck size={14} style={{ display: 'inline', marginRight: '6px', color: 'var(--success)' }} />
               AI Prediction: {weatherData.rainfall > 20 ? 'High probability of parametric trigger activation within the next 4 hours.' : 'Low immediate disruption risk. Optimal window for earnings maximization.'}
             </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="card" style={{ flex: 1 }}>
            <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>Earnings Optimization</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ padding: '20px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <p style={{ fontSize: '14px', fontWeight: '800', color: 'var(--success)', marginBottom: '4px' }}>EARN MODE</p>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Clear sky window detected. High order frequency expected in T-minus 20 mins.</p>
              </div>
              <div style={{ padding: '20px', background: 'rgba(108, 99, 255, 0.05)', borderRadius: '16px', border: '1px solid rgba(108, 99, 255, 0.1)' }}>
                <p style={{ fontSize: '14px', fontWeight: '800', color: 'var(--primary)', marginBottom: '4px' }}>PROTECT MODE</p>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Trigger threshold approaching. System standing by for automatic income offset.</p>
              </div>
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                 <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Recommendation based on your <strong>{worker.trustScore} Trust Score</strong> and zone demand.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <div className="card">
          <h4 style={{ fontSize: '13px', marginBottom: '16px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Stability Score</h4>
          <h3 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '8px' }}>92.4%</h3>
          <p style={{ fontSize: '12px', color: 'var(--success)' }}>+14.2% vs un-insured peers</p>
        </div>
        
        <div className="card">
          <h4 style={{ fontSize: '13px', marginBottom: '16px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Coverage Health</h4>
          <h3 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '8px' }}>Active</h3>
          <p style={{ fontSize: '12px', color: 'var(--primary)' }}>Valid until {worker.policyValidUntil}</p>
        </div>

        <div className="card">
          <h4 style={{ fontSize: '13px', marginBottom: '16px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Payout Latency</h4>
          <h3 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '8px' }}>47m</h3>
          <p style={{ fontSize: '12px', color: '#10B981' }}>IMD → PayNest → Bank</p>
        </div>
      </div>
    </div>
  );
};

export default Insights;

