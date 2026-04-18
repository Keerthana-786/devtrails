import React, { useEffect, useState } from 'react';
import { X, CloudRain, MapPin, History, Info, Brain, ChevronRight } from 'lucide-react';

const PremiumExplainabilityPanel = ({ isOpen, onClose, worker }) => {
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setVisibleItems([]);
      const items = [0, 1, 2, 3];
      items.forEach((item, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, index]);
        }, (index + 1) * 600);
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const factors = [
    {
      id: 0,
      icon: <CloudRain size={20} color="#3B82F6" />,
      title: "High Rainfall Risk",
      desc: "There is a high chance of heavy rain in your working area this week.",
      impact: "+₹12",
      color: "#3B82F6"
    },
    {
      id: 1,
      icon: <MapPin size={20} color="#EF4444" />,
      title: "Active Risk Zone",
      desc: "Your primary work zone has high claim activity right now.",
      impact: "+₹18",
      color: "#EF4444"
    },
    {
      id: 2,
      icon: <History size={20} color="#F59E0B" />,
      title: "Claims History",
      desc: "Based on your claims experience over the last 30 days.",
      impact: "+₹8",
      color: "#F59E0B"
    }
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1100,
      display: 'flex', justifyContent: 'flex-end',
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)'
    }} onClick={onClose}>
      <div 
        style={{
          width: '400px', height: '100%', background: '#fff', color: '#000',
          padding: '32px', boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column',
          animation: 'slideInRight 0.4s ease-out'
        }}
        onClick={e => e.stopPropagation()}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', background: '#F1F5F9', borderRadius: '10px' }}>
              <Brain size={24} color="#6366F1" />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A' }}>AI Price Logic</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '15px', color: '#475569', lineHeight: '1.6' }}>
            Your premium is calculated weekly by our AI. It changes based on real risks so you always pay a fair price for protection.
          </p>
        </div>

        <div style={{ 
          background: '#F8FAFC', padding: '24px', borderRadius: '16px', marginBottom: '32px',
          border: '1px solid #E2E8F0'
        }}>
          <p style={{ fontSize: '13px', color: '#64748B', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Total Weekly Premium</p>
          <div style={{ fontSize: '32px', fontWeight: '900', color: '#0F172A' }}>₹{worker.weeklyPremium || 49}.00</div>
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Why it changed this week:
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {factors.map((factor, index) => (
              <div 
                key={factor.id}
                style={{
                  display: 'flex', gap: '16px',
                  opacity: visibleItems.includes(index) ? 1 : 0,
                  transform: visibleItems.includes(index) ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'all 0.5s ease-out'
                }}
              >
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '12px', background: `${factor.color}10`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  {factor.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '700', color: '#1E293B', fontSize: '15px' }}>{factor.title}</span>
                    <span style={{ fontWeight: '800', color: factor.color, fontSize: '14px' }}>{factor.impact}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>{factor.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ 
          marginTop: 'auto', padding: '16px', background: '#F0FDFA', border: '1px solid #CCFBF1', 
          borderRadius: '12px', display: 'flex', gap: '12px' 
        }}>
          <Info size={18} color="#0D9488" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ fontSize: '12px', color: '#0D9488', lineHeight: '1.5' }}>
            <strong>Tip:</strong> Working in "Safe Zones" or having a higher Stability Score can reduce your weekly premium by up to 15%.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumExplainabilityPanel;
