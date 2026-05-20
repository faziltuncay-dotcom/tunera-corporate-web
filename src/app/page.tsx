import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { TuneraEntryGate } from "@/components/entry/TuneraEntryGate";
import { buildRootIndexMetadata } from "@/lib/seo/metadata";

// `/` renders the TR home identically to `/tr` and forces canonical
// to `/tr` so search engines consolidate the duplicate URL.
export const metadata: Metadata = buildRootIndexMetadata();

export default function RootPage() {
  return (
    <>
      <HomePage locale="tr" />
      <TuneraEntryGate locale="tr" />
    </>
  );
}
