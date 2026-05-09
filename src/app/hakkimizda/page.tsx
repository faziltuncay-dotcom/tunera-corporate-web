import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("tr", "about");

export default function HakkimizdaRoot() {
  return <AboutPage locale="tr" />;
}
