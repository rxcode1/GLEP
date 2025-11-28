import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Meme Miner - Don't Stop Now",
  description: "The diamonds are closer than you think. Keep digging.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

