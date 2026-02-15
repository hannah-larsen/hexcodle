"use client";

import React, { useState, useEffect, use, useRef } from "react";
import useSound from "use-sound";
import { useLocalStorage } from "@mantine/hooks";
import { ArrowRight } from "lucide-react";
import useSavestate from "./hooks/useSavestate.js";
import Guess from "./components/Guess.js";
import { EndModal } from "./components/EndModal.js";
import Announcement from "./components/Annoucement.js";
import HexInput from "./components/HexInput.js";
import Keyboard from "./components/Keyboard.js";
import { getScore, getContrastColor } from "./utils.js";

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
  const [userInput, setUserInput] = useState(["", "", "", "", "", ""]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [statusText, setStatusText] = useState(
    "Start by typing your guess!"
  );
  const [endModalVisible, setEndModalVisible] = useState(false);
  const [isLaunchModalVisible, setIsLaunchModalVisible] = useState(false);
  const inputRef = useRef(null);

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
  }, [setLoading]);

  // Fix for old reversed save states
  useEffect(() => {
    if (guesses.length > 1 && guesses[0] === targetColor) {
      setGuesses([...guesses].reverse());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        const fullGuess = "#" + userInput.join("");
        if (fullGuess.length !== 7 || userInput.includes("")) {
          setStatusText("Error: Hex code must be exactly 6 digits.");
          return;
        }
        if (guesses.includes(fullGuess)) {
          setStatusText(
            "Already guessed this one! Please try a different guess."
          );
          return;
        }
        submitGuess(fullGuess);
        setUserInput(["", "", "", "", "", ""]);
        setSelectedIndex(0);
      } else if (key === "BACKSPACE") {
        const newUserInput = [...userInput];
        if (newUserInput[selectedIndex] !== "") {
          newUserInput[selectedIndex] = "";
          setUserInput(newUserInput);
        } else if (selectedIndex > 0) {
          newUserInput[selectedIndex - 1] = "";
          setUserInput(newUserInput);
          setSelectedIndex(selectedIndex - 1);
        }
      } else {
        if (selectedIndex < 6) {
          const newUserInput = [...userInput];
          newUserInput[selectedIndex] = key;
          setUserInput(newUserInput);
          if (selectedIndex < 5) {
            setSelectedIndex(selectedIndex + 1);
          }
        }
      }
    },
    [loading, isComplete, userInput, selectedIndex, guesses, submitGuess]
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


  return (
    <>
      <main className="flex flex-col items-center gap-1 md:gap-4 py-0 px-2 bg-cream-50">
        {/*<Announcement onClick={() => setIsLaunchModalVisible(true)} />*/}
        <section className="relative px-2 sm:px-8 pt-0 pb-2 md:py-4 text-center items-center flex flex-col w-full max-w-[600px]">
          <div className="flex flex-row w-full gap-4 sm:gap-12 mb-3 md:mb-6 h-16 md:h-24">
            <div
              className="flex-1 flex items-center justify-center p-4 rounded-xl border border-gray-200 shadow-sm transition-colors duration-500"
              style={{
                backgroundColor: targetColor,
                color: getContrastColor(targetColor),
              }}
            >
              <h2 className="text-xl md:text-2xl font-serif font-bold">
                Target
              </h2>
            </div>
            <div
              className={`flex-1 flex items-center justify-center p-4 rounded-xl border transition-all duration-500 shadow-sm ${guesses.length > 0
                ? "border-gray-200"
                : "border-dashed border-gray-300"
                }`}
              style={{
                backgroundColor:
                  guesses.length > 0
                    ? guesses[guesses.length - 1]
                    : "#f9fafb", // gray-50
                color:
                  guesses.length > 0
                    ? getContrastColor(guesses[guesses.length - 1])
                    : "#9ca3af", // gray-400
              }}
            >
              <h2 className="text-xl md:text-2xl font-serif font-bold">
                Last Guess
              </h2>
            </div>
          </div>

          <div className="flex flex-col w-full max-w-[600px]">
            {Array.from({ length: MAX_GUESSES }).map((_, index) => {
              if (!isComplete && !loading && index === guesses.length) {
                return (
                  <HexInput
                    key={index}
                    ref={inputRef}
                    userInput={userInput}
                    isCurrentRow={true}
                    selectedIndex={selectedIndex}
                    onSelect={setSelectedIndex}
                  />
                );
              }

              if (index < guesses.length) {
                return (
                  <Guess
                    key={index}
                    guess={guesses[index]}
                    type={settings.colorMode}
                    target={targetColor}
                    hardMode={settings.difficulty}
                  />
                );
              } else {
                return (
                  <HexInput key={index} userInput="#" isCurrentRow={false} />
                );
              }
            })}
          </div>

          <div className="mt-1 w-full flex justify-center">
            <button
              onClick={isComplete ? () => setEndModalVisible(true) : undefined}
              disabled={!isComplete}
              className={`bg-white border border-gray-200 px-5 py-1.5 rounded-full shadow-sm text-center transition-all group ${isComplete
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
