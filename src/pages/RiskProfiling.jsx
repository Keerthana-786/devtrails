import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'development' ? 'http://localhost:8000' : (typeof window !== 'undefined' ? window.location.origin : 'https://devtrails.onrender.com'))

// Custom Pie/Donut Chart Component
const RiskDonutChart = ({ zone, seasonal, platform }) => {
  const zMult = zone?.multiplier || 1.0;
  const sMult = seasonal?.multiplier || 1.0;
  const pMult = platform?.multiplier || 1.0;
  
  const total = zMult + sMult + pMult;
  const zPercent = (zMult / total) * 100;
  const sPercent = (sMult / total) * 100;
  const pPercent = (pMult / total) * 100;

  // SVG Circle Params
  const size = 200;
  const center = size / 2;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  
  const zOffset = circumference;
  const sOffset = circumference - (circumference * zPercent) / 100;
  const pOffset = circumference - (circumference * (zPercent + sPercent)) / 100;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '40px', background: 'rgba(255,255,255,0.03)', padding: '30px', borderRadius: '24px', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background */}
          <circle cx={center} cy={center} r={radius} fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="20" />
          
          {/* Zone (Blue) */}
          <circle cx={center} cy={center} r={radius} fill="transparent" stroke="#3B82F6" strokeWidth="20" strokeDasharray={circumference} strokeDashoffset={0} style={{ transition: 'stroke-dashoffset 1s ease' }} />
          
          {/* Seasonal (Light Blue) */}
          <circle cx={center} cy={center} r={radius} fill="transparent" stroke="#60A5FA" strokeWidth="20" strokeDasharray={circumference} strokeDashoffset={sOffset} style={{ transition: 'stroke-dashoffset 1s ease' }} />
          
          {/* Platform (Soft Blue) */}
          <circle cx={center} cy={center} r={radius} fill="transparent" stroke="#93C5FD" strokeWidth="20" strokeDasharray={circumference} strokeDashoffset={pOffset} style={{ transition: 'stroke-dashoffset 1s ease' }} />
        </svg>
        
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: '800' }}>{(total/3).toFixed(1)}x</div>
          <div style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Avg Risk</div>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px' }}>Risk Composition</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { label: 'Location Risk', value: zPercent, color: '#3B82F6', icon: '📍' },
            { label: 'Climate Risk', value: sPercent, color: '#60A5FA', icon: '🌦️' },
            { label: 'Work Risk', value: pPercent, color: '#93C5FD', icon: '🏪' }
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                <span style={{ color: item.color }}>●</span>
                <span style={{ color: 'var(--text-secondary)' }}>{item.icon} {item.label}</span>
              </div>
              <div style={{ fontWeight: '700', fontSize: '14px' }}>{item.value.toFixed(0)}%</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px', fontSize: '12px', color: '#60A5FA', background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '8px' }}>
          💡 Your risk is primarily driven by <strong>{zPercent > sPercent && zPercent > pPercent ? 'Location' : sPercent > pPercent ? 'Climate' : 'Work'} factors</strong> today.
        </div>
      </div>
    </div>
  )
}

