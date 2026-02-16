import React from "react";

const Keyboard = ({ onKey }) => {
    const keys = [
        ["0", "1", "2", "3", "4", "5", "6"],
        ["7", "8", "9", "A", "B", "C"],
        ["DEL", "D", "E", "F", "↵"],
    ];

    const handleKeyClick = (key) => {
        if (key === "DEL") {
            onKey("BACKSPACE");
        } else if (key === "↵") {
            onKey("ENTER");
        } else {
            onKey(key);
        }
    };

    return (
        <div className="flex flex-col gap-1 mt-2 w-full max-w-2xl">
            {keys.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-1">
                    {row.map((key) => {
                        const isBig = key === "↵" || key === "DEL";
                        return (
                            <button
                                key={key}
                                onClick={() => handleKeyClick(key)}
                                className={`
                  h-11 rounded-lg border-none font-bold 
                  cursor-pointer flex justify-center items-center uppercase select-none touch-manipulation
                  transition-all duration-100 active:scale-95
                  ${isBig
                                        ? "flex-[1.5] text-sm bg-blue-900 text-white hover:bg-blue-800 active:bg-blue-950 shadow-md"
                                        : "flex-1 text-xl bg-slate-300 border border-slate-400 text-slate-900 hover:bg-slate-400 hover:text-white active:bg-slate-500 shadow-sm"}
                `}
                            >
                                {key === "↵" ? "ENTER" : key}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Keyboard;
