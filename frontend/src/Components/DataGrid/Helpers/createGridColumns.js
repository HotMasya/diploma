// Modules
import { useCallback, useEffect, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import { BsFillPencilFill } from 'react-icons/bs';

// Constants
import { RESERVED_COLUMNS } from '../constants';

// Styles
import styles from '../styles.module.scss';

const helper = createColumnHelper();

function EditableCell(props) {
  const {
    getValue,
    row: { index },
    column: { id },
    table,
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
        value={value}
      />

      {!!note && <BsFillPencilFill size={12} title="Ця клітинка має замітку" />}
    </div>
  );
}

export const createGridColumns = (columns, expendable = true, editable = true) => {
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
      enableSorting: false,
    });

    if (column.id === RESERVED_COLUMNS.fullName) {
      accessor.cell = ({ cell }) => <b>{cell.getValue().value}</b>;
    }

    if (column.editable) {
      accessor.cell = EditableCell;
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
