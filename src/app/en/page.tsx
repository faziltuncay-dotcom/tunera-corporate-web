import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { en } from "@/content/site";

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
};

export default function EnHome() {
  return <HomePage locale="en" />;
}
