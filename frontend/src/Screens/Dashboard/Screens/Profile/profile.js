// Modules
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

// Components
import Avatar from 'Components/Avatar/avatar';
import StudenInfoCard from 'Components/StudentInfoCard';
import TeacherInfoCard from 'Components/TeacherInfoCard';

// Context
import { useUserContext } from 'Context/UserContext';

// Helpers
import { getVerificationIcon } from 'Helpers/getVerificationIcon';


// Styles
import styles from './styles.module.scss';

function Profile() {
  const [user] = useUserContext();

  const group = get(user, 'student.group');
  const faculty = get(user, 'student.faculty');
  const departments = get(user, 'teacher.departments');

  const isStudentDefined = Boolean(group || faculty);
  const isTeacherDefined = !isEmpty(departments);

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Avatar size={72} user={user} />
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
    </div>
  );
}

export default Profile;
