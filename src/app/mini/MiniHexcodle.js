"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import useSound from "use-sound";
import { useLocalStorage } from "@mantine/hooks";
import { ArrowRight } from "lucide-react";
import useSavestate from "@/app/hooks/useSavestate.js";
import Guess from "@/app/components/Guess.js";
import Announcement from "@/app/components/Annoucement.js";
import HexInput from "@/app/components/HexInput.js";
import Keyboard from "@/app/components/Keyboard.js";
import { getScore } from "@/app/utils.js";
import { EndModal } from "../components/EndModal";

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
  const [settings, _setSettings] = useLocalStorage({
    key: "settings",
    defaultValue: {
      difficulty: "easy",
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
    "Start by typing your guess above!"
  );
  const [endModalVisible, setEndModalVisible] = useState(false);
  const [isLaunchModalVisible, setIsLaunchModalVisible] = useState(false);
  const inputRef = useRef(null);

  const hasWon = useMemo(() => {
    return guesses.includes(targetColor);
  }, [guesses, targetColor]);

  const [play] = useSound("/sounds/hexcodle4.wav", { volume: 0.4 });

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
  }, [setLoading]);

  useEffect(() => {
    if (!isComplete && !loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [guesses.length, isComplete, loading]);

  const handleKey = React.useCallback(
    (key) => {
      if (loading || isComplete) return;

      if (inputRef.current) {
        inputRef.current.focus();
      }

      if (key === "ENTER") {
        if (userInput.length !== 4) {
          setStatusText("Error: Hex code must be exactly 3 digits.");
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
        if (userInput.length < 4) {
          setUserInput(userInput + key);
        }
      }
    },
    [loading, isComplete, userInput, guesses, submitGuess]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

      // Only process keys if the game input is focused
      if (document.activeElement !== inputRef.current) return;

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
  }, [handleKey]);

  const displayGuesses = guesses;

  return (
    <>
      <main className="flex flex-col items-center gap-2 md:gap-4 py-0 px-2 bg-cream-50">
        <section className="relative px-2 sm:px-8 pt-0 pb-4 md:py-4 text-center items-center flex flex-col w-full max-w-[600px]">
          <div className="flex flex-row justify-between items-center w-full mb-3 md:mb-6 p-3 md:p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-800">
              Target Color:
            </h2>
            <div
              className="w-12 h-12 md:h-14 ml-4 rounded-lg shadow-inner border border-gray-100"
              style={{
                backgroundColor: targetColor,
              }}
            />
          </div>

          <div className="flex flex-col w-full max-w-[600px] gap-1.5 md:gap-2">
            {Array.from({ length: MAX_GUESSES }).map((_, index) => {
              if (!isComplete && !loading && index === 0) {
                return (
                  <HexInput
                    key={index}
                    ref={inputRef}
                    userInput={userInput}
                    isCurrentRow={true}
                    numDigits={3}
                  />
                );
              }

              const guessIndex = isComplete ? index : index - 1;

              if (guessIndex >= 0 && guessIndex < displayGuesses.length) {
                return (
                  <Guess
                    key={index}
                    guess={displayGuesses[guessIndex]}
                    type="hex"
                    target={targetColor}
                    hardMode={settings.difficulty}
                  />
                );
              } else {
                return <HexInput key={index} userInput="#" isCurrentRow={false} numDigits={3} />;
              }
            })}
          </div>

          <div className="my-2 mt-4 w-full flex justify-center">
            <button
              onClick={isComplete ? () => setEndModalVisible(true) : undefined}
              disabled={!isComplete}
              className={`bg-white border border-gray-200 px-6 py-3 rounded-full shadow-sm text-center transition-all group ${isComplete
                ? "cursor-pointer hover:bg-gray-50 active:scale-95 hover:border-gray-300"
                : "cursor-default"
                }`}
            >
              <p className="text-sm md:text-base font-serif font-medium text-gray-700 flex items-center justify-center gap-2">
                {statusText}{" "}
                {isComplete && (
                  <span className="font-bold text-blue-600 flex items-center gap-1">
                    Score: {getScore(targetColor, guesses)}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                )}
              </p>
            </button>
          </div>



          {!isComplete && (
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
