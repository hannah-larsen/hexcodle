export const dynamic = "force-dynamic";

import MiniArchivePage from "./MiniArchivePage";

import { headers } from "next/headers";
import { unstable_cache } from "next/cache";
import {
  getColorName,
  getDateFromMiniNumber,
  generateMiniHexcode,
  getMiniNumber,
} from "@/app/utils";

async function loadArchive(miniNumber) {
  const panelsData = await Promise.all(
    Array.from({ length: miniNumber }, async (_, i) => {
      const hexcode = generateMiniHexcode(i + 1);
      const colorName = await getColorName(hexcode);
      const date = getDateFromMiniNumber(i + 1);

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
  const hexcodleNumber = getMiniNumber();
  const headersList = headers();

  const loadCachedArchive = unstable_cache(
    async (hexcodleNumber) => loadArchive(hexcodleNumber),
    [hexcodleNumber]
  );

  const panelsData = await loadCachedArchive(hexcodleNumber);

  return <MiniArchivePage panelsData={panelsData} />;
}
