// Context
import Avatar from 'Components/Avatar';
import Dropdown from 'Components/Dropdown';
import { useUserContext } from 'Context/UserContext';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Config
import { ROUTES } from 'Config/routes';

// Helpers
import Auth from 'Helpers/auth';

// Styles
import styles from './styles.module.scss';

function HeaderProfile() {
  const [user, setUser] = useUserContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = useCallback(() => {
    Auth.logOut();
    setUser(null);
    navigate(ROUTES.auth);
  }, [navigate, setUser]);

  if (!user) {
    return null;
  }

  const dropdown = dropdownOpen && (
    <Dropdown>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item onClick={handleLogout}>Log Out</Dropdown.Item>
    </Dropdown>
  );

  return (
    <div className={styles.container} onClick={toggleDropdown}>
      <h4>{user.fullName}</h4>
      <Avatar user={user} />
      {dropdown}
    </div>
  );
}

export default HeaderProfile;
