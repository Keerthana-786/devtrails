import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [isDemo, setIsDemo] = useState(sessionStorage.getItem('paynest_mode') === 'demo');
  const [isAdminAuth, setIsAdminAuth] = useState(sessionStorage.getItem('admin_auth') === 'true');

  // Worker State
  const [worker, setWorker] = useState({
    id: 'W001',
    name: 'Raju Kumar',
    phone: '9876543210',
    platform: 'Swiggy',
    pincode: '600040',
    city: 'Chennai',
    zone: 'Anna Nagar',
    upi_id: 'raju.swiggy@upi',
    policy_active: true,
    tier: 'standard',
    weekly_premium: 49,
    coverage_per_day: 500,
    total_protected: 2400,
    claims_count: 5,
    policy_valid_until: '2026-04-18',
    account_age_days: 28
  });

  // Claims History
  const [claims, setClaims] = useState([
    { id: 'CLM-2026-4821', dateDay: '17 Apr', dateTime: '3:47 PM', trigger: 'Heavy Rain', intensity: '42mm/hr', zone: 'Anna Nagar, Chennai', amount: 480, fraudScore: 0, status: 'SETTLED', transactionId: 'pay_K8mNpQ2xRt9Yw', triggerType: 'HEAVY_RAIN' },
    { id: 'CLM-2026-4818', dateDay: '08 Apr', dateTime: '2:30 PM', trigger: 'Heavy Rain', intensity: '38mm/hr', zone: 'Anna Nagar, Chennai', amount: 480, fraudScore: 0, status: 'SETTLED', transactionId: 'pay_J7nMoP1wSu8Xv', triggerType: 'HEAVY_RAIN' },
    { id: 'CLM-2026-4801', dateDay: '03 Apr', dateTime: '11:15 AM', trigger: 'Extreme Heat', intensity: '44°C', zone: 'Anna Nagar, Chennai', amount: 350, fraudScore: 0, status: 'SETTLED', transactionId: 'pay_H6pLnO0vRt7Wu', triggerType: 'EXTREME_HEAT' },
    { id: 'CLM-2026-4799', dateDay: '01 Apr', dateTime: '9:00 AM', trigger: 'Severe AQI', intensity: 'AQI 372', zone: 'Anna Nagar, Chennai', amount: 300, fraudScore: 5, status: 'SETTLED', transactionId: 'pay_G5qKmN9uQs6Vt', triggerType: 'SEVERE_AQI' },
    { id: 'CLM-2026-4756', dateDay: '28 Mar', dateTime: '4:22 PM', trigger: 'FRAUD ATTEMPT', intensity: 'GPS Mismatch', zone: 'Anna Nagar, Chennai', amount: 0, fraudScore: 85, status: 'BLOCKED', transactionId: 'N/A', triggerType: 'FRAUD' }
  ]);

  // Payouts list
  const [payouts, setPayouts] = useState([
    { id: 'pay_K8mNpQ2xRt9Yw', amount: 480, date: '17 Apr 2026', trigger: 'Heavy Rain', claimId: 'CLM-2026-4821', status: 'SETTLED', triggerType: 'HEAVY_RAIN' },
    { id: 'pay_J7nMoP1wSu8Xv', amount: 480, date: '08 Apr 2026', trigger: 'Heavy Rain', claimId: 'CLM-2026-4818', status: 'SETTLED', triggerType: 'HEAVY_RAIN' },
    { id: 'pay_H6pLnO0vRt7Wu', amount: 350, date: '03 Apr 2026', trigger: 'Extreme Heat', claimId: 'CLM-2026-4801', status: 'SETTLED', triggerType: 'EXTREME_HEAT' },
    { id: 'pay_G5qKmN9uQs6Vt', amount: 300, date: '01 Apr 2026', trigger: 'Severe AQI', claimId: 'CLM-2026-4799', status: 'SETTLED', triggerType: 'SEVERE_AQI' }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'GREEN', title: '₹480 credited', message: 'CLM-2026-4821 settled', time: '2 minutes ago', read: false },
    { id: 2, type: 'AMBER', title: 'Heavy rain detected', message: 'Trigger threshold exceeded in Anna Nagar', time: '5 minutes ago', read: false },
    { id: 3, type: 'RED', title: 'Fraud attempt blocked', message: 'CLM-2026-4756 rejected by AI Engine', time: '5 days ago', read: true },
    { id: 4, type: 'BLUE', title: 'Policy renewed', message: 'Standard plan active for next week', time: '7 days ago', read: true },
    { id: 5, type: 'PURPLE', title: 'New trigger detected', message: 'Extreme Heat 44°C recorded', time: '4 days ago', read: true }
  ]);

  // Auth State
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('paynest_token') || null);
  const [btsScore, setBtsScore] = useState(0);

  // Active Claim Journey
  const [activeClaimJourney, setActiveClaimJourney] = useState(null);

  // Weather Data
  const [weatherData, setWeatherData] = useState({
    rainfall: 0,
    temp: 32,
    aqi: 187,
    wind: 14,
    lastChecked: new Date()
  });

  // Scan Log
  const [scanLog, setScanLog] = useState([
    { time: '3:47:02', message: 'Scan #247 — All clear', status: 'success' },
    { time: '3:46:32', message: 'Scan #246 — All clear', status: 'success' },
    { time: '3:46:02', message: 'Scan #245 — Rainfall check: 0mm ✅', status: 'info' },
    { time: '3:45:32', message: 'Scan #244 — AQI check: 187 ✅', status: 'info' },
    { time: '3:45:02', message: 'Scan #243 — All clear', status: 'success' }
  ]);

  const addScanLog = (message, status = 'info') => {
    const time = new Date().toLocaleTimeString('en-IN', { hour12: false });
    setScanLog(prev => [{ time, message, status }, ...prev.slice(0, 4)]);
  };

  const addNotification = (notif) => {
    setNotifications(prev => [{ ...notif, id: Date.now(), read: false }, ...prev]);
  };

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    sessionStorage.setItem('paynest_token', authToken);
    if (userData) {
      setWorker(userData);
      sessionStorage.setItem('paynest_user', JSON.stringify(userData));
    }
  };

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
    setWorker(prev => ({ ...prev, ...updates }));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    sessionStorage.removeItem('paynest_token');
    sessionStorage.removeItem('paynest_user');
  };

  const triggerClaim = (type, value) => {
    const claimId = `CLM-2026-${Math.floor(Math.random() * 9000) + 1000}`;
    setActiveClaimJourney({
      claimId,
      type,
      value,
      startTime: new Date().toLocaleTimeString('en-IN')
    });
  };

  const completeClaim = (claimData) => {
    setClaims(prev => [claimData, ...prev]);
    if (claimData.amount > 0) {
      setPayouts(prev => [{
        id: claimData.transactionId,
        amount: claimData.amount,
        date: claimData.dateDay + ' 2026',
        trigger: claimData.trigger,
        claimId: claimData.id,
        status: 'SETTLED',
        triggerType: claimData.triggerType
      }, ...prev]);
      
      setWorker(prev => ({
        ...prev,
        total_protected: prev.total_protected + claimData.amount,
        claims_count: prev.claims_count + 1
      }));

      addNotification({
        type: 'GREEN',
        title: `₹${claimData.amount} credited`,
        message: `${claimData.id} settled via Razorpay`,
        time: 'Just now'
      });
    } else {
      addNotification({
        type: 'RED',
        title: 'Claim Rejected',
        message: `${claimData.id} flagged as fraud`,
        time: 'Just now'
      });
    }
    setActiveClaimJourney(null);
  };

  const value = {
    // Auth
    user, setUser,
    token, setToken,
    login,
    updateUser,
    logout,
    btsScore, setBtsScore,
    // Policy & Wallet
    weeklyPremium: worker.weekly_premium,
    policyStatus: worker.policy_active ? 'ACTIVE' : 'INACTIVE',
    walletBalance: worker.total_protected || 0,
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
    },
    // Worker & Claims
    worker, setWorker,
    claims, setClaims,
    payouts, setPayouts,
    notifications, setNotifications,
    activeClaimJourney, setActiveClaimJourney,
    claimJourneyData: activeClaimJourney,
    weatherData, setWeatherData,
    scanLog, addScanLog,
    triggerClaim,
    completeClaim,
    completeClaimJourney: completeClaim,
    addNotification
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
