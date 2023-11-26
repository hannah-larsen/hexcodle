import React from "react";
import styled from "styled-components";
import { compareCharacters } from "../utils";

const GuessContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin: 4px 16px; // top and bottom margin set to 4px, left and right to 16px
  gap: 6px;
`;

const GuessCharacter = styled.div`
  text-align: center;
  font-weight: bold;
  flex: 1;
  border-radius: 8px;
  border: 4px solid ${(props) => props.borderColor}; // combined border properties
  padding: 6px;
  background-color: #ffffff;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const GuessParagraph = styled.p`
  font-family: "Roboto Mono", monospace;
  font-size: 1.4rem;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 650px) {
    font-size: 4vw;
  }
`;

export default function Guess(props) {
  const { guess, target, hardMode = false } = props;

  return (
    <GuessContainer>
      {[...guess.substring(1)].map((character, index) => (
        <GuessCharacter key={index} borderColor={guess}>
          <GuessParagraph>{character}</GuessParagraph>
          <GuessParagraph>
            {compareCharacters(
              character,
              target.substring(1).charAt(index),
              hardMode
            )}
          </GuessParagraph>
        </GuessCharacter>
      ))}
    </GuessContainer>
  );
}
