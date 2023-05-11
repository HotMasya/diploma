// Modules
import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import isFunction from 'lodash/isFunction';

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

// Styles
import styles from './styles.module.scss';

function Table(props) {
  const { className, columns, data, meta, onSortingChange } = props;

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    meta,
  });

  useEffect(() => {
    if (isFunction(onSortingChange)) onSortingChange(sorting);
  }, [onSortingChange, sorting]);

  return (
    <table className={cx(className, styles.table)}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder ? null : (
                  <div
                    className={cx({
                      [styles.sortable]: header.column.getCanSort(),
                    })}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    {
                      {
                        asc: <TiArrowSortedUp />,
                        desc: <TiArrowSortedDown />,
                      }[header.column.getIsSorted()]
                    }
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  meta: PropTypes.any,
  onSortingChange: PropTypes.func,
};

Table.defaultProps = {
  className: '',
  columns: [],
  data: [],
  meta: {},
  onSortingChange: undefined,
};

export default memo(Table);
