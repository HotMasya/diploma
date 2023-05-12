// Modules
import { memo, useCallback, useMemo } from 'react';
import {
  Link,
  generatePath,
  useNavigate,
  useOutletContext,
} from 'react-router-dom';
import { FaEllipsisH } from 'react-icons/fa';
import get from 'lodash/get';

// Components
import Button, { BUTTON_VARIANT } from 'Components/Button';
import Dropdown from 'Components/Dropdown';

// Config
import { ROUTES } from 'Config/routes';

// Constants
import { PERMISSION } from 'Constants/permission';

// Context
import { useUserContext } from 'Context/UserContext';

// Styles
import styles from './styles.module.scss';

function ActionsCell(props) {
  const { row, table } = props;

  const { setCuratorModalOpen, setDeleteModalOpen, setDeleteCuratorModalOpen } =
    table.options.meta;

  const [user] = useUserContext();
  const group = row.original;
  const [, setOutletContext] = useOutletContext();
  const navigate = useNavigate();

  const groupId = get(group, 'id');
  const detailsPath = generatePath(ROUTES.consoleGroupsDetails, { groupId });

  const options = useMemo(() => {
    const options = [];

    if (user.hasPermissions(PERMISSION.UPDATE_GROUPS)) {
      options.push({
        label: 'Змінити куратора',
        value: 'change_curator',
      });
    }

    options.push({
      label: 'Деталі',
      value: 'details',
    });

    if (
      (group.curator && user.hasPermissions(PERMISSION.UPDATE_GROUPS)) ||
      user.hasPermissions(PERMISSION.DELETE_GROUPS)
    ) {
      options.push({
        separator: true,
      });
    }

    if (group.curator && user.hasPermissions(PERMISSION.UPDATE_GROUPS)) {
      options.push({
        className: styles.remove,
        label: 'Видалити куратора',
        value: 'remove_curator',
      });
    }

    if (user.hasPermissions(PERMISSION.DELETE_GROUPS)) {
      options.push({
        className: styles.remove,
        label: 'Видалити',
        value: 'remove',
      });
    }

    return options;
  }, [group.curator, user]);

  const handleSelect = useCallback(
    ({ value }) => {
      switch (value) {
        case 'change_curator':
          setOutletContext({ group });
          setCuratorModalOpen(true);
          break;

        case 'details':
          navigate(detailsPath);
          break;

        case 'remove_curator':
          setOutletContext({ group });
          setDeleteCuratorModalOpen(true);
          break;

        case 'remove':
          setOutletContext({ group });
          setDeleteModalOpen(true);
          break;

        default:
          alert(`${value} is not implemented yet.`);
          break;
      }
    },
    [
      detailsPath,
      group,
      navigate,
      setCuratorModalOpen,
      setDeleteCuratorModalOpen,
      setDeleteModalOpen,
      setOutletContext,
    ]
  );

  const dropdownTarget = (
    <Button className={styles.dropdown} variant={BUTTON_VARIANT.secondary}>
      <FaEllipsisH size={24} />
    </Button>
  );

  return (
    <div className={styles.cell}>
      <Link className={styles.actions} to={detailsPath}>
        <Button variant={BUTTON_VARIANT.secondary}>Деталі</Button>
      </Link>

      <Dropdown
        onSelect={handleSelect}
        options={options}
        targetElement={dropdownTarget}
      />
    </div>
  );
}

export default memo(ActionsCell);
