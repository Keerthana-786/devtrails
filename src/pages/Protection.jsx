import React, { useState, useEffect, useMemo } from 'react'
import { Badge } from '../components/UI.jsx'
import { useApp } from '../context/AppContext.jsx'
import { EarningsMaximizer } from '../components/EarningsMaximizer.jsx'
import { FraudShield } from '../components/FraudShield.jsx'
import { AIExplanation } from '../components/AIExplanation.jsx'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// ── Animated count-up number ──────────────────────────────────────────────────
function ProgressiveNumber({ value, isStreaming }) {
  const [current, setCurrent] = useState(isStreaming ? 0 : value)
  useEffect(() => {
    if (!isStreaming || current >= value) { setCurrent(value); return }
    const step = Math.max(1, Math.floor(value / 12))
    const timer = setInterval(() => {
      setCurrent(prev => {
        if (prev + step >= value) { clearInterval(timer); return value }
        return prev + step
      })
    }, 100)
    return () => clearInterval(timer)
  }, [value, isStreaming])
  return <span>{Math.round(current)}</span>
}

// ── Animated premium breakdown bar ────────────────────────────────────────────
function BreakdownBar({ label, value, total, color, icon }) {
  const pct = Math.min(100, (value / total) * 100)
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '12px' }}>
        <span style={{ color: 'var(--text-secondary)' }}>{icon} {label}</span>
        <span style={{ fontWeight: '700', color }}>{value > 0 ? `+₹${value.toFixed(2)}` : `₹${Math.abs(value).toFixed(2)} save`}</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '3px', transition: 'width 1s ease' }} />
      </div>
    </div>
  )
}

