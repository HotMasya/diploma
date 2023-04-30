// Modules
import { createColumnHelper } from '@tanstack/react-table';
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';
import { BsDashLg } from 'react-icons/bs';

// Components
import ActionsCell from './Components/ActionsCell';

const helper = createColumnHelper();

export const columns = [
  helper.accessor('user.fullName', {
    header: "Ім'я",
    cell: (props) => <b>{props.getValue()}</b>,
  }),
  helper.accessor('user.email', {
    header: 'Електронна пошта',
  }),
  helper.accessor('faculty.shortName', {
    header: 'Факультет',
    cell: (props) =>
      props.getValue() || (
        <BsDashLg cursor="pointer" title="Факультет відсутній" />
      ),
    enableSorting: false,
  }),
  helper.accessor('user.createdAt', {
    cell: (props) =>
      formatRelative(props.getValue(), new Date(), {
        locale: ukLocale,
      }),
    header: 'Створений',
  }),
  helper.accessor('user.updatedAt', {
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
