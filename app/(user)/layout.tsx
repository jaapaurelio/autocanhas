import React from "react";
import Logo from "../../components/Logo";
import SearchBar from "../../components/SearchBar";

import "../globals.css";

// Layout is a Server Component by default
interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <html>
      <body>
        <nav>
          <Logo />
          <SearchBar />
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
