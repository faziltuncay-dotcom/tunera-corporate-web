import type { Metadata } from "next";
import { ServicesPage } from "@/components/ServicesPage";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("tr", "services");

export default function HizmetlerRoot() {
  return <ServicesPage locale="tr" />;
}
