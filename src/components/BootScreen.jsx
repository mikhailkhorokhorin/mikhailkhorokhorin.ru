import { useState, useEffect } from 'react';

const LINES = [
  'initializing mikhailkhorokhorin.ru...',
  'loading profile data...',
  '> OK',
];

const CHAR_SPEED = 22;
const LINE_PAUSE = 180;
const DONE_PAUSE = 400;

export default function BootScreen({ onDone }) {
  const [lines, setLines] = useState([]);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    const run = async () => {
      for (let li = 0; li < LINES.length; li++) {
        const full = LINES[li];
        for (let ci = 1; ci <= full.length; ci++) {
          if (cancelled) return;
          setLines((prev) => {
            const next = [...prev];
            next[li] = full.slice(0, ci);
            return next;
          });
          await sleep(CHAR_SPEED);
        }
        await sleep(LINE_PAUSE);
      }

      await sleep(DONE_PAUSE);
      if (cancelled) return;
      setFading(true);
      await sleep(420);
      if (!cancelled) onDone();
    };

    run();
    return () => { cancelled = true; };
  }, [onDone]);

  return (
    <div className={`boot-screen${fading ? ' fading' : ''}`}>
      {lines.map((text, i) => (
        <p
          key={i}
          className={`boot-line${i === LINES.length - 1 && text === LINES[i] ? ' boot-ok' : ''}`}
        >
          {text}
          {i === lines.length - 1 && !fading && <span className="typewriter-cursor">█</span>}
        </p>
      ))}
    </div>
  );
}
