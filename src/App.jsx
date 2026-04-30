import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TerminalHeader from './components/TerminalHeader';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Links from './components/Links';
import ThemeSwitcher from './components/ThemeSwitcher';
import LangSwitcher from './components/LangSwitcher';
import Uptime from './components/Uptime';
import MatrixRain from './components/MatrixRain';
import GlitchFlash from './components/GlitchFlash';
import NordStatic from './components/NordStatic';
import BootScreen from './components/BootScreen';
import './App.css';

const CLICK_SYMBOLS = ['+', '×', '·', '◦', '+', '×'];

const withFadeIn = (WrappedComponent) => {
  return function AnimatedComponent(props) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ width: '100%' }}
      >
        <WrappedComponent {...props} />
      </motion.div>
    );
  };
};

const AnimatedTerminalHeader = withFadeIn(TerminalHeader);
const AnimatedAbout = withFadeIn(About);
const AnimatedExperience = withFadeIn(Experience);
const AnimatedProjects = withFadeIn(Projects);
const AnimatedContact = withFadeIn(Links);

function getInitialTheme() {
  return localStorage.getItem('theme') || 'matrix';
}

export default function App() {
  const [effects, setEffects] = useState([]);
  const [theme, setTheme] = useState(getInitialTheme);
  const [transition, setTransition] = useState(null);
  const [transitionKey, setTransitionKey] = useState(0);
  const [booted, setBooted] = useState(() => sessionStorage.getItem('booted') === '1');
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (location.pathname.startsWith('/ru')) i18n.changeLanguage('ru');
    else i18n.changeLanguage('en');
  }, [location.pathname, i18n]);

  const handleSetTheme = (t) => {
    if (t === theme) return;
    setTransitionKey((k) => k + 1);
    if (t === 'matrix') setTransition('rain');
    else if (t === 'dracula') setTransition('glitch');
    else if (t === 'nord') setTransition('static');
    setTheme(t);
  };

  const handleTransitionDone = useCallback(() => setTransition(null), []);

  const handleBootDone = useCallback(() => {
    sessionStorage.setItem('booted', '1');
    setBooted(true);
  }, []);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const count = CLICK_SYMBOLS.length;
    const newEffects = CLICK_SYMBOLS.map((symbol, i) => {
      const angle = (i / count) * 2 * Math.PI;
      return { id: Date.now() + i, x: cx, y: cy, symbol, angle };
    });

    setEffects((prev) => [...prev, ...newEffects]);
    setTimeout(() => {
      setEffects((prev) => prev.filter((eff) => !newEffects.find((ne) => ne.id === eff.id)));
    }, 600);
  };

  return (
    <div className="fullscreen-wrapper" onClick={handleClick}>
      <div className="noise-overlay" />

      {!booted && <BootScreen onDone={handleBootDone} />}

      <div style={{ opacity: booted ? 1 : 0, transition: 'opacity 0.3s ease' }}>
        <div className="hud-bar">
          <ThemeSwitcher theme={theme} setTheme={handleSetTheme} />
          <div className="hud-right">
            <LangSwitcher />
            <Uptime />
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/ru" replace />} />
          <Route
            path="/:lang"
            element={
              <div className="terminal">
                <AnimatedTerminalHeader />
                <AnimatedAbout />
                <AnimatedExperience />
                <AnimatedProjects />
                <AnimatedContact />
              </div>
            }
          />
        </Routes>
      </div>

      {effects.map(({ id, x, y, symbol, angle }) => (
        <span
          key={id}
          className="click-effect"
          style={{
            position: 'absolute',
            left: x,
            top: y,
            '--angle': `${angle}rad`,
          }}
        >
          {symbol}
        </span>
      ))}

      {transition === 'rain' && <MatrixRain key={transitionKey} onDone={handleTransitionDone} />}
      {transition === 'glitch' && <GlitchFlash key={transitionKey} onDone={handleTransitionDone} />}
      {transition === 'static' && <NordStatic key={transitionKey} onDone={handleTransitionDone} />}
    </div>
  );
}
