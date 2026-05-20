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

/**
 * Pre-paint flag for the Tunera entry gate.
 *
 * Reads `sessionStorage.tunera-entry-dismissed` before the body
 * renders and writes either `visible` or `dismissed` to
 * `html[data-tunera-gate]`. The matching CSS in `globals.css`
 * toggles the gate's visibility from that single attribute, so a
 * returning visitor never sees a one-frame flash of the overlay and
 * a fresh visitor never sees a flash of the homepage behind a still-
 * checking gate. The `<TuneraEntryGate>` client component then takes
 * over the same attribute on hydration for click-driven dismissal.
 */
const ENTRY_GATE_PREPAINT = `(function(){try{var d=document.documentElement;d.setAttribute("data-tunera-gate",window.sessionStorage.getItem("tunera-entry-dismissed")==="1"?"dismissed":"visible")}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <head>
        <script dangerouslySetInnerHTML={{ __html: ENTRY_GATE_PREPAINT }} />
      </head>
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
