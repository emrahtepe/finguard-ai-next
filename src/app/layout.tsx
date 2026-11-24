import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinGuard AI — Real-Time FinTech Transaction & Risk Analyzer",
  description:
    "AI-assisted FinTech compliance dashboard built with Next.js App Router, TypeScript, Zod, Gemini API, CSP headers, and prompt-injection guardrails.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
