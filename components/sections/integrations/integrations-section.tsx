import { Pause, Play } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { integrations } from "@/lib/content/home";

/**
 * Typographic "wordmarks": each name gets its own weight / case / tracking so
 * the strip reads like a logo wall without reproducing anyone's trademark art.
 */
const WORDMARK_STYLES = [
  "text-[1.375rem] font-semibold tracking-[-0.03em]",
  "font-serif text-[1.6rem] italic tracking-[-0.01em]",
  "font-display text-[1.5rem] tracking-[-0.01em]",
  "text-lg font-bold tracking-[0.06em] uppercase",
  "text-[1.375rem] font-light tracking-[-0.02em]",
  "text-xl font-medium tracking-tight",
] as const;

function Separator() {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="size-2 shrink-0 text-blush-300 motion-reduce:hidden"
    >
      <circle cx="6" cy="6" r="3" fill="currentColor" />
    </svg>
  );
}

function WordmarkList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate ? "true" : undefined}
      className={cn(
        "flex shrink-0 items-center motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4",
        duplicate && "motion-reduce:hidden",
      )}
    >
      {integrations.names.map((name, index) => (
        <li key={name} className="flex items-center">
          <span
            className={cn(
              "px-6 leading-none whitespace-nowrap text-care-900/45 transition-colors duration-300 hover:text-care-900 sm:px-8",
              WORDMARK_STYLES[index % WORDMARK_STYLES.length],
            )}
          >
            {name}
          </span>
          <Separator />
        </li>
      ))}
    </ul>
  );
}

/**
 * CSS-only pause control for the auto-scrolling strip (WCAG 2.2.2): a labelled
 * checkbox whose :checked state pauses the track via :has() on the group.
 * Hidden with reduced motion, when nothing moves.
 */
function MarqueeToggle() {
  return (
    <span className="relative shrink-0 motion-reduce:hidden">
      <input id="integrations-pause" type="checkbox" className="peer sr-only" />
      <label
        htmlFor="integrations-pause"
        className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/70 text-care-800 ring-1 ring-care-900/10 transition-[background-color,color] duration-200 select-none peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-care-600 hover:bg-white hover:text-care-950"
      >
        <Pause
          aria-hidden="true"
          className="size-4 group-has-checked/marquee:hidden"
          strokeWidth={2.25}
        />
        <Play
          aria-hidden="true"
          className="hidden size-4 group-has-checked/marquee:block"
          strokeWidth={2.25}
        />
        <span className="sr-only">Pause the scrolling list of EHR systems</span>
      </label>
    </span>
  );
}

/** Cream trust strip under the hero: the EHR systems AETOS works alongside. */
export function IntegrationsSection() {
  return (
    <section
      id="integrations"
      aria-labelledby="integrations-title"
      className="relative isolate overflow-hidden border-t border-care-900/8 bg-cream-100 py-12 font-humanist text-care-950 sm:py-14"
    >
      {/* Faint horizon glow along the top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-radial-[ellipse_60%_80%_at_50%_0%] from-blush-100/70 to-transparent"
      />

      <div className="container-page">
        <h2
          id="integrations-title"
          className="mx-auto max-w-md text-center text-sm font-medium text-balance text-stone-500 sm:max-w-none sm:text-base"
        >
          {integrations.title}
        </h2>

        <div className="group/marquee mt-8 flex items-center gap-2 sm:mt-10 sm:gap-4">
          <div className="min-w-0 flex-1 overflow-hidden mask-fade-x motion-reduce:mask-none">
            <div className="flex w-max animate-marquee group-has-checked/marquee:[animation-play-state:paused] hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-center">
              <WordmarkList />
              <WordmarkList duplicate />
            </div>
          </div>
          <MarqueeToggle />
        </div>
      </div>
    </section>
  );
}
