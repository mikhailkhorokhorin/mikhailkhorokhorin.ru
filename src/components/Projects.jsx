import { useTranslation } from 'react-i18next';
import TerminalLink from './TerminalLink';

export default function Projects() {
  const { t } = useTranslation();
  const projects = t('projects.list', { returnObjects: true });

  return (
    <section className="section projects">
      <h2>$ ls ~/projects/</h2>
      <ul>
        {projects.map((project, i) => (
          <li key={i}>
            <TerminalLink href={project.url}>{project.title}</TerminalLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
