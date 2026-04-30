import { useEffect, useRef } from 'react';

function getAccentRgb(theme) {
  if (theme === 'dracula') return '255,121,198';
  if (theme === 'nord') return '136,192,208';
  return '0,255,204';
}

export default function CursorCanvas({ theme }) {
  const canvasRef = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let mx = -200, my = -200;
    let rafId;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);

    const frame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rgb = getAccentRgb(themeRef.current);
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 80);
      grad.addColorStop(0, `rgba(${rgb},0.06)`);
      grad.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}
    />
  );
}
