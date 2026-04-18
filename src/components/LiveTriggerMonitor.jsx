import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext.jsx';

// Mock Weather Data Fetcher
const fetchMockWeatherData = (pincode) => {
  return {
    rainfall: Math.floor(Math.random() * 50), // 0 to 49 mm
    temp: Math.floor(Math.random() * 15) + 32, // 32 to 46 C
    aqi: Math.floor(Math.random() * 300) + 100 // 100 to 400
  };
};

export function LiveTriggerMonitor() {
  const { startClaimJourney, worker } = useApp() || {};
  const [scanLog, setScanLog] = useState([]);
  const [metrics, setMetrics] = useState({ rainfall: 0, temp: 0, aqi: 0 });
  const [countdown, setCountdown] = useState(15);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    setScanLog([{ 
      id: 'init', 
      time: new Date().toLocaleTimeString('en-US', { hour12: false }), 
      msg: '📡 System Handshake: Parametric trigger engine initialized. Connected to local weather stations.', 
      type: 'info' 
    }]);
    
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    // Polling every 15 seconds
    const scanInterval = setInterval(() => {
      setIsScanning(true);
      setCountdown(15);

      const data = fetchMockWeatherData('400058');
      setMetrics(data);
      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
      let triggerFound = false;

      const triggerPayout = (type, value, condition) => {
        const claimId = `CLM_AUTO_${Math.random().toString(36).substr(2,6).toUpperCase()}`;
        setScanLog(prev => [{ 
          id: claimId, 
          time: timeStr, 
          msg: `🚨 ${type} BREACH DETECTED (${condition}: ${value}). Auto-Claim triggered: ${claimId}`, 
          type: 'error' 
        }, ...prev].slice(0, 10));
        
        if (startClaimJourney) {
          startClaimJourney({
            claimId,
            trigger: type === 'HEAVY_RAIN' ? 'Heavy Rain' : type === 'EXTREME_HEAT' ? 'Extreme Heat' : 'Severe AQI',
            value: value
          });
        }
      };

      if (data.rainfall > 35) {
        triggerFound = true;
        triggerPayout('HEAVY_RAIN', `${data.rainfall}mm`, 'Rainfall');
      } else if (data.temp > 43) {
        triggerFound = true;
        triggerPayout('EXTREME_HEAT', `${data.temp}°C`, 'Temperature');
      } else if (data.aqi > 350) {
        triggerFound = true;
        triggerPayout('SEVERE_AQI', `${data.aqi} AQI`, 'Air Quality');
      }

      if (!triggerFound) {
        setScanLog(prev => [{ 
          id: `s${Date.now()}`, 
          time: timeStr, 
          msg: `✅ Scan Complete: No risk detected — All metrics stable.`, 
          type: 'success' 
        }, ...prev].slice(0, 10));
      }

      setIsScanning(false);
    }, 15000);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(scanInterval);
    };
  }, [startClaimJourney]);

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0F3B29 0%, #0A1F15 100%)', 
      border: '2px solid rgba(16,185,129,0.4)', 
      borderRadius: '16px', 
      padding: '28px', 
      fontFamily: "'Inter', sans-serif", 
      color: '#E2E8F0', 
      marginBottom: '32px', 
      width: '100%', 
      boxShadow: '0 20px 50px rgba(16,185,129,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>{`
        @keyframes pulse-glow { 
          0% { opacity: 0.5; box-shadow: 0 0 10px #10B981; } 
          50% { opacity: 1; box-shadow: 0 0 20px #10B981, 0 0 40px rgba(16,185,129,0.5); } 
          100% { opacity: 0.5; box-shadow: 0 0 10px #10B981; } 
        }
        @keyframes scanLine {
          0% { transform: translateX(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes shimmer {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .live-indicator {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .scan-line {
          animation: scanLine 2s ease-in-out infinite;
        }
      `}</style>
      
      {/* Animated scanning bar at top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, rgba(16,185,129,0) 0%, #10B981 50%, rgba(16,185,129,0) 100%)',
        className: 'scan-line'
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
            {/* Glowing Live Indicator */}
            <div className="live-indicator" style={{ 
              padding: '8px 16px', 
              background: 'rgba(16,185,129,0.15)', 
              border: '2px solid rgba(16,185,129,0.5)', 
              borderRadius: '100px',
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              fontSize: '13px', 
              fontWeight: 'bold',
              color: '#10B981'
            }}>
              <div style={{ width: '10px', height: '10px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 15px #10B981' }} />
              ● LIVE
            </div>

            {/* Countdown Timer */}
            <div style={{
              padding: '8px 14px',
              background: 'rgba(59,130,246,0.15)',
              border: '1px solid rgba(59,130,246,0.3)',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '700',
              color: '#3B82F6',
              fontFamily: 'monospace'
            }}>
              ⏱️ Next scan: {countdown}s
            </div>
          </div>

          <div style={{ color: '#F8FAFC', fontWeight: '800', fontSize: '18px', letterSpacing: '-0.01em', marginBottom: '6px' }}>
            🔍 Live Risk Monitoring
          </div>
          <div style={{ color: '#86EFAC', fontSize: '13px', fontWeight: '500' }}>
            Auto-monitoring environmental risk in real-time
          </div>
        </div>

        {/* Scan Status */}
        <div style={{
          padding: '12px 16px',
          background: isScanning ? 'rgba(59,130,246,0.2)' : 'rgba(16,185,129,0.1)',
          border: `2px solid ${isScanning ? 'rgba(59,130,246,0.5)' : 'rgba(16,185,129,0.3)'}`,
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: '600',
          color: isScanning ? '#60A5FA' : '#10B981'
        }}>
          {isScanning ? (
            <>
              <div style={{ animation: 'pulse-glow 1s infinite', marginBottom: '4px' }}>⚡ SCANNING...</div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>Reading sensors</div>
            </>
          ) : (
            <>
              <div>✅ MONITORING</div>
              <div style={{ fontSize: '11px', opacity: 0.8 }}>All systems active</div>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Rainfall', value: `${metrics.rainfall}mm`, status: metrics.rainfall > 35 ? 'CRITICAL' : 'STABLE' },
          { label: 'Temperature', value: `${metrics.temp}°C`, status: metrics.temp > 43 ? 'CRITICAL' : 'STABLE' },
          { label: 'AQI Index', value: metrics.aqi, status: metrics.aqi > 350 ? 'CRITICAL' : 'STABLE' },
          { label: 'Local Zone', value: worker?.zone || 'Mumbai', status: 'ACTIVE' }
        ].map(item => (
          <div key={item.label} style={{ 
            background: item.status === 'CRITICAL' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.05)', 
            padding: '14px', 
            borderRadius: '10px', 
            border: `1px solid ${item.status === 'CRITICAL' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.2)'}` 
          }}>
            <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '6px' }}>{item.label}</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: item.status === 'CRITICAL' ? '#FCA5A5' : '#10B981' }}>{item.value}</div>
            <div style={{ fontSize: '9px', color: item.status === 'CRITICAL' ? '#EF4444' : '#86EFAC', marginTop: '4px', fontWeight: '600' }}>{item.status}</div>
          </div>
        ))}
      </div>

      <div style={{ 
        background: '#000', borderRadius: '12px', padding: '16px', border: '1px solid rgba(16,185,129,0.2)',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
      }}>
        <div style={{ maxHeight: '100px', overflowY: 'auto', fontSize: '12px' }}>
          {scanLog.map((log) => (
             <div key={log.id} style={{ color: log.type === 'error' ? '#F87171' : log.type === 'info' ? '#94A3B8' : '#86EFAC', marginBottom: '6px' }}>
               <span style={{ color: '#475569', marginRight: '8px' }}>[{log.time}]</span> {log.msg}
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
