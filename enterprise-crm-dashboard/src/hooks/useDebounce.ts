import { useEffect, useState } from "react";

export const useDebounce = <T>(values: T, delay = 500) => {
  const [debouncedValue, setDebounceValue] = useState(values);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(values);
    }, delay);
    return () => clearTimeout(timer);
  }, [values, delay]);

  return debouncedValue;
};
