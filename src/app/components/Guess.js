import React from "react";
import { compareCharacters, compareRGB, hexToRGB } from "../utils";

export default function Guess({
  guess,
  target,
  hardMode = false,
  type = "hex",
}) {
  const containerClasses = "flex flex-row justify-between w-full max-w-[600px] gap-1.5";
  const characterClasses = "text-center font-bold w-[44px] h-[54px] p-1 bg-transparent flex flex-col justify-end items-center border-b-2 border-slate-800";
  const textClasses = "font-mono text-xl m-0 p-0 leading-tight"; // text-xl is 1.25rem

  if (type === "hex") {
    return (
      <div className={containerClasses}>
        <div className="flex gap-1.5">
          {[...guess.substring(1)].map((character, index) => (
            <div key={index} className={characterClasses}>
              <p className={`${textClasses} text-base mb-0.5`}>
                {compareCharacters(
                  character,
                  target.substring(1).charAt(index),
                  hardMode
                )}
              </p>
              <p className={textClasses}>{character}</p>
            </div>
          ))}
        </div>
        <div
          className="w-[50px] h-[50px] rounded-xl"
          style={{
            backgroundColor: guess,
          }}
        />
      </div>
    );
  }

  if (type === "rgb") {
    // Note: RGB implementation might need similar layout updates to match Hex Design if used.
    // Preserving logic but switching to Tailwind classes for basic container/text.
    const guessRGB = hexToRGB(guess);
    const targetRGB = hexToRGB(target);
    return (
      <div className={containerClasses} style={{ justifyContent: 'center' }}>
        {Object.keys(guessRGB).map((color, index) => (
          // RGB mode was not fully refactored in previous steps to new design (underline etc).
          // Applying basic tailwind classes similar to old design for now or matching new one?
          // I'll apply the new "Underline" style to be consistent.
          <div key={index} className={characterClasses} style={{ width: 'auto', flex: 1 }}>
            <p className={`${textClasses} text-base mb-0.5`}>
              {compareRGB(guessRGB[color], targetRGB[color], hardMode)}
            </p>
            <p className={textClasses}>{guessRGB[color]}</p>
          </div>
        ))}
      </div>
    );
  }
}
