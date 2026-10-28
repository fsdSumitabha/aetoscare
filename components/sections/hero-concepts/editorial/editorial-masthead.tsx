import { ButtonLink } from "@/components/ui/button-link";
import { Heart } from "@/components/ui/icons";
import { hero } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";

/** A soft, hand-drawn underline beneath the accent line. */
function Swash() {
  return (
    <svg
      viewBox="0 0 400 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute -bottom-[0.14em] left-[4%] -z-10 h-[0.32em] w-[94%]"
    >
      <path
        d="M6 15 C 70 7, 150 5, 214 8 S 340 16, 394 9"
        className="stroke-blush-300/80"
        strokeWidth={7}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

const eyebrowParts = hero.eyebrow.split(" · ");

/** Centered editorial masthead: eyebrow, headline, standfirst and calls to action. */
export function EditorialMasthead() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
      <p className="flex items-center justify-center gap-4 font-humanist text-[0.7rem] font-semibold tracking-[0.2em] text-care-700 uppercase sm:text-xs">
        <span aria-hidden="true" className="hidden h-px w-12 bg-linear-to-r from-transparent to-care-700/40 sm:block lg:w-20" />
        <span className="flex flex-col items-center gap-2 text-balance sm:flex-row sm:gap-2.5">
          <Heart aria-hidden="true" className="size-3.5 shrink-0 fill-blush-300 text-blush-500" strokeWidth={2} />
          <span>
            {eyebrowParts.map((part, index) => (
              <span key={part}>
                {index > 0 ? (
                  <>
                    <span className="sr-only">, </span>
                    <span aria-hidden="true" className="hidden sm:inline">
                      {" · "}
                    </span>
                  </>
                ) : null}
                <span className="block sm:inline">{part}</span>
              </span>
            ))}
          </span>
        </span>
        <span aria-hidden="true" className="hidden h-px w-12 bg-linear-to-l from-transparent to-care-700/40 sm:block lg:w-20" />
      </p>

      <h1
        id="hero-title"
        className="mt-7 font-display text-[2.85rem] leading-[0.98] font-[380] tracking-[-0.022em] text-care-950 [font-variation-settings:'SOFT'_30,'opsz'_144] sm:text-7xl sm:leading-[0.95] xl:text-[5.6rem]"
      >
        <span className="block">{`${hero.titleLead} `}</span>
        <span className="mt-1 block font-[340] text-care-600 italic [font-variation-settings:'SOFT'_100,'opsz'_144] sm:mt-2">
          <span className="relative isolate inline-block">
            {hero.titleAccent}
            <Swash />
          </span>
        </span>
      </h1>

      <p className="mt-7 max-w-[43rem] font-humanist text-[1.05rem] text-pretty sm:text-balance leading-relaxed text-stone-600 sm:text-lg">
        {hero.description}
      </p>

      <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
        <ButtonLink href={siteConfig.demoUrl} variant="care" size="lg" className="w-full font-humanist sm:w-auto">
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
    </div>
  );
}
