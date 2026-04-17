import config from '../config.js';

// Stub out real axios calls for prod
export const realGetDashboardData = async (workerId) => {
  // const res = await axios.get(`${config.API_URL}/workers/${workerId}/dashboard`);
  // return res.data;
  console.log("Real mode: getDashboardData for", workerId);
  return null;
};

export const realPurchasePolicy = async (workerId, tier) => {
  // const res = await axios.post(`${config.API_URL}/policies/purchase`, { workerId, tier });
  // return res.data;
  console.log("Real mode: purchasePolicy for", workerId, tier);
  return null;
};

export const realGetClaimsHistory = async (workerId) => {
  // const res = await axios.get(`${config.API_URL}/claims/${workerId}`);
  // return res.data;
  console.log("Real mode: getClaimsHistory for", workerId);
  return [];
};

export const realTriggerManualClaim = async (workerId, triggerType) => {
  // const res = await axios.post(`${config.API_URL}/claims/manual-trigger`, { workerId, triggerType });
  // return res.data;
  console.log("Real mode: triggerManualClaim for", workerId, triggerType);
  return null;
};

export const realSendAuthOtp = async (phone) => {
  // const res = await axios.post(`${config.API_URL}/auth/send-otp`, { phone });
  // return res.data;
  console.log("Real mode: sendAuthOtp for", phone);
  return null;
};

export const realVerifyAuthOtp = async (phone, otp) => {
  // const res = await axios.post(`${config.API_URL}/auth/verify-otp`, { phone, otp });
  // return res.data;
  console.log("Real mode: verifyAuthOtp for", phone, otp);
  return null;
};
