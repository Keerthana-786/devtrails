import React, { useState, useEffect } from 'react'
import { Card, Badge, Btn, ProgressBar } from '../components/UI.jsx'

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'development' ? 'http://localhost:8000' : (typeof window !== 'undefined' ? window.location.origin : 'https://devtrails.onrender.com'))

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');
  :root {
    --bg-main: #0B0E14;
    --card-bg: rgba(22, 28, 36, 0.6);
    --card-border: rgba(255, 255, 255, 0.04);
    --accent-blue: #3B82F6;
    --accent-green: #10B981;
    --accent-red: #EF4444;
    --accent-orange: #F59E0B;
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
    animation: fadeUp 0.5s ease;
  }
  .metric-box {
    padding: 12px;
    border-radius: 12px;
    text-align: center;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.05);
  }
  .timeline-step {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    position: relative;
    padding-bottom: 20px;
  }
  .timeline-step:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 15px;
    top: 32px;
    bottom: 0px;
    width: 2px;
    background: var(--card-border);
  }
  .timeline-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--accent-blue);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 700;
    flex-shrink: 0;
    z-index: 1;
  }
  .timeline-icon.active {
    background: var(--accent-green);
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  }
`

export default function DynamicPricingDemo() {

  const [pricingData, setPricingData] = useState(null)
  const [triggers, setTriggers] = useState(null)
  const [zeroTouchClaim, setZeroTouchClaim] = useState(null)
  const [loading, setLoading] = useState(false)

  // 9. NEW STATES
  const [walletBalance, setWalletBalance] = useState(150.00)
  const [policyStatus, setPolicyStatus] = useState('Active')
  const [autoPay, setAutoPay] = useState(true)
  const [nextDeductionDate, setNextDeductionDate] = useState('')
  const [incomeLoss, setIncomeLoss] = useState(450)
  const [coverageAmount, setCoverageAmount] = useState(225)
  const [fraudDetected, setFraudDetected] = useState(false)
  const [triggerSeverity, setTriggerSeverity] = useState('HIGH') // for alert banner

  // 1. WORKER PROFILE
  const workerProfile = {
    name: 'Demo Worker',
    platform: 'Swiggy',
    city: 'Mumbai',
    vehicleType: 'Bike',
    experience: 24, // months
    avgDailyEarnings: 800,
    basePremium: 80,
    zone: { lat: 19.0760, lng: 72.8777 },
    historicalSafety: 0.85,
    currentWeatherRisk: 0.3,
    trafficIndex: 0.4,
    timeOfDay: new Date().getHours(),
    dayOfWeek: new Date().getDay()
  }

  // Calculate Next Deduction Date
  useEffect(() => {
    const d = new Date()
    d.setDate(d.getDate() + (7 - d.getDay()) % 7 || 7)
    setNextDeductionDate(d.toLocaleDateString())
  }, [])

  // Auto-pause if wallet balance < premium
  useEffect(() => {
    const premium = pricingData?.dynamic_premium_inr || workerProfile.basePremium
    if (walletBalance < premium) setPolicyStatus('Paused')
    else setPolicyStatus('Active')
  }, [walletBalance, pricingData])

  const calculateProtectionPercentage = () => {
    return Math.round((coverageAmount / incomeLoss) * 100)
  }

  const getProtectionColor = (percent) => {
    if (percent > 70) return 'var(--accent-green)'
    if (percent >= 40) return 'var(--accent-orange)'
    return 'var(--accent-red)'
  }

  const calculateDynamicPricing = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/ai/pricing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base_premium: workerProfile.basePremium,
          zone_lat: workerProfile.zone.lat,
          zone_lng: workerProfile.zone.lng,
          worker_experience_months: workerProfile.experience,
          vehicle_type: workerProfile.vehicleType,
          historical_safety_score: workerProfile.historicalSafety,
          current_weather_risk: workerProfile.currentWeatherRisk,
          traffic_congestion_index: workerProfile.trafficIndex,
          time_of_day: workerProfile.timeOfDay,
          day_of_week: workerProfile.dayOfWeek
        })
      })

      if (response.ok) {
        const data = await response.json()
        setPricingData(data)
      }
    } catch (error) {
      console.error('Dynamic pricing calculation failed:', error)
      // Mock data for demo
      setPricingData({
        dynamic_premium_inr: 76.50,
        base_premium_inr: 80,
        adjustment_breakdown: {
          zone_safety_discount: 2,
          experience_multiplier: 0.88,
          vehicle_risk_multiplier: 1.2,
          time_risk_multiplier: 1.0,
          overall_risk_multiplier: 1.056
        },
        explainability: {
            weather_impact: 10.50,
            traffic_impact: 4.00,
            safety_discount: -12.00,
            experience_discount: -6.00
        },
        coverage_adjustment: {
          base_hours: 12,
          additional_hours: 2,
          total_coverage_hours: 14
        },
        risk_factors: {
          weather_risk: 0.3,
          traffic_risk: 0.4,
          historical_safety: 0.85
        },
        recommendations: ["Premium discount applied", "Extra coverage activated"]
      })
    }
    setLoading(false)
  }

  const checkTriggers = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/ai/disruptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          worker_id: 'DEMO_WORKER_001',
          current_lat: 19.0760,
          current_lng: 72.8777,
          timestamp: new Date().toISOString(),
          weather_condition: 'Partly Cloudy',
          traffic_speed_kmh: 25,
          orders_active: 3
        })
      })

      if (response.ok) {
        const data = await response.json()
        setTriggers(data)
      }
    } catch (error) {
      console.error('Trigger check failed:', error)
      // Mock trigger data
      setTriggers({
        worker_id: 'DEMO_WORKER_001',
        active_triggers: [
          {
            trigger_id: 'TRAFFIC_CONGESTION',
            type: 'Traffic Disruption',
            severity: 'MEDIUM',
            description: 'Moderate traffic congestion detected',
            estimated_loss_hours: 2.1,
            auto_claim_eligible: false,
            confidence: 0.88
          },
          {
            trigger_id: 'ORDER_SHORTFALL',
            type: 'Business Disruption',
            severity: 'MEDIUM',
            description: 'Order volume below expected',
            estimated_loss_hours: 1.8,
            auto_claim_eligible: false,
            confidence: 0.76
          }
        ],
        auto_claim_candidates: [],
        requires_manual_review: []
      })
    }
    setLoading(false)
  }

  const processZeroTouchClaim = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE}/api/ai/loss`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          worker_id: 'DEMO_WORKER_001',
          current_lat: 19.0760,
          current_lng: 72.8777,
          timestamp: new Date().toISOString(),
          weather_condition: 'Heavy Rain',
          traffic_speed_kmh: 8,
          orders_active: 1
        })
      })

      if (response.ok) {
        const data = await response.json()
        setZeroTouchClaim(data)
      }
    } catch (error) {
      console.error('Zero-touch claim failed:', error)
      setZeroTouchClaim({
        status: 'AUTO_APPROVED',
        claim_id: 'ZC1703123456789',
        payout_amount_inr: 225.00,
        processing_time: '2-5 minutes',
        confirmation_message: '₹225 will be credited to your account within 24 hours',
        next_steps: [
          'Payment will be processed automatically',
          'Check your bank account in 24-48 hours',
          'No further action required'
        ]
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    calculateDynamicPricing()
    checkTriggers()
  }, [])

  return (
    <div style={{ padding: '30px 24px', background: 'var(--bg-main)', minHeight: '100vh', fontFamily: "'Outfit', sans-serif", color: 'var(--text-primary)' }}>
      <style>{css}</style>
      
      {/* 8. REAL-TIME ALERT BANNER */}
      {triggerSeverity === 'HIGH' && (
        <div style={{
          background: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid var(--accent-red)',
          padding: '16px 20px',
          borderRadius: '12px',
          marginBottom: '24px',
          animation: 'fadeUp 0.5s ease'
        }}>
          <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--accent-red)', marginBottom: '4px' }}>
            ⚠️ You lost ₹{incomeLoss} due to heavy rain today
          </div>
          <div style={{ fontSize: '14px', color: '#FFFFFF' }}>
            ₹{coverageAmount} has been automatically credited to your wallet.
          </div>
        </div>
      )}

      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '4px' }}>
          Gig Worker Protection Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Fully automated AI-powered insurance & safety monitoring
        </p>
      </div>

      {/* 1. WORKER PROFILE CARD */}
      <div className="dash-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif" }}>
            👤 Worker Profile
          </h2>
          <Badge label="Verified Agent" color="var(--accent-green)" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
          <div className="metric-box">
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Name</div>
            <div style={{ fontSize: '16px', fontWeight: '600' }}>{workerProfile.name}</div>
          </div>
          <div className="metric-box">
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Platform</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#F59E0B' }}>{workerProfile.platform}</div>
          </div>
          <div className="metric-box">
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Vehicle</div>
            <div style={{ fontSize: '16px', fontWeight: '600' }}>{workerProfile.vehicleType}</div>
          </div>
          <div className="metric-box">
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Experience</div>
            <div style={{ fontSize: '16px', fontWeight: '600' }}>{workerProfile.experience} months</div>
          </div>
          <div className="metric-box">
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Avg Earnings</div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--accent-green)' }}>₹{workerProfile.avgDailyEarnings}/day</div>
          </div>
          <div className="metric-box">
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>City</div>
            <div style={{ fontSize: '16px', fontWeight: '600' }}>{workerProfile.city}</div>
          </div>
        </div>
      </div>

      {/* 2. ACTIVE PLAN / WEEKLY SUBSCRIPTION */}
      <div className="dash-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif" }}>
            💳 Active Protection Plan
          </h2>
          <Badge 
            label={policyStatus} 
            color={policyStatus === 'Active' ? 'var(--accent-green)' : 'var(--accent-red)'} 
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Weekly Premium</div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--accent-blue)' }}>
              ₹{pricingData?.dynamic_premium_inr || workerProfile.basePremium}
            </div>
          </div>
          
          <div style={{ height: '40px', width: '1px', background: 'var(--card-border)' }}></div>

          <div style={{ flex: 1, minWidth: '200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Wallet Balance:</span>
              <span style={{ fontWeight: '600', color: walletBalance < (pricingData?.dynamic_premium_inr||80) ? 'var(--accent-red)' : '#fff' }}>
                ₹{walletBalance.toFixed(2)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Next Deduction:</span>
              <span style={{ fontWeight: '600' }}>{nextDeductionDate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>AutoPay Status:</span>
              <span 
                style={{ fontWeight: '600', color: autoPay ? 'var(--accent-green)' : 'var(--text-secondary)', cursor: 'pointer' }}
                onClick={() => setAutoPay(!autoPay)}
              >
                {autoPay ? 'ON' : 'OFF'} ⚙️
              </span>
            </div>
          </div>
        </div>

        {policyStatus === 'Paused' && (
          <div style={{ background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: '8px', color: 'var(--accent-red)', fontSize: '13px', marginBottom: '16px' }}>
            Insufficient wallet balance. Please top up to maintain coverage.
          </div>
        )}

        <Btn onClick={() => setWalletBalance(b => b + 100)} style={{ width: '100%', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
          Top Up Wallet (+₹100)
        </Btn>
      </div>

      {/* 3. INCOME PROTECTION INSIGHT */}
      <div className="dash-card">
        <h2 style={{ fontSize: '18px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '16px' }}>
          📊 Income Protection This Week
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Est. Income Loss</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-red)' }}>₹{incomeLoss}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Protected Amount</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--accent-green)' }}>₹{coverageAmount}</div>
          </div>
        </div>

        <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>Recovery Score</span>
          <span style={{ fontSize: '16px', fontWeight: '800', color: getProtectionColor(calculateProtectionPercentage()) }}>
            {calculateProtectionPercentage()}%
          </span>
        </div>

        <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ width: `${calculateProtectionPercentage()}%`, height: '100%', background: getProtectionColor(calculateProtectionPercentage()), borderRadius: '6px', transition: 'width 0.5s ease' }}></div>
        </div>
      </div>

      {/* 5. DYNAMIC PRICING & 4. AI EXPLAINABILITY */}
      <div className="dash-card">
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '16px' }}>
          🔄 AI Dynamic Pricing
        </h2>

        {pricingData ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Base Premium</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-secondary)' }}>
                  ₹{pricingData.base_premium_inr}
                </div>
              </div>
              <div style={{ fontSize: '24px', color: '#1A73E8' }}>→</div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Dynamic Premium</div>
                <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--accent-blue)' }}>
                  ₹{pricingData.dynamic_premium_inr}
                </div>
              </div>
            </div>

            {/* AI EXPLAINABILITY PANEL */}
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--card-border)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>🤔 Why your premium changed?</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>🌧 Weather Risk Impact</span>
                  <span style={{ color: 'var(--accent-red)', fontWeight: '600' }}>+₹{(pricingData.explainability?.weather_impact || 10.5).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>🚗 Traffic Impact</span>
                  <span style={{ color: 'var(--accent-red)', fontWeight: '600' }}>+₹{(pricingData.explainability?.traffic_impact || 4.0).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>⭐ Experience Discount</span>
                  <span style={{ color: 'var(--accent-green)', fontWeight: '600' }}>-₹{Math.abs(pricingData.explainability?.experience_discount || -6.0).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>🛡 Safety Discount</span>
                  <span style={{ color: 'var(--accent-green)', fontWeight: '600' }}>-₹{Math.abs(pricingData.explainability?.safety_discount || -12.0).toFixed(2)}</span>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
            {loading ? 'Calculating dynamic pricing...' : 'Click calculate to see AI-driven pricing'}
          </div>
        )}

        <Btn onClick={calculateDynamicPricing} disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Calculating...' : 'Recalculate Dynamic Pricing'}
        </Btn>
      </div>

      {/* 6. AUTOMATED TRIGGERS */}
      <div className="dash-card">
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '16px' }}>
          🚨 Automated Disruption Triggers
        </h2>

        {triggers ? (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {triggers.active_triggers.map((trigger, index) => (
                <Card key={index} style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                        {trigger.type}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {trigger.description}
                      </div>
                    </div>
                    <Badge
                      label={trigger.severity}
                      color={
                        trigger.severity === 'HIGH' ? '#E23744' :
                        trigger.severity === 'MEDIUM' ? '#F97316' : '#FACC15'
                      }
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                    <span>Est. Loss: {trigger.estimated_loss_hours.toFixed(1)} hours</span>
                    <span>Confidence: {(trigger.confidence * 100).toFixed(0)}%</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
            Checking for disruptions...
          </div>
        )}
      </div>

      {/* 7. ZERO-TOUCH CLAIMS */}
      <div className="dash-card">
        <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '16px' }}>
          ⚡ Zero-Touch Claims Processing
        </h2>

        {zeroTouchClaim ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Badge
                label={zeroTouchClaim.status}
                color={zeroTouchClaim.status === 'AUTO_APPROVED' ? '#3AB757' : '#E23744'}
                style={{ fontSize: '16px', padding: '8px 16px' }}
              />
            </div>

            {zeroTouchClaim.status === 'AUTO_APPROVED' && (
              <div>
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Instant Payout</div>
                  <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--accent-green)' }}>
                    ₹{zeroTouchClaim.payout_amount_inr.toFixed(0)}
                  </div>
                  <div style={{ fontSize: '12px', color: '#3AB757', fontWeight: '600' }}>
                    {zeroTouchClaim.confirmation_message}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>
            Simulate a disruption to test zero-touch claims
          </div>
        )}

        <Btn onClick={processZeroTouchClaim} disabled={loading} style={{ width: '100%', marginTop: '16px' }}>
          {loading ? 'Processing...' : 'Test Zero-Touch Claim'}
        </Btn>
      </div>

      {/* 8. RISK FORECAST (PREDICTIVE AI) */}
      <div className="dash-card">
        <h2 style={{ fontSize: '18px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '16px' }}>
          🔮 Tomorrow's Risk Forecast
        </h2>
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--accent-orange)' }}>🌧 Heavy Rain Expected</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Expected Loss: ₹300 - ₹500</div>
            </div>
            <Badge label="HIGH RISK" color="var(--accent-red)" />
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>💡 Recommendation: </span>
             Work early hours (6 AM - 11 AM) to avoid peak rainfall and maximize earnings.
          </div>
        </div>
      </div>

      {/* 9. FRAUD DETECTION STATUS */}
      <div className="dash-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif" }}>
            🛡 Security & Fraud Check
          </h2>
          <span style={{ cursor: 'pointer', fontSize: '12px', color: 'var(--text-secondary)' }} onClick={() => setFraudDetected(!fraudDetected)}>
            {fraudDetected ? 'Simulate Verified' : 'Simulate Fraud'}
          </span>
        </div>

        {fraudDetected ? (
          <div style={{ padding: '16px', background: 'rgba(239,68,68,0.1)', borderRadius: '12px', border: '1px solid var(--accent-red)' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent-red)', marginBottom: '8px' }}>❌ Fraud Alert Triggered</div>
            <div style={{ fontSize: '13px', color: '#fff' }}>GPS location does not match the active storm perimeter. Claim flagged for manual review.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
              <span style={{ background: 'rgba(16,185,129,0.2)', padding: '4px', borderRadius: '50%' }}>✅</span>
              Location Verified against live delivery app
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
              <span style={{ background: 'rgba(16,185,129,0.2)', padding: '4px', borderRadius: '50%' }}>✅</span>
              Activity Matched (Order active during rain)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
              <span style={{ background: 'rgba(16,185,129,0.2)', padding: '4px', borderRadius: '50%' }}>✅</span>
              No Duplicate Claims within 24 hours
            </div>
          </div>
        )}
      </div>

      {/* 10. WEEKLY LIFECYCLE TIMELINE */}
      <div className="dash-card">
        <h2 style={{ fontSize: '18px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '20px' }}>
          🔁 Customer Journey Timeline
        </h2>
        
        <div style={{ paddingLeft: '8px' }}>
          <div className="timeline-step">
            <div className="timeline-icon active">✓</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Policy Active (Monday)</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Premium locked: ₹76.50</div>
            </div>
          </div>
          
          <div className="timeline-step">
            <div className="timeline-icon active">✓</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Risk Detected (Wednesday)</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Heavy Rain algorithm triggered</div>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-icon active">✓</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Income Loss Event</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>1 Hour delay validated</div>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-icon active">✓</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Auto Claim Triggered</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Zero-touch verification completed</div>
            </div>
          </div>

          <div className="timeline-step">
            <div className="timeline-icon active">✓</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Payout Processed</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>₹225 credited instantly</div>
            </div>
          </div>

          <div className="timeline-step" style={{ paddingBottom: 0 }}>
            <div className="timeline-icon" style={{ background: 'rgba(255,255,255,0.1)' }}>⏳</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>Weekly Premium Deducted</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Scheduled for {nextDeductionDate}</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}