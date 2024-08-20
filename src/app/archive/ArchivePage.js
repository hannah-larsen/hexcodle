"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import ArchivePanel from "../components/ArchivePanel";
import Stats from "../components/Stats";

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

const ArchivePage = ({ panelsData }) => {
  const [completedGames, setCompletedGames] = useState([]);

  useEffect(() => {
    const getCompleteGames = () => {
      try {
        const saves =
          JSON.parse(window.localStorage.getItem("hexcodleSaves")) || {};
        return Object.entries(saves).filter(([key, data]) => data.isComplete);
      } catch (error) {
        console.error("Error fetching completed games:", error);
        return [];
      }
    };
    setCompletedGames(getCompleteGames());
  }, []);

  return (
    <>
      <main
        className="everything"
        style={{ paddingLeft: 0, paddingRight: 0, gap: 16 }}
      >
        <StatsWrapper>
          <Stats
            games={completedGames.filter(([key]) => parseInt(key, 10) > 0)}
            totalCount={panelsData.length}
          />
        </StatsWrapper>
        <Wrapper>
          {panelsData.map(({ hexcodleNumber, colorName, hexcode, date }) => {
            const isComplete = completedGames
              .map(([key]) => parseInt(key, 10))
              .includes(hexcodleNumber);
            return (
              <Link
                key={hexcodleNumber}
                href={`/archive/${hexcodleNumber}`}
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

export default ArchivePage;
