// export const dynamic = "force-dynamic";

import ArchivePage from "./ArchivePage";
import { getHexcodleNumber } from "../timeUtils";
import { fetchArchiveBatch } from "./actions";
import { unstable_cache } from "next/cache";

export const metadata = {
    title: "Hexcodle Archive",
    description: "Dive into our past hexcodles to test your skills!",
};

export default async function Archive() {
    const hexcodleNumber = await getHexcodleNumber();

    const loadInitialArchive = unstable_cache(
        async (startNum) => fetchArchiveBatch(startNum, 100),
        ["archive-initial", hexcodleNumber.toString()]
    );

    const panelsData = await loadInitialArchive(hexcodleNumber);

    return <ArchivePage panelsData={panelsData} totalCount={hexcodleNumber} />;
}
