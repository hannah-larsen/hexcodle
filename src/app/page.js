import HexcodleGame from "./HexcodleGame";
import HexInfoModal from "./components/HexInfoModal";
import { generateRandomHexcode } from "./utils";

// Fix static generation

export default function Home() {
  const randColor = generateRandomHexcode();
  return <HexcodleGame targetColor={randColor} />;
}
