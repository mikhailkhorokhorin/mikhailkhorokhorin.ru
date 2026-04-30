import { useEffect, useRef } from 'react';

const COLORS = ['#88c0d0', '#81a1c1', '#d8dee9', '#5e81ac', '#eceff4'];

export default function NordStatic({ onDone }) {
  const canvasRef = useRef(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const DURATION = 480;
    const DENSITY = 0.14;
    const called = { done: false };
    let startTime = null;
    let rafId;

    const drawStatic = (progress) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pixels = canvas.width * canvas.height * DENSITY;
      const fade = 1 - progress;

      for (let i = 0; i < pixels; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        ctx.globalAlpha = (0.2 + Math.random() * 0.5) * fade;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 2, 2);
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now) => {
      if (called.done) return;
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / DURATION, 1);

      drawStatic(progress);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        called.done = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onDoneRef.current();
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      called.done = true;
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" />;
}
