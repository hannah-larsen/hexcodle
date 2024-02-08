"use client";

import Modal from "antd/lib/modal";
import { useLocalStorage } from "@mantine/hooks";
import styled from "styled-components";
import { Radio } from "antd";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Explanation = styled.div`
  p {
    padding: 0;
  }
`;

const Emoji = styled.span`
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;

const difficultyOptions = [
  { label: "Easy", value: "easy" },
  { label: "Hard", value: "hard" },
  { label: "Expert", value: "expert" },
];

const colorModeOptions = [
  { label: "Hexcode", value: "hex" },
  { label: "RGB", value: "rgb" },
];

export default function SettingsModal({ isOpen, setIsOpen }) {
  const [settings, setSettings] = useLocalStorage({
    key: "settings",
    defaultValue: {
      difficulty: "easy",
      colorMode: "hex",
    },
  });

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
        <Explanation>
          <h4>Emoji Legend</h4>
          <p>✅ Correct</p>
          {settings.difficulty === "expert" && (
            <>
              <p>❌ Incorrect</p>
            </>
          )}
          {settings.difficulty === "hard" && (
            <>
              <p>🔼 / 🔽 Guess higher or lower</p>
            </>
          )}
          {settings.difficulty === "easy" && settings.colorMode === "rgb" && (
            <>
              <p>🔼 / 🔽 Guess higher or lower by 1 or 2</p>
              <p>
                <Emoji>⤴️</Emoji> / <Emoji>⤵️</Emoji> Guess higher or lower by 3
                to 9
              </p>
              <p>⏫️ / ⏬️ Guess higher or lower by 10+</p>
            </>
          )}
          {settings.difficulty === "easy" && settings.colorMode === "hex" && (
            <>
              <p>🔼 / 🔽 Guess higher or lower by 1 or 2</p>
              <p>⏫️ / ⏬️ Guess higher or lower by 3+</p>
            </>
          )}
        </Explanation>
        <OptionGroup>
          <h4>Difficulty</h4>
          <Radio.Group
            options={difficultyOptions}
            onChange={(e) => {
              setSettings({ ...settings, difficulty: e.target.value });
            }}
            value={settings.difficulty}
          />
        </OptionGroup>
        <OptionGroup>
          <h4>Color Mode</h4>
          <Radio.Group
            options={colorModeOptions}
            onChange={(e) => {
              setSettings({ ...settings, colorMode: e.target.value });
            }}
            value={settings.colorMode}
          />
        </OptionGroup>
      </Wrapper>
    </Modal>
  );
}
