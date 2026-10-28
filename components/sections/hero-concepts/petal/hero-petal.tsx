import { PetalBackdrop } from "./petal-backdrop";
import { PetalCollage } from "./petal-collage";
import { PetalCopy } from "./petal-copy";

/**
 * Hero concept "Petal": sweet, soft and friendly. Warm cream canvas, drifting
 * pastel light, a rounded Fraunces headline and a playful collage of care
 * moments (home BP reading, night-time nurses, a check-in chat, a heartbeat).
 */
export function HeroPetal() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-cream-50 pt-32 pb-16 font-humanist text-care-950 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-16"
    >
      <PetalBackdrop />

      <div className="container-page relative grid items-center gap-y-14 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,1fr)] lg:gap-x-12 xl:gap-x-16">
        <PetalCopy />
        <PetalCollage />
      </div>
    </section>
  );
}
