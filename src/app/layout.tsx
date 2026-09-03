import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Johnson Bolhayon - Data Automation Engineer",
  description:
    "Portfolio of Johnson Bolhayon: from Excel VBA and Google Apps Script to full-stack internal platforms on Next.js, Supabase and Google Cloud.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
