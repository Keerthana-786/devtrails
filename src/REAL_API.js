/**
 * REAL API CALLS — Only used when config.IS_DEMO = false
 * Never call these in demo mode
 */

import config from './config.js';

const BASE_URL = config.API_URL;

// Real authentication APIs
export const realAuthAPI = {
  sendOTP: async (phone) => {
    const response = await fetch(`${BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    return response.json();
  },

  verifyOTP: async (phone, otp) => {
    const response = await fetch(`${BASE_URL}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp })
    });
    return response.json();
  }
};

// Real dashboard APIs
export const realDashboardAPI = {
  getDashboardData: async (workerId, token) => {
    const response = await fetch(`${BASE_URL}/workers/${workerId}/dashboard`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Failed to fetch dashboard data');
    return response.json();
  }
};

// Real claims APIs
export const realClaimsAPI = {
  getClaimsHistory: async (workerId, token) => {
    const response = await fetch(`${BASE_URL}/claims/${workerId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Failed to fetch claims history');
    return response.json();
  },

  triggerManualClaim: async (workerId, triggerType, token) => {
    const response = await fetch(`${BASE_URL}/claims/manual-trigger`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ workerId, triggerType })
    });
    if (!response.ok) throw new Error('Failed to trigger claim');
    return response.json();
  }
};

// Real policy APIs
export const realPolicyAPI = {
  purchasePolicy: async (workerId, tier, token) => {
    const response = await fetch(`${BASE_URL}/policies/purchase`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ workerId, tier })
    });
    if (!response.ok) throw new Error('Failed to purchase policy');
    return response.json();
  }
};