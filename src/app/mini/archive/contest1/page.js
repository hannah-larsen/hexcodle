import MiniHexcodle from "../../MiniHexcodle";
import { getMiniNumber } from "@/app/timeUtils";
export const dynamic = "force-static";

export default async function Page({}) {
  const currentHexcodle = await getMiniNumber();

  return (
    <MiniHexcodle
      targetColor={"#314"}
      colorName={"Blueberry Pi"}
      number={"CONTEST1"}
      maxDay={currentHexcodle}
      arrowsDisabled
    />
  );
}
