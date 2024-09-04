import HexcodleGame from "../../HexcodleGame";
import { getHexcodleNumber } from "@/app/timeUtils";

export default async function Page({}) {
  const currentHexcodle = await getHexcodleNumber();

  return (
    <HexcodleGame
      targetColor={"#982890"}
      colorName={"Dark Orchid"}
      number={"JARED"}
      maxDay={currentHexcodle}
      arrowsDisabled
    />
  );
}