import { useState } from "react";
import moment from "moment-timezone";

export default function useTemporaryStorage(key, initialValue) {
  const now = moment().tz("America/New_York");
  const seed = now.format("DD-MM-YYYY");

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsedItem = JSON.parse(item);

        // Check if the seed is from today
        if (parsedItem.seed === seed) {
          return parsedItem.value;
        } else {
          // If not, remove the item and return the initial value
          window.localStorage.removeItem(key);
          return initialValue;
        }
      } else {
        return initialValue;
      }
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

      // Save the value along with today's seed
      window.localStorage.setItem(
        key,
        JSON.stringify({ value: valueToStore, seed })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
