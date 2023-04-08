// Modules
import { Link, NavLink } from 'react-router-dom';
import cx from 'classnames';
import { FaUserGraduate } from 'react-icons/fa';
import { HiDesktopComputer } from 'react-icons/hi';

// Assets
import { EducationCap } from 'Assets/Icons/education-cap';

// Components
import HeaderProfile from 'Components/HeaderProfile';

// Config
import { ROUTES } from 'Config/routes';

// Styles
import styles from './styles.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={ROUTES.dashboard}>
        <EducationCap height={48} width={48} />
        <h2>DIPLOMA</h2>
      </Link>

      <nav className={styles.navbar}>
        <NavLink
          className={({ isActive }) => cx(styles.navlink, { [styles.active]: isActive})}
          end
          to={ROUTES.dashboard}
        >
          <FaUserGraduate size="24px" />
          Профіль
        </NavLink>

        <NavLink
          className={({ isActive }) => cx(styles.navlink, { [styles.active]: isActive})}
          end
          to={ROUTES.console}
        >
          <HiDesktopComputer size="24px" />
          Консоль
        </NavLink>
      </nav>

      <HeaderProfile />
    </header>
  );
}

export default Header;
