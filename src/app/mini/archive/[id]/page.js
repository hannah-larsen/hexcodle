export const dynamic = "force-dynamic";
// TODO: fix

import MiniHexcodle from "../../MiniHexcodle";
import { getColorName } from "@/app/utils";
import { getMiniNumber, generateMiniHexcode } from "@/app/timeUtils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Hexcodle Mini - The Bite Sized Hexcode Guessing Game!",
  description:
    "Can you guess today's hexcode color? Challenge your color instincts and decode the hexcode with Hexcodle! Inspired by Wordle, but for color enthusiasts.",
};

export default async function Page({ params }) {
  const { id } = params;
  const target = await generateMiniHexcode(id);
  const colorName = await getColorName(target);
  const currentHexcodle = await getMiniNumber();
  if (isNaN(id) || id > currentHexcodle) {
    return <p>This page unlocks in {id - currentHexcodle} day(s)</p>;
  }

  return (
    <MiniHexcodle
      targetColor={target}
      colorName={colorName}
      number={id}
      maxDay={currentHexcodle}
    />
  );
}
