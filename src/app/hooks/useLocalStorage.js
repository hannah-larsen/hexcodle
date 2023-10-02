import { useState } from "react";

/*
    This is a basic hook for using the useState hook in react, but with
    local storage! So instead of doing

    const [guess, setGuess] = useState("")
    
    You can do:

    const [guess, setGuess] = useLocalStorage("previousGuesses", "");

    Like normal useState it takes an initial value as one of the params (2nd param),
    and the first param is a key which creates a store for it in the browser storage.
*/

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
