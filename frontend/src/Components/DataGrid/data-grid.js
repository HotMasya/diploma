// Modules
import { memo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FaEyeSlash } from 'react-icons/fa';
import isFunction from 'lodash/isFunction';
import { BsFillCalculatorFill } from 'react-icons/bs';

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

// Constants
import { RESERVED_COLUMNS } from './constants';
import { GREEN, RED } from 'Constants/colors';

// Styles
import styles from './styles.module.scss';

function renderCell(cell) {
  if (cell.column.columnDef.id === RESERVED_COLUMNS.addColumn) {
    return (
      <td className={styles.add} key={cell.id}>
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
      </td>
    );
  }

  return (
    <td
      key={cell.id}
      className={styles.editableCell}
      style={{ width: cell.column.columnDef.width }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
}

function renderHeader(header, onAddColumn = null, onEditColumn = null) {
  const columnDef = header.column.columnDef;

  var clickHandler;

  const isAddColumn =
    header.column.id === RESERVED_COLUMNS.addColumn && isFunction(onAddColumn);

  const isEditable = columnDef.editable;

  if (isEditable) {
    clickHandler = onEditColumn;
  } else if (isAddColumn) {
    clickHandler = onAddColumn;
  }

  return (
    <th key={header.id}>
      {header.isPlaceholder ? null : (
        <div
          className={cx(styles.header, {
            [styles.editable]: isAddColumn || isEditable,
          })}
          onClick={() => clickHandler(header.column.id)}
        >
          {flexRender(columnDef.header, header.getContext())}
          {!columnDef.visibleForStudents && !isAddColumn && (
            <FaEyeSlash
              color={RED._400}
              size={16}
              title="Стовпчик прихований для студентів"
            />
          )}

          {columnDef.computed && (
            <BsFillCalculatorFill
              color={GREEN._500}
              size={16}
              title="Стовпчик розраховується автоматично"
            />
          )}
        </div>
      )}
    </th>
  );
}

function DataGrid(props) {
  const {
    className,
    columns,
    data,
    meta,
    onAddColumn,
    onEditColumn,
    onCellNoteUpdate,
    onCellUpdate,
  } = props;

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    meta: {
      ...meta,
      onCellUpdate,
      onCellNoteUpdate,
    },
  });

  return (
    <table className={cx(className, styles.table)}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) =>
              renderHeader(header, onAddColumn, onEditColumn)
            )}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>{row.getVisibleCells().map(renderCell)}</tr>
        ))}
      </tbody>
    </table>
  );
}

DataGrid.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  meta: PropTypes.any,
  onSortingChange: PropTypes.func,
};

DataGrid.defaultProps = {
  className: '',
  columns: [],
  data: [],
  meta: {},
  onSortingChange: undefined,
};

export default memo(DataGrid);
