import MiniHexcodle from "../../MiniHexcodle";
import { getMiniNumber } from "@/app/utils";

export default async function Page({}) {
  const currentHexcodle = getMiniNumber();

  return (
    <MiniHexcodle
      targetColor={"#D22"}
      colorName={"Strawberry Marmalade"}
      number={"CONTEST3"}
      maxDay={currentHexcodle}
      arrowsDisabled
    />
  );
}
