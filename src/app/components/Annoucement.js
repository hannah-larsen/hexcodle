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
  --color-1: #ddd6fe;
  --color-2: #5b21b6;
  background-color: var(--color-1);
  border: var(--color-2) 1px solid;
  color: var(--color-2);
  border-radius: 24px;
  padding: 4px 12px;
  max-width: min(600px, 100%);
  margin-top: -4px;
  margin-bottom: -4px;
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
        <Wrapper>🎉 Hexcodle Mini Contest Winners! 🎉</Wrapper>
      </DialogTrigger>
      <DialogContent className="max-sm:max-w-[425px] max-w-xl overflow-auto max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Updates: May 6th, 2024</DialogTitle>
          <DialogDescription>
            Hexcodle Mini Contest Winners! 🎉
          </DialogDescription>
        </DialogHeader>
        <p>
          After a long-awaited month, we have finally chosen the Hexcodle Mini
          contest winners and added the puzzles to the{" "}
          <a
            className="text-blue-500 hover:text-blue-400"
            target="_blank"
            href="/mini/custom-archive"
          >
            Mini Extras
          </a>{" "}
          page.
        </p>
        <p>
          Congratulations to{" "}
          <a
            className="text-blue-500 hover:text-blue-400"
            target="_blank"
            href="/mini/archive/contest1"
          >
            Kaylie
          </a>
          ,{" "}
          <a
            className="text-blue-500 hover:text-blue-400"
            target="_blank"
            href="/mini/archive/contest2"
          >
            Thomas
          </a>{" "}
          and{" "}
          <a
            className="text-blue-500 hover:text-blue-400"
            target="_blank"
            href="/mini/archive/contest3"
          >
            Joseph
          </a>{" "}
          for winning! We loved reading the names for all the colours submitted!
          Stay tuned for a{" "}
          <a
            className="text-blue-500 hover:text-blue-400"
            target="_blank"
            href="/blog"
          >
            blog post
          </a>{" "}
          soon, recapping some of our other favourite submissions.
        </p>
        <center>
          <Image
            src="/hexparrot-animated.gif"
            alt="Hex Parrot Win"
            width={100}
            height={100}
          />
        </center>
        <p>Thanks for Hexcodle-ing! Yours truly, Hannah & Ekim</p>
        <p style={{ fontSize: "0.7rem" }}>
          If you like playing Hexcodle and wish to support the developers, click{" "}
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
