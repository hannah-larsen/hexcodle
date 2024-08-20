"use server";
export const dynamic = "force-dynamic";

import HexcodleGame from "../../HexcodleGame";
import { generateHexcode, getColorName, getHexcodleNumber } from "../../utils";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const { id } = params;
  const target = generateHexcode(id);
  const colorName = await getColorName(target);

  const currentHexcodle = getHexcodleNumber();
  if (isNaN(id) || id > currentHexcodle) {
    return <p>This page unlocks in {id - currentHexcodle} day(s)</p>;
  }

  return (
    <HexcodleGame
      targetColor={target}
      colorName={colorName}
      number={id}
      maxDay={currentHexcodle}
    />
  );
}
