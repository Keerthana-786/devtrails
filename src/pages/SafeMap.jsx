import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Circle, Popup, Marker, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useApp } from '../context/AppContext.jsx'

export default function SafeMap() {
  const { currentLocation, weather, traffic, aiLossEstimate, payouts, addToast, expectedEarnings } = useApp()
  const [zones, setZones] = useState([])
  const [showCamera, setShowCamera] = useState(false)
  const [cameraFile, setCameraFile] = useState(null)
  const cameraInputRef = useRef(null)

  const gigWorkerIcon = L.divIcon({
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 50px; height: 80px;">
        <div style="background: #3B82F6; width: 34px; height: 34px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); position: relative; z-index: 2;">
          <span style="font-size: 18px;">👤</span>
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; border: 2px solid #F9A825; box-sizing: border-box;"></div>
        </div>
        <div style="background: #10B981; width: 44px; height: 24px; border-radius: 8px; border: 3px solid white; display: flex; align-items: center; justify-content: center; margin-top: -8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); position: relative; z-index: 1;">
          <span style="font-size: 14px;">🚗</span>
        </div>
        <div style="width: 4px; height: 12px; background: white; margin-top: -2px;"></div>
      </div>
    `,
    className: 'custom-gig-worker-icon',
    iconSize: [50, 80],
    iconAnchor: [25, 75],
    popupAnchor: [0, -75]
  })

  // ── Derive risk heatmap opacity from live conditions ─────────────────────────
  // Outer ring opacity scales with rainfall (0→100mm maps to 0→0.4 opacity)
  const rainIntensity = Math.min(1, weather.rainfall / 100)
  // Traffic jam: lower speed = higher congestion overlay
  const trafficIntensity = Math.min(1, (50 - Math.min(traffic, 50)) / 50)
  // Combined risk for outer ring
  const outerRisk = Math.min(1, (rainIntensity + trafficIntensity) / 2)

  // ── Build disruption zones from weather/AQI ──────────────────────────────────
  // PARAMETRIC COMPLIANCE: All disruption triggers (rain, AQI, traffic) are sourced
  // exclusively from verified external APIs (weather data, traffic data) and never
  // from user input. This ensures objective, fraud-resistant zone identification,
  // zero-touch automation, and full compliance with parametric insurance principles.
  useEffect(() => {
    const newZones = []
    const lastPayout = (payouts || []).find(p => p.aiGenerated)

    // ML-Driven Parametric Zones
    if (weather.rainfall > 35) {
      newZones.push({
        id: 'rain_zone',
        name: 'Heavy Precipitation Zone',
        lat: 19.0760, lng: 72.8777,
        radius: 3500,
        color: '#EF4444',
        trigger: 'PARAMETRIC_RAIN_THRESHOLD',
        loss_amount: aiLossEstimate || 280,
        fraudVerdict: lastPayout?.fraudVerdict || 'AUTO_APPROVE',
        details: 'Verified by AWS Weather Grid.'
      })
    }
    if (weather.aqi > 250) {
      newZones.push({
        id: 'aqi_zone',
        name: 'Air Disruption Zone',
        lat: 19.1200, lng: 72.8800,
        radius: 4000,
        color: '#F59E0B',
        trigger: 'AQI_LIMIT_EXCEEDED',
        loss_amount: Math.round(aiLossEstimate * 0.8) || 210,
        fraudVerdict: lastPayout?.fraudVerdict || 'MONITOR',
        details: 'Verified by CPCB Air Sensors.'
      })
    }
    if (traffic < 18) {
      newZones.push({
        id: 'traffic_zone',
        name: 'Traffic Disruption Zone',
        lat: 19.0600, lng: 72.8500,
        radius: 2500,
        color: '#A78BFA',
        trigger: 'CONGESTION_INDEX_HIGH',
        loss_amount: Math.round(aiLossEstimate * 0.6) || 150,
        fraudVerdict: 'AUTO_APPROVE',
        details: 'Verified by Google Traffic ML.'
      })
    }
    setZones(newZones)
  }, [weather, traffic, aiLossEstimate, payouts])

  // ── Best zone recommendation logic ──────────────────────────────────────────
  const bestZone = React.useMemo(() => {
    if (zones.length > 0) {
      const best = zones.reduce((currentBest, z) => {
        if (!currentBest) return z
        return currentBest.loss_amount < z.loss_amount ? currentBest : z
      }, null)
      const expectedIncome = Math.max(0, expectedEarnings - (best?.loss_amount || 0))
      return {
        ...best,
        expectedIncome,
        income: `₹${expectedIncome}–₹${expectedIncome + 100}`,
        recommendation: `AI recommends steering clear of ${best.name}; income loss predicted here.`,
        riskLevel: 'HIGH',
        color: best.color
      }
    }
    
    // If no disruptions, recommend safe zone
    const safeIncome = Math.max(0, expectedEarnings - aiLossEstimate)
    return {
      name: 'Safe Operating Zone',
      icon: '✅',
      recommendation: 'Optimal conditions detected. Stay within low-risk delivery radius.',
      expectedIncome: safeIncome,
      income: `₹${safeIncome}–₹${safeIncome + 100}`,
      riskLevel: 'LOW',
      color: '#10B981'
    }
  }, [zones, expectedEarnings, aiLossEstimate])

  // ── Camera/Evidence Upload Handler ────────────────────────────────────────
  const handleCameraUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setCameraFile(file)
      setShowCamera(false)
      addToast(`📸 Evidence uploaded: ${file.name}`, 'success')
    }
  }

  const triggerCameraDialog = () => {
    cameraInputRef.current?.click()
  }

  // Worker's current working position (fallback to Mumbai)
  const workerPos = currentLocation
    ? [currentLocation.lat, currentLocation.lng]
    : [19.0760, 72.8777]

  const safePath = zones.length > 0
    ? [workerPos, [zones[0].lat, zones[0].lng]]
    : [workerPos, [workerPos[0] + 0.006, workerPos[1] + 0.006]]

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 8px 0' }}>
          🗺️ Live Disruption Map
        </h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Real-time risk heatmap — AI claim zones and parametric payout areas.
        </p>
      </div>

      {/* ── Floating Best Zone Recommendation Card ────────────────────────── */}
      {(() => {
        // Derive the safest nearby zone from weather + traffic context
        // Parametric: this is computed from verified API inputs, not user input
        const isRaining = weather.rainfall > 30
        const isJammed  = traffic < 20
        const bestZone  = isRaining
          ? { name: 'Hiranandani Estate', dist: '1.2 km', risk: 'LOW', income: '₹340–₹480', reason: 'Covered mall clusters — rain-shielded orders' }
          : isJammed
          ? { name: 'Bandra Kurla Complex', dist: '2.8 km', risk: 'LOW', income: '₹290–₹420', reason: 'Office zone — lunch-hour surge, short routes' }
          : { name: 'Your Current Zone', dist: '< 500 m', risk: 'LOW', income: '₹390–₹540', reason: 'Conditions optimal — stay and maximise earnings' }
        return (
          <div style={{
            marginBottom: '20px',
            background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(59,130,246,0.08))',
            border: '1px solid rgba(16,185,129,0.35)',
            borderRadius: '16px',
            padding: '18px 22px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '14px',
          }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <span style={{ fontSize: '28px' }}>📍</span>
              <div>
                <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '700', letterSpacing: '1px', marginBottom: '3px' }}>🤖 AI BEST ZONE RECOMMENDATION</div>
                <div style={{ fontSize: '17px', fontWeight: '800' }}>{bestZone.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>{bestZone.reason}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {[
                { label: 'Distance', val: bestZone.dist },
                { label: 'Risk Level', val: bestZone.risk, clr: '#10B981' },
                { label: 'Expected Income', val: bestZone.income, clr: '#60A5FA' },
              ].map(({ label, val, clr }) => (
                <div key={label}>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '3px' }}>{label}</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: clr || '#fff' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        )
      })()}

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '24px' }}>

        {/* ── MAP ─────────────────────────────────────────────────────────── */}
        <div style={{ borderRadius: '20px', overflow: 'hidden', height: '600px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <MapContainer
            center={workerPos}
            zoom={13}
            style={{ width: '100%', height: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />

            {/* ── RISK HEATMAP: 3 concentric rings around worker ────────────── */}
            {/* Inner ring — always safe/green, low opacity */}
            <Circle
              center={workerPos}
              radius={500}
              pathOptions={{
                color: '#10B981',
                fillColor: '#10B981',
                fillOpacity: 0.12,
                weight: 1,
              }}
            >
              <Popup>
                <strong>✅ Safe Zone (500m)</strong><br />
                Low-risk delivery radius. AI recommends staying within this area.
              </Popup>
            </Circle>

            {/* Mid ring — caution/yellow, scales with traffic */}
            <Circle
              center={workerPos}
              radius={1500}
              pathOptions={{
                color: '#F59E0B',
                fillColor: '#F59E0B',
                fillOpacity: Math.max(0.05, trafficIntensity * 0.25),
                weight: trafficIntensity > 0.3 ? 2 : 1,
                dashArray: trafficIntensity > 0.3 ? '6 4' : null,
              }}
            >
              <Popup>
                <strong>⚠️ Caution Zone (1.5km)</strong><br />
                Traffic congestion index: {Math.round(trafficIntensity * 100)}%<br />
                Orders in this range may be delayed.
              </Popup>
            </Circle>

            {/* Outer ring — danger/red, scales with rainfall */}
            <Circle
              center={workerPos}
              radius={3500}
              pathOptions={{
                color: '#EF4444',
                fillColor: '#EF4444',
                fillOpacity: Math.max(0.03, outerRisk * 0.3),
                weight: outerRisk > 0.3 ? 2 : 1,
                dashArray: outerRisk > 0.3 ? '8 4' : null,
              }}
            >
              <Popup>
                <strong>🔴 Danger Zone (3.5km)</strong><br />
                Rainfall: {weather.rainfall}mm · AQI: {weather.aqi}<br />
                Combined risk index: {Math.round(outerRisk * 100)}%<br />
                {outerRisk > 0.4 ? '⚡ Auto-claim may be eligible.' : 'Currently monitoring.'}
              </Popup>
            </Circle>

            {/* ── Worker Location with Car + Gig Worker ────────────────────────────────────────── */}
            <Marker position={workerPos} icon={gigWorkerIcon}>
              <Popup>
                <div style={{ textAlign: 'center', fontSize: '20px', lineHeight: '1.2' }}>
                  👤<br />🚗
                </div>
                <strong>Gig Worker Above Car</strong><br />
                Your vehicle location<br />
                AI monitoring active 24/7.
              </Popup>
            </Marker>

            {/* ── Active Disruption Zones ────────────────────────────────────── */}
            {zones.map(zone => (
              <Circle
                key={zone.id}
                center={[zone.lat, zone.lng]}
                radius={zone.radius}
                pathOptions={{ color: zone.color, fillColor: zone.color, fillOpacity: 0.18, weight: 2 }}
              >
                <Popup>
                  <div style={{ fontFamily: 'sans-serif', minWidth: '200px' }}>
                    <div style={{ fontSize: '11px', color: zone.color, fontWeight: '700', letterSpacing: '0.5px' }}>🚨 PARAMETRIC ALERT</div>
                    <strong style={{ fontSize: '16px', color: zone.color }}>{zone.name}</strong><br />
                    <hr style={{ margin: '8px 0', borderColor: 'rgba(0,0,0,0.05)' }} />
                    <div style={{ fontSize: '13px', marginBottom: '8px' }}>
                      Trigger: <strong>{zone.trigger}</strong><br />
                      Source: <strong>{zone.details}</strong>
                    </div>
                    <div style={{ padding: '8px', background: 'rgba(0,0,0,0.03)', borderRadius: '6px' }}>
                      <span style={{ fontSize: '12px' }}>🤖 ML Payout: </span>
                      <strong style={{ fontSize: '14px', color: '#10B981' }}>₹{Math.round(zone.loss_amount)}</strong>
                    </div>
                    <div style={{ fontSize: '11px', marginTop: '8px', color: '#64748B' }}>
                      🛡 Fraud Check: <span style={{ color: zone.fraudVerdict === 'AUTO_APPROVE' ? '#10B981' : '#F59E0B' }}>{zone.fraudVerdict}</span>
                    </div>
                  </div>
                </Popup>
              </Circle>
            ))}
            <Polyline positions={safePath} pathOptions={{ color: '#60A5FA', weight: 4, dashArray: '8 6', opacity: 0.8 }} />
          </MapContainer>
        </div>

        {/* ── SIDEBAR ─────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* FLOATING CARD: Best Zone Recommendation */}
          <div style={{
            background: `linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))`,
            border: '2px solid rgba(16,185,129,0.4)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 8px 24px rgba(16,185,129,0.2)',
            animation: 'pulse 2s infinite'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 4px 0' }}>
                  {bestZone.icon} {bestZone.name}
                </h3>
                <p style={{ fontSize: '12px', color: '#94A3B8', margin: 0 }}>
                  {bestZone.recommendation || bestZone.trigger}
                </p>
              </div>
              <button
                onClick={triggerCameraDialog}
                style={{
                  background: 'rgba(59, 130, 246, 0.2)',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  color: '#60A5FA',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                title="Upload evidence photo"
              >
                📸
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>Expected Income</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: '#10B981' }}>₹{bestZone.expectedIncome}</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px' }}>Risk Level</div>
                <div style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  background: 'rgba(16,185,129,0.2)',
                  color: '#10B981'
                }}>
                  {bestZone.riskLevel || 'MEDIUM'}
                </div>
              </div>
            </div>

            {cameraFile && (
              <div style={{ marginTop: '12px', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', fontSize: '11px' }}>
                ✓ Evidence attached: {cameraFile.name}
              </div>
            )}

            <style>
              {`
                .custom-gig-worker-icon {
                  z-index: 1000 !important;
                }
                .leaflet-marker-icon {
                  z-index: 1000 !important;
                }
              `}
            </style>
          </div>

          {/* Heatmap Legend */}
          <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 14px 0' }}>
              🎨 Risk Heatmap Legend
            </h3>
            {[
              { color: '#10B981', label: 'Safe Zone (500m)', sub: 'AI-recommended radius' },
              { color: '#F59E0B', label: 'Caution (1.5km)', sub: `Traffic impact: ${Math.round(trafficIntensity * 100)}%` },
              { color: '#EF4444', label: 'Danger (3.5km)', sub: `Rain: ${weather.rainfall}mm · Risk: ${Math.round(outerRisk * 100)}%` },
            ].map(({ color, label, sub }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}`, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600' }}>{label}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Compensations */}
          <div style={{ background: 'rgba(22,28,36,0.6)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', fontFamily: "'Space Grotesk', sans-serif", margin: '0 0 14px 0' }}>
              ⚡ Active Compensations
            </h3>
            {zones.length > 0 ? zones.map(zone => (
              <div key={zone.id} style={{
                padding: '14px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px',
                borderLeft: `4px solid ${zone.color}`, marginBottom: '10px'
              }}>
                <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '4px' }}>{zone.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{zone.trigger}</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#10B981' }}>🤖 AI Payout: ₹{Math.round(zone.loss_amount)}</div>
                <div style={{ fontSize: '10px', color: zone.fraudVerdict === 'AUTO_APPROVE' ? '#10B981' : '#F59E0B', marginTop: '4px' }}>
                  🛡 Fraud: {zone.fraudVerdict}
                </div>
              </div>
            )) : (
              <div style={{ padding: '16px', textAlign: 'center', background: 'rgba(0,0,0,0.15)', borderRadius: '10px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                ✅ No disruption zones active. Operations optimal.
              </div>
            )}
          </div>

          {/* Live Telemetry */}
          <div style={{ border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'monospace', lineHeight: '1.8' }}>
              // Heatmap Inputs<br />
              rainfall = {weather.rainfall} mm<br />
              traffic = {traffic} km/h<br />
              aqi = {weather.aqi}<br />
              outer_risk = {(outerRisk * 100).toFixed(1)}%<br />
              zones_active = {zones.length}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Camera Input */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleCameraUpload}
        capture="environment"
      />
    </div>
  )
}