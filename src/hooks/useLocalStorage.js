import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    
    if (jsonValue) {
      try {
        return JSON.parse(jsonValue);
      } catch (error) {
        console.log(error);
      }
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
