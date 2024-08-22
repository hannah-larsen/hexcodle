import HexcodleGame from "../../HexcodleGame";
import { getHexcodleNumber } from "@/app/timeUtils";

export default async function Page({}) {
  const currentHexcodle = await getHexcodleNumber();

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
