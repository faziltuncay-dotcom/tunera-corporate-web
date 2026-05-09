import type { Metadata } from "next";
import { BrandsPage } from "@/components/BrandsPage";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("en", "brands");

export default function EnBrands() {
  return <BrandsPage locale="en" />;
}
