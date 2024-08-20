import HexcodleGame from "../../HexcodleGame";
import { getHexcodleNumber } from "../../utils";

export default async function Page({}) {
  const currentHexcodle = getHexcodleNumber();

  return (
    <HexcodleGame
      targetColor={"#1392ED"}
      colorName={"Ekim's Blue"}
      number={"EKIM"}
      maxDay={currentHexcodle}
      arrowsDisabled
    />
  );
}
