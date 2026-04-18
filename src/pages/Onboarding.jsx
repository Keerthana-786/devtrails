import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Shield, MapPin, Briefcase, Zap, CheckCircle, Smartphone, Bike, ShoppingBag, Info, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import config from '../config';
import { realAuthAPI } from '../REAL_API';
import TermsModal from '../components/TermsModal';

const Onboarding = () => {
  const navigate = useNavigate();
  const { setWorker, setIsAuthenticated } = useApp();
  const [step, setStep] = useState(1);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [selectedTier, setSelectedTier] = useState('standard');
  const [formData, setFormData] = useState({
    name: 'Raju Kumar',
    city: 'Chennai',
    platform: 'Swiggy',
    vehicle: 'Bike',
    earnings: 800,
    hours: 8,
    upiId: 'raju@okicici'
  });

  const tiers = [
    { id: 'basic', name: 'Silver Shield', mult: 0.6, coverage: 300, desc: 'Essential protection for rainy days.' },
    { id: 'standard', name: 'Gold Shield', mult: 1.0, coverage: 500, desc: 'Recommended protection for full-time partners.' },
    { id: 'pro', name: 'Platinum Shield', mult: 1.6, coverage: 800, desc: 'Maximum protection including curfew coverage.' }
  ];

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

    const tier = tiers.find(t => t.id === selectedTier);
    const finalPremium = Math.round(premium * tier.mult);
    
    setCalculatedPremium(finalPremium);
    setPremiumBreakdown(breakdown);
  }, [formData, selectedTier]);

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
      }, 500);
      return () => clearInterval(interval);
    }
  }, [step, formData.city]);

  const handleNext = async () => {
    if (step < 5) {
      if (step === 1 && (!formData.name || !formData.upiId)) {
        alert("Please fill all fields to continue.");
        return;
      }
      if (step === 5 && !acceptedTerms) {
        alert("Please accept the Terms and Conditions to activate your coverage.");
        setIsTermsOpen(true);
        return;
      }
      setStep(step + 1);
    } else {
      if (!acceptedTerms) {
        alert("Please accept the Terms and Conditions to activate your coverage.");
        return;
      }
      try {
        const token = sessionStorage.getItem('paynest_token') || localStorage.getItem('paynest_token');
        const tierObj = tiers.find(t => t.id === selectedTier);
        
        const onboardingData = {
          name: formData.name,
          partner: formData.platform,
          zone: formData.city,
          upiId: formData.upiId,
          plan: selectedTier,
          weeklyPremium: calculatedPremium,
          trustScore: riskScore,
          coverage_per_day: tierObj.coverage
        };

        const data = await realAuthAPI.onboard(onboardingData, token);
        
        if (data.success) {
          setWorker({
            ...formData,
            ...data.user,
            walletBalance: data.user.walletBalance || 0,
            onboarded: true
          });
          setIsAuthenticated(true);
          navigate('/');
        } else {
          alert(data.error || "Onboarding failed");
        }
      } catch (err) {
        console.error("Onboarding failed", err);
        setWorker({
          ...formData,
          walletBalance: 0,
          trustScore: riskScore,
          weeklyPremium: calculatedPremium,
          tier: selectedTier,
          coverage_per_day: tiers.find(t => t.id === selectedTier).coverage,
          policyStatus: 'ACTIVE',
          policyValidUntil: '18 Apr 2026'
        });
        setIsAuthenticated(true);
        navigate('/');
      }
    }
  };



  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--dark-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
         <img src="/paynest2.png" alt="PayNest" style={{ width: '56px', height: '56px', objectFit: 'contain' }} />
         <h1 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-1.5px' }}>PayNest</h1>
      </div>
      
      {/* Progress Bar */}
      <div style={{ maxWidth: '800px', width: '100%', marginBottom: '64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '13px', fontWeight: 'bold' }}>
          <span style={{ color: 'var(--text-secondary)' }}>STEP {step} OF 5</span>
          <span style={{ color: 'var(--primary)' }}>{Math.round((step / 5) * 100)}% COMPLETE</span>
        </div>
        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: 'linear-gradient(90deg, var(--primary), #8B5CF6)', width: `${(step / 5) * 100}%`, transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)', borderRadius: '10px', boxShadow: '0 0 15px rgba(108, 99, 255, 0.4)' }} />
        </div>
      </div>

      <div style={{ maxWidth: '900px', width: '100%' }}>
        {step === 1 && (
          <div className="card animate-fadeIn" style={{ padding: '48px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>Basic Information</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '48px' }}>Let's start with your profile details.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Full Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="card" style={{ padding: '20px', background: 'var(--dark-bg)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>UPI ID (for instant payouts)</label>
                <input type="text" value={formData.upiId} onChange={(e) => setFormData({...formData, upiId: e.target.value})} className="card" style={{ padding: '20px', background: 'var(--dark-bg)' }} placeholder="raju@okaxis" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Operating City</label>
                <select value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="card" style={{ padding: '20px', background: 'var(--dark-bg)', color: 'white' }}>
                  <option>Chennai</option>
                  <option>Bengaluru</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Hyderabad</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Partner Platform</label>
                <select value={formData.platform} onChange={(e) => setFormData({...formData, platform: e.target.value})} className="card" style={{ padding: '20px', background: 'var(--dark-bg)', color: 'white' }}>
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
          <div className="card animate-fadeIn" style={{ padding: '48px' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>Earning Profile</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '48px' }}>Your premium is partially based on your income exposure.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              <div>
                <label style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '24px', display: 'block' }}>Daily working hours: <span style={{ color: 'var(--primary)', fontSize: '24px' }}>{formData.hours} hrs</span></label>
                <input 
                  type="range" min="4" max="14" value={formData.hours} 
                  onChange={(e) => setFormData({...formData, hours: e.target.value})}
                  style={{ width: '100%', accentColor: 'var(--primary)', height: '6px' }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-secondary)' }}>Average Daily Earnings (₹)</label>
                <input 
                  type="number" value={formData.earnings} 
                  onChange={(e) => setFormData({...formData, earnings: e.target.value})}
                  className="card" style={{ padding: '20px', background: 'var(--dark-bg)', fontSize: '24px', fontWeight: 'bold' }} 
                />
                <div style={{ marginTop: '32px', padding: '24px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '20px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                   <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Calculated Weekly Income: <strong style={{ color: 'var(--text-primary)' }}>₹{formData.earnings * 6}</strong></p>
                   <p style={{ fontSize: '14px', color: 'var(--success)' }}>Daily Protection Target: <strong style={{ fontSize: '18px' }}>₹{Math.round(formData.earnings * 0.7)}</strong> (70% coverage)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card animate-fadeIn" style={{ padding: '48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '12px' }}>AI Risk Assessment</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '64px' }}>Analyzing {formData.city} datasets for {formData.platform} partner.</p>
            
            <div style={{ maxWidth: '450px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', marginBottom: '64px', minHeight: '180px' }}>
              {aiAnalysis.map((line, i) => (
                <div key={i} style={{ fontSize: '15px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '16px', animation: 'fadeIn 0.5s ease' }}>
                  <CheckCircle size={18} color="var(--success)" /> {line}
                </div>
              ))}
            </div>

            {riskScore > 0 && (
              <div style={{ animation: 'zoomIn 0.8s ease' }}>
                <div style={{ position: 'relative', width: '240px', height: '240px', margin: '0 auto 32px auto' }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '8px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', background: 'radial-gradient(circle, rgba(108, 99, 255, 0.05) 0%, transparent 70%)' }}>
                    <h1 style={{ fontSize: '64px', fontWeight: '900', color: riskScore > 79 ? 'var(--danger)' : (riskScore > 59 ? 'var(--warning)' : 'var(--success)') }}>{riskScore}</h1>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '2px' }}>RISK SCORE</span>
                  </div>
                </div>
                <h3 style={{ fontSize: '24px', color: riskScore > 79 ? 'var(--danger)' : (riskScore > 59 ? 'var(--warning)' : 'var(--success)') }}>
                   {riskScore > 79 ? 'High Risk Zone 🚨' : (riskScore > 59 ? 'Moderate Risk ⚠️' : 'Standard Risk Zone ✅')}
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '12px' }}>
                   Parametric triggers calibrated for {formData.city}.
                </p>
              </div>
            )}
          </div>
        )}

        {step === 4 && (
          <div className="animate-fadeIn">
            <h2 style={{ fontSize: '32px', marginBottom: '12px', textAlign: 'center' }}>Select Your Shield</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '48px', textAlign: 'center' }}>Choose a plan that fits your risk profile.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }} className="grid-3">
              {tiers.map((t) => (
                <div 
                  key={t.id} 
                  onClick={() => setSelectedTier(t.id)}
                  className={`card ${selectedTier === t.id ? 'glass' : ''}`}
                  style={{ 
                    cursor: 'pointer', 
                    borderWidth: '2px', 
                    borderColor: selectedTier === t.id ? 'var(--primary)' : 'var(--card-border)',
                    padding: '32px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                  }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: selectedTier === t.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', color: 'white' }}>
                    <Shield size={24} />
                  </div>
                  <h3 style={{ fontSize: '20px' }}>{t.name}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', minHeight: '40px' }}>{t.desc}</p>
                  <div style={{ margin: '12px 0' }}>
                    <h2 style={{ fontSize: '32px', color: 'white' }}>₹{t.coverage}</h2>
                    <p style={{ fontSize: '10px', color: 'var(--text-muted)' }}>PAYOUT PER TRIGGER</p>
                  </div>
                  <div className="badge badge-live" style={{ alignSelf: 'center' }}>
                    {selectedTier === t.id ? 'SELECTED' : 'SELECT PLAN'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="animate-fadeIn">
            <h2 style={{ fontSize: '32px', marginBottom: '12px', textAlign: 'center' }}>Premium Summary</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '48px', textAlign: 'center' }}>Confirmed setup for {formData.name}.</p>
            
            <div className="card glass" style={{ maxWidth: '540px', margin: '0 auto 48px auto', border: '1px solid var(--primary)', padding: '0' }}>
               <div style={{ textAlign: 'center', padding: '48px 24px', borderBottom: '1px solid var(--card-border)' }}>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px' }}>Weekly Premium</p>
                  <h1 style={{ fontSize: '72px', color: 'var(--primary)', letterSpacing: '-2px' }}>₹{calculatedPremium}</h1>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Auto-deducted on Monday morning</p>
               </div>
               
               <div style={{ padding: '32px' }}>
                  <h4 style={{ fontSize: '16px', marginBottom: '20px' }}>Fee Breakdown:</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Base Coverage ({tiers.find(t=>t.id===selectedTier).name})</span>
                        <span style={{ fontWeight: 'bold' }}>₹{premiumBreakdown.base}</span>
                     </div>
                     {premiumBreakdown.weather > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                           <span style={{ color: 'var(--text-secondary)' }}>Weather Risk ({formData.city})</span>
                           <span style={{ fontWeight: 'bold' }}>+₹{premiumBreakdown.weather}</span>
                        </div>
                     )}
                     {premiumBreakdown.aqi > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                           <span style={{ color: 'var(--text-secondary)' }}>Zone Pollution Load</span>
                           <span style={{ fontWeight: 'bold' }}>+₹{premiumBreakdown.aqi}</span>
                        </div>
                     )}
                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: 'var(--primary)', borderTop: '1px solid var(--card-border)', paddingTop: '16px' }}>
                        <span style={{ fontWeight: 'bold' }}>Shield Multiplier ({tiers.find(t=>t.id===selectedTier).mult}x)</span>
                        <span style={{ fontWeight: 'bold' }}>Calculated</span>
                     </div>
                  </div>
               </div>

               <div style={{ padding: '24px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '0 0 20px 20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ padding: '8px', background: 'var(--success)', borderRadius: '10px', color: 'white' }}>
                    <Zap size={20} />
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    <strong>Parametric Target:</strong> ₹{tiers.find(t=>t.id===selectedTier).coverage} payout will be sent to <strong>{formData.upiId}</strong> within minutes of a threshold breach.
                  </p>
               </div>
            </div>

            <div style={{ maxWidth: '540px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
               <input 
                 type="checkbox" 
                 id="terms" 
                 checked={acceptedTerms}
                 onChange={(e) => setAcceptedTerms(e.target.checked)}
                 style={{ width: '20px', height: '20px', accentColor: 'var(--primary)', cursor: 'pointer' }}
               />
               <label htmlFor="terms" style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                 I have read and agree to the <span onClick={() => setIsTermsOpen(true)} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}>Terms and Conditions</span>
               </label>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '64px' }}>
          <button 
            onClick={handleBack} 
            disabled={step === 1}
            style={{ 
              padding: '18px 36px', background: 'none', border: '1px solid var(--card-border)', 
              borderRadius: '16px', color: 'white', cursor: 'pointer', opacity: step === 1 ? 0 : 1,
              fontWeight: '700', fontSize: '15px' 
            }}
          >
            Back
          </button>
          <button 
            onClick={handleNext}
            className="btn-primary"
            style={{ padding: '18px 48px', fontSize: '17px' }}
          >
            {step === 5 ? 'Activate My Coverage' : 'Continue'} <ChevronRight size={22} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
    </div>
  );
};

export default Onboarding;