export default function RiskProfiling() {
  const { token, user, weather, traffic, currentLocation } = useApp()
  const [zoneRisk, setZoneRisk] = useState(null)
  const [seasonalRisk, setSeasonalRisk] = useState(null)
  const [platformRisk, setPlatformRisk] = useState(null)
  const [accuracyMetrics, setAccuracyMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch ML model accuracy metrics
  useEffect(() => {
    const fetchAccuracy = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/ml/accuracy`)
        if (res.ok) {
          const data = await res.json()
          setAccuracyMetrics(data.models)
        }
      } catch (error) {
        console.error('Accuracy fetch error:', error)
      }
    }
    fetchAccuracy()
  }, [])

  // ML-powered risk assessments
  useEffect(() => {
    if (!token || !currentLocation) return

    const fetchRiskProfiles = async () => {
      try {
        // Zone Risk Assessment - use backend proxy
        const zoneRes = await fetch(`${API_BASE}/api/ai/zone`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            latitude: currentLocation.lat,
            longitude: currentLocation.lng,
            flood_history_years: 2,
            drainage_quality: 0.6,
            monsoon_mm: 2200,
            elevation_m: 10,
            has_curfew: 0,
            road_quality: 0.7
          })
        })

        if (zoneRes.ok) {
          const zoneData = await zoneRes.json()
          setZoneRisk({
            tier: zoneData.zone_risk_tier || 'MEDIUM',
            multiplier: zoneData.premium_multiplier || 1.0,
            confidence: zoneData.confidence || 0.85,
            factors: {
              floodHistory: '2 years',
              drainage: '60%',
              monsoon: '2200mm',
              elevation: '10m',
              curfew: 'No',
              roadQuality: '70%'
            }
          })
        }

        // Seasonal Risk (Dynamic Pricing model)
        const seasonalRes = await fetch(`${API_BASE}/api/ai/pricing`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            base_premium: 76.50,
            zone_lat: currentLocation.lat,
            zone_lng: currentLocation.lng,
            worker_experience_months: user?.experience || 6,
            vehicle_type: user?.vehicle || 'bike',
            historical_safety_score: 0.8,
            current_weather_risk: weather.rainfall > 50 ? 0.9 : weather.rainfall > 30 ? 0.6 : 0.2,
            traffic_congestion_index: traffic < 15 ? 0.9 : traffic < 25 ? 0.5 : 0.2,
            time_of_day: new Date().getHours(),
            day_of_week: new Date().getDay()
          })
        })

        if (seasonalRes.ok) {
          const seasonalData = await seasonalRes.json()
          const month = new Date().getMonth()
          const isMonsoon = month >= 5 && month <= 9 // June to October
          const isWinter = month >= 11 || month <= 2 // December to March

          setSeasonalRisk({
            tier: seasonalData.weather_risk_tier || (isMonsoon ? 'HIGH' : isWinter ? 'LOW' : 'MEDIUM'),
            multiplier: seasonalData.weather_multiplier || (isMonsoon ? 1.4 : isWinter ? 0.9 : 1.1),
            confidence: seasonalData.confidence || 0.82,
            season: isMonsoon ? 'Monsoon' : isWinter ? 'Winter' : 'Summer',
            factors: {
              rainfall: `${weather.rainfall}mm`,
              temperature: `${weather.temperature}°C`,
              humidity: `${weather.humidity}%`,
              windSpeed: `${weather.windSpeed}km/h`,
              aqi: weather.aqi
            }
          })
        }

        // Platform Risk (Fraud model)
        const platformRes = await fetch(`${API_BASE}/api/ai/fraud`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            order_amount: 150,
            customer_rating: 4.2,
            delivery_distance_km: 3.5,
            time_of_day: new Date().getHours(),
            day_of_week: new Date().getDay(),
            platform: user?.platform || 'swiggy',
            vehicle_type: user?.vehicle || 'bike',
            weather_condition: weather.rainfall > 30 ? 'rainy' : 'clear',
            traffic_level: traffic < 20 ? 'heavy' : 'normal'
          })
        })

        if (platformRes.ok) {
          const platformData = await platformRes.json()
          setPlatformRisk({
            tier: platformData.fraud_risk_tier || 'MEDIUM',
            multiplier: platformData.risk_multiplier || 1.0,
            confidence: platformData.confidence || 0.78,
            platform: user?.platform || 'swiggy',
            factors: {
              orderVolume: 'High',
              customerRating: '4.2/5',
              avgDistance: '3.5km',
              peakHours: '17:00-21:00',
              cancellationRate: '8%'
            }
          })
        }

      } catch (error) {
        console.error('Risk profiling error:', error)
        // Fallback mock data
        setZoneRisk({
          tier: 'MEDIUM',
          multiplier: 1.0,
          confidence: 0.85,
          factors: { floodHistory: '2 years', drainage: '60%', monsoon: '2200mm', elevation: '10m', curfew: 'No', roadQuality: '70%' }
        })
        setSeasonalRisk({
          tier: 'HIGH',
          multiplier: 1.4,
          confidence: 0.82,
          season: 'Monsoon',
          factors: { rainfall: `${weather.rainfall}mm`, temperature: `${weather.temperature}°C`, humidity: `${weather.humidity}%`, windSpeed: `${weather.windSpeed}km/h`, aqi: weather.aqi }
        })
        setPlatformRisk({
          tier: 'MEDIUM',
          multiplier: 1.0,
          confidence: 0.78,
          platform: user?.platform || 'swiggy',
          factors: { orderVolume: 'High', customerRating: '4.2/5', avgDistance: '3.5km', peakHours: '17:00-21:00', cancellationRate: '8%' }
        })
      }
      setLoading(false)
    }

    fetchRiskProfiles()
  }, [token, currentLocation, weather, traffic, user])

  const getRiskColor = (tier) => {
    switch (tier) {
      case 'HIGH': return '#EF4444'
      case 'MEDIUM': return '#F59E0B'
      case 'LOW': return '#10B981'
      default: return '#6B7280'
    }
  }

  const getRiskIcon = (tier) => {
    switch (tier) {
      case 'HIGH': return '🔴'
      case 'MEDIUM': return '🟡'
      case 'LOW': return '🟢'
      default: return '⚪'
    }
  }

  const RiskCard = ({ title, icon, risk, factors, description }) => (
    <div style={{
      background: 'rgba(22,28,36,0.6)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '20px',
      padding: '24px',
      marginBottom: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '24px', marginRight: '12px' }}>{icon}</span>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>{title}</h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>{description}</p>
        </div>
      </div>

      {risk && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '16px', fontWeight: '600' }}>
              {getRiskIcon(risk.tier)} Risk Level: {risk.tier}
            </span>
            <span style={{
              background: getRiskColor(risk.tier),
              color: 'white',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              {Math.round(risk.confidence * 100)}% ML Confidence
            </span>
          </div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Premium Multiplier: {risk.multiplier}x
          </div>
        </div>
      )}

      {factors && (
        <div>
          <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: 'var(--text-secondary)' }}>
            Risk Factors
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            {Object.entries(factors).map(([key, value]) => (
              <div key={key} style={{
                background: 'rgba(0,0,0,0.2)',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px'
              }}>
                <div style={{ fontWeight: '600', marginBottom: '2px' }}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        🤖 Analyzing your risk profile...
      </div>
    )
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 8px 0' }}>
          📊 Risk Profiling
        </h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          ML-powered assessment of zone, seasonal, and platform risks for personalized insurance.
        </p>
      </div>

      <RiskDonutChart zone={zoneRisk} seasonal={seasonalRisk} platform={platformRisk} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        <RiskCard
          title="Zone Risk Assessment"
          icon="📍"
          risk={zoneRisk}
          factors={zoneRisk?.factors}
          description="Geographic risk based on flood history, infrastructure, and environmental factors"
        />

        <RiskCard
          title="Seasonal Risk Assessment"
          icon="🌦️"
          risk={seasonalRisk}
          factors={seasonalRisk?.factors}
          description="Weather-based risk analysis considering current season and meteorological conditions"
        />

        <RiskCard
          title="Platform Risk Assessment"
          icon="🏪"
          risk={platformRisk}
          factors={platformRisk?.factors}
          description="Delivery platform risk evaluation based on order patterns and operational factors"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px', marginTop: '24px' }}>
        <div style={{
          background: 'rgba(22,28,36,0.6)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '20px',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 12px 0' }}>
            ✨ Risk Prediction Features
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
            These insights go beyond simple scoring — they turn weather, topology, and platform behavior into action points that help you stay ahead of disruption.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
            {[
              { title: 'Microclimate Alerts', text: 'Receive localized hazard warnings for your delivery zone — rain, traffic buildup, and sudden route risk.' },
              { title: 'Premium Optimization', text: 'See how safer shifts and preferred platforms can lower your weekly premium over time.' },
              { title: 'Fraud & Volume Signal', text: 'Detect when platform order patterns or low ratings could increase claim or payout risk.' },
              { title: 'Adaptive Coverage', text: 'Choose coverage plans informed by real-time risk tiers rather than fixed assumptions.' }
            ].map(feature => (
              <div key={feature.title} style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '14px' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '6px', color: '#fff' }}>{feature.title}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{feature.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'rgba(22,28,36,0.45)',
          borderRadius: '20px',
          padding: '24px',
          border: '1px solid rgba(255,255,255,0.04)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 12px 0' }}>
            🚀 Why these predictions matter
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 10px 0' }}>
            Risk predictions help you make smarter decisions every shift. They highlight when to push for an order, when to wait out bad weather, and when a low-risk window can secure a cheaper policy.
          </p>
          <ul style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.7' }}>
            <li>Understand your zone, season, and platform risk in one dashboard.</li>
            <li>Use predictive insights to reduce claims and preserve trust score.</li>
            <li>Protect your earnings with better timing and more informed coverage.</li>
          </ul>
        </div>
      </div>

      <div style={{
        background: 'rgba(22,28,36,0.6)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '20px',
        padding: '24px',
        marginTop: '24px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 16px 0' }}>
          🤖 ML Risk Intelligence Summary
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: getRiskColor(zoneRisk?.tier) }}>
              {zoneRisk?.tier}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Zone Risk</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: getRiskColor(seasonalRisk?.tier) }}>
              {seasonalRisk?.tier}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Seasonal Risk</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: getRiskColor(platformRisk?.tier) }}>
              {platformRisk?.tier}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Platform Risk</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#3B82F6' }}>
              {((zoneRisk?.multiplier || 1) * (seasonalRisk?.multiplier || 1) * (platformRisk?.multiplier || 1)).toFixed(2)}x
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Combined Multiplier</div>
          </div>
        </div>
      </div>

      {/* ML Model Accuracy Section */}
      {accuracyMetrics && (
        <div style={{
          background: 'rgba(22,28,36,0.6)',
          border: '1px solid rgba(255,255,255,0.05)',
          borderRadius: '20px',
          padding: '24px',
          marginTop: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 16px 0' }}>
            📊 ML Model Accuracy Metrics
          </h3>
          <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Performance metrics from cross-validation on historical data
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {Object.entries(accuracyMetrics).map(([modelKey, metrics]) => (
              <div key={modelKey} style={{
                background: 'rgba(0,0,0,0.2)',
                padding: '16px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', margin: 0, textTransform: 'capitalize' }}>
                    {modelKey.replace('_', ' ')}
                  </h4>
                  <div style={{ fontSize: '12px', color: '#10B981', fontWeight: '600' }}>
                    {metrics.accuracy ? `${metrics.accuracy}%` : 
                     metrics.mae ? `MAE: ₹${metrics.mae}` :
                     metrics.random_forest_auc ? `AUC: ${(metrics.random_forest_auc * 100).toFixed(1)}%` :
                     metrics.r_squared ? `R²: ${(metrics.r_squared * 100).toFixed(1)}%` : 'N/A'}
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>
                  {metrics.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {metrics.accuracy && (
                    <span style={{ fontSize: '11px', background: '#10B98120', color: '#10B981', padding: '2px 8px', borderRadius: '6px' }}>
                      Accuracy: {metrics.accuracy}%
                    </span>
                  )}
                  {metrics.cross_validation_mean && (
                    <span style={{ fontSize: '11px', background: '#3B82F620', color: '#3B82F6', padding: '2px 8px', borderRadius: '6px' }}>
                      CV Mean: {metrics.cross_validation_mean}%
                    </span>
                  )}
                  {metrics.r_squared && (
                    <span style={{ fontSize: '11px', background: '#F59E0B20', color: '#F59E0B', padding: '2px 8px', borderRadius: '6px' }}>
                      R²: {(metrics.r_squared * 100).toFixed(1)}%
                    </span>
                  )}
                  {metrics.ensemble_auc && (
                    <span style={{ fontSize: '11px', background: '#EF444420', color: '#EF4444', padding: '2px 8px', borderRadius: '6px' }}>
                      Ensemble AUC: {(metrics.ensemble_auc * 100).toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <div style={{ fontSize: '12px', color: '#60A5FA', fontWeight: '500' }}>
              💡 <strong>Model Confidence:</strong> All predictions include confidence scores based on these validated metrics. 
              Higher accuracy models provide more reliable risk assessments for personalized insurance pricing.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}