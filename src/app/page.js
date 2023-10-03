import HexcodleGame from "./HexcodleGame";
import { cookies } from "next/headers";
import { generateRandomHexcode } from "./utils";

// Fix static generation

export default function Home() {
  // Added to force dynamic rendering
  const cookieStore = cookies();
  const randColor = generateRandomHexcode();
  return <HexcodleGame targetColor={randColor} />;
}
