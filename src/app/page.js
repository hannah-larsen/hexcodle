export const dynamic = "force-dynamic";

import HexcodleGame from "./HexcodleGame";
import { getColorName } from "./utils";
import { generateHexcode, getHexcodleNumber } from "./timeUtils";

export default async function Home() {
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
