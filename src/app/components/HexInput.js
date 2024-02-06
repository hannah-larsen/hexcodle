import React, { useRef, useState } from "react";
import styled from "styled-components";
import { decimalToHex2 } from "../utils";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  font-size: 1.5rem;
  margin-bottom: 0;
  gap: 8px;
`;

const HexcodeInput = styled.input`
  width: 150px;
  height: 36px;
  background-color: var(--gray-50);
  color: var(--gray-900);
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 24px;
  padding-left: 10px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: var(--primary);
  }
`;

const RGBInput = styled.input`
  width: 75px;
  height: 36px;
  background-color: var(--gray-50);
  color: var(--gray-900);
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  border-radius: 5px;
  font-size: 24px;
  text-align: center;
`;

const HexInput = ({
  userInput,
  setUserInput,
  onClick,
  gameOver,
  guesses,
  setStatusText,
  type = "hex",
}) => {
  const rInputRef = useRef(null);
  const gInputRef = useRef(null);
  const bInputRef = useRef(null);

  const onHexChange = (event) => {
    const text = event.target.value;
    if (text[0] !== "#") {
      setUserInput("#");
    } else if (text.length >= 8) {
      return;
    } else {
      setUserInput(text.toUpperCase());
    }
  };

  const onRGBChange = (component, nextRef) => (event) => {
    const { value } = event.target;
    // Allow empty input and only parse and clamp numbers when input is not empty
    const numValue =
      value === "" ? "" : Math.min(255, Math.max(0, parseInt(value, 10) || 0));
    setUserInput((prev) => ({
      ...prev,
      [component]: numValue,
    }));

    if (value.length === 3 && nextRef) {
      nextRef.current.focus();
    }
  };

  const handleKeyDown = (event, prevRef) => {
    if (
      event.key === "Backspace" &&
      event.target.value.length === 0 &&
      prevRef
    ) {
      prevRef.current.focus();
    }

    if (event.key === "Enter") {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (type === "hex") {
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
          "Already guessed this one! Please try a different guess."
        );
        return;
      }
    } else {
      const { r, g, b } = userInput;
      if (!(r && g && b)) {
        setStatusText("Error: All RGB values must be filled in.");
        return;
      }
    }
    if (type === "rgb") {
      const hex = `#${decimalToHex2(userInput.r)}${decimalToHex2(
        userInput.g
      )}${decimalToHex2(userInput.b)}`;
      onClick(hex);
      setUserInput({ r: "", g: "", b: "" });
    } else {
      onClick(userInput);
      setUserInput("#");
    }
  };

  return (
    <InputWrapper>
      {type === "hex" && (
        <HexcodeInput
          type="text"
          maxLength="7"
          value={userInput}
          onChange={onHexChange}
          disabled={gameOver}
          onKeyDown={(event) => handleKeyDown(event, null)}
        />
      )}

      {type === "rgb" && (
        <>
          <RGBInput
            ref={rInputRef}
            type="text"
            maxLength={3}
            value={userInput.r}
            onChange={onRGBChange("r", gInputRef)}
            onKeyDown={(event) => handleKeyDown(event, null)}
            disabled={gameOver}
          />
          <RGBInput
            ref={gInputRef}
            type="text"
            maxLength={3}
            value={userInput.g}
            onChange={onRGBChange("g", bInputRef)}
            onKeyDown={(event) => handleKeyDown(event, rInputRef)}
            disabled={gameOver}
          />
          <RGBInput
            ref={bInputRef}
            type="text"
            maxLength={3}
            value={userInput.b}
            onChange={onRGBChange("b", null)}
            onKeyDown={(event) => handleKeyDown(event, gInputRef)}
            disabled={gameOver}
          />
        </>
      )}

      <button
        className="square-button"
        onClick={() => {
          onSubmit();
        }}
        disabled={gameOver}
      >
        ➜
      </button>
    </InputWrapper>
  );
};

export default HexInput;
