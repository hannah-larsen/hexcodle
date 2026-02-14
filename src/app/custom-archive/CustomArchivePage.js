"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ArchivePanel from "../components/ArchivePanel";
import Stats from "../components/Stats";

const CustomArchivePage = ({ panelsData }) => {
  const [completedGames, setCompletedGames] = useState([]);

  useEffect(() => {
    const getCompleteGames = () => {
      try {
        const saves =
          JSON.parse(window.localStorage.getItem("hexcodleSaves")) || {};

        const validKeys = new Set(panelsData.map((panel) => panel.id));

        return Object.entries(saves).filter(
          ([key, data]) => data.isComplete && validKeys.has(key)
        );
      } catch (error) {
        console.error("Error fetching completed games:", error);
        return [];
      }
    };

    setCompletedGames(getCompleteGames());
  }, [panelsData]);

  return (
    <>
      <main className="flex flex-col items-center gap-4 py-4 px-0 bg-cream-50">
        <div className="max-w-[600px] w-full px-4">
          <Stats games={completedGames} totalCount={panelsData.length} />
        </div>
        <div className="grid gap-4 px-4 w-full grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
          {panelsData.map(({ id, colorName, hexcode, urlEndpoint, date }) => {
            const isComplete = completedGames.map(([key]) => key).includes(id);
            return (
              <Link
                key={id}
                href={`/archive/${urlEndpoint}`}
                className="no-underline"
              >
                <ArchivePanel
                  hidden={!isComplete}
                  hexcodleNumber={id}
                  colorName={colorName}
                  hexcode={hexcode}
                  date={date}
                />
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default CustomArchivePage;
