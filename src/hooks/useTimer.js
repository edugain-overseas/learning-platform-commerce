import { useEffect, useRef, useState, useCallback } from "react";

const INTERVAL_DELAY = 1000;

export const useTimer = ({ initialTime = 0, onComplete, onTick }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const intervalId = useRef(null);

  const clear = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clear();
    intervalId.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - INTERVAL_DELAY;
        if (next <= 0) {
          clear();
          onComplete?.();
          return 0;
        }
        onTick?.(next);
        return next;
      });
    }, INTERVAL_DELAY);
  }, [clear, onComplete, onTick]);

  useEffect(() => {
    setTimeLeft(initialTime);
    return clear;
  }, [initialTime, clear]);

  return { timeLeft, start, clear };
};
