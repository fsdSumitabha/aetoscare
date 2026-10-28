import { Check } from "@/components/ui/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MotionToggle } from "@/components/ui/motion-toggle";
import { hero } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";
import { HeroBackdrop } from "./hero-backdrop";
import { HeroVisual } from "./hero-visual";
import { LiveDot } from "./live-dot";

/**
 * Above-the-fold hero. The fixed site header overlays the top, so the section
 * carries its own top padding instead of using <Section>.
 */
export function HeroSection() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink-950 pt-32 pb-20 text-white sm:pt-36 lg:pt-40 lg:pb-28"
    >
      <HeroBackdrop />

      <div className="container-page relative grid items-center gap-y-10 sm:gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-x-10 xl:gap-x-14">
        <div className="max-w-2xl lg:max-w-none">
          <Eyebrow tone="dark">
            <span>
              {hero.eyebrow}
              <LiveDot tone="vital" className="ml-1 align-middle" />
            </span>
          </Eyebrow>

          <h1
            id="hero-title"
            className="mt-7 text-[2.6rem] leading-[0.98] font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-[3.5rem] xl:text-7xl"
          >
            {`${hero.titleLead} `}
            <span className="block pt-1.5">
              <span className="accent-serif text-gradient-light pr-[0.06em]">{hero.titleAccent}</span>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-200 sm:text-xl lg:text-lg xl:text-xl">
            {hero.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              href={siteConfig.demoUrl}
              variant="vital"
              size="lg"
              className="w-full sm:w-auto"
            >
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={hero.secondaryCta.href}
              variant="ghost-dark"
              size="lg"
              className="w-full sm:w-auto"
            >
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>

          <ul className="mt-10 grid grid-cols-[repeat(2,auto)] justify-start gap-x-4 gap-y-3.5 border-t border-white/10 pt-7 sm:grid-cols-2 sm:gap-x-6 md:flex md:justify-between md:gap-x-4 lg:grid lg:gap-x-6">
            {hero.proofPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-[0.8125rem] font-medium text-ink-100 sm:gap-2.5 sm:text-sm"
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-vital-300/10 ring-1 ring-vital-300/30">
                  <Check aria-hidden="true" className="size-3 text-vital-300" strokeWidth={3} />
                </span>
                {point}
              </li>
            ))}
          </ul>
          <MotionToggle className="mt-6" />
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
