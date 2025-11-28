import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Meme Miner - Don't Stop Now",
  description: "The diamonds are closer than you think. Keep digging.",
  icons: {
    icon: [
      { url: "/favicon.jpg", type: "image/jpeg" },
      { url: "/icon.jpg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.jpg",
    apple: "/favicon.jpg",
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
        <link rel="icon" href="/favicon.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="/favicon.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/favicon.jpg" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

