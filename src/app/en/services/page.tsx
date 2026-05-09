import type { Metadata } from "next";
import { ServicesPage } from "@/components/ServicesPage";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("en", "services");

export default function EnServices() {
  return <ServicesPage locale="en" />;
}
