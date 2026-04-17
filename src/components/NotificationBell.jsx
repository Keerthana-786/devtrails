import React, { useState } from 'react';
import { Bell, CheckCircle, AlertTriangle, XCircle, Info, Timer } from 'lucide-react';
import { useApp } from '../context/AppContext';

const NotificationBell = () => {
  const { notifications = [], setNotifications } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications?.filter(n => !n.read)?.length || 0;

  const getIcon = (type) => {
    switch (type) {
      case 'GREEN': return <CheckCircle size={16} color="#10B981" />;
      case 'AMBER': return <AlertTriangle size={16} color="#F59E0B" />;
      case 'RED': return <XCircle size={16} color="#EF4444" />;
      case 'BLUE': return <CheckCircle size={16} color="#6C63FF" />;
      case 'PURPLE': return <Timer size={16} color="#6C63FF" />;
      default: return <Info size={16} color="#94A3B8" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && unreadCount > 0) markAllAsRead();
        }}
        style={{
          background: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          position: 'relative'
        }}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: 'var(--danger)',
            color: 'white',
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '10px',
            border: '2px solid var(--dark-bg)',
            fontWeight: 'bold'
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            onClick={() => setIsOpen(false)} 
            style={{ position: 'fixed', inset: 0, zIndex: 998 }} 
          />
          <div style={{
            position: 'absolute',
            top: '50px',
            right: 0,
            width: '320px',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
            zIndex: 999,
            overflow: 'hidden'
          }}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '14px' }}>Notifications</h4>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Close</button>
            </div>
            
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {notifications.length === 0 ? (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Bell size={32} style={{ opacity: 0.2, marginBottom: '12px' }} />
                  <p>No new notifications</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div 
                    key={n.id} 
                    style={{ 
                      padding: '16px', 
                      borderBottom: '1px solid var(--card-border)',
                      background: n.read ? 'transparent' : 'rgba(108, 99, 255, 0.05)',
                      display: 'flex',
                      gap: '12px'
                    }}
                  >
                    <div style={{ marginTop: '2px' }}>{getIcon(n.type)}</div>
                    <div>
                      <h5 style={{ fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>{n.title}</h5>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{n.message}</p>
                      <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{n.time}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div style={{ padding: '12px', textAlign: 'center', borderTop: '1px solid var(--card-border)' }}>
              <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                View All Notifications
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
