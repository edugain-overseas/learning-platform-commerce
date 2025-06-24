import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue !== null) {
      return JSON.parse(jsonValue);
    }
    return initialValue;
  });

  useEffect(() => {
    if (key === null) {
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));

    // eslint-disable-next-line
  }, [value]);

  useEffect(() => {
    if (key) {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue !== null) {
        setValue(JSON.parse(jsonValue));
      }
    }
  }, [key]);

  return [value, setValue];
};

export default useLocalStorage;
