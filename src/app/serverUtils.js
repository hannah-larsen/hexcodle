import { revalidateTag } from "next/cache";

export async function getColorName(hex) {
    const cleanHex = hex.replace("#", "");
    const tag = `color-name-${cleanHex}`;
    try {
        const response = await fetch(
            `https://api.color.pizza/v1/${cleanHex}`,
            {
                cache: "force-cache",
                next: { tags: [tag] },
                headers: {
                    "X-Referrer": "hexcodle"
                }
            }
        );
        if (!response.ok) {
            revalidateTag(tag);
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
