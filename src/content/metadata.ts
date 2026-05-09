import type { Metadata } from "next";
import { copy, type Locale } from "@/content/site";

type PageKey = "home" | "brands" | "contact";

export function pageMetadata(locale: Locale, page: PageKey = "home"): Metadata {
  const t = copy(locale);
  const segment = page === "brands" ? t.nav.brands : page === "contact" ? t.nav.contact : null;
  const title = segment ? `${segment} | ${t.meta.title}` : t.meta.title;
  return {
    title,
    description: t.meta.description,
  };
}
