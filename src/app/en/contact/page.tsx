import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata("en", "contact");

export default function EnContact() {
  return <ContactPage locale="en" />;
}
