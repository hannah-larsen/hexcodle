import styled from "styled-components";
import { useLocalStorage } from "@mantine/hooks";

const Wrapper = styled.div`
  max-width: min(600px, 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 16px;
  background-color: var(--gray-50);
  border: 1px var(--gray-400) solid;
`;

const Box = styled.div`
  flex: 1;
  flex-shrink: 0;
  padding: 8px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 1rem;
  font-weight: bold;
`;

const Stat = styled.p`
  padding: 0;
  font-size: 1.4rem;
`;

// Given an array games get the average length of game.guesses
const getAverage = (games) => {
  const total = games.reduce((acc, [_, game]) => {
    return acc + game.guesses.length;
  }, 0);
  return (total / games.length).toFixed(2);
};

const Stats = (props) => {
  const { games, totalCount } = props;
  const [streak, _setStreak] = useLocalStorage({
    key: "streak",
    defaultValue: {
      lastDate: null,
      days: 0,
    },
  });
  return (
    <Wrapper>
      <Box>
        <Title>Completed</Title>
        <Stat>
          {games.length}/{totalCount}
        </Stat>
      </Box>
      <Box>
        <Title>Streak</Title>
        <Stat>
          {streak.days} {streak.days === 1 ? "Day" : "Days"}
        </Stat>
      </Box>
      <Box>
        <Title>Average</Title>
        <Stat>{games.length > 0 ? getAverage(games) : "NaN"}</Stat>
      </Box>
    </Wrapper>
  );
};

export default Stats;
