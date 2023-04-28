// Modules
import { useOutletContext } from 'react-router-dom';
import { useCallback, useState } from 'react';
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';
import map from 'lodash/map';
import take from 'lodash/take';
import { FaEllipsisH } from 'react-icons/fa';

// Components
import Avatar from 'Components/Avatar/avatar';
import Button, { BUTTON_VARIANT } from 'Components/Button';
import Dropdown from 'Components/Dropdown';
import UpdateCuratorDialog from '../ConsoleGroups/Components/UpdateCuratorDialog';
import DeleteCuratorDialog from '../ConsoleGroups/Components/DeleteCuratorDialog';

// Styles
import styles from './styles.module.scss';

const dropdownOptions = [
  {
    label: 'Змінити куратора',
    value: 'change-curator',
  },
  {
    separator: true,
  },
  {
    className: styles.redOption,
    label: 'Видалити куратора',
    value: 'remove-curator',
  },
];

function ConsoleGroupDetails(props) {
  const { group, onUpdate } = props;

  const { studentsCount, curator, createdAt, updatedAt } = group;

  const [curatorModalOpen, setCuratorModalOpen] = useState(false);
  const [removeCuratorModalOpen, setRemoveCuratorModalOpen] = useState(false);
  const [, setOutletContext] = useOutletContext();

  const openCuratorModal = useCallback(() => {
    setOutletContext({ group });
    setCuratorModalOpen(true);
  }, [group, setOutletContext]);

  const closeCuratorModal = useCallback(() => setCuratorModalOpen(false), []);

  const closeRemoveCuratorModal = useCallback(
    () => setRemoveCuratorModalOpen(false),
    []
  );

  const dropdownTarget = (
    <Button variant={BUTTON_VARIANT.secondary}>
      <FaEllipsisH size={24} />
    </Button>
  );

  const handleSelect = useCallback(
    ({ value }) => {
      switch (value) {
        case 'change-curator':
          setOutletContext({ group });
          setCuratorModalOpen(true);
          break;

        case 'remove-curator':
          setOutletContext({ group });
          setRemoveCuratorModalOpen(true);
          break;

        default:
          break;
      }
    },
    [group, setOutletContext]
  );

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
            <Button
              variant={BUTTON_VARIANT.secondary}
              onClick={openCuratorModal}
            >
              Додати куратора
            </Button>
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

            <Dropdown
              onSelect={handleSelect}
              options={dropdownOptions}
              targetElement={dropdownTarget}
            />
          </div>
        )}
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
    </div>
  );
}

export default ConsoleGroupDetails;
