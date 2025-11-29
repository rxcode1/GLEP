import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clout Glasses - Add Clout to Your Memes",
  description: "The ultimate meme generator. Add clout glasses to any image.",
  icons: {
    icon: "/glasses.png",
    apple: "/glasses.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/glasses.png" type="image/png" />
        <link rel="apple-touch-icon" href="/glasses.png" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

