import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, PlayCircle, Phone, ArrowRight, Zap, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsDemo } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!showOtp) {
      setShowOtp(true);
    } else {
      sessionStorage.setItem('paynest_token', 'real_token_123');
      navigate('/');
    }
  };

  const handleDemoMode = () => {
    setIsDemo(true);
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--dark-bg)' }}>
      {/* Left Side - Branding */}
      <div style={{ 
        width: '60%', 
        position: 'relative', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 80px',
        background: 'linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 100%)'
      }}>
        {/* Abstract pattern background */}
        <div style={{ 
          position: 'absolute', top: '-100px', left: '-100px', 
          width: '400px', height: '400px', 
          background: 'rgba(108, 99, 255, 0.05)', 
          filter: 'blur(80px)', borderRadius: '50%' 
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{ 
              width: '56px', height: '56px', 
              background: 'var(--primary)', 
              borderRadius: '16px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(108, 99, 255, 0.3)'
            }}>
              <Shield size={32} color="white" fill="white" />
            </div>
            <h1 style={{ fontSize: '48px', fontWeight: '800', letterSpacing: '-1.5px' }}>PayNest</h1>
          </div>
          
          <h2 style={{ fontSize: '40px', lineHeight: '1.2', marginBottom: '16px', maxWidth: '500px' }}>
            Protecting India's <span style={{ color: 'var(--primary)' }}>Delivery Heroes</span>
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '64px', maxWidth: '450px' }}>
            AI-powered income insurance for Swiggy & Zomato partners. Get paid automatically during disruptions.
          </p>
          
          <div style={{ display: 'flex', gap: '24px', marginBottom: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '999px', fontSize: '14px' }}>
              <Shield size={16} color="var(--primary)" /> Zero-touch claims
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '999px', fontSize: '14px' }}>
              <Zap size={16} color="#F59E0B" /> Payout in 47 mins
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '999px', fontSize: '14px' }}>
              <Lock size={16} color="#10B981" /> AI fraud protection
            </div>
          </div>
          
          <div className="card" style={{ maxWidth: '450px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', textAlign: 'center' }}>
            <div>
              <p style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary)' }}>10k+</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Workers Protected</p>
            </div>
            <div>
              <p style={{ fontSize: '20px', fontWeight: '800', color: 'var(--success)' }}>₹3.2 Cr</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Income Saved</p>
            </div>
            <div>
              <p style={{ fontSize: '20px', fontWeight: '800', color: '#6366F1' }}>94.2%</p>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Auto-Approval</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{ 
        width: '40%', 
        background: '#0a0a14',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 80px'
      }}>
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '32px', marginBottom: '8px' }}>Welcome back</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Enter your details to manage your coverage.</p>
          
          <form onClick={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Phone Number</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '14px' }}>+91</span>
                <input 
                  type="text" 
                  placeholder="98765 43210" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ 
                    width: '100%', padding: '16px 16px 16px 54px', 
                    background: 'var(--card-bg)', border: '1px solid var(--card-border)', 
                    borderRadius: '12px', color: 'white', fontSize: '16px' 
                  }} 
                />
              </div>
            </div>

            {showOtp && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', animation: 'fadeIn 0.5s ease' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Verification Code (OTP)</label>
                <input 
                  type="text" 
                  placeholder="0 0 0 0" 
                  style={{ 
                    width: '100%', padding: '16px', 
                    background: 'var(--card-bg)', border: '1px solid var(--card-border)', 
                    borderRadius: '12px', color: 'white', fontSize: '24px', letterSpacing: '12px', textAlign: 'center' 
                  }} 
                />
              </div>
            )}

            <button type="submit" className="btn-primary" style={{ padding: '16px' }}>
              {showOtp ? 'Login to Dashboard' : 'Activate Coverage'} <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ margin: '32px 0', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }} />
          </div>

          <button 
            onClick={handleDemoMode}
            style={{ 
              width: '100%', padding: '16px', 
              background: 'rgba(16, 185, 129, 0.1)', 
              border: '1px solid rgba(16, 185, 129, 0.3)', 
              borderRadius: '12px', color: '#10B981', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
          >
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontWeight: '700', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PlayCircle size={20} /> Watch Live Demo
              </p>
              <p style={{ fontSize: '11px', opacity: 0.8 }}>See full platform — no signup needed</p>
            </div>
          </button>

          <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '14px', color: 'var(--text-muted)' }}>
            New partner? <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }} onClick={() => navigate('/onboarding')}>Register in 2 minutes</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default LoginPage;
