import { GridCell } from './grid-cell.interface';

export interface GridRow {
  id: number;
  fullName: GridCell;

  [other: string]: GridCell | number;
}
