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
  const { startClaimJourney, user } = useApp() || {};
  const [scanLog, setScanLog] = useState([]);
  const [metrics, setMetrics] = useState({ rainfall: 0, temp: 0, aqi: 0 });

  useEffect(() => {
    setScanLog([{ id: 'init', time: new Date().toLocaleTimeString('en-US', { hour12: false }), msg: 'Live automated monitor ready. Connected to weather streams.', type: 'info' }]);
    
    // Polling every 30 seconds
    const interval = setInterval(() => {
      const data = fetchMockWeatherData('400058');
      setMetrics(data);
      const timeStr = new Date().toLocaleTimeString('en-US', { hour12: false });
      let triggerFound = false;

      const triggerPayout = (type, value, condition) => {
        const claimId = `CLM_AUTO_${Math.random().toString(36).substr(2,6).toUpperCase()}`;
        setScanLog(prev => [{ id: claimId, time: timeStr, msg: `${type} Triggered (${condition}: ${value}) [Auto-Claim: ${claimId}]`, type: 'error' }, ...prev].slice(0, 10));
        
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
        setScanLog(prev => [{ id: `s${Date.now()}`, time: timeStr, msg: `Scan All Clear (Rain: ${data.rainfall}mm, Temp: ${data.temp}°C, AQI: ${data.aqi})`, type: 'success' }, ...prev].slice(0, 10));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: '#050505', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '24px', fontFamily: "'Courier New', Courier, monospace", color: '#E2E8F0', marginBottom: '24px', width: '100%', lineHeight: '1.6' }}>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; box-shadow: 0 0 10px #10B981; } 50% { opacity: 0.6; box-shadow: 0 0 20px #10B981; } }`}</style>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #333', paddingBottom: '12px', marginBottom: '16px', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
        <div style={{ color: '#F8FAFC', fontWeight: 'bold', fontSize: '15px' }}>⚡ AUTOMATED TRIGGER MONITOR</div>
        <div style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 'bold', border: '1px solid #10b981', padding: '6px 12px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)' }}>
          <div style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '50%', boxShadow: '0 0 8px #10B981', animation: 'pulse 1s infinite' }} />
          LIVE MONITORING
        </div>
      </div>

      <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '16px' }}>Runs automatically every 30 seconds. No manual intervention required. | Current metrics: Rain <strong>{metrics.rainfall}mm</strong> | Temp <strong>{metrics.temp}°C</strong> | AQI <strong>{metrics.aqi}</strong></div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '16px' }}>
        <div style={{ maxHeight: '160px', overflowY: 'auto', background: '#000', padding: '14px', border: '1px solid #222', borderRadius: '6px', fontSize: '12px' }}>
          {scanLog.length === 0 ? (
            <div style={{ color: '#94A3B8' }}>Initializing automated monitoring...</div>
          ) : (
            scanLog.map((log) => (
               <div key={log.id} style={{ color: log.type === 'error' ? '#EF4444' : log.type === 'warning' ? '#F59E0B' : log.type === 'info' ? '#94A3B8' : '#10B981', marginBottom: '6px', fontWeight: log.type === 'error' ? 'bold' : 'normal' }}>
                 <span style={{ color: '#64748B' }}>[{log.time}]</span> {log.msg}
               </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
