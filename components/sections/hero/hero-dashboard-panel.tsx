import { HeroEcgStrip } from "./hero-ecg-strip";
import { HeroVitalsGrid } from "./hero-vitals-grid";
import { LiveDot } from "./live-dot";

/** The main "mission control" glass panel: patient header, live ECG and vitals. */
export function HeroDashboardPanel() {
  return (
    <div className="relative overflow-hidden rounded-4xl bg-ink-900/70 bg-linear-to-b from-white/9 to-white/1.5 p-4 shadow-2xl ring-1 shadow-black/60 ring-white/10 backdrop-blur-2xl backdrop-saturate-150 sm:p-5 lg:p-6">
      {/* Specular top edge */}
      <span className="absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

      {/* Window bar */}
      <div className="flex items-center gap-3 border-b border-white/7 pb-3.5 sm:pb-4">
        <span className="flex shrink-0 gap-1.5 lg:hidden xl:flex">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/12" />
          <span className="size-2.5 rounded-full bg-white/12" />
        </span>
        <span className="truncate text-[0.8125rem] font-medium tracking-tight text-white sm:text-sm">
          Patient overview
        </span>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-vital-300/10 px-2 py-0.5 font-mono text-[0.6rem] font-semibold tracking-[0.16em] text-vital-300 ring-1 ring-vital-300/25">
          <LiveDot tone="vital" />
          LIVE
        </span>
      </div>

      {/* Patient */}
      <div className="mt-4 flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-brand-400 to-brand-700 text-sm font-semibold tracking-tight text-white shadow-lg ring-1 shadow-brand-900/40 ring-white/20 sm:size-11">
          MA
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[0.95rem] font-semibold tracking-tight text-white">
            Maria A., 67
          </span>
          <span className="block truncate text-xs text-ink-300">Hypertension · Type 2 diabetes</span>
        </span>
        <span className="hidden shrink-0 gap-1.5 font-mono text-[0.6rem] font-medium tracking-[0.12em] text-brand-200 min-[420px]:flex">
          <span className="rounded-md bg-brand-400/10 px-1.5 py-1 ring-1 ring-brand-300/20">RPM</span>
          <span className="rounded-md bg-brand-400/10 px-1.5 py-1 ring-1 ring-brand-300/20">CCM</span>
        </span>
      </div>

      <HeroEcgStrip />
      <HeroVitalsGrid />
    </div>
  );
}
