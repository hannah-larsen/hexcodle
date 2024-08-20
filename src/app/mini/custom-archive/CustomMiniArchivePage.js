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

const CustomMiniArchivePage = ({ panelsData }) => {
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
      <Navbar />
      <main
        className="everything"
        style={{ paddingLeft: 0, paddingRight: 0, gap: 16 }}
      >
        <StatsWrapper>
          <Stats games={completedGames} totalCount={panelsData.length} />
        </StatsWrapper>
        <Wrapper>
          {panelsData.map(({ id, colorName, hexcode, urlEndpoint, date }) => {
            console.log(id);
            const isComplete = completedGames.some(
              ([key]) => key === `hexcodle-mini-${id.toUpperCase()}`
            );
            console.log(isComplete);
            return (
              <Link
                key={id}
                href={`/mini/archive/${urlEndpoint}`}
                style={{ textDecoration: "none" }}
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
        </Wrapper>
      </main>
    </>
  );
};

export default CustomMiniArchivePage;
