import { Activity, Check, FileText, LayoutDashboard, Lock, ReceiptText, ShieldCheck, Timer, Users } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

const SIDEBAR = [LayoutDashboard, Users, Activity, FileText] as const;

/** Illustrative rows only; no real patients or readings. */
const ROWS = [
  { device: "BP", reading: "124/79", status: "Normal", alert: false, bar: "w-16" },
  { device: "BP", reading: "158/96", status: "Review", alert: true, bar: "w-20" },
  { device: "SpO₂", reading: "98%", status: "Normal", alert: false, bar: "w-14" },
] as const;

/**
 * Decorative glass mock of the AETOS web platform: sidebar, live patient rows
 * with status dots, the monthly time log and a billing-report toast.
 */
export function PlatformPreview({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate flex flex-col overflow-hidden rounded-3xl bg-ink-950/60 ring-1 ring-white/10",
        className,
      )}
    >
      <div className="absolute -top-20 -right-16 -z-10 size-56 rounded-full bg-brand-500/20 blur-3xl" />

      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-pulse-400/70" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-vital-300/70" />
        </span>
        <span className="mx-auto inline-flex min-w-0 items-center gap-1.5 truncate rounded-full bg-white/5 px-3 py-1 font-mono text-[0.65rem] text-ink-300 ring-1 ring-white/10">
          <Lock className="size-3 shrink-0" strokeWidth={2.2} />
          RPM · CCM platform
        </span>
        <span className="hidden items-center gap-1 rounded-full bg-vital-300/10 px-2 py-0.5 font-mono text-[0.6rem] font-medium tracking-[0.08em] text-vital-200 ring-1 ring-vital-300/25 sm:inline-flex">
          <ShieldCheck className="size-3" strokeWidth={2.2} />
          HIPAA
        </span>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="flex flex-col items-center gap-2 border-r border-white/10 px-2.5 py-3">
          {SIDEBAR.map((Icon, i) => (
            <span
              key={i}
              className={cn(
                "grid size-8 place-items-center rounded-lg",
                i === 0 ? "bg-brand-500/20 text-brand-200 ring-1 ring-brand-400/30" : "text-ink-400",
              )}
            >
              <Icon className="size-4" strokeWidth={2} />
            </span>
          ))}
        </div>

        {/* Main panel */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 p-3 sm:p-4">
          <div className="flex items-center justify-between font-mono text-[0.62rem] tracking-[0.14em] text-ink-300 uppercase">
            <span>Patients</span>
            <span className="inline-flex items-center gap-1.5 text-vital-200">
              <span className="size-1.5 rounded-full bg-vital-300" />
              Live
            </span>
          </div>

          <ul className="flex flex-col gap-1.5">
            {ROWS.map((row) => (
              <li
                key={row.reading}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-2.5 py-2 ring-1",
                  row.alert ? "bg-pulse-500/10 ring-pulse-400/25" : "bg-white/3 ring-white/5",
                )}
              >
                <span
                  className={cn(
                    "size-2 shrink-0 rounded-full",
                    row.alert ? "bg-pulse-400 shadow-[0_0_0_3px_rgb(255_122_98/0.2)]" : "bg-vital-300",
                  )}
                />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className={cn("h-1.5 max-w-full rounded-full bg-white/25", row.bar)} />
                  <span className="h-1 w-10 max-w-full rounded-full bg-white/10" />
                </span>
                <span className="hidden font-mono text-[0.6rem] text-ink-300 min-[420px]:inline">{row.device}</span>
                <span className="font-mono text-xs font-medium text-white tabular-nums">{row.reading}</span>
                {/* Status is always spelled out, never carried by the dot colour alone. */}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 font-mono text-[0.58rem] tracking-[0.06em] uppercase",
                    row.alert ? "bg-pulse-500/20 text-pulse-300" : "bg-vital-300/10 text-vital-200",
                  )}
                >
                  {row.status}
                </span>
              </li>
            ))}
          </ul>

          {/* Monthly time log */}
          <div className="rounded-xl bg-white/4 p-2.5 ring-1 ring-white/5">
            <div className="flex items-center justify-between gap-2 font-mono text-[0.62rem] text-ink-300">
              <span className="inline-flex items-center gap-1.5">
                <Timer className="size-3" strokeWidth={2.2} />
                Time logged
              </span>
              <span className="text-white tabular-nums">16:40 / 20:00</span>
            </div>
            <div className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="absolute inset-y-0 left-0 w-[83%] rounded-full bg-linear-to-r from-brand-400 to-vital-300" />
            </div>
          </div>

          <div className="mt-auto flex justify-end pt-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-vital-300 py-1.5 pr-3 pl-2 text-[0.7rem] font-semibold text-ink-950 shadow-glow-vital">
              <ReceiptText className="size-3.5" strokeWidth={2.2} />
              Billing report ready
              <span className="grid size-4 place-items-center rounded-full bg-ink-950/15">
                <Check className="size-2.5" strokeWidth={3} />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
