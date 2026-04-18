import React from 'react';
import { X, Shield, CheckCircle, Download, Printer, BadgeCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

const PolicyCertificateModal = ({ isOpen, onClose }) => {
  const { worker } = useApp();

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(5px)'
    }}>
      <div className="animate-fadeIn" style={{
        maxWidth: '750px', width: '95%', padding: '0', 
        background: '#fff', color: '#000', borderRadius: '12px',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '40px', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', cursor: 'pointer' }}>
            <X size={20} />
          </button>

          {/* Certificate Border Container */}
          <div style={{ 
            border: '2px solid #000', 
            padding: '4px',
            borderRadius: '4px'
          }}>
            <div style={{ 
              border: '1px solid #E2E8F0', 
              padding: '40px', 
              textAlign: 'center',
              position: 'relative',
              background: '#fff' 
            }}>
              {/* Watermark Logo */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.03, pointerEvents: 'none' }}>
                <img src="/paynest2.png" alt="" style={{ width: '400px' }} />
              </div>

              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '50px' }}>
                 <div style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src="/paynest2.png" alt="PayNest" style={{ width: '32px', filter: 'grayscale(1)' }} />
                      <span style={{ fontWeight: '900', fontSize: '20px', letterSpacing: '-1px' }}>PAYNEST</span>
                    </div>
                    <h2 style={{ color: '#000', marginTop: '16px', fontSize: '24px', fontWeight: '800' }}>CERTIFICATE OF PROTECTION</h2>
                 </div>
                 <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', marginBottom: '8px', justifyContent: 'flex-end' }}>
                      <BadgeCheck size={18} />
                      <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>Digitally Verified</span>
                    </div>
                    <p style={{ fontSize: '10px', color: '#666' }}>CERTIFICATE NO</p>
                    <p style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'monospace' }}>PN-2026-{Math.floor(Math.random()*9000)+1000}</p>
                 </div>
              </div>

              {/* Recipient */}
              <div style={{ marginBottom: '50px' }}>
                 <p style={{ fontSize: '14px', color: '#64748B', fontStyle: 'italic', marginBottom: '12px' }}>This is to certify that</p>
                 <h1 style={{ 
                   fontSize: '42px', 
                   fontWeight: '900', 
                   color: '#0F172A', 
                   textTransform: 'uppercase', 
                   borderBottom: '1px solid #E2E8F0', 
                   display: 'inline-block', 
                   padding: '0 40px', 
                   marginBottom: '16px' 
                 }}>
                   {worker.name}
                 </h1>
                 <p style={{ fontSize: '15px', color: '#475569', maxWidth: '500px', margin: '0 auto', lineHeight: '1.6' }}>
                   is officially recognized as a protected member within the **PayNest Parametric Income Network**, 
                   maintaining an active income safety net against identified regional disruptions.
                 </p>
              </div>

              {/* Policy Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '30px 40px', 
                textAlign: 'left', 
                marginBottom: '50px',
                padding: '30px',
                background: '#F8FAFC',
                borderRadius: '8px'
              }}>
                 <div>
                    <label style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase' }}>Coverage Type</label>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B' }}>Parametric Income Loss (Weather / Curfew)</p>
                 </div>
                 <div>
                    <label style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase' }}>Weekly Premium</label>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B' }}>₹{worker.weeklyPremium || 49}.00 / Week</p>
                 </div>
                 <div>
                    <label style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase' }}>Daily Protection Cap</label>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B' }}>₹{worker.coverage_per_day || 480} per certified disruption</p>
                 </div>
                 <div>
                    <label style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 'bold', textTransform: 'uppercase' }}>Policy Period</label>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1E293B' }}>
                      {worker.onboarded_at || '11 Apr 2026'} — {worker.policy_valid_until || '18 Apr 2026'}
                    </p>
                 </div>
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '40px' }}>
                 <div style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <img src="/paynest2.png" alt="" style={{ height: '30px', filter: 'grayscale(1)', opacity: 0.8 }} />
                    </div>
                    <p style={{ fontSize: '10px', color: '#94A3B8' }}>Verified via Guidewire Parametric API</p>
                    <p style={{ fontSize: '10px', color: '#94A3B8' }}>Timestamp: {new Date().toLocaleString()}</p>
                 </div>
                 
                 <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '150px', height: '1px', background: '#334155', marginBottom: '8px' }} />
                    <p style={{ fontSize: '10px', color: '#475569', fontWeight: '800' }}>CHIEF UNDERWRITING OFFICER</p>
                    <p style={{ fontSize: '9px', color: '#94A3B8', marginTop: '4px' }}>Digitally Signed by PayNest AI</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal Actions */}
        <div style={{ padding: '20px 40px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={() => window.print()} style={{ 
            background: '#fff', border: '1px solid #E2E8F0', padding: '10px 20px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'
          }}>
            <Printer size={16} /> Print Document
          </button>
          <button style={{ 
            background: '#0F172A', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '8px',
            display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '700', cursor: 'pointer'
          }}>
            <Download size={16} /> Download Signed PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyCertificateModal;
