import { useNavigate, useLocation } from 'react-router-dom';

export default function LangSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname.startsWith('/ru') ? 'ru' : 'en';

  return (
    <div style={{ display: 'flex', gap: '0.25rem' }}>
      {['ru', 'en'].map((lang) => (
        <button
          key={lang}
          className={`lang-btn${current === lang ? ' active' : ''}`}
          onClick={() => navigate(`/${lang}`)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
