import HexcodleGame from "./HexcodleGame";
import { cookies } from "next/headers";
import { generateRandomHexcode, getHexcodleNumber } from "./utils";

async function getColorName(hex) {
  try {
    const response = await fetch(
      `https://api.color.pizza/v1/${hex.replace("#", "")}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.colors && data.colors.length > 0) {
      return data.colors[0].name;
    }
    return "Unknown Color";
  } catch (error) {
    console.error("Error fetching color name:", error);
    return "Error";
  }
}

export default async function Home() {
  // Added to force dynamic rendering
  const cookieStore = cookies();
  const randColor = generateRandomHexcode();
  const colorName = await getColorName(randColor);
  return <HexcodleGame targetColor={randColor} colorName={colorName} />;
}
