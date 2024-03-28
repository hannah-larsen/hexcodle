import MiniHexcodle from "./MiniHexcodle";
import { cookies } from "next/headers";
import { generateMiniHexcode, getColorName, getMiniNumber } from "@/app/utils";

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
