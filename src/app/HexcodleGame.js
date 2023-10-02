"use client";

import React, { useState, useEffect } from "react";
import ShareAltOutlined from "@ant-design/icons/ShareAltOutlined";
import useTemporaryStorage from "./hooks/useTemporaryStorage.js";
import Guess from "./components/Guess.js";
import EndModal from "./components/EndModal.js";
import HexInfoModal from "./components/HexInfoModal.js";

export default function HexcodleGame({ targetColor }) {
  const [guesses, setGuesses] = useTemporaryStorage("hexcodle-guesses", []);
  const [counter, setCounter] = useTemporaryStorage("hexcodle-counter", 4);
  const [statusText, setStatusText] = useTemporaryStorage(
    "hexcodle-status-text",
    "Start by typing your guess above!"
  );

  const [userInput, setUserInput] = useState("#");
  const [gameOver, setGameOver] = useState(guesses.length > 0 || false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [endModalVisible, setEndModalVisible] = useState(false);

  const hasWon = guesses.includes(targetColor);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleKeypress = (event) => {
    if (event.key === "Enter") {
      enterClick();
    }
  };

  useEffect(() => {
    if (gameOver) {
      setEndModalVisible(true);
    }
  }, [gameOver]);

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
    if (counter < 0) {
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

    if (userInput === targetColor) {
      setStatusText("You guessed it!");
      setGameOver(true);
    } else {
      if (counter === 0) {
        setStatusText(`Out of guesses.`);
        setGameOver(true);
      } else {
        setStatusText(
          `Not quite! ${counter} guess${counter == 1 ? "" : "es"} left.`
        );
      }
    }

    const newGuesses = [...guesses];
    newGuesses.unshift(userInput);
    setGuesses(newGuesses);
    setCounter(counter - 1);
    setUserInput("#");
  };

  return (
    <>
      <div className="everything">
        <section className="frosted-glass">
          <h1 className="title">Hexcodle</h1>
          <p>
            You will have 5 tries to correctly guess the hex code of the colour
            displayed on screen. After each guess, you will see if your guess
            was too low, too high, or spot on! Use these as guides to decipher
            how close your guess is.
          </p>

          <button className="modal-button" onClick={showModal}>
            WTF IS HEX?
          </button>
        </section>

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
              <canvas
                className="square"
                style={{ backgroundColor: targetColor }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <h2 className="guess-title" style={{ marginBottom: 8 }}>
                Your Guess
              </h2>
              <canvas
                className="square"
                style={{ backgroundColor: guesses[0] }}
              />
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
                disabled={gameOver}
              />

              <button
                className="square-button"
                onClick={() => {
                  enterClick();
                }}
                disabled={gameOver}
              >
                ➜
              </button>
            </div>
            <p className="status-text" style={{ margin: 0 }}>
              {statusText}
            </p>
          </div>

          {gameOver && (
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
            <Guess key={index} guess={guess} target={targetColor} />
          ))}
        </section>

        <EndModal
          okButtonProps={{ style: { backgroundColor: "#3a743a" } }}
          open={endModalVisible}
          setOpen={setEndModalVisible}
          color={targetColor}
          counter={counter}
          guesses={guesses}
          win={hasWon}
        />

        <HexInfoModal
          okButtonProps={{ style: { backgroundColor: "#3a743a" } }}
          isOpen={isModalVisible}
          setIsOpen={setIsModalVisible}
        />
      </div>
    </>
  );
}
