import { useState, useEffect } from "react";

export default function useSavestate(gameNumber) {
  const [gameData, setGameData] = useState(() => {
    try {
      const saves =
        JSON.parse(window.localStorage.getItem("hexcodleSaves")) || {};
      return saves[gameNumber] || { guesses: [], isComplete: false };
    } catch (error) {
      return { guesses: [], isComplete: false };
    }
  });

  useEffect(() => {
    try {
      const saves =
        JSON.parse(window.localStorage.getItem("hexcodleSaves")) || {};
      saves[gameNumber] = gameData;
      window.localStorage.setItem("hexcodleSaves", JSON.stringify(saves));
    } catch (error) {}
  }, [gameData, gameNumber]);

  const setGuesses = (newGuesses) => {
    setGameData((prevGameData) => ({
      ...prevGameData,
      guesses:
        newGuesses instanceof Function
          ? newGuesses(prevGameData.guesses)
          : newGuesses,
    }));
  };

  const setIsComplete = (isComplete) => {
    setGameData((prevGameData) => ({
      ...prevGameData,
      isComplete,
    }));
  };

  return [gameData.guesses, setGuesses, gameData.isComplete, setIsComplete];
}
