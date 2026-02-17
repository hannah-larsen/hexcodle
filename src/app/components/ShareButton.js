"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Share2, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function ShareButton({
  mini,
  number,
  emojis,
  score,
  win,
  guessCount,
}) {
  function generateShareableString(hasWon) {
    let shareString = "";
    shareString += hasWon
      ? `I got Hexcodle ${mini ? "Mini " : ""
      }#${number} in ${guessCount}! Score: ${score}\n\n`
      : `I didn't get Hexcodle ${mini ? "Mini " : ""
      }#${number} :( Score: ${score}\n\n`;
    shareString += emojis;
    shareString += `\n\nhttps://hexcodle.com${mini ? "/mini" : ""}`;

    return shareString;
  }

  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareText = generateShareableString(win);

    const performCopy = async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareText);
          return true;
        }
      } catch (err) {
        console.warn("Clipboard API failed, falling back", err);
      }

      // Fallback
      try {
        const textArea = document.createElement("textarea");
        textArea.value = shareText;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        textArea.setAttribute("readonly", "");
        document.body.appendChild(textArea);
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        return successful;
      } catch (err) {
        console.error("Fallback copy failed", err);
        return false;
      }
    };

    const success = await performCopy();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Popover open={copied} onOpenChange={setCopied}>
      <PopoverTrigger asChild>
        <Button
          className="bg-blue-900 hover:bg-blue-800 text-white font-sans font-bold transition-all"
          disabled={win === undefined}
          onClick={(e) => {
            e.preventDefault();
            handleShare();
          }}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share my results
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side="top"
        align="center"
        className="text-xs p-2 w-auto mb-2 bg-gray-800 text-white border-none"
      >
        Copied to clipboard!
      </PopoverContent>
    </Popover>
  );
}
