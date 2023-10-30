import HexcodleGame from "./HexcodleGame";
import { cookies } from "next/headers";
import { generateRandomHexcode, getHexcodleNumber } from "./utils";

// Fix static generation

export default function Home() {
  // Added to force dynamic rendering
  const cookieStore = cookies();
  const randColor = generateRandomHexcode();
  const hexcodleNumber = getHexcodleNumber();
  return (
    <HexcodleGame targetColor={randColor} hexcodleNumber={hexcodleNumber} />
  );
}
