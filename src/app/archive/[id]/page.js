
import HexcodleGame from "../../HexcodleGame";
import { getColorName } from "../../serverUtils";
import {
    getHexcodleNumber,
    generateHexcode,
    getCurrentDate,
} from "../../timeUtils";

export async function generateStaticParams() {
    const currentHexcodle = getHexcodleNumber();
    const params = [];
    for (let i = 1; i <= currentHexcodle; i++) {
        params.push({ id: i.toString() });
    }
    return params;
}

export default async function Page(props) {
    const params = await props.params;
    const { id } = params;
    const target = await generateHexcode(id);
    const colorName = await getColorName(target);
    const currentDate = (await getCurrentDate()).toString();
    const currentHexcodle = await getHexcodleNumber();
    if (isNaN(id) || id > currentHexcodle) {
        return (
            <p>
                This page unlocks in {id - currentHexcodle} day(s). Currently
                its {currentDate}
            </p>
        );
    }

    return (
        <HexcodleGame
            targetColor={target}
            colorName={colorName}
            number={id}
            maxDay={currentHexcodle}
        />
    );
}
