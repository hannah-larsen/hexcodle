import { compareCharacters, compareRGB, hexToRGB } from "../utils";
import { ChevronUp, ChevronDown, ChevronsUp, ChevronsDown, Check, X } from "lucide-react";

export default function Guess({
  guess,
  target,
  hardMode = false,
  type = "hex",
  isVictory = false,
  rowIndex = 0,
}) {
  const numCols = type === "rgb" ? 3 : 6;
  const getDelays = (colIndex) => {
    // Fill in all colored squares at once (duration 550ms)
    const revealDelay = 0;
    
    // Jump row by row after the color fill finishes (0.55s)
    const jumpDelay = 0.55 + (rowIndex * 0.1);

    return { revealDelay, jumpDelay };
  };
  const getIcon = (result) => {
    switch (result) {
      case "✅":
        return <Check className="w-5 h-5 text-green-600" />;
      case "🔼":
        return <ChevronUp className="w-5 h-5 text-gray-600" />;
      case "🔽":
        return <ChevronDown className="w-5 h-5 text-gray-600" />;
      case "⏫":
        return <ChevronsUp className="w-5 h-5 text-gray-600" />;
      case "⏬":
        return <ChevronsDown className="w-5 h-5 text-gray-600" />;
      case "❌":
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  if (type === "hex") {
    return (
      <div className="flex flex-row justify-between w-full max-w-[600px] gap-1 mb-1">
        <div className="flex gap-1 w-full justify-between">
          {[...guess.substring(1)].map((character, index) => {
            const result = compareCharacters(
              character,
              target.substring(1).charAt(index),
              hardMode
            );
            const { revealDelay, jumpDelay } = getDelays(index);
            return (
              <div
                key={index}
                className={`flex-1 flex flex-col items-center justify-center p-1 md:p-2 bg-white rounded-lg shadow-sm border border-gray-200 h-12 md:h-[72px] ${isVictory ? "victory-square" : ""}`}
                style={{
                  "--reveal-color": guess,
                  "--reveal-delay": isVictory ? `${revealDelay}s` : "0s",
                  "--jump-delay": isVictory ? `${jumpDelay}s` : "0s",
                }}
              >
                <p className="font-mono text-base md:text-xl font-bold text-gray-800">{character}</p>
                <div className="mb-0.5 md:mb-1">{getIcon(result)}</div>
              </div>
            );
          })}
        </div>
        <div
          className={`w-12 md:w-16 self-stretch h-12 md:h-[72px] rounded-lg shadow-inner border border-gray-200 shrink-0 ${isVictory ? "victory-square" : ""}`}
          style={{
            backgroundColor: guess,
            "--reveal-color": guess,
            "--reveal-delay": isVictory ? `${getDelays(numCols - 1).revealDelay + 0.05}s` : "0s",
            "--jump-delay": isVictory ? `${getDelays(numCols - 1).jumpDelay + 0.05}s` : "0s",
          }}
        />
      </div>
    );
  }

  if (type === "rgb") {
    const guessRGB = hexToRGB(guess);
    const targetRGB = hexToRGB(target);

    const rgbMap = {
      r: "red",
      g: "green",
      b: "blue"
    };

    return (
      <div className="flex flex-row justify-between w-full max-w-[600px] gap-1 mb-1">
        <div className="flex gap-1 w-full justify-between">
          {["r", "g", "b"].map((color, index) => {
            const result = compareRGB(guessRGB[rgbMap[color]], targetRGB[rgbMap[color]], hardMode);
            const { revealDelay, jumpDelay } = getDelays(index);
            return (
              <div
                key={index}
                className={`flex-1 flex flex-col items-center justify-center p-1 md:p-2 bg-white rounded-lg shadow-sm border border-gray-200 h-12 md:h-[72px] ${isVictory ? "victory-square" : ""}`}
                style={{
                  "--reveal-color": guess,
                  "--reveal-delay": isVictory ? `${revealDelay}s` : "0s",
                  "--jump-delay": isVictory ? `${jumpDelay}s` : "0s",
                }}
              >
                <p className="font-mono text-base md:text-xl font-bold text-gray-800">{guessRGB[rgbMap[color]]}</p>
                <div className="mb-0.5 md:mb-1">{getIcon(result)}</div>
              </div>
            );
          })}
        </div>
        <div
          className={`w-12 md:w-16 self-stretch h-12 md:h-[72px] rounded-lg shadow-inner border border-gray-200 shrink-0 ${isVictory ? "victory-square" : ""}`}
          style={{
            backgroundColor: guess,
            "--reveal-color": guess,
            "--reveal-delay": isVictory ? `${getDelays(numCols - 1).revealDelay + 0.05}s` : "0s",
            "--jump-delay": isVictory ? `${getDelays(numCols - 1).jumpDelay + 0.05}s` : "0s",
          }}
        />
      </div>
    );
  }
}

