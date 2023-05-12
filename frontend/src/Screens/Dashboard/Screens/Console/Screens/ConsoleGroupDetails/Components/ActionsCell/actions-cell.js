// Modules
import { memo, useCallback, useMemo } from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';
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

  const [user] = useUserContext();

  const { openRemoveStudentModal } = table.options.meta;
  const student = row.original;
  const navigate = useNavigate();

  const userId = get(student, 'user.id');
  const detailsPath = generatePath(ROUTES.consoleUsersDetails, {
    userId,
  });

  const options = useMemo(() => {
    const options = [];

    if (user.hasPermissions(PERMISSION.READ_USERS)) {
      options.push({
        label: 'Деталі',
        value: 'details',
      });
    }

    if (options.length && user.hasPermissions(PERMISSION.UPDATE_GROUPS)) {
      options.push({
        separator: true,
      });
    }

    if (user.hasPermissions(PERMISSION.UPDATE_GROUPS)) {
      options.push({
        className: styles.remove,
        label: 'Видалити з групи',
        value: 'remove',
      });
    }

    return options;
  }, [user]);

  const handleSelect = useCallback(
    ({ value }) => {
      switch (value) {
        case 'remove':
          openRemoveStudentModal(student);
          break;

        case 'details':
          navigate(detailsPath);
          break;

        default:
          alert(`${value} is not implemented yet.`);
          break;
      }
    },
    [detailsPath, navigate, openRemoveStudentModal, student]
  );

  const dropdownTarget = (
    <Button className={styles.dropdown} variant={BUTTON_VARIANT.secondary}>
      <FaEllipsisH size={24} />
    </Button>
  );

  const showDropdown =
    user.hasPermissions(PERMISSION.READ_USERS) ||
    user.hasPermissions(PERMISSION.UPDATE_GROUPS);

  return (
    <div className={styles.cell}>
      {user.hasPermissions(PERMISSION.READ_USERS) && (
        <Link className={styles.actions} to={detailsPath}>
          <Button variant={BUTTON_VARIANT.secondary}>Деталі</Button>
        </Link>
      )}

      {showDropdown && (
        <Dropdown
          onSelect={handleSelect}
          options={options}
          targetElement={dropdownTarget}
        />
      )}
    </div>
  );
}

export default memo(ActionsCell);
