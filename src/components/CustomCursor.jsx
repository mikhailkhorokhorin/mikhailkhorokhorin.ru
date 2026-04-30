import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });

    const onOver = (e) => {
      if (e.target.closest('a, button')) setHovering(true);
    };
    const onOut = (e) => {
      if (e.target.closest('a, button')) setHovering(false);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, []);

  return (
    <div
      className={`custom-cursor${hovering ? ' hovering' : ''}`}
      style={{ left: pos.x, top: pos.y }}
    >
      {hovering ? '▌' : '█'}
    </div>
  );
}
