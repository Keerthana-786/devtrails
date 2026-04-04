import React, { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { Card, Badge, Btn } from '../components/UI.jsx'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');
  :root {
    --bg-main: #0B0E14;
    --card-bg: rgba(22, 28, 36, 0.6);
    --card-border: rgba(255, 255, 255, 0.04);
    --accent-blue: #3B82F6;
    --accent-green: #10B981;
    --accent-red: #EF4444;
    --text-primary: #FFFFFF;
    --text-secondary: #94A3B8;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .dash-card {
    background: var(--card-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    padding: 24px;
    margin-bottom: 20px;
  }
  .section-nav button {
    flex: 1; padding: 14px; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px;
    background: rgba(0,0,0,0.3); color: var(--text-secondary); font-family: 'Outfit'; font-weight: 600; cursor: pointer; transition: 0.3s;
  }
  .section-nav button.active {
    background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.5); color: var(--accent-blue);
  }
`

export default function PolicyPage() {
  const { user, payouts, weeklyPremium, pricingBreakdown } = useApp()
  const [selectedSection, setSelectedSection] = useState('overview')

  const plan = {
    name: user?.plan === 'premium' ? 'Premium' : user?.plan === 'enterprise' ? 'Enterprise' : 'Basic',
    maxPayout: user?.plan === 'premium' ? 800 : user?.plan === 'enterprise' ? 1200 : 500,
    color: user?.plan === 'premium' ? '#1A73E8' : user?.plan === 'enterprise' ? '#E23744' : '#3AB757'
  }

  const getNextDeductionDate = () => {
    const today = new Date();
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + (7 - today.getDay()) % 7 || 7);
    return nextSunday.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  const sections = {
    overview: {
      title: 'Policy Overview',
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '8px' }}>
              Your Current Plan
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Badge label={plan.name} color={plan.color} />
              <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Zero-Touch Parametric Structure
              </div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
              Next deduction: {getNextDeductionDate()}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '12px' }}>
              Coverage Details
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: '#E23744' }}>₹{plan.maxPayout}/claim</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Max Limit Per Disruption</div>
              </div>
              <div style={{ padding: '12px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                <div style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>24/7</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>AI Monitoring Active</div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '6px' }}>
              Dynamic Premium Details
            </h3>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '15px' }}>
                <span style={{color: 'var(--text-secondary)'}}>Base Rate:</span>
                <span style={{fontWeight: '700'}}>₹76.50/week</span>
              </div>
              
              <div style={{ borderTop: '1px dashed rgba(255,255,255,0.1)', marginTop: '20px', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '20px', fontFamily: "'Space Grotesk', sans-serif" }}>
                <span>Final Weekly Premium:</span>
                <span style={{color: 'var(--accent-blue)'}}>₹{weeklyPremium.toFixed(2)}/week</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    claims: {
      title: 'Auto-Claims Log',
      content: (
        <div>
          <div style={{ marginBottom: '20px', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px' }}>
             <div style={{ fontSize: '14px', fontWeight: '700', color: '#10B981', marginBottom: '4px' }}>🛡 Zero-Touch Operations Active</div>
             <p style={{ margin: 0, fontSize: '12px', color: '#6EE7B7' }}>
               Manual claims are disabled. Our AI engine actively monitors your parameters (weather, traffic, orders) and pays out instantly if disruptions exceed risk tolerances.
             </p>
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '12px' }}>
              Recent Zero-Touch Claims
            </h3>
            {(payouts || []).length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
                No active auto-claims
              </div>
            ) : (
              (payouts || []).map((claim) => (
                <Card key={claim?.id || Math.random()} elevated style={{ marginBottom: '12px', padding: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {claim.aiGenerated ? '🤖 AI Disruption Trigger' : 'Trigger'} 
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {new Date(claim.createdAt).toLocaleString()} • ID: {claim.id.substring(4, 12)}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: '#3AB757' }}>
                        ₹{claim.amount}
                      </div>
                      <Badge
                        label={claim.status}
                        color={claim.status === 'COMPLETED' ? '#3AB757' : '#F59E0B'}
                      />
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      )
    }
  }

  return (
    <div style={{ padding: '40px', background: 'var(--bg-main)', minHeight: '100vh', fontFamily: "'Outfit', sans-serif", color: 'var(--text-primary)', maxWidth: '1400px', margin: '0 auto' }}>
      <style>{css}</style>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '8px' }}>
          Policy Details
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
          Review your zero-touch parametric coverages
        </p>
      </div>

      <div className="dash-card">
        <div className="section-nav" style={{ display: 'flex', gap: '12px' }}>
          {Object.entries(sections).map(([key, section]) => (
            <button key={key} className={selectedSection === key ? 'active' : ''} onClick={() => setSelectedSection(key)}>
              {section.title}
            </button>
          ))}
        </div>
      </div>

      <div className="dash-card" style={{ animation: "fadeUp 0.4s ease" }}>
        {sections[selectedSection].content}
      </div>
    </div>
  )
}
