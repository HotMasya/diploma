// Modules
import { memo, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaEllipsisH } from 'react-icons/fa';

// Components
import Button, { BUTTON_VARIANT } from 'Components/Button/button';
import Dropdown from 'Components/Dropdown';

// Styles
import styles from './styles.module.scss';

const options = [
  {
    label: 'Деталі',
    value: 'details',
  },
  {
    separator: true,
  },
  {
    className: styles.remove,
    label: 'Видалити',
    value: 'remove',
  },
];

function ActionsCell(props) {
  const { row, table } = props;

  const { setDetailsModalOpen, setRemoveModalOpen } = table.options.meta;
  const department = row.original;
  const [, setOutletContext] = useOutletContext();

  const handleDetails = useCallback(() => {
    setOutletContext({ department });
    setDetailsModalOpen(true);
  }, [department, setDetailsModalOpen, setOutletContext]);

  const handleSelect = useCallback(
    ({ value }) => {
      switch (value) {
        case 'remove':
          setOutletContext({ department });
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
    [department, handleDetails, setRemoveModalOpen, setOutletContext]
  );

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
