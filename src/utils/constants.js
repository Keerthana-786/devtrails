export const PLANS = {
  basic: {
    name: 'Basic',
    premium: 50,
    maxPayout: 500,
    color: '#3AB757',
    triggers: ['Rainfall >60mm', 'Heatwave >45°C']
  },
  premium: {
    name: 'Premium',
    premium: 80,
    maxPayout: 800,
    color: '#1A73E8',
    triggers: ['Rainfall >60mm', 'Heatwave >45°C', 'Pollution >300 AQI', 'Traffic disruption']
  },
  enterprise: {
    name: 'Enterprise',
    premium: 120,
    maxPayout: 1200,
    color: '#E23744',
    triggers: ['Rainfall >60mm', 'Heatwave >45°C', 'Pollution >300 AQI', 'Traffic disruption', 'Power outage', 'Network issues']
  }
}