import { cn } from "@/lib/cn";

type LogEntry = {
  time: string;
  activity: string;
  /** Duration in seconds. */
  seconds: number;
};

const entries: readonly LogEntry[] = [
  { time: "09:14", activity: "Patient call", seconds: 372 },
  { time: "09:31", activity: "Reading review", seconds: 160 },
  { time: "10:02", activity: "Care plan update", seconds: 245 },
  { time: "10:47", activity: "Provider alert", seconds: 198 },
];

/** First billable RPM/CCM time block (20 minutes), used as the progress target. */
const TARGET_SECONDS = 20 * 60;

const totalSeconds = entries.reduce((sum, entry) => sum + entry.seconds, 0);
const progress = Math.min(100, (totalSeconds / TARGET_SECONDS) * 100);

function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return `${minutes}m ${rest}s`;
}

/**
 * "Automatic time tracking": a time-stamped audit log with a running total
 * filling toward the first 20-minute billing block. Decorative.
 */
export function TimeVisual() {
  return (
    <div className="relative size-full">
      <div className="absolute inset-0 bg-line-grid opacity-70 mask-fade-y" />

      <div className="relative flex h-full items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-ink-100">
          <div className="flex items-center justify-between gap-3 border-b border-ink-100 px-3.5 py-2.5">
            <span className="font-mono text-[0.625rem] font-medium tracking-[0.16em] text-ink-500 uppercase">
              Audit log
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-vital-50 px-2 py-0.5 font-mono text-[0.6rem] font-medium text-vital-700 ring-1 ring-vital-100">
              <span className="relative inline-flex size-1.5">
                <span className="absolute inset-0 animate-ping-slow rounded-full bg-vital-500 opacity-75" />
                <span className="relative inline-flex size-full rounded-full bg-vital-500" />
              </span>
              Auto-logged
            </span>
          </div>

          <ul className="divide-y divide-ink-100/80">
            {entries.map((entry, index) => (
              <li
                key={entry.time}
                className={cn(
                  "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-3.5 py-1.5 text-[0.72rem]",
                  index === entries.length - 1 && "bg-brand-50/60",
                )}
              >
                <span className="font-mono text-ink-500 tabular-nums">{entry.time}</span>
                <span className="truncate font-medium text-ink-800">{entry.activity}</span>
                <span className="font-mono text-ink-900 tabular-nums">
                  {formatDuration(entry.seconds)}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t border-ink-100 bg-canvas px-3.5 py-2.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-[0.68rem] font-medium text-ink-500">Running total</span>
              <span className="font-mono text-sm font-semibold text-brand-700 tabular-nums">
                {formatDuration(totalSeconds)}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-brand-100">
                <span
                  className="block h-full rounded-full bg-linear-to-r from-brand-500 to-vital-400"
                  style={{ width: `${progress}%` }}
                />
              </span>
              <span className="font-mono text-[0.6rem] text-ink-500 tabular-nums">20m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
