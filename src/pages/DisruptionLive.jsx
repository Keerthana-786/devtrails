import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { Card, Badge, ProgressBar } from '../components/UI.jsx'

export default function DisruptionLive() {
  const { weather, risk } = useApp()
  const [liveData, setLiveData] = useState({
    activeDisruptions: 12,
    ridersAffected: 847,
    totalPayouts: 125000,
    zones: [
      { name: 'Andheri West', status: 'HEAVY_RAIN', severity: 'HIGH', affected: 156 },
      { name: 'Bandra East', status: 'TRAFFIC_JAM', severity: 'MEDIUM', affected: 89 },
      { name: 'Lower Parel', status: 'POWER_OUTAGE', severity: 'HIGH', affected: 234 },
      { name: 'Powai', status: 'FLOOD_WARNING', severity: 'CRITICAL', affected: 312 },
      { name: 'Goregaon East', status: 'NORMAL', severity: 'LOW', affected: 0 },
      { name: 'Malad West', status: 'HEATWAVE', severity: 'MEDIUM', affected: 56 }
    ]
  })

  const [selectedZone, setSelectedZone] = useState('Andheri West')

  const statusConfig = {
    HEAVY_RAIN: { color: '#1A73E8', icon: '🌧️', label: 'Heavy Rain' },
    TRAFFIC_JAM: { color: '#F97316', icon: '🚗', label: 'Traffic Jam' },
    POWER_OUTAGE: { color: '#E23744', icon: '⚡', label: 'Power Outage' },
    FLOOD_WARNING: { color: '#8B5CF6', icon: '🌊', label: 'Flood Warning' },
    HEATWAVE: { color: '#F59E0B', icon: '☀️', label: 'Heatwave' },
    NORMAL: { color: '#3AB757', icon: '✅', label: 'Normal' }
  }

  const severityColors = {
    CRITICAL: '#E23744',
    HIGH: '#F97316',
    MEDIUM: '#F59E0B',
    LOW: '#3AB757'
  }

  // Mock live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        activeDisruptions: prev.activeDisruptions + Math.floor(Math.random() * 3) - 1,
        ridersAffected: prev.ridersAffected + Math.floor(Math.random() * 50) - 25,
        totalPayouts: prev.totalPayouts + Math.floor(Math.random() * 1000)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const selectedZoneData = liveData.zones.find(z => z.name === selectedZone)

  return (
    <div style={{ padding: '20px', background: '#F8F8F8', minHeight: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#1C1C1C', marginBottom: '4px' }}>
          Live Disruptions
        </h1>
        <p style={{ fontSize: '14px', color: '#93959f' }}>
          Real-time monitoring of weather and infrastructure issues
        </p>
      </div>

      {/* Live Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
        <Card elevated>
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#E23744' }}>
              {liveData.activeDisruptions}
            </div>
            <div style={{ fontSize: '12px', color: '#93959f' }}>Active Disruptions</div>
          </div>
        </Card>
        <Card elevated>
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#1A73E8' }}>
              {liveData.ridersAffected.toLocaleString()}
            </div>
            <div style={{ fontSize: '12px', color: '#93959f' }}>Riders Affected</div>
          </div>
        </Card>
        <Card elevated>
          <div style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#3AB757' }}>
              ₹{liveData.totalPayouts.toLocaleString()}
            </div>
            <div style={{ fontSize: '12px', color: '#93959f' }}>Total Payouts</div>
          </div>
        </Card>
      </div>

      {/* Zone Status */}
      <Card elevated style={{ marginBottom: '20px' }}>
        <div style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1C1C1C', marginBottom: '16px' }}>
            Zone Status
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {liveData.zones.map((zone) => (
              <div
                key={zone.name}
                onClick={() => setSelectedZone(zone.name)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  background: selectedZone === zone.name ? '#F0F7FF' : '#fff',
                  border: selectedZone === zone.name ? '2px solid #1A73E8' : '1px solid #E0E0E0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#1C1C1C' }}>
                    {zone.name}
                  </div>
                  <div style={{ fontSize: '16px' }}>
                    {statusConfig[zone.status]?.icon}
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Badge
                    label={statusConfig[zone.status]?.label}
                    color={statusConfig[zone.status]?.color}
                  />
                  <div style={{ fontSize: '12px', color: '#93959f' }}>
                    {zone.affected} affected
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Zone Details */}
      {selectedZoneData && (
        <Card elevated>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1C1C1C' }}>
                {selectedZone} Details
              </h2>
              <Badge
                label={selectedZoneData.severity}
                color={severityColors[selectedZoneData.severity]}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', color: '#93959f', marginBottom: '8px' }}>
                Current Status
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '20px' }}>{statusConfig[selectedZoneData.status]?.icon}</span>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#1C1C1C' }}>
                  {statusConfig[selectedZoneData.status]?.label}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', color: '#93959f', marginBottom: '8px' }}>
                Riders Affected
              </div>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#E23744' }}>
                {selectedZoneData.affected}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', color: '#93959f', marginBottom: '8px' }}>
                Impact Level
              </div>
              <ProgressBar
                value={selectedZoneData.severity === 'CRITICAL' ? 90 : selectedZoneData.severity === 'HIGH' ? 70 : selectedZoneData.severity === 'MEDIUM' ? 45 : 20}
                max={100}
                color={severityColors[selectedZoneData.severity]}
                height={8}
                showValue
              />
            </div>

            <div style={{ padding: '12px', background: '#FFF3CD', borderRadius: '8px' }}>
              <div style={{ fontSize: '12px', color: '#856404', fontWeight: '600' }}>
                🚨 Emergency Response Active
              </div>
              <div style={{ fontSize: '11px', color: '#856404', marginTop: '4px' }}>
                Automatic payouts triggered for affected riders
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
