// app/archive/page.js
import ArchivePage from "./ArchivePage";
import {
  getColorName,
  getDateFromHexcodleNumber,
  generateHexcode,
  getHexcodleNumber,
} from "../utils";
import { headers } from "next/headers";
import { unstable_cache } from "next/cache";

export async function loadArchive(hexcodleNumber) {
  const panelsData = await Promise.all(
    Array.from({ length: hexcodleNumber }, async (_, i) => {
      const hexcode = generateHexcode(i + 1);
      const colorName = await getColorName(hexcode);
      const date = getDateFromHexcodleNumber(i + 1);

      return {
        hexcodleNumber: i + 1,
        colorName,
        hexcode,
        date,
      };
    })
  );

  return panelsData.reverse();
}

export default async function Archive() {
  const hexcodleNumber = getHexcodleNumber();
  const headersList = headers();

  const loadCachedArchive = unstable_cache(
    async (hexcodleNumber) => loadArchive(hexcodleNumber),
    [hexcodleNumber]
  );

  const panelsData = await loadCachedArchive(hexcodleNumber);

  return <ArchivePage panelsData={panelsData} />;
}
