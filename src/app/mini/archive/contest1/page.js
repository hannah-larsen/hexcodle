import MiniHexcodle from "../../MiniHexcodle";
import { getMiniNumber } from "@/app/utils";

export default async function Page({}) {
  const currentHexcodle = getMiniNumber();

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
