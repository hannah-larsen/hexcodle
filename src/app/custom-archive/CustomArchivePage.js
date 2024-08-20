"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import ArchivePanel from "../components/ArchivePanel";
import Navbar from "../components/Navbar";
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
            const isComplete = completedGames.map(([key]) => key).includes(id);
            return (
              <Link
                key={id}
                href={`/archive/${urlEndpoint}`}
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

export default CustomArchivePage;
