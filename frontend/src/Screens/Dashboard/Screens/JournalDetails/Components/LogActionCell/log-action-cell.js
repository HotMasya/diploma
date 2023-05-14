// Components
import Button, { BUTTON_VARIANT } from 'Components/Button';
import { useCallback } from 'react';

function LogActionCell(props) {
  const { row, table } = props;

  const log = row.original;

  const hightlightCell = useCallback(() => {
    table.options.meta?.onCellHighlight(log);
  }, [log, table.options]);

  return (
    <Button onClick={hightlightCell} variant={BUTTON_VARIANT.secondary}>
      Переглянути
    </Button>
  );
}

export default LogActionCell;
