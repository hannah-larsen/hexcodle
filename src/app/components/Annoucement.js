import styled from "styled-components";

const Wrapper = styled.button`
  background-color: #bef264;
  border: #3f6212 1px solid;
  border-radius: 24px;
  padding: 4px 12px;
  max-width: 600px;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #3f6212;
  cursor: pointer;
`;

export default function Announcement({ onClick }) {
  return (
    <Wrapper onClick={onClick}>
      🎉 Jan 20 Updates 🎉 Thank you for your support...
    </Wrapper>
  );
}
