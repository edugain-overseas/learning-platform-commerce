import { useEffect, useRef, useCallback } from "react";
import useLocalStorage from "./useLocalStorage";

const INTERVAL_DELAY = 1000;

export const useTimer = ({
  initialTime = 0,
  onComplete,
  onTick,
  storageKey,
}) => {
  const [timeLeft, setTimeLeft] = useLocalStorage(storageKey, initialTime);
  const intervalId = useRef(null);

  const clear = useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clear();
    if (!timeLeft) {
      setTimeLeft(initialTime);
    }
    intervalId.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - INTERVAL_DELAY;
        if (next <= 0) {
          clear();
          setTimeout(() => {
            onComplete?.();
          }, 0);
          return 0;
        }
        onTick?.(next);
        return next;
      });
    }, INTERVAL_DELAY);
    // eslint-disable-next-line
  }, [clear, onComplete, onTick]);

  useEffect(() => {
    setTimeLeft((prev) => (prev === undefined ? initialTime : prev));
    return clear;
  }, [initialTime, clear, setTimeLeft]);

  return { timeLeft, start, clear };
};
