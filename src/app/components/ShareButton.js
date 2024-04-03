"use client";

import { Button } from "./ui/button";
import { Share2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function ShareButton({
  mini,
  number,
  emojis,
  score,
  win = true,
  guessCount,
}) {
  function generateShareableString() {
    let shareString = "";
    console.log(win);
    shareString += win
      ? `I got Hexcodle ${
          mini ? "Mini " : ""
        }#${number} in ${guessCount}! Score: ${score}\n\n`
      : `I didn't get Hexcodle ${
          mini ? "Mini " : ""
        }#${number} :( Score: ${score}\n\n`;
    shareString += emojis;
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
