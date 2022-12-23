import React from "react";
import Logo from "ui/Logo";
import SearchBar from "ui/SearchBar";

import "./globals.css";

// Layout is a Server Component by default
interface Props {
  children: React.ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <nav>
        <Logo />
        <SearchBar />
      </nav>
      <main>{children}</main>
    </>
  );
}
