import {useTranslation} from 'react-i18next';
import {slugify} from '../utils/slugify';
import ReactMarkdown from 'react-markdown';

export default function About() {
  const {t} = useTranslation();

  return (
    <section className="section about">
      <h2> {'> ' + slugify(t('about.title'))}</h2>
      <ReactMarkdown>{t('about.description')}</ReactMarkdown>
    </section>
  );
}
