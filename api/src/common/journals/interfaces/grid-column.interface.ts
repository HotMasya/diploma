export interface GridColumn {
  computed: boolean;
  computedFields: string[];
  editable: boolean;
  id: string;
  title: string;
  type: 'string' | 'number';
  visibleForStudents: boolean;
}
