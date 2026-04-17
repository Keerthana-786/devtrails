import config from '../config.js';

export const DEMO_WORKER_DATA = config.DEMO_WORKER;

export const DEMO_POLICY_RESPONSE = {
  policy_id: "POL-DEMO-" + Math.floor(1000 + Math.random() * 9000),
  valid_until: "18 Apr 2026",
  status: "ACTIVE"
};

export const DEMO_CLAIMS_ARRAY = [
  { id: 'CLM-2026-4818', date: '8/4/2026, 14:00', trigger: 'Heavy Rain', zone: 'Anna Nagar', amount: 480, status: 'SETTLED', fraudScore: 0, transactionId: 'pay_Demo_X8K1023', verdict: 'AUTO APPROVED' },
  { id: 'CLM-2026-4801', date: '3/4/2026, 15:30', trigger: 'Extreme Heat', zone: 'T Nagar', amount: 350, status: 'SETTLED', fraudScore: 0, transactionId: 'pay_Demo_M1U2209', verdict: 'AUTO APPROVED' },
  { id: 'CLM-2026-4799', date: '1/4/2026, 10:15', trigger: 'Severe AQI', zone: 'Adyar', amount: 300, status: 'SETTLED', fraudScore: 0, transactionId: 'pay_Demo_P4Q1198', verdict: 'AUTO APPROVED' },
  { id: 'CLM-2026-4756', date: '28/3/2026, 09:40', trigger: 'Heavy Rain', zone: 'Velachery', amount: 0, status: 'BLOCKED', fraudScore: 85, transactionId: 'N/A', verdict: 'REJECTED' }
];

export const simulateDemoClaim = (triggerType) => {
  return {
    success: true,
    claimId: "CLM-DEMO-" + Math.floor(1000 + Math.random() * 9000),
    amount: triggerType === 'HEAVY_RAIN' ? 480 : 350,
    status: 'SETTLED'
  };
};
