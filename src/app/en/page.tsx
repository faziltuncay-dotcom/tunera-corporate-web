import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { pageMetadata } from "@/content/metadata";

export const metadata: Metadata = pageMetadata("en", "home");

export default function EnHome() {
  return <HomePage locale="en" />;
}
