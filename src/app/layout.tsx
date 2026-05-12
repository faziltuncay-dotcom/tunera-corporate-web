import type { Metadata } from "next";
import "./globals.css";
import { tr } from "@/content/site";
import { launch } from "@/config/launch";
import { AnalyticsPageView } from "@/components/analytics/AnalyticsPageView";
import { AnalyticsConsentBanner } from "@/components/analytics/AnalyticsConsentBanner";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";

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
      <body className="min-h-screen bg-tunera-ivory text-tunera-ink antialiased">
        {children}
        <AnalyticsPageView />
        <SectionViewTracker />
        <ScrollDepthTracker />
        <AnalyticsConsentBanner />
      </body>
    </html>
  );
}
