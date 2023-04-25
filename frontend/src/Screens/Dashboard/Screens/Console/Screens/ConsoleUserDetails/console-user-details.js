// Modules
import { FaBook, FaUserAlt } from 'react-icons/fa';
import { FormSpy } from 'react-final-form';
import { Link, generatePath, useLocation } from 'react-router-dom';
import { Suspense, lazy, useCallback, useState } from 'react';
import cx from 'classnames';

import {
  BsFillShieldLockFill,
  BsFillPencilFill,
  BsPlusLg,
} from 'react-icons/bs';

// Assets
import { EducationCap } from 'Assets/Icons/education-cap';

// Components
import UserSummary from './Components/UserSummary';
import Button, { BUTTON_VARIANT } from 'Components/Button';

// Config
import { ROUTES } from 'Config/routes';

// Constants
import { tags } from './constants';

// Styles
import styles from './styles.module.scss';

const UserBlock = lazy(() => import('./Components/UserBlock'));
const PermissionsBlock = lazy(() => import('./Components/PermissionsBlock'));
const StudentBlock = lazy(() => import('./Components/StudentBlock'));
const TeacherBlock = lazy(() => import('./Components/TeacherBlock'));

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
  const {
    form,
    handleSubmit,
    initialValues,
    onStudentCreate,
    onStudentRemove,
    onTeacherCreate,
    onTeacherRemove,
    user,
  } = props;

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

  const handleSave = useCallback(() => {
    form.submit().then(() => setChanges({}));
  }, [form]);

  const isEmptyTab = useCallback(
    (tag) => {
      switch (tag) {
        case tags.student:
          if (!initialValues.student) return true;
          break;

        case tags.teacher:
          if (!initialValues.teacher) return true;
          break;

        default:
          break;
      }

      return false;
    },
    [initialValues.student, initialValues.teacher]
  );

  const handleLinkClick = useCallback(
    (tag) => {
      switch (tag) {
        case tags.student:
          if (!initialValues.student) onStudentCreate();
          break;

        case tags.teacher:
          if (!initialValues.teacher) onTeacherCreate();
          break;

        default:
          break;
      }
    },
    [
      initialValues.student,
      initialValues.teacher,
      onStudentCreate,
      onTeacherCreate,
    ]
  );

  const handleDelete = useCallback(() => {
    switch (activeTab) {
      case tags.student:
        onStudentRemove();
        break;

      case tags.teacher:
        onTeacherRemove();
        break;

      default:
        break;
    }
  }, [activeTab, onStudentRemove, onTeacherRemove]);

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
              <Button onClick={handleSave}>Зберегти</Button>
            </div>
          </>
        )}
      </div>
      <ul className={styles.tabs}>
        {tabLinks.map(({ icon, title, tag }) => (
          <li key={tag} onClick={() => handleLinkClick(tag)}>
            <Link
              className={cx(styles.tab, {
                [styles.active]: activeTab === tag,
              })}
              state={tag}
              to={generatePath(ROUTES.consoleUsersDetails, { userId: user.id })}
            >
              {icon}
              {title}

              {changes[tag] && (
                <BsFillPencilFill
                  className={styles.changed}
                  title="Незбережені зміни"
                />
              )}

              {isEmptyTab(tag) && (
                <BsPlusLg
                  className={styles.changed}
                  title="Натисніть, щоб створити"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
      <form className={styles.content} onSubmit={handleSubmit}>
        <Suspense fallback={null}>
          <TabContent onDelete={handleDelete} />
        </Suspense>
      </form>
      <FormSpy onChange={handleChange} subscription={spySubscription} />
    </div>
  );
}

export default ConsoleUserDetails;
