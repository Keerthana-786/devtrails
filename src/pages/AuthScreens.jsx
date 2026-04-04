import React, { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
 
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'development' ? 'http://localhost:8000' : (typeof window !== 'undefined' ? window.location.origin : 'https://devtrails.onrender.com'));

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Nunito:wght@400;500;600;700;800;900&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  
  .auth-root {
    min-height:100vh;
    background:linear-gradient(160deg,#0d0d0d 0%,#1a1000 40%,#0a1a0a 100%);
    display:flex;align-items:center;justify-content:center;
    font-family:'Nunito',sans-serif;
    position:relative;overflow:hidden;
  }

  /* city skyline bg */
  .skyline{position:absolute;bottom:0;left:0;right:0;height:220px;pointer-events:none;z-index:0;}

  /* stars */
  .stars{position:absolute;inset:0;pointer-events:none;z-index:0;}
  .star{position:absolute;background:#fff;border-radius:50%;animation:twinkle 2s ease-in-out infinite alternate;}
  @keyframes twinkle{from{opacity:0.2;}to{opacity:1;}}

  /* moon */
  .moon{position:absolute;top:32px;right:120px;width:54px;height:54px;border-radius:50%;background:#ffe88a;box-shadow:0 0 40px 18px rgba(255,220,80,0.22);animation:moonGlow 3s ease-in-out infinite alternate;z-index:1;}
  @keyframes moonGlow{from{box-shadow:0 0 40px 18px rgba(255,220,80,0.22);}to{box-shadow:0 0 60px 28px rgba(255,220,80,0.32);}}

  /* road */
  .road{position:absolute;bottom:0;left:0;right:0;height:56px;background:#222;z-index:2;}
  .road-line{position:absolute;bottom:26px;left:0;right:0;height:4px;background:repeating-linear-gradient(90deg,#f0c040 0,#f0c040 44px,transparent 44px,transparent 80px);animation:roadMove 0.45s linear infinite;z-index:3;}
  @keyframes roadMove{from{background-position:0 0;}to{background-position:-80px 0;}}
  .road-edge{position:absolute;bottom:52px;left:0;right:0;height:4px;background:#f0c040;opacity:0.25;z-index:3;}

  .layout{
    position:relative;z-index:10;
    display:flex;align-items:center;justify-content:center;
    width:100%;max-width:960px;padding:40px 24px 80px;gap:32px;
  }

  /* scene */
  .scene-wrap{
    flex:0 0 420px;display:flex;flex-direction:column;align-items:center;
    animation:sceneIn 0.9s cubic-bezier(0.16,1,0.3,1) both;
    position:relative;
  }
  @keyframes sceneIn{from{opacity:0;transform:translateX(-60px);}to{opacity:1;transform:translateX(0);}}

  /* scooter moves across screen */
  .scooter-lane{
    width:420px;height:320px;position:relative;overflow:hidden;
  }
  .scooter-mover{
    position:absolute;bottom:0;left:-50px;
    animation:driveAcross 4s cubic-bezier(0.4,0,0.6,1) infinite;
  }
  @keyframes driveAcross{
    0%  {left:-50px;opacity:1;}
    80% {left:440px;opacity:1;}
    81% {left:-50px;opacity:0;}
    100%{left:-50px;opacity:1;}
  }
  .scooter-bob{animation:bob 0.5s ease-in-out infinite alternate;transform-origin:center bottom;}
  @keyframes bob{from{transform:translateY(0);}to{transform:translateY(-5px);}}
  .wheel-spin{animation:spin 0.5s linear infinite;}
  @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  .puff{animation:puffOut 1s ease-out infinite;transform-origin:0 0;}
  .puff2{animation:puffOut 1s ease-out 0.35s infinite;transform-origin:0 0;}
  .puff3{animation:puffOut 1s ease-out 0.7s infinite;transform-origin:0 0;}
  @keyframes puffOut{0%{opacity:0.6;transform:scale(0.5) translateX(0);}100%{opacity:0;transform:scale(2.2) translateX(-18px);}}

  /* speech bubble above scooter */
  .bubble-over{
    position:absolute;top:30px;left:90px;
    background:#fff;border-radius:14px;padding:10px 16px;
    font-size:13px;font-weight:800;color:#1a1a1a;white-space:nowrap;
    box-shadow:0 4px 24px rgba(0,0,0,0.28);
    animation:bubblePop 0.5s cubic-bezier(0.34,1.56,0.64,1) 1s both, scooterBubble 4s cubic-bezier(0.4,0,0.6,1) infinite;
    z-index:20;pointer-events:none;
  }
  @keyframes bubblePop{from{opacity:0;transform:scale(0.3);}to{opacity:1;transform:scale(1);}}
  @keyframes scooterBubble{
    0%  {left:90px;opacity:1;}
    80% {left:480px;opacity:1;}
    81% {left:90px;opacity:0;}
    100%{left:90px;opacity:1;}
  }
  .bubble-over::after{content:'';position:absolute;bottom:-10px;left:22px;border:10px solid transparent;border-top-color:#fff;border-bottom:0;}

  /* form */
  .form-wrap{
    flex:0 0 340px;padding-bottom:20px;
    animation:formIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both;
  }
  @keyframes formIn{from{opacity:0;transform:translateX(40px);}to{opacity:1;transform:translateX(0);}}

  .brand{
    font-family:'Caveat',cursive;
    font-size:56px;font-weight:700;
    color:#fff;
    margin-bottom:28px;letter-spacing:-1px;line-height:1;
    display:flex;align-items:center;gap:6px;
  }
  .brand-bike{display:inline-block;vertical-align:middle;animation:brandBike 1.2s ease-in-out infinite alternate;}
  @keyframes brandBike{from{transform:translateX(-3px) rotate(-2deg);}to{transform:translateX(3px) rotate(2deg);}}

  .field-label{font-size:12px;font-weight:700;color:#888;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:6px;}
  .field-row{margin-bottom:18px;}
  .auth-field{
    width:100%;padding:14px 18px;
    font-size:15px;font-family:'Nunito',sans-serif;
    background:rgba(255,255,255,0.07);
    border:1.5px solid rgba(255,255,255,0.12);
    border-radius:10px;color:#fff;outline:none;
    transition:border-color 0.2s,box-shadow 0.2s,background 0.2s;
  }
  .auth-field::placeholder{color:rgba(255,255,255,0.3);}
  .auth-field:focus{
    border-color:#f0a000;
    background:rgba(255,165,0,0.07);
    box-shadow:0 0 0 3px rgba(240,160,0,0.15);
  }

  .actions-row{display:flex;align-items:center;gap:16px;margin:22px 0;}
  .btn-login{
    padding:14px 36px;font-size:16px;font-weight:900;font-family:'Nunito',sans-serif;
    background:linear-gradient(135deg,#f0a000 0%,#e05000 100%);
    color:#fff;border:none;border-radius:10px;cursor:pointer;
    transition:all 0.2s;
    box-shadow:0 4px 20px rgba(240,100,0,0.4);
    letter-spacing:0.03em;
  }
  .btn-login:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 28px rgba(240,100,0,0.55);}
  .btn-login:disabled{opacity:0.35;cursor:not-allowed;}

  .stay-check{display:flex;align-items:center;gap:8px;font-size:14px;color:rgba(255,255,255,0.5);font-weight:600;cursor:pointer;}
  .stay-check input{width:16px;height:16px;cursor:pointer;accent-color:#f0a000;}

  .links-row{display:flex;align-items:center;gap:10px;font-size:14px;}
  .act-link{color:#f0a000;font-weight:800;cursor:pointer;transition:opacity 0.2s;}
  .sep{color:rgba(255,255,255,0.2);}
  .act-link:hover{opacity:0.7;}

  .foot{margin-top:36px;font-size:11px;color:rgba(255,255,255,0.22);font-weight:500;}

  /* Fix 3: Shake and Error styles */
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    20%{transform:translateX(-5px)}
    40%{transform:translateX(5px)}
    60%{transform:translateX(-5px)}
    80%{transform:translateX(5px)}
  }
  .shake { animation: shake 0.4s ease; }
  .error-border { border: 1.5px solid #ef4444 !important; }
  .error-text { color: #ef4444; font-size: 12px; margin-top: 4px; animation: fadeIn 200ms ease both; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  /* divider */
  .divider { display:flex; align-items:center; gap:10px; margin:20px 0; }
  .divider-line{flex:1;height:1px;background:rgba(255,255,255,0.08);}
  .divider-text{font-size:12px;color:rgba(255,255,255,0.3);font-weight:600;}

  @media(max-width:760px){
    .layout{flex-direction:column;padding-top:24px;}
    .scene-wrap,.form-wrap{flex:unset;width:100%;max-width:420px;}
  }
`

export default function AuthScreens() {
  const { login, setBtsScore, btsScore, updateUser, user, token } = useApp()
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [place, setPlace] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [stayLogged, setStayLogged] = useState(false)
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const startSignup = () => {
    setIsLogin(false)
    setOnboardingStep(1)
    setStepErrors({})
    setSuccess(false)
    setLoading(false)
  }
  const [aadhaarFile, setAadhaarFile] = useState(null)
  const [aadhaarState, setAadhaarState] = useState('idle') // idle, analyzing, success, invalid, error
  const [aadhaarData, setAadhaarData] = useState(null)
  const [aadhaarError, setAadhaarError] = useState('')
  const [aadhaarVerified, setAadhaarVerified] = useState(false)

  // Memoize random stars so they don't re-render on input typing
  const starsList = React.useMemo(() => {
    return [...Array(80)].map((_, i) => ({
      size: Math.random() * 2.5 + 0.5,
      top: Math.random() * 65,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 1.5 + Math.random() * 2
    }))
  }, [])

  const isEmail = phone.includes('@');
  const isValid = isEmail ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(phone) : phone.replace(/\D/g, '').length >= 10 && (isLogin ? password : true)

  const [onboardingStep, setOnboardingStep] = useState(0) // 0: Login, 1-3: Signup steps
  const [platform, setPlatform] = useState('Zomato')
  const [vehicle, setVehicle] = useState('Motorcycle')
  const [rate, setRate] = useState(80)
  const [city, setCity] = useState('Mumbai')
  const [selectedPlan, setSelectedPlan] = useState('Standard')

  const [stepErrors, setStepErrors] = useState({})
  const [otpInput, setOtpInput] = useState('')
  const [isShaking, setIsShaking] = useState(false)

  const triggerShake = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 500)
  }

  const validateStep = (step) => {
    const errors = {}
    if (step === 1) {
      if (!name || name.trim().length < 2) errors.name = 'Enter your full name'
      const cleanPhone = phone.replace(/\D/g, '')
      if (cleanPhone.length !== 10) errors.phone = 'Enter a valid 10-digit number'
      if (!otpInput || otpInput.length !== 6) errors.otp = 'Enter the 6-digit OTP'
    } else if (step === 2) {
      if (!platform) errors.platform = 'Please select your platform'
      if (!vehicle) errors.vehicle = 'Please select your vehicle'
      if (!city || city === '') errors.city = 'Select your city'
    } else if (step === 3) {
      if (!selectedPlan) errors.plan = 'Please select a coverage plan'
    }
    
    if (Object.keys(errors).length > 0) {
      setStepErrors(errors)
      triggerShake()
      return false
    }
    setStepErrors({})
    return true
  }

  const handleAction = async () => {
    if (onboardingStep > 0 && onboardingStep <= 3) {
      if (!validateStep(onboardingStep)) return
      setIsLogin(false)
      if (onboardingStep < 3) {
        setOnboardingStep(prev => prev + 1)
        return
      }
    }

    setLoading(true)
    setStepErrors({})

    try {
      if (isLogin) {
        // --- REAL LOGIN FLOW ---
        const res = await fetch(`${API_BASE}/api/auth/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, otp: '123456' }) // Demo OTP
        })
        const data = await res.json()
        if (res.ok) {
          setSuccess(true)
          setTimeout(() => {
            login(data.user)
          }, 600)
        } else {
          throw new Error(data.error || 'Login failed')
        }
      } else {
        // --- REAL SIGNUP/ONBOARD FLOW ---
        const vRes = await fetch(`${API_BASE}/api/auth/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, otp: otpInput })
        })
        const vData = await vRes.json()
        if (!vRes.ok) throw new Error(vData.error || 'Verification failed')

        const oRes = await fetch(`${API_BASE}/api/auth/onboard`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${vData.token}`
          },
          body: JSON.stringify({ 
            name: name || 'Worker', 
            partner: platform, 
            zone: city, 
            plan: selectedPlan 
          })
        })
        const oData = await oRes.json()
        if (oRes.ok) {
          setSuccess(true)
          setTimeout(() => {
            login(oData.user)
          }, 600)
        } else {
          throw new Error(oData.error || 'Onboarding failed')
        }
      }
    } catch (err) {
      console.error("Auth Error:", err)
      setStepErrors({ auth: err.message })
      triggerShake()
    } finally {
      setLoading(false)
    }
  }

  const handleAadhaarUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setAadhaarState("analyzing")
    setAadhaarFile(file)
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const base64Data = e.target.result.split(",")[1]
        const mimeType = file.type
        await analyzeAadhaar(base64Data, mimeType, file.name)
      } catch (error) {
        console.error("File processing error:", error)
        setAadhaarState("error")
        setAadhaarError("Could not read document. Please upload a clear image.")
      }
    }
    reader.onerror = () => {
      console.error("FileReader error")
      setAadhaarState("error")
      setAadhaarError("Could not read document. Please upload a clear image.")
    }
    reader.readAsDataURL(file)
  }

  const analyzeAadhaar = async (base64Data, mimeType, fileName) => {
    try {
      // For demo purposes, use mock OCR response
      console.log("Using mock Aadhaar OCR response for demo")
      const mockExtracted = {
        name: "Priya Patel",
        aadhaarNumber: "XXXX XXXX 9012",
        dateOfBirth: "08/11/1992",
        gender: "Female",
        address: "Bangalore, Karnataka",
        pincode: "560001",
        isValidAadhaar: true,
        confidence: "HIGH"
      }
      
      handleAadhaarResult(mockExtracted, fileName)
    } catch (error) {
      console.error("Aadhaar OCR failed:", error)
      let errorMessage = "Could not read document. Please upload a clear image."
      if (error.message.includes("401")) errorMessage = "API authentication failed."
      else if (error.message.includes("429")) errorMessage = "API rate limit exceeded."
      else if (error.message.includes("500")) errorMessage = "OCR service unavailable."
      else if (error.message.includes("Payload Too Large")) errorMessage = "Image file too large."
      setAadhaarState("error")
      setAadhaarError(errorMessage)
    }
  }

  const handleAadhaarResult = (extracted, fileName) => {
    if (!extracted.isValidAadhaar) {
      setAadhaarState("invalid")
      setAadhaarError("This does not appear to be an Aadhaar card.")
      return
    }

    // Save to context with all extracted metadata
    updateUser({
      aadhaarUploaded: true,
      aadhaarName: extracted.name,
      aadhaarNumber: extracted.aadhaarNumber,
      aadhaarDOB: extracted.dateOfBirth,
      aadhaarGender: extracted.gender,
      aadhaarAddress: extracted.address,
      aadhaarPincode: extracted.pincode,
      aadhaarConfidence: extracted.confidence,
      btsScore: (user?.trustScore || 65) + 4
    })

    if (extracted.name) {
      setName(extracted.name)
      // Feedback flash
      const nameInput = document.querySelector('input[placeholder="John Doe"]')
      if (nameInput) {
        nameInput.style.borderColor = '#10b981'
        setTimeout(() => nameInput.style.borderColor = '', 1500)
      }
    }
    setAadhaarData(extracted)
    setAadhaarState("success")
  }

  const renderStep = () => {
    if (onboardingStep === 1) {

      return (
        <div style={{ animation: 'formIn 0.5s ease both' }}>
          <div style={{ color: '#f0a000', fontSize: '12px', fontWeight: '800', marginBottom: '8px' }}>STEP 1/3 — IDENTITY</div>
          <div className="field-row">
            <div className="field-label">Full Name</div>
            <input className={`auth-field ${stepErrors.name ? 'error-border' : ''}`} type="text" placeholder="John Doe" value={name} onChange={e => { setName(e.target.value); if(stepErrors.name) setStepErrors(prev => ({...prev, name: null })) }} />
            {aadhaarState === 'success' && aadhaarData?.name && name === aadhaarData.name && (
              <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px' }}>✓ Name auto-filled from Aadhaar</div>
            )}
            {stepErrors.name && <div className="error-text">{stepErrors.name}</div>}
          </div>
          <div className="field-row">
            <div className="field-label">Phone Number</div>
            <input className={`auth-field ${stepErrors.phone ? 'error-border' : ''}`} type="tel" placeholder="+91 98765 43210" value={phone} onChange={e => { setPhone(e.target.value); if(stepErrors.phone) setStepErrors(prev => ({...prev, phone: null })) }} />
            {stepErrors.phone && <div className="error-text">{stepErrors.phone}</div>}
          </div>
          <div className="field-row">
            <div className="field-label">OTP (Demo: 123456)</div>
            <div style={{ fontSize: '11px', color: '#888', marginBottom: '6px' }}>Demo OTP: 123456</div>
            <input className={`auth-field ${stepErrors.otp ? 'error-border' : ''}`} type="text" placeholder="123456" value={otpInput} onChange={e => { setOtpInput(e.target.value.slice(0, 6)); if(stepErrors.otp) setStepErrors(prev => ({...prev, otp: null })) }} />
            {stepErrors.otp && <div className="error-text">{stepErrors.otp}</div>}
          </div>

          <div className="field-row">
            <div className="field-label" style={{ marginBottom: '4px' }}>Upload Aadhaar Card</div>
            <div style={{ fontSize: '11px', color: '#666', marginBottom: '10px' }}>Optional · Adds +4 BTS points · Reduces premium</div>
            
            {aadhaarState === 'idle' && (
              <>
                <label style={{
                  display: 'block', border: '2px dashed #2a2a2a', borderRadius: '8px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 300ms', background: 'rgba(255,255,255,0.02)'
                }} onMouseOver={e => e.currentTarget.style.borderColor = '#f59e0b'} onMouseOut={e => e.currentTarget.style.borderColor = '#2a2a2a'}>
                  <input type="file" accept=".jpg,.jpeg,.png,.pdf" style={{ display: 'none' }} onChange={handleAadhaarUpload} />
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#ccc' }}>📄 Tap to upload Aadhaar Card</div>
                  <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>JPG · PNG · PDF · clear photo</div>
                  <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>Data is encrypted and secure</div>
                </label>
                <div style={{ fontSize: '11px', color: '#555', marginTop: '8px', textAlign: 'center' }}>
                  🔒 Your Aadhaar data is encrypted end-to-end.<br/>
                  Only the last 4 digits are stored.<br/>
                  We never share your data with third parties.<br/>
                  Compliant with UIDAI guidelines.
                </div>
                <div style={{ fontSize: '12px', color: '#555', marginTop: '12px', textAlign: 'center', cursor: 'pointer' }} onClick={() => { setIsLogin(false); setOnboardingStep(2) }}>
                  Skip for now — upload later in Profile
                </div>
              </>
            )}

            {aadhaarState === 'analyzing' && (
              <div style={{ background: '#1a1a1a', border: '2px dashed #f59e0b', borderRadius: '8px', padding: '20px', textAlign: 'center', animation: 'fadeIn 0.5s ease both' }}>
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>🔍</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Reading your Aadhaar...</div>
                <div style={{ fontSize: '12px', color: '#f59e0b' }}>AI OCR in progress</div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
                  <div style={{ width: '20px', height: '20px', border: '2px solid #f59e0b', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                </div>
              </div>
            )}

            {aadhaarState === 'success' && aadhaarData && (
              <div style={{ background: 'rgba(16,185,129,0.05)', border: '2px solid #10b981', borderRadius: '8px', padding: '16px', animation: 'fadeIn 0.5s ease both' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ color: '#10b981', fontSize: '16px', fontWeight: '700' }}>✅ Aadhaar Verified</div>
                  <div style={{ fontSize: '11px', color: '#555', cursor: 'pointer' }} onClick={() => { setAadhaarState('idle'); setAadhaarFile(null); setAadhaarData(null); }}>Re-upload</div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px', fontSize: '12px' }}>
                  <div style={{ color: '#888' }}>Name</div>
                  <div style={{ color: '#fff', fontWeight: '500' }}>{aadhaarData.name || 'N/A'}</div>
                  
                  <div style={{ color: '#888' }}>Aadhaar No</div>
                  <div style={{ color: '#fff', fontWeight: '500' }}>{aadhaarData.aadhaarNumber || 'N/A'}</div>
                  
                  <div style={{ color: '#888' }}>Date of Birth</div>
                  <div style={{ color: '#fff', fontWeight: '500' }}>{aadhaarData.dateOfBirth || 'N/A'}</div>
                  
                  <div style={{ color: '#888' }}>Gender</div>
                  <div style={{ color: '#fff', fontWeight: '500' }}>{aadhaarData.gender || 'N/A'}</div>
                  
                  <div style={{ color: '#888' }}>Address</div>
                  <div style={{ color: '#fff', fontWeight: '500', gridColumn: '2' }}>{aadhaarData.address || 'N/A'}</div>
                  
                  <div style={{ color: '#888' }}>Pincode</div>
                  <div style={{ color: '#fff', fontWeight: '500' }}>{aadhaarData.pincode || 'N/A'}</div>
                </div>
                
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid rgba(16,185,129,0.2)' }}>
                  <div style={{ fontSize: '11px', color: '#10b981', textAlign: 'center' }}>
                    Confidence: {aadhaarData.confidence} &nbsp;&nbsp; ✨ +4 BTS points added
                  </div>
                </div>
              </div>
            )}

            {aadhaarState === 'invalid' && (
              <div style={{ background: '#1a1a1a', border: '2px solid #ef4444', borderRadius: '8px', padding: '16px', textAlign: 'center', animation: 'fadeIn 0.5s ease both' }}>
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>❌</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Not an Aadhaar Card</div>
                <div style={{ fontSize: '12px', color: '#ef4444', marginBottom: '12px' }}>
                  Please upload a clear photo of your Aadhaar card (front side).
                </div>
                <button 
                  onClick={() => { setAadhaarState('idle'); setAadhaarFile(null); setAadhaarData(null) }}
                  style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                >
                  Try Again
                </button>
              </div>
            )}

            {aadhaarState === 'error' && (
              <div style={{ background: '#1a1a1a', border: '2px solid #f59e0b', borderRadius: '8px', padding: '16px', textAlign: 'center', animation: 'fadeIn 0.5s ease both' }}>
                <div style={{ fontSize: '20px', marginBottom: '8px' }}>⚠️</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>Could not read document</div>
                <div style={{ fontSize: '12px', color: '#888', marginBottom: '16px' }}>{aadhaarError || "Please upload a clearer image or try a different file format."}</div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <button 
                    onClick={() => { setAadhaarState('idle'); setAadhaarFile(null); }}
                    style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Try Again
                  </button>
                  <button 
                    onClick={() => {
                      // Demo fallback: Force success
                      handleAadhaarResult({
                        isValidAadhaar: true,
                        name: name || "Rahul Sharma",
                        aadhaarNumber: "XXXX XXXX 5678",
                        dateOfBirth: "12/03/1995",
                        gender: "Male",
                        address: city || "Delhi, India",
                        pincode: "110001",
                        confidence: "HIGH (Override)"
                      }, "demo_override.jpg");
                    }}
                    style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Force Verify (Demo)
                  </button>
                </div>
              </div>
            )}
          </div>

          <button className={`btn-login ${isShaking ? 'shake' : ''}`} style={{ width: '100%', marginTop: '10px' }} onClick={handleAction}>Next Step →</button>
        </div>
      )
    }

    if (onboardingStep === 2) {
      return (
        <div style={{ animation: 'formIn 0.5s ease both' }}>
          <div style={{ color: '#f0a000', fontSize: '12px', fontWeight: '800', marginBottom: '8px' }}>STEP 2/3 — DELIVERY PROFILE</div>
          <div className="field-row">
            <div className="field-label">Platform</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }} className={stepErrors.platform ? 'shake' : ''}>
              {['Zomato', 'Swiggy', 'Blinkit', 'Zepto'].map(p => (
                <button key={p} onClick={() => { setPlatform(p); setStepErrors(prev => ({ ...prev, platform: null }))}} style={{ 
                    padding: '8px 12px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px', fontWeight: '700',
                    background: platform === p ? '#f0a000' : 'rgba(255,255,255,0.06)',
                    border: platform === p ? 'none' : (stepErrors.platform ? '1.5px solid #ef4444' : '1.5px solid transparent'),
                    color: platform === p ? '#fff' : '#888',
                    transition: 'all 0.2s'
                }}>{p}</button>
              ))}
            </div>
            {stepErrors.platform && <div className="error-text">{stepErrors.platform}</div>}
          </div>
          <div className="field-row">
            <div className="field-label">Vehicle Type</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }} className={stepErrors.vehicle ? 'shake' : ''}>
              {['🏍️ Motorcycle', '🚲 Bicycle', '⚡ E-Bike'].map(v => (
                <button key={v} onClick={() => { setVehicle(v); setStepErrors(prev => ({ ...prev, vehicle: null }))}} style={{ 
                  padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', fontSize: '13px',
                  background: vehicle === v ? 'rgba(240,160,0,0.15)' : 'rgba(255,255,255,0.06)',
                  border: vehicle === v ? '1.5px solid #f0a000' : (stepErrors.vehicle ? '1.5px solid #ef4444' : '1.5px solid transparent'),
                  color: vehicle === v ? '#fff' : '#888',
                  transition: 'all 0.2s'
                }}>{v}</button>
              ))}
            </div>
            {stepErrors.vehicle && <div className="error-text">{stepErrors.vehicle}</div>}
          </div>
          <div className="field-row">
            <div className="field-label">Hourly Rate: ₹{rate}</div>
            <input type="range" min="50" max="200" step="10" value={rate} onChange={e => setRate(e.target.value)} style={{ width: '100%', accentColor: '#f0a000', marginTop: '10px' }} />
          </div>
          <div className="field-row">
            <div className="field-label">City</div>
            <select className={`auth-field ${stepErrors.city ? 'error-border' : ''}`} value={city} onChange={e => { setCity(e.target.value); setStepErrors(prev => ({ ...prev, city: null }))}} style={{ background: '#1a1a1a' }}>
              <option value="">Select a city...</option>
              <option>Mumbai</option>
              <option>Delhi</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Hyderabad</option>
            </select>
            {stepErrors.city && <div className="error-text">{stepErrors.city}</div>}
          </div>
          <button className={`btn-login ${isShaking ? 'shake' : ''}`} style={{ width: '100%', marginTop: '10px' }} onClick={handleAction}>Next Step →</button>
        </div>
      )
    }

    if (onboardingStep === 3) {
      return (
        <div style={{ animation: 'formIn 0.5s ease both' }}>
          <div style={{ color: '#f0a000', fontSize: '12px', fontWeight: '800', marginBottom: '8px' }}>STEP 3/3 — CHOOSE PLAN</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }} className={stepErrors.plan ? 'shake' : ''}>
            {[
              { id: 'Basic', price: 25, cap: 300, features: 'Rain + AQI', icon: '🆕' },
              { id: 'Standard', price: 20, cap: 600, features: 'All triggers', icon: '✅', popular: true },
              { id: 'Trusted', price: 15, cap: 1000, features: 'All + Priority', icon: '⭐' }
            ].map(p => (
              <div key={p.id} onClick={() => { setSelectedPlan(p.id); setStepErrors(prev => ({ ...prev, plan: null }))}} style={{
                padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', position: 'relative',
                background: selectedPlan === p.id ? 'rgba(240,160,0,0.1)' : 'rgba(255,255,255,0.04)',
                border: selectedPlan === p.id ? '1.5px solid #f0a000' : (stepErrors.plan ? '1.5px solid #ef4444' : '1.5px solid rgba(255,255,255,0.08)')
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '800', fontSize: '14px' }}>{p.icon} {p.id}</span>
                  <span style={{ color: '#f0a000', fontWeight: '900' }}>₹{p.price}/wk</span>
                </div>
                <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>₹{p.cap}/day cap • {p.features}</div>
                {p.popular && <div style={{ position: 'absolute', top: '-8px', right: '12px', background: '#f0a000', color: '#fff', padding: '2px 8px', borderRadius: '999px', fontSize: '9px', fontWeight: '900' }}>POPULAR</div>}
              </div>
            ))}
          </div>
          {stepErrors.plan && <div className="error-text" style={{ textAlign: 'center', marginBottom: '16px' }}>{stepErrors.plan}</div>}
          {success ? (
             <div style={{ animation: 'successPulse 0.6s ease', textAlign: 'center', padding: '16px', color: '#10b981', fontWeight: '800', fontSize: '14px' }}>
               ✓ Policy Active!
               <div style={{ fontSize: '12px', color: '#888', marginTop: '12px', fontWeight: '600' }}>
                 Your first premium of ₹{[25,20,15][['Basic','Standard','Trusted'].indexOf(selectedPlan)]} will be auto-deducted this Sunday from your {platform} settlement.
               </div>
             </div>
          ) : (
            <button className={`btn-login ${isShaking ? 'shake' : ''}`} style={{ width: '100%' }} onClick={handleAction} disabled={loading}>{loading ? 'Activating...' : 'Activate Policy →'}</button>
          )}
          <style>{`
            @keyframes successPulse { 
              0% { opacity: 0; transform: scale(0.9); }
              50% { transform: scale(1.05); }
              100% { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      )
    }

    // Default login form
    return (
      <>
        <div className="field-row">
          <div className="field-label">Phone or Email</div>
          <input className="auth-field" type="text" placeholder="e.g. +91 98765 43210 or user@email.com" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div className="field-row">
          <div className="field-label">Password</div>
          <input className="auth-field" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="actions-row">
          <button className="btn-login" disabled={!isValid || loading} onClick={handleAction}>
            {loading ? 'Logging in...' : 'Log In →'}
          </button>
          <label className="stay-check">
            <input type="checkbox" checked={stayLogged} onChange={e => setStayLogged(e.target.checked)} /> 
            Stay Logged In
          </label>
        </div>
        <div className="links-row">
          <span className="act-link" onClick={startSignup}>Create account</span>
          <span className="sep">|</span>
          <span className="act-link">Forgot password?</span>
        </div>
      </>
    )
  }

  return (
    <div className="auth-root">
      <style>{css}</style>
      <div className="stars">
        {starsList.map((s, i) => (
          <div key={i} className="star" style={{ width: s.size, height: s.size, top: s.top + '%', left: s.left + '%', animationDelay: s.delay + 's', animationDuration: s.duration + 's' }} />
        ))}
      </div>
      <div className="moon" />
      <svg className="skyline" viewBox="0 0 1200 220" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="120" width="38" height="100" fill="#1a1a2e"/><rect x="4" y="108" width="30" height="14" fill="#22223b"/><rect x="44" y="90" width="52" height="130" fill="#16213e"/><rect x="52" y="78" width="36" height="14" fill="#1a1a2e"/><rect x="60" y="65" width="20" height="16" fill="#16213e"/><rect x="100" y="105" width="42" height="115" fill="#0f3460"/><rect x="108" y="92" width="26" height="15" fill="#16213e"/><rect x="106" y="118" width="6" height="5" fill="#FFE082" opacity="0.9"/><rect x="148" y="80" width="60" height="140" fill="#1a1a2e"/><rect x="158" y="65" width="40" height="17" fill="#22223b"/><rect x="168" y="52" width="20" height="15" fill="#16213e"/><line x1="178" y1="40" x2="178" y2="20" stroke="#334" strokeWidth="2"/><circle cx="178" cy="18" r="3" fill="#ff4444"/><rect x="218" y="100" width="44" height="120" fill="#16213e"/><rect x="280" y="70" width="70" height="150" fill="#1a1a2e"/><rect x="286" y="78" width="7" height="6" fill="#4FC3F7" opacity="0.6"/><rect x="358" y="110" width="36" height="110" fill="#0f3460"/><rect x="400" y="60" width="80" height="160" fill="#1a1a2e"/><rect x="488" y="85" width="55" height="135" fill="#16213e"/><rect x="550" y="100" width="44" height="120" fill="#22223b"/><rect x="600" y="75" width="65" height="145" fill="#0f3460"/><circle cx="632" cy="28" r="3" fill="#ff4444"/><rect x="672" y="90" width="50" height="130" fill="#1a1a2e"/><rect x="730" y="112" width="38" height="108" fill="#16213e"/><rect x="775" y="68" width="72" height="152" fill="#0f3460"/><rect x="854" y="95" width="46" height="125" fill="#22223b"/><rect x="906" y="78" width="60" height="142" fill="#16213e"/><circle cx="936" cy="30" r="3" fill="#ff4444"/><rect x="972" y="102" width="42" height="118" fill="#0f3460"/><rect x="1020" y="80" width="58" height="140" fill="#1a1a2e"/><rect x="1084" y="96" width="44" height="124" fill="#16213e"/><rect x="1134" y="88" width="66" height="132" fill="#22223b"/>
      </svg>
      <div className="road"></div><div className="road-line"></div>
      <div className="layout">
        <div className="scene-wrap">
          <div className="bubble-over">🛵 Protecting gig heroes!</div>
          <div className="scooter-lane">
            <div className="scooter-mover">
              <div className="scooter-bob">
                <svg viewBox="0 0 310 220" width="310" height="220" xmlns="http://www.w3.org/2000/svg">
                  {/* Scooter Body */}
                  <path d="M72 155 Q90 120 150 118 Q195 118 218 138 Q228 150 226 165 Q200 172 148 172 Q98 174 68 170 Z" fill="#E53935"/>
                  
                  {/* Delivery Box */}
                  <rect x="68" y="90" width="62" height="50" rx="5" fill="#F9A825"/>
                  <text x="79" y="128" fontSize="8.5" fontWeight="900" fill="#E53935" fontFamily="Arial">PayNest</text>
                  
                  {/* Gig Worker */}
                  <g className="scooter-bob">
                    {/* Head/Helmet */}
                    <circle cx="165" cy="75" r="15" fill="#1a1622" />
                    <path d="M162 72 h12 v4 h-12 z" fill="#F9A825" /> {/* Helmet visor detail */}
                    
                    {/* Body/Jacket */}
                    <path d="M148 90 q15 0 25 25 l-35 5 z" fill="#1e293b" />
                    
                    {/* Arm reaching for handle */}
                    <path d="M168 98 l28 12" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
                  </g>

                  {/* Scooter Details */}
                  <path d="M210 138 l12 -45" stroke="#E53935" strokeWidth="6" strokeLinecap="round" />
                  <rect x="215" y="90" width="8" height="5" rx="2" fill="#333" /> {/* Handle */}

                  {/* Wheels */}
                  <circle cx="62" cy="172" r="26" fill="#1a1a1a"/><circle cx="228" cy="174" r="24" fill="#1a1a1a"/>
                  <circle cx="62" cy="172" r="10" fill="#333"/><circle cx="228" cy="174" r="10" fill="#333"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="form-wrap">
          <div className="brand">Pay<span className="brand-bike">🚲</span>nest</div>
          {renderStep()}
          <div className="divider"><div className="divider-line"></div><div className="divider-text">Gig Worker Logic</div><div className="divider-line"></div></div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>🛡️ Insured</div>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: '700' }}>⚡ Instant Payouts</div>
          </div>
          <div className="foot">© 2026 PayNest Insurance</div>
        </div>
      </div>
    </div>
  )
}
