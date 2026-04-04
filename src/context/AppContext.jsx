import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

const AppContext = createContext()

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const defaultTranslations = {
  goodMorning: 'Good morning',
  hello: 'Hello',
  rainfall: 'Rainfall',
  temperature: 'Temperature',
  aqi: 'AQI',
  wind: 'Wind'
}

// ── Badge Definitions ─────────────────────────────────────────────────────────
const BADGE_DEFS = [
  { id: 'rain_master',     icon: '🌧', label: 'Rain Master',     desc: 'Triggered payout in heavy rain' },
  { id: 'fast_responder',  icon: '⚡', label: 'Fast Responder',  desc: 'Accepted order within 30s' },
  { id: 'safe_streak',     icon: '🛡', label: 'Safe Streak',     desc: 'Completed 3 consecutive low-risk orders' },
  { id: 'zone_explorer',   icon: '🗺', label: 'Zone Explorer',   desc: 'Location detected — AI routing active' },
  { id: 'resilience_hero', icon: '🏅', label: 'Resilience Hero', desc: 'Maintained income protection through disruption' },
  { id: 'weather_streak',  icon: '☀️', label: 'Weather Streak',  desc: 'Worked 3+ consecutive safe-weather hours' },
  { id: 'ai_veteran',      icon: '🤖', label: 'AI Veteran',      desc: 'Used platform for 3+ sessions' },
]

