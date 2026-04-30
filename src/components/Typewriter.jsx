import { useState, useEffect, useRef } from 'react';

export default function Typewriter({ text, speed = 18 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const idx = useRef(0);
  const prev = useRef(text);

  useEffect(() => {
    if (text !== prev.current) {
      prev.current = text;
      idx.current = 0;
      setDisplayed('');
      setDone(false);
    }

    if (idx.current >= text.length) {
      setDone(true);
      return;
    }

    const id = setInterval(() => {
      idx.current += 1;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        setDone(true);
        clearInterval(id);
      }
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && <span className="typewriter-cursor">█</span>}
    </span>
  );
}
