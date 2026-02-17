"use client";

import React, { useState, useEffect, use, useRef } from "react";
import useSound from "use-sound";
import { useLocalStorage } from "@mantine/hooks";
import { ArrowRight, Share2 } from "lucide-react";
import useSavestate from "./hooks/useSavestate.js";
import Guess from "./components/Guess.js";
import { EndModal } from "./components/EndModal.js";
import Announcement from "./components/Annoucement.js";
import HexInput from "./components/HexInput.js";
import Keyboard from "./components/Keyboard.js";
import NextUnsolvedButton from "./components/NextUnsolvedButton.js";
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
          <div className="flex flex-row w-full gap-3 sm:gap-6 mb-3 md:mb-6 h-16 md:h-24">
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

          <div className="mt-2 mb-1 w-full flex items-center gap-2 md:gap-4">
            <div
              className="flex-1 h-4"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='12'%3E%3Cpath d='M0 6 Q 6 0, 12 6 T 24 6' fill='none' stroke='%231e3a8a' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat-x",
                backgroundPosition: "center",
              }}
            />
            <div className="text-sm md:text-base font-serif font-medium text-blue-900 flex items-center justify-center gap-2">
              <span>{statusText}</span>
              {isComplete && (
                <span className="font-bold">
                  Score: {getScore(targetColor, guesses)}
                </span>
              )}
            </div>
            <div
              className="flex-1 h-4"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='12'%3E%3Cpath d='M0 6 Q 6 0, 12 6 T 24 6' fill='none' stroke='%231e3a8a' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat-x",
                backgroundPosition: "center",
              }}
            />
          </div>

          {settings.colorMode === "hex" && !isComplete && (
            <Keyboard onKey={handleKey} />
          )}

          {isComplete && (
            <div className="flex flex-col w-full gap-3 mt-2">
              <button
                onClick={() => setEndModalVisible(true)}
                className="w-full py-3 md:py-4 px-4 md:px-6 bg-white border border-gray-200 text-gray-700 rounded-xl font-sans font-bold text-base md:text-lg hover:bg-gray-100 hover:border-gray-300 transition-all shadow-sm flex items-center justify-center gap-2"
              >
                View & Share Results <Share2 className="h-5 w-5" />
              </button>
              <NextUnsolvedButton maxDay={maxDay} currentNumber={number} />
            </div>
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
