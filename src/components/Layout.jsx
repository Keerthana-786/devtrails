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
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--dark-bg)' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '240px', padding: '0px' }}>
        <header style={{ 
          height: '72px', 
          borderBottom: '1px solid var(--card-border)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end', 
          padding: '0 40px',
          background: 'rgba(15, 15, 26, 0.8)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
              <p style={{ fontSize: '13px', fontWeight: '600' }}>Live Coverage</p>
              <p style={{ fontSize: '11px', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                <span className="pulse-dot" /> Monitoring Active
              </p>
            </div>
            <NotificationBell />
          </div>
        </header>
        <main style={{ padding: '40px' }}>
          {children}
        </main>
      </div>
      <DemoControls />
      <ClaimJourneyModal />
    </div>
  );
};

export default Layout;
