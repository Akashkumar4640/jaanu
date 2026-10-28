import React, { useRef, useState, useEffect } from 'react';
import { WoodenPhotoFrame } from '../components/WoodenPhotoFrame';
import { playSound } from '../utils/audio';
import { Sparkles, Heart } from 'lucide-react';

interface FirstPicSceneProps {
  photoUrl: string;
  revealed: boolean;
  onRevealed: () => void;
  onNext: () => void;
  soundEnabled: boolean;
}

export const FirstPicScene: React.FC<FirstPicSceneProps> = ({
  photoUrl,
  revealed,
  onRevealed,
  onNext,
  soundEnabled
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isComplete, setIsComplete] = useState(revealed);
  const [, setScratchPercent] = useState(revealed ? 100 : 0);
  const scratchCountRef = useRef(0);

  useEffect(() => {
    if (isComplete) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.offsetWidth || 360);
    const height = (canvas.height = canvas.offsetHeight || 480);

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#fce7f3');
    grad.addColorStop(0.4, '#fed7aa');
    grad.addColorStop(1, '#e9d5ff');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 6; i++) {
      const cx = (width / 5) * (i + 0.5);
      const cy = (height / 6) * (i + 0.5);
      ctx.beginPath();
      ctx.arc(cx, cy, 26, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#db2777';
    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🌸', width * 0.25, height * 0.2);
    ctx.fillText('✨', width * 0.75, height * 0.28);
    ctx.fillText('💖', width * 0.28, height * 0.75);
    ctx.fillText('🌷', width * 0.72, height * 0.8);

    ctx.fillStyle = '#701a75';
    ctx.font = 'bold 22px Caveat, cursive, sans-serif';
    ctx.fillText('Scratch here to reveal ♡', width / 2, height / 2 - 8);
    ctx.font = '14px DM Sans, sans-serif';
    ctx.fillStyle = '#831843';
    ctx.fillText('Touch & rub gently', width / 2, height / 2 + 18);
  }, [isComplete]);

  const scratch = (clientX: number, clientY: number) => {
    if (isComplete) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    scratchCountRef.current++;
    if (scratchCountRef.current % 12 === 0 && soundEnabled) {
      playSound.sparkle();
    }

    if (scratchCountRef.current % 15 === 0) {
      checkScratchCompletion(ctx, canvas.width, canvas.height);
    }
  };

  const checkScratchCompletion = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const pixels = imgData.data;
      let clearPixels = 0;
      const totalSampled = pixels.length / 16;

      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) clearPixels++;
      }

      const percent = Math.round((clearPixels / totalSampled) * 100);
      setScratchPercent(percent);

      if (percent >= 38) {
        setIsComplete(true);
        onRevealed();
        if (soundEnabled) {
          playSound.celebration();
        }
      }
    } catch {
      // Fallback
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    setIsScratching(false);
  };

  return (
    <div
      className="scene-viewport paper-texture"
      style={{
        background: 'linear-gradient(180deg, #faf5ef 0%, #fdf2f8 50%, #fffdfa 100%)',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '680px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {/* Title */}
        <div style={{ marginBottom: 'clamp(2px, 0.6vh, 6px)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3.4vh, 2.3rem)',
              color: '#4a044e',
              fontWeight: 700,
              lineHeight: 1.1
            }}
          >
            First Pic
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: 'clamp(0.8rem, 1.6vh, 1rem)',
              color: '#831843',
              marginTop: '1px',
              padding: '0 8px'
            }}
          >
            "The Moment when I felt very Lucky to have a Gem like you"
          </p>
        </div>

        {/* Scratch Hint */}
        <div style={{ marginBottom: 'clamp(2px, 0.6vh, 6px)' }}>
          {!isComplete ? (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(254, 240, 138, 0.7)',
                padding: '3px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                color: '#78350f',
                fontWeight: 600,
                animation: 'gentleBounce 2s infinite'
              }}
            >
              <Sparkles size={14} color="#d97706" />
              <span>Rub gently to uncover our first memory ♡</span>
            </div>
          ) : (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(251, 207, 232, 0.75)',
                padding: '3px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                color: '#be123c',
                fontWeight: 600
              }}
            >
              <Heart size={14} fill="#e11d48" color="#e11d48" />
              <span>Such a precious beginning! ✨</span>
            </div>
          )}
        </div>

        {/* Significantly Enlarged Wooden Picture Frame with exact 3:4 Ratio & Scratch Canvas */}
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <WoodenPhotoFrame maxWidth="min(390px, 44vh, 90vw)" aspectRatio="3/4" dateCaption="26 September 2025">
            <div
              ref={containerRef}
              style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden',
                userSelect: 'none',
                touchAction: 'none',
                background: '#fffdfa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={photoUrl}
                alt="First Memory"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  display: 'block'
                }}
              />

              {!isComplete && (
                <canvas
                  ref={canvasRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    cursor: 'crosshair',
                    zIndex: 2,
                    touchAction: 'none'
                  }}
                />
              )}

              {isComplete && (
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    fontSize: '22px',
                    animation: 'gentleBounce 2s infinite',
                    pointerEvents: 'none'
                  }}
                >
                  💖
                </div>
              )}
            </div>
          </WoodenPhotoFrame>
        </div>

        {/* Action Button: Instant reveal helper + Next */}
        <div style={{ marginTop: 'clamp(4px, 1vh, 8px)', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {!isComplete && (
            <button
              onClick={() => {
                setIsComplete(true);
                onRevealed();
                if (soundEnabled) playSound.celebration();
              }}
              className="btn-secondary"
            >
              Reveal Memory
            </button>
          )}

          <button
            onClick={onNext}
            className="btn-primary"
          >
            <span>Next →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
