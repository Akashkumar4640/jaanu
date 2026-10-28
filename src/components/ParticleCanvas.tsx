import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  type: 'heart' | 'star' | 'petal' | 'sparkle';
  color: string;
  rotation: number;
  rotationSpeed: number;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = ['#f472b6', '#fb7185', '#c084fc', '#fbcfe8', '#fef08a'];
    const particleCount = Math.min(30, Math.floor(window.innerWidth / 30));
    const particles: Particle[] = [];

    const types: ('heart' | 'star' | 'petal' | 'sparkle')[] = ['heart', 'petal', 'sparkle', 'star'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: -(Math.random() * 0.7 + 0.3),
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.25,
        type: types[Math.floor(Math.random() * types.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.8
      });
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(x, y + topCurveHeight);
      c.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      c.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
      c.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
      c.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      c.closePath();
      c.fill();
      c.restore();
    };

    const drawStar = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      for (let i = 0; i < 4; i++) {
        c.lineTo(Math.cos(((18 + i * 90) * Math.PI) / 180) * size + x, -Math.sin(((18 + i * 90) * Math.PI) / 180) * size + y);
        c.lineTo(Math.cos(((54 + i * 90) * Math.PI) / 180) * (size * 0.4) + x, -Math.sin(((54 + i * 90) * Math.PI) / 180) * (size * 0.4) + y);
      }
      c.closePath();
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === 'heart') {
          drawHeart(ctx, 0, 0, p.size, p.color, p.opacity);
        } else if (p.type === 'star' || p.type === 'sparkle') {
          drawStar(ctx, 0, 0, p.size * 0.8, p.color, p.opacity);
        } else {
          // Petal
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.8, p.size * 0.4, Math.PI / 4, 0, 2 * Math.PI);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5,
        width: '100%',
        height: '100%'
      }}
    />
  );
};
