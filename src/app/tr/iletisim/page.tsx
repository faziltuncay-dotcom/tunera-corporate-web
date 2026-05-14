import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata("tr", "contact");

export default function TrIletisim() {
  return <ContactPage locale="tr" />;
}
