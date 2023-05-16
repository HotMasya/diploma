// Modules
import { useEffect, useState } from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';

// API
import API from 'API';

// Components
import Avatar from 'Components/Avatar/avatar';
import StudenInfoCard from 'Components/StudentInfoCard';
import TeacherInfoCard from 'Components/TeacherInfoCard';
import Journal from '../Journals/Components/Journal';
import GradesJournal from '../Grades/Components/Journal';
import Placeholder from '../Journals/Components/Placeholder';
import GradesPlaceholder from '../Grades/Components/Placeholder';

// Constants
import { ROUTES } from 'Config/routes';

// Context
import { useUserContext } from 'Context/UserContext';

// Helpers
import { getVerificationIcon } from 'Helpers/getVerificationIcon';

// Styles
import styles from './styles.module.scss';

function Profile() {
  const [user] = useUserContext();
  const [journals, setJournals] = useState([]);
  const [grades, setGrades] = useState([]);
  const [journalsPending, setJournalsPending] = useState(true);
  const [gradesPending, setGradesPending] = useState(true);

  const group = get(user, 'student.group');
  const faculty = get(user, 'student.faculty');
  const departments = get(user, 'teacher.departments');

  const isStudentDefined = Boolean(group || faculty);
  const isTeacherDefined = !isEmpty(departments);

  useEffect(() => {
    if (isStudentDefined) {
      API.Journals.getStudentGrades({
        take: 3,
      })
        .then(setGrades)
        .finally(() => setGradesPending(false));
    }

    if (isTeacherDefined) {
      API.Journals.findAll({
        take: 3,
      })
        .then(setJournals)
        .finally(() => setJournalsPending(false));
    }
  }, [isStudentDefined, isTeacherDefined]);

  return (
    <div className={styles.wrapper}>
      <section className={styles.container}>
        <div className={styles.user}>
          <Avatar size={71} user={user} />
          <div className={styles.details}>
            <h2>{user.fullName}</h2>
            <p className={styles.email}>
              {getVerificationIcon(user.verified)}
              {user.email}
            </p>
          </div>
        </div>

        {(isStudentDefined || isTeacherDefined) && (
          <div className={styles.statuses}>
            <StudenInfoCard student={user.student} />
            <TeacherInfoCard teacher={user.teacher} />
          </div>
        )}
      </section>

      {isTeacherDefined && (
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>Нещодавно редаговані журнали</h2>
            <Link to={ROUTES.journals}>Переглянути усі</Link>
          </div>
          {journals.length > 0 && (
            <ul>
              {journals.map((journal) => (
                <Journal editable={false} key={journal.id} journal={journal} />
              ))}
            </ul>
          )}
          {!journals.length && (
            <Placeholder />
          )}
        </div>
      )}

      {isStudentDefined && (
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>Нещодавно виставлені оцінки</h2>
            {grades.length > 0 && (<Link to={ROUTES.grades}>Переглянути усі</Link>)}
          </div>
          {grades.length > 0 && (
            <ul>
              {grades.map((journal) => (
                <GradesJournal key={journal.id} journal={journal} />
              ))}
            </ul>
          )}
          {!grades.length && (
            <GradesPlaceholder />
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
