import { formatIstanbulDateTime } from "@/lib/analytics/format";

type Props = {
  databaseConfigured: boolean;
  saltConfigured: boolean;
  lastEventAt: string | null;
};

const Pill = ({ ok, label }: { ok: boolean; label: string }) => (
  <span
    className={
      "inline-flex items-center gap-2 rounded-sm border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] " +
      (ok
        ? "border-tunera-orange/30 bg-tunera-orange/5 text-tunera-orange"
        : "border-tunera-ink/15 text-tunera-muted-ink")
    }
  >
    <span
      aria-hidden
      className={
        "inline-block h-1.5 w-1.5 rounded-full " +
        (ok ? "bg-tunera-orange" : "bg-tunera-muted-ink/55")
      }
    />
    {label}
  </span>
);

/**
 * Admin-only diagnostics strip.
 *
 * Surfaces the operational state the dashboard depends on so the
 * Tunera operator can confirm at a glance whether storage is wired
 * up and events are arriving — without ever revealing the
 * `DATABASE_URL`, the `ANALYTICS_SALT` or the admin password. The
 * values shown are limited to:
 *
 *   - storage mode  (active / no-op)
 *   - id hashing    (configured / disabled)
 *   - admin route   (always "protected" once this page renders;
 *                    the middleware would have refused otherwise)
 *   - last event    (timestamp only, or "—" when no events yet)
 */
export function StatusBlock({ databaseConfigured, saltConfigured, lastEventAt }: Props) {
  const storageMode = databaseConfigured ? "active" : "no-op";
  return (
    <section
      aria-label="Analytics diagnostics"
      className="rounded-md border border-tunera-stone/60 bg-white px-5 py-4 sm:px-6"
    >
      <header className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
        <span aria-hidden className="h-px w-6 bg-tunera-orange" />
        <span>Diagnostics</span>
      </header>
      <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="text-[10px] uppercase tracking-[0.2em] text-tunera-muted-ink">
            Storage mode
          </dt>
          <dd className="mt-1.5">
            <Pill ok={databaseConfigured} label={storageMode} />
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.2em] text-tunera-muted-ink">
            Visitor id hashing
          </dt>
          <dd className="mt-1.5">
            <Pill ok={saltConfigured} label={saltConfigured ? "configured" : "disabled"} />
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.2em] text-tunera-muted-ink">
            Admin route
          </dt>
          <dd className="mt-1.5">
            <Pill ok label="protected" />
          </dd>
        </div>
        <div>
          <dt className="text-[10px] uppercase tracking-[0.2em] text-tunera-muted-ink">
            Last event
          </dt>
          <dd className="mt-1.5 text-tunera-ink tabular-nums">
            {formatIstanbulDateTime(lastEventAt)}
          </dd>
        </div>
      </dl>
    </section>
  );
}
