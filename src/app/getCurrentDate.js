// getCurrentDate.js
"use server";
import moment from "moment-timezone";

export async function getCurrentDate() {
  const datetime = moment().tz("America/New_York");
  return datetime;
}
