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
  --color-1: #f8a5f8ff;
  --color-2: #5f1262ff;
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
        <Wrapper>✨New Blog Post!✨</Wrapper>
      </DialogTrigger>
      <DialogContent className="max-sm:max-w-[425px] max-w-xl overflow-auto max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Where TF have we been?!</DialogTitle>
          <DialogDescription>Read up on Hannah & Ekim&apos;s latest adventures!</DialogDescription>
        </DialogHeader>
        <p>
          Howdy Hexcodlers! It&apos;s been a while since we&apos;ve been able to sit down and take some time to work on Hexcodle.
        </p>
        <p>
          Truth is, we&apos;ve had a lot on our plate! Check out our newest{" "}
          <Link href="/blog/september-update" className="text-blue-500 hover:text-blue-400">
            blog post
          </Link>
          {" "}to read all about what we&apos;ve been up to.
        </p>
        <p>-E&amp;H 💗</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
