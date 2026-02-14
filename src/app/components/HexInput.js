import React from "react";

const HexInput = React.forwardRef(({ userInput, isCurrentRow = true, numDigits = 6 }, ref) => {
  // userInput is expected to start with '#', e.g., "#1A2B3C" (6 digits) or "#ABC" (3 digits)
  // We want to display characters at indices 1 through numDigits.

  const chars = userInput.slice(1).padEnd(numDigits, " ").split("");

  return (
    <div
      ref={ref}
      tabIndex={isCurrentRow ? 0 : -1}
      className="group flex flex-row justify-between w-full max-w-[600px] gap-2 mb-2 rounded-xl outline-none"
    >
      <div className="flex gap-2 w-full justify-between">
        {chars.map((char, index) => {
          const isNextChar = char === " " && userInput.length - 1 === index;
          const isActive = isCurrentRow && isNextChar;

          return (
            <div
              key={index}
              className={`
                flex-1 flex justify-center items-center text-xl md:text-2xl font-mono font-bold 
                text-gray-800 bg-white rounded-lg shadow-sm border h-14 md:h-[72px] transition-all duration-200
                ${isActive ? "group-focus:ring-2 group-focus:ring-blue-400 group-focus:border-blue-400 border-gray-200" : "border-gray-200"}
              `}
            >
              {char !== " " ? char : ""}
            </div>
          );
        })}
      </div>
      {/* Placeholder for the color preview box to keep alignment */}
      <div className="w-12 md:w-16 self-stretch h-14 md:h-[72px] rounded-lg border border-dashed border-gray-300 shrink-0 bg-gray-50/50" />
    </div>

  );
});

HexInput.displayName = "HexInput";

export default HexInput;
