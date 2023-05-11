// Modules
import { Link, NavLink } from 'react-router-dom';
import cx from 'classnames';
import { FaUserGraduate, FaBook, FaStar } from 'react-icons/fa';
import { HiDesktopComputer } from 'react-icons/hi';
import get from 'lodash/get';

// Assets
import { EducationCap } from 'Assets/Icons/education-cap';

// Components
import HeaderProfile from 'Components/HeaderProfile';

// Context
import { useUserContext } from 'Context/UserContext';

// Config
import { ROUTES } from 'Config/routes';

// Styles
import styles from './styles.module.scss';
import { PERMISSION } from 'Constants/permission';

function Header() {
  const [user] = useUserContext();

  if (!user) return null;

  const isTeacher = Boolean(get(user, 'teacher'));
  const isStudent = Boolean(get(user, 'student'));
  const canUseConsole = [
    user.hasPermissions(PERMISSION.READ_USERS),
    user.hasPermissions(PERMISSION.READ_GROUPS),
    user.hasPermissions(PERMISSION.READ_DEPARTMENTS),
    user.hasPermissions(PERMISSION.READ_FACULTIES),
  ].some(Boolean);

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={ROUTES.dashboard}>
        <EducationCap height={48} width={48} />
        <h2>DIPLOMA</h2>
      </Link>

      <nav className={styles.navbar}>
        <NavLink
          className={({ isActive }) =>
            cx(styles.navlink, { [styles.active]: isActive })
          }
          end
          to={ROUTES.dashboard}
        >
          <FaUserGraduate size="24px" />
          Профіль
        </NavLink>

        {isStudent && (
          <NavLink
            className={({ isActive }) =>
              cx(styles.navlink, { [styles.active]: isActive })
            }
            to={ROUTES.grades}
          >
            <FaStar size="24px" />
            Оцінки
          </NavLink>
        )}

        {isTeacher && (
          <NavLink
            className={({ isActive }) =>
              cx(styles.navlink, { [styles.active]: isActive })
            }
            to={ROUTES.journals}
          >
            <FaBook size="24px" />
            Журнали
          </NavLink>
        )}

        {canUseConsole && (
          <NavLink
            className={({ isActive }) =>
              cx(styles.navlink, { [styles.active]: isActive })
            }
            to={ROUTES.console}
          >
            <HiDesktopComputer size="24px" />
            Консоль
          </NavLink>
        )}
      </nav>

      <HeaderProfile />
    </header>
  );
}

export default Header;
