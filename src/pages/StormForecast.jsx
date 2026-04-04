import React, { useState, useEffect, useRef } from 'react'

const CITIES = {
  mumbai: { name: 'Mumbai', lat: 19.076, lon: 72.8777 },
  delhi: { name: 'Delhi', lat: 28.6139, lon: 77.209 },
  bangalore: { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
  chennai: { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
  hyderabad: { name: 'Hyderabad', lat: 17.385, lon: 78.4867 },
  kolkata: { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
  pune: { name: 'Pune', lat: 18.5204, lon: 73.8567 },
  ahmedabad: { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
}

function getRisk(p) {
  if (p > 20) return { label: 'critical', bg: '#FCEBEB', color: '#A32D2D', bar: '#E24B4A' }
  if (p > 10) return { label: 'high', bg: '#FAEEDA', color: '#854F0B', bar: '#EF9F27' }
  if (p > 5) return { label: 'moderate', bg: '#E6F1FB', color: '#185FA5', bar: '#378ADD' }
  return { label: 'low', bg: '#EAF3DE', color: '#3B6D11', bar: '#639922' }
}

function getWeatherIcon(code, precip) {
  if (precip > 10) return '⛈'
  if (precip > 3) return '🌧'
  if (precip > 0.5) return '🌦'
  if (code >= 61) return '🌧'
  if (code >= 45) return '🌫'
  if (code >= 3) return '☁'
  if (code >= 1) return '⛅'
  return '☀'
}

function formatDay(dateStr, index) {
  if (index === 0) return 'Today'
  if (index === 1) return 'Tomorrow'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

async function fetchWeather(lat, lon) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m` +
    `&daily=precipitation_sum,temperature_2m_max,temperature_2m_min,weather_code` +
    `&timezone=Asia%2FKolkata&forecast_days=7`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Weather fetch failed')
  return res.json()
}

async function reverseGeocode(lat, lon) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    )
    const d = await res.json()
    return d.address?.city || d.address?.town || d.address?.state || 'My Location'
  } catch {
    return 'My Location'
  }
}

// ─── Shimmer skeleton ────────────────────────────────────────────────────────
const shimmerStyle = {
  background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
  backgroundSize: '200% 100%',
  animation: 'sf-shimmer 1.4s infinite',
  borderRadius: '8px',
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function RiskBadge({ value }) {
  const r = getRisk(value)
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: '12px',
      fontSize: '11px',
      fontWeight: 600,
      fontFamily: "'Syne', sans-serif",
      letterSpacing: '0.3px',
      background: r.bg,
      color: r.color,
    }}>
      {r.label}
    </span>
  )
}

function MetricBox({ value, unit, label, border }) {
  return (
    <div style={{
      flex: 1,
      textAlign: 'center',
      padding: '14px 8px',
      borderRight: border ? '1px solid rgba(255,255,255,0.1)' : 'none',
    }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '20px', fontWeight: 700 }}>{value}</div>
      <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '1px' }}>{unit}</div>
      <div style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>{label}</div>
    </div>
  )
}

function CurrentCard({ data, cityName }) {
  const c = data.current
  const precip = c.precipitation || 0
  const icon = getWeatherIcon(c.weather_code || 0, precip)

  return (
    <div style={styles.card}>
      {/* Header row */}
      <div style={{ padding: '20px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={styles.sectionLabel}>Now</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '16px', fontWeight: 700 }}>{cityName}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '40px' }}>{icon}</span>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '52px', fontWeight: 800, lineHeight: 1, letterSpacing: '-2px' }}>
            {Math.round(c.temperature_2m)}°
          </div>
        </div>
      </div>

      {/* Metrics row */}
      <div style={{ padding: '16px 20px 20px' }}>
        <div style={{ display: 'flex', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
          <MetricBox value={precip.toFixed(1)} unit="mm/hr" label="Rain" border />
          <MetricBox value={Math.round(c.wind_speed_10m)} unit="km/h" label="Wind" border />
          <MetricBox value={Math.round(c.relative_humidity_2m)} unit="%" label="Humidity" border />
          <div style={{ flex: 1, textAlign: 'center', padding: '14px 8px' }}>
            <RiskBadge value={precip * 10} />
            <div style={{ fontSize: '11px', color: '#aaa', marginTop: '6px' }}>Risk</div>
          </div>
        </div>

        {precip > 0.5 && (
          <div style={{
            marginTop: '12px',
            background: '#E6F1FB',
            borderLeft: '3px solid #185FA5',
            borderRadius: '0 8px 8px 0',
            padding: '10px 14px',
            fontSize: '12px',
            color: '#0C447C',
          }}>
            ⚠ Precipitation active — {precip.toFixed(1)}mm/hr. Monitor for potential payouts.
          </div>
        )}
      </div>
    </div>
  )
}

function ForecastCard({ data }) {
  const days = data.daily
  const maxPrecip = Math.max(...days.precipitation_sum, 1)

  return (
    <div style={styles.card}>
      <div style={{ padding: '16px 16px 0' }}>
        <div style={styles.sectionLabel}>7-day forecast</div>
      </div>
      {days.time.map((date, i) => {
        const p = days.precipitation_sum[i] || 0
        const maxT = Math.round(days.temperature_2m_max[i])
        const minT = Math.round(days.temperature_2m_min[i])
        const r = getRisk(p)
        const barW = Math.round((p / maxPrecip) * 100)
        const icon = getWeatherIcon(days.weather_code?.[i] || 0, p / 10)

        return (
          <div key={date} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 16px',
            borderBottom: i < days.time.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
          }}>
            <div style={{ minWidth: '90px' }}>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>{formatDay(date, i)}</div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>{minT}° – {maxT}°C</div>
            </div>
            <span style={{ fontSize: '16px', margin: '0 8px' }}>{icon}</span>
            <div style={{ flex: 1, margin: '0 12px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${barW}%`, background: r.bar, borderRadius: '3px', transition: 'width 0.6s cubic-bezier(.4,0,.2,1)' }} />
            </div>
            <div style={{ minWidth: '44px', textAlign: 'right', fontSize: '13px', fontWeight: 500 }}>{p.toFixed(1)}mm</div>
            <div style={{ minWidth: '68px', textAlign: 'right' }}>
              <RiskBadge value={p} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function SkeletonCurrent() {
  return (
    <div style={styles.card}>
      <div style={{ padding: '20px' }}>
        <div style={{ ...shimmerStyle, width: '40%', height: '50px', marginBottom: '16px' }} />
        <div style={{ display: 'flex', gap: '12px' }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} style={{ ...shimmerStyle, flex: 1, height: '60px' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SkeletonForecast() {
  return (
    <div style={styles.card}>
      <div style={{ padding: '16px' }}>
        <div style={{ ...shimmerStyle, width: '30%', height: '14px', marginBottom: '12px' }} />
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <div key={i} style={{ ...shimmerStyle, height: '36px', marginBottom: '6px' }} />
        ))}
      </div>
    </div>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    padding: '40px',
    background: '#0B0E14',
    minHeight: '100vh',
    maxWidth: '1400px',
    margin: '0 auto',
    color: '#fff',
  },
  card: {
    background: 'rgba(22, 28, 36, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.04)',
    borderRadius: '20px',
    overflow: 'hidden',
    marginBottom: '14px',
    backdropFilter: 'blur(12px)',
  },
  sectionLabel: {
    fontSize: '11px',
    fontWeight: 600,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '4px',
    fontFamily: "'Syne', sans-serif",
  },
  pill: (active) => ({
    padding: '8px 14px',
    borderRadius: '20px',
    border: active ? '1.5px solid #3B82F6' : '1px solid rgba(255,255,255,0.1)',
    background: active ? 'rgba(59, 130, 246, 0.1)' : 'rgba(0,0,0,0.3)',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    color: active ? '#3B82F6' : '#94A3B8',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'all 0.18s',
  }),
  locBtn: {
    padding: '6px 14px',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(0,0,0,0.3)',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    color: '#94A3B8',
    fontFamily: "'DM Sans', sans-serif",
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function StormForecast() {
  const [selected, setSelected] = useState('chennai')
  const [customLoc, setCustomLoc] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [locating, setLocating] = useState(false)

  // Inject Google Fonts + keyframes once
  useEffect(() => {
    if (!document.getElementById('sf-fonts')) {
      const link = document.createElement('link')
      link.id = 'sf-fonts'
      link.rel = 'stylesheet'
      link.href = 'https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap'
      document.head.appendChild(link)
    }
    if (!document.getElementById('sf-keyframes')) {
      const style = document.createElement('style')
      style.id = 'sf-keyframes'
      style.textContent = `
        @keyframes sf-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes sf-fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sf-fade { animation: sf-fadeIn 0.4s ease; }
      `
      document.head.appendChild(style)
    }
  }, [])

  const currentLoc = selected === 'custom' && customLoc ? customLoc : CITIES[selected]

  useEffect(() => {
    if (!currentLoc) return
    setLoading(true)
    setError(null)
    fetchWeather(currentLoc.lat, currentLoc.lon)
      .then(d => { setWeatherData(d); setLoading(false) })
      .catch(() => { setError('Unable to load weather data.'); setLoading(false) })
  }, [selected, customLoc])

  const handleLocate = () => {
    if (!navigator.geolocation) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords
        const name = await reverseGeocode(lat, lon)
        setCustomLoc({ lat, lon, name })
        setSelected('custom')
        setLocating(false)
      },
      () => setLocating(false)
    )
  }

  const allCities = [
    ...Object.entries(CITIES),
    ...(customLoc ? [['custom', { name: `📍 ${customLoc.name}` }]] : []),
  ]

  return (
    <div style={styles.root}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '32px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Storm Forecast
          </h1>
          <p style={{ fontSize: '15px', color: '#94A3B8', marginTop: '6px' }}>
            7-day weather predictions and disruption alerts
          </p>
        </div>
        <button style={styles.locBtn} onClick={handleLocate} disabled={locating}>
          <span style={{ fontSize: '14px' }}>◈</span>
          {locating ? 'Locating…' : 'My Location'}
        </button>
      </div>

      {/* City pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
        {allCities.map(([key, city]) => (
          <button key={key} style={styles.pill(selected === key)} onClick={() => setSelected(key)}>
            {city.name}
          </button>
        ))}
      </div>

      {/* Cards */}
      {error && (
        <div style={{ ...styles.card, padding: '16px', color: '#A32D2D', fontSize: '13px' }}>
          {error}
        </div>
      )}

      {loading || !weatherData ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', alignItems: 'start' }}>
          <SkeletonCurrent />
          <SkeletonForecast />
        </div>
      ) : (
        <div className="sf-fade" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', alignItems: 'start' }}>
          <CurrentCard data={weatherData} cityName={currentLoc.name} />
          <ForecastCard data={weatherData} />
        </div>
      )}
    </div>
  )
}