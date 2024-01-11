import styled from "styled-components";

const BackgroundPanel = styled.div`
  width: 100%;
  background-color: var(--gray-50);
  padding: 8px;
  border: 1px var(--gray-400) solid;
`;

const ColourPanel = styled.div`
  width: 100%;
  height: 150px;
  background-color: ${(props) =>
    props.hiddenColor
      ? "#8f8f8f"
      : props.hexcode}; //this will be the colour of the archive day
  align-items: center;
`;

const ColourNameText = styled.p`
  font-family: "Roboto Mono", monospace;
  font-weight: bold;
  font-size: 1.2rem;
  padding-bottom: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ColourHexText = styled.p`
  font-family: "Roboto Mono", monospace;
  font-weight: normal;
  font-size: 1rem;
  padding: 0;
`;

const DateText = styled.p`
  font-family: "Roboto Mono", monospace;
  font-weight: normal;
  font-size: 1rem;
  text-align: right;
  padding: 0;
`;

const BottomTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ArchivePanel = ({ hidden, hexcodleNumber, colorName, hexcode, date }) => {
  return (
    <BackgroundPanel>
      <ColourPanel hexcode={hexcode} hiddenColor={hidden}></ColourPanel>
      <ColourNameText>
        {hidden ? "UNSOLVED" : colorName.toUpperCase()}
      </ColourNameText>
      <BottomTextWrapper>
        <ColourHexText>{hidden ? "#??????" : hexcode}</ColourHexText>
        <DateText>{date}</DateText>
      </BottomTextWrapper>
    </BackgroundPanel>
  );
};

export default ArchivePanel;
