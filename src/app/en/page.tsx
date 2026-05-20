import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { TuneraEntryGate } from "@/components/entry/TuneraEntryGate";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata("en", "home");

export default function EnHome() {
  return (
    <>
      <HomePage locale="en" />
      <TuneraEntryGate locale="en" />
    </>
  );
}
