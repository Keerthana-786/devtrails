/**
 * REAL API CALLS — Only used when config.IS_DEMO = false
 */

import config from './config.js';

const BASE_URL = config.API_URL;

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token ? { 'Authorization': `Bearer ${token}` } : {})
});

export const realAuthAPI = {
  // Initiates OTP for phone
  sendOTP: async (phone) => {
    const response = await fetch(`${BASE_URL}/auth/otp`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ phone })
    });
    return response.json();
  },

  // Verifies OTP and returns token + user
  verifyOTP: async (phone, otp) => {
    const response = await fetch(`${BASE_URL}/auth/verify`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ phone, otp })
    });
    return response.json();
  },

  // Completes worker profile
  onboard: async (onboardingData, token) => {
    const response = await fetch(`${BASE_URL}/auth/onboard`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(onboardingData)
    });
    return response.json();
  }
};

export const realDashboardAPI = {
  // Combined call for user data, weather, stats and logs
  getDashboard: async (token) => {
    const response = await fetch(`${BASE_URL}/dashboard`, {
      headers: getHeaders(token)
    });
    if (!response.ok) throw new Error('Failed to fetch dashboard');
    return response.json();
  },

  getAdminMetrics: async (token) => {
    const response = await fetch(`${BASE_URL}/admin/metrics`, {
      headers: getHeaders(token)
    });
    return response.json();
  }
};

export const realClaimsAPI = {
  getPayouts: async (token) => {
    const response = await fetch(`${BASE_URL}/payouts`, {
      headers: getHeaders(token)
    });
    return response.json();
  },

  createPayout: async (payoutData, token) => {
    const response = await fetch(`${BASE_URL}/payouts/create`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ payout: payoutData })
    });
    return response.json();
  }
};

export const realAIAPI = {
  chat: async (message, context, token) => {
    const response = await fetch(`${BASE_URL}/chatbot`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ message, context })
    });
    return response.json();
  },

  ocr: async (base64Data, filename, token) => {
    const response = await fetch(`${BASE_URL}/aadhaar-ocr`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ 
        base64Data, 
        fileName: filename, 
        mimeType: 'image/jpeg' 
      })
    });
    return response.json();
  }
};