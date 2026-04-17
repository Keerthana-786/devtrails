import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import DemoControls from './DemoControls';
import ClaimJourneyModal from './ClaimJourneyModal';
import NotificationBell from './NotificationBell';

const Layout = ({ children }) => {
  const location = useLocation();
  const noLayoutPaths = ['/login', '/onboarding'];
  const showLayout = !noLayoutPaths.includes(location.pathname);

  if (!showLayout) return children;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--dark-bg)', position: 'relative' }}>
      <div className="hide-mobile">
        <Sidebar />
      </div>
      
      <div style={{ flex: 1, marginLeft: window.innerWidth > 768 ? '240px' : '0', padding: '0px', width: '100%' }}>
        <header style={{ 
          height: '72px', 
          borderBottom: '1px solid var(--card-border)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0 24px',
          background: 'rgba(4, 4, 10, 0.8)',
          backdropFilter: 'blur(20px)',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
          <div style={{ display: 'none' }} className="show-mobile">
             <img src="/paynest2.png" alt="Logo" style={{ width: '30px' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginLeft: 'auto' }}>
            <div style={{ textAlign: 'right' }} className="hide-mobile">
              <p style={{ fontSize: '13px', fontWeight: 'bold', letterSpacing: '0.05em' }}>AUTO-PILOT</p>
              <p style={{ fontSize: '10px', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                <span className="pulse-dot" /> PARAMETRIC MONITORING
              </p>
            </div>
            <NotificationBell />
          </div>
        </header>
        <main style={{ padding: window.innerWidth > 768 ? '40px' : '20px', maxWidth: '1400px', margin: '0 auto' }}>
          {children}
        </main>
      </div>

      {/* Floating Protection Bar (Bottom) */}
      <div style={{ 
        position: 'fixed', 
        bottom: '24px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        zIndex: 100,
        width: 'auto'
      }}>
        <div className="glass" style={{ 
          padding: '12px 24px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          border: '1px solid rgba(16, 185, 129, 0.3)'
        }}>
          <div style={{ background: 'var(--success)', borderRadius: '50%', padding: '6px' }}>
             <Shield size={16} color="white" />
          </div>
          <div style={{ whiteSpace: 'nowrap' }}>
            <p style={{ fontSize: '12px', fontWeight: '800', color: 'white' }}>PAYNEST ACTIVE</p>
            <p style={{ fontSize: '10px', color: 'var(--success)', fontWeight: 'bold' }}>₹480 Coverage Engaged • Mumbai Zone</p>
          </div>
          <div style={{ width: '1px', height: '24px', background: 'var(--card-border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
             <div className="pulse-dot" style={{ color: 'var(--success)' }} />
             <span style={{ fontSize: '10px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>LIVE SYNC</span>
          </div>
        </div>
      </div>

      <DemoControls />
      <ClaimJourneyModal />
      
      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default Layout;
