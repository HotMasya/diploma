// Modules
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useSearchParamsWithReplace() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParamsWithReplace = useCallback(
    (func) => setSearchParams(func, { replace: true }),
    [setSearchParams]
  );

  return [searchParams, setParamsWithReplace];
}
