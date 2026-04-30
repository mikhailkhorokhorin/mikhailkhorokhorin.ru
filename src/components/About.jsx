import { useTranslation } from 'react-i18next';
import Typewriter from './Typewriter';

export default function About() {
  const { t } = useTranslation();
  const raw = t('about.description').replace(/\*\*(.*?)\*\*/g, '$1');

  return (
    <section className="section about">
      <h2>$ cat about.txt</h2>
      <p style={{ margin: 0, lineHeight: 1.7 }}>
        <Typewriter text={raw} speed={14} />
      </p>
    </section>
  );
}
