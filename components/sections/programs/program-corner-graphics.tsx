import { CalendarHeart, Heart, PhoneCall } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/** Single ECG complex on a 280×120 canvas, baseline at y=70. */
const ECG_PATH =
  "M0 70H92l6-8 6 8h18l5 10 9-56 9 66 6-20h27l9-10 9 10h84";

/**
 * RPM corner: a live ECG trace drawing over a faded dot grid.
 * Decorative; positioned in the card's top-right corner.
 */
export function RpmCornerGraphic() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 right-0 h-28 w-40 sm:h-44 sm:w-72"
    >
      <div className="absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_72%)]" />
      <svg
        viewBox="0 0 280 120"
        preserveAspectRatio="xMaxYMid meet"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-x-0 top-5 h-20 w-full [mask-image:linear-gradient(to_left,black_55%,transparent)] sm:top-14 sm:h-24"
      >
        <defs>
          <linearGradient id="prog-rpm-ecg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" className="[stop-color:var(--color-brand-500)]" stopOpacity="0" />
            <stop offset="0.4" className="[stop-color:var(--color-brand-500)]" />
            <stop offset="1" className="[stop-color:var(--color-vital-400)]" />
          </linearGradient>
        </defs>
        <path d={ECG_PATH} className="stroke-brand-100" strokeWidth="2" strokeLinejoin="round" />
        <path
          d={ECG_PATH}
          stroke="url(#prog-rpm-ecg)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          className="animate-ecg"
        />
      </svg>
      <span className="absolute top-6 right-8 hidden items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[0.625rem] font-medium text-ink-600 shadow-soft ring-1 ring-ink-100 sm:inline-flex">
        <span className="relative inline-flex size-1.5">
          <span className="absolute inset-0 animate-ping-slow rounded-full bg-vital-400 opacity-75" />
          <span className="relative inline-flex size-full rounded-full bg-vital-500" />
        </span>
        Live · 4G
      </span>
    </div>
  );
}

const calendarDays = Array.from({ length: 28 }, (_, index) => index);
const CALL_DAY = 9;
const supportDays: ReadonlySet<number> = new Set([3, 15, 20, 24]);

/**
 * CCM corner: a care-plan month with the monthly RN call (heart) and
 * support touchpoints, plus a floating nurse-call chip. Decorative.
 */
export function CcmCornerGraphic() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-5 right-5 w-24 rotate-3 sm:top-8 sm:right-8 sm:w-40"
    >
      <div className="rounded-xl bg-white p-2.5 shadow-lift ring-1 ring-ink-100 sm:rounded-2xl sm:p-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-[0.5rem] font-medium tracking-[0.14em] text-ink-500 uppercase sm:text-[0.6rem]">
            Care plan
          </span>
          <CalendarHeart
            aria-hidden="true"
            className="size-3 text-vital-600 sm:size-3.5"
            strokeWidth={2}
          />
        </div>
        <div className="mt-2 grid grid-cols-7 gap-0.5 sm:mt-3 sm:gap-1">
          {calendarDays.map((day) => (
            <span
              key={day}
              className={cn(
                "flex aspect-square items-center justify-center rounded-[3px] sm:rounded",
                day === CALL_DAY
                  ? "bg-vital-500 text-white ring-2 ring-vital-200"
                  : supportDays.has(day)
                    ? "bg-vital-100"
                    : "bg-ink-100/70",
              )}
            >
              {day === CALL_DAY ? (
                <Heart
                  aria-hidden="true"
                  className="size-1.5 fill-current sm:size-2.5"
                  strokeWidth={0}
                />
              ) : null}
            </span>
          ))}
        </div>
      </div>

      <span className="absolute -top-4 -left-10 hidden -rotate-3 sm:block">
        <span className="inline-flex animate-float items-center gap-1.5 rounded-full bg-ink-950 py-1 pr-3 pl-1 text-[0.68rem] font-medium whitespace-nowrap text-white shadow-lift">
          <span className="flex size-6 items-center justify-center rounded-full bg-vital-300 text-ink-950">
            <PhoneCall aria-hidden="true" className="size-3" strokeWidth={2.5} />
          </span>
          RN call
        </span>
      </span>
    </div>
  );
}
