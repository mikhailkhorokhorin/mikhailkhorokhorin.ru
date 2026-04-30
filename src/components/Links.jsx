import { useTranslation } from 'react-i18next';
import TerminalLink from './TerminalLink';

export default function Links() {
  const { t } = useTranslation();
  const links = t('links.list', { returnObjects: true });

  return (
    <section className="section links">
      <h2>$ cat contacts.txt</h2>
      <ul>
        {links.map((link, i) => (
          <li key={i}>
            <TerminalLink href={link.url}>{link.title}</TerminalLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
