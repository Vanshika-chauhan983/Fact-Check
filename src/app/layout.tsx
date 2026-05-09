import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Truth Layer | Automated Fact-Checker",
  description: "Cross-reference PDF claims against live web data with AI precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="mesh-gradient" />
        {children}
      </body>
    </html>
  );
}
