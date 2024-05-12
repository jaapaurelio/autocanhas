import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Footer from "components/Footer";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import logo from "public/images/logo-share.webp";
import { Metadata } from "next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const stmIcon = localFont({
  src: "../../public/stm-icon.ttf",
  variable: "--font-stm",
});

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS

// Layout is a Server Component by default
interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <html lang="pt" className={`${inter.variable} ${stmIcon.variable}`}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/meta/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/meta/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/meta/favicon-16x16.png"
        />
        <link rel="manifest" href="/meta/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/meta/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width" />
        <meta name="twitter:card" content="summary" />
      </head>
      <body>
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Auto Canhas Stand Automóvel",
  description:
    "Auto Canhas Stand Automóvel garante a qualiade e o melhor preço em todos os seu veículos.",
  openGraph: {
    images: `https://www.autocanhas.com${logo.src}`,
  },
};
