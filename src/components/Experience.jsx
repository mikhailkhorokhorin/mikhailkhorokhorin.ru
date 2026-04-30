import { useTranslation } from 'react-i18next';

const Experience = () => {
  const { t } = useTranslation();
  const list = t('experience.list', { returnObjects: true });

  return (
    <section className="section experience">
      <h2>$ cat experience.log</h2>
      <ul>
        {list.map((item, index) => (
          <li key={index}>
            <strong>{item.position}</strong> @ {item.company} ({item.start} – {item.end})<br />
            <em>{item.duration}</em>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Experience;
