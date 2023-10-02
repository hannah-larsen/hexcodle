import "./globals.css";
import Script from "next/script";
import { Inter } from "next/font/google";

const GTM_ID = "G-1J0E738QRV";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hexcodle",
  description: "A fun daily guessing game for hex codes!",
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
