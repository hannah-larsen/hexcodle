import moment from "moment-timezone";
import { generateUniqueNumber, decimalToHex } from "./utils";

export function getCurrentDate() {
    const datetime = moment().tz("America/New_York");
    return datetime;
}

export function generateHexcode(num) {
    const date = getDateFromHexcodleNumber(num);

    // Really fucked fix
    const r = Math.min(generateUniqueNumber(256, 0, date), 255);
    const g = Math.min(generateUniqueNumber(256, 1, date), 255);
    const b = Math.min(generateUniqueNumber(256, 2, date), 255);

    const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };

    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(
        b
    )}`.toUpperCase();
}

export function generateMiniHexcode(num) {
    const date = getDateFromHexcodleNumber(num);

    const r = generateUniqueNumber(15, 15, date);
    const g = generateUniqueNumber(15, 16, date);
    const b = generateUniqueNumber(15, 17, date);

    return `#${decimalToHex(r)}${decimalToHex(g)}${decimalToHex(
        b
    )}`.toUpperCase();
}

export function getHexcodleNumber() {
    // August 10th, 2023 - start day of deployment
    const startDate = moment
        .tz("2023-08-10", "America/New_York")
        .startOf("day");
    const currentDate = getCurrentDate();
    const daysPassed = currentDate.diff(startDate, "days");
    return daysPassed;
}

export function getMiniNumber() {
    // March 27th, 2024 - start day of deployment
    const startDate = moment
        .tz("2024-03-27", "America/New_York")
        .startOf("day");
    const currentDate = getCurrentDate();
    const daysPassed = currentDate.diff(startDate, "days");
    return daysPassed;
}

export function getDateFromHexcodleNumber(hexcodleNumber) {
    const startDate = moment
        .tz("2023-08-10", "America/New_York")
        .startOf("day");
    const targetDate = startDate.clone().add(hexcodleNumber, "days");
    return targetDate.format("DD-MM-YYYY");
}

export function getDateFromMiniNumber(miniNumber) {
    const startDate = moment
        .tz("2024-03-27", "America/New_York")
        .startOf("day");
    const targetDate = startDate.clone().add(miniNumber, "days");
    return targetDate.format("DD-MM-YYYY");
}
