import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { TuneraEntryGate } from "@/components/entry/TuneraEntryGate";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata("tr", "home");

export default function TrHome() {
  return (
    <>
      <HomePage locale="tr" />
      <TuneraEntryGate locale="tr" />
    </>
  );
}
