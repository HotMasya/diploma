export const GRID_COLUMN_TYPE = Object.freeze({
  string: 'text',
  number: 'number',
});

export const GRID_COLUMN_TYPE_MAP = Object.freeze([
  {
    labelText: 'Число',
    value: GRID_COLUMN_TYPE.number,
  },
  {
    labelText: 'Текст',
    value: GRID_COLUMN_TYPE.string,
  },
]);
