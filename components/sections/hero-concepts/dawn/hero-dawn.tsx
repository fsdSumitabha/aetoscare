import { DawnArt } from "./dawn-art";
import { DawnBackdrop } from "./dawn-backdrop";
import { DawnCopy } from "./dawn-copy";

/**
 * Hero concept "Dawn to Dusk": care around the clock, at home.
 * Copy on the left, an arched "care window" scene on the right that runs from
 * morning light to night sky, with the heartbeat line as its horizon.
 */
export function HeroDawn() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-cream-100 pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24"
    >
      <DawnBackdrop />

      <div className="container-page relative grid items-center gap-y-14 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-x-8 xl:gap-x-12">
        <DawnCopy />
        <DawnArt />
      </div>
    </section>
  );
}
