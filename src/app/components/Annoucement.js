import styled from "styled-components";

const Wrapper = styled.button`
  --color-1: #c7d2fe;
  --color-2: #3730a3;
  background-color: var(--color-1);
  border: var(--color-2) 1px solid;
  color: var(--color-2);
  border-radius: 24px;
  padding: 4px 12px;
  max-width: min(600px, 100%);
  -webkit-line-clamp: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: ease, 0.3s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.5);
    transition: fade, 0.5s;
  }
`;

export default function Announcement({ onClick }) {
  return (
    <Wrapper onClick={onClick}>
      Feb 12th Updates: 🥇 Contest Winners! 🥇
    </Wrapper>
  );
}
