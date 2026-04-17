import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Shield, MapPin, Briefcase, Zap, CheckCircle, Smartphone, Bike, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Onboarding = () => {
  const navigate = useNavigate();
  const { setWorker } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Raju Kumar',
    city: 'Chennai',
    platform: 'Swiggy',
    vehicle: 'Bike',
    earnings: 800,
    hours: 8
  });

  const [aiAnalysis, setAiAnalysis] = useState([]);
  const [riskScore, setRiskScore] = useState(0);

  useEffect(() => {
    if (step === 3) {
      const rows = [
        "Analyzing your zone: Anna Nagar, Chennai...",
        "Checking historical disruptions...",
        "Calculating your income exposure...",
        "Reviewing local weather patterns...",
        "Generating your risk score..."
      ];
      
      let i = 0;
      const interval = setInterval(() => {
        if (i < rows.length) {
          setAiAnalysis(prev => [...prev, rows[i]]);
          i++;
        } else {
          clearInterval(interval);
          // Animate risk score
          let score = 0;
          const scoreInt = setInterval(() => {
            if (score <= 72) {
              setRiskScore(score);
              score++;
            } else {
              clearInterval(scoreInt);
            }
          }, 20);
        }
      }, 800);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else {
      setWorker(prev => ({ ...prev, ...formData }));
      navigate('/');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const PlanCard = ({ name, price, benefits, recommended }) => (
    <div className="card" style={{ 
      flex: 1, 
      border: recommended ? '2px solid var(--primary)' : '1px solid var(--card-border)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {recommended && (
        <span style={{ 
          position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '999px',
          fontSize: '10px', fontWeight: 'bold'
        }}>RECOMMENDED</span>
      )}
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ fontSize: '18px', marginBottom: '4px' }}>{name}</h4>
        <h2 style={{ fontSize: '32px' }}>₹{price}<span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/week</span></h2>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {benefits.map((b, i) => (
          <div key={i} style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
            <CheckCircle size={14} color="var(--success)" /> {b}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px' }}>
      {/* Progress Bar */}
      <div style={{ maxWidth: '800px', width: '100%', marginBottom: '48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)' }}>
          <span>STEP {step} OF 4</span>
          <span>{Math.round((step / 4) * 100)}% COMPLETE</span>
        </div>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'var(--primary)', width: `${(step / 4) * 100}%`, transition: 'width 0.5s ease', borderRadius: '3px' }} />
        </div>
      </div>

      <div style={{ maxWidth: '800px', width: '100%' }}>
        {step === 1 && (
          <div className="card animate-in fade-in slide-in-from-bottom duration-500" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Basic Information</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Let's start with your profile details.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Full Name</label>
                <input type="text" placeholder="Raju Kumar" className="card" style={{ padding: '16px', background: 'var(--dark-bg)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Phone Number</label>
                <input type="text" placeholder="+91 98765 43210" className="card" style={{ padding: '16px', background: 'var(--dark-bg)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>City</label>
                <select className="card" style={{ padding: '16px', background: 'var(--dark-bg)', color: 'white' }}>
                  <option>Chennai</option>
                  <option>Bengaluru</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Pincode</label>
                <input type="text" placeholder="600040" className="card" style={{ padding: '16px', background: 'var(--dark-bg)' }} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card animate-in fade-in slide-in-from-bottom duration-500" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Work Profile</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Tell us about your delivery work.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
              <button 
                onClick={() => setFormData({...formData, platform: 'Swiggy'})}
                style={{ 
                  padding: '32px', borderRadius: '20px', background: 'var(--dark-bg)', 
                  border: formData.platform === 'Swiggy' ? '2px solid #FF6600' : '1px solid var(--card-border)',
                  color: 'white', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                  boxShadow: formData.platform === 'Swiggy' ? '0 0 20px rgba(255, 102, 0, 0.2)' : 'none'
                }}
              >
                <ShoppingBag size={32} color="#FF6600" style={{ marginBottom: '16px' }} />
                <h4 style={{ fontSize: '18px' }}>Swiggy</h4>
              </button>
              <button 
                onClick={() => setFormData({...formData, platform: 'Zomato'})}
                style={{ 
                  padding: '32px', borderRadius: '20px', background: 'var(--dark-bg)', 
                  border: formData.platform === 'Zomato' ? '2px solid #E23744' : '1px solid var(--card-border)',
                  color: 'white', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                  boxShadow: formData.platform === 'Zomato' ? '0 0 20px rgba(226, 55, 68, 0.2)' : 'none'
                }}
              >
                <ShoppingBag size={32} color="#E23744" style={{ marginBottom: '16px' }} />
                <h4 style={{ fontSize: '18px' }}>Zomato</h4>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', display: 'block' }}>Daily working hours: <strong>{formData.hours} hrs</strong></label>
                <input 
                  type="range" min="4" max="12" value={formData.hours} 
                  onChange={(e) => setFormData({...formData, hours: e.target.value})}
                  style={{ width: '100%', accentColor: 'var(--primary)' }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Average Daily Earnings</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}>₹</span>
                  <input 
                    type="number" value={formData.earnings} 
                    onChange={(e) => setFormData({...formData, earnings: e.target.value})}
                    style={{ width: '100%', padding: '16px 16px 16px 32px', background: 'var(--dark-bg)', border: '1px solid var(--card-border)', borderRadius: '12px', color: 'white' }} 
                  />
                </div>
                <p style={{ fontSize: '12px', color: 'var(--success)', marginTop: '4px' }}>~₹{formData.earnings * 6}/week estimated income</p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card animate-in fade-in slide-in-from-bottom duration-500" style={{ padding: '40px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>AI Risk Assessment</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '48px' }}>Analyzing real-time data for your zone.</p>
            
            <div style={{ maxWidth: '400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', marginBottom: '48px', minHeight: '160px' }}>
              {aiAnalysis.map((line, i) => (
                <div key={i} style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '12px', animation: 'fadeIn 0.5s ease' }}>
                  <CheckCircle size={14} color="var(--success)" /> {line}
                </div>
              ))}
            </div>

            {riskScore > 0 && (
              <div style={{ animation: 'zoomIn 0.8s ease' }}>
                <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto 24px auto' }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '8px solid #2D2D44', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <h1 style={{ fontSize: '48px', color: riskScore > 79 ? 'var(--danger)' : (riskScore > 59 ? 'var(--warning)' : 'var(--success)') }}>{riskScore}</h1>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold' }}>RISK SCORE</span>
                  </div>
                </div>
                <h3 style={{ color: riskScore > 79 ? 'var(--danger)' : (riskScore > 59 ? 'var(--warning)' : 'var(--success)') }}>Moderate Risk Detected</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>Based on your zone history, we recommend the <strong>Standard Plan</strong>.</p>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom duration-500">
            <h2 style={{ fontSize: '28px', marginBottom: '8px', textAlign: 'center' }}>Select Your Plan</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '48px', textAlign: 'center' }}>Weekly premiums are automatically deducted from your payout.</p>
            
            <div style={{ display: 'flex', gap: '20px', marginBottom: '48px' }}>
              <PlanCard 
                name="Basic" price={29} 
                benefits={["Coverage: ₹300/day", "Up to 3 claims/week", "Triggers: Rain + Heat"]} 
              />
              <PlanCard 
                name="Standard" price={49} recommended 
                benefits={["Coverage: ₹500/day", "Up to 5 claims/week", "All triggers + AQI"]} 
              />
              <PlanCard 
                name="Pro" price={79} 
                benefits={["Coverage: ₹800/day", "Unlimited claims", "All triggers + Curfew"]} 
              />
            </div>

            <div className="card" style={{ background: 'rgba(108, 99, 255, 0.05)', border: '1px solid rgba(108, 99, 255, 0.2)', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Standard Plan: ₹49 will be deducted every Monday.</p>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
          <button 
            onClick={handleBack} 
            disabled={step === 1}
            style={{ 
              padding: '16px 32px', background: 'none', border: '1px solid var(--card-border)', 
              borderRadius: '12px', color: 'white', cursor: 'pointer', opacity: step === 1 ? 0 : 1 
            }}
          >
            Back
          </button>
          <button 
            onClick={handleNext}
            className="btn-primary"
            style={{ padding: '16px 40px', fontSize: '16px' }}
          >
            {step === 4 ? 'Confirm & Activate Coverage' : 'Continue'} <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default Onboarding;
