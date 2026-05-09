import type { Metadata } from "next";
import { BrandsPage } from "@/components/BrandsPage";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("tr", "brands");

export default function MarkalarRoot() {
  return <BrandsPage locale="tr" />;
}
