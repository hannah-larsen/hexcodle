import React from "react";

const Keyboard = ({ onKey }) => {
    const keys = [
        ["1", "2", "3", "4", "5", "6"],
        ["7", "8", "9", "0", "A", "B"],
        ["C", "D", "E", "F", "DEL", "↵"],
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
        <div className="flex flex-col gap-2 mt-4 w-full max-w-[500px]">
            {keys.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center gap-1.5">
                    {row.map((key) => {
                        const isBig = key === "↵" || key === "DEL";
                        return (
                            <button
                                key={key}
                                onClick={() => handleKeyClick(key)}
                                className={`
                  h-[50px] rounded-[4px] border-none bg-slate-300 text-slate-900 font-bold 
                  cursor-pointer flex justify-center items-center uppercase select-none touch-manipulation
                  transition-transform duration-100 hover:bg-slate-400 active:bg-slate-500 active:scale-95
                  ${isBig ? "flex-[1.5] text-base" : "flex-1 text-xl"}
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
