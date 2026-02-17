import React from "react";

const HexInput = React.forwardRef(({ userInput, isCurrentRow = true, numDigits = 6, selectedIndex = 0, onSelect = () => { } }, ref) => {
  const squareRefs = React.useRef([]);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      if (squareRefs.current[selectedIndex]) {
        squareRefs.current[selectedIndex].focus();
      }
    },
    contains: (element) => {
      return squareRefs.current.some(ref => ref?.contains(element)) || false;
    }
  }));

  // userInput is expected to be an array of characters of length numDigits
  // If it's still a string (for legacy/other rows), handle it
  const chars = Array.isArray(userInput)
    ? userInput
    : (userInput.startsWith("#") ? userInput.slice(1) : userInput).padEnd(numDigits, " ").split("");

  React.useEffect(() => {
    if (isCurrentRow && squareRefs.current[selectedIndex]) {
      // Only focus if the window is already active or if we want to force it
      // In this case, we usually want to force it to keep the game flow
      squareRefs.current[selectedIndex].focus();
    }
  }, [selectedIndex, isCurrentRow]);

  return (
    <div
      className={`group flex flex-row justify-between w-full max-w-[600px] gap-1 mb-1 rounded-xl outline-none ${isCurrentRow ? "cursor-text" : ""}`}
    >
      <div className="flex gap-1 w-full justify-between">
        {chars.map((char, index) => (
          <div
            key={index}
            ref={(el) => (squareRefs.current[index] = el)}
            tabIndex={isCurrentRow ? 0 : -1}
            onClick={isCurrentRow ? () => onSelect(index) : undefined}
            onFocus={isCurrentRow ? () => onSelect(index) : undefined}
            className={`
              flex-1 flex justify-center items-center text-lg md:text-2xl font-mono font-bold 
              rounded-lg shadow-sm border h-12 md:h-[72px] transition-all duration-200
              outline-none border-gray-200 bg-white text-gray-800
              ${isCurrentRow ? "hover:border-blue-300 cursor-pointer focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:bg-blue-50 focus:text-blue-900 focus:z-10" : ""}
            `}
          >
            {char && char !== " " ? char : ""}
          </div>
        ))}
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
