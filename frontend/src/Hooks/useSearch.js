// Modules
import { useCallback, useMemo } from 'react';

// Hooks
import { useSearchParamsWithReplace } from 'Hooks/useSearchParamsWithReplace';
import { useDebounceValue } from 'Hooks/useDebounceValue';

export function useSearch() {
  const [searchParams, setParamsWithReplace] = useSearchParamsWithReplace();

  const search = searchParams.get('q') || '';
  const debouncedSearch = useDebounceValue(search);

  const handleSearch = useCallback(
    ({ target }) => {
      setParamsWithReplace((prev) => {
        if (target.value) {
          prev.set('q', target.value);
        } else {
          prev.delete('q');
        }

        prev.delete('p');

        return prev;
      });

    },
    [setParamsWithReplace]
  );

  return useMemo(
    () => ({
      search,
      debouncedSearch,
      handleSearch,
    }),
    [debouncedSearch, handleSearch, search]
  );
}
