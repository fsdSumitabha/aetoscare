import { BellRing, PackageCheck, UsersRound, type LucideIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { engagement } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";
import { EngagementPhone } from "./engagement-phone";

type EngagementKey = (typeof engagement.items)[number]["key"];

const itemIcons: Record<EngagementKey, LucideIcon> = {
  reminders: BellRing,
  consumables: PackageCheck,
  coordinators: UsersRound,
};

/**
 * Patient engagement: the three touchpoints that keep patients measuring,
 * paired with an illustrated SMS thread between a patient and the care team.
 */
export function EngagementSection() {
  return (
    <Section
      tone="canvas"
      id={engagement.id}
      labelledBy="engagement-title"
      background={<EngagementBackdrop />}
    >
      <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12 xl:gap-20">
        <div className="flex flex-col items-start">
          <SectionHeading
            id="engagement-title"
            eyebrow={engagement.eyebrow}
            titleLead={engagement.titleLead}
            titleAccent={engagement.titleAccent}
            description={engagement.description}
          />

          <ul className="mt-12 flex w-full max-w-xl flex-col">
            {engagement.items.map((item) => {
              const Icon = itemIcons[item.key];
              return (
                <li
                  key={item.key}
                  className="group/item relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 pb-9 before:absolute before:top-15 before:bottom-3 before:left-6 before:w-px before:bg-linear-to-b before:from-brand-200 before:to-line last:pb-0 last:before:hidden"
                >
                  <span className="relative grid size-12 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft ring-1 ring-ink-100 transition-[box-shadow,color] duration-300 group-hover/item:text-brand-700 group-hover/item:shadow-lift">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                    <span
                      aria-hidden="true"
                      className="absolute -top-1 -right-1 size-2.5 rounded-full bg-vital-400 ring-2 ring-canvas"
                    />
                  </span>
                  <div className="pt-1">
                    <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink-950">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-500">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <ButtonLink href={siteConfig.demoUrl} variant="primary" size="lg" className="mt-12">
            {engagement.cta.label}
          </ButtonLink>
        </div>

        <EngagementPhone />
      </div>
    </Section>
  );
}

function EngagementBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-ink-200 to-transparent" />
      <div className="absolute inset-y-0 right-0 w-full bg-dot-grid opacity-70 [mask-image:radial-gradient(ellipse_75%_32%_at_50%_80%,black,transparent_72%)] lg:w-1/2 lg:[mask-image:radial-gradient(ellipse_80%_65%_at_55%_50%,black,transparent_72%)]" />
    </div>
  );
}
