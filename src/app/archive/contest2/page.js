import HexcodleGame from "../../HexcodleGame";
import { getHexcodleNumber } from "@/app/timeUtils";
// export const dynamic = "force-static";

export default async function Page({}) {
    const currentHexcodle = await getHexcodleNumber();

    return (
        <HexcodleGame
            targetColor={"#BBC3DB"}
            colorName={"Rainy Day Sunday"}
            number={"CONTEST2"}
            maxDay={currentHexcodle}
            arrowsDisabled
        />
    );
}
