import React from "react";
import styled from "styled-components";
import { compareCharacters, compareRGB, hexToRGB } from "../utils";

const GuessContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  max-width: 600px;
  gap: 1rem;
  padding: 0.5rem;
`;

const GuessCharacter = styled.div`
  text-align: center;
  font-weight: bold;
  border: 2px solid ${(props) => props.borderColor};
  height: 4rem;
  width: 4rem;
  padding: 4px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GuessText = styled.p`
  font-family: "Roboto Mono", monospace;
  font-size: 1.4rem;
  margin: 2px;
  padding: 0;
  line-height: 1.4rem;

  @media screen and (max-width: 650px) {
    font-size: 4vw;
  }
`;

export default function Guess({
  guess,
  target,
  hardMode = false,
  maxLength = 6,
  type = "hex",
}) {
  if (type === "hex") {
    return (
      <GuessContainer className="w-min" style={{ backgroundColor: guess }}>
        {[...guess.substring(1)].map((character, index) => (
          <GuessCharacter key={index} borderColor={"#aaa"}>
            <GuessText>{character}</GuessText>
            <GuessText>
              {compareCharacters(
                character,
                target.substring(1).charAt(index),
                hardMode
              )}
            </GuessText>
          </GuessCharacter>
        ))}
      </GuessContainer>
    );
  }

  if (type === "rgb") {
    const guessRGB = hexToRGB(guess);
    const targetRGB = hexToRGB(target);
    return (
      <GuessContainer>
        {Object.keys(guessRGB).map((color, index) => (
          <GuessCharacter key={index} borderColor={guess}>
            <GuessText>{guessRGB[color]}</GuessText>
            <GuessText>
              {compareRGB(guessRGB[color], targetRGB[color], hardMode)}
            </GuessText>
          </GuessCharacter>
        ))}
      </GuessContainer>
    );
  }

  if (type === "text") {
    return (
      <GuessContainer>
        {Array.from({ length: maxLength }).map((_, index) => (
          <GuessCharacter key={index} borderColor="#aaa">
            <GuessText>
              {guess[index] !== undefined ? guess[index] : "\u00A0"}
            </GuessText>
          </GuessCharacter>
        ))}
      </GuessContainer>
    );
  }

  if (type === "empty") {
    return (
      <GuessContainer>
        {Array.from({ length: maxLength }).map((_, index) => (
          <GuessCharacter key={index} borderColor="#aaa">
            <GuessText>{"\u00A0"}</GuessText>
            <GuessText>{"\u00A0"}</GuessText>
          </GuessCharacter>
        ))}
      </GuessContainer>
    );
  }
}
