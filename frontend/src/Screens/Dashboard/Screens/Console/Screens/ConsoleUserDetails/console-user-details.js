// Modules
import { Link, generatePath, useLocation } from 'react-router-dom';
import cx from 'classnames';
import { FaBook, FaUserAlt } from 'react-icons/fa';
import { BsFillShieldLockFill, BsFillPencilFill } from 'react-icons/bs';
import { Suspense, lazy, useCallback, useState } from 'react';
import { FormSpy } from 'react-final-form';

// Assets
import { EducationCap } from 'Assets/Icons/education-cap';

// Components
import UserSummary from './Components/UserSummary';

// Config
import { ROUTES } from 'Config/routes';

// Styles
import styles from './styles.module.scss';
import Button, { BUTTON_VARIANT } from 'Components/Button';

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

const spySubscription = { dirty: true };

function ConsoleUserDetails(props) {
  const { form, handleSubmit, user } = props;

  const { state } = useLocation();
  const [changes, setChanges] = useState({});
  const activeTab = state || tags.user;
  const TabContent = tabs[activeTab] || tabs[tags.user];
  const hasAnyChanges = Object.values(changes).some((c) => c);

  const handleChange = useCallback(
    ({ dirty }) => {
      setChanges((prev) => ({ ...prev, [activeTab]: dirty }));
    },
    [activeTab]
  );

  const handleReset = useCallback(() => {
    setChanges({});
    form.reset();
  }, [form]);

  return (
    <div className={styles.container}>
      <UserSummary user={user} />
      <div className={styles.toolbar}>
        {hasAnyChanges && (
          <>
            <span>
              <b>Увага!</b> У вас є незбережені зміни.
            </span>
            <div className={styles.buttons}>
              <Button onClick={handleReset} variant={BUTTON_VARIANT.secondary}>
                Скасувати
              </Button>
              <Button onClick={form.submit}>Зберегти</Button>
            </div>
          </>
        )}
      </div>
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

              {changes[tag] && (
                <BsFillPencilFill
                  className={styles.changed}
                  title="Незбережені зміни"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
      <form className={styles.content} onSubmit={handleSubmit}>
        <Suspense fallback={null}>
          <TabContent />
        </Suspense>
      </form>
      <FormSpy onChange={handleChange} subscription={spySubscription} />
    </div>
  );
}

export default ConsoleUserDetails;
