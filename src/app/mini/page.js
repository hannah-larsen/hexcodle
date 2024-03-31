import MiniHexcodle from "./MiniHexcodle";
import { cookies } from "next/headers";
import { generateMiniHexcode, getColorName, getMiniNumber } from "@/app/utils";

export const metadata = {
  title: "Hexcodle Mini - The Bite Sized Hexcode Guessing Game!",
  description:
    "Can you guess today's hexcode color? Challenge your color instincts and decode the hexcode with Hexcodle! Inspired by Wordle, but for color enthusiasts.",
};

export default async function MiniHome() {
  // Added to force dynamic rendering
  const cookieStore = cookies();
  const randColor = generateMiniHexcode();
  const colorName = await getColorName(randColor);
  const number = getMiniNumber();
  return (
    <MiniHexcodle
      targetColor={randColor}
      colorName={colorName}
      number={number}
      maxDay={number}
    />
  );
}
