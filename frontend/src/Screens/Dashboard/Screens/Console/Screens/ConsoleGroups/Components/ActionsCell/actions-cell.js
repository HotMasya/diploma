// Modules
import { memo, useCallback } from 'react';
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

// Styles
import styles from './styles.module.scss';

const options = [
  {
    label: 'Змінити куратора',
    value: 'change_curator',
  },
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

  const { setDeleteModalOpen, setCuratorModalOpen } = table.options.meta;
  const group = row.original;
  const [, setOutletContext] = useOutletContext();
  const navigate = useNavigate();

  const groupId = get(group, 'id');
  const detailsPath = generatePath(ROUTES.consoleGroupsDetails, { groupId });

  const handleSelect = useCallback(
    ({ value }) => {
      switch (value) {
        case 'remove':
          setOutletContext({ group });
          setDeleteModalOpen(true);
          break;

        case 'details':
          navigate(detailsPath);
          break;

        case 'change_curator':
          setOutletContext({ group });
          setCuratorModalOpen(true);
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
