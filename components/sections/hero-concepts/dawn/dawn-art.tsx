import { FreeDeviceSticker, NightCheckInPill, NurseMessageCard, ReadingCard } from "./dawn-cards";
import { DawnScene } from "./dawn-scene";

// A true semicircular top on a 4:5 box (50% of width = 40% of height), soft bottom corners.
const ARCH_RADIUS = "50% 50% 1.75rem 1.75rem / 40% 40% 1.75rem 1.75rem";

/**
 * "The Care Window": an arched scene from dawn to night with the heartbeat as
 * its horizon, framed in porcelain and surrounded by small moments of care.
 */
export function DawnArt() {
  return (
    <figure className="relative mx-auto w-full max-w-[24rem] sm:max-w-[34rem] lg:max-w-[40rem]">
      <figcaption className="sr-only">
        Illustration: an arched window looking out from dawn to night over a small lit house, with
        a heartbeat line as the horizon, a morning message from a nurse, a normal blood pressure
        reading and a night-time nurse check-in.
      </figcaption>

      <div aria-hidden="true" className="relative pt-6 pb-7 sm:pt-8 sm:pb-9">
        <div className="relative mx-auto w-[76%] sm:w-[62%] lg:w-[66%]">
          {/* Warm halo and a fine architectural molding around the window */}
          <div className="absolute -inset-[18%] -z-10 rounded-full bg-radial from-blush-200/55 via-honey-100/35 to-transparent to-70%" />
          <div
            className="absolute -inset-3.5 -z-10 border border-care-900/10 sm:-inset-[1.4rem]"
            style={{ borderRadius: ARCH_RADIUS }}
          />
          <div className="absolute inset-x-[8%] -bottom-5 -z-10 h-10 rounded-[100%] bg-care-900/20 blur-2xl" />

          {/* The window */}
          <div
            className="relative aspect-[4/5] overflow-hidden bg-cream-200 shadow-float ring-[6px] ring-cream-50 sm:ring-[10px]"
            style={{ borderRadius: ARCH_RADIUS }}
          >
            <DawnScene />
            <div
              className="pointer-events-none absolute inset-[6px] border border-white/40 sm:inset-2"
              style={{ borderRadius: ARCH_RADIUS }}
            />
          </div>
        </div>

        <FreeDeviceSticker className="absolute top-0 right-[2%] rotate-[10deg] sm:right-[9%] lg:right-[7%]" />
        <NurseMessageCard className="absolute top-[7%] left-0 sm:top-[17%] animate-[float_11s_ease-in-out_infinite] sm:left-[1%]" />
        <ReadingCard className="absolute top-[33%] right-0 sm:top-[45%] animate-[float_13s_ease-in-out_-5s_infinite]" />
        <NightCheckInPill className="absolute bottom-0 left-1/2 -translate-x-1/2 animate-[float_12s_ease-in-out_-8s_infinite] sm:left-[54%]" />
      </div>
    </figure>
  );
}
