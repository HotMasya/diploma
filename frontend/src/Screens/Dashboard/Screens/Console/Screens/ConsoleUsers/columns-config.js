// Modules
import { createColumnHelper } from '@tanstack/react-table';
import { FaCheckCircle } from 'react-icons/fa';
import { FaTimesCircle } from 'react-icons/fa';
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';
import { FaCrown } from 'react-icons/fa';

// Components
import ActionsCell from './Components/ActionsCell/actions-cell';

// Constants
import { GREEN, RED, YELLOW } from 'Constants/colors';
import { PERMISSION } from 'Constants/permission';

// Styles
import styles from './styles.module.scss';

const helper = createColumnHelper();

const renderVerifiedCell = (props) => (
  <span className={styles.centered}>
    {props.getValue() ? (
      <FaCheckCircle color={GREEN._500} size={24} />
    ) : (
      <FaTimesCircle color={RED._500} size={24} />
    )}
  </span>
);

const rendarFullNameCell = (props) => (
  <div className={styles.name}>
    {props.row.original.hasPermissions(PERMISSION.ADMIN) && (
      <FaCrown color={YELLOW._500} size={20} title="Адміністратор" />
    )}
    {props.row.original.fullName}
  </div>
);

export const columns = [
  helper.accessor('firstName', {
    header: "Повне ім'я",
    cell: rendarFullNameCell,
  }),
  helper.accessor('email', {
    header: 'Електронна пошта',
  }),
  helper.accessor('verified', {
    cell: renderVerifiedCell,
    enableSorting: false,
    header: <span className={styles.centered}>Підтверджений</span>,
  }),
  helper.accessor('createdAt', {
    cell: (props) =>
      formatRelative(props.getValue(), new Date(), {
        locale: ukLocale,
      }),
    header: 'Створений',
  }),
  helper.accessor('updatedAt', {
    cell: (props) =>
      formatRelative(props.getValue(), new Date(), {
        locale: ukLocale,
      }),
    header: 'Останні зміни',
  }),
  helper.display({
    id: 'actions',
    cell: (props) => <ActionsCell {...props} />,
  }),
];
