// Modules
import { createColumnHelper } from '@tanstack/react-table';
import formatRelative from 'date-fns/formatRelative';
import ukLocale from 'date-fns/locale/uk';

const helper = createColumnHelper();

export const columns = [
  helper.accessor('title', {
    header: 'Вид активності',
    cell: (props) => <b title={props.getValue()}>{props.getValue()}</b>,
    enableSorting: false,
  }),
  helper.accessor('value', {
    header: 'Значення',
    cell: (props) => <span title={props.getValue()}>{props.getValue()}</span>,
    enableSorting: false,
  }),
  helper.accessor('editor', {
    header: 'Ким виставлено',
    cell: (props) => <span title={props.getValue()}>{props.getValue()}</span>,
    enableSorting: false,
  }),
  helper.accessor('note', {
    header: 'Замітка',
    cell: (props) => <span title={props.getValue()}>{props.getValue()}</span>,
    enableSorting: false,
  }),
  helper.accessor('updatedAt', {
    header: <p style={{ textAlign: 'right' }}>Коли виставлено</p>,
    enableSorting: false,
    cell: (props) =>
      props.getValue()
        ? formatRelative(new Date(props.getValue()), new Date(), {
            locale: ukLocale,
          })
        : '-',
  }),
];
