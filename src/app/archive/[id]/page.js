export const dynamic = "force-dynamic";

import HexcodleGame from "../../HexcodleGame";
import { getColorName } from "../../utils";
import { getHexcodleNumber, generateHexcode } from "../../timeUtils";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const { id } = params;
  const target = await generateHexcode(id);
  const colorName = await getColorName(target);
  console.log(target);
  const currentHexcodle = await getHexcodleNumber();
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
