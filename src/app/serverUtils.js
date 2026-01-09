import { unstable_cache } from "next/cache";

const getCachedColorName = unstable_cache(
    async (hex) => {
        const cleanHex = hex.replace("#", "");
        const response = await fetch(
            `https://api.color.pizza/v1/${cleanHex}`,
            {
                cache: "force-cache",
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
            return data.colors[0].name;
        }
        return "Unknown Color";
    },
    ["color-name"],
    { revalidate: false }
);

export async function getColorName(hex) {
    try {
        return await getCachedColorName(hex);
    } catch (error) {
        return "Error";
    }
}
