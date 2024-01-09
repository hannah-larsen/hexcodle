"use client";

import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Dropdown from "antd/lib/dropdown/dropdown";
import Switch from "antd/lib/switch";
import MenuOutlined from "@ant-design/icons/es/icons/MenuOutlined";
import RulesModal from "./RulesModal";
import HexInfoModal from "./HexInfoModal";

const NavWrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;
  background-color: #f3f3f3;
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  /*
--shadow-color: 122deg 100% 3%;
box-shadow: 0.4px 0.5px 0.7px hsl(var(--shadow-color) / 0.36),
  1.5px 1.7px 2.6px -0.8px hsl(var(--shadow-color) / 0.36),
  3.7px 4.2px 6.3px -1.7px hsl(var(--shadow-color) / 0.36),
  8.9px 10.3px 15.3px -2.5px hsl(var(--shadow-color) / 0.36);*/
`;

const NavLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const HexcodleTitle = styled.h1`
  color: rgb(4, 4, 19);
  font-family: "Roboto Mono", monospace;
  font-size: 2.4rem;
  margin-top: -4px;
  font-weight: bolder;
`;

const NavbarIcons = styled.div`
  text-align: right;
  margin-top: -2 px;
`;

const Description = styled.p`
  font-size: 0.8rem;
  padding-bottom: -10px;
`;

const InfoButtons = styled.nav`
  display: flex;
  flex-direction: row;
  justify-self: flex-end;
  gap: 4px;

  @media screen and (max-width: 750px) {
    display: none;
  }
`;

const MobileButtons = styled.div`
  display: none;

  @media screen and (max-width: 750px) {
    display: flex;
    margin-top: 3.5px;
  }
`;

export default function Navbar({
  hardMode,
  setHardMode,
  gameStarted,
  gameOver,
}) {
  const [isRuleModalVisible, setIsRuleModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  const items = [
    {
      label: (
        <a
          onClick={() => {
            setIsRuleModalVisible(true);
          }}
        >
          Rules
        </a>
      ),
      key: "0",
    },
    {
      label: <a onClick={() => setIsInfoModalVisible(true)}>What is hex?</a>,
      key: "1",
    },
    {
      label: <a href="https://forms.gle/EEX8iJKkr5ATjk6L8">Feedback</a>,
      key: "2",
    },
    {
      label: <a href="https://www.buymeacoffee.com/hexcodle">☕</a>,
      key: "3",
    },
    {
      label: <Link href={"/archive"}>🗄️</Link>,
      key: "4",
    },
  ];

  return (
    <>
      <NavWrapper>
        <NavLeft>
          <Link style={{ textDecoration: "none" }} href={"/"}>
            <HexcodleTitle>
              Hexcodle
              {!setHardMode && (
                <span style={{ fontSize: "1.5rem", fontWeight: "lighter" }}>
                  {" "}
                  Archive
                </span>
              )}
            </HexcodleTitle>
          </Link>

          <Description>
            {/*A daily colour-guessing game for hex code fanatics.*/}
          </Description>

          {setHardMode && (
            <NavbarIcons>
              <Switch
                checkedChildren="Hard"
                unCheckedChildren="Easy"
                checked={hardMode}
                onChange={(newValue) => {
                  setHardMode(newValue);
                }}
                disabled={(!hardMode && gameStarted) || gameOver}
              />
            </NavbarIcons>
          )}
        </NavLeft>

        <InfoButtons>
          <button
            className="modal-button"
            onClick={() => {
              setIsRuleModalVisible(true);
            }}
          >
            Rules
          </button>

          <button
            className="modal-button"
            onClick={() => setIsInfoModalVisible(true)}
          >
            What is hex?
          </button>

          <a
            className="modal-button"
            target="_blank"
            href="https://forms.gle/EEX8iJKkr5ATjk6L8"
          >
            Feedback
          </a>

          <a
            className="modal-button"
            target="_blank"
            href="https://www.buymeacoffee.com/hexcodle"
            src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js"
            data-name="bmc-button"
            data-slug="hexcodle"
            data-text="Buy me a coffee"
          >
            ☕
          </a>

          <Link className="modal-button" href={"/archive"}>
            🗄️
          </Link>
        </InfoButtons>

        <MobileButtons>
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <MenuOutlined
                style={{ fontSize: "1.75rem", cursor: "pointer" }}
              />
            </a>
          </Dropdown>
        </MobileButtons>
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
    </>
  );
}
