// For Hansies :^) 
import seedrandom from "seedrandom";

/*
    Function to generate a random number based on the current date
    This is a pseudo-random function that generated a number between (0 and n].
    Normally you'd have to generate a new target every day and store that in a database
    but this makes it so everyone has the same random target every day,
    while needing no server :>
*/

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
  const maxDifferencePerChannel = guesses[0].length === 3 ? 15 : 255; // Mini check
  const maxTotalDifference = maxDifferencePerChannel * 3 * MAX_GUESSES;
  const logBase = Math.log(10);
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

  const closenessScore =
    (maxTotalDifference - differenceSum) / maxTotalDifference;

  const closenessLogScore =
    (maxTotalLogDifference - differenceLogSum) / maxTotalLogDifference;

  const guessesScore =
    Math.min(MAX_GUESSES - guesses.length + 2, 5) / MAX_GUESSES;

  console.log({ closenessScore, closenessLogScore, guessesScore });

  const finalScore =
    Math.floor(closenessScore * 60) +
    Math.floor(closenessLogScore * 30) +
    Math.floor(guessesScore * 10);

  return Math.round(finalScore) + "%";
}
