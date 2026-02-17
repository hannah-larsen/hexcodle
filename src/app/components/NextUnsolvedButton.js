"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function NextUnsolvedButton({ maxDay, isMini = false, currentNumber }) {
    const router = useRouter();

    const [nextUnsolved, setNextUnsolved] = React.useState(null);

    React.useEffect(() => {
        try {
            const saves = JSON.parse(localStorage.getItem("hexcodleSaves")) || {};

            // Look for the highest unsolved game from maxDay downwards
            for (let i = maxDay; i >= 1; i--) {
                const key = isMini ? `hexcodle-mini-${i}` : i;
                const saveData = saves[key];

                // If no save data or not complete, and it's not the current game they just finished
                if ((!saveData || !saveData.isComplete) && i !== currentNumber) {
                    setNextUnsolved(i);
                    return;
                }
            }
            // If no unsolved game is found, ensure nextUnsolved is null
            setNextUnsolved(null);
        } catch (e) {
            console.error("Error finding next unsolved game:", e);
            setNextUnsolved(null); // Ensure it's null on error
        }
    }, [maxDay, isMini, currentNumber]);

    if (!nextUnsolved) return null;

    const handleNavigate = () => {
        const baseUrl = isMini ? "/mini/archive" : "/archive";
        // If it's the latest game, maybe go to root? 
        // Usually archive/[id] is fine even for the latest.
        router.push(`${baseUrl}/${nextUnsolved}`);
    };

    return (
        <div className="w-full">
            <button
                onClick={handleNavigate}
                className="w-full py-3 md:py-4 px-4 md:px-6 bg-blue-900 text-white rounded-xl font-sans font-bold text-base md:text-lg flex items-center justify-center gap-2 md:gap-3 hover:bg-blue-800 transition-all shadow-md group"
            >
                Next Unsolved {isMini ? "Mini " : "Hexcodle"}<span className="text-blue-200/60 font-medium">#{nextUnsolved}</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 ml-1" />
            </button>
        </div>
    );
}
