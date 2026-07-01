import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hello v0",
  description: "A minimal hello world app built on the v0-style stack."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
