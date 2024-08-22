export const dynamic = "force-dynamic";

import HexcodleGame from "./HexcodleGame";
import { cookies } from "next/headers";
import { getColorName } from "./utils";
import { generateHexcode, getHexcodleNumber } from "./timeUtils";

export default async function Home() {
  // Added to force dynamic rendering
  const cookieStore = cookies();
  const number = await getHexcodleNumber();
  const randColor = await generateHexcode(number);
  const colorName = await getColorName(randColor);

  return (
    <HexcodleGame
      targetColor={randColor}
      colorName={colorName}
      number={number}
      maxDay={number}
    />
  );
}
