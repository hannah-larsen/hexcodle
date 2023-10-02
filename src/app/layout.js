import "./globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";

const GTM_ID = "G-1J0E738QRV";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hexcodle: Daily Hex Code Challenge",
  description:
    "Can you guess today's hex color? Challenge your color instincts and decode the hex with Hexcodle! Inspired by Wordle, but for color enthusiasts.",
  keywords:
    "hex, hexcode, color, guessing game, daily challenge, wordle, puzzle, code",
  //og_image: "/path_to_your_og_image.png",
  //twitter_card: "summary_large_image",
  //twitter_image: "/path_to_your_twitter_image.png"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script id="google-tag-manager" strategy="worker">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400..700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
