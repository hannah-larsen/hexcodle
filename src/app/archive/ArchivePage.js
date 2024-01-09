// components/ArchivePage.js
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import ArchivePanel from "../components/ArchivePanel";
import Navbar from "../components/Navbar";

const Wrapper = styled.div`
  display: grid;
  gap: 16px;
  padding: 16px;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const ArchivePage = ({ panelsData }) => {
  const [completedGames, setCompletedGames] = useState([]);

  useEffect(() => {
    const getCompleteGames = () => {
      try {
        const saves =
          JSON.parse(window.localStorage.getItem("hexcodleSaves")) || {};
        return Object.entries(saves)
          .filter(([key, data]) => data.isComplete)
          .map(([key]) => parseInt(key, 10));
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
      <main className="everything" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <h1>
          Archive ({completedGames.length} / {panelsData.length})
        </h1>
        <Wrapper>
          {panelsData.map(({ hexcodleNumber, colorName, hexcode, date }) => {
            const isComplete = completedGames.includes(hexcodleNumber);
            return (
              <Link
                key={hexcodleNumber}
                href={`/archive/${hexcodleNumber}`}
                style={{ textDecoration: "none" }}
                passHref
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
