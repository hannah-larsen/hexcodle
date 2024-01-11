"use client";

import Modal from "antd/lib/modal";
import { Switch } from "antd";
import useLocalStorage from "../hooks/useLocalStorage";
import styled from "styled-components";

const Wrapper = styled.div``;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export default function SettingsModal({ isOpen, setIsOpen }) {
  const [hardMode, setHardMode] = useLocalStorage("hexcodle-hardmode", false);
  return (
    <Modal
      okButtonProps={{ style: { backgroundColor: "var(--primary)" } }}
      title="Settings"
      open={isOpen}
      onOk={() => {
        setIsOpen(false);
      }}
      onCancel={() => {
        setIsOpen(false);
      }}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Wrapper>
        <Row>
          <p>Indicator Arrows: </p>
          <Switch
            checkedChildren="Hard"
            unCheckedChildren="Easy"
            checked={hardMode}
            onChange={(newValue) => {
              setHardMode(newValue);
            }}
          />
        </Row>
        <p>Points system & red, green, blue indicators coming soon :)</p>
      </Wrapper>
    </Modal>
  );
}
