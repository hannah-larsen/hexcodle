import React from "react";

const HexInput = ({ userInput, isCurrentRow = true }) => {
  // userInput is expected to start with '#', e.g., "#1A2B3C"
  // We want to display characters at indices 1 through 6.

  const chars = userInput.slice(1).padEnd(6, " ").split("");

  return (
    <div className="flex flex-row justify-between w-full max-w-[600px] gap-2 mb-2">
      <div className="flex gap-2 w-full justify-between">
        {chars.map((char, index) => {
          const isActive = isCurrentRow && char === " " && userInput.length - 1 === index;
          const hasValue = char !== " ";
          // Active state (cursor position) gets a blue border or ring
          const activeClass = isActive ? "ring-2 ring-blue-400 border-blue-400" : "border-gray-200";

          return (
            <div
              key={index}
              className={`
                flex-1 flex justify-center items-center text-2xl font-mono font-bold 
                text-gray-800 bg-white rounded-lg shadow-sm border min-h-[64px]
                ${activeClass}
              `}
            >
              {char !== " " ? char : ""}
            </div>
          );
        })}
      </div>
      {/* Placeholder for the color preview box to keep alignment */}
      <div className="w-16 self-stretch min-h-[64px] rounded-lg border border-dashed border-gray-300 shrink-0 bg-gray-50/50" />
    </div>
  );
};

export default HexInput;
