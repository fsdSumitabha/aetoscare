import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/cn";
import { hero, valueProps } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";
import { valuePropVisuals, type ValuePropKey } from "./value-prop-visuals";

type ValueProp = (typeof valueProps.items)[number];

/** Asymmetric bento on lg: 7 · 5 over 5 · 7. */
const cardSpan: Record<ValuePropKey, string> = {
  devices: "lg:col-span-7",
  time: "lg:col-span-5",
  monitoring: "lg:col-span-5",
  risk: "lg:col-span-7",
};

/** Cards rendered on the inverted dark surface for contrast within the grid. */
const invertedCards: ReadonlySet<ValuePropKey> = new Set<ValuePropKey>(["monitoring"]);

/**
 * "Why AETOS": the four pillars of the service as a bento grid, each card
 * pairing real copy with a bespoke data-UI vignette.
 */
export function ValuePropsSection() {
  return (
    <Section
      tone="light"
      id={valueProps.id}
      labelledBy="why-aetos-title"
      background={<ValuePropsBackdrop />}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <SectionHeading
          id="why-aetos-title"
          eyebrow={valueProps.eyebrow}
          titleLead={valueProps.titleLead}
          titleAccent={valueProps.titleAccent}
          description={valueProps.description}
        />
        <ButtonLink
          href={siteConfig.demoUrl}
          variant="secondary"
          className="self-start lg:mb-1.5 lg:self-auto"
        >
          {hero.primaryCta.label}
        </ButtonLink>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:mt-16 lg:grid-cols-12">
        {valueProps.items.map((item) => (
          <ValuePropCard key={item.key} item={item} />
        ))}
      </div>
    </Section>
  );
}

function ValuePropCard({ item }: { item: ValueProp }) {
  const Visual = valuePropVisuals[item.key];
  const inverted = invertedCards.has(item.key);
  const numeric = /^[$\d]/.test(item.highlight);
  const titleId = `why-aetos-${item.key}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={cn(
        "reveal group relative flex flex-col overflow-hidden rounded-4xl p-2 ring-1 transition duration-300 ease-out hover:-translate-y-1 hover:shadow-lift",
        inverted
          ? "bg-ink-950 text-white shadow-lift ring-white/10"
          : "bg-white text-ink-900 shadow-soft ring-ink-100",
        cardSpan[item.key],
      )}
    >
      {inverted ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-brand-500/20 blur-3xl"
        />
      ) : null}

      <div
        aria-hidden="true"
        className={cn(
          "relative h-60 overflow-hidden rounded-3xl ring-1 transition-shadow duration-300 sm:h-64",
          inverted
            ? "bg-ink-900/70 ring-white/10 group-hover:ring-white/20"
            : "bg-canvas ring-ink-100 group-hover:ring-brand-200",
        )}
      >
        <Visual />
      </div>

      <div className="relative flex flex-1 flex-col px-4 pt-6 pb-4 sm:px-6 sm:pt-7 sm:pb-5">
        <h3
          id={titleId}
          className={cn(
            "text-xl font-semibold tracking-[-0.02em] sm:text-[1.375rem]",
            inverted ? "text-white" : "text-ink-950",
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "mt-2.5 mb-7 max-w-xl text-[0.95rem] leading-relaxed",
            inverted ? "text-ink-200" : "text-ink-500",
          )}
        >
          {item.description}
        </p>

        {/* Value stacked over its label so baselines line up across each bento row */}
        <p
          className={cn(
            "mt-auto flex flex-col gap-1.5 border-t pt-5",
            inverted ? "border-white/10" : "border-ink-100",
          )}
        >
          <span
            className={cn(
              "w-fit text-[1.75rem] leading-[1.1] font-semibold sm:text-4xl md:text-3xl lg:text-[2.75rem]",
              numeric ? "font-mono tracking-[-0.06em]" : "tracking-[-0.04em]",
              inverted ? "text-gradient-light" : "text-ink-950",
            )}
          >
            {item.highlight}
          </span>{" "}
          <span className={cn("text-sm", inverted ? "text-ink-200" : "text-ink-500")}>
            {item.highlightLabel}
          </span>
        </p>
      </div>
    </article>
  );
}

function ValuePropsBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute top-0 right-0 h-112 w-3xl max-w-full bg-dot-grid [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div className="absolute top-1/2 left-1/2 h-96 w-5xl max-w-full -translate-x-1/2 rounded-full bg-linear-to-r from-brand-100/50 via-transparent to-vital-100/50 blur-3xl" />
    </div>
  );
}
