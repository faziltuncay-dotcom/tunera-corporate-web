import type { Metadata } from "next";
import { AboutPage } from "@/components/AboutPage";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("en", "about");

export default function EnAbout() {
  return <AboutPage locale="en" />;
}
