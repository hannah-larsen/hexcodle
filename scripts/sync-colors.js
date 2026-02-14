const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const seedrandom = require('seedrandom');

const COLORS_FILE = path.join(__dirname, '../src/lib/colors.json');
const MINI_COLORS_FILE = path.join(__dirname, '../src/lib/mini-colors.json');

// --- Helper Logic (Replicated from src/app/utils.js and src/app/timeUtils.js) ---

function generateUniqueNumber(n, offset = 0, customDate = null) {
    const rng = seedrandom(customDate + offset);
    return Math.floor(rng() * (Number(n) + 1));
}

function decimalToHex(n) {
    return n.toString(16);
}

function generateHexcode(num) {
    const startDate = moment.tz("2023-08-10", "America/New_York").startOf("day");
    const targetDate = startDate.clone().add(num, "days");
    const dateStr = targetDate.format("DD-MM-YYYY");

    const r = Math.min(generateUniqueNumber(256, 0, dateStr), 255);
    const g = Math.min(generateUniqueNumber(256, 1, dateStr), 255);
    const b = Math.min(generateUniqueNumber(256, 2, dateStr), 255);

    const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    };

    return `${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`.toLowerCase();
}

function generateMiniHexcode(num) {
    const startDate = moment.tz("2024-03-27", "America/New_York").startOf("day");
    const targetDate = startDate.clone().add(num, "days");
    const dateStr = targetDate.format("DD-MM-YYYY");

    const r = generateUniqueNumber(15, 15, dateStr);
    const g = generateUniqueNumber(15, 16, dateStr);
    const b = generateUniqueNumber(15, 17, dateStr);

    return `${decimalToHex(r)}${decimalToHex(g)}${decimalToHex(b)}`.toLowerCase();
}

// --- Sync Logic ---

async function fetchColorName(hex, label) {
    console.log(`[${label}] Fetching name for #${hex}...`);
    try {
        const response = await fetch(`https://api.color.pizza/v1/${hex}`, {
            headers: { "X-Referrer": "hexcodle-sync-script" }
        });
        if (!response.ok) {
            console.error(`API Error for #${hex}: ${response.status}`);
            return null;
        }
        const data = await response.json();
        if (data && data.colors && data.colors.length > 0) {
            return data.colors[0].name;
        }
    } catch (e) {
        console.error(`Network Error for #${hex}:`, e.message);
    }
    return null;
}

async function sync() {
    let colors = {};
    let miniColors = {};

    if (fs.existsSync(COLORS_FILE)) {
        try {
            colors = JSON.parse(fs.readFileSync(COLORS_FILE, 'utf8'));
        } catch (e) {
            console.error("Error parsing colors.json");
        }
    }

    if (fs.existsSync(MINI_COLORS_FILE)) {
        try {
            miniColors = JSON.parse(fs.readFileSync(MINI_COLORS_FILE, 'utf8'));
        } catch (e) {
            console.error("Error parsing mini-colors.json");
        }
    }

    // --- Cleanup: Move any 3-digit hex from colors to miniColors ---
    let cleaned = false;
    for (const hex in colors) {
        if (hex.length === 3) {
            console.log(`Moving #${hex} from standard to mini cache...`);
            miniColors[hex] = colors[hex];
            delete colors[hex];
            cleaned = true;
        }
    }
    if (cleaned) {
        fs.writeFileSync(COLORS_FILE, JSON.stringify(colors, null, 2));
        fs.writeFileSync(MINI_COLORS_FILE, JSON.stringify(miniColors, null, 2));
    }

    const today = moment().tz("America/New_York");

    const startRegular = moment.tz("2023-08-10", "America/New_York").startOf("day");
    const startMini = moment.tz("2024-03-27", "America/New_York").startOf("day");

    const currentRegular = today.diff(startRegular, "days");
    const currentMini = today.diff(startMini, "days");

    // 1. Regular Game Sync
    console.log("\nChecking Regular Colors (Today + 50 buffer)...");
    let regularNewCount = 0;
    let regularSkipStart = -1;

    for (let i = 0; i <= currentRegular + 50; i++) {
        const hex = generateHexcode(i);
        if (colors[hex] && colors[hex] !== "Error" && colors[hex] !== "Unknown Color") {
            if (regularSkipStart === -1) regularSkipStart = i;
            continue;
        }

        // We found a missing one, log the skipped range first
        if (regularSkipStart !== -1) {
            console.log(`[Regular Day ${regularSkipStart} - ${i - 1}] Already fetched, skipping...`);
            regularSkipStart = -1;
        }

        const name = await fetchColorName(hex, `Regular Day ${i}`);
        if (name) {
            colors[hex] = name;
            regularNewCount++;
            fs.writeFileSync(COLORS_FILE, JSON.stringify(colors, null, 2));
            await new Promise(r => setTimeout(r, 100));
        }
    }
    if (regularSkipStart !== -1) {
        console.log(`[Regular Day ${regularSkipStart} - ${currentRegular + 50}] Already fetched, skipping...`);
    }

    // 2. Mini Game Sync
    console.log("\nChecking Mini Colors (Today + 50 buffer)...");
    let miniNewCount = 0;
    let miniSkipStart = -1;

    for (let i = 0; i <= currentMini + 50; i++) {
        const hex = generateMiniHexcode(i);
        if (miniColors[hex] && miniColors[hex] !== "Error" && miniColors[hex] !== "Unknown Color") {
            if (miniSkipStart === -1) miniSkipStart = i;
            continue;
        }

        // We found a missing one, log the skipped range first
        if (miniSkipStart !== -1) {
            console.log(`[Mini Day ${miniSkipStart} - ${i - 1}] Already fetched, skipping...`);
            miniSkipStart = -1;
        }

        const name = await fetchColorName(hex, `Mini Day ${i}`);
        if (name) {
            miniColors[hex] = name;
            miniNewCount++;
            fs.writeFileSync(MINI_COLORS_FILE, JSON.stringify(miniColors, null, 2));
            await new Promise(r => setTimeout(r, 100));
        }
    }
    if (miniSkipStart !== -1) {
        console.log(`[Mini Day ${miniSkipStart} - ${currentMini + 50}] Already fetched, skipping...`);
    }


    console.log(`\nDONE!`);
    console.log(`Standard: Added ${regularNewCount} colors.`);
    console.log(`Mini: Added ${miniNewCount} colors.`);
}

sync();

