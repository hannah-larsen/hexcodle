import HexcodleGame from "./HexcodleGame";
import { cookies } from "next/headers";
import { generateHexcode, getColorName, getHexcodleNumber } from "./utils";

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
    />
  );
}
