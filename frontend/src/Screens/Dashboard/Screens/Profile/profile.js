// Context
import { useUserContext } from 'Context/UserContext';

// Styles
import styles from './styles.module.scss';
import Avatar from 'Components/Avatar/avatar';

function Profile() {
  const [user] = useUserContext();

  return (
    <div className={styles.container}>
      <Avatar className={styles.avatar} size={72} user={user} />
      <div>
        <h2>{user.fullName}</h2>

      </div>
    </div>
  );
}

export default Profile;
