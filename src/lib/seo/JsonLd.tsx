import type { JsonLdValue } from "./structured-data";

/**
 * Server component that emits one or more Schema.org JSON-LD
 * blocks. Pass an array to combine multiple types into a single
 * `<script>` tag. The payload is `JSON.stringify`-ed safely; the
 * caller must not pass values that contain `</script` substrings.
 */
export function JsonLd({
  data,
}: {
  data: Record<string, JsonLdValue> | Record<string, JsonLdValue>[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(Array.isArray(data) ? data : [data]),
      }}
    />
  );
}