export function AppProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('paynest_token') || '')
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('paynest_user')
    return raw ? JSON.parse(raw) : {
      id: '101',
      name: 'Ravi Kumar',
      phone: '9876543210',
      partner: 'swiggy',
      zone: 'Andheri West',
      upiId: 'ravi@paytm',
      plan: 'weekly_parametric',
      trustScore: 78,
      monthsActive: 6,
      createdAt: new Date().toISOString(),
      // Aadhaar OCR fields
      aadhaarUploaded: false,
      aadhaarName: null,
      aadhaarNumber: null,
      aadhaarDOB: null,
      aadhaarGender: null,
      aadhaarAddress: null,
      aadhaarPincode: null,
      aadhaarConfidence: null
    }
  })

  // ── Core simulation states ──────────────────────────────────────────────
  const [traffic, setTraffic] = useState(30)
  const [ordersActive, setOrdersActive] = useState(12)

  // ── Wallet & Policy ─────────────────────────────────────────────────────
  const [walletBalance, setWalletBalance] = useState(150.00)
  const [weeklyPremium, setWeeklyPremium] = useState(76.50)
  const [policyStatus, setPolicyStatus] = useState('ACTIVE')

  // ── Seeding 2 Legacy Claims for Demo ───────────────────
  const [payouts, setPayouts] = useState([
    {
      id: "CLM_001",
      date: "2026-03-28",
      time: "09:14 AM",
      disruption: "Heavy Rain",
      detail: "74mm · Andheri West",
      amount: 480,
      status: "PAID",
      fraudScore: 0.08,
      processingTime: "8 min 14 sec",
      formula: "₹80/hr × 6hrs × 100% = ₹480",
      aiExplanation: {
        en: "Auto-approved: 74mm exceeded 60mm threshold. GPS verified within 500m. Speed 3km/h — stationary. Fraud score 0.08 — clean.",
        hi: "स्वतः स्वीकृत: 74mm बारिश 60mm सीमा से अधिक। GPS सत्यापित। स्कोर 0.08 — साफ।"
      }
    },
    {
      id: "CLM_002",
      date: "2026-03-21",
      time: "02:30 PM",
      disruption: "Severe AQI",
      detail: "AQI 415 · Delhi NCR",
      amount: 320,
      status: "PAID",
      fraudScore: 0.11,
      processingTime: "6 min 52 sec",
      formula: "₹80/hr × 4hrs × 100% = ₹320",
      aiExplanation: {
        en: "Auto-approved: AQI 415 exceeded 400 threshold. Worker stationary confirmed. Fraud score 0.11 — clean.",
        hi: "स्वतः स्वीकृत: AQI 415, सीमा 400 से अधिक। कार्यकर्ता स्थिर। स्कोर 0.11 — साफ।"
      }
    }
  ])

  const [btsScore, setBtsScore] = useState(92)
  const [showPayoutModal, setShowPayoutModal] = useState(false)
  const [activePayout, setActivePayout] = useState(null)
  const [btsBreakdown, setBtsBreakdown] = useState({ consistency: 38, claimRatio: 25, gps: 18, docs: 11 })
  const [daysProtected, setDaysProtected] = useState(47)
  const [stormPrepActive, setStormPrepActive] = useState(false)
  const [fraudScore, setFraudScore] = useState(0.08)
  const [honeypotStatus, setHoneypotStatus] = useState('ACTIVE')
  
  // ── Seeding Default Pricing Breakdown ───────────────────
  const [pricingBreakdown, setPricingBreakdown] = useState({
    base_calc: 76.50,
    adjustment_breakdown: {
      overall_risk_multiplier: 0.94,
      vehicle_risk_multiplier: 1.11,
      experience_multiplier: 0.95
    }
  })

  // ── AI Engine states ────────────────────────────────────────────────────
  const [activeDisruptions, setActiveDisruptions] = useState([])
  const [stabilityScore, setStabilityScore] = useState(100)
  const [aiAlerts, setAiAlerts] = useState([])
  const [aiLossEstimate, setAiLossEstimate] = useState(0)

  // ── Live Orders ──────────────────────────────────────────────────────────
  const [orders, setOrders] = useState([])
  const [expectedEarnings, setExpectedEarnings] = useState(0)

  // ── NOVELTY: Premium History (7-point rolling, for Forecast Chart) ───────
  const [premiumHistory, setPremiumHistory] = useState(() => {
    const base = 76.50
    return Array.from({ length: 7 }).map((_, idx) => {
      const date = new Date(Date.now() - ((6 - idx) * 24 * 60 * 60 * 1000))
      return {
        id: date.toISOString().slice(0, 10),
        day: date.toLocaleDateString('en-IN', { weekday: 'short' }),
        premium: +(base + (Math.random() * 14 - 7)).toFixed(2),
        isToday: idx === 6
      }
    })
  })

  // ── NOVELTY: Gamification Badges ─────────────────────────────────────────
  const [badges, setBadges] = useState(
    BADGE_DEFS.map(b => ({ ...b, earned: b.id === 'ai_veteran' })) // ai_veteran pre-earned
  )
  const safeStreakRef = useRef(0)    // counts consecutive low-risk order accepts
  const safeHoursRef = useRef(0)     // counts consecutive safe-weather working hours
  const lastHourRef = useRef(new Date().getHours())

  const earnBadge = (badgeId) => {
    setBadges(prev => prev.map(b =>
      b.id === badgeId && !b.earned ? { ...b, earned: true } : b
    ))
  }

  // ── NOVELTY: Toast notifications ──────────────────────────────────────────
  const [toasts, setToasts] = useState([])
  const toastCounter = useRef(0)

  const addToast = (msg, type = 'info') => {
    const id = ++toastCounter.current
    setToasts(prev => [...prev, { id, msg, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 4000)
  }

  const dismissToast = (id) => setToasts(prev => prev.filter(t => t.id !== id))

  // ── NOVELTY: What-If Simulator states ─────────────────────────────────────
  const [whatIfRainfall, setWhatIfRainfall] = useState(0)
  const [whatIfTraffic, setWhatIfTraffic] = useState(30)

  const policySuggestion = useMemo(() => {
    if (payouts.length >= 3) return '⬆️ You\'ve had 3+ disruptions — consider upgrading to Extended Coverage for higher payout limits.'
    if (stabilityScore < 40) return '⚠️ Your income stability is critical. AI recommends activating Emergency Buffer plan.'
    if (stabilityScore >= 70 && payouts.length === 0) return '✅ You are on a strong protection streak. Maintain coverage for stability and bonus reward points.'
    if (stabilityScore > 85 && payouts.length === 0) return '⬇️ Conditions are stable. You may downgrade to Standard plan and save ₹20/week.'
    return '🤖 AI recommends keeping income protection active while risk remains data-driven and verifiable.'
  }, [payouts.length, stabilityScore])

  // Auto-pause policy logic
  useEffect(() => {
    setPolicyStatus(walletBalance < weeklyPremium ? 'PAUSED' : 'ACTIVE')
  }, [walletBalance, weeklyPremium])

  // Update premiumHistory whenever weeklyPremium changes
  useEffect(() => {
    const todayId = new Date().toISOString().slice(0, 10)
    const todayLabel = new Date().toLocaleDateString('en-IN', { weekday: 'short' })

    setPremiumHistory(prev => {
      if (prev[prev.length - 1]?.id === todayId) {
        return prev.map((entry, idx) => ({
          ...entry,
          premium: idx === prev.length - 1 ? weeklyPremium : entry.premium,
          isToday: idx === prev.length - 1
        }))
      }

      const nextHistory = prev.slice(1).concat({
        id: todayId,
        day: todayLabel,
        premium: weeklyPremium,
        isToday: true
      })
      return nextHistory.map((entry, idx) => ({ ...entry, isToday: idx === nextHistory.length - 1 }))
    })
  }, [weeklyPremium])

  const deductPremium = () => {
    setWalletBalance(prev => Math.max(0, prev - weeklyPremium))
  }

  const [currentLocation, setCurrentLocation] = useState(null)
  const [weather, setWeather] = useState({
    rainfall: 0,
    temperature: 31,
    aqi: 80,
    windSpeed: 15,
    humidity: 68,
    visibility: 9
  })

  // ── Backend Data Loaders ─────────────────────────────────────────────────
  useEffect(() => {
    if (token) {
      loadUserData()
      loadPayouts()
    }
  }, [token])

  const loadUserData = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/dashboard`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error('Failed to load user data:', error)
    }
  }

  const loadPayouts = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/payouts`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (response.ok) {
        const data = await response.json()
        setPayouts(data.payouts || [])
      }
    } catch (error) {
      console.error('Failed to load payouts:', error)
    }
  }

  useEffect(() => {
    if (token) localStorage.setItem('paynest_token', token)
    else localStorage.removeItem('paynest_token')
  }, [token])

  useEffect(() => {
    localStorage.setItem('paynest_user', JSON.stringify(user))
  }, [user])

  // ── Live Orders Engine ────────────────────────────────────────────────────
  const fetchOrders = () => {
    const numOrders = Math.floor(Math.random() * 3) + 4
    const newOrders = []
    const isRaining = weather.rainfall > 30
    const isTraffic = traffic < 15

    for (let i = 0; i < numOrders; i++) {
      let dist = (Math.random() * 8 + 1).toFixed(1)
      let payout = Math.round(dist * 15 + Math.random() * 20)
      let riskLevel = 'LOW'
      if (isRaining && dist > 3) riskLevel = 'HIGH'
      else if (isRaining && dist <= 3) riskLevel = 'MEDIUM'
      if (isTraffic && dist > 5) riskLevel = 'HIGH'

      newOrders.push({
        id: `ORD_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        distance_km: parseFloat(dist),
        payout,
        risk_level: riskLevel
      })
    }
    setOrders(newOrders)
  }

  const getBestOrders = () => {
    const riskScores = { 'LOW': 1, 'MEDIUM': 2, 'HIGH': 3 }
    return [...orders].sort((a, b) => {
      if (riskScores[a.risk_level] !== riskScores[b.risk_level])
        return riskScores[a.risk_level] - riskScores[b.risk_level]
      return (b.payout / b.distance_km) - (a.payout / a.distance_km)
    }).slice(0, 2)
  }

  const highRiskHours = useMemo(() => {
    return Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      label: h === 0 ? '12a' : h < 12 ? `${h}a` : h === 12 ? '12p' : `${h - 12}p`,
      score: ((weather.rainfall / 100) * 0.6) + ((50 - Math.min(traffic, 50)) / 50) * 0.4 + ((h >= 17 && h <= 20) ? 0.1 : 0)
    }))
      .filter(entry => entry.score > 0.45)
      .slice(0, 5)
      .map(entry => entry.label)
  }, [weather.rainfall, traffic])

  const safeZones = useMemo(() => {
    if (weather.rainfall > 30) {
      return ['Covered markets', 'Indoor delivery hubs', 'Nearby station arcades']
    }
    if (traffic < 20) {
      return ['Office complexes', 'Local short-hop routes', 'Nearby food courts']
    }
    return ['Residential clusters', 'Market rings', 'Station adjacent zones']
  }, [weather.rainfall, traffic])

  const expectedLossProbability = useMemo(() => {
    const rainFactor = Math.min(1, weather.rainfall / 120)
    const trafficFactor = Math.min(1, (50 - Math.min(traffic, 50)) / 50)
    const aqiFactor = weather.aqi > 200 ? 0.15 : weather.aqi > 150 ? 0.08 : 0
    return Math.round(Math.min(0.98, rainFactor * 0.55 + trafficFactor * 0.3 + aqiFactor) * 100)
  }, [weather.rainfall, traffic, weather.aqi])

  const protectionStreakScore = useMemo(() => {
    const streak = payouts.filter(p => p.aiGenerated && p.status === 'COMPLETED').length * 8
    return Math.min(100, Math.round(stabilityScore * 0.45 + streak + 10))
  }, [payouts, stabilityScore])

  const powerMeter = useMemo(() => {
    const balanceFactor = Math.min(1, walletBalance / Math.max(weeklyPremium, 1))
    const score = Math.round((stabilityScore * 0.5) + (balanceFactor * 30) + ((100 - expectedLossProbability) * 0.2))
    return {
      score: Math.min(100, Math.max(12, score)),
      label: score > 75 ? 'Resilient' : score > 50 ? 'Watchful' : 'Alert',
      color: score > 75 ? '#10B981' : score > 50 ? '#F59E0B' : '#EF4444'
    }
  }, [stabilityScore, walletBalance, weeklyPremium, expectedLossProbability])

  const acceptOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId)
    if (order) {
      setWalletBalance(prev => prev + order.payout)
      setOrders(prev => prev.filter(o => o.id !== orderId))
      earnBadge('fast_responder')
      // Safe Streak logic — counts consecutive low/medium risk accepts
      if (order.risk_level !== 'HIGH') {
        safeStreakRef.current += 1
        if (safeStreakRef.current >= 3) {
          earnBadge('safe_streak')
          addToast('🏅 Badge Earned: Safe Streak! 3 safe orders in a row.', 'badge')
        }
      } else {
        safeStreakRef.current = 0 // reset on high-risk
      }
    }
  }

  useEffect(() => {
    fetchOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather, traffic])

  useEffect(() => {
    const recommended = getBestOrders()
    const est = recommended.reduce((sum, o) => sum + o.payout, 0)
    setExpectedEarnings(est)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders])

  // ── Weather Streak Tracker ────────────────────────────────────────────────
  // Runs once per hour. If conditions are safe (no rain + acceptable traffic),
  // increment safeHoursRef. After 3 consecutive safe hours → earn badge.
  useEffect(() => {
    const checkInterval = setInterval(() => {
      const currentHour = new Date().getHours()
      if (currentHour !== lastHourRef.current) {
        lastHourRef.current = currentHour
        const isSafe = weather.rainfall < 20 && traffic > 20 && weather.aqi < 150
        if (isSafe) {
          safeHoursRef.current += 1
          if (safeHoursRef.current >= 3) {
            earnBadge('weather_streak')
            addToast('☀️ Badge Earned: Weather Streak! 3 safe-weather hours worked.', 'badge')
            safeHoursRef.current = 0 // reset after earning
          }
        } else {
          safeHoursRef.current = 0 // unsafe conditions reset streak
        }
      }
    }, 60000) // check every minute, acts when hour changes
    return () => clearInterval(checkInterval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather, traffic])

  // ── AI Engine ─────────────────────────────────────────────────────────────
  //
  // PARAMETRIC COMPLIANCE:
  // Parametric triggers (rain, AQI, traffic, flood) are automatically sourced from 
  // verified APIs to ensure objective payouts, prevent fraud, and comply with 
  // gig worker insurance rules. No manual claim button exists in this ecosystem.

  const fetchDynamicPricing = async () => {
    try {
      if (!token) return
      // ── PARAMETRIC COMPLIANCE: Premium adjustments based ONLY on objective ML predictions ──
      const res = await fetch(`${API_BASE}/api/ai/pricing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          base_premium: 76.50,
          zone_lat: currentLocation?.lat || 19.0760,
          zone_lng: currentLocation?.lng || 72.8777,
          worker_experience_months: user?.monthsActive || 6,
          vehicle_type: 'bike',
          historical_safety_score: (user?.trustScore || 80) / 100,
          current_weather_risk: (weather.rainfall > 30 || weather.aqi > 200) ? 0.8 : 0.2,
          traffic_congestion_index: traffic < 20 ? 0.7 : 0.2,
          time_of_day: new Date().getHours(),
          day_of_week: new Date().getDay()
        })
      })
      if (res.ok) {
        const data = await res.json()
        setWeeklyPremium(data.dynamic_premium_inr || 76.50)
        setPricingBreakdown(data.adjustment_breakdown || null)
        setAiAlerts(data.recommendations || [])
        // Update stability score based on risk multiplier
        const riskMult = data.adjustment_breakdown?.overall_risk_multiplier || 1
        setStabilityScore(Math.max(0, Math.min(100, 100 - ((riskMult - 1) * 40))))
      }
    } catch (e) {
      console.error('AI Pricing Failed:', e)
    }
  }

  const runFraudCheck = async (lossAmount) => {
    try {
      const fRes = await fetch(`${API_BASE}/api/ai/fraud`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          gps_deviation_km: 0.1,
          location_consistency: 0.9,
          claim_frequency_30d: payouts.filter(p => p.createdAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
          account_age_months: user?.monthsActive || 6,
          multiple_claims_per_day: payouts.filter(p => new Date(p.createdAt).toDateString() === new Date().toDateString()).length,
          orders_during_disruption: ordersActive,
          avg_payout_inr: lossAmount,
          trust_score: user?.trustScore || 80,
          zone_risk_tier: 2
        })
      })
      if (fRes.ok) return await fRes.json()
    } catch (e) {
      console.error('Fraud Check Failed:', e)
    }
    return { verdict: 'AUTO_APPROVE', fraud_score: 0.1 }
  }

  const processLoss = async (trigger) => {
    try {
      const res = await fetch(`${API_BASE}/api/ai/loss`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          hourly_rate: 80,
          normal_work_hours: 8,
          rainfall_mm: weather.rainfall,
          traffic_disruption: traffic < 20 ? 0.8 : 0.2,
          aqi: weather.aqi,
          day_of_week: new Date().getDay(),
          is_peak_hour: 1,
          city_index: 2
        })
      })
      
      let predictedLossAmount = 0
      if (resLoss.ok) {
        const d = await resLoss.json()
        predictedLossAmount = d.predicted_income_loss_inr
      }

      // Calculate total expected payout
      const fraudRes = await runFraudCheck(predictedLossAmount)

      const payoutObj = {
        id: `pay_ai_${Date.now()}`,
        userId: user.id || 'usr_demo',
        amount: predictedLossAmount,
        trigger: trigger.trigger_id || 'AUTO_TRIGGER',
        status: (fraudRes.verdict === 'AUTO_APPROVE' || fraudRes.verdict === 'MONITOR') ? 'COMPLETED' : 'HELD',
        upiRef: `UPI${Date.now()}`,
        createdAt: new Date().toISOString(),
        aiGenerated: true,
        fraudVerdict: fraudRes.verdict,
        fraudScore: fraudRes.fraud_score,
        streaming: true,
        targetAmount: predictedLossAmount,
        currentAmount: 0,
        why_payout: `Parametric Payout: Predicted Income Loss ₹${predictedLossAmount}. Triggers: ${trigger.type} (${trigger.description}).`
      }

      if (payoutObj.status === 'COMPLETED') {
        setWalletBalance(prev => prev + predictedLossAmount)
        setActivePayout(payoutObj)
        setShowPayoutModal(true)
      } else {
        addToast(`⚠️ Claim Held: AI flagged potential risk (${fraudRes.verdict}).`, 'warning')
      }

      setPayouts(prev => [payoutObj, ...prev])

      // Earn badges
      if (weather.rainfall > 30) earnBadge('rain_master')
    } catch (e) {
      console.error('Process Loss Failed:', e)
    }
  }

  const checkAndTriggerPayout = async () => {
    try {
      if (!token) return
      
      let wCondition = 'clear'
      if (weather.rainfall > 30) wCondition = 'rain'
      if (weather.rainfall > 80) wCondition = 'heavy rain'

      // ── PARAMETRIC COMPLIANCE: Triggers sourced ONLY from verified datasets ──
      const res = await fetch(`${API_BASE}/api/ai/disruptions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          worker_id: user?.id || 'usr_demo',
          current_lat: currentLocation?.lat || 19.0760,
          current_lng: currentLocation?.lng || 72.8777,
          timestamp: new Date().toISOString(),
          weather_condition: wCondition,
          traffic_speed_kmh: traffic,
          orders_active: ordersActive
        })
      })
      if (res.ok) {
        const data = await res.json()
        setActiveDisruptions(data.active_triggers || [])
        const eligible = data.auto_claim_candidates || []
        
        if (eligible.length > 0) {
          // Prevention of duplicate payouts (within 2 mins)
          const lastPayout = payouts[0]
          const timeSinceLast = lastPayout ? (new Date() - new Date(lastPayout.createdAt)) : 999999
          if (timeSinceLast > 120000) {
            processLoss(eligible[0])
          }
        }
      }
    } catch (e) {
      console.error('Disruption Check Failed:', e)
    }
  }

  useEffect(() => {
    fetchDynamicPricing()
    checkAndTriggerPayout()
    const int = setInterval(() => {
      fetchDynamicPricing()
      checkAndTriggerPayout()
    }, 25000)
    return () => clearInterval(int)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weather, traffic, ordersActive, currentLocation, token])

  // ── Demo Controls ──────────────────────────────────────────────────────────
  const simulateHeavyRain = () => {
    setWeather(w => ({ ...w, rainfall: 95 }))
    addToast('🌧 Heavy rain simulated — AI engine activating...', 'warning')
  }
  const simulateTrafficJam = () => {
    setTraffic(8)
    addToast('🚗 Traffic jam simulated — orders risk-adjusted.', 'warning')
  }
  const resetSimulation = () => {
    setWeather(w => ({ ...w, rainfall: 0 }))
    setTraffic(30)
    setOrdersActive(12)
    addToast('✅ Simulation reset to normal conditions.', 'info')
  }

  // ── Geolocation ────────────────────────────────────────────────────────────
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setCurrentLocation({ lat: coords.latitude, lng: coords.longitude })
          // Zone Explorer badge: earn when real GPS location is detected
          earnBadge('zone_explorer')
          addToast('🗺 Zone Explorer badge earned — GPS routing active!', 'badge')
        },
        () => setCurrentLocation({ lat: 19.0760, lng: 72.8777 }),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      )
    } else {
      setCurrentLocation({ lat: 19.0760, lng: 72.8777 })
    }
  }

  useEffect(() => { getCurrentLocation() }, [])

  const value = useMemo(() => ({
    token,
    user, setUser,
    currentLocation,
    weather, setWeather,
    traffic, setTraffic,
    ordersActive, setOrdersActive,
    // Demo controls
    simulateHeavyRain,
    simulateTrafficJam,
    resetSimulation,
    // AI states
    activeDisruptions,
    stabilityScore,
    aiAlerts,
    aiLossEstimate,
    highRiskHours,
    safeZones,
    expectedLossProbability,
    protectionStreakScore,
    powerMeter,
    // Orders
    orders,
    acceptOrder,
    getBestOrders,
    expectedEarnings,
    // Wallet & policy
    walletBalance, setWalletBalance,
    weeklyPremium, setWeeklyPremium,
    pricingBreakdown,
    policyStatus,
    deductPremium,
    payouts, setPayouts,
    // NOVELTY exports
    premiumHistory,
    badges,
    earnBadge,
    toasts,
    addToast,
    dismissToast,
    policySuggestion,
    whatIfRainfall, setWhatIfRainfall,
    whatIfTraffic, setWhatIfTraffic,
    // Misc
    t: defaultTranslations,
    addManualPayout: (payoutObj) => {
      setPayouts(prev => [payoutObj, ...prev])
      if (payoutObj.status === 'COMPLETED') {
        setWalletBalance(prev => prev + payoutObj.amount)
        addToast(`⚡ Paid! ₹${payoutObj.amount} credited to wallet.`, 'success')
      }
    },
    login: (userData) => {
      setUser(userData)
      setToken('token-demo-123')
    },
    updateUser: (data) => setUser(prev => ({ ...prev, ...data })),
    logout: () => {
      setToken('')
      setUser({})
      setPayouts([])
    },
    fetchDynamicPricing,
    checkAndTriggerPayout,
    refreshData: () => {
      if (token) { loadUserData(); loadPayouts() }
    },
    // Unique Features
    btsScore, setBtsScore,
    btsBreakdown, setBtsBreakdown,
    daysProtected, setDaysProtected,
    stormPrepActive, setStormPrepActive,
    fraudScore, setFraudScore,
    honeypotStatus, setHoneypotStatus
  }), [
    token, user, currentLocation, weather, traffic, ordersActive,
    activeDisruptions, stabilityScore, aiAlerts, aiLossEstimate, payouts,
    walletBalance, weeklyPremium, pricingBreakdown, policyStatus, orders,
    expectedEarnings, premiumHistory, badges, toasts, policySuggestion,
    btsScore, btsBreakdown, daysProtected, stormPrepActive, fraudScore, honeypotStatus
  ])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
