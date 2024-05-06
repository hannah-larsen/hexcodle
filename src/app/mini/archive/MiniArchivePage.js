"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import ArchivePanel from "@/app/components/ArchivePanel";
import Navbar from "@/app/components/Navbar";
import Stats from "@/app/components/Stats";

const Wrapper = styled.div`
  display: grid;
  gap: 16px;
  padding: 0px 16px;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const StatsWrapper = styled.div`
  max-width: min(600px, 100%);
  padding: 0px 16px;
  width: 100%;
`;

const MiniArchivePage = ({ panelsData }) => {
  const [completedGames, setCompletedGames] = useState([]);

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

  return (
    <>
      <Navbar />
      <main
        className="everything"
        style={{ paddingLeft: 0, paddingRight: 0, gap: 16 }}
      >
        <StatsWrapper>
          <Stats games={completedGames} totalCount={panelsData.length} />
        </StatsWrapper>
        <Wrapper>
          {panelsData.map(({ hexcodleNumber, colorName, hexcode, date }) => {
            const isComplete = completedGames.some(
              ([key]) => key === `hexcodle-mini-${hexcodleNumber}`
            );
            return (
              <Link
                key={hexcodleNumber}
                href={`/mini/archive/${hexcodleNumber}`}
                style={{ textDecoration: "none" }}
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
        </Wrapper>
      </main>
    </>
  );
};

export default MiniArchivePage;
