import HexcodleGame from "../../HexcodleGame";
import { getHexcodleNumber } from "../../utils";

export default async function Page({}) {
  const currentHexcodle = getHexcodleNumber();

  return (
    <HexcodleGame
      targetColor={"#D46C8D"}
      colorName={"When Pigs Fly"}
      number={"CONTEST1"}
      maxDay={currentHexcodle}
      arrowsDisabled
    />
  );
}
