// Modules
import { createColumnHelper } from '@tanstack/react-table';
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';
import { BsDashLg } from 'react-icons/bs';

// Components
import ActionsCell from './Components/ActionsCell/actions-cell';

const helper = createColumnHelper();

function CenteredCell({ children }) {
  return (
    <span style={{ display: 'block', textAlign: 'center' }}>{children}</span>
  );
}

export const columns = [
  helper.accessor('name', {
    header: 'Назва',
    cell: (props) => <b>{props.getValue()}</b>,
  }),
  helper.accessor('curatorFullName', {
    header: 'Куратор',
    cell: (props) =>
      props.getValue() || (
        <BsDashLg cursor="pointer" title="Куратор відсутній" />
      ),
    enableSorting: false,
  }),
  helper.accessor('studentsCount', {
    header: <CenteredCell>Студенти</CenteredCell>,
    cell: (props) => <CenteredCell>{props.getValue()}</CenteredCell>,
    enableSorting: false,
  }),
  helper.accessor('createdAt', {
    cell: (props) =>
      formatRelative(props.getValue(), new Date(), {
        locale: ukLocale,
      }),
    header: 'Створена',
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
