"use client";

import React, { useState, useEffect, use } from "react";
import useSound from "use-sound";
import { useLocalStorage } from "@mantine/hooks";
import useSavestate from "./hooks/useSavestate.js";
import Guess from "./components/Guess.js";
import { EndModal } from "./components/EndModal.js";
import Announcement from "./components/Annoucement.js";
import HexInput from "./components/HexInput.js";
import Keyboard from "./components/Keyboard.js";
import { getScore } from "./utils.js";

const MAX_GUESSES = 5;

export default function HexcodleGame({
  targetColor,
  colorName,
  number,
  maxDay,
  isMini = false,
}) {
  const [guesses, setGuesses, isComplete, setIsComplete] = useSavestate(number);
  const [settings, _setSettings] = useLocalStorage({
    key: "settings",
    defaultValue: {
      difficulty: "easy",
      colorMode: "hex",
    },
  });
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
  const [userInput, setUserInput] = useState("#");
  const [statusText, setStatusText] = useState(
    "Start by typing your guess!"
  );
  const [endModalVisible, setEndModalVisible] = useState(false);
  const [isLaunchModalVisible, setIsLaunchModalVisible] = useState(false);

  const hasWon = guesses.includes(targetColor);

  const [play] = useSound("/sounds/hexcodle4.wav", { volume: 0.4 });

  useEffect(() => {
    if (guesses.includes(targetColor)) {
      setStatusText("You guessed it!");
      setIsComplete(true);
    } else if (guesses.length == 0) {
      setStatusText("Start by typing your guess!");
    } else if (guesses.length >= MAX_GUESSES) {
      setStatusText("Out of guesses.");
      setIsComplete(true);
    } else {
      setStatusText(
        `Not quite! ${MAX_GUESSES - guesses.length} guess${MAX_GUESSES - guesses.length === 1 ? "" : "es"
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
    newGuesses.unshift(newGuess);

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

  const handleKey = (key) => {
    if (loading || isComplete) return;

    if (key === "ENTER") {
      if (userInput.length !== 7) {
        setStatusText("Error: Hex code must be exactly 6 digits.");
        return;
      }
      if (guesses.includes(userInput)) {
        setStatusText(
          "Already guessed this one! Please try a different guess."
        );
        return;
      }
      submitGuess(userInput);
      setUserInput("#");
    } else if (key === "BACKSPACE") {
      if (userInput.length > 1) {
        setUserInput(userInput.slice(0, -1));
      }
    } else {
      if (userInput.length < 7) {
        setUserInput(userInput + key);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
      // Prevent default behavior for Backspace to avoid browser navigation
      if (e.key === "Backspace") {
        // e.preventDefault(); // Optional, but usually good for games
      }

      if (e.key === "Enter") {
        handleKey("ENTER");
      } else if (e.key === "Backspace") {
        handleKey("BACKSPACE");
      } else if (/^[0-9a-fA-F]$/.test(e.key)) {
        handleKey(e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [userInput, isComplete, loading, guesses, settings]);

  const reversedGuesses = [...guesses].reverse();

  return (
    <>
      <main className="flex flex-col items-center gap-4 py-4 px-2 bg-cream-50">
        {/*<Announcement onClick={() => setIsLaunchModalVisible(true)} />*/}
        <section className="relative px-2 sm:px-8 py-4 text-center items-center flex flex-col w-full max-w-[600px]">
          <div className="flex flex-row justify-between items-center w-full mb-6 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-800">
              Target Color:
            </h2>
            <div
              className="flex-1 h-12 md:h-14 ml-4 rounded-lg shadow-inner border border-gray-100"
              style={{
                backgroundColor: targetColor,
              }}
            />
          </div>

          <div className="flex flex-col w-full max-w-[600px] gap-2">
            {Array.from({ length: MAX_GUESSES }).map((_, index) => {
              if (index < reversedGuesses.length) {
                return (
                  <Guess
                    key={index}
                    guess={reversedGuesses[index]}
                    type={settings.colorMode}
                    target={targetColor}
                    hardMode={settings.difficulty}
                  />
                );
              } else if (index === reversedGuesses.length && !isComplete && !loading) {
                return <HexInput key={index} userInput={userInput} isCurrentRow={true} />;
              } else {
                return <HexInput key={index} userInput="#" isCurrentRow={false} />;
              }
            })}
          </div>

          <div className="my-2 mt-4 w-full flex justify-center">
            <div className="bg-white border border-gray-200 px-6 py-3 rounded-full shadow-sm text-center">
              <p className="text-sm md:text-base font-serif font-medium text-gray-700">
                {statusText}{" "}
                {isComplete && (
                  <span className="font-bold text-blue-600 block sm:inline sm:ml-2">
                    Score: {getScore(targetColor, guesses)}
                  </span>
                )}
              </p>
            </div>
          </div>

          {settings.colorMode === "hex" && !isComplete && (
            <Keyboard onKey={handleKey} />
          )}

          {isComplete && (
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
          )}
        </section>
      </main>
    </>
  );
}
