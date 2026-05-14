import type { Metadata } from "next";
import { BrandPage } from "@/components/BrandPage";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata("tr", "brands");

export default function TrMarkalar() {
  return <BrandPage locale="tr" />;
}
