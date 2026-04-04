import axios from 'axios'

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('paynest_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// API Endpoints
export const api = {
  // Auth
  auth: {
    sendOtp: (phone) => apiClient.post('/api/auth/otp', { phone }),
    verifyOtp: (phone, otp) => apiClient.post('/api/auth/verify', { phone, otp }),
    onboard: (data) => apiClient.post('/api/auth/onboard', data),
  },

  // Dashboard
  dashboard: {
    get: () => apiClient.get('/api/dashboard'),
  },

  // Payouts
  payouts: {
    check: (rainfall, aqi, temperature) =>
      apiClient.post('/api/payout/check', { rainfall, aqi, temperature }),
    process: (amount, trigger) =>
      apiClient.post('/api/payout/process', { amount, trigger }),
    list: () => apiClient.get('/api/payouts'),
  },

  // Loans
  loans: {
    check: () => apiClient.post('/api/loan/check', {}),
    apply: (amount, reason, emiMonths) =>
      apiClient.post('/api/loan/apply', { amount, reason, emiMonths }),
  },

  // Weather
  weather: {
    getByCity: (city) => apiClient.get(`/api/weather/${city}`),
  },

  // ML Predictions (proxy through backend)
  ml: {
    predictRisk: (data) => apiClient.post('/api/ml/risk', data),
    predictFraud: (data) => apiClient.post('/api/ml/fraud', data),
    predictLoss: (data) => apiClient.post('/api/ml/loss', data),
    predictLoan: (data) => apiClient.post('/api/ml/loan', data),
    predictZone: (data) => apiClient.post('/api/ml/zone', data),
    predictDynamicPricing: (data) => apiClient.post('/api/ml/dynamic-pricing', data),
  },

  // Claims
  claims: {
    list: () => apiClient.get('/api/claims'),
    create: (type, description, amount) =>
      apiClient.post('/api/claims', { type, description, amount }),
  },
}

export default apiClient
