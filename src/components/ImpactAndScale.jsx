import React from 'react';
import { Users, TrendingUp, Heart, CloudLightning, DollarSign, Target, Zap, Globe, ShieldCheck, Cpu } from 'lucide-react';

const ImpactAndScale = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', padding: '20px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '900', background: 'linear-gradient(90deg, #6C63FF, #10B981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '12px' }}>
          Impact & Exponential Scale
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
          How PayNest is transforming the financial resilience of India's gig economy through AI-first protection.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        
        {/* Section 1: Social Impact */}
        <div className="card" style={{ borderTop: '4px solid #10B981', background: 'rgba(16, 185, 129, 0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px' }}>
              <Heart size={24} color="#10B981" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Social Impact</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Users size={20} color="var(--text-muted)" style={{ marginTop: '4px' }} />
              <div>
                <p style={{ fontSize: '20px', fontWeight: '900', color: 'white' }}>18,000+</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Gig workers protected</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <TrendingUp size={20} color="var(--text-muted)" style={{ marginTop: '4px' }} />
              <div>
                <p style={{ fontSize: '20px', fontWeight: '900', color: 'white' }}>32%</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Income stability improvement</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <ShieldCheck size={20} color="var(--text-muted)" style={{ marginTop: '4px' }} />
              <div>
                <p style={{ fontSize: '20px', fontWeight: '900', color: 'white' }}>₹2.4 Cr</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Claims supported</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <CloudLightning size={20} color="var(--text-muted)" style={{ marginTop: '4px' }} />
              <div>
                <p style={{ fontSize: '15px', fontWeight: '700', color: '#10B981' }}>Climate Risk Protection</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Security for daily earners</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Business Model */}
        <div className="card" style={{ borderTop: '4px solid #F59E0B', background: 'rgba(245, 158, 11, 0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ padding: '10px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px' }}>
              <DollarSign size={24} color="#F59E0B" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Business Model</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>Revenue Stream</p>
              <p style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>5% Platform Fee</p>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Collected per weekly premium</p>
            </div>

            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 'bold', textTransform: 'uppercase' }}>Target Projection</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <p style={{ fontSize: '20px', fontWeight: '900', color: 'white' }}>1M Users</p>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Market Penetration</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '18px', fontWeight: '900', color: '#F59E0B' }}>₹25 Cr/mo</p>
                  <p style={{ fontSize: '10px', color: 'var(--warning)', fontWeight: 'bold' }}>PROJECTED REVENUE</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '0 8px' }}>
              <Cpu size={18} color="var(--text-muted)" />
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Low-cost model via parametric automation</p>
            </div>
          </div>
        </div>

        {/* Section 3: Why It Scales */}
        <div className="card" style={{ borderTop: '4px solid #6C63FF', background: 'rgba(108, 99, 255, 0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ padding: '10px', background: 'rgba(108, 99, 255, 0.1)', borderRadius: '12px' }}>
              <Zap size={24} color="#6C63FF" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Why It Scales</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '16px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
              <ShieldCheck size={28} color="#6C63FF" style={{ flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '15px', fontWeight: '800', color: 'white', marginBottom: '4px' }}>Zero Trust Verification</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>No manual document checks required for claims. AI triggers do the work.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
              <Zap size={28} color="#6C63FF" style={{ flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '15px', fontWeight: '800', color: 'white', marginBottom: '4px' }}>Hyper-Automation</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>Fully automated payout engine handles 1M+ transactions with zero overhead.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px' }}>
              <Globe size={28} color="#6C63FF" style={{ flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '15px', fontWeight: '800', color: 'white', marginBottom: '4px' }}>Pan-India Reach</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>Works seamlessly in both rural and urban areas via satellite & IMD data.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ImpactAndScale;
