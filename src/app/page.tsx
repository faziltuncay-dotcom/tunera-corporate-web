import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("tr", "home");

export default function RootPage() {
  return <HomePage locale="tr" />;
}
