// Modules
import { memo, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaEllipsisH } from 'react-icons/fa';

// Components
import Button, { BUTTON_VARIANT } from 'Components/Button/button';
import Dropdown from 'Components/Dropdown';

// Constants
import { PERMISSION } from 'Constants/permission';

// Context
import { useUserContext } from 'Context/UserContext';

// Styles
import styles from './styles.module.scss';

function ActionsCell(props) {
  const { row, table } = props;

  const { setDetailsModalOpen, setRemoveModalOpen } = table.options.meta;
  const faculty = row.original;
  const [, setOutletContext] = useOutletContext();
  const [user] = useUserContext();

  const handleDetails = useCallback(() => {
    setOutletContext({ faculty });
    setDetailsModalOpen(true);
  }, [faculty, setDetailsModalOpen, setOutletContext]);

  const handleSelect = useCallback(
    ({ value }) => {
      switch (value) {
        case 'remove':
          setOutletContext({ faculty });
          setRemoveModalOpen(true);
          break;

        case 'details':
          handleDetails();
          break;

        default:
          alert(`${value} is not implemented yet.`);
          break;
      }
    },
    [faculty, handleDetails, setRemoveModalOpen, setOutletContext]
  );

  const options = useMemo(() => {
    const options = [
      {
        label: 'Деталі',
        value: 'details',
      },
    ];

    if (user.hasPermissions(PERMISSION.DELETE_FACULTIES)) {
      options.push(
        {
          separator: true,
        },
        {
          className: styles.remove,
          label: 'Видалити',
          value: 'remove',
        }
      );
    }

    return options;
  }, [user]);

  const dropdownTarget = (
    <Button className={styles.dropdown} variant={BUTTON_VARIANT.secondary}>
      <FaEllipsisH size={24} />
    </Button>
  );

  return (
    <div className={styles.cell}>
      <Button onClick={handleDetails} variant={BUTTON_VARIANT.secondary}>
        Деталі
      </Button>

      <Dropdown
        onSelect={handleSelect}
        options={options}
        targetElement={dropdownTarget}
      />
    </div>
  );
}

export default memo(ActionsCell);
