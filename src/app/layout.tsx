import type { Metadata } from "next";
import "./globals.css";
import { tr } from "@/content/site";
import { launch } from "@/config/launch";

export const metadata: Metadata = {
  title: tr.meta.title,
  description: tr.meta.description,
  robots: launch.allowIndexing
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false },
      },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-navy-950 text-ink-50 antialiased">{children}</body>
    </html>
  );
}
