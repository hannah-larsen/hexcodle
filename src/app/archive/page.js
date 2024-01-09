// app/archive/page.js
import ArchivePage from "./ArchivePage";
import {
  getColorName,
  getDateFromHexcodleNumber,
  generateHexcode,
  getHexcodleNumber,
} from "../utils";

export async function load() {
  const totalHexcodleItems = getHexcodleNumber();
  const panelsData = [];

  for (let i = 1; i <= totalHexcodleItems; i++) {
    const hexcode = generateHexcode(i);
    const colorName = await getColorName(hexcode);
    const date = getDateFromHexcodleNumber(i);

    panelsData.push({
      hexcodleNumber: i,
      colorName,
      hexcode,
      date,
    });
  }

  return panelsData.reverse();
}

export default async function Archive() {
  const panelsData = await load();
  return <ArchivePage panelsData={panelsData} />;
}
