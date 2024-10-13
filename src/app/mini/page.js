export const dynamic = "force-dynamic";

import MiniHexcodle from "./MiniHexcodle";
import { getColorName } from "@/app/utils";
import { generateMiniHexcode, getMiniNumber } from "../timeUtils";

export const metadata = {
  title: "Hexcodle Mini - The Bite-Sized Hexcode Guessing Game!",
  description:
    "Can you guess today's hexcode color? Challenge your color instincts and decode the hexcode with Hexcodle! Inspired by Wordle, but for color enthusiasts.",
};

export default async function MiniHome() {
  const number = await getMiniNumber();
  const randColor = await generateMiniHexcode(number);
  const colorName = await getColorName(randColor);
  return (
    <MiniHexcodle
      targetColor={randColor}
      colorName={colorName}
      number={number}
      maxDay={number}
    />
  );
}
