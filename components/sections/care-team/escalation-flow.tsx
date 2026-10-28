import type { LucideIcon } from "@/components/ui/icons";
import { PhoneCall, RadioTower, Stethoscope, Timer, TriangleAlert } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { careTeam } from "@/lib/content/home";

type StepStyle = {
  icon: LucideIcon;
  /** Colour of the icon on its node tile. */
  iconClass: string;
  /** Tint/fill layer of the node tile. */
  tileClass: string;
  /** Extra classes for the step card (highlight states). */
  cardClass?: string;
  /** Short status label rendered at the foot of highlighted steps. */
  badge?: { label: string; className: string };
  ping?: boolean;
};

/** Visual treatment per step, in the order of careTeam.escalation. */
const STEP_STYLES: readonly StepStyle[] = [
  {
    icon: RadioTower,
    iconClass: "text-brand-200",
    tileClass: "bg-brand-500/15 ring-brand-400/35",
  },
  {
    icon: TriangleAlert,
    iconClass: "text-pulse-300",
    tileClass: "bg-pulse-500/15 ring-pulse-400/35",
  },
  {
    icon: PhoneCall,
    iconClass: "text-white",
    tileClass: "bg-pulse-500 ring-pulse-300/60 shadow-[0_12px_32px_-8px_rgb(249_87_60/0.7)]",
    cardClass: "bg-linear-to-b from-pulse-500/15 to-pulse-500/0 ring-1 ring-pulse-400/30",
    badge: { label: "24/7 RN", className: "bg-pulse-500/15 text-pulse-300 ring-pulse-400/30" },
    ping: true,
  },
  {
    icon: Stethoscope,
    iconClass: "text-ink-950",
    tileClass: "bg-vital-300 ring-vital-200/70 shadow-glow-vital",
    cardClass: "bg-linear-to-b from-vital-400/15 to-vital-400/0 ring-1 ring-vital-300/30",
    badge: { label: "Clinic-guided", className: "bg-vital-300/10 text-vital-200 ring-vital-300/30" },
  },
  {
    icon: Timer,
    iconClass: "text-vital-300",
    tileClass: "bg-vital-300/15 ring-vital-300/35",
  },
];

/** Rail gradients between consecutive nodes (brand → alert → resolution). */
const CONNECTOR_GRADIENTS = [
  "from-brand-400/70 to-pulse-400/70",
  "from-pulse-400/70 to-pulse-400/80",
  "from-pulse-400/80 to-vital-300/80",
  "from-vital-300/80 to-vital-300/45",
] as const;

/** Staggered travelling signal, reusing the global `ecg-draw` keyframes (dash offset 1 → 0). */
const SIGNAL_TIMINGS = [
  "animate-[ecg-draw_4.2s_cubic-bezier(0.65,0,0.35,1)_0s_infinite]",
  "animate-[ecg-draw_4.2s_cubic-bezier(0.65,0,0.35,1)_0.7s_infinite]",
  "animate-[ecg-draw_4.2s_cubic-bezier(0.65,0,0.35,1)_1.4s_infinite]",
  "animate-[ecg-draw_4.2s_cubic-bezier(0.65,0,0.35,1)_2.1s_infinite]",
] as const;

/**
 * Connector from this node's centre to the next node's centre: vertical on
 * small screens, horizontal from lg. A short dash travels along it; at rest
 * the dash sits hidden beneath the opaque node tile.
 */
function Connector({ index }: { index: number }) {
  const gradient = CONNECTOR_GRADIENTS[index] ?? CONNECTOR_GRADIENTS[0];
  const timing = SIGNAL_TIMINGS[index] ?? SIGNAL_TIMINGS[0];

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-6 -bottom-10 left-6 w-0.5 -translate-x-1/2 lg:-right-11 lg:bottom-auto lg:h-0.5 lg:w-auto lg:translate-x-0 lg:-translate-y-1/2"
    >
      <span className={cn("absolute inset-0 rounded-full bg-linear-to-b lg:bg-linear-to-r", gradient)} />
      <svg className="absolute inset-0 size-full overflow-visible drop-shadow-[0_0_6px_rgb(255_255_255/0.9)]" focusable="false">
        <line
          x1="50%"
          y1="0"
          x2="50%"
          y2="100%"
          pathLength={1}
          strokeDasharray="0.1 0.9"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          className={cn("lg:hidden", timing)}
        />
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          pathLength={1}
          strokeDasharray="0.1 0.9"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          className={cn("hidden lg:block", timing)}
        />
      </svg>
    </span>
  );
}

type EscalationFlowProps = {
  className?: string;
};

/** How every reading moves from device to documented, billable time. */
export function EscalationFlow({ className }: EscalationFlowProps) {
  const titleId = "care-team-flow-title";
  const steps = careTeam.escalation;

  return (
    <div
      className={cn(
        "relative rounded-4xl bg-white/2.5 p-4 ring-1 ring-white/10 sm:p-8 xl:p-10",
        className,
      )}
    >
      <div className="mb-7 flex flex-wrap items-center justify-between gap-3 sm:mb-9">
        <h3 id={titleId} className="font-mono text-xs font-medium tracking-[0.18em] text-ink-200 uppercase">
          Escalation workflow
        </h3>
        <p className="inline-flex items-center gap-2 rounded-full bg-vital-300/10 px-3 py-1.5 font-mono text-[0.7rem] font-medium tracking-[0.08em] text-vital-200 ring-1 ring-vital-300/25">
          <span aria-hidden="true" className="relative flex size-2">
            <span className="absolute inset-0 animate-ping-slow rounded-full bg-vital-300" />
            <span className="relative size-2 rounded-full bg-vital-300" />
          </span>
          Every reading, 24/7/365
        </p>
      </div>

      <ol role="list" aria-labelledby={titleId} className="relative flex flex-col gap-4 lg:grid lg:grid-cols-5 lg:gap-5">
        {steps.map((step, index) => {
          const style = STEP_STYLES[index] ?? STEP_STYLES[0];
          const Icon = style.icon;
          const isLast = index === steps.length - 1;

          return (
            <li key={step.title} className="relative flex gap-4 lg:flex-col lg:gap-5">
              {isLast ? null : <Connector index={index} />}

              <span
                aria-hidden="true"
                className={cn("relative z-10 grid size-12 shrink-0 place-items-center rounded-2xl bg-ink-900", style.iconClass)}
              >
                <span className={cn("absolute inset-0 rounded-2xl ring-1 ring-inset", style.tileClass)} />
                <Icon className="relative size-5" strokeWidth={2} />
                {style.ping ? (
                  <span className="absolute -top-1 -right-1 flex size-3">
                    <span className="absolute inset-0 animate-ping-slow rounded-full bg-pulse-400" />
                    <span className="relative size-3 rounded-full bg-pulse-400 ring-2 ring-ink-950" />
                  </span>
                ) : null}
              </span>

              <div className={cn("glass-dark flex min-w-0 flex-1 flex-col rounded-3xl p-4 xl:p-5", style.cardClass)}>
                <span aria-hidden="true" className="font-mono text-[0.7rem] tracking-[0.16em] text-ink-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {/* Greedy wrap: balance splits "Out-of-range" at its hyphen in narrow lg columns. */}
                <h4 className="mt-2 text-[0.95rem] leading-snug font-semibold text-wrap text-white">{step.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-200">{step.detail}</p>
                {style.badge ? (
                  <p className="mt-auto pt-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 font-mono text-[0.68rem] font-medium tracking-[0.08em] uppercase ring-1",
                        style.badge.className,
                      )}
                    >
                      {style.badge.label}
                    </span>
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
