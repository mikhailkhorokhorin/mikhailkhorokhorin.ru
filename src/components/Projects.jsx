import {useTranslation} from 'react-i18next';
import {slugify} from '../utils/slugify';

export default function Projects() {
  const {t} = useTranslation();

  const projects = t('projects.list', {returnObjects: true});

  return (
    <section className="section projects">
      <h2>{'> ' + slugify(t('projects.title'))}</h2>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {project.title}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
