import React from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Footer from "components/Footer";
import { Inter } from "@next/font/google";
import localFont from "@next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const stmIcon = localFont({
  src: "./stm-icon.ttf",
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
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
