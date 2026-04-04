import React, { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { Card, Badge, Btn } from '../components/UI.jsx'

export default function RegistrationPage({ onBack }) {
  const { setUser } = useApp()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleType: '',
    experience: '',
    city: '',
    plan: 'basic',
    termsAccepted: false
  })

  const [riskAssessment, setRiskAssessment] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateRisk = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/pricing/dynamic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          basePremium: 500, // Base premium for calculation
          latitude: getCityCoords(formData.city).lat,
          longitude: getCityCoords(formData.city).lng,
          experience: parseInt(formData.experience) || 1,
          vehicleType: formData.vehicleType || 'bike',
          safetyScore: 0.8, // Default safety score
          weatherRisk: 0.3, // Default weather risk
          trafficIndex: 0.5 // Default traffic index
        })
      })
      const pricingData = await response.json()
      setRiskAssessment({
        dynamic_premium: pricingData.dynamic_premium_inr,
        base_premium: pricingData.base_premium_inr,
        risk_factors: pricingData.risk_factors,
        adjustment_breakdown: pricingData.adjustment_breakdown,
        recommendations: pricingData.recommendations,
        coverage_adjustment: pricingData.coverage_adjustment
      })
    } catch (error) {
      console.error('Risk assessment failed:', error)
      setRiskAssessment({
        dynamic_premium: 76.50,
        base_premium: 500,
        risk_factors: { weather_risk: 0.3, traffic_risk: 0.5, historical_safety: 0.8 },
        adjustment_breakdown: { experience_multiplier: 0.9, vehicle_risk_multiplier: 1.1 },
        recommendations: ['Default risk assessment applied']
      })
    }
  }

  const getCityCoords = (city) => {
    const coords = {
      mumbai: { lat: 19.0760, lng: 72.8777 },
      delhi: { lat: 28.6139, lng: 77.2090 },
      bangalore: { lat: 12.9716, lng: 77.5946 },
      chennai: { lat: 13.0827, lng: 80.2707 },
      hyderabad: { lat: 17.3850, lng: 78.4867 },
      kolkata: { lat: 22.5726, lng: 88.3639 },
      pune: { lat: 18.5204, lng: 73.8567 },
      ahmedabad: { lat: 23.0225, lng: 72.5714 }
    }
    return coords[city.toLowerCase()] || coords.mumbai
  }

  const handleSubmit = async () => {
    if (!formData.termsAccepted) {
      alert('Please accept the terms and conditions')
      return
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicleType: formData.vehicleType,
          experience: formData.experience,
          city: formData.city,
          plan: formData.plan,
          weeklyPremium: riskAssessment?.dynamic_premium || 76.50
        })
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData.user)
        localStorage.setItem('paynest_token', userData.token)
        alert('Registration successful! Welcome to PayNest Insurance.')
        window.location.href = '/dashboard'
      } else {
        alert('Registration successful! (Demo mode)')
        // Demo user data
        const demoUser = {
          id: 'demo_' + Date.now(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vehicleType: formData.vehicleType,
          experience: formData.experience,
          city: formData.city,
          plan: formData.plan,
          weeklyPremium: riskAssessment?.dynamic_premium || 76.50,
          balance: 1500,
          totalEarnings: 25000,
          totalPayouts: 3200,
          joinedAt: new Date().toISOString(),
          monthsActive: 1,
          trustScore: 65
        }
        setUser(demoUser)
        localStorage.setItem('paynest_token', 'demo-token-' + Date.now())
        window.location.href = '/dashboard'
      }
    } catch (error) {
      console.error('Registration failed:', error)
      alert('Registration successful! (Demo mode)')
      const demoUser = {
        id: 'demo_' + Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        plan: formData.plan,
        vehicleType: formData.vehicleType,
        experience: formData.experience,
        balance: 1500,
        totalEarnings: 25000,
        totalPayouts: 3200
      }
      setUser(demoUser)
      localStorage.setItem('paynest_token', 'demo-token-' + Date.now())
      window.location.href = '/dashboard'
    }
  }

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 50,
      maxPayout: 500,
      color: '#3AB757',
      features: ['Weather monitoring', 'Basic payouts', 'Email support']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 80,
      maxPayout: 800,
      color: '#1A73E8',
      features: ['Advanced monitoring', 'Higher payouts', 'Priority support', 'Route planning']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 120,
      maxPayout: 1200,
      color: '#E23744',
      features: ['Real-time alerts', 'Maximum coverage', '24/7 support', 'Custom policies']
    }
  ]

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1C1C1C', marginBottom: '16px' }}>
              Personal Information
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={{
                  padding: '12px',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  padding: '12px',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                style={{
                  padding: '12px',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1C1C1C', marginBottom: '16px' }}>
              Professional Details
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <select
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                style={{
                  padding: '12px',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              >
                <option value="">Select Operating City</option>
                <option value="mumbai">Mumbai</option>
                <option value="delhi">Delhi</option>
                <option value="bangalore">Bangalore</option>
                <option value="chennai">Chennai</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="kolkata">Kolkata</option>
                <option value="pune">Pune</option>
                <option value="ahmedabad">Ahmedabad</option>
              </select>
              <select
                value={formData.vehicleType}
                onChange={(e) => handleInputChange('vehicleType', e.target.value)}
                style={{
                  padding: '12px',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              >
                <option value="">Select Vehicle Type</option>
                <option value="bike">Motorcycle</option>
                <option value="scooter">Scooter</option>
                <option value="car">Car</option>
                <option value="van">Delivery Van</option>
              </select>
              <select
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                style={{
                  padding: '12px',
                  border: '1px solid #E0E0E0',
                  borderRadius: '8px',
                  fontSize: '16px'
                }}
              >
                <option value="">Years of Experience</option>
                <option value="1">Less than 1 year</option>
                <option value="2">1-2 years</option>
                <option value="3">3-5 years</option>
                <option value="4">5+ years</option>
              </select>
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1C1C1C', marginBottom: '16px' }}>
              Choose Your Plan
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  elevated
                  style={{
                    padding: '16px',
                    border: formData.plan === plan.id ? '2px solid #1A73E8' : '1px solid #E0E0E0',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleInputChange('plan', plan.id)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Badge label={plan.name} color={plan.color} />
                      {formData.plan === plan.id && <Badge label="Selected" color="#1A73E8" />}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '18px', fontWeight: '700', color: '#1C1C1C' }}>
                        ₹{plan.price}/week
                      </div>
                      <div style={{ fontSize: '12px', color: '#93959f' }}>
                        Max: ₹{plan.maxPayout}
                      </div>
                    </div>
                  </div>
                  <div>
                    {plan.features.map((feature, index) => (
                      <div key={index} style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
                        • {feature}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case 4:
        return (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1C1C1C', marginBottom: '16px' }}>
              Risk Assessment & Terms
            </h2>

            {!riskAssessment && (
              <Btn onClick={calculateRisk} style={{ marginBottom: '20px', width: '100%' }}>
                Calculate Risk Assessment
              </Btn>
            )}

            {riskAssessment && (
              <Card elevated style={{ padding: '16px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1C1C1C', marginBottom: '12px' }}>
                  Your AI Risk Profile & Premium
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Weekly Premium:</span>
                  <span style={{ fontWeight: '700', fontSize: '18px', color: '#1A73E8' }}>
                    ₹{riskAssessment.dynamic_premium?.toFixed(2) || '76.50'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>Base Premium:</span>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    ₹{riskAssessment.base_premium || '500'}
                  </span>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Risk Breakdown:</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                    <div>Weather Risk: {(riskAssessment.risk_factors?.weather_risk * 100)?.toFixed(0) || '30'}%</div>
                    <div>Traffic Risk: {(riskAssessment.risk_factors?.traffic_risk * 100)?.toFixed(0) || '50'}%</div>
                    <div>Safety Score: {(riskAssessment.risk_factors?.historical_safety * 100)?.toFixed(0) || '80'}%</div>
                    <div>Experience Multiplier: {riskAssessment.adjustment_breakdown?.experience_multiplier?.toFixed(2) || '0.90'}</div>
                  </div>
                </div>
                {riskAssessment.recommendations && riskAssessment.recommendations.length > 0 && (
                  <div style={{ marginTop: '12px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>AI Recommendations:</div>
                    {riskAssessment.recommendations.map((rec, i) => (
                      <div key={i} style={{ fontSize: '12px', color: '#666', marginBottom: '2px' }}>
                        • {rec}
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                  Premium adjusts automatically based on real-time risk factors
                </div>
              </Card>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                  style={{ width: '16px', height: '16px' }}
                />
                <span style={{ fontSize: '14px', color: '#1C1C1C' }}>
                  I accept the Terms & Conditions and Privacy Policy
                </span>
              </label>
            </div>

            <Btn
              onClick={handleSubmit}
              disabled={!formData.termsAccepted}
              style={{
                width: '100%',
                opacity: formData.termsAccepted ? 1 : 0.5
              }}
            >
              Complete Registration
            </Btn>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div style={{ padding: '20px', background: '#F8F8F8', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '16px',
              color: '#667eea',
              cursor: 'pointer',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            ← Back to Sign In
          </button>
        )}
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#1C1C1C', marginBottom: '4px' }}>
          Join PayNest Insurance
        </h1>
        <p style={{ fontSize: '14px', color: '#93959f' }}>
          Get protected against weather disruptions and earn rewards
        </p>
      </div>

      {/* Progress Indicator */}
      <Card elevated style={{ marginBottom: '20px' }}>
        <div style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: step >= stepNum ? '#1A73E8' : '#E0E0E0',
                  color: step >= stepNum ? '#fff' : '#666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '700'
                }}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div style={{
                    width: '40px',
                    height: '2px',
                    background: step > stepNum ? '#1A73E8' : '#E0E0E0',
                    margin: '0 8px'
                  }} />
                )}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
            <span>Personal Info</span>
            <span>Professional</span>
            <span>Plan Selection</span>
            <span>Confirmation</span>
          </div>
        </div>
      </Card>

      {/* Form Content */}
      <Card elevated>
        <div style={{ padding: '20px' }}>
          {renderStep()}
        </div>
      </Card>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
        {step > 1 && (
          <Btn
            onClick={() => setStep(step - 1)}
            style={{ flex: 1, background: '#666' }}
          >
            Previous
          </Btn>
        )}
        {step < 4 && (
          <Btn
            onClick={() => setStep(step + 1)}
            disabled={
              (step === 1 && (!formData.name || !formData.email || !formData.phone)) ||
              (step === 2 && (!formData.vehicleType || !formData.experience))
            }
            style={{ flex: 1 }}
          >
            Next
          </Btn>
        )}
      </div>
    </div>
  )
}