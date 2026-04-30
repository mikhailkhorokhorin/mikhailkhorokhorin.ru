import { useEffect, useRef } from 'react';

const COLORS = ['#ff79c6', '#bd93f9', '#ff92df', '#caa9fa'];

export default function GlitchFlash({ onDone }) {
  const canvasRef = useRef(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const FRAMES = 7;
    const DURATION = 550;
    const frameTime = DURATION / FRAMES;
    const called = { done: false };
    let frame = 0;
    let startTime = null;
    let rafId;

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const slices = 4 + Math.floor(Math.random() * 4);
      for (let i = 0; i < slices; i++) {
        const y = Math.random() * canvas.height;
        const h = 4 + Math.random() * 60;
        const shift = (Math.random() - 0.5) * 40;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const alpha = 0.12 + Math.random() * 0.25;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = color;
        ctx.fillRect(shift, y, canvas.width, h);
        ctx.restore();
      }
    };

    const tick = (now) => {
      if (called.done) return;
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const currentFrame = Math.floor(elapsed / frameTime);

      if (currentFrame > frame) {
        frame = currentFrame;
        drawFrame();
      }

      if (elapsed < DURATION) {
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
