import styled from "styled-components";

const Wrapper = styled.button`
  background-color: #bef264;
  border: #3f6212 1px solid;
  border-radius: 24px;
  padding: 4px 12px;
  max-width: min(600px, 100%);
  -webkit-line-clamp: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #3f6212;
  cursor: pointer;
`;

export default function Announcement({ onClick }) {
  return (
    <Wrapper onClick={onClick}>
      🎉 Jan 1st Updates 🎉 Our parrot is called Hexaviar!
    </Wrapper>
  );
}
