import React, { useState } from 'react';
import { playSound } from '../utils/audio';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalSceneProps {
  hugTriggered: boolean;
  onTriggerHug: () => void;
  soundEnabled: boolean;
}

export const FinalScene: React.FC<FinalSceneProps> = ({
  hugTriggered,
  onTriggerHug,
  soundEnabled
}) => {
  const [hugGiven, setHugGiven] = useState(hugTriggered);

  const handleHugClick = () => {
    setHugGiven(true);
    onTriggerHug();

    if (soundEnabled) {
      playSound.warmHug();
    }

    try {
      confetti({
        particleCount: 60,
        spread: 90,
        origin: { y: 0.65 },
        colors: ['#fda4af', '#f472b6', '#fed7aa', '#fbcfe8']
      });
    } catch {
      // Confetti fallback
    }
  };

  return (
    <div
      className="paper-texture scrollable-scene"
      style={{
        background: 'radial-gradient(circle at center, #fffdfa 0%, #fdf2f8 60%, #fae8ff 100%)',
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        padding: '30px 16px 80px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '600px', width: '100%', margin: '0 auto' }}>
        {/* Decorative Header */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '36px', animation: 'gentleBounce 2s infinite' }}>🌸</div>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 6vw, 3rem)',
              color: '#4a044e',
              fontWeight: 700,
              marginTop: '8px'
            }}
          >
            Always Here For You
          </h2>
        </div>

        {/* Closing Card with Message */}
        <div
          className="glass-card-warm"
          style={{
            padding: 'clamp(24px, 5vw, 40px)',
            borderRadius: '24px',
            border: '2px solid #fed7aa',
            boxShadow: '0 16px 40px rgba(112, 26, 117, 0.1)',
            marginBottom: '28px',
            position: 'relative'
          }}
        >
          {/* Subtle quotation marks */}
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '48px',
              color: '#fbcfe8',
              lineHeight: 0.8,
              textAlign: 'left'
            }}
          >
            “
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.05rem, 3vw, 1.2rem)',
              color: '#4a044e',
              lineHeight: 1.8,
              textAlign: 'center',
              fontWeight: 500,
              padding: '0 8px'
            }}
          >
            No matter how difficult a moment becomes, your friendship will always mean a lot to me. I'm sorry for hurting you, Jaan. I'll do my best to show you through my actions how much I value you. Sorry Jaan. ♡
          </p>

          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '48px',
              color: '#fbcfe8',
              lineHeight: 0.8,
              textAlign: 'right'
            }}
          >
            ”
          </div>

          {/* Small animated friendship band and two tiny hearts */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '18px'
            }}
          >
            <span style={{ color: '#e11d48', fontSize: '18px', animation: 'gentleBounce 2s infinite' }}>♡</span>
            <div
              style={{
                width: '60px',
                height: '8px',
                borderRadius: '9999px',
                background: 'linear-gradient(90deg, #f472b6, #c084fc, #fef08a, #38bdf8)',
                boxShadow: '0 2px 8px rgba(244, 114, 182, 0.4)'
              }}
            />
            <span style={{ color: '#9333ea', fontSize: '18px', animation: 'gentleBounce 2s infinite 0.5s' }}>♡</span>
          </div>
        </div>

        {/* Optional Action Button: One More Hug? ♡ */}
        <div>
          <button
            onClick={handleHugClick}
            className="btn-primary"
            style={{
              padding: '14px 42px',
              fontSize: '1.15rem',
              background: hugGiven
                ? 'linear-gradient(135deg, #db2777 0%, #be123c 100%)'
                : 'linear-gradient(135deg, #e11d48 0%, #db2777 50%, #9333ea 100%)',
              animation: hugGiven ? 'none' : 'gentleBounce 2s infinite'
            }}
          >
            <Heart size={20} fill="#fff" />
            <span>{hugGiven ? 'A Warm Hug Sent ♡' : 'One More Hug? ♡'}</span>
          </button>
        </div>

        {/* Warm Hug Celebration Feedback */}
        {hugGiven && (
          <div
            style={{
              marginTop: '24px',
              padding: '18px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1.5px solid #fbcfe8',
              animation: 'gentleBounce 3s infinite'
            }}
          >
            <div style={{ fontSize: '28px', marginBottom: '6px' }}>🫂 💖 ✨</div>
            <div
              style={{
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.5rem',
                color: '#831843',
                fontWeight: 700
              }}
            >
              Sending the warmest friendship hug your way, Jaan!
            </div>
            <div style={{ fontSize: '0.88rem', color: '#701a75', marginTop: '4px' }}>
              Take all the time you need. I will always cherish our friendship.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
