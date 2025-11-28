import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Meme Miner - Don't Stop Now",
  description: "The diamonds are closer than you think. Keep digging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}

