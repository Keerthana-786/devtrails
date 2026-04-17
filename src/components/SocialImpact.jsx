import React, { useState, useEffect } from 'react';

// ── Animated Number Component ──────────────────────────────────────────────
function AnimatedNumber({ value, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const endValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(percentage * endValue));

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function SocialImpact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div style={{
      padding: '40px',
      background: '#0B0E14',
      color: '#fff',
      fontFamily: "'Outfit', sans-serif",
      borderRadius: '24px',
      border: '1px solid rgba(255,255,255,0.05)',
      marginBottom: '40px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s ease-out'
    }}>
      <h1 style={{
        fontSize: '32px',
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: '40px',
        background: 'linear-gradient(90deg, #10B981, #3B82F6)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-1px'
      }}>
        SOCIAL IMPACT REPORT
      </h1>

      {/* PART 1 - Animated impact counters */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '60px' }}>
        {/* THE PROBLEM */}
        <div style={{ padding: '30px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '20px', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
          <h2 style={{ color: '#EF4444', fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px' }}>THE PROBLEM</h2>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#EF4444' }}>₹<AnimatedNumber value="21600" /> Crore</div>
            <div style={{ fontSize: '14px', color: '#94A3B8' }}>Lost annually by gig workers</div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#EF4444' }}><AnimatedNumber value="12000000" /></div>
            <div style={{ fontSize: '14px', color: '#94A3B8' }}>Workers with zero protection</div>
          </div>
          <div>
            <div style={{ fontSize: '36px', fontWeight: '900', color: '#EF4444' }}><AnimatedNumber value={4} />-<AnimatedNumber value={6} /> days</div>
            <div style={{ fontSize: '14px', color: '#94A3B8' }}>Income lost per worker per month</div>
          </div>
        </div>

        {/* OUR IMPACT */}
        <div style={{ padding: '30px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '20px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
          <h2 style={{ color: '#10B981', fontSize: '14px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px' }}>OUR IMPACT SO FAR</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#10B981' }}><AnimatedNumber value="2847" /></div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>Workers protected</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#10B981' }}>₹<AnimatedNumber value="1340000" /></div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>Income saved</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#10B981' }}><AnimatedNumber value="439" /></div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>Auto-claims processed</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#10B981' }}><AnimatedNumber value="8.3" /> min</div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>Avg payout time</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#10B981' }}><AnimatedNumber value="23" /></div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>Fraud attempts blocked</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: '#10B981' }}>₹<AnimatedNumber value="0" /></div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>Claim processing cost</div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 2 - Social Impact Metrics */}
      <div style={{ background: 'rgba(59, 130, 246, 0.05)', borderRadius: '24px', padding: '40px', marginBottom: '60px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', textAlign: 'center', marginBottom: '40px', color: '#3B82F6' }}>SOCIAL IMPACT METRICS</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: '900', color: '#10B981', marginBottom: '16px' }}>₹<AnimatedNumber value="48000" /></div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '12px' }}>Income Protection per Worker/Year</h3>
            <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.5' }}>
              Based on average ₹4,000 monthly earnings for delivery workers in metro cities,
              PayNest protects 20% of annual income (₹48,000) vs. zero protection before.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: '900', color: '#10B981', marginBottom: '16px' }}><AnimatedNumber value="75" />%</div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '12px' }}>Reduction in Informal Debt-Taking</h3>
            <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.5' }}>
              Gig workers borrow from informal lenders at 10-15% monthly interest.
              PayNest reduces this by 75% through guaranteed payouts during disruptions.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', fontWeight: '900', color: '#10B981', marginBottom: '16px' }}>₹<AnimatedNumber value="18000" /></div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#E2E8F0', marginBottom: '12px' }}>Coverage Gap PayNest Closes</h3>
            <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.5' }}>
              Traditional insurance covers only ₹30,000/year for gig workers.
              PayNest closes the ₹18,000 gap through parametric triggers and zero-touch claims.
            </p>
          </div>
        </div>
      </div>

      {/* PART 2 - Before vs After comparison */}
      <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '24px', padding: '40px', marginBottom: '60px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#94A3B8', textAlign: 'center', marginBottom: '30px', letterSpacing: '2px' }}>BEFORE PAYNEST</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ padding: '15px', background: 'rgba(239, 68, 68, 0.03)', borderRadius: '12px', textAlign: 'center' }}>Rain = ₹0 income</div>
              <div style={{ padding: '15px', background: 'rgba(239, 68, 68, 0.03)', borderRadius: '12px', textAlign: 'center' }}>No safety net</div>
              <div style={{ padding: '15px', background: 'rgba(239, 68, 68, 0.03)', borderRadius: '12px', textAlign: 'center' }}>Manual file claims</div>
              <div style={{ padding: '15px', background: 'rgba(239, 68, 68, 0.03)', borderRadius: '12px', textAlign: 'center' }}>Wait 2-3 weeks</div>
              <div style={{ padding: '15px', background: 'rgba(239, 68, 68, 0.03)', borderRadius: '12px', textAlign: 'center' }}>English only</div>
              <div style={{ padding: '15px', background: 'rgba(239, 68, 68, 0.03)', borderRadius: '12px', textAlign: 'center' }}>₹0 protection</div>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#10B981', textAlign: 'center', marginBottom: '30px', letterSpacing: '2px' }}>AFTER PAYNEST</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', textAlign: 'center', color: '#10B981', fontWeight: '700' }}>Rain = ₹480 guaranteed</div>
              <div style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', textAlign: 'center', color: '#10B981', fontWeight: '700' }}>Coverage in 3 minutes</div>
              <div style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', textAlign: 'center', color: '#10B981', fontWeight: '700' }}>Zero action needed</div>
              <div style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', textAlign: 'center', color: '#10B981', fontWeight: '700' }}>Paid in 10 minutes</div>
              <div style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', textAlign: 'center', color: '#10B981', fontWeight: '700' }}>7 Indian languages</div>
              <div style={{ padding: '15px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '12px', textAlign: 'center', color: '#10B981', fontWeight: '700' }}>₹3,000/week covered</div>
            </div>
          </div>
        </div>
      </div>

      {/* PART 3 - One powerful quote */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))',
        padding: '50px',
        borderRadius: '24px',
        textAlign: 'center',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <div style={{ fontSize: '40px', marginBottom: '20px' }}>"</div>
        <p style={{
          fontSize: '28px',
          fontWeight: '700',
          lineHeight: '1.4',
          marginBottom: '30px',
          color: '#E2E8F0',
          maxWidth: '800px',
          margin: '0 auto 30px auto'
        }}>
          When it rains, I used to lose everything. 
          Now I get ₹480 in my account automatically. 
          I didn't even have to call anyone.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: '900', color: '#fff' }}>Worker #A4X7, Andheri Mumbai</div>
          <div style={{ fontSize: '14px', color: '#94A3B8', marginTop: '5px' }}>Zomato Delivery Partner, 3 years</div>
        </div>
      </div>
    </div>
  );
}
