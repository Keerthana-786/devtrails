import React from 'react';
import config from '../config.js';

/**
 * DEMO MODE BADGE — Only shown when config.IS_DEMO = true
 * Floating badge in top right corner
 */

export default function DemoModeBadge() {
  const [showTooltip, setShowTooltip] = React.useState(false);

  if (!config.IS_DEMO) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1001,
      fontFamily: "'Outfit', sans-serif"
    }}>
      <div
        style={{
          background: 'rgba(245,158,11,0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: '20px',
          padding: '8px 16px',
          color: '#000',
          fontSize: '12px',
          fontWeight: '800',
          cursor: 'help',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          boxShadow: '0 4px 12px rgba(245,158,11,0.3)',
          animation: 'demoPulse 2s ease-in-out infinite'
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span style={{ fontSize: '14px' }}>🎭</span>
        DEMO MODE

        <style>{`
          @keyframes demoPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
        `}</style>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div style={{
          position: 'absolute',
          top: '50px',
          right: '0',
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          padding: '12px 16px',
          color: '#fff',
          fontSize: '12px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          animation: 'fadeIn 0.2s ease'
        }}>
          This is a demonstration.<br/>
          No real money is involved.
        </div>
      )}
    </div>
  );
}