import type { Metadata } from "next";
import "./globals.css";
import { AnalyticsPageView } from "@/components/analytics/AnalyticsPageView";
import { AnalyticsConsentBanner } from "@/components/analytics/AnalyticsConsentBanner";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { SectionViewTracker } from "@/components/analytics/SectionViewTracker";
import { siteRootMetadata } from "@/lib/seo/metadata";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/structured-data";
import { JsonLd } from "@/lib/seo/JsonLd";

export const metadata: Metadata = siteRootMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-tunera-ivory text-tunera-ink antialiased">
        {children}
        <AnalyticsPageView />
        <SectionViewTracker />
        <ScrollDepthTracker />
        <AnalyticsConsentBanner />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
