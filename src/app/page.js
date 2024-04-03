import HexcodleGame from "./HexcodleGame";
import { cookies } from "next/headers";
import { generateHexcode, getColorName, getHexcodleNumber } from "./utils";

export const metadata = {
  title: "Hexcodle Mini - The Bite Sized Hexcode Guessing Game!",
  description:
    "Can you guess today's hexcode color? Challenge your color instincts and decode the hexcode with Hexcodle! Inspired by Wordle, but for color enthusiasts.",
};

export default async function Home() {
  // Added to force dynamic rendering
  const cookieStore = cookies();
  const randColor = generateHexcode();
  const colorName = await getColorName(randColor);
  const number = getHexcodleNumber();
  return (
    <HexcodleGame
      targetColor={randColor}
      colorName={colorName}
      number={number}
      maxDay={number}
    />
  );
}
