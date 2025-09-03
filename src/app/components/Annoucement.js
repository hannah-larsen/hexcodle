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
  --color-1: #bef264;
  --color-2: #3f6212;
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
        <Wrapper>Sorry for the interruption!</Wrapper>
      </DialogTrigger>
      <DialogContent className="max-sm:max-w-[425px] max-w-xl overflow-auto max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Daily puzzles are back</DialogTitle>
          <DialogDescription>About the Sep 1-3 outage</DialogDescription>
        </DialogHeader>
        <p>
          Hey friends, it&apos;s been a while since we&apos;ve given you an update like this.
        </p>
        <p>We recently moved across the continent to start new jobs, which has made us a bit busier than usual.
          As such, our goal has been to put Hexcodle into a stable maintenance mode.
          The lack of new puzzles for the last couple of days was an issue
          that slipped past us, but now we&apos;re back on track.</p>
        <p>
          Rest assured, Hexcodle isn&apos;t going anywhere! If you want to
          catch up, you can play missed days in the{" "}
          <Link href="/archive" className="text-blue-500 hover:text-blue-400">
            Archive
          </Link>
          .
        </p>
        <p>
          Stay tuned for a blog post coming soon!
        </p>
        <p>With love,</p>
        <p>-E&amp;H 💚</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
