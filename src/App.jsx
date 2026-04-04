// App.jsx — 5-tab layout: Home | Insights | Analytics | Map | Protection

import React, { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext.jsx'
import AuthScreens from './pages/AuthScreens.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Insights from './pages/Insights.jsx'
import Analytics from './pages/Analytics.jsx'
import SafeMap from './pages/SafeMap.jsx'
import Protection from './pages/Protection.jsx'
import RiskProfiling from './pages/RiskProfiling.jsx'
import ToastSystem from './components/ToastSystem.jsx'
import Chatbot from './components/Chatbot.jsx'

const TABS = [
  { id: 'home',       icon: '🏠', label: 'Home',       sub: 'Live Dashboard' },
  { id: 'insights',   icon: '🧠', label: 'Insights',   sub: 'AI Risk Intelligence' },
  { id: 'analytics',  icon: '📊', label: 'Analytics',  sub: 'Performance Trends' },
  { id: 'risk',       icon: '📈', label: 'Risk Profile', sub: 'ML Risk Assessment' },
  { id: 'map',        icon: '🗺️',  label: 'Map',        sub: 'Disruption Zones' },
  { id: 'protection', icon: '🛡',  label: 'Protection', sub: 'Policy & Claims' },
]

function AppInner() {
  const { token, user, logout, weeklyPremium, policyStatus, walletBalance } = useApp()
  const [tab, setTab] = useState('home')

  if (!token) return <AuthScreens />

  const PAGE = {
    home:       <Dashboard />,
    insights:   <Insights />,
    analytics:  <Analytics />,
    risk:       <RiskProfiling />,
    map:        <SafeMap />,
    protection: <Protection setTab={setTab} />,
  }

  const statusColor = policyStatus === 'ACTIVE' ? '#10B981' : '#EF4444'

  return (
    <>
      <div style={{ display: 'flex', height: '100vh', width: '100vw', background: '#0B0E14', color: '#fff', overflow: 'hidden' }}>

        {/* ── Left Sidebar ────────────────────────────────────────────────── */}
        <div style={{
          width: '260px', background: 'rgba(22, 28, 36, 0.97)',
          borderRight: '1px solid rgba(255,255,255,0.04)',
          display: 'flex', flexDirection: 'column', padding: '0', zIndex: 10, flexShrink: 0,
        }}>

          {/* Brand */}
          <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.5px' }}>
              PayNest<span style={{ color: '#3B82F6' }}>.</span>
            </h1>
            <p style={{ margin: '4px 0 0', fontSize: '10px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1.5px' }}>
              AI Income Protection
            </p>
          </div>

          {/* Live status strip */}
          <div style={{ padding: '12px 24px', background: `${statusColor}11`, borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColor, boxShadow: `0 0 6px ${statusColor}` }} />
            <div style={{ fontSize: '11px', color: statusColor, fontWeight: '600' }}>
              Policy {policyStatus} · ₹{weeklyPremium.toFixed(2)}/wk
            </div>
          </div>

          {/* Nav Links */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', padding: '16px 12px' }}>
            {TABS.map(t => {
              const active = tab === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  style={{
                    display: 'flex', alignItems: 'center', padding: '12px 14px', gap: '12px',
                    background: active ? 'rgba(59, 130, 246, 0.12)' : 'transparent',
                    border: '1px solid', borderColor: active ? 'rgba(59, 130, 246, 0.3)' : 'transparent',
                    borderRadius: '12px', cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
                    color: active ? '#fff' : '#64748B', transition: 'all 0.2s', textAlign: 'left',
                    width: '100%',
                  }}
                >
                  <span style={{ fontSize: '18px', filter: active ? 'grayscale(0)' : 'grayscale(1)', opacity: active ? 1 : 0.5 }}>
                    {t.icon}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: active ? '700' : '500' }}>{t.label}</div>
                    <div style={{ fontSize: '10px', color: active ? '#60A5FA' : '#475569', marginTop: '1px' }}>{t.sub}</div>
                  </div>
                  {active && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 8px #3B82F6' }} />}
                </button>
              )
            })}
          </div>

          {/* Wallet quick-bar */}
          <div style={{ padding: '12px', margin: '0 12px 12px', background: 'rgba(0,0,0,0.3)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ fontSize: '10px', color: '#475569', marginBottom: '4px' }}>WALLET</div>
            <div style={{ fontSize: '20px', fontWeight: '800', color: walletBalance < weeklyPremium ? '#EF4444' : '#fff' }}>
              ₹{walletBalance.toFixed(2)}
            </div>
          </div>

          {/* User card */}
          <div style={{ padding: '0 12px 16px' }}>
            <div style={{ padding: '14px', background: 'rgba(0,0,0,0.25)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #1E3A5F, #0F172A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                  🧑🏽‍🚀
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700' }}>{user?.name || 'Worker'}</div>
                  <div style={{ fontSize: '10px', color: '#475569' }}>{user?.zone || 'Zone'}</div>
                </div>
              </div>
              <button
                onClick={() => { if (window.confirm('Logout?')) logout() }}
                style={{
                  width: '100%', background: 'transparent', border: '1px solid rgba(239,68,68,0.3)',
                  color: '#EF4444', borderRadius: '8px', padding: '7px', fontSize: '11px',
                  fontWeight: '600', cursor: 'pointer',
                }}
                onMouseOver={e => e.target.style.background = 'rgba(239,68,68,0.08)'}
                onMouseOut={e => e.target.style.background = 'transparent'}
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Content ─────────────────────────────────────────────────── */}
        <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
          {PAGE[tab]}
        </div>

      </div>
      <ToastSystem />
      <Chatbot />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
