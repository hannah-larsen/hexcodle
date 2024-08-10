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
        <Wrapper>🎉 Happy Birthday Hexcodle! 🎂</Wrapper>
      </DialogTrigger>
      <DialogContent className="max-sm:max-w-[425px] max-w-xl overflow-auto max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Updates: August 10th, 2024</DialogTitle>
          <DialogDescription>
            Hexcodle turns one year old! 🎂✨
          </DialogDescription>
        </DialogHeader>
        <p>
          Long time no see! We are back with exciting news: <b>Hexcodle turns 1 today!!!</b> <i>(and yes, we are aware its puzzle
          #366 due to the leap year raaaahhh)</i>. We cannot 
          believe that it has been a whole year since we released Hexcodle into the world and we
          are so grateful for all the love and support you have shown us over the past 12 months.
        </p>
        <p>
          To celebrate our anniversary, we have made the beta version of Hexcodle playable
          and we hope you get a laugh out of it! It sure is crazy to see how much the game has evolved. Play{" "}
          <a
            className="text-blue-500 hover:text-blue-400"
            target="_blank"
            href="/beta"
          >
            Hexcodle Beta
          </a>{" "}
          here.
        </p>
        <p>
          To read the full history of Hexcodle, check out our newest{" "}
          <a
            className="text-blue-500 hover:text-blue-400"
            target="_blank"
            href="/blog/hexcodle-one-year"
          >
            blog post
          </a>{" "}
          .
        </p>
        <center>
          <Image
            src="/hexparrot-birthday.png"
            alt="Hex Parrot Birthday"
            width={100}
            height={100}
          />
        </center>
        <p>
          <i>We also added a few fun Hexcodle birthday easter eggs around the site, see if you can find them all! 👀</i>
        </p>
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
