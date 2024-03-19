import "./globals.css";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "./lib/registry";
import AntRegistry from "./lib/AntRegistry";
import { GoogleAnalytics } from "@next/third-parties/google";

const GTM_ID = "G-1J0E738QRV";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hexcodle - The Daily Hexcode Guessing Game!",
  description:
    "Can you guess today's hexcode color? Challenge your color instincts and decode the hexcode with Hexcodle! Inspired by Wordle, but for color enthusiasts.",
  metadataBase: new URL("https://hexcodle.com"),
  keywords: [
    "hex",
    "hexcode",
    "color",
    "colour",
    "guessing game",
    "daily challenge",
    "daily game",
    "wordle",
    "puzzle",
    "code",
    "design",
  ],
  authors: [
    { name: "Ekim Karabey", url: "https://ekimerton.github.io/" },
    { name: "Hannah Larsen", url: "https://hannah-larsen.github.io/" },
  ],
  generator: "Next.js",
  applicationName: "Hexcodle",
  openGraph: {
    title: "Hexcodle - The Daily Hexcode Guessing Game!",
    description:
      "Can you guess today's hexcode color? Challenge your color instincts and decode the hexcode with Hexcodle! Inspired by Wordle, but for color enthusiasts.",
    url: "https://hexcodle.com",
    siteName: "Hexcodle",
    images: [
      {
        url: "https://www.hexcodle.com/hexcodle_og2.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#f8fafc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <AntRegistry>
            {children}
            <GoogleAnalytics gaId={GTM_ID} />
          </AntRegistry>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
