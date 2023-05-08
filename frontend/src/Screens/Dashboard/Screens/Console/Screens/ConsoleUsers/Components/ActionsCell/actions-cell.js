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
import Button, { BUTTON_VARIANT } from 'Components/Button/button';
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

  const { setDeleteModalOpen, setPasswordModalOpen } = table.options.meta;
  const user = row.original;
  const [, setOutletContext] = useOutletContext();
  const [currentUser] = useUserContext();
  const navigate = useNavigate();

  const userId = get(user, 'id');
  const detailsPath = generatePath(ROUTES.consoleUsersDetails, { userId });

  const options = useMemo(() => {
    const options = [];

    if (currentUser.hasPermissions(PERMISSION.UPDATE_USERS)) {
      options.push({
        label: 'Змінити пароль',
        value: 'password',
      });
    }

    options.push({
      label: 'Деталі',
      value: 'details',
    });

    if (
      currentUser.hasPermissions(PERMISSION.DELETE_USERS) &&
      currentUser.id !== userId
    ) {
      options.push({
        separator: true,
      });

      options.push({
        className: styles.remove,
        label: 'Видалити',
        value: 'remove',
      });
    }

    return options;
  }, [currentUser, userId]);

  const handleSelect = useCallback(
    ({ value }) => {
      switch (value) {
        case 'remove':
          setOutletContext({ user });
          setDeleteModalOpen(true);
          break;

        case 'details':
          navigate(detailsPath);
          break;

        case 'password':
          setOutletContext({ user });
          setPasswordModalOpen(true);
          break;

        default:
          alert(`${value} is not implemented yet.`);
          break;
      }
    },
    [
      detailsPath,
      navigate,
      setDeleteModalOpen,
      setOutletContext,
      setPasswordModalOpen,
      user,
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
