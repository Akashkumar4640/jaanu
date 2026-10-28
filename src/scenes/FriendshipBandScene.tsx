import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/audio';
import { Heart, Sparkles, Calendar, Clock } from 'lucide-react';

interface FriendshipBandSceneProps {
  bandTied: boolean;
  onTieBand: () => void;
  onNext: () => void;
  soundEnabled: boolean;
}

export const FriendshipBandScene: React.FC<FriendshipBandSceneProps> = ({
  bandTied,
  onTieBand,
  onNext,
  soundEnabled
}) => {
  const [isTying, setIsTying] = useState(false);
  const [celebrationStarted, setCelebrationStarted] = useState(bandTied);
  const [showCounter, setShowCounter] = useState(bandTied);
  const [daysCount, setDaysCount] = useState(bandTied ? 730 : 0);

  const handleTieOnClick = () => {
    if (isTying || bandTied) return;
    setIsTying(true);

    if (soundEnabled) {
      playSound.tieBracelet();
    }

    setTimeout(() => {
      onTieBand();
      setIsTying(false);

      setTimeout(() => {
        setCelebrationStarted(true);

        if (soundEnabled) {
          playSound.celebration();
        }

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.5 },
            colors: ['#f472b6', '#c084fc', '#fbcfe8', '#fef08a', '#fb7185']
          });
        } catch {
          // fallback
        }

        setTimeout(() => {
          setShowCounter(true);
        }, 400);
      }, 1000);
    }, 1400);
  };

  useEffect(() => {
    if (!showCounter) return;
    if (bandTied && daysCount === 730) return;

    let startTimestamp: number | null = null;
    const duration = 1800;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easedProgress * 730);
      setDaysCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDaysCount(730);
      }
    };

    requestAnimationFrame(step);
  }, [showCounter, bandTied]);

  return (
    <div
      className="scene-viewport paper-texture"
      style={{
        background: 'linear-gradient(180deg, #fffdfa 0%, #fdf2f8 60%, #f3e8ff 100%)',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '580px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* Title */}
        <div style={{ marginBottom: 'clamp(6px, 1.2vh, 14px)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 3.8vh, 2.5rem)',
              color: '#4a044e',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              lineHeight: 1.1
            }}
          >
            <span>Friendship Band</span>
            <span style={{ color: '#e11d48', fontSize: '0.8em' }}>🌸</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-handwriting)',
              fontSize: 'clamp(0.95rem, 2vh, 1.2rem)',
              color: '#831843',
              marginTop: '2px'
            }}
          >
            A special thread woven with trust, warmth, and care
          </p>
        </div>

        {/* Centerpiece: Realistic Friendship Band */}
        <div
          style={{
            position: 'relative',
            width: 'min(230px, 30vh)',
            height: 'min(150px, 20vh)',
            margin: '0 auto clamp(6px, 1.2vh, 14px) auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Celebratory ambient aura */}
          <div
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '50%',
              background: celebrationStarted
                ? 'radial-gradient(circle, rgba(254, 240, 138, 0.45) 0%, rgba(244, 114, 182, 0.25) 50%, transparent 75%)'
                : 'transparent',
              filter: 'blur(8px)',
              transition: 'background 1s ease',
              pointerEvents: 'none'
            }}
          />

          <svg
            viewBox="0 0 300 240"
            style={{
              width: '100%',
              height: '100%',
              filter: 'drop-shadow(0 6px 14px rgba(112, 26, 117, 0.16))',
              transform: bandTied
                ? 'scale(1)'
                : isTying
                ? 'scale(1.04)'
                : 'rotate(-4deg)',
              transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
          >
            <defs>
              <linearGradient id="threadPink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fda4af" />
                <stop offset="50%" stop-color="#f43f5e" />
                <stop offset="100%" stop-color="#be123c" />
              </linearGradient>
              <linearGradient id="threadLavender" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#e9d5ff" />
                <stop offset="50%" stop-color="#a855f7" />
                <stop offset="100%" stop-color="#7e22ce" />
              </linearGradient>
              <linearGradient id="threadBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#bae6fd" />
                <stop offset="50%" stop-color="#38bdf8" />
                <stop offset="100%" stop-color="#0284c7" />
              </linearGradient>
              <linearGradient id="threadGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fef08a" />
                <stop offset="50%" stop-color="#f59e0b" />
                <stop offset="100%" stop-color="#b45309" />
              </linearGradient>
            </defs>

            {/* Left Braided Arm */}
            <path
              d={bandTied ? 'M 60 120 C 60 60, 150 40, 150 40' : isTying ? 'M 40 135 C 70 80, 140 50, 150 45' : 'M 30 160 C 50 90, 120 60, 140 50'}
              fill="none"
              stroke="url(#threadPink)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray="14 3"
              style={{ transition: 'd 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
            <path
              d={bandTied ? 'M 60 125 C 60 65, 150 45, 150 45' : isTying ? 'M 40 140 C 70 85, 140 55, 150 50' : 'M 30 165 C 50 95, 120 65, 140 55'}
              fill="none"
              stroke="url(#threadLavender)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="12 4"
              style={{ transition: 'd 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
            <path
              d={bandTied ? 'M 65 130 C 65 70, 150 50, 150 50' : isTying ? 'M 45 145 C 75 90, 140 60, 150 55' : 'M 35 170 C 55 100, 120 70, 140 60'}
              fill="none"
              stroke="url(#threadBlue)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="10 3"
              style={{ transition: 'd 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />

            {/* Right Braided Arm */}
            <path
              d={bandTied ? 'M 240 120 C 240 60, 150 40, 150 40' : isTying ? 'M 260 135 C 230 80, 160 50, 150 45' : 'M 270 160 C 250 90, 180 60, 160 50'}
              fill="none"
              stroke="url(#threadGold)"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray="14 3"
              style={{ transition: 'd 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
            <path
              d={bandTied ? 'M 240 125 C 240 65, 150 45, 150 45' : isTying ? 'M 260 140 C 230 85, 160 55, 150 50' : 'M 270 165 C 250 95, 180 65, 160 55'}
              fill="none"
              stroke="url(#threadLavender)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray="12 4"
              style={{ transition: 'd 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />
            <path
              d={bandTied ? 'M 235 130 C 235 70, 150 50, 150 50' : isTying ? 'M 255 145 C 225 90, 160 60, 150 55' : 'M 265 170 C 245 100, 180 70, 160 60'}
              fill="none"
              stroke="url(#threadPink)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="10 3"
              style={{ transition: 'd 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />

            {/* Bottom Loop */}
            <path
              d={bandTied ? 'M 60 120 C 60 185, 240 185, 240 120' : isTying ? 'M 40 135 C 40 200, 260 200, 260 135' : 'M 30 160 C 40 215, 260 215, 270 160'}
              fill="none"
              stroke="url(#threadGold)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="15 4"
              style={{ transition: 'd 1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
            />

            {/* Beads */}
            <circle cx="85" cy="155" r="8" fill="#fbcfe8" stroke="#db2777" strokeWidth="2" />
            <circle cx="115" cy="178" r="7" fill="#fef08a" stroke="#d97706" strokeWidth="2" />
            <circle cx="185" cy="178" r="7" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
            <circle cx="215" cy="155" r="8" fill="#e9d5ff" stroke="#9333ea" strokeWidth="2" />

            {/* Central Heart Charm */}
            <g transform="translate(150, 185)">
              <line x1="0" y1="-8" x2="0" y2="4" stroke="#d97706" strokeWidth="3" />
              <circle cx="0" cy="5" r="3" fill="#fef08a" />
              <path
                d="M 0 10 C -12 0, -22 18, 0 35 C 22 18, 12 0, 0 10 Z"
                fill="url(#threadPink)"
                stroke="#fff"
                strokeWidth="2"
              />
              <text x="0" y="24" fontSize="11" fill="#fff" textAnchor="middle" fontWeight="bold">
                J
              </text>
            </g>

            {/* Knot */}
            {bandTied && (
              <g transform="translate(150, 42)" style={{ animation: 'gentleBounce 2s infinite' }}>
                <circle cx="0" cy="0" r="12" fill="#fb7185" stroke="#fff" strokeWidth="2.5" />
                <path d="M -7 -7 L 7 7 M 7 -7 L -7 7" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            )}
          </svg>
        </div>

        {/* Action Button: Tie It On */}
        {!bandTied && (
          <div style={{ marginBottom: '14px' }}>
            <button
              onClick={handleTieOnClick}
              disabled={isTying}
              className="btn-primary"
              style={{
                fontSize: 'clamp(0.95rem, 2vh, 1.1rem)',
                padding: 'clamp(8px, 1.4vh, 12px) clamp(22px, 4vw, 34px)',
                animation: 'gentleBounce 2s infinite'
              }}
            >
              <Heart size={18} fill="#fff" />
              <span>{isTying ? 'Tying gently...' : 'Tie it on'}</span>
            </button>
          </div>
        )}

        {/* Friendship Duration Counter Section */}
        {showCounter && (
          <div
            className="glass-card-warm"
            style={{
              padding: 'clamp(10px, 1.8vh, 18px) clamp(14px, 2.5vw, 24px)',
              marginTop: '4px',
              width: '100%',
              maxWidth: '460px',
              animation: 'gentleBounce 3s ease-in-out infinite'
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(0.95rem, 2vh, 1.2rem)',
                color: '#701a75',
                fontWeight: 600,
                marginBottom: '4px'
              }}
            >
              We have been Friends for
            </div>

            {/* 730 Days Counter */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                gap: '8px',
                margin: 'clamp(4px, 1vh, 10px) 0 clamp(8px, 1.5vh, 14px) 0'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(2.5rem, 6vh, 3.8rem)',
                  fontWeight: 800,
                  color: '#be123c',
                  lineHeight: 1,
                  textShadow: '0 3px 12px rgba(225, 29, 72, 0.25)'
                }}
              >
                {daysCount}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.3rem, 3vh, 1.8rem)',
                  fontWeight: 700,
                  color: '#4a044e'
                }}
              >
                Days
              </span>
            </div>

            {/* Two Separate Callout Cards: 2 Years & 24 Months */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'clamp(8px, 1.5vw, 14px)'
              }}
            >
              {/* Card One: 2 Years */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, #fdf2f8 100%)',
                  padding: 'clamp(6px, 1vh, 10px)',
                  borderRadius: '12px',
                  border: '1px solid #fbcfe8',
                  boxShadow: '0 2px 8px rgba(244, 63, 94, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{ color: '#e11d48', marginBottom: '2px' }}>
                  <Calendar size={18} />
                </div>
                <div style={{ fontSize: 'clamp(1.3rem, 2.8vh, 1.7rem)', fontWeight: 800, color: '#831843', lineHeight: 1 }}>
                  2
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: '#701a75', fontWeight: 600 }}>
                  Years
                </div>
              </div>

              {/* Card Two: 24 Months */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #fff 0%, #f3e8ff 100%)',
                  padding: 'clamp(6px, 1vh, 10px)',
                  borderRadius: '12px',
                  border: '1px solid #e9d5ff',
                  boxShadow: '0 2px 8px rgba(147, 51, 234, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{ color: '#9333ea', marginBottom: '2px' }}>
                  <Clock size={18} />
                </div>
                <div style={{ fontSize: 'clamp(1.3rem, 2.8vh, 1.7rem)', fontWeight: 800, color: '#581c87', lineHeight: 1 }}>
                  24
                </div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.85rem', color: '#701a75', fontWeight: 600 }}>
                  Months
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div style={{ marginTop: 'clamp(10px, 1.8vh, 16px)' }}>
              <button
                onClick={onNext}
                className="btn-primary"
                style={{ padding: 'clamp(6px, 1vh, 9px) clamp(20px, 3.5vw, 30px)' }}
              >
                <span>Next →</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
