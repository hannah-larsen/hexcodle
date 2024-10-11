// getCurrentDate.js
"use server";
import moment from "moment-timezone";

export const dynamic = "force-dynamic";

export async function getCurrentDate() {
  const datetime = moment().tz("America/New_York");
  return datetime;
}
