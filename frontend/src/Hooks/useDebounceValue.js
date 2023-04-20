// Modules
import { useEffect, useState } from 'react';

export function useDebounceValue(value, delay = 200) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handle = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(handle);
    };
  }, [delay, value]);

  return debouncedValue;
}
