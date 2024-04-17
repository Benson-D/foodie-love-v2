import { useState, useEffect } from "react";

/**
 * Custom Hook allows you to debounce fast changing values, e.c. search bar
 * @param value
 * @param {number} delay
 * @return debounce
 */
function useDebounce<T>(value: T, delay?: number): T {
  const [debounce, setDebounce] = useState<T>(value);

  useEffect(() => {
    const debouncedId = setTimeout(() => {
      setDebounce(value);
    }, delay ?? 800);

    return () => clearTimeout(debouncedId);
  }, [value, delay]);

  return debounce;
}

export default useDebounce;