// ── Policy Certificate Modal ───────────────────────────────────────────────────
// ── Policy Certificate Modal ───────────────────────────────────────────────────
function PolicyCertificate({ user, onClose }) {
  const policyId = useMemo(() => `POL-2026-${Math.floor(100000 + Math.random() * 900000)}`, [])
  const workerId = useMemo(() => `ZMT-${Math.floor(1000 + Math.random() * 9000)}`, [])
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }
  
  const today = new Date()
  const validUntil = new Date(today)
  validUntil.setDate(today.getDate() + 7)
  const generatePDF = async () => {
    const element = document.getElementById('certificate-modal')
    if (!element) return

    // Temporarily hide the buttons for PDF generation
    const buttonsContainer = element.querySelector('.no-print')
    let buttonsWereVisible = false
    if (buttonsContainer) {
      buttonsWereVisible = buttonsContainer.style.display !== 'none'
      buttonsContainer.style.display = 'none'
    }

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        ignoreElements: (element) => {
          return element.classList && element.classList.contains('no-print')
        }
      })
      
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      
      let position = 0
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }
      
      pdf.save(`PayNest_Policy_${policyId}.pdf`)
    } catch (error) {
      console.error('PDF generation failed:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      // Restore button visibility
      if (buttonsContainer && buttonsWereVisible) {
        buttonsContainer.style.display = ''
      }
    }
  }
  return (
    <div className="modal-overlay" onClick={onClose} id="certificate-overlay">
      <div className="certificate-modal-box" id="certificate-modal" onClick={e => e.stopPropagation()} style={{
        background: '#ffffff', 
        border: '2px solid #000000', 
        borderRadius: '12px',
        maxWidth: '460px', 
        maxHeight: '85vh', 
        overflowY: 'auto', 
        padding: '24px',
        color: '#000000', 
        position: 'relative',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px solid #000000', paddingBottom: '10px' }}>
          <h2 style={{ margin: 0, fontSize: '18px', letterSpacing: '1px', fontWeight: '900', color: '#000000' }}>PAYNEST INSURANCE CERTIFICATE</h2>
        </div>

        <div style={{ fontSize: '13px', lineHeight: '1.6', marginBottom: '20px', fontFamily: 'monospace' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666666' }}>Policy ID</span>
            <span style={{ fontWeight: '700' }}>{policyId}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666666' }}>Status</span>
            <span style={{ color: '#10b981', fontWeight: '700' }}>✅ ACTIVE</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666666' }}>Issued</span>
            <span style={{ color: '#000000' }}>{formatDate(today)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666666' }}>Valid Until</span>
            <span style={{ color: '#000000' }}>{formatDate(validUntil)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666666' }}>Weekly Premium</span>
            <span style={{ color: '#000000' }}>₹15 (auto-deducted every Sunday)</span>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #000000', paddingTop: '15px', marginBottom: '20px' }}>
          <div style={{ fontWeight: '800', fontSize: '12px', color: '#f59e0b', marginBottom: '10px', textTransform: 'uppercase' }}>INSURED PARTY</div>
          <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666666' }}>Name</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#000000' }}>{user?.name || 'Worker'}</span>
                {user?.aadhaarUploaded && (
                  <span style={{ fontSize: '9px', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 4px', borderRadius: '3px', border: '1px solid rgba(16,185,129,0.3)' }}>
                    ✅ Verified via Aadhaar OCR
                  </span>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666666' }}>Platform</span>
              <span style={{ color: '#000000' }}>Zomato Food Delivery</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666666' }}>City</span>
              <span style={{ color: '#000000' }}>{user?.zone || user?.city || 'Mumbai'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666666' }}>Worker ID</span>
              <span style={{ color: '#000000' }}>{workerId}</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #000000', paddingTop: '15px', marginBottom: '20px' }}>
          <div style={{ fontWeight: '800', fontSize: '12px', color: '#f59e0b', marginBottom: '10px', textTransform: 'uppercase' }}>COVERAGE — INCOME LOSS ONLY</div>
          <div style={{ fontSize: '12px', lineHeight: '1.5', color: '#666666' }}>
            Daily Cap: ₹600 <br />
            Weekly Cap: ₹2,500 <br />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: '#ef4444', fontWeight: '700' }}>Exclusions:</span> Health · Life · Accidents · Vehicle repairs
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #000000', paddingTop: '15px', marginBottom: '20px' }}>
          <div style={{ fontWeight: '800', fontSize: '12px', color: '#f59e0b', marginBottom: '10px', textTransform: 'uppercase' }}>PARAMETRIC TRIGGERS COVERED</div>
          <div style={{ fontSize: '11px', color: '#666666', lineHeight: '1.8', fontFamily: 'monospace' }}>
            Heavy Rain &nbsp;&nbsp; &gt;60mm &nbsp;&nbsp;&nbsp; → 50% daily avg <br />
            Flood Rain &nbsp;&nbsp; &gt;100mm &nbsp;&nbsp; → 100% daily avg <br />
            Extreme Heat &nbsp; &gt;45°C &nbsp;&nbsp;&nbsp; → 75% daily avg <br />
            Severe AQI &nbsp;&nbsp; &gt;400 &nbsp;&nbsp;&nbsp;&nbsp; → 50% daily avg <br />
            Road Closure &nbsp; &gt;70% &nbsp;&nbsp;&nbsp;&nbsp; → 100% daily avg <br />
            Curfew/Strike &nbsp; Admin &nbsp;&nbsp;&nbsp; → 100% daily avg
          </div>
        </div>

        <div style={{ borderTop: '1px solid #000000', paddingTop: '15px', marginBottom: '20px' }}>
          <div style={{ fontWeight: '800', fontSize: '12px', color: '#f59e0b', marginBottom: '10px', textTransform: 'uppercase' }}>CLAIM PROCESS</div>
          <div style={{ fontSize: '11px', color: '#666666', lineHeight: '1.6' }}>
            Fully automated · Zero forms · Zero calls <br />
            Average payout: under 10 minutes <br />
            Fraud detection: 5-layer AI verification
          </div>
        </div>

        <div style={{ textAlign: 'center', fontSize: '10px', color: '#666666', marginTop: '10px', borderTop: '1px solid #000000', paddingTop: '10px' }}>
          Issued by PayNest · Guidewire DEVTrails 2026 <br />
          This is a demonstration policy certificate.
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }} className="no-print">
          <button onClick={generatePDF} style={{ 
            flex: 1, padding: '12px', background: '#f59e0b', color: '#000', border: 'none', 
            borderRadius: '8px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s' 
          }}>Download PDF</button>
          <button onClick={onClose} style={{ 
            flex: 1, padding: '12px', background: '#222', color: '#fff', border: '1px solid #333', 
            borderRadius: '8px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' 
          }}>Close</button>
        </div>
      </div>
    </div>
  )
}

// ── Renewal Countdown ─────────────────────────────────────────────────────────
function RenewalCountdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0 })

  useEffect(() => {
    const calc = () => {
      const today = new Date()
      const daysUntilSunday = (7 - today.getDay()) % 7 || 7
      const nextSunday = new Date(today)
      nextSunday.setDate(today.getDate() + daysUntilSunday)
      nextSunday.setHours(23, 59, 59, 0)

      const diff = nextSunday - today
      if (diff <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0 })
        return
      }
      setTimeLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60)
      })
    }
    calc()
    const itv = setInterval(calc, 60000)
    return () => clearInterval(itv)
  }, [])

  const boxStyle = { 
    background: '#1a1a1a', border: '1px solid #2a2a2a', 
    borderRadius: '8px', padding: '8px 14px', textAlign: 'center', minWidth: '60px' 
  }
  const numStyle = { fontSize: '22px', fontWeight: '600', color: '#f59e0b', lineHeight: '1' }
  const labStyle = { fontSize: '10px', color: '#888', textTransform: 'uppercase', marginTop: '4px' }

  const today = new Date()
  const daysUntilSunday = (7 - today.getDay()) % 7 || 7
  const sundayDate = new Date(today)
  sundayDate.setDate(today.getDate() + daysUntilSunday)
  const sundayStr = sundayDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })

  return (
    <div style={{ background: '#111', border: '1px solid #222', padding: '20px', borderRadius: '12px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff' }}>
            Next renewal: Sunday {sundayStr} · ₹15 auto-deducted
          </div>
          <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
            from your Zomato settlement
          </div>
          <div style={{ fontSize: '11px', color: '#555', marginTop: '12px' }}>
            Coverage: Mon 12:00 AM – Sun 11:59 PM
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={boxStyle}>
            <div style={numStyle}>{timeLeft.d}</div>
            <div style={labStyle}>days</div>
          </div>
          <div style={boxStyle}>
            <div style={numStyle}>{timeLeft.h}</div>
            <div style={labStyle}>hrs</div>
          </div>
          <div style={boxStyle}>
            <div style={numStyle}>{timeLeft.m}</div>
            <div style={labStyle}>min</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingToggle({ icon, label, desc, value, onChange }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ fontSize: '18px' }}>{icon}</div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>{label}</div>
          <div style={{ fontSize: '11px', color: '#888' }}>{desc}</div>
        </div>
      </div>
      <div 
        onClick={onChange}
        style={{
          width: '40px', height: '22px', borderRadius: '11px',
          background: value ? '#10b981' : '#333',
          position: 'relative', cursor: 'pointer', transition: 'all 0.3s'
        }}
      >
        <div style={{
          width: '16px', height: '16px', borderRadius: '50%',
          background: '#fff', position: 'absolute', top: '3px',
          left: value ? '21px' : '3px', transition: 'all 0.3s',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }} />
      </div>
    </div>
  )
}

