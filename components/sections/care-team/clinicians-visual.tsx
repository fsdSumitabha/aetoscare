import { Languages, PhoneCall, Stethoscope } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const r2 = (n: number) => Math.round(n * 100) / 100;

/** 24 hour ticks around the shift ring (major tick every 6 hours). */
const HOUR_TICKS = Array.from({ length: 24 }, (_, hour) => {
  const angle = (hour / 24) * Math.PI * 2;
  const major = hour % 6 === 0;
  const inner = major ? 49 : 52.5;
  const outer = 56;
  return {
    hour,
    major,
    x1: r2(60 + inner * Math.sin(angle)),
    y1: r2(60 - inner * Math.cos(angle)),
    x2: r2(60 + outer * Math.sin(angle)),
    y2: r2(60 - outer * Math.cos(angle)),
  };
});

/** Three 8-hour shifts as dashes on a pathLength-100 circle. */
const SHIFTS = [
  { offset: 0, className: "stroke-brand-400" },
  { offset: -33.333, className: "stroke-vital-300" },
  { offset: -66.667, className: "stroke-brand-200" },
] as const;

/** Four heartbeats across a 400-unit strip (each beat cycle is 100 units wide). */
const ECG_PATH = `M0 28${" h28 l5 -5 l5 5 h6 l4 -22 l5 34 l5 -16 l4 4 h38".repeat(4)}`;

/** Illustrative overnight activity, showing round-the-clock coverage. */
const FEED = [
  { icon: PhoneCall, label: "Patient call · BP", time: "02:14", tone: "bg-pulse-500/15 text-pulse-300" },
  { icon: Stethoscope, label: "Provider escalation", time: "02:31", tone: "bg-vital-300/15 text-vital-300" },
] as const;

/** Stacked left-over-right (descending z) so each online dot sits above the next avatar. */
const AVATARS = [
  { initials: "RN", className: "z-30 bg-linear-to-br from-brand-400 to-brand-700 text-white", online: true },
  { initials: "MA", className: "z-20 bg-linear-to-br from-vital-200 to-vital-500 text-ink-950", online: true },
  { initials: "RN", className: "z-10 bg-linear-to-br from-ink-400 to-ink-600 text-white", online: false },
] as const;

/** Round-the-clock ring: three shifts, hour ticks and an orbiting sweep dot. */
function ShiftRing({ className }: { className?: string }) {
  return (
    <div className={cn("relative shrink-0", className)}>
      <svg viewBox="0 0 120 120" fill="none" focusable="false" className="size-full">
        <circle cx="60" cy="60" r="42" className="stroke-white/10" strokeWidth="8" />
        <g transform="rotate(-90 60 60)">
          {SHIFTS.map((shift) => (
            <circle
              key={shift.offset}
              cx="60"
              cy="60"
              r="42"
              pathLength={100}
              strokeDasharray="31.33 68.67"
              strokeDashoffset={shift.offset}
              strokeWidth="8"
              className={shift.className}
            />
          ))}
        </g>
        {HOUR_TICKS.map((tick) => (
          <line
            key={tick.hour}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            strokeWidth={tick.major ? 1.6 : 1}
            strokeLinecap="round"
            className={tick.major ? "stroke-white/60" : "stroke-white/25"}
          />
        ))}
        <g className="origin-center animate-spin-slow">
          <circle cx="60" cy="18" r="4.5" className="fill-white" />
          <circle cx="60" cy="18" r="8" className="fill-vital-300/25" />
        </g>
      </svg>
      <span className="absolute inset-0 grid place-items-center text-center">
        <span>
          <span className="block font-mono text-lg leading-none font-semibold text-white sm:text-xl">24h</span>
          <span className="mt-1 block font-mono text-[0.55rem] tracking-[0.16em] text-ink-300 uppercase">on duty</span>
        </span>
      </span>
    </div>
  );
}

/**
 * Decorative portrait of the clinical team: live duty pill, bilingual chips,
 * role avatars, an overnight activity feed, a 24-hour shift ring and a
 * running ECG trace.
 */
export function CliniciansVisual({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate flex flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-ink-950/60 p-5 ring-1 ring-white/10 sm:p-6",
        className,
      )}
    >
      <div className="absolute inset-0 -z-10 bg-dot-grid-dark mask-fade-y" />
      <div className="absolute -top-16 -right-10 -z-10 size-56 rounded-full bg-vital-400/15 blur-3xl" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-vital-300/10 px-3 py-1.5 font-mono text-[0.68rem] font-medium tracking-[0.12em] text-vital-200 uppercase ring-1 ring-vital-300/25">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping-slow rounded-full bg-vital-300" />
            <span className="relative size-2 rounded-full bg-vital-300" />
          </span>
          On duty 24/7
        </span>
        <span className="flex items-center gap-2 text-ink-300">
          {/* Icon drops below sm so the duty pill and language chips share one row at 360px. */}
          <Languages className="hidden size-4 sm:block" strokeWidth={2} />
          <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[0.68rem] font-semibold tracking-[0.1em] text-white ring-1 ring-white/15">
            EN
          </span>
          <span className="font-mono text-xs text-ink-400">/</span>
          <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[0.68rem] font-semibold tracking-[0.1em] text-white ring-1 ring-white/15">
            ES
          </span>
        </span>
      </div>

      <div className="flex items-center justify-between gap-5">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex items-center">
            {AVATARS.map((avatar, i) => (
              <span
                key={i}
                className={cn(
                  "relative grid size-10 shrink-0 place-items-center rounded-full font-mono text-[0.68rem] font-semibold ring-3 ring-ink-900 sm:size-11",
                  i > 0 && "-ml-2",
                  avatar.className,
                )}
              >
                {avatar.initials}
                {avatar.online ? (
                  <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full bg-vital-300 ring-2 ring-ink-900" />
                ) : null}
              </span>
            ))}
            <span className="-ml-2 hidden size-11 shrink-0 place-items-center rounded-full bg-white/10 font-mono text-sm text-white ring-3 ring-ink-900 sm:grid">
              +
            </span>
          </div>

          <ul className="hidden flex-col gap-2 sm:flex">
            {FEED.map((item) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-xl bg-white/4 px-2.5 py-2 ring-1 ring-white/5"
                >
                  <span className={cn("grid size-6 shrink-0 place-items-center rounded-md", item.tone)}>
                    <Icon className="size-3.5" strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-xs text-ink-100">{item.label}</span>
                  <span className="font-mono text-[0.62rem] text-ink-300 tabular-nums">{item.time}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <ShiftRing className="size-24 sm:size-36 lg:size-28 xl:size-36" />
      </div>

      <svg viewBox="0 0 400 44" fill="none" focusable="false" className="h-auto w-full">
        <path
          d={ECG_PATH}
          className="stroke-white/10"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d={ECG_PATH}
          pathLength={1}
          strokeDasharray="1"
          className="animate-ecg stroke-vital-300"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
