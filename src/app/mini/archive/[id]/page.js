export const dynamic = "force-dynamic";

import { generateMiniHexcode } from "@/app/utils";
import MiniHexcodle from "../../MiniHexcodle";
import { generateHexcode, getColorName, getMiniNumber } from "@/app/utils";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Hexcodle Mini - The Bite Sized Hexcode Guessing Game!",
  description:
    "Can you guess today's hexcode color? Challenge your color instincts and decode the hexcode with Hexcodle! Inspired by Wordle, but for color enthusiasts.",
};

export default async function Page({ params }) {
  const { id } = params;
  const target = generateMiniHexcode(id);
  const colorName = await getColorName(target);

  const currentHexcodle = getMiniNumber();
  if (isNaN(id) || id > currentHexcodle) {
    redirect("/404");
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
