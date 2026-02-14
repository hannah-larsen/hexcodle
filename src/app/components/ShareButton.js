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

  const handleShare = async (e) => {
    const shareText = generateShareableString(win);

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hexcodle',
          text: shareText,
        });
        return;
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error sharing:", err);
        }
        // If native share fails or is cancelled, we can fallback to clipboard
      }
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for browsers without clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error("Fallback copy failed", err);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error("Could not copy text: ", err);
    }
  };

  return (
    <Popover open={copied} onOpenChange={setCopied}>
      <PopoverTrigger asChild>
        <Button
          className="bg-blue-900 hover:bg-blue-800 text-white font-serif font-bold transition-all"
          disabled={win === undefined}
          onClick={handleShare}
        >
          {copied ? (
            <Check className="mr-2 h-4 w-4 text-green-400" />
          ) : (
            <Share2 className="mr-2 h-4 w-4" />
          )}
          {copied ? "Copied!" : "Share my results"}
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
