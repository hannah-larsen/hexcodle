// export const dynamic = "force-dynamic";

import MiniArchivePage from "./MiniArchivePage";
import { unstable_cache } from "next/cache";
import { getMiniNumber } from "@/app/timeUtils";
import { fetchMiniArchiveBatch } from "../../archive/actions";

export const metadata = {
    title: "Hexcodle Mini Archive",
};

export default async function Page() {
    const hexcodleNumber = await getMiniNumber();

    const loadInitialArchive = unstable_cache(
        async (startNum) => fetchMiniArchiveBatch(startNum, 100),
        ["mini-archive-initial", hexcodleNumber.toString()]
    );

    const panelsData = await loadInitialArchive(hexcodleNumber);

    return <MiniArchivePage panelsData={panelsData} totalCount={hexcodleNumber} />;
}
