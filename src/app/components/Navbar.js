"use client";

import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import RulesModal from "./RulesModal";
import HexInfoModal from "./HexInfoModal";
import SettingsModal from "./SettingsModal";
import {
  HistoryOutlined,
  CoffeeOutlined,
  SettingOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const NavWrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;
  background-color: var(--gray-50);
  border-bottom: 1px var(--gray-400) solid;
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

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
  gap: 12px;
  justify-content: start;
  font-size: 1.3rem;

  @media screen and (max-width: 500px) {
    font-size: 1.1rem;
  }
`;

const NavRight = styled.div`
  flex: 1;
  display: flex;
  gap: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  font-size: 1.3rem;

  @media screen and (max-width: 450px) {
    font-size: 1.2rem;
  }
`;

const NavCenter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
  font-size: 1.6rem;
`;

const HexcodleTitle = styled.h1`
  color: var(--gray-900);
  font-family: "Roboto Mono", monospace;
  font-size: 1.6rem;
  margin-top: -2px;
  font-weight: bolder;

  @media screen and (max-width: 450px) {
    font-size: 1.3rem;
  }
`;

export default function Navbar({ hexcodleNumber, maxDay }) {
  const [isRuleModalVisible, setIsRuleModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isSettingModalVisible, setIsSettingModalVisible] = useState(false);

  return (
    <>
      <NavWrapper>
        <TopWrapper>
          <NavLeft>
            <Link style={{ textDecoration: "none" }} href={"/archive"}>
              <HistoryOutlined />
            </Link>
            <QuestionCircleOutlined
              onClick={() => {
                setIsRuleModalVisible(true);
              }}
            />
          </NavLeft>
          <NavCenter>
            {hexcodleNumber ? (
              <>
                {parseInt(hexcodleNumber, 10) + 1 > maxDay ? (
                  <CaretLeftOutlined style={{ color: "var(--gray-300)" }} />
                ) : (
                  <Link
                    style={{ textDecoration: "none" }}
                    href={`/archive/${parseInt(hexcodleNumber, 10) + 1}`}
                  >
                    <CaretLeftOutlined />
                  </Link>
                )}

                <Link style={{ textDecoration: "none" }} href={"/"}>
                  <HexcodleTitle>Hexcodle #{hexcodleNumber}</HexcodleTitle>
                </Link>
                <Link
                  style={{ textDecoration: "none" }}
                  href={`/archive/${parseInt(hexcodleNumber, 10) - 1}`}
                  prefetch={false}
                >
                  <CaretRightOutlined />
                </Link>
              </>
            ) : (
              <Link style={{ textDecoration: "none" }} href={"/"}>
                <HexcodleTitle>Hexcodle Archives</HexcodleTitle>
              </Link>
            )}
          </NavCenter>
          <NavRight>
            <Link
              style={{ textDecoration: "none" }}
              href={"https://www.buymeacoffee.com/hexcodle"}
              prefetch={false}
            >
              <CoffeeOutlined />
            </Link>
            <SettingOutlined onClick={() => setIsSettingModalVisible(true)} />
          </NavRight>
        </TopWrapper>
      </NavWrapper>

      <RulesModal
        okButtonProps={{ style: { backgroundColor: "#3a743a" } }}
        isOpen={isRuleModalVisible}
        setIsOpen={setIsRuleModalVisible}
      />

      <HexInfoModal
        okButtonProps={{ style: { backgroundColor: "#3a743a" } }}
        isOpen={isInfoModalVisible}
        setIsOpen={setIsInfoModalVisible}
      />

      <SettingsModal
        isOpen={isSettingModalVisible}
        setIsOpen={setIsSettingModalVisible}
      />
    </>
  );
}
