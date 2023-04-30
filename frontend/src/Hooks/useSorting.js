// Modules
import { useCallback, useMemo } from 'react';

// Constants
import { ORDER } from 'Constants/order';

// Hooks
import { useSearchParamsWithReplace } from 'Hooks/useSearchParamsWithReplace';

export function useSorting() {
  const [searchParams, setParamsWithReplace] = useSearchParamsWithReplace();

  const order = searchParams.get('o') || '';

  const handleSorting = useCallback(
    (sort) => {
      setParamsWithReplace((prev) => {
        if (!sort.length) {
          prev.delete('o');
        } else {
          const { id, desc } = sort[0];
          const order = `${id.replace('_', '.')} ${desc ? ORDER.desc : ORDER.asc}`;

          prev.set('o', order);
        }

        return prev;
      });
    },
    [setParamsWithReplace]
  );

  return useMemo(() => [order, handleSorting], [handleSorting, order]);
}
