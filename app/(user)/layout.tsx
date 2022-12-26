import React from "react";
import { config } from "@fortawesome/fontawesome-svg-core";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "./globals.css";
import { Footer } from "components/Footer";

config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS

// Layout is a Server Component by default
interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <html>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
