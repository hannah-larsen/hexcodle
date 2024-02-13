import HexcodleGame from "../../HexcodleGame";
import { getHexcodleNumber } from "../../utils";

export default async function Page({}) {
  const currentHexcodle = getHexcodleNumber();

  return (
    <HexcodleGame
      targetColor={"#DCB73E"}
      colorName={"Food Court Honey Mustard"}
      number={"CONTEST3"}
      maxDay={currentHexcodle}
      arrowsDisabled
    />
  );
}
