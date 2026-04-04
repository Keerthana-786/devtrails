// Dashboard.jsx — Home: risk, weather, BTS, chart, payouts

import React, { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { Card, RiskBadge, WeatherMetric, SectionHeader, PayoutRow, Divider, EmptyState, ProgressBar, Btn, Badge } from '../components/UI.jsx'
import PayoutEngine from '../components/PayoutEngine.jsx'
import AIExplanation from '../components/AIExplanation.jsx'
import { PLANS } from '../utils/constants.js'

export default function Dashboard() {
  const { user, weather, risk, payouts, t } = useApp()
  const [lastPayout, setLastPayout] = useState(null)
  const plan = PLANS[user?.plan || 'basic']

  const hour = new Date().getHours()
  const greeting = hour < 12 ? t.goodMorning : hour < 17 ? t.hello : 'Good evening'
  const partner = user?.partner || 'swiggy'
  const partnerIcon = { swiggy: '🍜', zomato: '🍕', blinkit: '⚡', zepto: '📦', dunzo: '🛵', porter: '🚛', rapido: '🏍️' }[partner] || '🛵'

  const MOCK_CHART = [
    { label: 'Mon', value: 0, color: '#E8E8E8' },
    { label: 'Tue', value: 480, color: '#E23744' },
    { label: 'Wed', value: 0, color: '#E8E8E8' },
    { label: 'Thu', value: 360, color: '#F97316' },
    { label: 'Fri', value: 0, color: '#E8E8E8' },
    { label: 'Sat', value: 480, color: '#E23744' },
    { label: 'Sun', value: 0, color: '#E8E8E8' }
  ]
  const maxChart = Math.max(...MOCK_CHART.map(d => d.value), 1)

  return (
    <div style={{ background: '#F8F8F8', minHeight: '100%', paddingBottom: '20px' }}>
      {/* Header */}
      <div style={{ background: '#E23744', padding: '20px 16px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '13px', color: '#ffffff90' }}>{greeting},</div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em' }}>
              {partnerIcon} {user?.name || 'Ravi'}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '11px', color: '#ffffff70' }}>Zone</div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>📍 {user?.zone || 'Andheri West'}</div>
          </div>
        </div>

        {/* Risk pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff18', borderRadius: '12px', padding: '10px 14px' }}>
          <RiskBadge level={risk.level} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', color: '#fff', fontWeight: '700' }}>
              {risk.level === 'HIGH' ? '⚠️ High disruption risk today' : risk.level === 'MEDIUM' ? '⚡ Moderate conditions' : '✅ All clear today'}
            </div>
            <div style={{ fontSize: '11px', color: '#ffffff70' }}>Risk score: {Math.round(risk.score * 100)}%</div>
          </div>
          <div style={{ fontSize: '12px', color: '#ffffff90' }}>🛡️ {plan.name}</div>
        </div>
      </div>

      <div style={{ padding: '0 16px', transform: 'translateY(-12px)', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* Live Payout Engine */}
        <PayoutEngine onPaid={payout => setLastPayout(payout)} />

        {/* AI Explanation if recent payout */}
        {lastPayout && <AIExplanation payout={lastPayout} />}

        {/* Weather Card */}
        <Card elevated>
          <div style={{ padding: '16px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#1C1C1C' }}>Live Weather</div>
            <span style={{ fontSize: '11px', color: '#93959f' }}>Updated 15s ago</span>
          </div>
          <div style={{ padding: '8px 16px 16px', display: 'flex', justifyContent: 'space-around' }}>
            <WeatherMetric icon="🌧️" label={t.rainfall} value={weather.rainfall} unit="mm" color={weather.rainfall > 60 ? '#E23744' : '#1C1C1C'} />
            <WeatherMetric icon="🌡️" label={t.temperature} value={`${weather.temperature}°`} unit="" color={weather.temperature > 45 ? '#E23744' : '#1C1C1C'} />
            <WeatherMetric icon="😷" label={t.aqi} value={Math.round(weather.aqi)} unit="" color={weather.aqi > 300 ? '#E23744' : '#1C1C1C'} />
            <WeatherMetric icon="💨" label={t.wind} value={Math.round(weather.windSpeed)} unit="k" color="#1C1C1C" />
          </div>
          {/* Threshold bars */}
          <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <ProgressBar value={weather.rainfall} max={100} color={weather.rainfall > 60 ? '#E23744' : '#3AB757'} height={4} label="Rain threshold (60mm)" />
            <ProgressBar value={weather.aqi} max={400} color={weather.aqi > 300 ? '#E23744' : '#3AB757'} height={4} label="AQI threshold (300)" />
          </div>
        </Card>

        {/* Weekly earnings chart */}
        <Card elevated>
          <div style={{ padding: '16px' }}>
            <SectionHeader title="Weekly Payouts" />
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px', marginBottom: '8px' }}>
              {MOCK_CHART.map((d, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{
                    width: '100%', height: `${(d.value / maxChart) * 60}px`,
                    background: d.color, borderRadius: '4px 4px 0 0', minHeight: d.value > 0 ? '6px' : '2px',
                    transition: 'height 0.4s ease'
                  }} />
                  <span style={{ fontSize: '10px', color: '#93959f' }}>{d.label}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #F0F0F0' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: '900', color: '#E23744' }}>₹1,320</div>
                <div style={{ fontSize: '11px', color: '#93959f' }}>This week</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: '900', color: '#1C1C1C' }}>3</div>
                <div style={{ fontSize: '11px', color: '#93959f' }}>Claims</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: '900', color: '#3AB757' }}>₹{plan.premium}</div>
                <div style={{ fontSize: '11px', color: '#93959f' }}>Premium/wk</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Coverage card */}
        <Card elevated>
          <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: `${plan.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🛡️</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#1C1C1C' }}>{plan.name}</div>
              <div style={{ fontSize: '12px', color: '#93959f' }}>Max payout: ₹{plan.maxPayout} · ₹{plan.premium}/week</div>
            </div>
            <Badge label="ACTIVE" color="#3AB757" />
          </div>
          <Divider />
          <div style={{ padding: '12px 16px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {plan.triggers.map((tr, i) => (
              <span key={i} style={{ fontSize: '11px', padding: '4px 10px', background: '#F8F8F8', color: '#3D3D3D', borderRadius: '20px', fontWeight: '600' }}>✓ {tr}</span>
            ))}
          </div>
        </Card>

        {/* Recent payouts */}
        <Card elevated>
          <div style={{ padding: '16px 16px 0' }}>
            <SectionHeader title="Recent Payouts" />
          </div>
          {payouts.length === 0 ? (
            <EmptyState icon="💸" title="No payouts yet" subtitle="Stay covered — we're monitoring your zone" />
          ) : (
            <div style={{ padding: '0 16px' }}>
              {payouts.slice(0, 5).map((p, i) => (
                <div key={i}>
                  <PayoutRow payout={p} />
                  {i < payouts.length - 1 && <Divider />}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Trust score */}
        <Card elevated>
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#1C1C1C' }}>Trust Score</div>
              <div style={{ fontSize: '22px', fontWeight: '900', color: '#1A73E8' }}>{user?.trustScore || 65}</div>
            </div>
            <ProgressBar value={user?.trustScore || 65} max={100} color="#1A73E8" height={8} showValue />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
              {['Verified ID', 'GPS active', 'No fraud flags', `${user?.monthsActive || 3}mo active`].map((item, i) => (
                <div key={i} style={{ fontSize: '11px', color: '#3AB757', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span>✓</span><span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
