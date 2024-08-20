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
  const [userInput, setUserInput] = useState("#");
  const [statusText, setStatusText] = useState(
    "Start by typing your guess above!"
  );
  const [endModalVisible, setEndModalVisible] = useState(false);
  const [isLaunchModalVisible, setIsLaunchModalVisible] = useState(false);

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

  return (
    <>
      <Navbar />
      <main className="everything">
        <Announcement onClick={() => setIsLaunchModalVisible(true)} />{" "}
        <section className="frosted-glass" style={{ position: "relative" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "end",
              width: "100%",
              marginBottom: 8,
            }}
          >
            <div className="first-square" style={{ flex: 1 }}>
              <h2
                className="guess-title text-xl roboto font-semibold"
                style={{ marginBottom: 8 }}
              >
                Target
              </h2>
              <div
                className="square"
                style={{ backgroundColor: targetColor }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h2
                className="guess-title text-xl roboto font-semibold"
                style={{ marginBottom: 8 }}
              >
                Your Guess
              </h2>
              <div className="square" style={{ backgroundColor: guesses[0] }} />
            </div>
          </div>
          <div className="input-section">
            {loading ? (
              <div style={{ width: 250, height: 36 }} />
            ) : (
              <MiniHexcodleInput
                userInput={userInput}
                setUserInput={setUserInput}
                onClick={submitGuess}
                gameOver={isComplete}
                guesses={guesses}
                setStatusText={setStatusText}
                type={settings.colorMode}
              />
            )}
            <p className="status-text pt-2">
              {statusText}{" "}
              {isComplete
                ? `Your score is ${getScore(targetColor, guesses)}`
                : ""}
            </p>
          </div>
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
        <section
          className="frosted-glass guess-section"
          style={{ overflowX: "hidden" }}
        >
          <h2 id="guess-heading" className="text-xl roboto font-semibold">
            Guesses
          </h2>

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
        </section>
      </main>
    </>
  );
}
