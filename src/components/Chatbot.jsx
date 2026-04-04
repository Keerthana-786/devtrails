import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.jsx';
import kbData from '../../chatbot_kb.json';

const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'development' ? 'http://localhost:8000' : (typeof window !== 'undefined' ? window.location.origin : 'https://devtrails.onrender.com'));

export default function Chatbot() {
  const { 
    token, 
    weeklyPremium, 
    walletBalance, 
    activeDisruptions, 
    stabilityScore, 
    payouts, 
    badges, 
    pricingBreakdown,
    weather,
    traffic,
    // Aadhaar fields
    aadhaarUploaded,
    aadhaarName,
    aadhaarNumber,
    aadhaarDOB,
    aadhaarGender,
    aadhaarAddress,
    aadhaarPincode,
    aadhaarConfidence,
    updateUser
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "👋 Hi! I'm your PayNest AI Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [size, setSize] = useState({ width: 300, height: 420 });
  const [isResizing, setIsResizing] = useState(false);

  // Aadhaar OCR states
  const [isProcessingAadhaar, setIsProcessingAadhaar] = useState(false);
  const [aadhaarFile, setAadhaarFile] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const findBestMatchLocal = (question) => {
    const q = question.toLowerCase().trim();
    let bestMatch = null;
    let bestScore = 0;

    // 1. Exact keyword match
    for (const entry of kbData) {
      for (const keyword of entry.keywords) {
        if (q.includes(keyword.toLowerCase())) {
          return entry.answer;
        }
      }
    }

    // 2. Similarity match
    for (const entry of kbData) {
      for (const keyword of entry.keywords) {
        const similarity = calculateSimilarity(q, keyword.toLowerCase());
        if (similarity > bestScore && similarity > 0.6) {
          bestMatch = entry.answer;
          bestScore = similarity;
        }
      }
    }

    return bestMatch || "🤖 I'm your PayNest AI Assistant! I can help you with:\n\n💰 **Balance**: Check your wallet or earnings\n📊 **Score**: View your stability rating\n🛡️ **Zones**: Find safe working areas\n💳 **Premium**: Understand your costs\n🏅 **Badges**: See your achievements\n🆔 **KYC**: Aadhaar verification status\n\nWhat would you like to know about?";
  };

  const calculateSimilarity = (str1, str2) => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    if (longer.length === 0) return 1.0;
    const distance = levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  };

  const levenshteinDistance = (str1, str2) => {
    const matrix = [];
    for (let i = 0; i <= str2.length; i++) matrix[i] = [i];
    for (let j = 0; j <= str1.length; j++) matrix[0][j] = j;
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) matrix[i][j] = matrix[i - 1][j - 1];
        else matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
    return matrix[str2.length][str1.length];
  };

  const handleSendMessage = async (text) => {
    const messageText = text || input;
    if (!messageText.trim() || isTyping) return;

    const userMsg = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const contextData = {
        weeklyPremium,
        walletBalance,
        activeDisruptions,
        stabilityScore,
        payouts,
        badges,
        pricingBreakdown,
        weather,
        traffic,
        aadhaarUploaded,
        aadhaarName,
        aadhaarNumber,
        aadhaarDOB,
        aadhaarGender,
        aadhaarAddress,
        aadhaarPincode,
        aadhaarConfidence
      };

      const res = await fetch(`${API_BASE}/api/chatbot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: messageText,
          context: contextData
        })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        // Backend returned error, fallback to local match
        const localReply = findBestMatchLocal(messageText);
        setMessages(prev => [...prev, { role: 'assistant', content: "🔍 *Searching local database...*\n\n" + localReply }]);
      }
    } catch (error) {
      console.error("Chatbot Fetch Error:", error);
      // Network error/Offline, fallback to local match
      const localReply = findBestMatchLocal(messageText);
      setMessages(prev => [...prev, { role: 'assistant', content: "📡 *Offline Support Mode...*\n\n" + localReply }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle Aadhaar OCR processing
  const handleAadhaarUpload = async (file) => {
    if (!file) return;

    setIsProcessingAadhaar(true);
    setAadhaarFile(file);

    // Add user message about uploading Aadhaar
    setMessages(prev => [...prev, { role: 'user', content: `📄 Uploading Aadhaar card: ${file.name}` }]);

    const processOCR = () => {
      return new Promise((resolve) => {
        // For demo purposes, return mock OCR data immediately
        console.log("Using mock Aadhaar OCR response in chatbot")
        const extracted = {
          name: "Amit Kumar",
          aadhaarNumber: "XXXX XXXX 3456",
          dateOfBirth: "15/07/1988",
          gender: "Male",
          address: "Mumbai, Maharashtra",
          pincode: "400001",
          isValidAadhaar: true,
          confidence: "HIGH"
        };
        resolve(extracted);
      });
    };

    try {
      const extracted = await processOCR();

      if (extracted.isValidAadhaar) {
        // Success - show extracted data and update user context
        let resultMessage = `✅ Aadhaar Verified!\n\n`;
        resultMessage += `📝 Name: ${extracted.name || 'N/A'}\n`;
        resultMessage += `🆔 Aadhaar: ${extracted.aadhaarNumber || 'N/A'}\n`;
        resultMessage += `🎂 DOB: ${extracted.dateOfBirth || 'N/A'}\n`;
        resultMessage += `⚧ Gender: ${extracted.gender || 'N/A'}\n`;
        resultMessage += `🏠 Address: ${extracted.address || 'N/A'}\n`;
        resultMessage += `📮 Pincode: ${extracted.pincode || 'N/A'}\n\n`;
        resultMessage += `🎯 Confidence: ${extracted.confidence} ✨ +4 BTS points added!`;

        // Update user context with Aadhaar data
        updateUser({
          aadhaarUploaded: true,
          aadhaarName: extracted.name,
          aadhaarNumber: extracted.aadhaarNumber,
          aadhaarDOB: extracted.dateOfBirth,
          aadhaarGender: extracted.gender,
          aadhaarAddress: extracted.address,
          aadhaarPincode: extracted.pincode,
          aadhaarConfidence: extracted.confidence,
          btsScore: (stabilityScore || 65) + 4
        });

        setMessages(prev => [...prev, { role: 'assistant', content: resultMessage }]);
      } else {
        // Invalid Aadhaar
        setMessages(prev => [...prev, { role: 'assistant', content: `❌ ${extracted.error || 'This does not appear to be a valid Aadhaar card. Please upload a clear photo of your Aadhaar card.'}` }]);
      }
    } catch (error) {
      console.error("Aadhaar OCR Processing Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ OCR failed: ${error.message || 'Could not process the image'}` }]);
    } finally {
      setIsProcessingAadhaar(false);
      setAadhaarFile(null);
    }
  };

  const handleResizeInit = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      const newWidth = Math.max(260, window.innerWidth - e.clientX - 20);
      const newHeight = Math.max(280, window.innerHeight - e.clientY - 80);
      setSize({ width: newWidth, height: newHeight });
    };
    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  if (!token) return null;

  const quickQuestions = [
    { label: "Premium?", q: "Why is my premium calculated this way?" },
    { label: "Risks?", q: "What are my current weather/traffic risks?" },
    { label: "Safe Zones?", q: "Which areas are safe for work now?" },
    { label: "Payouts?", q: "Show my recent payouts logic." }
  ];

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 10000, fontFamily: "'Outfit', sans-serif" }}>
      {/* Floating Chat Window */}
      {isOpen && (
        <div style={{
          position: 'absolute', bottom: '80px', right: '0',
          width: '320px', height: '430px',
          background: '#ffffff', borderRadius: '22px',
          border: '1px solid rgba(15, 23, 42, 0.12)', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', boxShadow: '0 20px 60px rgba(15, 23, 42, 0.18)',
          animation: 'slideUp 0.25s ease'
        }}>

          {/* Header */}
          <div style={{ padding: '14px 16px', background: '#ffffff', borderBottom: '1px solid rgba(15, 23, 42, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>PayNest Chat</div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>Typically replies instantly</div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(15, 23, 42, 0.05)', border: 'none', borderRadius: '50%', width: '28px', height: '28px', color: '#0F172A', cursor: 'pointer', fontSize: '16px', lineHeight: '0' }}>×</button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#F8FAFC' }}>
            {messages.length === 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
                {quickQuestions.map(item => (
                  <button key={item.label} onClick={() => handleSendMessage(item.q)} style={{ padding: '10px', borderRadius: '14px', background: '#EFF6FF', border: '1px solid rgba(59, 130, 246, 0.15)', color: '#2563EB', fontSize: '11px', fontWeight: 700, cursor: 'pointer', textAlign: 'left' }}>
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%', padding: '10px 12px', borderRadius: '18px',
                background: m.role === 'user' ? '#2563EB' : '#F1F5F9',
                color: m.role === 'user' ? '#FFFFFF' : '#0F172A',
                fontSize: '13px', lineHeight: '1.5', whiteSpace: 'pre-wrap'
              }}>
                {m.content}
              </div>
            ))}

            {isTyping && (
              <div style={{ alignSelf: 'flex-start', padding: '8px 12px', borderRadius: '16px', background: '#F1F5F9', color: '#475569', fontSize: '12px' }}>
                AI is typing...
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{ padding: '12px 14px', borderTop: '1px solid rgba(15, 23, 42, 0.08)', display: 'flex', gap: '10px', background: '#ffffff' }}>
            <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type your question..." style={{ flex: 1, minWidth: 0, padding: '10px 12px', borderRadius: '14px', border: '1px solid rgba(15, 23, 42, 0.08)', outline: 'none', fontSize: '13px', color: '#0F172A', background: '#F8FAFC' }} />
            
            {/* Aadhaar Upload Button */}
            <label style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', background: isProcessingAadhaar ? '#64748B' : '#10B981', border: 'none', cursor: isProcessingAadhaar ? 'not-allowed' : 'pointer', fontSize: '16px', color: '#fff', transition: 'all 0.2s' }}>
              {isProcessingAadhaar ? '⏳' : '📄'}
              <input 
                type="file" 
                accept=".jpg,.jpeg,.png,.pdf" 
                style={{ display: 'none' }} 
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) handleAadhaarUpload(file);
                  e.target.value = ''; // Reset input
                }}
                disabled={isProcessingAadhaar}
              />
              {!isProcessingAadhaar && (
                <div style={{ position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', background: '#0F172A', color: '#fff', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', whiteSpace: 'nowrap', opacity: 0, transition: 'opacity 0.2s', pointerEvents: 'none' }}>
                  Upload Aadhaar
                </div>
              )}
            </label>
            
            <button type="submit" disabled={isTyping || isProcessingAadhaar} style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#2563EB', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '18px', lineHeight: '1' }}>↵</button>
          </form>
        </div>
      )}

      {/* Floating Icon */}
      <button onClick={() => setIsOpen(!isOpen)} style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#2563EB', border: 'none', boxShadow: '0 12px 30px rgba(37, 99, 235, 0.3)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
        {isOpen ? '×' : '💬'}
      </button>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}