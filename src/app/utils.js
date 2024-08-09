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
  return n.toString(16);
}

// Function for converting a character to 0-15
export function hexToDecimal(hexChar) {
  return parseInt(hexChar, 16);
}

// Function for converting 0-255 to a 2 character hex string
export function decimalToHex2(n) {
  if (n < 0 || n > 255) {
    throw new Error("Input must be a number between 0 and 255.");
  }

  return n.toString(16).padStart(2, "0").toUpperCase();
}

export function hexToRGB(hex) {
  const validHex = hex.slice(1);
  if (validHex.length !== 6) {
    throw new Error("Invalid hex code");
  }

  const red = parseInt(validHex.substring(0, 2), 16);
  const green = parseInt(validHex.substring(2, 4), 16);
  const blue = parseInt(validHex.substring(4, 6), 16);

  return { red, green, blue };
}

export function compareCharacters(guess, target, difficulty = "easy") {
  // Convert hex characters to decimal for comparison
  const guessVal = hexToDecimal(guess);
  const targetVal = hexToDecimal(target);
  const difference = Math.abs(guessVal - targetVal);

  switch (difficulty) {
    case "easy":
      if (guess === target) {
        return "✅";
      } else if (difference <= 2) {
        return guessVal < targetVal ? "🔼" : "🔽";
      } else {
        return guessVal < targetVal ? "⏫" : "⏬";
      }

    case "hard":
      if (guess === target) {
        return "✅";
      } else {
        return guessVal < targetVal ? "🔼" : "🔽";
      }

    case "expert":
      return guess === target ? "✅" : "❌";

    default:
      return "Invalid difficulty level";
  }
}

export function compareRGB(guess, target, difficulty) {
  // Check for exact match
  if (guess === target) {
    return "✅";
  }

  switch (difficulty) {
    case "easy":
      const difference = Math.abs(guess - target);
      if (difference <= 2) {
        return guess < target ? "🔼" : "🔽";
      } else if (difference <= 9) {
        return guess < target ? "⤴️" : "⤵️";
      } else {
        return guess < target ? "⏫" : "⏬";
      }

    case "hard":
      return guess < target ? "🔼" : "🔽";

    case "expert":
      return "❌";

    default:
      return "Invalid difficulty level";
  }
}

export function generateHexcode(num = getHexcodleNumber()) {
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

export function generateMiniHexcode(num = getMiniNumber()) {
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
  const startDate = moment.tz("2023-08-10", "America/New_York").startOf("day");
  const currentDate = moment().tz("America/New_York");
  const daysPassed = currentDate.diff(startDate, "days");
  return daysPassed;
}

export function getMiniNumber() {
  // March 27th, 2024 - start day of deployment
  const startDate = moment.tz("2024-03-27", "America/New_York").startOf("day");
  const currentDate = moment().tz("America/New_York");
  const daysPassed = currentDate.diff(startDate, "days");
  return daysPassed;
}

export function getDateFromHexcodleNumber(hexcodleNumber) {
  const startDate = moment.tz("2023-08-10", "America/New_York").startOf("day");
  const targetDate = startDate.add(hexcodleNumber, "days");
  return targetDate.format("DD-MM-YYYY");
}

export function getDateFromMiniNumber(miniNumber) {
  const startDate = moment.tz("2024-03-27", "America/New_York").startOf("day");
  const targetDate = startDate.add(miniNumber, "days");
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
    return "Error";
  }
}

function getRGB(hexcode) {
  let validHex = hexcode.slice(1);

  if (validHex.length === 3) {
    validHex = validHex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  if (validHex.length !== 6) {
    throw new Error("Invalid hex code");
  }

  const red = parseInt(validHex.substring(0, 2), 16);
  const green = parseInt(validHex.substring(2, 4), 16);
  const blue = parseInt(validHex.substring(4, 6), 16);

  return { red, green, blue };
}

export function getScore(target, guesses) {
  const MAX_GUESSES = 5;
  let differenceSum = 0;
  let differenceLogSum = 0;
  const maxDifferencePerChannel = 64;
  const maxTotalDifference = maxDifferencePerChannel * 3 * MAX_GUESSES;
  const logBase = Math.log(64);
  const maxTotalLogDifference = MAX_GUESSES * logBase;

  const {
    red: targetRed,
    green: targetGreen,
    blue: targetBlue,
  } = getRGB(target);

  guesses.forEach((guess) => {
    const { red, green, blue } = getRGB(guess);

    const localDiffSum =
      Math.abs(targetRed - red) +
      Math.abs(targetGreen - green) +
      Math.abs(targetBlue - blue);
    differenceSum += localDiffSum;
    differenceLogSum +=
      localDiffSum !== 0 ? Math.log(localDiffSum * localDiffSum) / logBase : 0;
  });

  const closenessScore = Math.max(
    ((maxTotalDifference - differenceSum) / maxTotalDifference) * 60,
    0
  );
  const closenessLogScore = Math.max(
    ((maxTotalLogDifference - differenceLogSum) / maxTotalLogDifference) * 30,
    0
  );

  const guessesScore = ((MAX_GUESSES - guesses.length + 1) / MAX_GUESSES) * 10;

  const finalScore =
    Math.floor(closenessScore) +
    Math.floor(closenessLogScore) +
    Math.floor(guessesScore);

  return Math.round(finalScore) + "%";
}
