export interface GridCell {
  computed?: boolean;
  note?: string;
  value: string | number | string[];
  editor?: string;
  updatedAt?: Date;
}
