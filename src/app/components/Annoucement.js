import styled from "styled-components";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/app/components/ui/dialog";

const Wrapper = styled.button`
  --color-1: #fbcfe8;
  --color-2: #be185d;
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

export default function Announcement() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Wrapper>🌈 New Gamemode: Hexcodle Mini 🌈</Wrapper>
      </DialogTrigger>
      <DialogContent className="max-sm:max-w-[425px] max-w-xl overflow-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Updates: March 28th, 2024</DialogTitle>
          <DialogDescription>Hexcodle Mini, Blog and more!</DialogDescription>
        </DialogHeader>
        <p>
          <strong>Hexcodle Mini</strong>
        </p>
        <p>
          The highly-requested{" "}
          <Link
            className="text-blue-500 hover:text-blue-400"
            href="/mini"
            target="_blank"
          >
            Hexcodle Mini
          </Link>{" "}
          is now live! Instead of entering 6 digits of RGB values, the Mini is
          only comprised of 3 values, so you will no longer need to guess those
          pesky secondary digits.
        </p>
        <p>
          <strong>Blog</strong>
        </p>
        <p>
          We now have our own{" "}
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-400"
            target="_blank"
          >
            blog
          </Link>
          !!! Check out our first post and see what Wordle-style games we
          recommend, maybe you&apos;ll find a new favourite. 👀
        </p>
        <p>
          <strong>Relatle</strong>
        </p>
        <p>
          Looking for something new to play? You may like{" "}
          <a
            href="https://www.relatle.lol"
            className="text-blue-500 hover:text-blue-400"
            target="_blank"
          >
            Relatle
          </a>
          , our newest daily word game!
        </p>
        <center>
          <Image
            src="/hexparrot-animated.gif"
            alt="Hex Parrot Win"
            width={100}
            height={100}
          />
        </center>
        <p>- Hannah & Ekim</p>
        <br></br>
        <p style={{ fontSize: "0.7rem" }}>
          If you like playing Hexcodle and wish to support the developers, we
          have a link set up{" "}
          <a
            className="text-blue-500 hover:text-blue-400"
            target="_blank"
            href="https://www.buymeacoffee.com/hexcodle"
          >
            here
          </a>
          . Donations are appreciated, but are in no way mandatory. Thank you to
          everyone who has supported us!
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
