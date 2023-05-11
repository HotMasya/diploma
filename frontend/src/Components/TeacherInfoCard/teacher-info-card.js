// Modules
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

// Helpers
import { idealNoun } from 'Helpers/idealNoun';

// Styles
import styles from './styles.module.scss';

function TeacherInfoCard(props) {
  const { teacher } = props;

  const departments = get(teacher, 'departments');

  if (isEmpty(departments)) return null;

  return (
    <div className={styles.card}>
      <h2>Викладач</h2>
      <div className={styles.stat}>
        <p>{idealNoun(departments.length, 'Кафедра', 'Кафедри')}</p>
        <div className={styles.departments}>
          {departments.map(({ name, shortName }) => (
            <span key={shortName + name} title={name}>{shortName}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeacherInfoCard;
