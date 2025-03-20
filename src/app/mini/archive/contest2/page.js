import MiniHexcodle from "../../MiniHexcodle";
import { getMiniNumber } from "@/app/timeUtils";
// export const dynamic = "force-static";

export default async function Page({}) {
    const currentHexcodle = await getMiniNumber();

    return (
        <MiniHexcodle
            targetColor={"#EF3"}
            colorName={"Highlighter Yellow"}
            number={"CONTEST2"}
            maxDay={currentHexcodle}
            arrowsDisabled
        />
    );
}
