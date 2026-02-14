import fs from "fs";
import path from "path";

const COLORS_FILE = path.join(process.cwd(), "src/lib/colors.json");
const MINI_COLORS_FILE = path.join(process.cwd(), "src/lib/mini-colors.json");

function getFilePath(isMini) {
    return isMini ? MINI_COLORS_FILE : COLORS_FILE;
}

function readLocalColors(isMini) {
    const filePath = getFilePath(isMini);
    try {
        if (!fs.existsSync(filePath)) {
            return {};
        }
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (e) {
        console.error(`Error reading ${isMini ? "mini " : ""}colors file:`, e);
        return {};
    }
}

function writeLocalColor(hex, name, isMini) {
    // Only write in development. Vercel filesystem is read-only.
    if (process.env.NODE_ENV === "development") {
        const filePath = getFilePath(isMini);
        try {
            const colors = readLocalColors(isMini);
            colors[hex.toLowerCase()] = name;
            fs.writeFileSync(filePath, JSON.stringify(colors, null, 2));
        } catch (e) {
            console.error(`Error writing ${isMini ? "mini " : ""}colors file:`, e);
        }
    }
}

export async function getColorName(hex) {
    const cleanHex = hex.replace("#", "").toLowerCase();
    const isMini = cleanHex.length === 3;

    // 1. Check Local JSON first
    const localColors = readLocalColors(isMini);
    if (localColors[cleanHex]) {
        if (localColors[cleanHex] !== "Error" && localColors[cleanHex] !== "Unknown Color") {
            return localColors[cleanHex];
        }
    }

    return fetchFromAPI(cleanHex, isMini);
}

async function fetchFromAPI(cleanHex, isMini) {
    try {
        const response = await fetch(
            `https://api.color.pizza/v1/${cleanHex}`,
            {
                headers: {
                    "X-Referrer": "hexcodle",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.colors && data.colors.length > 0) {
            const colorName = data.colors[0].name;

            // Save locally if in dev so we can commit it to Git
            writeLocalColor(cleanHex, colorName, isMini);

            return colorName;
        }
        return "Unknown Color";
    } catch (error) {
        console.error("Error fetching color name:", error);
        return "Error";
    }
}




