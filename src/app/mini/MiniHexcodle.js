"use client";

import React, { useState, useEffect, useMemo } from "react";
import useSound from "use-sound";
import { useLocalStorage } from "@mantine/hooks";
import useSavestate from "@/app/hooks/useSavestate.js";
import Guess from "@/app/components/Guess.js";
import Announcement from "@/app/components/Annoucement.js";
import MiniHexcodleInput from "@/app/components/MiniHexcodleInput.js";
import Navbar from "@/app/components/Navbar.js";
import { getScore } from "@/app/utils.js";
import { EndModal } from "../components/EndModal";
import HexKeyboard from "../components/HexKeyboard";

const MAX_GUESSES = 5;

export default function MiniHexcodle({
  targetColor,
  colorName,
  number,
  maxDay,
  isMini = true,
}) {
  const [guesses, setGuesses, isComplete, setIsComplete] = useSavestate(
    `hexcodle-mini-${number}`
  );
  /*const [settings, _setSettings] = useLocalStorage({
    key: "settings",
    defaultValue: {
      difficulty: "easy",
      colorMode: "hex",
    },
  });
  */

  const settings = { difficulty: "easy", colorMode: "hex" };
  const [streak, setStreak] = useLocalStorage({
    key: "streak",
    defaultValue: {
      lastDate: null,
      days: 0,
    },
  });
  const [loading, setLoading] = useLocalStorage({
    key: "loading",
    defaultValue: true,
  });
  const [userInput, setUserInput] = useState("");
  const [statusText, setStatusText] = useState(
    "Start by typing your guess above!"
  );
  const [endModalVisible, setEndModalVisible] = useState(false);

  const hasWon = useMemo(() => {
    return guesses.includes(targetColor);
  }, [guesses, targetColor]);

  const [play] = useSound("/sounds/hexcodle4.mp3", { volume: 0.4 });

  useEffect(() => {
    if (guesses.includes(targetColor)) {
      setStatusText("You guessed it!");
      setIsComplete(true);
    } else if (guesses.length == 0) {
      setStatusText("Start by typing your guess above!");
    } else if (guesses.length >= MAX_GUESSES) {
      setStatusText("Out of guesses.");
      setIsComplete(true);
    } else {
      setStatusText(
        `Not quite! ${MAX_GUESSES - guesses.length} guess${
          MAX_GUESSES - guesses.length === 1 ? "" : "es"
        } left.`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guesses, targetColor]);

  const submitGuess = (newGuess) => {
    if (guesses.length >= MAX_GUESSES) {
      return;
    }

    const newGuesses = [...guesses];
    newGuesses.push(newGuess);

    if (newGuesses.includes(targetColor)) {
      play();
      setEndModalVisible(true);
      if (streak.lastDate === maxDay - 1) {
        setStreak({ lastDate: maxDay, days: streak.days + 1 });
      } else if (number === maxDay) {
        setStreak({ lastDate: maxDay, days: 1 });
      }
    }

    // If user loses
    if (newGuesses.length >= MAX_GUESSES) {
      setEndModalVisible(true);
    }
    setGuesses(newGuesses);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Navbar />
      <main className="everything" style={{ minHeight: "auto" }}>
        <Announcement />
        <div className="flex flex-col gap-4 items-center justify-center max-w-xl w-full">
          <div className="flex">
            <div
              className="h-32 w-16"
              style={{ backgroundColor: targetColor }}
            />
            <div
              className={`h-32 w-16 ${
                guesses.length > 0
                  ? ""
                  : "border-2 border-black border-dashed border-l-0"
              }`}
              style={{ backgroundColor: guesses[guesses.length - 1] }}
            />
          </div>
          <div className="flex flex-col w-full justify-center items-center">
            {!loading &&
              guesses.map((guess, index) => (
                <Guess
                  key={index}
                  guess={guess}
                  type={settings.colorMode}
                  target={targetColor}
                  hardMode={settings.difficulty}
                />
              ))}
            {guesses.length !== MAX_GUESSES && (
              <Guess type="text" guess={userInput} maxLength={3} />
            )}
            {Array.from({ length: MAX_GUESSES - guesses.length - 1 }).map(
              (_, index) => (
                <Guess key={index} type="empty" maxLength={3} />
              )
            )}
          </div>
          {isComplete ? (
            <EndModal
              open={endModalVisible}
              setOpen={setEndModalVisible}
              color={targetColor}
              colorName={colorName}
              guesses={guesses}
              win={hasWon}
              hexcodleNumber={number}
              isMini={isMini}
            />
          ) : (
            <HexKeyboard
              input={userInput}
              setInput={setUserInput}
              onSubmit={(currentInput) => submitGuess(currentInput)}
              maxLength={3}
            />
          )}
        </div>
      </main>
    </>
  );
}
