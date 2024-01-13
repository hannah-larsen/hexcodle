// app/archive/page.js
import ArchivePage from "./ArchivePage";
import {
  getColorName,
  getDateFromHexcodleNumber,
  generateHexcode,
  getHexcodleNumber,
} from "../utils";
// import { headers } from "next/headers";

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
  // Static stuff needs to be fixed
  //const headersList = headers();
  const panelsData = await load();
  return <ArchivePage panelsData={panelsData} />;
}
