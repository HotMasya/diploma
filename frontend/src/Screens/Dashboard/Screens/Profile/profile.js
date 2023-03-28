// Context
import { useUserContext } from 'Context/UserContext';

// Styles
import styles from './styles.module.scss';

function Profile() {
  const [user] = useUserContext();

  return (
    <h1>
      {user.firstName} {user.lastName}
    </h1>
  );
}

export default Profile;
