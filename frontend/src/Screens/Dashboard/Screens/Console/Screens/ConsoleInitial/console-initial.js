// Modules
import { useEffect, useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import { HiDocumentDuplicate } from 'react-icons/hi';

// API
import API from 'API';

// Assets
import { EducationCap } from 'Assets/Icons/education-cap';

// Components
import Card from './card';

// Config
import { ROUTES } from 'Config/routes';

// Constants
import { BLUE } from 'Constants/colors';

// Styles
import styles from './styles.module.scss';

function ConsoleInitial() {
  const [initialInfo, setInitialInfo] = useState({});
  const [pending, setPending] = useState(true);

  useEffect(() => {
    setPending(true);

    API.Admin.getInitialInfo()
      .then(setInitialInfo)
      .finally(() => setPending(false));
  }, []);

  return (
    <div className={styles.cards}>
      <Card
        count={initialInfo.users}
        description="Загальний список користувачів, а також прив'язаних до них даних щодо діяльності їх як студента та/або викладача"
        icon={<FaUserFriends className={styles.icon} size={18} />}
        key="Користувачі"
        name="Користувачі"
        to={ROUTES.consoleUsers}
      />

      <Card
        count={initialInfo.groups}
        description="Загальний список груп із можливістю їх створення, редагування та
      видалення, а також редагування їх складу"
        icon={<HiUserGroup className={styles.icon} size={18} />}
        key="Групи"
        name="Групи"
        to={ROUTES.consoleGroups}
      />

      <Card
        count={initialInfo.departments}
        description="Загальний список кафедр із можливістю їх створення, редагування та
      видалення"
        icon={<HiDocumentDuplicate className={styles.icon} size={18} />}
        key="Кафедри"
        name="Кафедри"
        to={ROUTES.consoleDepartments}
      />

      <Card
        count={initialInfo.faculties}
        description="Загальний список факультетів із можливістю їх створення,
      редагування та видаленняя"
        icon={
          <EducationCap
            className={styles.icon}
            fill={BLUE._500}
            height={18}
            width={18}
          />
        }
        key="Факультети"
        name="Факультети"
        to={ROUTES.consoleFaculties}
      />
    </div>
  );
}

export default ConsoleInitial;
