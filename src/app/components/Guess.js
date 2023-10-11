import React from "react";
import "./Guess.css";
import { compareCharacters } from "../utils";

export default function Guess(props) {
  const { guess, target } = props;

  return (
    <>
      <div className="guess-container">
        {[...guess.substring(1)].map((character, index) => (
          <div
            key={index}
            className="guess-character"
            style={{ borderColor: guess, animationDelay: `${index * 0.1}s` }}
          >
            <p className="guess-p">{character}</p>
            <p className="guess-p">
              {compareCharacters(character, target.substring(1).charAt(index))}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
