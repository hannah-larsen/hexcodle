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
  --color-1: #fecaca;
  --color-2: #dc2626;
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
        <Wrapper>🌈 Hexcodle Merch is Here! 🌈</Wrapper>
      </DialogTrigger>
      <DialogContent className="max-sm:max-w-[425px] max-w-xl overflow-auto max-h-[90%]">
        <DialogHeader>
          <DialogTitle>Updates: September 2nd, 2024</DialogTitle>
          <DialogDescription>
            Now Introducing...Hexcodle Merch!
          </DialogDescription>
        </DialogHeader>
        <p>
          Hey Hexcodle friends! It’s been an incredible year, and we’re excited
          to share something new with you—Hexcodle merch! Check it out at the{" "}
          <a
            className="text-blue-500 hover:text-blue-400"
            target="_blank"
            href="https://hexcodle.myshopify.com"
          >
            Hexcodle Shop
          </a>
          !
        </p>
        <p>
          We’ll be adding new designs from time to time, so stay tuned. If you
          have any ideas for merch, we’d love to hear them! You can share your
          thoughts through our{" "}
          <a
            className="text-blue-500 hover:text-blue-400"
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSe_EMsc0Gf00wNMl4xZ1t2VcGSY4k7NvqVAnnpoXCi16YgVxw/viewform"
          >
            Feedback Form
          </a>
          .
        </p>
        <p>
          Running Hexcodle ad-free is super important to us, and your purchases
          and donations help keep it that way. We couldn’t do this without your
          support, so thank you from the bottom of our hearts.
        </p>
        <center>
          <Image
            src="/hexparrot-animated.gif"
            alt="Hex Parrot Gif"
            width={100}
            height={100}
          />
        </center>
        <p>Thanks for being here! 💚 Hannah & Ekim</p>
        <p style={{ fontSize: "0.7rem" }}>
          P.S. If you enjoy Hexcodle and want to support us a bit more, you can{" "}
          <a
            className="text-blue-500 hover:text-blue-400"
            target="_blank"
            href="https://www.buymeacoffee.com/hexcodle"
          >
            buy us a coffee
          </a>
          . It’s completely optional, but we appreciate every bit of support.
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
