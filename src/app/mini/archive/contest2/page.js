import MiniHexcodle from "../../MiniHexcodle";
import { getMiniNumber } from "@/app/utils";

export default async function Page({}) {
  const currentHexcodle = getMiniNumber();

  return (
    <MiniHexcodle
      targetColor={"#EF3"}
      colorName={"Highlighter Yellow"}
      number={"contest2"}
      maxDay={currentHexcodle}
      arrowsDisabled
    />
  );
}
