// Hooks
import { useSearchParamsWithReplace } from 'Hooks/useSearchParamsWithReplace';
import { useCallback, useMemo } from 'react';

export function usePagination() {
  const [searchParams, setParamsWithReplace] = useSearchParamsWithReplace();

  const currentPage = Number(searchParams.get('p')) || 1;

  const handlePagination = useCallback(
    (newPage) => {
      setParamsWithReplace((prev) => {
        if (newPage > 1) {
          prev.set('p', newPage);
        } else {
          prev.delete('p');
        }

        return prev;
      });
    },
    [setParamsWithReplace]
  );

  return useMemo(
    () => [currentPage, handlePagination],
    [currentPage, handlePagination]
  );
}
