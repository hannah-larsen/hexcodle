"use server";
import moment from "moment-timezone";
import seedrandom from "seedrandom";
import { generateUniqueNumber, decimalToHex } from "./utils";

export async function generateHexcode(num) {
  const date = await getDateFromHexcodleNumber(num);

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

export async function generateMiniHexcode(num) {
  const date = await getDateFromHexcodleNumber(num);

  const r = generateUniqueNumber(15, 15, date);
  const g = generateUniqueNumber(15, 16, date);
  const b = generateUniqueNumber(15, 17, date);

  return `#${decimalToHex(r)}${decimalToHex(g)}${decimalToHex(
    b
  )}`.toUpperCase();
}

export async function getHexcodleNumber() {
  // August 10th, 2023 - start day of deployment
  const startDate = moment.tz("2023-08-10", "America/New_York").startOf("day");
  const currentDate = moment().tz("America/New_York");
  const daysPassed = currentDate.diff(startDate, "days");
  return daysPassed;
}

export async function getMiniNumber() {
  // March 27th, 2024 - start day of deployment
  const startDate = moment.tz("2024-03-27", "America/New_York").startOf("day");
  const currentDate = moment().tz("America/New_York");
  const daysPassed = currentDate.diff(startDate, "days");
  return daysPassed;
}

export async function getDateFromHexcodleNumber(hexcodleNumber) {
  const startDate = moment.tz("2023-08-10", "America/New_York").startOf("day");
  const targetDate = startDate.add(hexcodleNumber, "days");
  return targetDate.format("DD-MM-YYYY");
}

export async function getDateFromMiniNumber(miniNumber) {
  const startDate = moment.tz("2024-03-27", "America/New_York").startOf("day");
  const targetDate = startDate.add(miniNumber, "days");
  return targetDate.format("DD-MM-YYYY");
}

export async function getCurrentDate() {
  const currentDate = moment().tz("America/New_York");
  return currentDate.format("dddd, MMMM Do YYYY, h:mm:ss A");
}
