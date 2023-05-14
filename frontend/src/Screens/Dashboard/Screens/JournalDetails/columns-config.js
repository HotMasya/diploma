// Modules
import { createColumnHelper } from '@tanstack/react-table';
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';

// Components
import LogActionCell from './Components/LogActionCell';

/**
 * @type {import('@tanstack/react-table').ColumnHelper<import('Models/Log').default>}
 */
const helper = createColumnHelper();

export const columns = [
  helper.accessor('columnTitle', {
    header: 'Стовпчик',
    enableSorting: false,
  }),
  helper.accessor('student.user.fullName', {
    header: 'Студент',
    enableSorting: false,
  }),
  helper.accessor('message', {
    header: 'Зміст',
    enableSorting: false,
  }),
  helper.accessor('teacher.user.fullName', {
    header: 'Викладач',
    enableSorting: false,
  }),
  helper.accessor('createdAt', {
    header: 'Дата',
    enableSorting: false,
    cell: (props) =>
      formatRelative(props.getValue(), new Date(), { locale: ukLocale }),
  }),
  helper.display({
    id: 'actions',
    cell: LogActionCell,
  })
];
