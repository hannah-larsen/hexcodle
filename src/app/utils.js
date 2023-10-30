// For Hansies :^)
import moment from "moment-timezone";
import seedrandom from "seedrandom";

/*
    Function to generate a random number based on the current date
    This is a pseudo-random function that generated a number between (0 and n].
    Normally you'd have to generate a new target every day and store that in a database
    but this makes it so everyone has the same random target every day,
    while needing no server :>
*/
export function generateUniqueNumber(n, offset = 0) {
  const now = moment().tz("America/New_York");
  const seed = now.format("DD-MM-YYYY");
  const rng = seedrandom(seed + offset);
  const uniqueNumber = Math.floor(rng() * (Number(n) + 1));
  return uniqueNumber;
}

// Function for converting 0-15 to a character
export function decimalToHex(n) {
  if (n < 0 || n > 15) {
    throw new Error("Input must be a number between 0 and 15.");
  }

  return n.toString(16);
}

// Function for converting a character to 0-15
export function hexToDecimal(hexChar) {
  if (typeof hexChar !== "string" || !hexChar.match(/^[0-9a-fA-F]$/)) {
    console.log(hexChar);
    throw new Error("Input must be a char between 0 and f.");
  }

  return parseInt(hexChar, 16);
}

// Function to print out "guess" emojis corresponding with how close user is to target hex code
// single arrows denote CLOSE PROXIMITY (within 2 numbers)
// double arrows denote FURTHER PROXIMITY (within 3 numbers)
// checkmark denotes correct guess
export function compareCharacters(guess, target) {
  if (guess === target) {
    return "✅";
  } else if (
    hexToDecimal(guess) < hexToDecimal(target) &&
    hexToDecimal(target) - hexToDecimal(guess) >= 3
  ) {
    return "⏫";
  } else if (
    hexToDecimal(guess) > hexToDecimal(target) &&
    hexToDecimal(guess) - hexToDecimal(target) >= 3
  ) {
    return "⏬";
  } else if (hexToDecimal(guess) < hexToDecimal(target)) {
    return "🔼";
  } else {
    return "🔽";
  }
}

export function generateRandomHexcode() {
  const r = generateUniqueNumber(256, 0);
  const g = generateUniqueNumber(256, 1);
  const b = generateUniqueNumber(256, 2);

  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(
    b
  )}`.toUpperCase();
}

export function getHexcodleNumber() {
  // August 10th, 2023 - start day of deployment
  const startDate = moment.tz("2023-08-10", "America/New_York").startOf("day");
  const currentDate = moment().tz("America/New_York");
  const daysPassed = currentDate.diff(startDate, "days");
  return daysPassed;
}
