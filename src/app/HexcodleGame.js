"use client";

import React, { useState, useEffect } from "react";
import ShareAltOutlined from "@ant-design/icons/ShareAltOutlined";
import useLocalStorage from "./hooks/useLocalStorage.js";
import useSavestate from "./hooks/useSavestate.js";
import Guess from "./components/Guess.js";
import EndModal from "./components/EndModal.js";
import Announcement from "./components/Annoucement.js";
import LaunchModal from "./components/LaunchModal.js";
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
  // Inside HexcodleGame component
  const [guesses, setGuesses, isComplete, setIsComplete] = useSavestate(number);
  const [hardMode, setHardMode] = useLocalStorage("hexcodle-hardmode", false);

  const [userInput, setUserInput] = useState("#");
  const [statusText, setStatusText] = useState(
    "Start by typing your guess above!"
  );

  const hasWon = guesses.includes(targetColor);

  const [endModalVisible, setEndModalVisible] = useState(false);
  const [isLaunchModalVisible, setIsLaunchModalVisible] = useState(false);

  const handleKeypress = (event) => {
    if (event.key === "Enter") {
      enterClick();
    }
  };

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

  const handleChange = (event) => {
    const text = event.target.value;
    if (text[0] !== "#") {
      setUserInput("#");
    } else if (text.length >= 8) {
      return;
    } else {
      setUserInput(text.toUpperCase());
    }
  };

  const enterClick = () => {
    if (guesses.length >= MAX_GUESSES) {
      return;
    }

    const hexCodePattern = /^[0-9A-Fa-f]+$/;

    if (userInput.length != 7) {
      setStatusText("Error: Hex code must be exactly 6 digits.");
      return;
    }

    if (!hexCodePattern.test(userInput.substring(1))) {
      setStatusText("Invalid character. Hex codes may only contain 0-9, A-F");
      return;
    }

    if (guesses.includes(userInput)) {
      setStatusText(
        "Already guessed this one! Please enter a different hex code."
      );
      return;
    }

    const newGuesses = [...guesses];
    newGuesses.unshift(userInput);

    if (newGuesses.includes(targetColor) || newGuesses.length >= MAX_GUESSES) {
      setEndModalVisible(true);
    }
    setGuesses(newGuesses);
    setUserInput("#");
  };

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
            <div id="input-and-button">
              <input
                type="text"
                className="input input-bordered input-sm w-full max-w-xs"
                maxLength="7"
                onKeyPress={handleKeypress}
                value={userInput}
                onChange={handleChange}
                disabled={isComplete}
              />

              <button
                className="square-button"
                onClick={() => {
                  enterClick();
                }}
                disabled={isComplete}
              >
                ➜
              </button>
            </div>
            <p className="status-text" style={{ margin: 0 }}>
              {statusText} {isComplete ? "Your score is "  + getScore(targetColor, guesses) : ""}
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
