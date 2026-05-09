import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("en", "contact");

export default function EnContact() {
  return <ContactPage locale="en" />;
}
