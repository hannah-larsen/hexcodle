import "./globals.css";
import { Inter, Lora } from "next/font/google";
import StyledComponentsRegistry from "./lib/registry";
import { GoogleAnalytics } from "@next/third-parties/google";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const GTM_ID = "G-1J0E738QRV";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

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

export default async function RootLayout(props) {
  const params = await props.params;

  const {
    children
  } = props;

  const pathname = params?.slug ? `/${params.slug.join("/")}` : "/";

  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className={`${inter.className} bg-cream-50`}>
        <StyledComponentsRegistry>
          <GoogleAnalytics gaId={GTM_ID} />
          <Navbar pathname={pathname} />
          <main className="pt-20 min-h-screen">
            {children}
          </main>
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
