"use client";

import Navbar from "../components/Navbar";
import ArchivePanel from "../components/ArchivePanel";
import Link from "next/link";
import styled from "styled-components";
import { getHexcodleNumber } from "../utils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: "100vw";
  gap: 32px;
`;

export default function Archive() {
  return (
    <>
      <Navbar />
      <main className="everything">
        <Wrapper>
          {Array.from({ length: getHexcodleNumber() }, (_, i) => i + 1)
            .reverse()
            .map((number) => (
              <Link
                key={number}
                href={`/archive/${number}`}
                passHref
                style={{ textDecoration: "none" }}
              >
                <ArchivePanel
                  key={number}
                  hidden={true}
                  hexcodleNumber={number}
                />
              </Link>
            ))}
        </Wrapper>
      </main>
    </>
  );
}
