"use client";

import { Button } from "./ui/button";
import { Share2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function ShareButton({ mini, number, emojis, score }) {
  function generateShareableString() {
    let shareString = `Hexcodle ${mini ? "Mini " : ""}#${number}\n\n`;
    shareString += emojis;
    shareString += `\nScore: ${score} `;
    shareString += `\n\nhttps://hexcodle.com${mini ? "/mini" : ""}`;

    return shareString;
  }

  return (
    <Popover>
      <Button
        variant="secondary"
        asChild
        onClick={() => {
          navigator.clipboard.writeText(generateShareableString());
        }}
      >
        <PopoverTrigger>
          <Share2 className="mr-2 h-4 w-4" />
          Share my results
        </PopoverTrigger>
      </Button>
      <PopoverContent className="text-xs p-2 w-auto -mt-2">
        Copied to clipboard!
      </PopoverContent>
    </Popover>
  );
}
