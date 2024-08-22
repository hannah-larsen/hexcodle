import HexcodleGame from "../../HexcodleGame";
import { getHexcodleNumber } from "./timeUtils";

export default async function Page({}) {
  const currentHexcodle = await getHexcodleNumber();

  return (
    <HexcodleGame
      targetColor={"#83C955"}
      colorName={"Hannah's Green"}
      number={"HANNAH"}
      maxDay={currentHexcodle}
      arrowsDisabled
    />
  );
}
