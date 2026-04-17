import React, { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';

/**
 * FIX 2 – COMPREHENSIVE 4-LAYER FRAUD DETECTION PIPELINE
 * 
 * Calculates accurate fraud scores 0-100 for every claim:
 * - Layer 1 (GPS Match): +35 if mismatch
 * - Layer 2 (Frequency): +25 if >3 claims in 7 days
 * - Layer 3 (Duplicate): +40 if same trigger on same date
 * - Layer 4 (New Account): +20 if account <14 days old & claiming
 */

function calculateFraudScore(claim, worker, allClaims) {
  let fraudScore = 0;
  const breakdown = {};

  // LAYER 1: GPS Location Match
  breakdown.gpsMatch = { status: 'PASS', score: 0 };
  if (claim.pincode !== worker.pincode && worker.lastKnownPincode && claim.pincode !== worker.lastKnownPincode) {
    breakdown.gpsMatch = { status: 'FAIL', score: 35, detail: `Location mismatch: Claim from ${claim.pincode} vs worker ${worker.lastKnownPincode}` };
    fraudScore += 35;
  } else {
    breakdown.gpsMatch = { status: 'PASS', score: 0, detail: 'GPS location verified' };
  }

  // LAYER 2: Claim Frequency Check
  breakdown.frequency = { status: 'PASS', score: 0 };
  const last7DaysClaims = (allClaims || []).filter(c => {
    const claimDate = new Date(c.createdAt);
    const now = new Date();
    const daysOld = (now - claimDate) / (1000 * 60 * 60 * 24);
    return daysOld <= 7;
  }).length;
  
  if (last7DaysClaims > 3) {
    breakdown.frequency = { status: 'WARN', score: 25, detail: `${last7DaysClaims} claims in 7 days (threshold: 3)` };
    fraudScore += 25;
  } else {
    breakdown.frequency = { status: 'PASS', score: 0, detail: `${last7DaysClaims} claims in last 7 days` };
  }

  // LAYER 3: Duplicate Event Check
  breakdown.duplicate = { status: 'PASS', score: 0 };
  const claimDate = new Date(claim.createdAt).toDateString();
  const duplicateExists = (allClaims || []).some(c => 
    c.triggerType === claim.triggerType && 
    new Date(c.createdAt).toDateString() === claimDate && 
    c.id !== claim.id
  );
  
  if (duplicateExists) {
    breakdown.duplicate = { status: 'FAIL', score: 40, detail: `Duplicate ${claim.triggerType} claim on ${claimDate}` };
    fraudScore += 40;
  } else {
    breakdown.duplicate = { status: 'PASS', score: 0, detail: 'No duplicate events detected' };
  }

  // LAYER 4: Historical Pattern - New Account Risk
  breakdown.newAccount = { status: 'PASS', score: 0 };
  const accountAgeMs = new Date() - new Date(worker.createdAt || Date.now());
  const accountAgeDays = accountAgeMs / (1000 * 60 * 60 * 24);
  
  if (accountAgeDays < 14 && last7DaysClaims > 0) {
    breakdown.newAccount = { status: 'WARN', score: 20, detail: `New account (${Math.round(accountAgeDays)} days old) already claiming` };
    fraudScore += 20;
  } else {
    breakdown.newAccount = { status: 'PASS', score: 0, detail: `Account age: ${Math.round(accountAgeDays)} days` };
  }

  return { fraudScore: Math.min(fraudScore, 100), breakdown };
}

function FraudScoreCard({ claim, worker, allClaims }) {
  const { fraudScore, breakdown } = calculateFraudScore(claim, worker, allClaims);

  // Color-code based on score
  let statusColor, statusLabel, statusDesc;
  if (fraudScore <= 30) {
    statusColor = '#10B981';
    statusLabel = 'AUTO APPROVED';
    statusDesc = 'Low risk - claim automatically approved';
  } else if (fraudScore <= 60) {
    statusColor = '#F59E0B';
    statusLabel = 'MANUAL REVIEW';
    statusDesc = 'Medium risk - requires human review';
  } else {
    statusColor = '#EF4444';
    statusLabel = 'AUTO REJECTED';
    statusDesc = 'High fraud probability - claim blocked';
  }

  return (
    <div style={{
      background: 'rgba(22,28,36,0.8)',
      border: `2px solid ${statusColor}`,
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: `1px dashed ${statusColor}`, paddingBottom: '12px' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#94A3B8' }}>Claim #{claim.id.substring(0, 10)}</div>
          <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{new Date(claim.createdAt).toLocaleString()}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '28px', fontWeight: '900', color: statusColor }}>{fraudScore}/100</div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: statusColor, marginTop: '4px' }}>{statusLabel}</div>
        </div>
      </div>

      {/* Fraud Score Bar */}
      <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '8px', height: '8px', marginBottom: '20px', overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${fraudScore}%`,
          background: `linear-gradient(90deg, #10B981 0%, #F59E0B 50%, #EF4444 100%)`,
          transition: 'width 0.5s ease'
        }} />
      </div>

      {/* 4-Layer Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
        {/* Layer 1: GPS */}
        <div style={{
          background: 'rgba(0,0,0,0.2)',
          border: `1px solid ${breakdown.gpsMatch.status === 'PASS' ? '#10B981' : breakdown.gpsMatch.status === 'WARN' ? '#F59E0B' : '#EF4444'}`,
          borderRadius: '8px',
          padding: '12px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>
            Layer 1 — GPS Location Match
            <span style={{
              marginLeft: '8px',
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '4px',
              background: breakdown.gpsMatch.status === 'PASS' ? 'rgba(16,185,129,0.2)' : breakdown.gpsMatch.status === 'WARN' ? 'rgba(245,158,11,0.2)' : 'rgba(239,68,68,0.2)',
              color: breakdown.gpsMatch.status === 'PASS' ? '#10B981' : breakdown.gpsMatch.status === 'WARN' ? '#F59E0B' : '#EF4444'
            }}>
              {breakdown.gpsMatch.status}
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '6px' }}>{breakdown.gpsMatch.detail}</div>
          <div style={{fontSize: '13px', fontWeight: '700', color: breakdown.gpsMatch.status === 'PASS' ? '#10B981' : '#EF4444' }}>
            +{breakdown.gpsMatch.score} points
          </div>
        </div>

        {/* Layer 2: Frequency */}
        <div style={{
          background: 'rgba(0,0,0,0.2)',
          border: `1px solid ${breakdown.frequency.status === 'PASS' ? '#10B981' : breakdown.frequency.status === 'WARN' ? '#F59E0B' : '#EF4444'}`,
          borderRadius: '8px',
          padding: '12px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>
            Layer 2 — Claim Frequency
            <span style={{
              marginLeft: '8px',
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '4px',
              background: breakdown.frequency.status === 'PASS' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)',
              color: breakdown.frequency.status === 'PASS' ? '#10B981' : '#F59E0B'
            }}>
              {breakdown.frequency.status}
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '6px' }}>{breakdown.frequency.detail}</div>
          <div style={{fontSize: '13px', fontWeight: '700', color: breakdown.frequency.status === 'PASS' ? '#10B981' : '#F59E0B'}}>
            +{breakdown.frequency.score} points
          </div>
        </div>

        {/* Layer 3: Duplicate */}
        <div style={{
          background: 'rgba(0,0,0,0.2)',
          border: `1px solid ${breakdown.duplicate.status === 'PASS' ? '#10B981' : '#EF4444'}`,
          borderRadius: '8px',
          padding: '12px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>
            Layer 3 — Duplicate Event Check
            <span style={{
              marginLeft: '8px',
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '4px',
              background: breakdown.duplicate.status === 'PASS' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
              color: breakdown.duplicate.status === 'PASS' ? '#10B981' : '#EF4444'
            }}>
              {breakdown.duplicate.status}
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '6px' }}>{breakdown.duplicate.detail}</div>
          <div style={{fontSize: '13px', fontWeight: '700', color: breakdown.duplicate.status === 'PASS' ? '#10B981' : '#EF4444'}}>
            +{breakdown.duplicate.score} points
          </div>
        </div>

        {/* Layer 4: New Account */}
        <div style={{
          background: 'rgba(0,0,0,0.2)',
          border: `1px solid ${breakdown.newAccount.status === 'PASS' ? '#10B981' : '#F59E0B'}`,
          borderRadius: '8px',
          padding: '12px'
        }}>
          <div style={{ fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>
            Layer 4 — Account Pattern Analysis
            <span style={{
              marginLeft: '8px',
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '4px',
              background: breakdown.newAccount.status === 'PASS' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)',
              color: breakdown.newAccount.status === 'PASS' ? '#10B981' : '#F59E0B'
            }}>
              {breakdown.newAccount.status}
            </span>
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '6px' }}>{breakdown.newAccount.detail}</div>
          <div style={{fontSize: '13px', fontWeight: '700', color: breakdown.newAccount.status === 'PASS' ? '#10B981' : '#F59E0B'}}>
            +{breakdown.newAccount.score} points
          </div>
        </div>
      </div>

      {/* Final Decision */}
      <div style={{
        background: statusColor + '15',
        border: `1px solid ${statusColor}`,
        borderRadius: '8px',
        padding: '12px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '13px', color: statusColor, fontWeight: '700' }}>
          {statusLabel}
        </div>
        <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
          {statusDesc}
        </div>
      </div>
    </div>
  );
}

