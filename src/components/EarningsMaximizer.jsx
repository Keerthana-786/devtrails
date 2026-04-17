import React, { useState } from 'react';

/**
 * FIX 3 – ACCURATE EARNINGS MAXIMIZER FORMULA
 * 
 * Calculates potential earnings with 5 multipliers:
 * 1. Base Payout: ₹(100 + insurancePayout × 5)
 * 2. Location Bonus: +20% if high-demand zone (Bandra, Virar, Andheri)
 * 3. Early Bird Multiplier: +25% if claimed 6-8 AM
 * 4. Quantity Bonus: +10% per order (max +30% for 3 orders)
 * 5. Risk Multiplier: ×2 if disruption severity ≥ 7
 * 
 * Examples:
 * - Conservative: ₹500 insurance → ₹2,600 base → ~₹3,120 with bonuses
 * - Aggressive: ₹500 + high risk + early + orders → ₹5,200-₹6,500
 */

function calculateEarnings(claim, nearbyOrders = []) {
  if (!claim) return { basePayout: 0, breakdown: {} };
  
  const insurancePayout = claim.amount || 500;
  const claimTime = new Date(claim.createdAt);
  const claimHour = claimTime.getHours();
  
  // 1. BASE PAYOUT: ₹(100 + insurancePayout × 5)
  const basePayout = 100 + (insurancePayout * 5);
  
  let totalEarnings = basePayout;
  const breakdown = {
    basePayout: { value: basePayout, label: '₹(100 + insurance × 5)' }
  };
  
  // 2. LOCATION BONUS: +20% if high-demand zone
  const highDemandZones = ['Bandra', 'Virar', 'Andheri'];
  const location = claim.location || claim.pincode || '';
  const isHighDemand = highDemandZones.some(zone => location.includes(zone));
  const locationBonus = isHighDemand ? basePayout * 0.20 : 0;
  totalEarnings += locationBonus;
  breakdown.locationBonus = { value: locationBonus, label: isHighDemand ? 'High-demand zone +20%' : 'Regular zone' };
  
  // 3. EARLY BIRD MULTIPLIER: +25% if claimed 6-8 AM
  const isEarlyBird = claimHour >= 6 && claimHour < 8;
  const earlyBirdBonus = isEarlyBird ? basePayout * 0.25 : 0;
  totalEarnings += earlyBirdBonus;
  breakdown.earlyBirdBonus = { value: earlyBirdBonus, label: isEarlyBird ? 'Early bird (6-8 AM) +25%' : 'Regular hours' };
  
  // 4. QUANTITY BONUS: +10% per order (max +30% for 3)
  const orderCount = Math.min(nearbyOrders.length, 3);
  const quantityBonus = basePayout * (0.10 * orderCount);
  totalEarnings += quantityBonus;
  breakdown.quantityBonus = { value: quantityBonus, label: `${orderCount} nearby orders +${10 * orderCount}%` };
  
  // 5. RISK MULTIPLIER: ×2 if disruption severity ≥ 7
  const severity = claim.severity || 5;
  const riskMultiplier = severity >= 7 ? 2 : 1;
  const riskBonus = totalEarnings * (riskMultiplier - 1);
  totalEarnings = totalEarnings * riskMultiplier;
  breakdown.riskMultiplier = { value: riskBonus, label: severity >= 7 ? `Severe disruption (${severity}/10) ×2` : `Moderate disruption (${severity}/10)` };
  
  // Opportunity cost
  const opportunityCost = totalEarnings - insurancePayout;
  
  return {
    basePayout,
    locationBonus,
    earlyBirdBonus,
    quantityBonus,
    riskMultiplier,
    riskBonus,
    totalEarnings: Math.round(totalEarnings),
    opportunityCost: Math.round(opportunityCost),
    breakdown,
    metadata: {
      isHighDemand,
      isEarlyBird,
      orderCount,
      severity,
      claimTime: claimTime.toLocaleString()
    }
  };
}

