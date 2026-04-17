import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, PlayCircle, Phone, ArrowRight, Zap, Lock, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';
import config from '../config';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setIsDemo, setIsAuthenticated, setWorker } = useApp();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!showOtp) {
      if (phoneNumber.length < 10) return;
      setShowOtp(true);
    } else {
      setLoading(true);
      try {
        const res = await fetch(`${config.API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: phoneNumber, otp: '1234' })
        });
        const data = await res.json();
        if (data.token) {
          sessionStorage.setItem('paynest_token', data.token);
          setWorker(data.user);
          setIsAuthenticated(true);
          navigate('/');
        } else {
          // If not found, go to onboarding
          navigate('/onboarding');
        }
      } catch (err) {
        // Fallback for demo
        sessionStorage.setItem('paynest_token', 'demo_token');
        setIsAuthenticated(true);
        navigate('/');
      }
      setLoading(false);
    }
  };

  const handleDemoMode = () => {
    setIsDemo(true);
    setIsAuthenticated(true);
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--dark-bg)' }}>
      {/* Left Side - Branding */}
      <div style={{ 
        width: '55%', 
        position: 'relative', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 80px',
        background: 'linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 100%)'
      }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '400px', height: '400px', background: 'var(--primary)', opacity: 0.1, filter: 'blur(120px)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '300px', height: '300px', background: '#6366F1', opacity: 0.1, filter: 'blur(100px)', borderRadius: '50%' }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
            <div style={{ 
              width: '56px', height: '56px', 
              background: 'var(--primary)', 
              borderRadius: '16px', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(108, 99, 255, 0.4)'
            }}>
              <Shield size={32} color="white" fill="white" />
            </div>
            <h1 style={{ fontSize: '42px', fontWeight: '900', letterSpacing: '-1.5px', fontFamily: "'Space Grotesk', sans-serif" }}>PayNest</h1>
          </div>
          
          <h2 style={{ fontSize: '48px', lineHeight: '1.1', fontWeight: '800', marginBottom: '24px', maxWidth: '600px', fontFamily: "'Space Grotesk', sans-serif" }}>
            The Safety Net for <br />
            <span style={{ color: 'var(--primary)' }}>India's Gig Economy</span>
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '56px', maxWidth: '500px', lineHeight: '1.6' }}>
            AI-powered parametric insurance that protects your income from rain, heat, and city disruptions. Zero paperwork. 47-minute payouts.
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '12px', fontSize: '14px' }}>
              <Activity size={16} color="var(--primary)" /> Real-time Weather Sync
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '12px', fontSize: '14px' }}>
              <Zap size={16} color="#F59E0B" /> Instant UPI Payout
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)', borderRadius: '12px', fontSize: '14px' }}>
              <Lock size={16} color="#10B981" /> Guidewire Integrated
            </div>
          </div>
          
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--card-border)', borderRadius: '24px', padding: '32px', maxWidth: '500px', display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
            <div>
              <p style={{ fontSize: '24px', fontWeight: '900', color: 'var(--primary)' }}>12.4k</p>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Active Partners</p>
            </div>
            <div style={{ width: '1px', background: 'var(--card-border)' }} />
            <div>
              <p style={{ fontSize: '24px', fontWeight: '900', color: 'var(--success)' }}>₹4.1 Cr</p>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Claims Settled</p>
            </div>
            <div style={{ width: '1px', background: 'var(--card-border)' }} />
            <div>
              <p style={{ fontSize: '24px', fontWeight: '900', color: '#6366F1' }}>47m</p>
              <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Avg. Settlement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{ 
        width: '45%', 
        background: '#0a0a14',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 100px',
        borderLeft: '1px solid var(--card-border)'
      }}>
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '12px' }}>Partner Login</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Enter your registered mobile number.</p>
          
          <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Registered Mobile</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '15px' }}>+91</span>
                <input 
                  type="tel" 
                  placeholder="98765 43210" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                  style={{ 
                    width: '100%', padding: '18px 16px 18px 58px', 
                    background: 'var(--card-bg)', border: '1px solid var(--card-border)', 
                    borderRadius: '16px', color: 'white', fontSize: '17px', outline: 'none',
                    transition: 'border-color 0.2s',
                    borderColor: phoneNumber.length === 10 ? 'var(--primary)' : 'var(--card-border)'
                  }} 
                />
              </div>
            </div>

            {showOtp && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', animation: 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>Enter 4-digit OTP</label>
                <input 
                  type="password" 
                  placeholder="• • • •" 
                  maxLength={4}
                  style={{ 
                    width: '100%', padding: '18px', 
                    background: 'var(--card-bg)', border: '1px solid var(--primary)', 
                    borderRadius: '16px', color: 'white', fontSize: '28px', letterSpacing: '16px', textAlign: 'center', outline: 'none'
                  }} 
                />
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '8px' }}>Demo OTP: 1234</p>
              </div>
            )}

            <button 
              onClick={handleLogin}
              disabled={loading || phoneNumber.length < 10}
              className="btn-primary" 
              style={{ padding: '18px', fontSize: '16px', fontWeight: '700', opacity: phoneNumber.length < 10 ? 0.5 : 1 }}
            >
              {loading ? 'Verifying...' : (showOtp ? 'Access Dashboard' : 'Send Verification OTP')} <ArrowRight size={20} />
            </button>
          </form>

          <div style={{ margin: '40px 0', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase' }}>Judges Area</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }} />
          </div>

          <button 
            onClick={handleDemoMode}
            style={{ 
              width: '100%', padding: '18px', 
              background: 'rgba(108, 99, 255, 0.1)', 
              border: '1px solid var(--primary)', 
              borderRadius: '16px', color: 'white', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
              cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontWeight: '800', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PlayCircle size={22} color="var(--primary)" /> Explore as Admin
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Bypass login to view all analytics</p>
            </div>
          </button>

          <p style={{ textAlign: 'center', marginTop: '48px', fontSize: '15px', color: 'var(--text-muted)' }}>
            Are you a new delivery partner? <br />
            <span style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: '800', borderBottom: '1px solid var(--primary)' }} onClick={() => navigate('/onboarding')}>Get covered in 2 minutes</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default LoginPage;

