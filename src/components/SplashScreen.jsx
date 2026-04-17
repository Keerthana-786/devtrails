import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [showText, setShowText] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const text = 'PayNest';

  // Logo animation - after 800ms, start typing
  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setShowText(true);
    }, 800);
    return () => clearTimeout(logoTimer);
  }, []);

  // Text typing animation
  useEffect(() => {
    if (!showText) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // After typing completes, wait 1.5s then call onComplete
        const completeTimer = setTimeout(() => {
          onComplete();
        }, 1500);
        return () => clearTimeout(completeTimer);
      }
    }, 120); // Typing speed

    return () => clearInterval(typingInterval);
  }, [showText, onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #0F0F1A 0%, #1a1f2e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        gap: '24px'
      }}
    >
      {/* Animated Logo */}
      <div
        style={{
          animation: 'fadeInScale 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
        }}
      >
        <img
          src="/paynest2.png"
          alt="PayNest Logo"
          style={{
            width: '120px',
            height: '120px',
            objectFit: 'contain'
          }}
        />
      </div>

      {/* Typing Text */}
      <div
        style={{
          fontSize: '48px',
          fontWeight: '800',
          color: '#00F2FF',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '-1px',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          minWidth: '300px',
          justifyContent: 'center'
        }}
      >
        {displayText}
        {showText && displayText.length < text.length && (
          <span
            style={{
              marginLeft: '4px',
              animation: 'blink 0.7s infinite',
              color: '#6C63FF'
            }}
          >
            |
          </span>
        )}
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontSize: '14px',
          color: 'rgba(0, 242, 255, 0.6)',
          marginTop: '12px',
          fontFamily: "'Roboto Mono', monospace",
          letterSpacing: '2px',
          textTransform: 'uppercase',
          animation: 'fadeIn 1.2s ease-in forwards',
          opacity: 0
        }}
      >
        AI Income Protection
      </p>

      {/* Loading dots */}
      <div
        style={{
          marginTop: '40px',
          display: 'flex',
          gap: '8px'
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#6C63FF',
              animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes blink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
