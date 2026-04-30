import { useRef, useEffect } from 'react';

const MIKHAIL = `___  ____ _    _           _ _
|  \\/  (_) |  | |         (_) |
| .  . |_| | _| |__   __ _ _| |
| |\\/| | | |/ / '_ \\ / _\` | | |
| |  | | |   <| | | | (_| | | |
\\_|  |_/_|_|\\_\\_| |_|\\__,_|_|_|`;

const KHOROKHORIN = `_   ___                      _    _                _
| | / / |                   | |  | |              (_)
| |/ /| |__   ___  _ __ ___ | | _| |__   ___  _ __ _ _ __
|    \\| '_ \\ / _ \\| '__/ _ \\| |/ / '_ \\ / _ \\| '__| | '_ \\
| |\\  \\ | | | (_) | | | (_) |   <| | | | (_) | |  | | | | |
\\_| \\_/_| |_|\\___/|_|  \\___/|_|\\_\\_| |_|\\___/|_|  |_|_| |_|`;

const GLITCH_CHARS = '@#$%&*!/\\|<>[]{}^~+=?';
const randChar = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

function getGlitchable(text) {
  return text.split('').map((ch, i) => ch !== '\n' && ch !== ' ' ? i : -1).filter(i => i !== -1);
}

export default function TerminalHeader() {
  const mRef = useRef(null);
  const khRef = useRef(null);

  useEffect(() => {
    const mChars = MIKHAIL.split('');
    const khChars = KHOROKHORIN.split('');
    const mState = mChars.slice();
    const khState = khChars.slice();
    const mGlitchable = getGlitchable(MIKHAIL);
    const khGlitchable = getGlitchable(KHOROKHORIN);
    const timers = [];

    const renderM = () => { if (mRef.current?.isConnected) mRef.current.textContent = mState.join(''); };
    const renderKh = () => { if (khRef.current?.isConnected) khRef.current.textContent = khState.join(''); };

    const glitchBoth = () => {
      const mIndices = mGlitchable.sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(Math.random() * 5));
      const khIndices = khGlitchable.sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(Math.random() * 5));
      const bursts = 4 + Math.floor(Math.random() * 5);
      let count = 0;

      const burst = () => {
        mIndices.forEach(i => { mState[i] = randChar(); });
        khIndices.forEach(i => { khState[i] = randChar(); });
        renderM();
        renderKh();
        count++;
        if (count < bursts) {
          timers.push(setTimeout(burst, 60 + Math.random() * 100));
        } else {
          mIndices.forEach(i => { mState[i] = mChars[i]; });
          khIndices.forEach(i => { khState[i] = khChars[i]; });
          renderM();
          renderKh();
          scheduleNext();
        }
      };
      burst();
    };

    const scheduleNext = () => {
      timers.push(setTimeout(glitchBoth, 8000 + Math.random() * 7000));
    };

    scheduleNext();
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="terminal-header">
      <pre ref={mRef} className="ascii-art user-select-none" style={{ margin: 0 }}>{MIKHAIL}</pre>
      <pre ref={khRef} className="ascii-art user-select-none" style={{ margin: 0 }}>{KHOROKHORIN}</pre>
    </div>
  );
}
