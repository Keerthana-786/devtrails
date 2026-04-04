import React, { useEffect, useState } from 'react'
import { useApp } from '../context/AppContext.jsx'

// ── Toast colour config ───────────────────────────────────────────────────────
const TOAST_STYLES = {
  success: { bg: 'rgba(16, 185, 129, 0.15)', border: '#10B981', icon: '✅' },
  warning: { bg: 'rgba(245, 158, 11, 0.15)', border: '#F59E0B', icon: '⚠️' },
  badge:   { bg: 'rgba(59, 130, 246, 0.15)', border: '#3B82F6', icon: '🏅' },
  info:    { bg: 'rgba(148, 163, 184, 0.1)', border: '#475569', icon: 'ℹ️' },
  error:   { bg: 'rgba(239, 68, 68, 0.15)',  border: '#EF4444', icon: '❌' },
}

function Toast({ toast, onDismiss }) {
  const [visible, setVisible] = useState(false)
  const style = TOAST_STYLES[toast.type] || TOAST_STYLES.info

  // Slide in after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 20)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      onClick={() => onDismiss(toast.id)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        padding: '14px 16px',
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderRadius: '12px',
        cursor: 'pointer',
        backdropFilter: 'blur(12px)',
        boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px ${style.border}22`,
        maxWidth: '340px',
        fontFamily: "'Outfit', sans-serif",
        // Slide-up animation via transform
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <span style={{ fontSize: '18px', flexShrink: 0, marginTop: '1px' }}>{style.icon}</span>
      <div>
        <div style={{ fontSize: '13px', color: '#fff', fontWeight: '600', lineHeight: '1.4' }}>
          {toast.msg}
        </div>
        <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '3px' }}>
          Tap to dismiss
        </div>
      </div>
      {/* Progress bar showing time remaining */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0,
        height: '2px',
        width: '100%',
        borderRadius: '0 0 12px 12px',
        background: style.border,
        animation: 'toast-progress 4s linear forwards',
      }} />
    </div>
  )
}

// ── Main Toast container (fixed bottom-right) ─────────────────────────────────
export default function ToastSystem() {
  const { toasts, dismissToast } = useApp()

  return (
    <>
      <style>{`
        @keyframes toast-progress {
          from { transform: scaleX(1); transform-origin: left; }
          to   { transform: scaleX(0); transform-origin: left; }
        }
      `}</style>
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}>
        {toasts.map(toast => (
          <div key={toast.id} style={{ pointerEvents: 'all', position: 'relative' }}>
            <Toast toast={toast} onDismiss={dismissToast} />
          </div>
        ))}
      </div>
    </>
  )
}
