import type { Metadata } from "next";
import { BrandPage } from "@/components/BrandPage";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("tr", "brands");

export default function TrMarkalar() {
  return <BrandPage locale="tr" />;
}
