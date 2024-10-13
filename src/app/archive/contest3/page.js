import HexcodleGame from "../../HexcodleGame";
import { getHexcodleNumber } from "@/app/timeUtils";
export const dynamic = "force-static";

export default async function Page({}) {
  const currentHexcodle = await getHexcodleNumber();

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
