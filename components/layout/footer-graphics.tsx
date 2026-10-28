import { cn } from "@/lib/cn";
import { Logo } from "@/components/ui/logo";
import { BrandRings } from "@/components/layout/brand-rings";

/** Baseline-centred PQRST trace in a 120×32 box. */
const ECG_PATH =
  "M0 16H36C38 16 39 12.5 41 12.5S44 16 46 16H50L53 19.5L57.5 2L62 30L65.5 16H71C74 16 75 10.5 78 10.5S82 16 85 16H120";

/** Decorative backdrop: gradient top hairline + glow, masked line grid, grain. */
export function FooterBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-400/60 to-transparent" />
      <div className="absolute top-0 left-1/2 h-40 w-[min(56rem,100%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute inset-0 bg-line-grid-dark [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_10%,transparent_70%)]" />
      <div className="absolute -bottom-40 -left-32 size-120 rounded-full bg-vital-400/6 blur-3xl" />
      <div className="absolute inset-0 bg-noise opacity-4 mix-blend-overlay" />
    </div>
  );
}

/** Hairline divider with a heartbeat trace drawn through its centre. */
export function PulseDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("flex items-center", className)}>
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-white/15" />
      <svg
        viewBox="0 0 120 32"
        fill="none"
        aria-hidden="true"
        focusable="false"
        className="h-8 w-30 shrink-0"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={ECG_PATH} className="stroke-white/15" strokeWidth={1.25} />
        <path
          d={ECG_PATH}
          className="animate-ecg stroke-vital-300"
          strokeWidth={1.5}
          pathLength={1}
          strokeDasharray={1}
        />
      </svg>
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-white/15" />
    </div>
  );
}

/**
 * Oversized outlined AETOS wordmark bleeding off the footer's bottom edge,
 * with brand rings radiating from the crosshair "O" (centre at 71.94% / 53.3%
 * of the wordmark's 183×50 viewBox) and a soft glow on the eye.
 */
export function FooterWatermark() {
  return (
    <div aria-hidden="true" className="pointer-events-none relative -z-10 container-page mt-2 select-none">
      <div className="relative -mb-[9%]">
        <BrandRings
          spin
          className="absolute top-[53.3%] left-[71.94%] aspect-square w-[max(110%,34rem)] -translate-x-1/2 -translate-y-1/2 text-white/6"
        />
        <div className="absolute top-[53.3%] left-[71.94%] aspect-square w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative [mask-image:linear-gradient(to_bottom,#000_30%,transparent)] [&_path]:[vector-effect:non-scaling-stroke] [&>svg]:h-auto [&>svg]:w-full [&>svg]:stroke-white/10 [&>svg]:stroke-1">
          <Logo className="text-white/3.5" eyeClassName="fill-brand-400/30" />
        </div>
      </div>
    </div>
  );
}
