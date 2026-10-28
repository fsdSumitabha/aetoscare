import type { ReactNode } from "react";
import type { LucideIcon } from "@/components/ui/icons";
import { Check, Phone, ReceiptText, TriangleAlert } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { LiveDot } from "./live-dot";

type FloatingProps = {
  /** Positioning classes supplied by the composition. */
  className?: string;
};

/** Out-of-range reading, already actioned by the clinical team. */
export function HeroAlertCard({ className }: FloatingProps) {
  return (
    <div className={cn("absolute z-20 animate-float", className)}>
      {/* glass-dark recipe with a coral ring in place of its white border (avoids a double hairline) */}
      <div className="relative overflow-hidden rounded-3xl bg-ink-800/55 p-3 shadow-2xl ring-1 shadow-pulse-600/20 ring-pulse-400/30 backdrop-blur-lg backdrop-saturate-150 sm:p-3.5">
        <span className="absolute inset-y-4 left-0 w-0.5 rounded-r-full bg-pulse-400" />
        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-pulse-500/15 text-pulse-300 ring-1 ring-pulse-400/30">
            <TriangleAlert aria-hidden="true" className="size-4" strokeWidth={2.25} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center gap-2 font-mono text-[0.6rem] font-semibold tracking-[0.14em] text-pulse-300 uppercase">
              Abnormal reading
              <LiveDot tone="pulse" className="ml-auto" />
            </span>
            <span className="mt-0.5 flex items-baseline gap-1 font-mono">
              <span className="text-[0.95rem] font-semibold text-white tabular-nums">BP 168/104</span>
              <span className="text-[0.625rem] text-ink-300">mmHg</span>
            </span>
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-white/6 px-3 py-2">
          <Phone aria-hidden="true" className="size-3.5 shrink-0 text-vital-300" strokeWidth={2.25} />
          <span className="truncate text-xs font-medium text-ink-100">RN called patient</span>
          <span className="ml-auto shrink-0 font-mono text-[0.625rem] text-ink-300">3 min ago</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Four 5-minute segments. Each shows its slice of one shared gradient
 * (background 4× wide, offset i/3), so the bar reads as a single sweep.
 */
const BILLING_SEGMENTS = [
  { key: "0-5", slice: "bg-position-[0%_0%]" },
  { key: "5-10", slice: "bg-position-[33.333%_0%]" },
  { key: "10-15", slice: "bg-position-[66.667%_0%]" },
  { key: "15-20", slice: "bg-position-[100%_0%]" },
] as const;

/** Clinical time accruing toward CPT 99457, complete for the month. */
export function HeroBillingCard({ className }: FloatingProps) {
  return (
    <div className={cn("absolute z-20 animate-float-delayed", className)}>
      <div className="glass-dark rounded-3xl p-3.5 shadow-2xl shadow-black/50 sm:p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-400/15 text-brand-200 ring-1 ring-brand-300/25">
            <ReceiptText aria-hidden="true" className="size-4" strokeWidth={2} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[0.6rem] font-medium tracking-[0.14em] text-ink-300 uppercase">
              CPT 99457
            </span>
            <span className="mt-0.5 flex items-baseline gap-1.5">
              <span className="font-mono text-[0.95rem] font-semibold text-white tabular-nums">
                20 min
              </span>
              <span className="text-xs text-ink-300">logged</span>
            </span>
          </span>
        </div>

        <div className="mt-3 flex gap-1">
          {BILLING_SEGMENTS.map(({ key, slice }) => (
            <span
              key={key}
              className={cn(
                "h-1.5 flex-1 rounded-full bg-linear-to-r from-brand-400 to-vital-300 bg-size-[400%_100%]",
                slice,
              )}
            />
          ))}
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-2">
          <span className="font-mono text-[0.625rem] text-ink-300 tabular-nums">20 / 20 min</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-vital-300">
            <span className="grid size-4 place-items-center rounded-full bg-vital-300 text-ink-950">
              <Check aria-hidden="true" className="size-2.5" strokeWidth={3.5} />
            </span>
            Ready to bill
          </span>
        </div>
      </div>
    </div>
  );
}

type HeroChipProps = FloatingProps & {
  icon: LucideIcon;
  children: ReactNode;
};

/**
 * Small floating capability tag around the dashboard. Has no display class of
 * its own: pass one via className (e.g. "hidden sm:inline-flex").
 */
export function HeroChip({ icon: Icon, children, className }: HeroChipProps) {
  return (
    <span
      className={cn(
        "glass-dark absolute z-20 items-center gap-2 rounded-full py-1.5 pr-3.5 pl-2 text-xs font-medium whitespace-nowrap text-ink-100 shadow-xl shadow-black/40",
        className,
      )}
    >
      <span className="grid size-6 place-items-center rounded-full bg-white/8 text-vital-300">
        <Icon aria-hidden="true" className="size-3.5" strokeWidth={2.25} />
      </span>
      {children}
    </span>
  );
}
