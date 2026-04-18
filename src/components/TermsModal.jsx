import React from 'react';
import { X, Shield, FileText, CheckCircle } from 'lucide-react';

const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '700px', width: '100%', maxHeight: '85vh',
        background: '#161B22', color: '#E2E8F0', borderRadius: '24px',
        border: '1px solid #30363D', display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 48px rgba(0,0,0,0.5)', overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid #30363D', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '8px', background: 'rgba(108, 99, 255, 0.1)', borderRadius: '10px' }}>
              <Shield size={22} color="#6C63FF" />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Terms & Conditions</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#8B949E', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px', overflowY: 'auto', lineHeight: '1.7', fontSize: '15px', color: '#8B949E' }}>
          <p style={{ color: '#F8FAFC', fontWeight: 'bold', marginBottom: '16px' }}>Last Updated: April 18, 2026</p>
          
          <h3 style={{ color: '#F8FAFC', fontSize: '17px', marginTop: '24px', marginBottom: '12px' }}>1. Scope of Coverage</h3>
          <p>PayNest provides parametric income protection for registered delivery partners. Coverage is triggered automatically based on hyper-local weather data (rainfall &gt; 35mm/hr), extreme heat indices (&gt; 43°C), or government-mandated city disruptions.</p>

          <h3 style={{ color: '#F8FAFC', fontSize: '17px', marginTop: '24px', marginBottom: '12px' }}>2. Automated Claims</h3>
          <p>By accepting these terms, you agree to our automated claim processing. No manual claim filing is required. Payouts are calculated by our AI engine and disbursed via UPI within 47 minutes of a confirmed trigger event.</p>

          <h3 style={{ color: '#F8FAFC', fontSize: '17px', marginTop: '24px', marginBottom: '12px' }}>3. Dynamic Premiums</h3>
          <p>Your weekly premium is dynamic and calculated every Monday morning. Factors include your work zone risk, historical weather patterns, and your Earnings Stability Score. You will be notified of your premium amount via the dashboard.</p>

          <h3 style={{ color: '#F8FAFC', fontSize: '17px', marginTop: '24px', marginBottom: '12px' }}>4. Data Privacy</h3>
          <p>We process your location data in real-time to provide protection. We do not sell your personal data. Aadhaar details are processed securely through Guidewire-compliant OCR systems for KYC purposes only.</p>

          <h3 style={{ color: '#F8FAFC', fontSize: '17px', marginTop: '24px', marginBottom: '12px' }}>5. Partner Eligibility</h3>
          <p>Coverage is valid only for active partners of registered platforms (Swiggy, Zomato, Zepto, Blinkit). Misrepresentation of working hours or platform partnership may result in policy termination.</p>

          <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(108, 99, 255, 0.05)', borderRadius: '16px', border: '1px solid rgba(108, 99, 255, 0.2)', display: 'flex', gap: '16px' }}>
            <CheckCircle size={24} color="#6C63FF" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: '13px' }}>
              By continuing, you acknowledge that PayNest is an AI-powered protection platform and payouts are final based on parametric data triggers.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '24px 32px', borderTop: '1px solid #30363D', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ 
            padding: '12px 32px', background: 'var(--primary, #6C63FF)', border: 'none', 
            borderRadius: '12px', color: 'white', fontWeight: 'bold', cursor: 'pointer' 
          }}>
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
