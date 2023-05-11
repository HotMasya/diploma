// Modules
import { createColumnHelper } from '@tanstack/react-table';
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';

// Components
import ActionsCell from './Components/ActionsCell/actions-cell';

const helper = createColumnHelper();

export const columns = [
  helper.accessor('name', {
    header: 'Назва',
  }),
  helper.accessor('shortName', {
    header: 'Скорочено',
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