export function FraudShield() {
  const { payouts, user } = useApp() || {};

  if (!payouts || payouts.length === 0) {
    return (
      <div style={{
        background: 'rgba(22,28,36,0.6)',
        border: '1px solid rgba(255,255,255,0.05)',
        borderRadius: '20px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px', fontFamily: "'Space Grotesk', sans-serif" }}>
          🛡️ 4-Layer Fraud Detection Pipeline
        </h2>
        <div style={{ color: '#94A3B8', fontSize: '13px' }}>
          No claims to review. Your claims will appear here with detailed fraud score breakdowns.
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(22,28,36,0.6)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '20px',
      padding: '24px',
      marginBottom: '24px'
    }}>
      <h2 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 20px', fontFamily: "'Space Grotesk', sans-serif" }}>
        🛡️ 4-Layer Fraud Detection Pipeline
      </h2>

      <div style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '20px' }}>
        Every claim is analyzed 0-100. Green ≤30 = Auto-approved | Yellow 31-60 = Manual review | Red ≥61 = Auto-rejected
      </div>

      {payouts.slice(0, 5).map((claim) => (
        <FraudScoreCard
          key={claim.id}
          claim={claim}
          worker={user || { pincode: '411001', lastKnownPincode: '411001', createdAt: new Date().toISOString() }}
          allClaims={payouts}
        />
      ))}
    </div>
  );
}
