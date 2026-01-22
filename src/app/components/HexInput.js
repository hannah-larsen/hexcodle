import React from "react";

const HexInput = ({ userInput, isCurrentRow = true }) => {
  // userInput is expected to start with '#', e.g., "#1A2B3C"
  // We want to display characters at indices 1 through 6.

  const chars = userInput.slice(1).padEnd(6, " ").split("");

  return (
    <div className="flex flex-row justify-between w-full max-w-[600px] gap-1.5">
      <div className="flex gap-1.5">
        {chars.map((char, index) => {
          const isActive = isCurrentRow && char === " " && userInput.length - 1 === index;
          const hasValue = char !== " ";
          const borderColorClass = (isActive || hasValue) ? "border-slate-800" : "border-slate-300";

          return (
            <div
              key={index}
              className={`
                w-[44px] h-[54px] flex justify-center items-center text-xl font-bold 
                text-slate-900 bg-transparent uppercase select-none 
                border-b-2 ${borderColorClass}
              `}
            >
              {char !== " " ? char : ""}
            </div>
          );
        })}
      </div>
      <div className="w-[50px] h-[50px]" />
    </div>
  );
};

export default HexInput;
