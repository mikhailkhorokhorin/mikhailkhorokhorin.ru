import { useEffect, useRef } from 'react';

const GLITCH_CHARS = '@#$%&*!/\\|<>[]{}^~+=?';

export function useGlitch(ref, interval = 5000) {
  const timer = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const original = el.textContent;

    const randChar = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

    const corruptText = (text, intensity) => {
      const chars = text.split('');
      const count = Math.floor(intensity * chars.length);
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(Math.random() * chars.length);
        if (chars[idx] !== '\n' && chars[idx] !== ' ') {
          chars[idx] = randChar();
        }
      }
      return chars.join('');
    };

    const trigger = () => {
      const FRAMES = [
        { delay: 0,   intensity: 0.08 },
        { delay: 50,  intensity: 0.18 },
        { delay: 100, intensity: 0.30 },
        { delay: 150, intensity: 0.12 },
        { delay: 200, intensity: 0.22 },
        { delay: 260, intensity: 0.06 },
        { delay: 320, intensity: 0.15 },
        { delay: 370, intensity: 0 },
      ];

      FRAMES.forEach(({ delay, intensity }) => {
        setTimeout(() => {
          if (!el.isConnected) return;
          el.textContent = intensity === 0 ? original : corruptText(original, intensity);
        }, delay);
      });
    };

    const schedule = () => {
      const jitter = interval + Math.random() * 4000;
      timer.current = setTimeout(() => {
        trigger();
        schedule();
      }, jitter);
    };

    schedule();
    return () => {
      clearTimeout(timer.current);
      if (el.isConnected) el.textContent = original;
    };
  }, [ref, interval]);
}
