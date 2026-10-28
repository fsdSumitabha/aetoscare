import { ButtonLink } from "@/components/ui/button-link";
import { Check, Heart } from "@/components/ui/icons";
import { MotionToggle } from "@/components/ui/motion-toggle";
import { hero } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";

/** Left column: eyebrow, headline, description, calls to action and proof points. */
export function DawnCopy() {
  return (
    <div className="max-w-2xl font-humanist lg:max-w-none">
      <p className="inline-flex items-center gap-2.5 rounded-[1.25rem] bg-cream-50 py-1.5 pr-4 pl-1.5 text-[0.8rem] leading-snug font-medium text-care-800 shadow-[0_1px_2px_rgb(19_54_48/0.04),0_8px_20px_-12px_rgb(19_54_48/0.18)] ring-1 ring-care-900/10 sm:rounded-full sm:text-sm">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-blush-100">
          <Heart aria-hidden="true" className="size-3.5 text-blush-500" fill="currentColor" strokeWidth={0} />
        </span>
        {hero.eyebrow}
      </p>

      <h1
        id="hero-title"
        className="mt-7 font-display text-[2.6rem] leading-[0.98] font-normal tracking-[-0.035em] text-care-950 [font-variation-settings:'SOFT'_50,'opsz'_144] sm:text-6xl lg:text-[3.7rem] xl:text-[4.6rem]"
      >
        {`${hero.titleLead} `}
        <span className="block pt-1 italic [font-variation-settings:'SOFT'_100,'opsz'_144]">
          <span className="bg-linear-to-r from-care-600 via-care-600 to-blush-500 box-decoration-clone bg-clip-text pr-[0.08em] pb-[0.06em] text-transparent">
            {hero.titleAccent}
          </span>
        </span>
      </h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600">{hero.description}</p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <ButtonLink
          href={siteConfig.demoUrl}
          variant="care"
          size="lg"
          className="w-full font-humanist sm:w-auto"
        >
          {hero.primaryCta.label}
        </ButtonLink>
        <ButtonLink
          href={hero.secondaryCta.href}
          variant="cream"
          size="lg"
          className="w-full font-humanist sm:w-auto"
        >
          {hero.secondaryCta.label}
        </ButtonLink>
      </div>

      <ul className="mt-9 flex flex-wrap gap-2.5">
        {hero.proofPoints.map((point) => (
          <li
            key={point}
            className="inline-flex items-center gap-2 rounded-full bg-white/70 py-1.5 pr-3.5 pl-1.5 text-sm font-medium text-care-900 ring-1 ring-care-900/8"
          >
            <span className="grid size-5 place-items-center rounded-full bg-care-100 text-care-700">
              <Check aria-hidden="true" className="size-3" strokeWidth={3} />
            </span>
            {point}
          </li>
        ))}
      </ul>

      <MotionToggle tone="light" className="mt-7" />
    </div>
  );
}
