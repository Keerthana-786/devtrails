import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { Card, Btn, ProgressBar } from './UI.jsx'

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'development' ? 'http://localhost:8000' : (typeof window !== 'undefined' ? window.location.origin : 'https://devtrails.onrender.com'))

export default function PayoutEngine({ onPaid }) {
  const { user, weather, setPayouts } = useApp()
  const [checking, setChecking] = useState(false)
  const [result, setResult] = useState(null)

  const createAuthHeaders = () => {
    const authToken = localStorage.getItem('paynest_token')
    return authToken ? { Authorization: `Bearer ${authToken}` } : {}
  }

  const checkPayout = async () => {
    setChecking(true)
    try {
      const response = await fetch(`${API_BASE}/api/payout/check`
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...createAuthHeaders()
        },
        body: JSON.stringify({
          rainfall: weather.rainfall,
          aqi: weather.aqi,
          temperature: weather.temperature
        })
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Payout check failed:', error)
      setResult({
        triggered: false,
        payout: 0,
        fraudScore: 0.05,
        fraudVerdict: 'AUTO_APPROVE',
        canPay: false
      })
    }
    setChecking(false)
  }

  const processPayout = async () => {
    if (!result?.canPay) return

    try {
      const response = await fetch(`${API_BASE}/api/payout/process`
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...createAuthHeaders()
        },
        body: JSON.stringify({
          amount: result.payout,
          trigger: result.triggers?.[0]?.type || 'WEATHER'
        })
      })
      const payout = await response.json()
      if (payout.success) {
        onPaid?.(payout.payout)
        setResult(null)
        // Refresh payouts
        const payoutsRes = await fetch(`${API_BASE}/api/payouts`
          headers: createAuthHeaders()
        })
        const payoutsData = await payoutsRes.json()
        setPayouts(payoutsData.payouts)
      }
    } catch (error) {
      console.error('Payout processing failed:', error)
    }
  }

  useEffect(() => {
    // Auto-check on weather change
    if (weather.rainfall > 0 || weather.temperature > 35) {
      checkPayout()
    }
  }, [weather])

  if (!result) {
    return (
      <Card elevated>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#1C1C1C', marginBottom: '8px' }}>
            Check for Payouts
          </div>
          <div style={{ fontSize: '13px', color: '#93959f', marginBottom: '16px' }}>
            Monitor weather conditions for automatic payouts
          </div>
          <Btn onClick={checkPayout} disabled={checking}>
            {checking ? 'Checking...' : 'Check Now'}
          </Btn>
        </div>
      </Card>
    )
  }

  return (
    <Card elevated>
      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#1C1C1C' }}>
            {result.triggered ? '🎉 Payout Available!' : 'No Payout Available'}
          </div>
          {result.triggered && (
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#E23744' }}>
              ₹{result.payout}
            </div>
          )}
        </div>

        {result.triggered && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '13px', color: '#93959f', marginBottom: '8px' }}>
              Triggers detected:
            </div>
            {result.triggers?.map((trigger, i) => (
              <div key={i} style={{ fontSize: '12px', color: '#E23744', marginBottom: '4px' }}>
                • {trigger.type}: {trigger.value} {trigger.type === 'RAINFALL' ? 'mm' : trigger.type === 'HEATWAVE' ? '°C' : ''}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginBottom: '16px' }}>
          <div style={{ fontSize: '13px', color: '#93959f', marginBottom: '8px' }}>
            Fraud Risk Assessment
          </div>
          <ProgressBar
            value={result.fraudScore * 100}
            max={100}
            color={result.fraudScore > 0.7 ? '#E23744' : result.fraudScore > 0.3 ? '#F97316' : '#3AB757'}
            height={6}
            showValue
          />
          <div style={{ fontSize: '12px', color: result.fraudVerdict === 'AUTO_APPROVE' ? '#3AB757' : '#E23744', fontWeight: '600' }}>
            {result.fraudVerdict === 'AUTO_APPROVE' ? '✅ Approved' : '⚠️ Manual Review Required'}
          </div>
        </div>

        {result.canPay ? (
          <Btn onClick={processPayout} style={{ width: '100%' }}>
            Claim ₹{result.payout} Now
          </Btn>
        ) : (
          <div style={{ textAlign: 'center', padding: '12px', background: '#FFF3CD', borderRadius: '8px' }}>
            <div style={{ fontSize: '13px', color: '#856404' }}>
              {result.triggered ? 'Payout requires manual approval' : 'No qualifying conditions detected'}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}