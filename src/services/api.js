import config from '../config.js';
import { 
  DEMO_WORKER_DATA, 
  DEMO_POLICY_RESPONSE, 
  DEMO_CLAIMS_ARRAY, 
  simulateDemoClaim 
} from './DEMO_DATA.js';
import { 
  realGetDashboardData, 
  realPurchasePolicy, 
  realGetClaimsHistory, 
  realTriggerManualClaim, 
  realSendAuthOtp, 
  realVerifyAuthOtp 
} from './REAL_API.js';

export const getDashboardData = async (workerId) => {
  if (config.IS_DEMO) return DEMO_WORKER_DATA;
  return await realGetDashboardData(workerId);
};

export const purchasePolicy = async (workerId, tier) => {
  if (config.IS_DEMO) return DEMO_POLICY_RESPONSE;
  return await realPurchasePolicy(workerId, tier);
};

export const getClaimsHistory = async (workerId) => {
  if (config.IS_DEMO) return DEMO_CLAIMS_ARRAY;
  return await realGetClaimsHistory(workerId);
};

export const triggerManualClaim = async (workerId, triggerType) => {
  if (config.IS_DEMO) return simulateDemoClaim(triggerType);
  return await realTriggerManualClaim(workerId, triggerType);
};

export const sendAuthOtp = async (phone) => {
  if (config.IS_DEMO) return { success: true, fake_otp: '123456' };
  return await realSendAuthOtp(phone);
};

export const verifyAuthOtp = async (phone, otp) => {
  if (config.IS_DEMO) return { success: true, token: 'demo-token', user: DEMO_WORKER_DATA };
  return await realVerifyAuthOtp(phone, otp);
};