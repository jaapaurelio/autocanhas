import React from "react";

import "../globals.css";

// Layout is a Server Component by default
interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
