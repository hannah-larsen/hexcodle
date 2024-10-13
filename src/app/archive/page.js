export const dynamic = "force-dynamic";

import ArchivePage from "./ArchivePage";
import { getColorName } from "../utils";
import {
  getHexcodleNumber,
  getDateFromHexcodleNumber,
  generateHexcode,
} from "../timeUtils";
import { unstable_cache } from "next/cache";

export async function loadArchive(hexcodleNumber) {
  const panelsData = await Promise.all(
    Array.from({ length: hexcodleNumber }, async (_, i) => {
      const hexcode = await generateHexcode(i + 1);
      const colorName = await getColorName(hexcode);
      const date = await getDateFromHexcodleNumber(i + 1);

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

export const metadata = {
  title: "Hexcodle Archive",
  description: "Dive into our past hexcodles to test your skills!",
};

export default async function Archive() {
  const hexcodleNumber = await getHexcodleNumber();

  const loadCachedArchive = unstable_cache(
    async (hexcodleNumber) => loadArchive(hexcodleNumber),
    [hexcodleNumber]
  );

  const panelsData = await loadCachedArchive(hexcodleNumber);

  return <ArchivePage panelsData={panelsData} />;
}
