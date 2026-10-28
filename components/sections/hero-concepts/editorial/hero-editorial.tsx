import { MotionToggle } from "@/components/ui/motion-toggle";
import { DayOfCareBand } from "./day-of-care-band";
import { EditorialMasthead } from "./editorial-masthead";
import { ProofRow } from "./proof-row";

/**
 * Hero concept "Editorial calm": a serious, magazine-like cover on warm white.
 * Centered serif masthead above a panoramic "A day of care" band, where one
 * line flows from morning to night and becomes a heartbeat once.
 */
export function HeroEditorial() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-cream-50 pt-32 pb-10 sm:pt-36 sm:pb-14 lg:pt-36"
    >
      {/* Soft evergreen bloom behind the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-14rem] left-1/2 -z-10 h-[56rem] w-[min(90rem,180vw)] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(213_234_227/0.75),rgb(238_246_243/0.6)_45%,transparent)]"
      />
      {/* A breath of blush low on the page */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-12rem] left-[-10rem] -z-10 size-[36rem] bg-[radial-gradient(closest-side,rgb(255_232_223/0.6),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-linear-to-b from-transparent to-cream-100"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <EditorialMasthead />
        <DayOfCareBand />
        <ProofRow />
        <div className="mt-6 flex justify-center">
          <MotionToggle tone="light" />
        </div>
      </div>
    </section>
  );
}
