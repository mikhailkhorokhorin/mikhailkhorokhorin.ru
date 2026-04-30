const THEMES = ['matrix', 'dracula', 'nord'];

export default function ThemeSwitcher({ theme, setTheme }) {
  const apply = (t) => {
    document.body.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    setTheme(t);
  };

  return (
    <div className="hud-left">
      {THEMES.map((t) => (
        <button
          key={t}
          className={`theme-btn${theme === t ? ' active' : ''}`}
          onClick={() => apply(t)}
        >
          [{t}]
        </button>
      ))}
    </div>
  );
}
