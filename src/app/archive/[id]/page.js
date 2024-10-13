export const dynamic = "force-dynamic";

import HexcodleGame from "../../HexcodleGame";
import { getColorName } from "../../utils";
import {
  getHexcodleNumber,
  generateHexcode,
  getCurrentDate,
} from "../../timeUtils";

export default async function Page({ params }) {
  const { id } = params;
  const target = await generateHexcode(id);
  const colorName = await getColorName(target);
  const currentDate = (await getCurrentDate()).toString();
  const currentHexcodle = await getHexcodleNumber();
  if (isNaN(id) || id > currentHexcodle) {
    return (
      <p>
        This page unlocks in {id - currentHexcodle} day(s). Currently its{" "}
        {currentDate}
      </p>
    );
  }

  return (
    <HexcodleGame
      targetColor={target}
      colorName={colorName}
      number={id}
      maxDay={currentHexcodle}
    />
  );
}
