/**
 * Tunera entry-gate dismissal flag.
 *
 * Stored in `sessionStorage` (not `localStorage`) so the premium entry
 * experience returns whenever the user opens a fresh browsing session,
 * but does not re-trigger on every internal navigation within the same
 * tab. The matching pre-paint inline script in `app/layout.tsx` reads
 * the same key to set an html-level attribute and avoid a one-frame
 * flash on return visits.
 */
export const ENTRY_GATE_STORAGE_KEY = "tunera-entry-dismissed";
export const ENTRY_GATE_DOM_ATTR = "data-tunera-gate";
