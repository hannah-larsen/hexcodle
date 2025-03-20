import HexcodleGame from "../../HexcodleGame";
import { getHexcodleNumber } from "@/app/timeUtils";
// export const dynamic = "force-static";

export default async function Page({}) {
    const currentHexcodle = await getHexcodleNumber();

    return (
        <HexcodleGame
            targetColor={"#982890"}
            colorName={"Dark Orchid"}
            number={"JARED"}
            maxDay={currentHexcodle}
            arrowsDisabled
        />
    );
}
