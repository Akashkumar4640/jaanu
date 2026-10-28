import React, { useState } from 'react';
import { playSound } from '../utils/audio';
import { Check, Heart, Shield, Smile, Star, Sparkles, Feather } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PromiseListSceneProps {
  checkedPromises: number[];
  onTogglePromise: (index: number) => void;
  promisesSealed: boolean;
  onSealPromises: () => void;
  signatureUrl: string;
  onNext: () => void;
  soundEnabled: boolean;
}

const PROMISES = [
  { text: "I'll be the Best Caring Friend Forever", icon: Heart, color: '#f43f5e' },
  { text: "I'll Never Break your Trust Again", icon: Shield, color: '#9333ea' },
  { text: "I'll Never make you cry again because of me", icon: Smile, color: '#3b82f6' },
  { text: "I'll Never judge you for any reason", icon: Star, color: '#f59e0b' },
  { text: "I'll be Supportive to you to achieve your dream", icon: Sparkles, color: '#10b981' }
];

export const PromiseListScene: React.FC<PromiseListSceneProps> = ({
  checkedPromises,
  onTogglePromise,
  promisesSealed,
  onSealPromises,
  signatureUrl,
  onNext,
  soundEnabled
}) => {
  const [sealed, setSealed] = useState(promisesSealed);

  // Ensure all 5 promises are pre-checked by default
  const activeChecked = checkedPromises && checkedPromises.length > 0 ? checkedPromises : [0, 1, 2, 3, 4];

  const handleCheckboxClick = (idx: number) => {
    onTogglePromise(idx);
    if (soundEnabled) {
      playSound.promiseCheck();
    }
  };

  const handleSealClick = () => {
    setSealed(true);
    onSealPromises();
    if (soundEnabled) {
      playSound.celebration();
    }
    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#fda4af', '#f472b6', '#c084fc', '#fef08a']
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <div
      className="scene-viewport paper-texture"
      style={{
        background: 'linear-gradient(180deg, #fffdfa 0%, #fdf2f8 50%, #faf5ef 100%)',
        textAlign: 'center',
        padding: 'clamp(8px, 1.8vh, 16px) clamp(10px, 2.5vw, 20px)',
        justifyContent: 'space-evenly'
      }}
    >
      <div
        style={{
          maxWidth: '640px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}
      >
        {/* Title */}
        <div style={{ flexShrink: 0, marginBottom: 'clamp(2px, 0.5vh, 6px)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3.2vh, 2.4rem)',
              color: '#4a044e',
              fontWeight: 700,
              lineHeight: 1.1,
              margin: 0
            }}
          >
            Promise List
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: 'clamp(0.85rem, 1.7vh, 1.15rem)',
              color: '#831843',
              marginTop: '2px',
              marginBottom: 0
            }}
          >
            Little promises. A stronger friendship. Always. ♡
          </p>
        </div>

        {/* 5 Completed Promise Cards - Pre-checked with visible tick marks */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(4px, 0.9vh, 8px)',
            width: '100%',
            flexShrink: 1
          }}
        >
          {PROMISES.map((promise, index) => {
            const isChecked = activeChecked.includes(index);
            const Icon = promise.icon;

            return (
              <div
                key={index}
                onClick={() => handleCheckboxClick(index)}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') handleCheckboxClick(index);
                }}
                className="glass-card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(8px, 1.5vw, 14px)',
                  padding: 'clamp(6px, 1vh, 10px) clamp(12px, 2vw, 18px)',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  border: isChecked ? '1.5px solid #f472b6' : '1px solid rgba(251, 207, 232, 0.6)',
                  background: isChecked ? 'rgba(253, 242, 248, 0.96)' : 'rgba(255, 255, 255, 0.88)',
                  boxShadow: isChecked
                    ? '0 3px 12px rgba(244, 114, 182, 0.18)'
                    : '0 2px 6px rgba(112, 26, 117, 0.04)',
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                {/* Number Badge */}
                <div
                  style={{
                    width: 'clamp(22px, 2.5vh, 28px)',
                    height: 'clamp(22px, 2.5vh, 28px)',
                    borderRadius: '50%',
                    background: isChecked ? promise.color : '#fed7aa',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 'clamp(0.72rem, 1.4vh, 0.88rem)',
                    flexShrink: 0,
                    boxShadow: isChecked ? `0 2px 6px ${promise.color}50` : 'none',
                    transition: 'background 0.3s ease'
                  }}
                >
                  {index + 1}
                </div>

                {/* Promise Text & Decorative Icon */}
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left', minWidth: 0 }}>
                  <Icon size={16} color={promise.color} style={{ flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 'clamp(0.8rem, 1.6vh, 0.96rem)',
                      fontWeight: 600,
                      color: isChecked ? '#4a044e' : '#701a75',
                      lineHeight: 1.3
                    }}
                  >
                    {promise.text}
                  </span>
                </div>

                {/* Beautiful Filled Checkbox with Visible White Tick Mark (✓) */}
                <div
                  style={{
                    width: 'clamp(22px, 2.5vh, 26px)',
                    height: 'clamp(22px, 2.5vh, 26px)',
                    borderRadius: '8px',
                    border: isChecked ? `2px solid ${promise.color}` : '2px solid #fbcfe8',
                    background: isChecked ? `linear-gradient(135deg, ${promise.color}, #db2777)` : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: isChecked ? `0 2px 8px ${promise.color}40` : 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  {isChecked && <Check size={15} color="#fff" strokeWidth={3.5} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Uploaded Personal Handwritten Signature displayed directly below the 5th promise */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'clamp(3px, 0.7vh, 6px) auto clamp(2px, 0.4vh, 4px) auto',
            width: '100%'
          }}
        >
          <img
            src={signatureUrl}
            alt="Personal Signature of Abishek"
            style={{
              maxHeight: 'clamp(44px, 7.2vh, 60px)',
              maxWidth: 'clamp(175px, 30vw, 240px)',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 1px 2px rgba(74, 4, 78, 0.12))'
            }}
          />
          <div
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: 'clamp(0.88rem, 1.7vh, 1.1rem)',
              color: '#831843',
              marginTop: '1px',
              fontWeight: 600,
              letterSpacing: '0.3px'
            }}
          >
            With care, from me ♡
          </div>
        </div>

        {/* Seal My Promises Button / Sealed Confirmation Animation */}
        <div style={{ flexShrink: 0, width: '100%', marginTop: 'clamp(2px, 0.6vh, 6px)' }}>
          {!sealed ? (
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={handleSealClick}
                className="btn-primary"
                style={{
                  fontSize: 'clamp(0.88rem, 1.7vh, 1.02rem)',
                  padding: 'clamp(7px, 1.2vh, 11px) clamp(24px, 3.5vw, 36px)',
                  animation: 'gentleBounce 2s infinite'
                }}
              >
                <Feather size={16} />
                <span>Seal My Promises ♡</span>
              </button>
            </div>
          ) : (
            <div
              className="glass-card-warm"
              style={{
                padding: 'clamp(6px, 1vh, 10px) clamp(14px, 2.5vw, 22px)',
                textAlign: 'center',
                border: '1.5px solid #fed7aa',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.95)',
                boxShadow: '0 4px 16px rgba(244, 114, 182, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                width: '100%',
                boxSizing: 'border-box',
                animation: 'gentleBounce 3s ease-in-out infinite'
              }}
            >
              <div style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-handwriting)',
                    fontSize: 'clamp(1rem, 2vh, 1.3rem)',
                    color: '#831843',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>💖</span>
                  <span>My promises are sealed, Jaan ♡</span>
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontStyle: 'italic',
                    fontSize: 'clamp(0.7rem, 1.3vh, 0.8rem)',
                    color: '#701a75'
                  }}
                >
                  "With all sincerity, from your best friend."
                </div>
              </div>

              {/* "Sorry Jaan 🤌🏻" Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 12px',
                  borderRadius: '999px',
                  background: 'rgba(254, 242, 242, 0.95)',
                  border: '1px solid #fecdd3'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-handwriting)',
                    fontSize: 'clamp(1.2rem, 2.6vh, 1.6rem)',
                    color: '#be123c',
                    fontWeight: 700,
                    lineHeight: 1
                  }}
                >
                  Sorry Jaan
                </span>
                <span style={{ fontSize: 'clamp(1rem, 2vh, 1.25rem)' }}>🤌🏻</span>
              </div>

              {/* Next Button */}
              <button
                onClick={onNext}
                className="btn-primary"
                style={{
                  padding: 'clamp(5px, 0.9vh, 8px) clamp(14px, 2vw, 22px)',
                  fontSize: 'clamp(0.8rem, 1.5vh, 0.9rem)'
                }}
              >
                <span>Next →</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
