import { useCallback, useRef } from "react";

function useDebouncedFunction(callback, delay) {
  const timer = useRef(null);

  const debouncedFunction = useCallback(
    (...args) => {
      // Clear the previous timer
      if (timer.current) {
        clearTimeout(timer.current);
      }

      
      timer.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );

  return debouncedFunction;
}

export default useDebouncedFunction;
