import { Languages, Signal } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { HeroDashboardPanel } from "./hero-dashboard-panel";
import { HeroAlertCard, HeroBillingCard, HeroChip } from "./hero-floating-cards";

/** Corner registration marks framing the composition (desktop only). */
function RegistrationMarks() {
  const corners = ["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"];
  return (
    <>
      {corners.map((position) => (
        <svg
          key={position}
          viewBox="0 0 12 12"
          fill="none"
          focusable="false"
          className={cn("absolute hidden size-3 text-white/25 lg:block", position)}
        >
          <path d="M6 0V12M0 6H12" stroke="currentColor" />
        </svg>
      ))}
    </>
  );
}

/**
 * Hero centrepiece: a tilted glass "mission control" dashboard with floating
 * alert, billing and capability cards. Built from HTML/CSS + inline SVG.
 *
 * Small screens: cards sit above / below the panel inside the frame.
 * sm and up: cards overlap the panel corners; lg adds a gentle 3D tilt.
 */
export function HeroVisual() {
  return (
    <figure className="relative mx-auto w-full max-w-2xl lg:max-w-none">
      <figcaption className="sr-only">
        Illustration: AETOS dashboard showing live patient vitals, an abnormal-reading alert
        handled by a nurse, and billable time logged
      </figcaption>

      {/* perspective must sit on the tilted stage's direct parent to take effect */}
      <div
        aria-hidden="true"
        className="relative pt-28 pb-28 sm:px-6 sm:pt-14 sm:pb-20 lg:pt-24 lg:pr-10 lg:pb-24 lg:pl-10 lg:perspective-[1600px] xl:pt-14 xl:pr-14 xl:pb-20 xl:pl-12"
      >
        <RegistrationMarks />

        <div className="relative isolate transition-transform duration-700 ease-out lg:rotate-x-4 lg:-rotate-y-8 lg:hover:rotate-x-2 lg:hover:-rotate-y-4">
          {/* Halo behind the panel */}
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-radial from-brand-500/30 via-brand-600/10 to-transparent to-75% blur-2xl" />

          <HeroDashboardPanel />

          {/* Below sm the cards only tuck 12px over the panel edge, clear of its title row and vitals */}
          <HeroAlertCard className="right-2 bottom-full w-[15.5rem] max-w-[calc(100%-1rem)] translate-y-3 sm:-top-10 sm:-right-4 sm:bottom-auto sm:w-[16.5rem] sm:max-w-none sm:translate-y-0 lg:-top-20 lg:-right-8 lg:w-[15rem] xl:-top-10 xl:-right-12 xl:w-[16.5rem]" />

          <HeroBillingCard className="top-full left-2 w-[14rem] -translate-y-3 sm:top-auto sm:-bottom-18 sm:-left-4 sm:w-[16rem] sm:translate-y-0 lg:-bottom-20 lg:-left-8 lg:w-[15rem] xl:-bottom-16 xl:-left-10 xl:w-[16rem]" />

          <HeroChip
            icon={Signal}
            className="hidden sm:-bottom-4 sm:right-8 sm:inline-flex lg:-right-8 xl:right-10"
          >
            4G LTE · No Wi-Fi needed
          </HeroChip>

          <HeroChip icon={Languages} className="hidden sm:top-[44%] sm:-left-5 sm:inline-flex lg:-left-8 xl:-left-10">
            EN / ES
          </HeroChip>
        </div>
      </div>
    </figure>
  );
}
