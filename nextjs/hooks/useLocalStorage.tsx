import { useState } from 'react';

export default function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ?? initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, value);
    } catch {
      console.log('Could not get stored value');
    }
  };

  return [storedValue, setValue] as const;
}
