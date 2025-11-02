import {useTranslation} from 'react-i18next';
import {slugify} from '../utils/slugify';

export default function Links() {
  const {t} = useTranslation();

  const links = t('links.list', {returnObjects: true});

  return (
    <section className="section links">
      <h2>{'> ' + slugify(t('links.title'))}</h2>
      <ul>
        {links.map((link, i) => (
          <li key={i}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
