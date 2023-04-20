// Modules
import { Link, generatePath, useLocation } from 'react-router-dom';
import cx from 'classnames';
import { FaBook, FaUserAlt } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';

// Assets
import { EducationCap } from 'Assets/Icons/education-cap';

// Config
import { ROUTES } from 'Config/routes';

// Styles
import styles from './styles.module.scss';
import { Suspense, lazy } from 'react';

const UserBlock = lazy(() => import('./Components/UserBlock'));
const PermissionsBlock = lazy(() => import('./Components/PermissionsBlock'));
const StudentBlock = lazy(() => import('./Components/StudentBlock'));
const TeacherBlock = lazy(() => import('./Components/TeacherBlock'));

const tags = {
  user: 'user',
  teacher: 'teacher',
  student: 'student',
  permissions: 'permissions',
};

const tabLinks = [
  {
    icon: <FaUserAlt />,
    title: 'Користувач',
    tag: tags.user,
  },
  {
    icon: <BsFillShieldLockFill />,
    title: 'Права доступу',
    tag: tags.permissions,
  },
  {
    icon: <EducationCap />,
    title: 'Студент',
    tag: tags.student,
  },
  {
    icon: <FaBook />,
    title: 'Викладач',
    tag: tags.teacher,
  },
];

const tabs = {
  [tags.user]: UserBlock,
  [tags.permissions]: PermissionsBlock,
  [tags.teacher]: TeacherBlock,
  [tags.student]: StudentBlock,
};

function ConsoleUserDetails(props) {
  const { user } = props;

  const { state } = useLocation();

  const activeTab = state || tags.user;
  const TabContent = tabs[activeTab] || tabs[tags.user];

  return (
    <div className={styles.container}>
      <ul className={styles.tabs}>
        {tabLinks.map(({ icon, title, tag }) => (
          <li key={tag}>
            <Link
              className={cx(styles.tab, { [styles.active]: activeTab === tag })}
              to={generatePath(ROUTES.consoleUsersDetails, { userId: user.id })}
              state={tag}
            >
              {icon}
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <div className={styles.content}>
        <Suspense fallback={null}>
          <TabContent user={user} />
        </Suspense>
      </div>
    </div>
  );
}

export default ConsoleUserDetails;
