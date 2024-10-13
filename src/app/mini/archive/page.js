export const dynamic = "force-dynamic";

import MiniArchivePage from "./MiniArchivePage";
import { unstable_cache } from "next/cache";
import { getColorName } from "@/app/utils";
import {
  generateMiniHexcode,
  getMiniNumber,
  getDateFromMiniNumber,
} from "@/app/timeUtils";

async function loadArchive(miniNumber) {
  const panelsData = await Promise.all(
    Array.from({ length: miniNumber }, async (_, i) => {
      const hexcode = await generateMiniHexcode(i + 1);
      const colorName = await getColorName(hexcode);
      const date = await getDateFromMiniNumber(i + 1);

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
  title: "Hexcodle Mini Archive",
};

export default async function Page() {
  const hexcodleNumber = await getMiniNumber();

  const loadCachedArchive = unstable_cache(
    async (hexcodleNumber) => loadArchive(hexcodleNumber),
    [hexcodleNumber]
  );

  const panelsData = await loadCachedArchive(hexcodleNumber);

  return <MiniArchivePage panelsData={panelsData} />;
}
