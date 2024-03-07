// components/ArchivePage.js
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import ArchivePanel from "../components/ArchivePanel";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Stats from "../components/Stats";

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  padding: 16px;
  text-align: center;
`;

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

const CustomPuzzleLink = styled.a`
  padding-top: 16px;
  color: black;

  &:hover {
    color: #334155;
    transition: fade, 0.2s;
  }
`;

const customPanelData = [
  {
    id: "CONTEST1",
    colorName: "When Pigs Fly",
    hexcode: "#D46C8D",
    urlEndpoint: "contest1",
    date: "Contest 1",
  },
  {
    id: "CONTEST2",
    colorName: "Rainy Day Sunday",
    hexcode: "#BBC3DB",
    urlEndpoint: "contest2",
    date: "Contest 2",
  },
  {
    id: "CONTEST3",
    colorName: "Food Court Honey Mustard",
    hexcode: "#DCB73E",
    urlEndpoint: "contest3",
    date: "Contest 3",
  },
  {
    id: "HANNAH",
    colorName: "Hannah's Green",
    hexcode: "#83C955",
    urlEndpoint: "hannah",
    date: "Bonus 1",
  },
  {
    id: "EKIM",
    colorName: "Ekim's Blue",
    hexcode: "#1392ED",
    urlEndpoint: "ekim",
    date: "Bonus 2",
  },
];

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
    console.log(getCompleteGames());
    setCompletedGames(getCompleteGames());
  }, []);

  return (
    <>
      <Navbar />
      <main
        className="everything"
        style={{ paddingLeft: 0, paddingRight: 0, gap: 0 }}
      >
        <StatsWrapper>
          <Stats
            games={completedGames.filter(([key]) => parseInt(key, 10) > 0)}
            totalCount={panelsData.length}
          />
        </StatsWrapper>
        <CustomPuzzleLink href="#bonusPuzzles">Click here for fan-made bonus puzzles!</CustomPuzzleLink>
        <SectionTitle>Daily Hexcodle Archive</SectionTitle>
        <Wrapper >
          {panelsData.map(({ hexcodleNumber, colorName, hexcode, date }) => {
            const isComplete = completedGames
              .map(([key]) => parseInt(key, 10))
              .includes(hexcodleNumber);
            return (
              <Link
                key={hexcodleNumber}
                href={`/archive/${hexcodleNumber}`}
                style={{ textDecoration: "none" }}
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
        <SectionTitle id="bonusPuzzles">Bonus Hexcodles</SectionTitle>
        <Wrapper>
          {customPanelData.map(
            ({ id, colorName, hexcode, urlEndpoint, date }) => {
              const isComplete = completedGames
                .map(([key]) => key)
                .includes(id);
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
            }
          )}
        </Wrapper>
        <CustomPuzzleLink href="#top">Back to top</CustomPuzzleLink>
      </main>
      <Footer />
    </>
  );
};

export default ArchivePage;
