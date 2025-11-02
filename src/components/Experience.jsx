import {useTranslation} from 'react-i18next';
import {slugify} from '../utils/slugify';

const Experience = () => {
  const {t} = useTranslation();

  const list = t('experience.list', {returnObjects: true}); // массив объектов из JSON

  return (
    <section className="section experience">
      <h2>{'> ' + slugify(t('experience.title'))}</h2>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <strong>{item.position}</strong> @ {item.company} ({item.start} – {item.end})<br/>
            <em>{item.duration}</em>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Experience;
