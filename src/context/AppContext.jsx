import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isDemo, setIsDemo] = useState(sessionStorage.getItem('paynest_mode') === 'demo');
  const [isAdminAuth, setIsAdminAuth] = useState(sessionStorage.getItem('admin_auth') === 'true');
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('paynest_token'));

  // Worker State
  const [worker, setWorker] = useState({
    id: 'W001',
    name: 'Raju Kumar',
    phone: '9876543210',
    platform: 'Swiggy',
    pincode: '600040',
    city: 'Chennai',
    zone: 'Anna Nagar',
    upiId: 'raju.swiggy@upi',
    policyStatus: 'ACTIVE',
    weeklyPremium: 49,
    walletBalance: 2400,
    trustScore: 85,
    policyValidUntil: '2026-04-20',
  });

  // Claims History
  const [claims, setClaims] = useState([]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'GREEN', title: '₹480 credited', message: 'CLM-2026-4821 settled', time: '2 minutes ago', read: false },
    { id: 2, type: 'AMBER', title: 'Heavy rain detected', message: 'Trigger threshold exceeded in Anna Nagar', time: '5 minutes ago', read: false },
    { id: 3, type: 'RED', title: 'Fraud attempt blocked', message: 'CLM-2026-4756 rejected by AI Engine', time: '5 days ago', read: true }
  ]);

  // Auth State
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('paynest_token') || null);

  // Weather Data
  const [weatherData, setWeatherData] = useState({
    rainfall: 0,
    temp: 32,
    aqi: 187,
    lastChecked: new Date()
  });

  // Scan Log
  const [scanLog, setScanLog] = useState([
    { time: '3:47:02', message: 'Scan #247 — All clear', status: 'success' },
    { time: '3:46:32', message: 'Scan #246 — All clear', status: 'success' },
    { time: '3:46:02', message: 'Scan #245 — Rainfall check: 0mm ✅', status: 'info' }
  ]);

  const addScanLog = (message, status = 'info') => {
    const time = new Date().toLocaleTimeString('en-IN', { hour12: false });
    setScanLog(prev => [{ time, message, status }, ...prev.slice(0, 4)]);
  };

  const addNotification = (notif) => {
    setNotifications(prev => [{ ...notif, id: Date.now(), read: false }, ...prev]);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    sessionStorage.clear();
    window.location.href = '/login';
  };

  const value = {
    // Auth
    user, setUser,
    token, setToken,
    isAuthenticated, setIsAuthenticated,
    logout,
    // Worker & Claims
    worker, setWorker,
    claims, setClaims,
    notifications, setNotifications,
    weatherData, setWeatherData,
    scanLog, addScanLog,
    addNotification,
    // Demo & Admin
    isDemo,
    setIsDemo: (val) => {
      sessionStorage.setItem('paynest_mode', val ? 'demo' : '');
      setIsDemo(val);
    },
    isAdminAuth,
    setIsAdminAuth: (val) => {
      sessionStorage.setItem('admin_auth', val ? 'true' : '');
      setIsAdminAuth(val);
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

