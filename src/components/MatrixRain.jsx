import { useEffect, useRef } from 'react';

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF@#$%&*';
const rch = () => CHARS[Math.floor(Math.random() * CHARS.length)];

export default function MatrixRain({ onDone }) {
  const canvasRef = useRef(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const cols = Math.floor(canvas.width / fontSize);
    let rafId;
    let done = false;

    const streams = Array.from({ length: cols }, () => {
      const length = 8 + Math.floor(Math.random() * 20);
      return {
        y: -(length * fontSize) - Math.random() * 60,
        speed: 10 + Math.random() * 8,
        length,
        chars: Array.from({ length }, rch),
        delay: Math.random() < 0.55 ? 0 : Math.random() * 300,
        started: false,
      };
    });

    const startTime = performance.now();

    const frame = (now) => {
      if (done) return;
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      streams.forEach((s, i) => {
        if (!s.started) {
          if (elapsed < s.delay) return;
          s.started = true;
        }

        s.y += s.speed;

        s.chars.forEach((ch, ci) => {
          const charY = s.y - ci * fontSize;
          if (charY < 0 || charY > canvas.height) return;

          ctx.font = `${fontSize}px monospace`;
          if (ci === 0) {
            ctx.fillStyle = '#ccffee';
          } else {
            const fade = 1 - ci / s.length;
            ctx.fillStyle = `rgba(0,255,102,${(fade * 0.9).toFixed(2)})`;
          }
          ctx.fillText(ch, i * fontSize, charY);

          if (Math.random() < 0.03) s.chars[ci] = rch();
        });
      });

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    const timerId = setTimeout(() => {
      done = true;
      cancelAnimationFrame(rafId);
      onDoneRef.current();
    }, 2200);

    return () => {
      done = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-rain" />;
}
