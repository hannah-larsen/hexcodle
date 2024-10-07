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
        <Wrapper>👒 Contest Time! Win Free Merch! 🦜</Wrapper>
      </DialogTrigger>
      <DialogContent className="max-sm:max-w-[425px] max-w-xl overflow-auto max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Hexcodle Free Merch Contest</DialogTitle>
          <DialogDescription>
            Post and Win Hexcodle Merch - Oct 6th, 2024
          </DialogDescription>
        </DialogHeader>
        <p>
          Hey friends, we&apos;re thrilled to announce our new contest, where
          you have the chance to win free Hexcodle merch! There are two ways to
          participate:
        </p>
        <ul>
          <li class="mb-2">
            <strong>Hexcodle Post Contest:</strong> Make a cool, creative or
            funny Hexcodle-related post on any platform. It could be a video,
            image or whatever medium you like, just don&apos;t forget to tag us!
          </li>
          <li>
            <strong>Hexcodle Archive Contest:</strong> Post a screenshot of your
            Hexcodle archive on any platform and tag us. The more completed, the
            better!
          </li>
        </ul>
        <p>
          One prize will be awarded for each contest, so don&apos;t miss out! We
          will be accepting submissions until November 1st. Make sure to use the
          hashtag <strong>#hexcodle</strong> on your post. If you&apos;d like to
          guarentee we see your submission, you can optionally fill out{" "}
          <Link
            href="https://forms.gle/s6FHKo1fgG2mMQEb9"
            target="_blank"
            className="text-blue-500 hover:text-blue-400"
          >
            this form.
          </Link>{" "}
        </p>
        <p>
          Head over to the{" "}
          <Link
            href="https://hexcodle.myshopify.com"
            target="_blank"
            className="text-blue-500 hover:text-blue-400"
          >
            Hexcodle Shop
          </Link>{" "}
          to check out what&apos;s up for grabs. We can&apos;t wait to see what
          you share!
        </p>
        <p>As always, love from E&H 💚</p>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
