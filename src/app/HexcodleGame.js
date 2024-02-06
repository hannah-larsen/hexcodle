"use client";

import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import ShareAltOutlined from "@ant-design/icons/ShareAltOutlined";
import useLocalStorage from "./hooks/useLocalStorage.js";
import useSavestate from "./hooks/useSavestate.js";
import Guess from "./components/Guess.js";
import EndModal from "./components/EndModal.js";
import Announcement from "./components/Annoucement.js";
import LaunchModal from "./components/LaunchModal.js";
import HexInput from "./components/HexInput.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import { getScore } from "./utils.js";

const MAX_GUESSES = 5;

export default function HexcodleGame({
  targetColor,
  colorName,
  number,
  maxDay,
}) {
  const [guesses, setGuesses, isComplete, setIsComplete] = useSavestate(number);
  const [hardMode, setHardMode] = useLocalStorage("hexcodle-hardmode", false);
  const [streak, setStreak] = useLocalStorage("streak", {
    lastDate: null,
    days: 0,
  });
  const [userInput, setUserInput] = useState("#");
  const [statusText, setStatusText] = useState(
    "Start by typing your guess above!"
  );
  const [endModalVisible, setEndModalVisible] = useState(false);
  const [isLaunchModalVisible, setIsLaunchModalVisible] = useState(false);

  const hasWon = guesses.includes(targetColor);

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

  // Add score component
  return (
    <>
      <Navbar hexcodleNumber={number} maxDay={maxDay} />
      <main className="everything">
        <Announcement onClick={() => setIsLaunchModalVisible(true)} />
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
              <h2 className="guess-title" style={{ marginBottom: 8 }}>
                Target
              </h2>
              <div
                className="square"
                style={{ backgroundColor: targetColor }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h2 className="guess-title" style={{ marginBottom: 8 }}>
                Your Guess
              </h2>
              <div className="square" style={{ backgroundColor: guesses[0] }} />
            </div>
          </div>
          <div className="input-section">
            <HexInput
              userInput={userInput}
              setUserInput={setUserInput}
              onClick={submitGuess}
              gameOver={isComplete}
              guesses={guesses}
              setStatusText={setStatusText}
              type="rgb"
            />
            <p className="status-text" style={{ margin: 0 }}>
              {statusText}{" "}
              {isComplete
                ? "Your score is " + getScore(targetColor, guesses)
                : ""}
            </p>
          </div>
          {isComplete && (
            <button
              className="modal-button square-button"
              id="shareScore"
              onClick={() => {
                setEndModalVisible(true);
              }}
            >
              <ShareAltOutlined />
            </button>
          )}
        </section>

        <section className="frosted-glass guess-section">
          <h2 id="guess-heading">Guesses</h2>

          {guesses.map((guess, index) => (
            <Guess
              key={index}
              guess={guess}
              target={targetColor}
              hardMode={hardMode}
            />
          ))}
        </section>
      </main>
      <Footer />

      <EndModal
        okButtonProps={{ style: { backgroundColor: "#3a743a" } }}
        open={endModalVisible}
        setOpen={setEndModalVisible}
        color={targetColor}
        colorName={colorName}
        counter={guesses.length}
        guesses={guesses}
        win={hasWon}
        hardMode={hardMode}
        hexcodleNumber={number}
      />

      <LaunchModal
        okButtonProps={{ style: { backgroundColor: "#3a743a" } }}
        isOpen={isLaunchModalVisible}
        setIsOpen={setIsLaunchModalVisible}
      />
    </>
  );
}
