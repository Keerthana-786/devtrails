import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Shield, FileText, Wallet, Lock, BarChart3, Settings, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Sidebar = () => {
  const { worker, isDemo, setIsAdminAuth } = useApp();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Shield size={20} />, label: 'My Policy', path: '/protection' },
    { icon: <FileText size={20} />, label: 'Claims', path: '/claims' },
    { icon: <Wallet size={20} />, label: 'Payouts', path: '/payouts' },
    { icon: <Lock size={20} />, label: 'Fraud Shield', path: '/fraud' },
    { icon: <BarChart3 size={20} />, label: 'Insights', path: '/insights' },
  ];

  return (
    <div style={{
      width: '240px',
      height: '100vh',
      background: 'var(--dark-bg)',
      borderRight: '1px solid var(--card-border)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100
    }}>
      <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img src="/paynest2.png" alt="PayNest" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
        <h1 style={{ fontSize: '20px', letterSpacing: '-0.5px', fontWeight: '800' }}>PayNest</h1>
      </div>

      <div style={{ padding: '0 24px 24px 24px', borderBottom: '1px solid var(--card-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
          <div style={{ 
            width: '40px', height: '40px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', fontWeight: 'bold'
          }}>
            {worker?.name?.charAt(0) || 'U'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{worker?.name || 'User'}</p>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{worker?.platform || 'Delivery'} Partner</p>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item, index) => (
          <NavLink 
            key={index}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '12px',
              textDecoration: 'none',
              color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
              background: isActive ? 'rgba(108, 99, 255, 0.1)' : 'transparent',
              fontWeight: isActive ? '600' : '400',
              transition: 'all 0.2s'
            })}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div style={{ padding: '24px', borderTop: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button 
          onClick={() => {
            const pass = prompt('Admin Password:');
            if (pass === 'paynest2026') {
              setIsAdminAuth(true);
              window.location.href = '/admin';
            }
          }}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--text-muted)', 
            fontSize: '12px', 
            cursor: 'pointer',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Settings size={14} /> Admin Panel
        </button>

        {isDemo && (
          <div style={{ 
            padding: '4px 8px', 
            background: 'rgba(245, 158, 11, 0.1)', 
            color: 'var(--warning)', 
            borderRadius: '4px', 
            fontSize: '10px', 
            fontWeight: 'bold',
            textAlign: 'center',
            letterSpacing: '1px'
          }}>
            DEMO MODE
          </div>
        )}

        <button 
          onClick={() => {
            sessionStorage.clear();
            window.location.href = '/login';
          }}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '12px 16px', 
            color: 'var(--danger)', 
            fontSize: '14px',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
