import { GridCell } from './interfaces/grid-cell.interface';
import { GridColumn } from './interfaces/grid-column.interface';
import { GridRow } from './interfaces/grid-row.interface';

export function calculateGridCellValue(
  computedFields: string[],
  original: GridRow,
  initialValue: number,
  columns: GridColumn[],
) {
  return (
    computedFields?.reduce((acc, field) => {
      const column = columns.find(({ id }) => id === field);

      if (column?.computed) {
        acc += calculateGridCellValue(
          column.computedFields,
          original,
          initialValue,
          columns,
        );
      } else {
        const cell = original[field] as GridCell;
        acc += Number(cell?.value) || 0;
      }

      return acc;
    }, initialValue) || initialValue
  );
}
