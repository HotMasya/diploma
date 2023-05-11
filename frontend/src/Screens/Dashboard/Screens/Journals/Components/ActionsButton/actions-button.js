// Modules
import { memo, useCallback } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { FaEllipsisH } from 'react-icons/fa';
import get from 'lodash/get';

// Components
import Button, { BUTTON_VARIANT } from 'Components/Button';
import Dropdown from 'Components/Dropdown';

// Config
import { ROUTES } from 'Config/routes';

// Styles
import styles from './styles.module.scss';

const options = [
  {
    label: 'Редагувати',
    value: 'edit',
  },
  {
    label: 'Перейти до журналу',
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

function ActionsButton(props) {
  const { journal, onEdit, onRemove } = props;

  const navigate = useNavigate();
  const journalId = get(journal, 'id');

  const handleSelect = useCallback(
    ({ value }) => {
      switch (value) {
        case 'edit':
          onEdit(journal);
          break;

        case 'remove':
          onRemove(journal);
          break;

        case 'details':
          const path = generatePath(ROUTES.journalDetails, { journalId });
          navigate(path);
          break;

        default:
          alert(`${value} is not implemented yet.`);
          break;
      }
    },
    [journal, journalId, navigate, onEdit, onRemove]
  );

  const dropdownTarget = (
    <Button variant={BUTTON_VARIANT.secondary}>
      <FaEllipsisH size={24} />
    </Button>
  );

  return (
    <Dropdown
      onSelect={handleSelect}
      options={options}
      targetElement={dropdownTarget}
    />
  );
}

export default memo(ActionsButton);
