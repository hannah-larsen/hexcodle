"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ArchivePanel from "@/app/components/ArchivePanel";
import Stats from "@/app/components/Stats";
import { fetchMiniArchiveBatch } from "../../archive/actions";

const MiniArchivePage = ({ panelsData: initialPanels, totalCount }) => {
  const [panels, setPanels] = useState(initialPanels);
  const [completedGames, setCompletedGames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCompleteGames = () => {
      try {
        const saves =
          JSON.parse(window.localStorage.getItem("hexcodleSaves")) || {};
        return Object.entries(saves).filter(([key, data]) => {
          const isCompleted = data.isComplete;
          // Improved regex to capture the number part of the ID
          const match = key.match(/^hexcodle-mini-(\d+)$/);
          const matchesMiniPattern = match !== null;
          // Parse the captured number part and check if it's greater than 0
          const numberGreaterThanZero =
            matchesMiniPattern && parseInt(match[1], 10) > 0;
          return isCompleted && matchesMiniPattern && numberGreaterThanZero;
        });
      } catch (error) {
        console.error("Error fetching completed games:", error);
        return [];
      }
    };

    setCompletedGames(getCompleteGames());
  }, []);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const lastPanel = panels[panels.length - 1];
      const startNum = lastPanel.hexcodleNumber - 1;
      const newPanels = await fetchMiniArchiveBatch(startNum, 100);
      setPanels((prev) => [...prev, ...newPanels]);
    } catch (error) {
      console.error("Error loading more puzzles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex flex-col items-center gap-4 py-0 px-0 bg-cream-50">
        <div className="max-w-[600px] w-full px-4">
          <Stats games={completedGames} totalCount={totalCount} />
        </div>
        <div className="grid gap-4 px-4 w-full grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
          {panels.map(({ hexcodleNumber, colorName, hexcode, date }) => {
            const isComplete = completedGames.some(
              ([key]) => key === `hexcodle-mini-${hexcodleNumber}`
            );
            return (
              <Link
                key={hexcodleNumber}
                href={`/mini/archive/${hexcodleNumber}`}
                className="no-underline"
                prefetch={false}
              >
                <ArchivePanel
                  hidden={!isComplete}
                  hexcodleNumber={hexcodleNumber}
                  colorName={colorName}
                  hexcode={hexcode}
                  date={date}
                />
              </Link>
            );
          })}
        </div>
        {panels.length < totalCount && (
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-serif font-semibold cursor-pointer transition-all my-6 mx-auto block hover:bg-gray-100 hover:border-gray-300 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Loading..." : "Load More Puzzles"}
          </button>
        )}
      </main>
    </>
  );
};

export default MiniArchivePage;
