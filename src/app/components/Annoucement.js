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
  --color-1: #bbf7d0;
  --color-2: #166534;
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
        <Wrapper>
          🏆 Contest: Create your own colour puzzle for Hexcodle Mini! ✨
        </Wrapper>
      </DialogTrigger>
      <DialogContent className="max-sm:max-w-[425px] max-w-xl overflow-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Updates: April 9th, 2024</DialogTitle>
          <DialogDescription>
            New Contest, Hexcodle Mini & Other Updates!
          </DialogDescription>
        </DialogHeader>
        <p>
          <strong>Hexcodle Mini Contest</strong>
        </p>
        <p>
          To kick off the end of the first week of{" "}
          <Link
            className="text-blue-500 hover:text-blue-400"
            href="/mini"
            target="_blank"
          >
            Hexcodle Mini
          </Link>
          {", "}
          we are excited to announce that we will be holding another{" "}
          <strong>custom puzzle contest!</strong> Submissions close April 20th.
        </p>
        <div className="flex items-center justify-start">
          <Button className="max-md:w-full" asChild variant="secondary">
            <Link target="_blank" href="https://forms.gle/UeQ9bPvso2WZm2uw9">
              <div />
              Enter Contest
            </Link>
          </Button>
        </div>
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
          recommend, maybe you&apos;ll find a new favourite.
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
