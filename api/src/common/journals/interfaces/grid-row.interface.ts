import { GridCell } from './grid-cell.interface';

export interface GridRow {
  id: number;
  fullName: string;

  [other: string]: GridCell | number | string;
}
