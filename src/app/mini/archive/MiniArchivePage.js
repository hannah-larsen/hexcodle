"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import ArchivePanel from "@/app/components/ArchivePanel";
import Stats from "@/app/components/Stats";
import { fetchMiniArchiveBatch } from "../../archive/actions";

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

const LoadMoreButton = styled.button`
  background-color: #f3f4f6;
  color: #1f2937;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  margin: 24px auto;
  display: block;

  &:hover {
    background-color: #e5e7eb;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

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
      <main
        className="everything"
        style={{ paddingLeft: 0, paddingRight: 0, gap: 16 }}
      >
        <StatsWrapper>
          <Stats games={completedGames} totalCount={totalCount} />
        </StatsWrapper>
        <Wrapper>
          {panels.map(({ hexcodleNumber, colorName, hexcode, date }) => {
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
        {panels.length < totalCount && (
          <LoadMoreButton onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More Puzzles"}
          </LoadMoreButton>
        )}
      </main>
    </>
  );
};

export default MiniArchivePage;
