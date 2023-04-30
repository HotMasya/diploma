// Modules
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';

// Components
import Avatar from 'Components/Avatar/avatar';
import StudenInfoCard from 'Components/StudentInfoCard';
import TeacherInfoCard from 'Components/TeacherInfoCard';

// Helpers
import { getVerificationIcon } from 'Helpers/getVerificationIcon';

// Styles
import styles from './styles.module.scss';

function UserSummary(props) {
  const { user } = props;

  return (
    <div className={styles.summary}>
      <div className={styles.user}>
        <Avatar size={120} user={user} />
        <div className={styles.details}>
          <h1>{user.fullName}</h1>
          <h3>
            {getVerificationIcon(user.verified)}
            {user.email}
          </h3>

          <div className={styles.updatedAt}>
            <b>Створений:</b>
            {formatRelative(user.createdAt, new Date(), { locale: ukLocale })}
            <b>Останні зміни:</b>
            {formatRelative(user.updatedAt, new Date(), { locale: ukLocale })}
          </div>
        </div>
      </div>

      <div className={styles.statuses}>
        <StudenInfoCard student={user.student} />
        <TeacherInfoCard teacher={user.teacher} />
      </div>
    </div>
  );
}

export default UserSummary;
