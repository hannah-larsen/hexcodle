"use client";

import React, { useState, useEffect } from "react";
import { notification } from "antd";
import ShareAltOutlined from "@ant-design/icons/ShareAltOutlined";
import useTemporaryStorage from "./hooks/useTemporaryStorage.js";
import Guess from "./components/Guess.js";
import EndModal from "./components/EndModal.js";
import HexInfoModal from "./components/HexInfoModal.js";
import RulesModal from "./components/RulesModal.js";

export default function HexcodleGame({ targetColor, hexcodleNumber }) {
  const [guesses, setGuesses] = useTemporaryStorage("hexcodle-guesses", []);
  const [counter, setCounter] = useTemporaryStorage("hexcodle-counter", 4);
  const [statusText, setStatusText] = useTemporaryStorage(
    "hexcodle-status-text",
    "Start by typing your guess above!"
  );

  const hasWon = guesses.includes(targetColor);

  const [userInput, setUserInput] = useState("#");
  const [gameOver, setGameOver] = useState(!(counter >= 0) || hasWon);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isRuleModalVisible, setIsRuleModalVisible] = useState(false);
  const [endModalVisible, setEndModalVisible] = useState(false);
  const [hasSeenNotif, setHasSeenNotif] = useState(false);

  useEffect(() => {
    // Open a notification when the component mounts
    if (!hasSeenNotif && !gameOver) {
      notification.open({
        message: "Hexcodle Updates",
        description:
          "We hear your feedback, switching between easy/hard mode will be available soon. Thanks for playing Hexcodle! -H&E",
        duration: 8,
      });
      setHasSeenNotif(true);
    }
  }, [hasSeenNotif, gameOver]);

  const showInfoModal = () => {
    setIsInfoModalVisible(true);
  };

  const showRuleModal = () => {
    setIsRuleModalVisible(true);
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
          <h1 className="title">
            Hexcodle #<span id="numberDisplay">{hexcodleNumber}</span>
          </h1>
          <p>A daily colour-guessing game for hex code fanatics.</p>

          <div class="info-buttons">
            <button className="modal-rule-button" onClick={showRuleModal}>
              RULES
            </button>

            <button className="modal-info-button" onClick={showInfoModal}>
              WTF IS HEX?
            </button>
          </div>
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

        <p>
          <a href="https://forms.gle/EEX8iJKkr5ATjk6L8">Give us feedback!</a>
        </p>

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
          isOpen={isInfoModalVisible}
          setIsOpen={setIsInfoModalVisible}
        />

        <RulesModal
          okButtonProps={{ style: { backgroundColor: "#3a743a" } }}
          isOpen={isRuleModalVisible}
          setIsOpen={setIsRuleModalVisible}
        />
      </div>
    </>
  );
}
