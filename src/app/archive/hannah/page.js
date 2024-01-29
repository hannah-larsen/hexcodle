import HexcodleGame from "../../HexcodleGame";
import { getHexcodleNumber } from "../../utils";

export default async function Page({}) {
  const currentHexcodle = getHexcodleNumber();

  return (
    <HexcodleGame
      targetColor={"#83C955"}
      colorName={"Hannah's Green"}
      number={"HANNAH"}
      maxDay={currentHexcodle}
    />
  );
}
