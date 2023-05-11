// Modules
import get from 'lodash/get';

// Styles
import styles from './styles.module.scss';

function StudenInfoCard(props) {
  const { student } = props;

  const group = get(student, 'group');
  const faculty = get(student, 'faculty');

  if (!group && !faculty) return null;

  return (
    <div className={styles.card}>
      <h2>Студент</h2>
      {group && (
        <div className={styles.stat}>
          <p>Група</p>
          <p>{group.name}</p>
        </div>
      )}

      {faculty && (
        <div className={styles.stat}>
          <p>Факультет</p>
          <p title={faculty.name}>{faculty.shortName}</p>
        </div>
      )}
    </div>
  );
}

export default StudenInfoCard;
