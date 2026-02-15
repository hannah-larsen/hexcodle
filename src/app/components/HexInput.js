import React from "react";

const HexInput = React.forwardRef(({ userInput, isCurrentRow = true, numDigits = 6, selectedIndex = 0, onSelect = () => { } }, ref) => {
  // userInput is expected to be an array of characters of length numDigits
  // If it's still a string (for legacy/other rows), handle it
  const chars = Array.isArray(userInput)
    ? userInput
    : (userInput.startsWith("#") ? userInput.slice(1) : userInput).padEnd(numDigits, " ").split("");

  return (
    <div
      ref={ref}
      tabIndex={isCurrentRow ? 0 : -1}
      className={`group flex flex-row justify-between w-full max-w-[600px] gap-1 mb-1 rounded-xl outline-none ${isCurrentRow ? "cursor-text" : ""}`}
    >
      <div className="flex gap-1 w-full justify-between">
        {chars.map((char, index) => {
          const isActive = isCurrentRow && selectedIndex === index;

          return (
            <div
              key={index}
              onClick={isCurrentRow ? () => onSelect(index) : undefined}
              className={`
                flex-1 flex justify-center items-center text-lg md:text-2xl font-mono font-bold 
                rounded-lg shadow-sm border h-12 md:h-[72px] transition-all duration-200
                ${isActive
                  ? "border-blue-500 ring-2 ring-blue-400 bg-blue-50 text-blue-900 z-10"
                  : "border-gray-200 bg-white text-gray-800"
                }
                ${isCurrentRow ? "hover:border-blue-300 cursor-pointer" : ""}
              `}
            >
              {char && char !== " " ? char : ""}
            </div>
          );
        })}
      </div>
      {/* Placeholder for the color preview box to keep alignment */}
      <div
        className={`w-12 md:w-16 self-stretch h-12 md:h-[72px] rounded-lg border shrink-0 transition-colors duration-500
          ${isCurrentRow || userInput === "#" || (Array.isArray(userInput) && userInput.every(c => c === "" || c === " "))
            ? "border-dashed border-gray-300 bg-gray-50/50"
            : "border-gray-200 bg-white"
          }
        `}
        style={!isCurrentRow && typeof userInput === "string" && userInput.length > 1 && userInput.startsWith("#") ? { backgroundColor: userInput } : {}}
      />
    </div>
  );
});

HexInput.displayName = "HexInput";

export default HexInput;
