"use client";

import { useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const HexKeyboard = ({ input, setInput, maxLength = 6, onSubmit }) => {
  const handleKeyAction = (keyInput) => {
    if (keyInput === "{backspace}") {
      setInput((curr) => curr.slice(0, -1));
    } else if (keyInput !== "{enter}" && input.length < maxLength) {
      setInput((curr) => `${curr}${keyInput.toUpperCase()}`);
    }

    if (keyInput === "{enter}" && input.length === maxLength) {
      onSubmit(`#${input}`);
      setInput("");
    }
  };

  useEffect(() => {
    const handlePhysicalKeyPress = (event) => {
      let keyInput = "";

      if (event.key === "Enter") {
        keyInput = "{enter}";
      } else if (event.key === "Backspace") {
        keyInput = "{backspace}";
      } else if (/^[0-9a-fA-F]$/i.test(event.key)) {
        keyInput = event.key;
      }

      if (keyInput) {
        handleKeyAction(keyInput);
      }
    };

    // Add event listener
    document.addEventListener("keydown", handlePhysicalKeyPress);

    // Remove event listener on cleanup
    return () =>
      document.removeEventListener("keydown", handlePhysicalKeyPress);
  }, [input, setInput, maxLength, onSubmit]); // Make sure to list all dependencies here

  return (
    <Keyboard
      physicalKeyboardHighlight
      onKeyPress={(button) => handleKeyAction(button)}
      style={{ width: "100%" }}
      layout={{
        default: ["1 2 3 4 5 6 7", "8 9 0 a b c d", "{enter} e f {backspace}"],
      }}
      display={{
        "{backspace}": "Back",
        "{enter}": "Enter",
      }}
    />
  );
};

export default HexKeyboard;
