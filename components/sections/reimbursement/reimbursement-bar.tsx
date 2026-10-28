import type { ReimbursementLine } from "@/lib/content/home";
import { formatUsd } from "@/components/sections/reimbursement/format-currency";
import { cn } from "@/lib/cn";

type ReimbursementBarProps = {
  lines: readonly ReimbursementLine[];
  /** Monthly maximum; segment widths are amount / max. */
  max: number;
  /** One background class per segment, cycled if there are more lines. */
  segmentClasses: readonly string[];
  /** One-time amount shown as a detached chip, outside the monthly stack. */
  oneTime?: { amount: number; note: string };
  className?: string;
};

/**
 * Decorative stacked bar of cumulative monthly reimbursement. Every value it
 * shows is also in the accessible table below it, so it is aria-hidden.
 */
export function ReimbursementBar({
  lines,
  max,
  segmentClasses,
  oneTime,
  className,
}: ReimbursementBarProps) {
  return (
    <div aria-hidden="true" className={cn("select-none", className)}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <span className="font-mono text-[0.66rem] font-medium tracking-[0.14em] text-ink-500 uppercase">
          Cumulative / month
        </span>
        {oneTime ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-ink-200 bg-white px-2.5 py-1 font-mono text-[0.66rem] text-ink-600">
            <span className="font-semibold text-ink-900">+{formatUsd(oneTime.amount)}</span>
            {oneTime.note}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex gap-1">
        {lines.map((line, index) => (
          <div
            key={`${line.code}-${index}`}
            className="flex min-w-0 basis-0 flex-col gap-2"
            style={{ flexGrow: line.amount / max }}
          >
            <span className="self-end font-mono text-[0.7rem] font-semibold text-ink-800 tabular-nums">
              {formatUsd(line.cumulative)}
            </span>
            <span
              className={cn(
                "h-3 rounded-full shadow-[inset_0_1px_0_rgb(255_255_255/0.3)]",
                segmentClasses[index % segmentClasses.length],
              )}
            />
            <span className="truncate font-mono text-[0.62rem] text-ink-500">{line.code}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
