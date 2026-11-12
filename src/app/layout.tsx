import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sankalp 2027 — UPSC CSE Prep OS",
  description:
    "Syllabus-rooted daily tracker, source-cited PYQ MCQ widget, and 1-3-7-21 Error Registry for UPSC CSE 2027.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF8F4] text-[#161B22] antialiased">{children}</body>
    </html>
  );
}
