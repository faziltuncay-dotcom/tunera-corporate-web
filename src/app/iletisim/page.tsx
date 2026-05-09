import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("tr", "contact");

export default function IletisimRoot() {
  return <ContactPage locale="tr" />;
}
