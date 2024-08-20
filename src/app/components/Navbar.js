"use server";
export const dynamic = "force-dynamic";

import React from "react";
import styled from "styled-components";
import MenuSidebar from "./MenuSidebar";
import NavbarCenter from "./NavbarCenter";
import NavbarRight from "./NavbarRight";
import { getHexcodleNumber, getMiniNumber } from "../utils";

const NavWrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 20;
  background-color: var(--gray-50);
  border-bottom: 1px var(--gray-400) solid;
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 60px;

  a {
    color: black;
  }

  a:active {
    color: var(--primary);
  }
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  //max-width: 600px;
`;

const NavLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`;

const NavCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 4px;
  font-size: 1.6rem;

  @media screen and (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

export default async function Navbar() {
  const hexcodleNumber = getHexcodleNumber();
  const miniNumber = getMiniNumber();

  return (
    <>
      <NavWrapper>
        <TopWrapper>
          <NavLeft>
            <MenuSidebar />
          </NavLeft>
          <NavCenter>
            <NavbarCenter
              hexcodleNumber={hexcodleNumber}
              miniNumber={miniNumber}
            />
          </NavCenter>
          <NavbarRight />
        </TopWrapper>
      </NavWrapper>
    </>
  );
}
