
import MiniHexcodle from "../../MiniHexcodle";
import { headers } from "next/headers";
import { getColorName } from "@/app/serverUtils";
import {
    getMiniNumber,
    generateMiniHexcode,
    getCurrentDate,
} from "@/app/timeUtils";

export async function generateStaticParams() {
    const currentHexcodle = getMiniNumber();
    const params = [];
    for (let i = 1; i <= currentHexcodle; i++) {
        params.push({ id: i.toString() });
    }
    return params;
}

export default async function Page(props) {
    const params = await props.params;
    const { id } = params;
    const target = await generateMiniHexcode(id);
    const colorName = await getColorName(target);
    const currentHexcodle = await getMiniNumber();
    const currentDate = (await getCurrentDate()).toString();
    if (isNaN(id) || id > currentHexcodle) {
        return (
            <p>
                This page unlocks in {id - currentHexcodle} day(s). Currently
                its {currentDate}
            </p>
        );
    }

    return (
        <MiniHexcodle
            targetColor={target}
            colorName={colorName}
            number={id}
            maxDay={currentHexcodle}
        />
    );
}
