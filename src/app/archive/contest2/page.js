"use server";

import HexcodleGame from "../../HexcodleGame";
import { getHexcodleNumber } from "../../utils";

export default async function Page({}) {
  const currentHexcodle = getHexcodleNumber();

  return (
    <HexcodleGame
      targetColor={"#BBC3DB"}
      colorName={"Rainy Day Sunday"}
      number={"CONTEST2"}
      maxDay={currentHexcodle}
      arrowsDisabled
    />
  );
}
