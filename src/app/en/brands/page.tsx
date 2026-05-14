import type { Metadata } from "next";
import { BrandPage } from "@/components/BrandPage";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata("en", "brands");

export default function EnBrands() {
  return <BrandPage locale="en" />;
}
