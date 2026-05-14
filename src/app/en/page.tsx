import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata("en", "home");

export default function EnHome() {
  return <HomePage locale="en" />;
}
