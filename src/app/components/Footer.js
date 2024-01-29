import styled from "styled-components";
import PatchNotesModal from "./PatchNotesModal";
import Link from "next/link";
import { useState } from "react";

const Wrapper = styled.footer`
  width: 100%;
  background: var(--gray-50);
  border-top: 1px var(--gray-400) solid;
  padding: 16px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: row;
  justify-content: center;
  gap: 8px;
`;

const PatchButton = styled.button`
  cursor: pointer;
  color: var(--gray-900);
  font-size: 0.9rem;
  background-color: rgb(255, 255, 255, 0);
  border: none;
  text-decoration: underline;
  padding: 0;

  &:hover {
    color: #65a30d;
    transition: fade, 0.3s;
  }
`;

const Tag = styled.p`
  padding: 0;
`;

const LinkText = styled.p`
  color: var(--gray-900);
  padding: 0;
  font-size: 0.9rem;
  background-color: rgb(255, 255, 255, 0);
  border: none;
  text-decoration: underline;

  &:hover {
    color: #65a30d;
    transition: fade, 0.3s;
  }
`;

const NameLink = styled.a`
  text-decoration: none;
  color: #65a30d;

  &:hover {
    color: #a3e635;
    transition: fade, 0.3s;
  }
`;

export default function Footer() {
  const [isPatchNotesModalVisible, setIsPatchNotesModalVisible] =
    useState(false);
  return (
    <>
      <Wrapper>
        <Tag>
          Made by{" "}
          <NameLink href="https://hannah-larsen.github.io" target="_blank">
            {" "}
            Hannah
          </NameLink>{" "}
          and{" "}
          <NameLink href="https://ekimerton.github.io" target="_blank">
            Ekim
          </NameLink>{" "}
          with 💚
        </Tag>
        <LinkWrapper>
          <Link
            href={"https://forms.gle/EEX8iJKkr5ATjk6L8"}
            prefetch={false}
            target="_blank"
          >
            <LinkText>Submit Feedback</LinkText>
          </Link>
          {/*<Link href={"/about"} prefetch={false}>
              <LinkText>About us</LinkText>
            </Link>*/}
          <PatchButton
            onClick={() => {
              setIsPatchNotesModalVisible(true);
            }}
          >
            Patch Notes
          </PatchButton>
        </LinkWrapper>
      </Wrapper>
      <PatchNotesModal
        okButtonProps={{ style: { backgroundColor: "#3a743a" } }}
        isOpen={isPatchNotesModalVisible}
        setIsOpen={setIsPatchNotesModalVisible}
      />
    </>
  );
}
