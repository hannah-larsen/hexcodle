"use client";

import React from "react";
import styled from "styled-components";
import RulesModal from "./RulesModal";
import MenuSidebar from "./MenuSidebar";
import SettingsModal from "./SettingsModal";
import NavbarCenter from "./NavbarCenter";
import { usePathname } from "next/navigation";

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

const NavRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
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

export default function Navbar() {
  const pathname = usePathname();

  const isHexcodle = /^\/(archive\/[^\/]+)?$/.test(pathname);
  const isHexcodleOrMini =
    /^\/(archive\/[^\/]+|mini(\/archive\/[^\/]+)?)?$/.test(pathname);

  return (
    <>
      <NavWrapper>
        <TopWrapper>
          <NavLeft>
            <MenuSidebar />
          </NavLeft>
          <NavCenter>
            <NavbarCenter />
          </NavCenter>
          <NavRight>
            {isHexcodleOrMini && <RulesModal />}
            {isHexcodle && <SettingsModal />}
          </NavRight>
        </TopWrapper>
      </NavWrapper>
    </>
  );
}
