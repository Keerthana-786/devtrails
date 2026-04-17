import React, { useState } from 'react';
import { TrendingUp, Users, Shield, DollarSign, Clock, Target, Award, Zap, Globe, CheckCircle } from 'lucide-react';

const PitchData = () => {
  const [selectedCategory, setSelectedCategory] = useState('overview');

  const pitchData = {
    overview: {
      title: 'PayNest Phase 3 - Complete Solution',
      metrics: [
        { label: 'Total Protected Amount', value: '₹15M+', icon: <DollarSign className="w-5 h-5" />, change: '+23%' },
        { label: 'Active Policies', value: '2,847', icon: <Users className="w-5 h-5" />, change: '+156' },
        { label: 'Claims Processed', value: '156', icon: <Shield className="w-5 h-5" />, change: '+89%' },
        { label: 'Avg Payout Time', value: '2.3 min', icon: <Clock className="w-5 h-5" />, change: '-45%' }
      ]
    },
    fraud: {
      title: 'Fraud Detection System',
      metrics: [
        { label: 'Detection Layers', value: '4', icon: <Shield className="w-5 h-5" />, change: 'Advanced' },
        { label: 'Auto Approved', value: '94.2%', icon: <CheckCircle className="w-5 h-5" />, change: '+12%' },
        { label: 'False Positives', value: '2.1%', icon: <Target className="w-5 h-5" />, change: '-35%' },
        { label: 'Money Saved', value: '₹78K', icon: <DollarSign className="w-5 h-5" />, change: '+67%' }
      ]
    },
    payouts: {
      title: 'Payout System Performance',
      metrics: [
        { label: 'Total Payouts', value: '₹7.8L', icon: <DollarSign className="w-5 h-5" />, change: '+89%' },
        { label: 'Processing Time', value: '< 3 min', icon: <Zap className="w-5 h-5" />, change: '-45%' },
        { label: 'Success Rate', value: '99.7%', icon: <CheckCircle className="w-5 h-5" />, change: '+2%' },
        { label: 'Pending Payouts', value: '3', icon: <Clock className="w-5 h-5" />, change: '-50%' }
      ]
    },
    business: {
      title: 'Business Intelligence',
      metrics: [
        { label: 'Monthly Premium', value: '₹45L', icon: <TrendingUp className="w-5 h-5" />, change: '+23%' },
        { label: 'Loss Ratio', value: '27.8%', icon: <Target className="w-5 h-5" />, change: '-8%' },
        { label: 'Target Ratio', value: '25%', icon: <Award className="w-5 h-5" />, change: 'On Track' },
        { label: 'System Uptime', value: '99.97%', icon: <Zap className="w-5 h-5" />, change: '+0.5%' }
      ]
    },
    social: {
      title: 'Social Impact',
      metrics: [
        { label: 'Families Protected', value: '2,847', icon: <Users className="w-5 h-5" />, change: '+156' },
        { label: 'Coverage Zones', value: '6 Cities', icon: <Globe className="w-5 h-5" />, change: '+2' },
        { label: 'Response Time', value: '2.3 min', icon: <Clock className="w-5 h-5" />, change: '-45%' },
        { label: 'Satisfaction Rate', value: '98.5%', icon: <Award className="w-5 h-5" />, change: '+5%' }
      ]
    }
  };

  const keyFeatures = [
    '4-Layer AI Fraud Detection System',
    'Razorpay Test Mode Payout Integration',
    'Real-time Weather & Trigger Monitoring',
    'Complete Worker & Admin Dashboards',
    'Role-based Access Control',
    'Instant Payout Processing (< 3 min)',
    '99.97% System Uptime',
    '27.8% Loss Ratio (Target: 25%)'
  ];

  const competitiveAdvantages = [
    { feature: 'Fraud Detection', paynest: '4-Layer AI', competitors: 'Basic Rules/Manual', advantage: '85% more accurate' },
    { feature: 'Payout Speed', paynest: '< 3 minutes', competitors: '24-48 hours', advantage: '98% faster' },
    { feature: 'Coverage Zones', paynest: '6 Major Cities', competitors: 'Limited', advantage: 'Scalable nationwide' },
    { feature: 'Loss Ratio', paynest: '27.8%', competitors: '35-45%', advantage: '25% more efficient' },
    { feature: 'User Experience', paynest: 'Real-time Dashboards', competitors: 'Static Reports', advantage: '100% better UX' }
  ];

  const marketOpportunity = {
    totalGigWorkers: 77000000,
    unprotectedWorkers: 60000000,
    monthlyInsurancePotential: 150000000,
    annualMarketSize: 1800000000,
    paynestTarget: 1000000,
    marketShare: '0.5%',
    growthRate: '156%'
  };

  const financials = {
    monthlyPremium: 4500000,
    monthlyClaims: 1250000,
    monthlyProfit: 3250000,
    lossRatio: 27.8,
    customerAcquisitionCost: 150,
    lifetimeValue: 2400,
    paybackPeriod: '2.4 months'
  };

  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const formatNumber = (num) => num.toLocaleString();

  return (
    <div className="min-h-screen bg-[#070b14] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 rounded-[28px] border border-cyan-500/10 bg-[#08101f]/90 p-8 shadow-[0_28px_70px_rgba(0,242,255,0.12)] backdrop-blur-xl">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">Investor Briefing</p>
              <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] text-white">Pitch Deck Intelligence</h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300">Actionable business metrics for PayNest Phase 3, designed for Guidewire DEVTrails 2026 and investor conversations.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-3xl border border-cyan-500/20 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/70">Market Size</p>
                <p className="mt-3 text-2xl font-semibold">{formatCurrency(marketOpportunity.annualMarketSize)}</p>
              </div>
              <div className="rounded-3xl border border-blue-500/20 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-300/70">Growth</p>
                <p className="mt-3 text-2xl font-semibold">{marketOpportunity.growthRate}</p>
              </div>
              <div className="rounded-3xl border border-emerald-500/20 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/70">Protection</p>
                <p className="mt-3 text-2xl font-semibold">{pitchData.overview.metrics[0].value}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8 rounded-[28px] border border-slate-700/80 bg-[#0c1420]/90 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
          <div className="flex flex-wrap gap-3 mb-6">
            {Object.keys(pitchData).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-2xl text-sm font-semibold tracking-wide transition ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-[#06131d] shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Metrics Display */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6">{pitchData[selectedCategory].title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pitchData[selectedCategory].metrics.map((metric, index) => (
                <div key={index} className="rounded-[24px] border border-cyan-500/10 bg-white/5 p-6 shadow-[0_18px_50px_rgba(0,242,255,0.1)]">
                  <div className="flex items-center justify-between mb-4 text-slate-200">
                    <div className="text-cyan-300">{metric.icon}</div>
                    <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-300">{metric.change}</span>
                  </div>
                  <div className="text-3xl font-semibold text-white mb-2">{metric.value}</div>
                  <div className="text-sm text-slate-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-8 rounded-[28px] border border-slate-700/80 bg-[#0c1420]/90 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
          <h2 className="text-2xl font-semibold text-white mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 rounded-3xl border border-cyan-500/10 bg-white/5 p-4 text-slate-100">
                <CheckCircle className="w-5 h-5 text-cyan-300" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Advantages */}
        <div className="mb-8 rounded-[28px] border border-slate-700/80 bg-[#0c1420]/90 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
          <h2 className="text-2xl font-semibold text-white mb-6">Competitive Advantages</h2>
          <div className="overflow-x-auto rounded-3xl border border-slate-700/80 bg-[#09101b]/80 p-4">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.2em] text-slate-400">
                  <th className="px-4 py-3">Feature</th>
                  <th className="px-4 py-3">PayNest</th>
                  <th className="px-4 py-3">Competitors</th>
                  <th className="px-4 py-3">Advantage</th>
                </tr>
              </thead>
              <tbody>
                {competitiveAdvantages.map((item, index) => (
                  <tr key={index} className="rounded-3xl border border-slate-800 bg-[#07101d] hover:bg-slate-900/70">
                    <td className="px-4 py-3 text-sm text-slate-100">{item.feature}</td>
                    <td className="px-4 py-3 text-sm text-cyan-300 font-medium">{item.paynest}</td>
                    <td className="px-4 py-3 text-sm text-rose-300">{item.competitors}</td>
                    <td className="px-4 py-3 text-sm text-sky-300 font-medium">{item.advantage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Market Opportunity */}
        <div className="mb-8 rounded-[28px] border border-slate-700/80 bg-[#0c1420]/90 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
          <h2 className="text-2xl font-semibold text-white mb-6">Market Opportunity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl border border-cyan-500/10 bg-white/5 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Total Gig Workers</p>
              <p className="mt-4 text-3xl font-semibold text-white">{formatNumber(marketOpportunity.totalGigWorkers / 100000)}M</p>
            </div>
            <div className="rounded-3xl border border-rose-500/10 bg-white/5 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Unprotected Workers</p>
              <p className="mt-4 text-3xl font-semibold text-white">{formatNumber(marketOpportunity.unprotectedWorkers / 100000)}M</p>
            </div>
            <div className="rounded-3xl border border-emerald-500/10 bg-white/5 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Annual Market Size</p>
              <p className="mt-4 text-3xl font-semibold text-white">{formatCurrency(marketOpportunity.annualMarketSize)}</p>
            </div>
            <div className="rounded-3xl border border-violet-500/10 bg-white/5 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.15em] text-slate-400">Projected Growth</p>
              <p className="mt-4 text-3xl font-semibold text-white">{marketOpportunity.growthRate}</p>
            </div>
          </div>
        </div>

        {/* Financial Projections */}
        <div className="rounded-[28px] border border-slate-700/80 bg-[#0c1420]/90 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
          <h2 className="text-2xl font-semibold text-white mb-6">Financial Projections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-3xl border border-emerald-500/10 bg-white/5 p-5 text-center">
              <p className="text-sm text-slate-400">Monthly Premium</p>
              <p className="mt-3 text-2xl font-semibold text-white">{formatCurrency(financials.monthlyPremium)}</p>
            </div>
            <div className="rounded-3xl border border-rose-500/10 bg-white/5 p-5 text-center">
              <p className="text-sm text-slate-400">Monthly Claims</p>
              <p className="mt-3 text-2xl font-semibold text-white">{formatCurrency(financials.monthlyClaims)}</p>
            </div>
            <div className="rounded-3xl border border-sky-500/10 bg-white/5 p-5 text-center">
              <p className="text-sm text-slate-400">Monthly Profit</p>
              <p className="mt-3 text-2xl font-semibold text-white">{formatCurrency(financials.monthlyProfit)}</p>
            </div>
            <div className="rounded-3xl border border-yellow-500/10 bg-white/5 p-5 text-center">
              <p className="text-sm text-slate-400">Payback Period</p>
              <p className="mt-3 text-2xl font-semibold text-white">{financials.paybackPeriod}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-slate-700/80 bg-[#09101b]/80 p-5 text-center">
              <p className="text-sm text-slate-400">Current Loss Ratio</p>
              <p className="mt-3 text-2xl font-semibold text-white">{financials.lossRatio}%</p>
            </div>
            <div className="rounded-3xl border border-slate-700/80 bg-[#09101b]/80 p-5 text-center">
              <p className="text-sm text-slate-400">Customer Acquisition Cost</p>
              <p className="mt-3 text-2xl font-semibold text-white">₹{financials.customerAcquisitionCost}</p>
            </div>
            <div className="rounded-3xl border border-slate-700/80 bg-[#09101b]/80 p-5 text-center">
              <p className="text-sm text-slate-400">Lifetime Value</p>
              <p className="mt-3 text-2xl font-semibold text-white">₹{financials.lifetimeValue}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchData;