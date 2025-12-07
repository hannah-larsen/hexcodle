"use server";

import { getColorName } from "../serverUtils";
import {
    getDateFromHexcodleNumber,
    generateHexcode,
    generateMiniHexcode,
    getDateFromMiniNumber,
} from "../timeUtils";

export async function fetchArchiveBatch(startNum, count) {
    // Ensure we don't go below 1
    const endNum = Math.max(1, startNum - count + 1);

    // Create array of numbers from startNum down to endNum
    const numbers = [];
    for (let i = startNum; i >= endNum; i--) {
        numbers.push(i);
    }

    const panelsData = await Promise.all(
        numbers.map(async (num) => {
            const hexcode = await generateHexcode(num);
            const colorName = await getColorName(hexcode);
            const date = await getDateFromHexcodleNumber(num);

            return {
                hexcodleNumber: num,
                colorName,
                hexcode,
                date,
            };
        })
    );

    return panelsData;
}

export async function fetchMiniArchiveBatch(startNum, count) {
    // Ensure we don't go below 1
    const endNum = Math.max(1, startNum - count + 1);

    // Create array of numbers from startNum down to endNum
    const numbers = [];
    for (let i = startNum; i >= endNum; i--) {
        numbers.push(i);
    }

    const panelsData = await Promise.all(
        numbers.map(async (num) => {
            const hexcode = await generateMiniHexcode(num);
            const colorName = await getColorName(hexcode);
            const date = await getDateFromMiniNumber(num);

            return {
                hexcodleNumber: num,
                colorName,
                hexcode,
                date,
            };
        })
    );

    return panelsData;
}
