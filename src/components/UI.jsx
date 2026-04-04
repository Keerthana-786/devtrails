import React from 'react'

export function Card({ children, elevated = false, style = {} }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      boxShadow: elevated ? '0 2px 8px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
      overflow: 'hidden',
      ...style
    }}>
      {children}
    </div>
  )
}

export function RiskBadge({ level }) {
  const colors = {
    HIGH: '#E23744',
    MEDIUM: '#F97316',
    LOW: '#3AB757'
  }
  const icons = {
    HIGH: '⚠️',
    MEDIUM: '⚡',
    LOW: '✅'
  }
  return (
    <div style={{
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: colors[level],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px'
    }}>
      {icons[level]}
    </div>
  )
}

export function WeatherMetric({ icon, label, value, unit, color = '#1C1C1C' }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '20px', marginBottom: '4px' }}>{icon}</div>
      <div style={{ fontSize: '14px', fontWeight: '700', color, marginBottom: '2px' }}>{value}{unit}</div>
      <div style={{ fontSize: '11px', color: '#93959f' }}>{label}</div>
    </div>
  )
}

export function SectionHeader({ title }) {
  return (
    <div style={{ fontSize: '15px', fontWeight: '800', color: '#1C1C1C', marginBottom: '12px' }}>
      {title}
    </div>
  )
}

export function PayoutRow({ payout }) {
  return (
    <div style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#1C1C1C' }}>₹{payout.amount}</div>
        <div style={{ fontSize: '12px', color: '#93959f' }}>{payout.trigger}</div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '12px', color: '#3AB757', fontWeight: '600' }}>{payout.status}</div>
        <div style={{ fontSize: '11px', color: '#93959f' }}>{new Date(payout.createdAt).toLocaleDateString()}</div>
      </div>
    </div>
  )
}

export function Divider() {
  return <div style={{ height: '1px', background: '#F0F0F0', margin: '8px 0' }} />
}

export function EmptyState({ icon, title, subtitle }) {
  return (
    <div style={{ padding: '32px 16px', textAlign: 'center' }}>
      <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
      <div style={{ fontSize: '15px', fontWeight: '700', color: '#1C1C1C', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontSize: '13px', color: '#93959f' }}>{subtitle}</div>
    </div>
  )
}

export function ProgressBar({ value, max, color, height = 8, showValue = false, label }) {
  const percentage = Math.min((value / max) * 100, 100)
  return (
    <div style={{ marginBottom: '8px' }}>
      {label && <div style={{ fontSize: '11px', color: '#93959f', marginBottom: '4px' }}>{label}</div>}
      <div style={{ position: 'relative', height: `${height}px`, background: '#F0F0F0', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          background: color,
          transition: 'width 0.3s ease'
        }} />
        {showValue && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '10px',
            fontWeight: '700',
            color: '#fff',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}>
            {Math.round(percentage)}%
          </div>
        )}
      </div>
    </div>
  )
}

export function Btn({ children, onClick, variant = 'primary', style = {} }) {
  const variants = {
    primary: { background: '#E23744', color: '#fff' },
    secondary: { background: '#F8F8F8', color: '#1C1C1C' }
  }
  return (
    <button
      onClick={onClick}
      style={{
        padding: '12px 16px',
        borderRadius: '8px',
        border: 'none',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        ...variants[variant],
        ...style
      }}
    >
      {children}
    </button>
  )
}

export function Badge({ label, color, children }) {
  return (
    <div style={{
      padding: '4px 10px',
      borderRadius: '12px',
      background: color || 'rgba(255,255,255,0.05)',
      color: '#fff',
      fontSize: '11px',
      fontWeight: '800',
      textTransform: 'uppercase',
      display: 'inline-flex',
      alignItems: 'center',
      border: '1px solid rgba(255,255,255,0.05)'
    }}>
      {children || label}
    </div>
  )
}