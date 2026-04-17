import React from 'react';
import { X, Shield, CheckCircle, Download, Printer } from 'lucide-react';
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
      <div className="card animate-fadeIn" style={{
        maxWidth: '700px', width: '90%', padding: '0', 
        background: '#fff', color: '#000', borderRadius: '0'
      }}>
        <div style={{ padding: '40px', position: 'relative', border: '15px solid #000', margin: '10px' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: '-40px', right: '-40px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={32} />
          </button>

          {/* Certificate Content */}
          <div style={{ border: '2px solid #EEE', padding: '30px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
               <div style={{ textAlign: 'left' }}>
                  <img src="/paynest2.png" alt="PayNest" style={{ width: '40px', filter: 'grayscale(1)' }} />
                  <h2 style={{ color: '#000', marginTop: '10px' }}>CERTIFICATE OF PROTECTION</h2>
               </div>
               <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '10px', color: '#666' }}>CERTIFICATE NO</p>
                  <p style={{ fontSize: '14px', fontWeight: 'bold' }}>PN-2026-{Math.floor(Math.random()*9000)+1000}</p>
               </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
               <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>This document certifies that</p>
               <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#000', textTransform: 'uppercase', borderBottom: '2px solid #000', display: 'inline-block', padding: '0 20px', marginBottom: '8px' }}>
                 {worker.name}
               </h1>
               <p style={{ fontSize: '14px', color: '#666' }}>is officially protected under the PayNest Parametric Income Shield.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', textAlign: 'left', marginBottom: '40px' }}>
               <div>
                  <p style={{ fontSize: '10px', color: '#999', fontWeight: 'bold' }}>COVERAGE TYPE</p>
                  <p style={{ fontSize: '14px' }}>Parametric Income Loss (Weather/Curfew)</p>
               </div>
               <div>
                  <p style={{ fontSize: '10px', color: '#999', fontWeight: 'bold' }}>ZONE OF OPERATION</p>
                  <p style={{ fontSize: '14px' }}>{worker.city} - {worker.zone || 'Greater Metro'}</p>
               </div>
               <div>
                  <p style={{ fontSize: '10px', color: '#999', fontWeight: 'bold' }}>DAILY PROTECTION</p>
                  <p style={{ fontSize: '14px' }}>₹{worker.coverage_per_day || 480} per incident</p>
               </div>
               <div>
                  <p style={{ fontSize: '10px', color: '#999', fontWeight: 'bold' }}>VALID UNTIL</p>
                  <p style={{ fontSize: '14px' }}>{worker.policy_valid_until || '18 Apr 2026'}</p>
               </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', marginTop: '40px' }}>
               <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '120px', height: '1px', background: '#000', marginBottom: '8px' }} />
                  <p style={{ fontSize: '10px', color: '#666' }}>CHIEF RISK OFFICER</p>
               </div>
               <div style={{ textAlign: 'center' }}>
                  <Shield size={40} color="#000" style={{ opacity: 0.2 }} />
                  <p style={{ fontSize: '8px', color: '#999', marginTop: '4px' }}>OFFICIAL SEAL</p>
               </div>
            </div>
          </div>
        </div>
        
        <div style={{ padding: '20px', background: '#F8F9FA', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={() => window.print()} className="btn-primary" style={{ background: '#333' }}>
            <Printer size={16} /> Print
          </button>
          <button className="btn-primary" style={{ background: '#000' }}>
            <Download size={16} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PolicyCertificateModal;
