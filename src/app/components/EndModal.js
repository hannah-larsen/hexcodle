/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import useMediaQuery from "@/app/hooks/use-media-query";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import { Share2 } from "lucide-react";
import { useLocalStorage } from "@mantine/hooks";
import { compareCharacters, compareRGB, getScore, hexToRGB } from "../utils";
import Timer from "./Timer";
import ShareButton from "./ShareButton";

function processHexGuesses(guesses, color, settings) {
  const reversed = [...guesses].reverse();
  const resultLines = reversed.map((guess) => {
    const line = guess
      .substring(1)
      .split("")
      .map((guessChar, index) => {
        const targetChar = color.substring(1).charAt(index);
        return compareCharacters(guessChar, targetChar, settings.difficulty);
      })
      .join("");
    return line;
  });
  return resultLines.join("\n");
}

function processRGBGuesses(guesses, color, settings) {
  let resultString = "";
  const targetRGB = hexToRGB(color);
  const reversed = [...guesses].reverse();
  for (let guess of reversed) {
    const guessRGB = hexToRGB(guess);
    const redComparison = compareRGB(
      guessRGB.red,
      targetRGB.red,
      settings.difficulty
    );
    const greenComparison = compareRGB(
      guessRGB.green,
      targetRGB.green,
      settings.difficulty
    );
    const blueComparison = compareRGB(
      guessRGB.blue,
      targetRGB.blue,
      settings.difficulty
    );
    let line = `🟥${redComparison}🟩${greenComparison}🟦${blueComparison}\n`;
    resultString += line;
  }

  return resultString;
}

export function EndModal({
  open,
  setOpen,
  color,
  colorName,
  guesses,
  win,
  hexcodleNumber,
  isMini,
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [settings, _setSettings] = useLocalStorage({
    key: "settings",
    defaultValue: {
      difficulty: "easy",
      colorMode: "hex",
    },
  });
  const processGuesses =
    settings.colorMode === "hex" || isMini
      ? processHexGuesses
      : processRGBGuesses;
  const emojis = processGuesses(guesses, color, settings);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" className="absolute bottom-5 right-5">
            <Share2 className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader className="text-center flex flex-col items-center">
            {win ? (
              <img
                width={100}
                height={100}
                src="/hexparrot-animated.gif"
                alt="Hexavier the Parrot - Win Animation"
              />
            ) : (
              <img
                width={100}
                height={100}
                src="/hexparrot-sad-animation.gif"
                alt="Hexavier the Parrot - Loss Animation"
              />
            )}
            <DialogTitle>{win ? "Great Job!" : "Bummer"}</DialogTitle>
            <DialogDescription>
              {isMini ? "Mini" : "Hexcodle"} #{hexcodleNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="items-center flex flex-col gap-4 pb-2">
            <div>
              <p className="pb-2 text-center">
                The hidden color was{" "}
                <span className="font-semibold">{colorName}</span> ({color})
              </p>
              <p className="text-center font-semibold">
                Score: {getScore(color, guesses)}
              </p>
              <div className="text-3xl tracking-widest text-center">
                <p>
                  {" "}
                  {emojis.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < emojis.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>
            <ShareButton
              mini={isMini}
              number={hexcodleNumber}
              emojis={emojis}
              score={getScore(color, guesses)}
              win={win}
              guessCount={guesses.length}
            />
          </div>
          <DialogFooter
            className="text-center font-light text-slate-600 text-sm"
            style={{ justifyContent: "center" }}
          >
            <Timer isModalActive={open} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="icon" className="absolute bottom-5 right-5">
          <Share2 className="w-4 h-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-center flex flex-col items-center">
          {win ? (
            <img
              width={100}
              height={100}
              src="/hexparrot-animated.gif"
              alt="Hexavier the Parrot - Win Animation"
            />
          ) : (
            <img
              width={100}
              height={100}
              src="/hexparrot-sad-animation.gif"
              alt="Hexavier the Parrot - Loss Animation"
            />
          )}
          <DrawerTitle>{win ? "Great Job!" : "Bummer"}</DrawerTitle>
          <DrawerDescription>
            {isMini ? "Mini" : "Hexcodle"} #{hexcodleNumber}
          </DrawerDescription>
        </DrawerHeader>
        <div className="items-center flex flex-col gap-4 pb-2">
          <div>
            <p className="pb-2 text-center">
              The hidden color was{" "}
              <span className="font-semibold">{colorName}</span> ({color})
            </p>
            <p className="text-center font-semibold">
              Score: {getScore(color, guesses)}
            </p>
            <div className="text-3xl tracking-widest text-center">
              <p>
                {" "}
                {emojis.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < emojis.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
          <ShareButton
            mini={isMini}
            number={hexcodleNumber}
            emojis={emojis}
            score={getScore(color, guesses)}
            win={win}
            guessCount={guesses.length}
          />
        </div>
        <DrawerFooter className="text-center font-light text-slate-600 text-sm">
          <Timer isModalActive={open} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
