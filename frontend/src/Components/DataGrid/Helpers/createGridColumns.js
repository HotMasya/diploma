// Modules
import { useCallback, useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { BsFillPencilFill } from 'react-icons/bs';

// Constants
import { RESERVED_COLUMNS } from '../constants';
import { GRID_COLUMN_TYPE } from 'Constants/grid-column-type';

// Styles
import styles from '../styles.module.scss';

const helper = createColumnHelper();

function EditableCell(props) {
  const {
    getValue,
    row: { index },
    column: { id },
    table,
    type,
  } = props;

  const initialValue = getValue()?.value || '';
  const note = getValue()?.note;

  const [value, setValue] = useState(initialValue);
  const [changed, setChanged] = useState(false);

  const onBlur = useCallback(() => {
    if (!changed) return;

    table.options.meta?.onCellUpdate(index, id, value);
    setChanged(false);
  }, [changed, id, index, table.options.meta, value]);

  const handleChange = useCallback(({ target }) => {
    setValue(target.value);
    setChanged(true);
  }, []);

  const handleDoubleClick = useCallback(() => {
    table.options.meta?.onCellNoteUpdate(index, id);
  }, [id, index, table]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className={styles.inputWrapper} id={`grid-cell-${index}-${id}`}>
      <input
        className={styles.input}
        onBlur={onBlur}
        onChange={handleChange}
        onDoubleClick={handleDoubleClick}
        type={type}
        value={value}
      />

      {!!note && <BsFillPencilFill size={12} title="Ця клітинка має замітку" />}
    </div>
  );
}

function calculateGridCellValue(computedFields, original, initialValue, columns) {
  return (
    computedFields?.reduce((acc, field) => {
      const column = columns.find(({ id }) => id === field);

      if (column?.computed) {
        acc += calculateGridCellValue(column.computedFields, original, initialValue, columns);
      } else {
        acc += Number(original[field]?.value) || 0;
      }

      return acc;
    }, initialValue) || initialValue
  );
}

function ComputableCell(props) {
  const {
    column: { id },
    columns,
    computedFields,
    getValue,
    row: { original, index },
    table,
  } = props;

  const note = getValue()?.note;

  const value = calculateGridCellValue(computedFields, original, 0, columns);

  const handleDoubleClick = useCallback(() => {
    table.options.meta?.onCellNoteUpdate(index, id);
  }, [id, index, table]);

  return (
    <div className={styles.inputWrapper} id={`grid-cell-${index}-${id}`}>
      <input
        className={styles.input}
        onDoubleClick={handleDoubleClick}
        readOnly
        value={value ? value.toFixed(2) : ''}
      />

      {!!note && <BsFillPencilFill size={12} title="Ця клітинка має замітку" />}
    </div>
  );
}

export const createGridColumns = (
  columns,
  expendable = true,
  editable = true
) => {
  const gridColumns = [
    helper.display({
      enableSorting: false,
      header: '№',
      cell: (props) => props.row.index + 1,
      width: 100,
    }),
  ];

  columns.forEach((column) => {
    const accessor = helper.accessor(column.id, {
      header: column.title,
      editable: editable ? column.editable : false,
      visibleForStudents: column.visibleForStudents,
      computed: column.computed,
      enableSorting: false,
    });

    if (column.id === RESERVED_COLUMNS.fullName) {
      accessor.cell = ({ cell }) => <b>{cell.getValue().value}</b>;
    } else if (column.computed) {
      accessor.cell = (props) => (
        <ComputableCell
          {...props}
          computedFields={column.computedFields}
          columns={columns}
        />
      );
    } else if (column.editable) {
      accessor.cell = (props) => (
        <EditableCell
          {...props}
          type={column.type || GRID_COLUMN_TYPE.string}
        />
      );
    }

    gridColumns.push(accessor);
  });

  if (expendable) {
    const display = helper.display({
      id: RESERVED_COLUMNS.addColumn,
      header: '+ Додати стовпчик',
      enableSorting: false,
    });

    gridColumns.push(display);
  }

  return gridColumns;
};
