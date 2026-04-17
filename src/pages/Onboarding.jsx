import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Shield, MapPin, Briefcase, Zap, CheckCircle, Smartphone, Bike, ShoppingBag, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import config from '../config';

const Onboarding = () => {
  const navigate = useNavigate();
  const { setWorker, setIsAuthenticated } = useApp();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Raju Kumar',
    city: 'Chennai',
    platform: 'Swiggy',
    vehicle: 'Bike',
    earnings: 800,
    hours: 8,
    upiId: 'raju@okicici'
  });

  const [aiAnalysis, setAiAnalysis] = useState([]);
  const [riskScore, setRiskScore] = useState(0);
  const [calculatedPremium, setCalculatedPremium] = useState(49);
  const [premiumBreakdown, setPremiumBreakdown] = useState({ base: 29, weather: 0, aqi: 0, scale: 0 });

  useEffect(() => {
    // Dynamic Premium Calculation Logic
    let premium = 29; // Base
    let breakdown = { base: 29, weather: 0, aqi: 0, scale: 0 };

    if (formData.city === 'Chennai' || formData.city === 'Mumbai') {
      premium += 10;
      breakdown.weather = 10;
    }
    if (formData.city === 'Delhi' || formData.city === 'Mumbai') {
      premium += 5;
      breakdown.aqi = 5;
    }
    if (formData.earnings > 800) {
      premium += 5;
      breakdown.scale = 5;
    }
    setCalculatedPremium(premium);
    setPremiumBreakdown(breakdown);
  }, [formData]);

  useEffect(() => {
    if (step === 3) {
      setAiAnalysis([]);
      const rows = [
        `Analyzing ${formData.city} risk zone...`,
        "Checking historical monsoon patterns...",
        "Evaluating platform disruption frequency...",
        "Processing earnings-to-exposure ratio...",
        "Generating Guidewire-compliant risk score..."
      ];
      
      let i = 0;
      const interval = setInterval(() => {
        if (i < rows.length) {
          setAiAnalysis(prev => [...prev, rows[i]]);
          i++;
        } else {
          clearInterval(interval);
          let targetScore = 45;
          if (formData.city === 'Chennai') targetScore = 82;
          if (formData.city === 'Delhi') targetScore = 74;

          let score = 0;
          const scoreInt = setInterval(() => {
            if (score <= targetScore) {
              setRiskScore(score);
              score++;
            } else {
              clearInterval(scoreInt);
            }
          }, 15);
        }
      }, 700);
      return () => clearInterval(interval);
    }
  }, [step, formData.city]);

  const handleNext = async () => {
    if (step < 4) setStep(step + 1);
    else {
      try {
        const res = await fetch(`${config.API_URL}/onboard`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            premium: calculatedPremium,
            trustScore: riskScore
          })
        });
        const data = await res.json();
        if (data.token) {
          sessionStorage.setItem('paynest_token', data.token);
          setWorker(data.user);
          setIsAuthenticated(true);
          navigate('/');
        }
      } catch (err) {
        console.error("Onboarding failed", err);
        alert("Activation failed. Please try again.");
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

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
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="card" style={{ padding: '16px', background: 'var(--dark-bg)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>UPI ID (for instant payouts)</label>
                <input type="text" value={formData.upiId} onChange={(e) => setFormData({...formData, upiId: e.target.value})} className="card" style={{ padding: '16px', background: 'var(--dark-bg)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Operating City</label>
                <select value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="card" style={{ padding: '16px', background: 'var(--dark-bg)', color: 'white' }}>
                  <option>Chennai</option>
                  <option>Bengaluru</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Hyderabad</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Platform</label>
                <select value={formData.platform} onChange={(e) => setFormData({...formData, platform: e.target.value})} className="card" style={{ padding: '16px', background: 'var(--dark-bg)', color: 'white' }}>
                  <option>Swiggy</option>
                  <option>Zomato</option>
                  <option>Zepto</option>
                  <option>Blinkit</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card animate-in fade-in slide-in-from-bottom duration-500" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>Earning Profile</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Your premium is partially based on your income exposure.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', display: 'block' }}>Daily working hours: <strong>{formData.hours} hrs</strong></label>
                <input 
                  type="range" min="4" max="14" value={formData.hours} 
                  onChange={(e) => setFormData({...formData, hours: e.target.value})}
                  style={{ width: '100%', accentColor: 'var(--primary)' }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Average Daily Earnings (₹)</label>
                <input 
                  type="number" value={formData.earnings} 
                  onChange={(e) => setFormData({...formData, earnings: e.target.value})}
                  className="card" style={{ padding: '16px', background: 'var(--dark-bg)', fontSize: '18px' }} 
                />
                <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                   <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Calculated Weekly Income: <strong>₹{formData.earnings * 6}</strong></p>
                   <p style={{ fontSize: '12px', color: 'var(--success)' }}>Daily Protection Target: <strong>₹{Math.round(formData.earnings * 0.7)}</strong> (70% coverage)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card animate-in fade-in slide-in-from-bottom duration-500" style={{ padding: '40px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '28px', marginBottom: '8px' }}>AI Risk Assessment</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '48px' }}>Analyzing {formData.city} datasets for {formData.platform} partner.</p>
            
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
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold' }}>RISK SCORE</span>
                  </div>
                </div>
                <h3 style={{ color: riskScore > 79 ? 'var(--danger)' : (riskScore > 59 ? 'var(--warning)' : 'var(--success)') }}>
                   {riskScore > 79 ? 'High Risk Zone' : (riskScore > 59 ? 'Moderate Risk' : 'Standard Risk Zone')}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                   Parametric triggers calibrated for {formData.city}.
                </p>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="animate-in fade-in slide-in-from-bottom duration-500">
            <h2 style={{ fontSize: '28px', marginBottom: '8px', textAlign: 'center' }}>Premium Summary</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', textAlign: 'center' }}>Based on your {riskScore} trust score and income profile.</p>
            
            <div className="card" style={{ maxWidth: '500px', margin: '0 auto 32px auto', border: '1px solid var(--primary)' }}>
               <div style={{ textAlign: 'center', padding: '24px 0', borderBottom: '1px solid var(--card-border)' }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '8px' }}>Weekly Premium</p>
                  <h1 style={{ fontSize: '56px', color: 'var(--primary)' }}>₹{calculatedPremium}</h1>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Auto-deducted on Monday morning</p>
               </div>
               
               <div style={{ padding: '24px' }}>
                  <h4 style={{ fontSize: '14px', marginBottom: '16px' }}>Fee Breakdown:</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Base Coverage Fee</span>
                        <span>₹{premiumBreakdown.base}</span>
                     </div>
                     {premiumBreakdown.weather > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                           <span style={{ color: 'var(--text-secondary)' }}>Weather Risk Surcharge ({formData.city})</span>
                           <span>+₹{premiumBreakdown.weather}</span>
                        </div>
                     )}
                     {premiumBreakdown.aqi > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                           <span style={{ color: 'var(--text-secondary)' }}>Pollution exposure risk</span>
                           <span>+₹{premiumBreakdown.aqi}</span>
                        </div>
                     )}
                     {premiumBreakdown.scale > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                           <span style={{ color: 'var(--text-secondary)' }}>High earnings protection scale</span>
                           <span>+₹{premiumBreakdown.scale}</span>
                        </div>
                     )}
                  </div>
               </div>

               <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '0 0 16px 16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Shield size={20} color="var(--success)" />
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                     <strong>Parametric Trigger:</strong> Payout of ₹500 is issued when rainfall &gt; 35mm/hr or AQI &gt; 300 in your zone.
                  </p>
               </div>
            </div>

            <div style={{ textAlign: 'center' }}>
               <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  By clicking activate, you agree to the weekly premium deduction and parametric trigger terms.
               </p>
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
