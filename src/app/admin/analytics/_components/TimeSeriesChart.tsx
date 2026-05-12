import type { DailySeriesPoint } from "@/lib/analytics/types";

type Props = {
  data: DailySeriesPoint[];
  emptyLabel: string;
};

const WIDTH = 720;
const HEIGHT = 220;
const PADDING_X = 28;
const PADDING_TOP = 18;
const PADDING_BOTTOM = 32;

/**
 * Tiny dependency-free SVG line chart for daily page views and
 * visitors over the last N days.
 *
 * The chart is two overlaid polylines (page views = orange, visitors =
 * graphite) drawn from a normalised value axis. Each y-tick is labelled
 * with the raw count; every other x-tick is labelled with the day
 * shortened to MM-DD so 14-day strips stay readable without
 * sticky tooltips. Zero data renders an empty-state panel instead of
 * inventing a flat line.
 */
export function TimeSeriesChart({ data, emptyLabel }: Props) {
  if (data.length === 0) {
    return (
      <section className="rounded-md border border-tunera-stone/60 bg-white p-5">
        <header className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
          <span aria-hidden className="h-px w-6 bg-tunera-orange" />
          <span>Daily trend</span>
        </header>
        <p className="text-sm text-tunera-muted-ink">{emptyLabel}</p>
      </section>
    );
  }

  const max = Math.max(
    1,
    data.reduce((acc, d) => Math.max(acc, d.pageViews, d.visitors), 0),
  );
  const innerW = WIDTH - PADDING_X * 2;
  const innerH = HEIGHT - PADDING_TOP - PADDING_BOTTOM;
  const stepX = data.length > 1 ? innerW / (data.length - 1) : 0;
  const yFor = (v: number) => PADDING_TOP + innerH - (v / max) * innerH;
  const xFor = (i: number) => PADDING_X + stepX * i;

  const path = (values: number[]) =>
    values.map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(v)}`).join(" ");

  return (
    <section className="rounded-md border border-tunera-stone/60 bg-white p-5">
      <header className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
        <span aria-hidden className="h-px w-6 bg-tunera-orange" />
        <span>Daily trend</span>
        <span className="ml-3 text-tunera-muted-ink">
          <span className="inline-block h-2 w-2 align-middle bg-tunera-orange" /> page views{" "}
          <span className="ml-3 inline-block h-2 w-2 align-middle bg-tunera-graphite" /> visitors
        </span>
      </header>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Daily page views and visitors"
        className="block h-auto w-full"
      >
        {/* y baseline + zero rule */}
        <line
          x1={PADDING_X}
          x2={WIDTH - PADDING_X}
          y1={yFor(0)}
          y2={yFor(0)}
          stroke="#D8CDC4"
          strokeWidth={1}
        />
        {/* max-value label */}
        <text
          x={PADDING_X}
          y={PADDING_TOP - 6}
          fill="#5F5652"
          fontSize={10}
          fontFamily="ui-sans-serif"
        >
          {max.toLocaleString("tr-TR")}
        </text>
        <text
          x={PADDING_X}
          y={yFor(0) + 12}
          fill="#5F5652"
          fontSize={10}
          fontFamily="ui-sans-serif"
        >
          0
        </text>
        {/* polylines */}
        <path
          d={path(data.map((d) => d.pageViews))}
          fill="none"
          stroke="#FF4D00"
          strokeWidth={1.75}
        />
        <path
          d={path(data.map((d) => d.visitors))}
          fill="none"
          stroke="#231F20"
          strokeWidth={1.5}
          strokeOpacity={0.65}
        />
        {/* x-axis labels (every other point to avoid crowding) */}
        {data.map((d, i) => {
          if (data.length > 12 && i % 2 !== 0) return null;
          return (
            <text
              key={d.day}
              x={xFor(i)}
              y={HEIGHT - PADDING_BOTTOM + 16}
              fill="#5F5652"
              fontSize={10}
              textAnchor="middle"
              fontFamily="ui-sans-serif"
            >
              {d.day.slice(5)}
            </text>
          );
        })}
      </svg>
    </section>
  );
}
