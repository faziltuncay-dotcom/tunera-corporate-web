import type { Metadata } from "next";
import { BrandPage } from "@/components/BrandPage";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("en", "brands");

export default function EnBrands() {
  return <BrandPage locale="en" />;
}
