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

function getCurrentDateFormatted() {
  const now = moment().tz("America/New_York");
  return now.format("DD-MM-YYYY");
}

export function generateUniqueNumber(n, offset = 0, customDate = null) {
  const rng = seedrandom(customDate + offset);
  return Math.floor(rng() * (Number(n) + 1));
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
    throw new Error("Input must be a char between 0 and f.");
  }

  return parseInt(hexChar, 16);
}

// Function to print out "guess" emojis corresponding with how close user is to target hex code
// single arrows denote CLOSE PROXIMITY (within 2 numbers)
// double arrows denote FURTHER PROXIMITY (within 3 numbers)
// checkmark denotes correct guess
export function compareCharacters(guess, target, hardMode = false) {
  if (guess === target) {
    return "✅";
  } else if (
    hexToDecimal(guess) < hexToDecimal(target) &&
    hexToDecimal(target) - hexToDecimal(guess) >= 3 &&
    !hardMode
  ) {
    return "⏫";
  } else if (
    hexToDecimal(guess) > hexToDecimal(target) &&
    hexToDecimal(guess) - hexToDecimal(target) >= 3 &&
    !hardMode
  ) {
    return "⏬";
  } else if (hexToDecimal(guess) < hexToDecimal(target)) {
    return "🔼";
  } else {
    return "🔽";
  }
}

export function generateHexcode(num = getHexcodleNumber()) {
  const date = getDateFromHexcodleNumber(num);

  const r = generateUniqueNumber(256, 0, date);
  const g = generateUniqueNumber(256, 1, date);
  const b = generateUniqueNumber(256, 2, date);

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

export function getDateFromHexcodleNumber(hexcodleNumber) {
  const startDate = moment.tz("2023-08-10", "America/New_York").startOf("day");
  const targetDate = startDate.add(hexcodleNumber, "days");
  return targetDate.format("DD-MM-YYYY");
}

export async function getColorName(hex) {
  try {
    const response = await fetch(
      `https://api.color.pizza/v1/${hex.replace("#", "")}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data.colors && data.colors.length > 0) {
      return data.colors[0].name;
    }
    return "Unknown Color";
  } catch (error) {
    console.error("Error fetching color name:", error);
    return "Error";
  }
}

function getRGB(hexcode) {
  const validHex = hexcode.slice(1);
  if (validHex.length !== 6) {
    throw new Error('Invalid hex code');
  }
  const red = parseInt(validHex.substring(0, 2), 16);
  const green = parseInt(validHex.substring(2, 4), 16);
  const blue = parseInt(validHex.substring(4, 6), 16);

  return { red, green, blue };
}

export function getScore(target, guesses) {
  const MAX_GUESSES = 5;
  let differenceSum = 0;
  const { red: targetRed, green: targetGreen, blue: targetBlue } = getRGB(target);
  guesses.forEach(guess => {
    const {red, green, blue} = getRGB(guess);
    differenceSum += Math.abs(targetRed - red) + Math.abs(targetGreen - green) + Math.abs(targetBlue - blue)
  });
  return Math.round(((765 * MAX_GUESSES) - differenceSum) / (765 * MAX_GUESSES) * 1000);
}