// Modules
import { generatePath, useNavigate, useOutletContext } from 'react-router-dom';
import { useCallback, useMemo, useState } from 'react';
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';
import map from 'lodash/map';
import take from 'lodash/take';
import { FaEllipsisH } from 'react-icons/fa';
import cx from 'classnames';
import { FaUsersSlash } from 'react-icons/fa';

// Components
import AddStudentsDialog from './Components/AddStudentsDialog';
import Avatar from 'Components/Avatar/avatar';
import Button, { BUTTON_VARIANT } from 'Components/Button';
import DeleteCuratorDialog from '../ConsoleGroups/Components/DeleteCuratorDialog';
import Dropdown from 'Components/Dropdown';
import Input from 'Components/Input/input';
import Paginator from 'Components/Paginator/paginator';
import RemoveStudentDialog from './Components/RemoveStudentDialog';
import Table from 'Components/Table';
import UpdateCuratorDialog from '../ConsoleGroups/Components/UpdateCuratorDialog';

// Config
import { ROUTES } from 'Config/routes';

// Constants
import { tags } from '../ConsoleUserDetails/constants';
import { columns } from './columns-config';
import { RED } from 'Constants/colors';
import { PERMISSION } from 'Constants/permission';

// Context
import { useUserContext } from 'Context/UserContext';

// Styles
import styles from './styles.module.scss';

