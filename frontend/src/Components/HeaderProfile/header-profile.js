// Modules
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Componets
import Avatar from 'Components/Avatar';
import Dropdown from 'Components/Dropdown';

// Context
import { useUserContext } from 'Context/UserContext';

// Config
import { ROUTES } from 'Config/routes';

// Helpers
import Auth from 'Helpers/auth';

// Styles
import styles from './styles.module.scss';

const options = [
  {
    label: 'Налаштування (не готово)',
    value: 'settings',
  },
  {
    label: 'Вийти',
    value: 'logout',
  },
];

function HeaderProfile() {
  const [user, setUser] = useUserContext();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    Auth.logOut();
    setUser(null);
    navigate(ROUTES.auth);
  }, [navigate, setUser]);

  const handleSelect = useCallback(
    ({ value }) => {
      switch (value) {
        case 'logout':
          handleLogout();
          break;
        default:
          break;
      }
    },
    [handleLogout]
  );

  if (!user) {
    return null;
  }

  const profile = (
    <div className={styles.container}>
      <h4>{user.fullName}</h4>
      <Avatar user={user} />
    </div>
  );

  return (
    <Dropdown
      targetElement={profile}
      onSelect={handleSelect}
      options={options}
    />
  );
}

export default HeaderProfile;
