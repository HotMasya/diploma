// Modules
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';
import { FaCheckCircle } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';

// Components
import Avatar from 'Components/Avatar/avatar';

// Constants
import { GREEN, RED } from 'Constants/colors';

// Styles
import styles from './styles.module.scss';

const getVerificationIcon = (verified) =>
  verified ? (
    <FaCheckCircle color={GREEN._500} size={24} title="Пошта підтверджена" />
  ) : (
    <FaTimesCircle color={RED._500} size={24} title="Пошта не підтверджена" />
  );

function UserSummary(props) {
  const { user } = props;

  return (
    <div className={styles.summary}>
      <Avatar size={120} user={user} />
      <div className={styles.details}>
        <h1>{user.fullName}</h1>
        <h3>
          {getVerificationIcon(user.verified)}
          {user.email}
        </h3>
      </div>

      <span className={styles.updatedAt}>
        <b>Створений:</b>
        {formatRelative(user.createdAt, new Date(), { locale: ukLocale })}
        <b>Останні зміни:</b>
        {formatRelative(user.updatedAt, new Date(), { locale: ukLocale })}
      </span>
    </div>
  );
}

export default UserSummary;