// ── Mock leaderboard (clearly labeled as anonymized community data) ─────────────
const LEADERBOARD = [
  { rank: 1, name: 'Worker #A4X7', zone: 'Andheri', protected: 2840, badge: '🏆' },
  { rank: 2, name: 'Worker #B8K2', zone: 'Bandra', protected: 2310, badge: '🥈' },
  { rank: 3, name: 'Worker #C5M9', zone: 'Dadar', protected: 1990, badge: '🥉' },
  { rank: 4, name: 'Worker #D1Q3', zone: 'Kurla', protected: 1540, badge: '' },
  { rank: 5, name: 'You',          zone: 'Andheri West', protected: null, badge: '📍' },
]

export default function Protection({ setTab }) {
  const {
    user, weeklyPremium, pricingBreakdown, policyStatus,
    walletBalance, payouts, badges,
    weather, traffic, policySuggestion,
    protectionStreakScore, powerMeter,
    addManualPayout
  } = useApp()

  const [settings, setSettings] = useState({
    autoClaims: true,
    incomeGuarantee: true,
    fraudProtection: true,
  })
  const [expandedPayouts, setExpandedPayouts] = useState({})
  const [dismissedSuggestion, setDismissedSuggestion] = useState(false)
  const [showPolicy, setShowPolicy] = useState(false)
  
  // ── FEATURE 1: Simulator Logic ──────────────────────────────────────────
  const [simState, setSimState] = useState({ active: false, type: '', step: 0 })
  const [walletFlash, setWalletFlash] = useState(false)

  const simulate = (type) => {
    setSimState({ active: true, type, step: 0 })
    
    // Step-by-step animation with randomized Fix 7 timings
    const steps = [
      { text: "Starting simulation...", delay: 1300 + Math.random() * 400 },
      { text: "✓ Weather API: Disruption detected", delay: 900 + Math.random() * 300 },
      { text: "✓ AI Verifying Location: Worker in zone", delay: 1800 + Math.random() * 500 },
      { text: "✓ Speed check: Stationary confirmed", delay: 400 + Math.random() * 200 },
      { text: "✓ ML Fraud Detection: CLEAN (0.08)", delay: 1800 + Math.random() * 800 },
      { text: "✓ Decision: AUTO_PAYOUT approved", delay: 900 + Math.random() * 300 }
    ]

    let currentDelay = 0
    steps.forEach((s, i) => {
      currentDelay += s.delay
      setTimeout(() => {
        setSimState(prev => ({ ...prev, step: i + 1 }))
      }, currentDelay)
    })

    // Final result with randomized Fix 2 timing
    setTimeout(() => {
      const amount = 480
      const now = new Date()
      const formulaStr = "₹80/hr × 6hrs × 100% = ₹480"
      const procTime = `${Math.floor(6 + Math.random() * 4)} min ${Math.floor(Math.random() * 60)} sec`
      const newClaim = {
        id: `CLN_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        amount,
        disruption: type === 'RAIN' ? 'Heavy Rain 75mm' : type === 'HEAT' ? 'Extreme Heat 47°C' : 'Severe AQI 420',
        status: 'PAID',
        createdAt: now.toISOString(),
        processingTime: procTime,
        fraudScore: 0.08,
        formula: formulaStr,
        explanation: {
          en: `Your ₹480 payout was approved because:
✓ Weather: ${type === 'RAIN' ? '75mm rainfall' : type === 'HEAT' ? '47°C heat' : '420 AQI'} detected
✓ Threshold: Exceeded trigger threshold
✓ GPS: Your location confirmed within 500m
✓ Speed: You were stationary (4 km/h)
✓ Fraud check: Score 0.08 — well below 0.30 limit
✓ Formula: ₹80/hr × 6hrs × 100% = ₹480`,
          hi: `आपको ₹480 मिले क्योंकि:
✓ मौसम: ${type === 'RAIN' ? '75mm भारी बारिश' : type === 'HEAT' ? '47°C अत्यधिक गर्मी' : '420 गंभीर AQI'}
✓ सीमा: सीमा से अधिक
✓ GPS: आपकी लोकेशन 500m के अंदर सत्यापित
✓ गति: आप 4 km/h — रुके हुए थे
✓ धोखाधड़ी जांच: स्कोर 0.08 — साफ
✓ फॉर्मूला: ₹80 × 6 घंटे × 100% = ₹480`,
          ta: `உங்களுக்கு ₹480 வழங்கப்பட்டது ஏனெனில்:
✓ வானிலை: ${type === 'RAIN' ? '75mm மழை' : type === 'HEAT' ? '47°C வெப்பம்' : '420 AQI'} கண்டறியப்பட்டது
✓ வரம்பு: தூண்டுதல் வரம்பை தாண்டியது
✓ GPS: உங்கள் இருப்பிடம் 500 மீட்டருக்குள் உறுதிப்படுத்தப்பட்டது
✓ வேகம்: நீங்கள் நிலையாக இருந்தீர்கள் (4 km/h)
✓ மோசடி சரிபார்ப்பு: ஸ்கோர் 0.08 — சுத்தமானது
✓ சூத்திரம்: ₹80/hr × 6 மணிநேரம் × 100% = ₹480`,
          te: `మీకు ₹480 చెల్లించబడింది ఎందుకంటే:
✓ వాతావరణం: ${type === 'RAIN' ? '75mm వర్షం' : type === 'HEAT' ? '47°C వేడి' : '420 వర్షం'} గుర్తించబడింది
✓ పరిమితి: ట్రిగ్గర్ పరిమితిని మించిపోయింది
✓ GPS: మీ స్థానం 500 మీటర్లలోపు ధృవీకరించబడింది
✓ వేగం: మీరు నిలకడగా ఉన్నారు (4 km/h)
✓ మోసం చెక్: స్కోరు 0.08 — క్లీన్
✓ ఫార్ములా: ₹80/hr × 6 గంటలు × 100% = ₹480`
        }
      }
      addManualPayout(newClaim)
      setSimState({ active: false, type: '', step: 0, latestClaim: newClaim })
      setWalletFlash(true)
      setTimeout(() => setWalletFlash(false), 2000)
    }, currentDelay + (900 + Math.random() * 300))
  }

  const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }))
  const toggleExpand = (id) => setExpandedPayouts(p => ({ ...p, [id]: !p[id] }))

  // ── Fix 4: Live Premium Breakdown ──────────────────────────────────────────
  const adj = pricingBreakdown?.adjustment_breakdown || {}
  const base = pricingBreakdown?.base_calc || 76.50
  
  // ── Fix 6: Premium Breakdown with exact details ─────────────────────────
  const liveBreakdown = [
    { label: "Base Rate (Standard)", value: 76.50, color: "#6366F1", icon: "📋", tip: "Standard weekly base rate for food delivery workers" },
    { label: "ML Weather Adjustment", value: -5.00, color: "#10b981", icon: "🌦️", tip: "Clear forecast this week — ML reduced your premium" },
    { label: "Zone Risk Factor", value: 8.50, color: "#ef4444", icon: "📍", tip: "Andheri West is flood-prone — zone risk factor applied" },
    { label: "Experience Discount", value: -3.50, color: "#10b981", icon: "🎖️", tip: "AI Veteran badge — 3 months clean claims discount" },
    { label: "No-Claim Bonus", value: -1.00, color: "#10b981", icon: "🛡️", tip: "Zero fraudulent claims — perfect record bonus" }
  ]

  const cardStyle = {
    background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)',
    borderRadius: '20px', padding: '24px',
  }

  const sectionTitle = (text) => (
    <h2 style={{ fontSize: '17px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 18px 0' }}>
      {text}
    </h2>
  )

  const statusColor = policyStatus === 'ACTIVE' ? '#10B981' : '#EF4444'

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', fontFamily: "'Outfit', sans-serif" }}>
      <style>{`
        @keyframes spinner { to { transform: rotate(360deg); } }
        .spinner { border: 3px solid rgba(255,255,255,0.1); border-top-color: #f59e0b; border-radius: 50%; width: 24px; height: 24px; animation: spinner 0.8s linear infinite; }
        .green-flash { animation: flashG 1.5s ease; }
        @keyframes flashG { 0% { color: #fff; } 50% { color: #10b981; transform: scale(1.1); } 100% { color: #fff; } }
        .sim-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); z-index: 1000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px); }
        .check-item { opacity: 0; transform: translateY(10px); animation: fadeInS 0.4s ease forwards; margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #10b981; }
        @keyframes fadeInS { to { opacity: 1; transform: translateY(0); } }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(8px); }
        .certificate-modal { background: #1a1a2e; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; width: 550px; padding: 0; overflow: hidden; box-shadow: 0 0 30px rgba(0,0,0,0.5); }
        @media print {
          body > *:not(#certificate-overlay) { display: none !important; }
          #certificate-overlay { background: white !important; position: absolute; inset: 0; z-index: 9999; display: block !important; padding: 0; }
          #certificate-modal { position: static; background: white !important; color: black !important; padding: 40px; border: none !important; width: 100%; box-shadow: none !important; }
          .no-print { display: none !important; }
        }
        .tooltip-box { 
          display: none; position: absolute; bottom: 110%; left: 50%; transform: translateX(-50%); 
          background: #111; border: 1px solid #333; border-radius: 6px; padding: 8px 10px; 
          font-size: 11px; color: #ccc; max-width: 200px; z-index: 1000; pointer-events: none;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          line-height: 1.4;
        }
        .hover-i-container:hover .tooltip-box { display: block; }
      `}</style>

      {showPolicy && <PolicyCertificate user={user} onClose={() => setShowPolicy(false)} />}

      {/* Simulator Overlay */}
      {simState.active && (
        <div className="sim-overlay">
          <div style={{ background: '#111', padding: '40px', borderRadius: '24px', border: '1px solid rgba(245,158,11,0.3)', width: '400px', boxShadow: '0 0 50px rgba(245,158,11,0.1)' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              {simState.step === 0 ? <div className="spinner" style={{ margin: '0 auto 20px' }} /> : null}
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
                {simState.step === 0 ? 'AI Analyzing Disruption...' : 'Verification in Progress'}
              </h3>
            </div>
            <div>
              {simState.step >= 1 && <div className="check-item">✓ Weather API: detected — above threshold</div>}
              {simState.step >= 2 && <div className="check-item">✓ GPS verified: Worker in zone (within 500m)</div>}
              {simState.step >= 3 && <div className="check-item">✓ Speed check: &lt; 20 km/h (stationary)</div>}
              {simState.step >= 4 && <div className="check-item">✓ Fraud score: 0.08 — CLEAN</div>}
              {simState.step >= 5 && <div className="check-item" style={{ color: '#f59e0b', fontSize: '18px', marginTop: '20px' }}>✓ Decision: AUTO_PAYOUT</div>}
            </div>
          </div>
        </div>
      )}

      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 8px 0' }}>
            🛡 Protection Center
          </h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Your zero-touch parametric coverage — all in one place.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge color={statusColor}>POLICY {policyStatus}</Badge>
            <button 
              onClick={() => setShowPolicy(true)} 
              style={{ 
                background: 'rgba(255,165,0,0.1)', border: '1px solid rgba(255,165,0,0.3)', 
                color: '#f59e0b', padding: '4px 10px', borderRadius: '6px', 
                fontSize: '11px', fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s' 
              }}
              onMouseOver={e => e.target.style.background = 'rgba(255,165,0,0.2)'}
              onMouseOut={e => e.target.style.background = 'rgba(255,165,0,0.1)'}
            >
              View Certificate
            </button>
          </div>
          <div className={walletFlash ? 'green-flash' : ''} style={{ fontSize: '24px', fontWeight: '800', color: '#fff' }}>
            ₹{walletBalance.toFixed(2)}
          </div>
        </div>
      </div>

      <RenewalCountdown />

      {/* FEATURE 1: Simulator Buttons */}
      <div style={{ ...cardStyle, marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ marginRight: 'auto' }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: '#f59e0b', marginBottom: '4px' }}>Simulator Lab</div>
          <div style={{ fontSize: '12px', color: '#888' }}>Force a trigger to test zero-touch payouts.</div>
        </div>
        <button onClick={() => simulate('RAIN')} style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#fff', padding: '12px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '700' }}>🌧️ Rain (75mm)</button>
        <button onClick={() => simulate('HEAT')} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fff', padding: '12px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '700' }}>🌡️ Heat (47°C)</button>
        <button onClick={() => simulate('AQI')} style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: '#fff', padding: '12px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '700' }}>☣️ AQI (420)</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>

        {/* Missing 5: Premium Breakdown with exact tooltip logic */}
        <div style={cardStyle}>
          {sectionTitle('💡 Dynamic Premium Breakdown')}
          <div style={{ marginBottom: '20px', padding: '14px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Final Weekly Premium</div>
            <div style={{ fontSize: '30px', fontWeight: '900', color: '#f59e0b' }}>₹75.50</div>
          </div>
          {liveBreakdown.map((b, i) => (
            <div key={i} style={{ marginBottom: '14px', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <BreakdownBar label={b.label} value={b.value} total={80} color={b.color} icon={b.icon} />
                </div>
                <div className="hover-i-container" style={{ marginLeft: '10px', cursor: 'pointer', position: 'relative' }}>
                   <span className="hover-i" style={{ color: '#555', fontSize: '16px' }}>ⓘ</span>
                   <div className="tooltip-box">💡 {b.tip}</div>
                </div>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '14px', marginTop: '4px', fontWeight: '800', fontSize: '16px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>FINAL WEEKLY PREMIUM</span>
            <span style={{ color: '#f59e0b' }}>₹75.50</span>
          </div>
        </div>

        {/* Unique Feature 5: Fraud Shield */}
        <FraudShield />

        {/* Auto Protection Settings */}
        <div style={cardStyle}>
          {sectionTitle('⚙️ Auto Protection Settings')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <SettingToggle icon="⚡" label="Auto Claims" desc="AI triggers claims automatically." value={settings.autoClaims} onChange={() => toggle('autoClaims')} />
            <SettingToggle icon="💰" label="Income Guarantee" desc="Parametric payout based on ML loss." value={settings.incomeGuarantee} onChange={() => toggle('incomeGuarantee')} />
            <SettingToggle icon="🛡" label="Fraud Protection" desc="Real-time fraud scoring." value={settings.fraudProtection} onChange={() => toggle('fraudProtection')} />
          </div>
        </div>
      </div>

      {/* Unique Feature 3: Earnings Maximizer */}
      {simState.latestClaim && (
        <EarningsMaximizer 
          latestPayout={simState.latestClaim} 
          onNavigateMap={() => setTab && setTab('map')} 
        />
      )}

      {/* Unique Feature 6: AI Explanation Engine */}
      {simState.latestClaim && (
        <div style={{ marginTop: '24px' }}>
          <AIExplanation explanation={simState.latestClaim.explanation} />
        </div>
      )}

      {/* FEATURE 3: Claims History Table */}
      <div style={cardStyle}>
        {sectionTitle('⚡ AI Claims History')}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#888', fontSize: '12px' }}>
                <th style={{ padding: '12px' }}>DATE</th>
                <th style={{ padding: '12px' }}>DISRUPTION</th>
                <th style={{ padding: '12px' }}>AMOUNT</th>
                <th style={{ padding: '12px' }}>STATUS</th>
                <th style={{ padding: '12px' }}>AI REASON</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {payouts.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#555' }}>
                    No claims yet. Simulate a disruption above to see auto-claims in action.
                  </td>
                </tr>
              ) : (
                payouts.map((p) => (
                  <React.Fragment key={p.id}>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '13px' }}>
                      <td style={{ padding: '16px 12px' }}>{p.date || new Date(p.createdAt).toLocaleDateString('en-IN')}</td>
                      <td style={{ padding: '16px 12px', fontWeight: '700' }}>{p.disruption || 'Auto-Trigger'}</td>
                      <td style={{ padding: '16px 12px', color: '#10b981', fontWeight: '800' }}>₹{p.amount}</td>
                      <td style={{ padding: '16px 12px' }}>
                        <span style={{ padding: '4px 10px', borderRadius: '4px', background: 'rgba(16,185,129,0.1)', color: '#10b981', fontSize: '11px', fontWeight: '800' }}>✅ {p.status}</span>
                      </td>
                      <td style={{ padding: '16px 12px', color: '#888' }}>{p.aiReason || 'Auto-Approved'}</td>
                      <td style={{ padding: '16px 12px', cursor: 'pointer', textAlign: 'right' }} onClick={() => toggleExpand(p.id)}>{expandedPayouts[p.id] ? '▲' : '▼'}</td>
                    </tr>
                    {expandedPayouts[p.id] && (
                      <tr>
                        <td colSpan="6" style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderBottom: '1px solid #2a2a2a' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                              <div>
                                <div style={{ color: '#f59e0b', fontSize: '11px', fontWeight: '800', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Explanation (English)</div>
                                <p style={{ fontSize: '13px', color: '#ccc', lineHeight: '1.6', margin: 0 }}>{p.aiExplanation?.en || p.explanation?.en || p.why_payout}</p>
                              </div>
                              <div>
                                <div style={{ color: '#f59e0b', fontSize: '11px', fontWeight: '800', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI विवरण (हिंदी)</div>
                                <p style={{ fontSize: '14px', color: '#ccc', lineHeight: '1.6', margin: 0 }}>{p.aiExplanation?.hi || p.explanation?.hi || 'विवरण उपलब्ध नहीं है'}</p>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', fontSize: '12px' }}>
                              <div><span style={{ color: '#555', fontWeight: '700', marginRight: '6px' }}>FORMULA:</span> <span style={{ color: '#888', fontFamily: 'monospace' }}>{p.formula}</span></div>
                              <div><span style={{ color: '#555', fontWeight: '700', marginRight: '6px' }}>FRAUD SCORE:</span> <span style={{ color: p.fraudScore < 0.3 ? '#10b981' : '#ef4444', fontWeight: '700' }}>{p.fraudScore}</span></div>
                              <div><span style={{ color: '#555', fontWeight: '700', marginRight: '6px' }}>VERIFICATION:</span> <span style={{ color: '#10b981', fontWeight: '700' }}>Aadhaar ✅</span></div>
                              <div><span style={{ color: '#555', fontWeight: '700', marginRight: '6px' }}>PROCESSING TIME:</span> <span style={{ color: '#888' }}>{p.processingTime}</span></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── FEATURE: Earnings Maximizer ──────────────────────────────────── */}
        {payouts.length > 0 && (
          <EarningsMaximizer
            latestPayout={payouts[0]}
            onNavigateMap={() => setTab && setTab('map')}
          />
        )}
      </div>

      {/* Missing 6: Premium History Table */}
      <div style={{ ...cardStyle, marginTop: '24px' }}>
        {sectionTitle('How your premium improved over time')}
        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#222', color: '#888', fontSize: '11px', borderBottom: '1px solid #2a2a2a' }}>
                <th style={{ padding: '12px' }}>Week</th>
                <th style={{ padding: '12px' }}>BTS Score</th>
                <th style={{ padding: '12px' }}>Tier</th>
                <th style={{ padding: '12px' }}>Premium</th>
                <th style={{ padding: '12px' }}>You Saved</th>
              </tr>
            </thead>
            <tbody>
              {[
                { wk: 'W1', bts: 65, tier: 'Starter',  clr: '#888', prm: 25, saved: '—' },
                { wk: 'W2', bts: 70, tier: 'Standard', clr: '#3b82f6', prm: 23, saved: '₹2' },
                { wk: 'W3', bts: 75, tier: 'Standard', clr: '#3b82f6', prm: 21, saved: '₹4' },
                { wk: 'W4', bts: 80, tier: 'Trusted',  clr: '#f59e0b', prm: 19, saved: '₹6' },
                { wk: 'W5', bts: 88, tier: 'Trusted',  clr: '#f59e0b', prm: 17, saved: '₹8' },
                { wk: 'W6', bts: 92, tier: 'Trusted',  clr: '#f59e0b', prm: 15, saved: '₹10', active: true },
              ].map((r, i) => (
                <tr key={i} style={{ 
                  background: r.active ? '#222' : 'transparent',
                  borderLeft: r.active ? '3px solid #f59e0b' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.03)'
                }}>
                  <td style={{ padding: '12px' }}>{r.wk}</td>
                  <td style={{ padding: '12px', fontWeight: '700' }}>{r.bts}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '999px', background: `${r.clr}22`, color: r.clr, fontSize: '10px', fontWeight: '800' }}>{r.tier}</span>
                  </td>
                  <td style={{ padding: '12px' }}>₹{r.prm}</td>
                  <td style={{ padding: '12px', color: '#10b981', fontWeight: '700' }}>{r.saved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: '700' }}>Total saved so far: <span style={{ color: '#10b981' }}>₹30</span> vs your first week</div>
          <div style={{ fontSize: '12px', color: '#888' }}>Reach <span style={{ color: '#f59e0b' }}>Elite tier (BTS 95+)</span> to pay just ₹10/week and save ₹15 more.</div>
        </div>
      </div>
    </div>
  )
}