function ConsoleGroupDetails(props) {
  const {
    group,
    onPageChange,
    onSearch,
    onSort,
    search,
    currentPage,
    onUpdate,
    students,
  } = props;

  const { studentsCount, curator, createdAt, updatedAt } = group;

  const navigate = useNavigate();

  const [curatorModalOpen, setCuratorModalOpen] = useState(false);
  const [addStudentsModalOpen, setStudentsModalOpen] = useState(false);
  const [removeCuratorModalOpen, setRemoveCuratorModalOpen] = useState(false);
  const [removeStudentModalOpen, setRemoveStudentModalOpen] = useState(false);

  const [, setOutletContext] = useOutletContext();
  const [user] = useUserContext();

  const openCuratorModal = useCallback(() => {
    setOutletContext({ group });
    setCuratorModalOpen(true);
  }, [group, setOutletContext]);

  const openStudentsModal = useCallback(() => {
    setOutletContext({ group });
    setStudentsModalOpen(true);
  }, [group, setOutletContext]);

  const openRemoveStudentModal = useCallback(
    (student) => {
      setOutletContext({ student, group });
      setRemoveStudentModalOpen(true);
    },
    [group, setOutletContext]
  );

  const closeStudentsModal = useCallback(() => setStudentsModalOpen(false), []);

  const closeCuratorModal = useCallback(() => setCuratorModalOpen(false), []);

  const closeRemoveCuratorModal = useCallback(
    () => setRemoveCuratorModalOpen(false),
    []
  );

  const closeRemoveStudentModal = useCallback(
    () => setRemoveStudentModalOpen(false),
    []
  );

  const dropdownTarget = (
    <Button variant={BUTTON_VARIANT.secondary}>
      <FaEllipsisH size={24} />
    </Button>
  );

  const tableMeta = useMemo(
    () => ({
      openRemoveStudentModal,
    }),
    [openRemoveStudentModal]
  );

  const curatorOptions = useMemo(() => {
    const options = [];

    if (
      !user.hasPermissions(PERMISSION.READ_USERS) &&
      !user.hasPermissions(PERMISSION.UPDATE_GROUPS)
    ) {
      return options;
    }

    if (user.hasPermissions(PERMISSION.UPDATE_GROUPS)) {
      options.push({
        label: 'Змінити куратора',
        value: 'change-curator',
      });
    }

    if (user.hasPermissions(PERMISSION.READ_USERS)) {
      options.push({
        label: 'Деталі',
        value: 'edit-curator',
      });
    }

    if (options.length && user.hasPermissions(PERMISSION.UPDATE_GROUPS)) {
      options.push({
        separator: true,
      });
    }

    if (user.hasPermissions(PERMISSION.UPDATE_GROUPS)) {
      options.push({
        className: styles.redOption,
        label: 'Видалити куратора',
        value: 'remove-curator',
      });
    }
  }, [user]);

  const handleSelect = useCallback(
    ({ value }) => {
      switch (value) {
        case 'change-curator':
          setOutletContext({ group });
          setCuratorModalOpen(true);
          break;

        case 'edit-curator':
          const path = generatePath(ROUTES.consoleUsersDetails, {
            userId: group.curator.user.id,
          });
          navigate(path, { state: tags.teacher });
          break;

        case 'remove-curator':
          setOutletContext({ group });
          setRemoveCuratorModalOpen(true);
          break;

        default:
          break;
      }
    },
    [group, navigate, setOutletContext]
  );

  const showCuratorDropdown =
    user.hasPermissions(PERMISSION.READ_USERS) ||
    user.hasPermissions(PERMISSION.UPDATE_GROUPS);

  return (
    <div className={styles.container}>
      <h3>Інформація про групу: {group.name}</h3>
      <div className={styles.basic}>
        <p>
          Кілкість студентів: <b>{studentsCount}</b>
        </p>
        <p>
          Створена:&nbsp;
          <b>{formatRelative(createdAt, new Date(), { locale: ukLocale })}</b>
        </p>
        <p>
          Останні зміни:&nbsp;
          <b>{formatRelative(updatedAt, new Date(), { locale: ukLocale })}</b>
        </p>
      </div>

      <div className={styles.container}>
        <h3>Куратор групи</h3>
        {!curator ? (
          <p className={styles.empty}>
            У даної групи відсутній куратор.
            {user.hasPermissions(PERMISSION.UPDATE_GROUPS) && (
              <Button
                variant={BUTTON_VARIANT.secondary}
                onClick={openCuratorModal}
              >
                Додати куратора
              </Button>
            )}
          </p>
        ) : (
          <div className={styles.curator}>
            <Avatar size={32} user={curator.user} />
            <b className={styles.name}>{curator.user.fullName}</b>
            <span className={styles.email}>{curator.user.email}</span>
            <div className={styles.departments}>
              {map(take(curator.departments, 3), ({ name, shortName }) => (
                <span key={shortName} title={name}>
                  {shortName}
                </span>
              ))}
            </div>

            {showCuratorDropdown && (
              <Dropdown
                onSelect={handleSelect}
                options={curatorOptions}
                targetElement={dropdownTarget}
              />
            )}
          </div>
        )}
      </div>

      <div className={cx(styles.container, styles.table)}>
        <h3>Студенти ({group.studentsCount})</h3>
        <div className={styles.search}>
          <Input onChange={onSearch} placeholder="Пошук..." value={search} />
          {user.hasPermissions(PERMISSION.UPDATE_GROUPS) && (
            <Button onClick={openStudentsModal}>Додати студентів</Button>
          )}
        </div>
        <Table
          columns={columns}
          data={students}
          meta={tableMeta}
          onSortingChange={onSort}
        />
        {!group.studentsCount && (
          <div className={styles.placeholder}>
            <FaUsersSlash color={RED._500} size={128} />
            <h2>У даної групи ще нема студентів</h2>
            {user.hasPermissions(PERMISSION.UPDATE_GROUPS) ? (
              <p>
                Але ви можете їх&nbsp;
                <button onClick={openStudentsModal}>додати</button>.
              </p>
            ) : (
              <p>
                Нажаль, у вас недостатньо прав, щоб додавати студентів в групи
              </p>
            )}
          </div>
        )}
        <Paginator
          className={styles.paginator}
          currentPage={currentPage}
          onChange={onPageChange}
          total={group?.studentsCount}
        />
      </div>

      {curatorModalOpen && (
        <UpdateCuratorDialog onClose={closeCuratorModal} onUpdate={onUpdate} />
      )}

      {removeCuratorModalOpen && (
        <DeleteCuratorDialog
          onClose={closeRemoveCuratorModal}
          onDelete={onUpdate}
        />
      )}

      {addStudentsModalOpen && (
        <AddStudentsDialog onClose={closeStudentsModal} onUpdate={onUpdate} />
      )}

      {removeStudentModalOpen && (
        <RemoveStudentDialog
          onClose={closeRemoveStudentModal}
          onDelete={onUpdate}
        />
      )}
    </div>
  );
}

export default ConsoleGroupDetails;
