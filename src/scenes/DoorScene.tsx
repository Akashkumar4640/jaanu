import React, { useState } from 'react';
import { playSound } from '../utils/audio';

interface DoorSceneProps {
  onDoorOpened: () => void;
  soundEnabled: boolean;
}

export const DoorScene: React.FC<DoorSceneProps> = ({
  onDoorOpened,
  soundEnabled
}) => {
  const [knocks, setKnocks] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [knockFeedback, setKnockFeedback] = useState<string>('');

  const handleDoorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isOpening || knocks >= 3) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const nextKnocks = knocks + 1;

    setRipples((prev) => [...prev, { id: Date.now(), x, y }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== Date.now()));
    }, 600);

    setKnocks(nextKnocks);

    if (soundEnabled) {
      playSound.knock(nextKnocks);
    }

    if (nextKnocks === 1) {
      setKnockFeedback('Knock! 🌸 (1/3)');
    } else if (nextKnocks === 2) {
      setKnockFeedback('Knock knock! ✨ (2/3)');
    } else if (nextKnocks === 3) {
      setKnockFeedback('Welcome home, Jaan! 💖');
      setIsOpening(true);

      setTimeout(() => {
        if (soundEnabled) {
          playSound.doorOpen();
        }
      }, 500);

      setTimeout(() => {
        onDoorOpened();
      }, 2600);
    }
  };

  return (
    <div
      className="scene-viewport paper-texture"
      style={{
        background: 'radial-gradient(circle at center, #fffdfa 0%, #fdf2f8 50%, #fae8ff 100%)',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: 'clamp(6px, 1.5vh, 16px)'
      }}
    >
      {/* Cinematic camera zoom container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transition: isOpening ? 'transform 2.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s ease 1.8s' : 'none',
          transform: isOpening ? 'scale(3.4) translateY(12%)' : 'scale(1) translateY(0)',
          opacity: isOpening ? 0 : 1,
          transformOrigin: '50% 55%',
          width: '100%',
          maxWidth: '520px',
          zIndex: 10
        }}
      >
        {/* Name Above the Door */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(8px, 1.8vh, 16px)', userSelect: 'none' }}>
          <h1
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: 'clamp(2.4rem, 6vh, 4.2rem)',
              color: '#4a044e',
              lineHeight: 1,
              fontWeight: 700,
              textShadow: '0 2px 10px rgba(244, 114, 182, 0.35)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>Jaan</span>
            <span
              style={{
                fontSize: '0.65em',
                color: '#e11d48',
                display: 'inline-block',
                animation: 'gentleBounce 2s infinite'
              }}
            >
              ♡
            </span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(0.85rem, 1.8vh, 1.05rem)',
              color: '#831843',
              marginTop: '2px',
              fontStyle: 'italic',
              letterSpacing: '0.5px'
            }}
          >
            A Little World Made Just for You
          </p>
        </div>

        {/* 3D Doorway Frame with Dynamic Height Fitting */}
        <div
          style={{
            position: 'relative',
            width: 'min(210px, 28vh)',
            height: 'min(330px, 44vh)',
            perspective: '1200px',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Outer Arched Wooden Frame */}
          <div
            style={{
              position: 'absolute',
              inset: '-10px',
              borderRadius: '120px 120px 10px 10px',
              background: 'linear-gradient(135deg, #fbcfe8 0%, #f472b6 40%, #fb7185 80%, #db2777 100%)',
              boxShadow: '0 16px 32px rgba(112, 26, 117, 0.18), inset 0 2px 4px rgba(255, 255, 255, 0.6)',
              border: '3px solid #fff',
              zIndex: 1
            }}
          />

          {/* Interior Room Visible Through Doorway */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '110px 110px 8px 8px',
              background: 'radial-gradient(circle at center, #fef08a 0%, #fed7aa 40%, #fbcfe8 85%)',
              boxShadow: 'inset 0 8px 24px rgba(112, 26, 117, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              zIndex: 2
            }}
          >
            <div
              style={{
                opacity: isOpening ? 1 : 0.4,
                transition: 'opacity 0.8s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{ fontSize: '32px', animation: 'gentleBounce 2s infinite' }}>🌸</div>
              <div
                style={{
                  fontFamily: 'var(--font-handwriting)',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#701a75',
                  marginTop: '4px'
                }}
              >
                Enter, Jaan ♡
              </div>
            </div>

            {isOpening && (
              <div
                style={{
                  position: 'absolute',
                  inset: '-50px',
                  background: 'radial-gradient(circle, rgba(254, 240, 138, 0.95) 0%, rgba(255, 255, 255, 0.8) 40%, transparent 70%)',
                  animation: 'gentleBounce 1s infinite alternate',
                  pointerEvents: 'none',
                  zIndex: 15
                }}
              />
            )}
          </div>

          {/* The Actual Arched Door with 3D Swing */}
          <div
            onClick={handleDoorClick}
            role="button"
            tabIndex={0}
            aria-label="Knock on door"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleDoorClick(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '110px 110px 8px 8px',
              background: 'linear-gradient(180deg, #fce7f3 0%, #fbcfe8 35%, #f9a8d4 100%)',
              border: '2.5px solid rgba(255, 255, 255, 0.85)',
              boxShadow: isOpening
                ? '-10px 0 25px rgba(0, 0, 0, 0.25)'
                : 'inset 0 0 15px rgba(219, 39, 119, 0.2), 0 8px 20px rgba(131, 24, 67, 0.12)',
              transformOrigin: 'left center',
              transform: isOpening
                ? 'rotateY(-105deg)'
                : knocks === 1
                ? 'rotateY(-4deg)'
                : knocks === 2
                ? 'rotateY(-9deg)'
                : 'rotateY(0deg)',
              transition: isOpening
                ? 'transform 1.8s cubic-bezier(0.25, 1, 0.5, 1)'
                : 'transform 0.15s ease',
              cursor: isOpening ? 'default' : 'pointer',
              zIndex: 3,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'clamp(20px, 4vh, 32px) 14px 18px 14px'
            }}
          >
            {/* Subtle wood panel engraving */}
            <div
              style={{
                width: '80%',
                height: '42%',
                borderRadius: '70px 70px 10px 10px',
                border: '1.5px solid rgba(244, 114, 182, 0.4)',
                background: 'rgba(255, 255, 255, 0.25)',
                boxShadow: 'inset 0 2px 4px rgba(112, 26, 117, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '20px', opacity: 0.85 }}>🌷</span>
            </div>

            {/* Lower panel engraving */}
            <div
              style={{
                width: '80%',
                height: '35%',
                borderRadius: '10px',
                border: '1.5px solid rgba(244, 114, 182, 0.4)',
                background: 'rgba(255, 255, 255, 0.25)',
                boxShadow: 'inset 0 2px 4px rgba(112, 26, 117, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <span style={{ fontSize: '18px', color: '#db2777' }}>♡</span>
            </div>

            {/* Golden Doorknob */}
            <div
              style={{
                position: 'absolute',
                right: '16px',
                top: '56%',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #fff 0%, #fef08a 35%, #f59e0b 80%, #b45309 100%)',
                boxShadow: '0 2px 5px rgba(69, 26, 3, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
                transform: isOpening ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.4s ease'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '-3px -5px',
                  borderRadius: '10px',
                  background: 'linear-gradient(180deg, #fef08a 0%, #d97706 100%)',
                  zIndex: -1,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              />
            </div>

            {/* Click Ripple feedback */}
            {ripples.map((r) => (
              <div
                key={r.id}
                className="knock-ripple"
                style={{
                  left: r.x - 30,
                  top: r.y - 30,
                  width: '60px',
                  height: '60px'
                }}
              />
            ))}
          </div>

          {/* Welcome Mat */}
          <div
            style={{
              position: 'absolute',
              bottom: '-14px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '150px',
              height: '14px',
              borderRadius: '6px',
              background: 'linear-gradient(90deg, #d97706 0%, #b45309 50%, #d97706 100%)',
              border: '1px solid #78350f',
              boxShadow: '0 4px 8px rgba(69, 26, 3, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: '#fef08a',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              letterSpacing: '1px',
              zIndex: 4
            }}
          >
            WELCOME JAAN
          </div>
        </div>

        {/* Text Below the Door */}
        <div style={{ marginTop: 'clamp(14px, 2.5vh, 26px)', textAlign: 'center', userSelect: 'none' }}>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1rem, 2.2vh, 1.25rem)',
              color: '#500724',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>Knock 3 Times to Open the Door</span>
            <span style={{ fontSize: '1.1rem', animation: 'gentleBounce 1.5s infinite' }}>✊🏻</span>
          </p>

          {/* Interactive Knock Counter Dots */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '8px'
            }}
          >
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: knocks >= step ? '#e11d48' : '#fed7aa',
                  border: '1.5px solid #fff',
                  boxShadow: knocks >= step ? '0 0 8px rgba(225, 29, 72, 0.6)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              />
            ))}
          </div>

          {knockFeedback && (
            <div
              style={{
                marginTop: '6px',
                fontFamily: 'var(--font-handwriting)',
                fontSize: '1.25rem',
                color: '#db2777',
                fontWeight: 700,
                minHeight: '24px'
              }}
            >
              {knockFeedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
