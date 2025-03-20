import MiniHexcodle from "../../MiniHexcodle";
import { getMiniNumber } from "@/app/timeUtils";
// export const dynamic = "force-static";

export default async function Page({}) {
    const currentHexcodle = await getMiniNumber();

    return (
        <MiniHexcodle
            targetColor={"#D22"}
            colorName={"Strawberry Marmalade"}
            number={"CONTEST3"}
            maxDay={currentHexcodle}
            arrowsDisabled
        />
    );
}
