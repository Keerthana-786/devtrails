import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_CLAIMS_ARRAY } from './services/DEMO_DATA';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Persistence Utilities
  const saveToFolder = (key, val) => localStorage.setItem(`paynest_${key}`, JSON.stringify(val));
  const getFromFolder = (key, defaultVal) => {
    const saved = localStorage.getItem(`paynest_${key}`);
    return saved ? JSON.parse(saved) : defaultVal;
  };

  // Auth & Mode State
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('paynest_token') || !!sessionStorage.getItem('paynest_token'));
  const [isDemo, setIsDemoState] = useState(() => localStorage.getItem('paynest_is_demo') === 'true');
  const [isAdminAuth, setIsAdminAuthState] = useState(() => localStorage.getItem('paynest_is_admin') === 'true');

  // Worker & Claims State
  const [worker, setWorkerState] = useState(() => getFromFolder('worker', {
    name: 'Raju Kumar',
    city: 'Chennai',
    pincode: '600001',
    zone: 'Anna Nagar',
    platform: 'Swiggy',
    walletBalance: 2400,
    trustScore: 85,
    policyStatus: 'ACTIVE',
    weeklyPremium: 49,
    coverage_per_day: 480,
    policy_valid_until: '18 Apr 2026'
  }));

  const [claims, setClaimsState] = useState(() => getFromFolder('claims', DEMO_CLAIMS_ARRAY));
  const [activeClaimJourney, setActiveClaimJourney] = useState(null);

  // Setters with persistence
  const setWorker = (data) => {
    const updated = typeof data === 'function' ? data(worker) : { ...worker, ...data };
    setWorkerState(updated);
    saveToFolder('worker', updated);
  };

  const setClaims = (data) => {
    const updated = typeof data === 'function' ? data(claims) : data;
    setClaimsState(updated);
    saveToFolder('claims', updated);
  };

  const setIsDemo = (val) => {
    setIsDemoState(val);
    localStorage.setItem('paynest_is_demo', val);
  };

  const setIsAdminAuth = (val) => {
    setIsAdminAuthState(val);
    localStorage.setItem('paynest_is_admin', val);
  };

  // Claim Engine
  const startClaimJourney = (data) => {
    setActiveClaimJourney(data);
  };

  const triggerClaim = (type, value) => {
    const label = type === 'HEAVY_RAIN' ? 'Heavy Rain' : 
                type === 'EXTREME_HEAT' ? 'Extreme Heat' : 
                type === 'SEVERE_AQI' ? 'Severe AQI' : 
                type === 'CURFEW' ? 'City Curfew' :
                type === 'FRAUD' ? 'Suspicious Activity' : 'Disruption';
    
    startClaimJourney({
      trigger: label,
      value: value || 'Threshold Breach',
      triggerType: type,
      customFraud: type === 'FRAUD' ? 88 : 0,
      rejectReason: type === 'FRAUD' ? 'GPS Spoofing / Proxy detected' : null
    });
  };

  const addClaim = (newClaim) => {
    const updatedClaims = [newClaim, ...claims];
    setClaims(updatedClaims);
    
    if (newClaim.status === 'SETTLED') {
      const updatedWorker = {
        ...worker,
        walletBalance: (worker.walletBalance || 0) + newClaim.amount
      };
      setWorker(updatedWorker);
    }
  };

  // Environment Data (Mock Live)
  const [weatherData, setWeatherData] = useState({
    rainfall: 0,
    temp: 32,
    aqi: 85,
    lastSync: new Date().toLocaleTimeString()
  });

  const logout = () => {
    localStorage.removeItem('paynest_token');
    sessionStorage.removeItem('paynest_token');
    setIsAuthenticated(false);
    setIsAdminAuth(false);
    window.location.href = '/login';
  };

  return (
    <AppContext.Provider value={{
      worker, setWorker,
      claims, setClaims, addClaim,
      isDemo, setIsDemo,
      isAdminAuth, setIsAdminAuth,
      isAuthenticated, setIsAuthenticated,
      activeClaimJourney, setActiveClaimJourney,
      startClaimJourney, triggerClaim,
      weatherData, setWeatherData,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};