export function EarningsMaximizer({ latestPayout, nearbyOrders = [], onNavigateMap }) {
  const [isNavigating, setIsNavigating] = useState(false);
  
  if (!latestPayout || !latestPayout.amount) return null;
  
  const earnings = calculateEarnings(latestPayout, nearbyOrders);
  const insurancePayout = latestPayout.amount;
  
  const handleNavigate = () => {
    setIsNavigating(true);
    if (onNavigateMap) {
      onNavigateMap();
    }
    setTimeout(() => setIsNavigating(false), 1500);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.05) 100%)',
      border: '1px solid rgba(16,185,129,0.3)',
      borderRadius: '20px',
      padding: '24px',
      marginTop: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Accent glow */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-40px', width: '120px', height: '120px',
        background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
          <span style={{ fontSize: '24px' }}>💡</span>
          <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
            Maximize your earnings — insurance + orders
          </h3>
        </div>

        {/* Earnings Breakdown Box */}
        <div style={{
          background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(16,185,129,0.2)',
          borderRadius: '14px', padding: '16px', marginBottom: '16px', fontSize: '14px', color: '#CBD5E1'
        }}>
          {/* Insurance Payout */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Insurance payout:</span>
            <span style={{ fontWeight: '700', color: '#10b981' }}>₹{insurancePayout}</span>
          </div>
          
          {/* Base Calculation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Base earnings (100 + × 5):</span>
            <span style={{ fontWeight: '700', color: '#3b82f6' }}>₹{earnings.basePayout}</span>
          </div>
          
          {/* Bonuses */}
          {earnings.locationBonus > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>↳ High-demand zone +20%:</span>
              <span style={{ fontWeight: '700', color: '#10b981' }}>+₹{Math.round(earnings.locationBonus)}</span>
            </div>
          )}
          
          {earnings.earlyBirdBonus > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>↳ Early bird (6-8 AM) +25%:</span>
              <span style={{ fontWeight: '700', color: '#10b981' }}>+₹{Math.round(earnings.earlyBirdBonus)}</span>
            </div>
          )}
          
          {earnings.quantityBonus > 0 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>↳ {earnings.metadata.orderCount} nearby orders +{10 * earnings.metadata.orderCount}%:</span>
              <span style={{ fontWeight: '700', color: '#10b981' }}>+₹{Math.round(earnings.quantityBonus)}</span>
            </div>
          )}
          
          {earnings.riskMultiplier > 1 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>↳ Severe disruption ×{earnings.riskMultiplier}:</span>
              <span style={{ fontWeight: '700', color: '#f59e0b' }}>+₹{Math.round(earnings.riskBonus)}</span>
            </div>
          )}
          
          {/* Total */}
          <div style={{
            borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '10px',
            display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: '700'
          }}>
            <span>Total possible today:</span>
            <span style={{ color: '#f59e0b', fontSize: '17px' }}>₹{earnings.totalEarnings} 🎯</span>
          </div>
          
          {/* Opportunity Cost */}
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#94A3B8' }}>
            <span>vs insurance alone:</span>
            <span>₹{insurancePayout}</span>
          </div>
          
          {/* Extra Earnings */}
          <div style={{
            marginTop: '8px', paddingTop: '10px', borderTop: '1px dashed rgba(255,255,255,0.1)',
            display: 'flex', justifyContent: 'space-between', fontSize: '14px', fontWeight: '700'
          }}>
            <span>Extra you can earn:</span>
            <span style={{ color: '#10b981' }}>+₹{earnings.opportunityCost}</span>
          </div>
        </div>

        {/* Sub-info */}
        <p style={{ fontSize: '12px', color: '#64748B', margin: '12px 0', lineHeight: '1.4' }}>
          <strong>{earnings.metadata.orderCount} orders waiting nearby</strong> — Formula: ₹100 + (insurance × 5) + bonuses × risk multiplier
        </p>

        {/* Navigate Button */}
        <button onClick={handleNavigate} disabled={isNavigating} style={{
          width: '100%', padding: '14px', background: isNavigating
            ? 'rgba(16,185,129,0.5)' : 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          color: '#000', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '13px',
          cursor: isNavigating ? 'default' : 'pointer',
          transition: 'all 0.3s ease', boxShadow: '0 4px 12px rgba(16,185,129,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          opacity: isNavigating ? 0.8 : 1
        }}>
          <span>{isNavigating ? '🗺️ Loading map...' : '📍 Navigate to Orders'}</span>
        </button>
      </div>
    </div>
  );
}
