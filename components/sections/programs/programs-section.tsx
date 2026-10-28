import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { programs } from "@/lib/content/home";
import { serviceLinks } from "@/lib/site";
import { ProgramCard } from "./program-card";

const programHrefs: ReadonlySet<string> = new Set(programs.items.map((item) => item.href));
const moreServices = serviceLinks.filter((link) => !programHrefs.has(link.href));

const MORE_SERVICES_LABEL_ID = "programs-more-services";

/**
 * Programs: RPM and CCM side by side as three-step explainers, followed by
 * links to the other care management services AETOS offers.
 */
export function ProgramsSection() {
  return (
    <Section
      tone="canvas"
      id={programs.id}
      labelledBy="programs-title"
      background={<ProgramsBackdrop />}
    >
      <SectionHeading
        id="programs-title"
        align="center"
        eyebrow={programs.eyebrow}
        titleLead={programs.titleLead}
        titleAccent={programs.titleAccent}
        description={programs.description}
      />

      <div className="mt-14 grid grid-cols-1 gap-5 sm:mt-16 lg:grid-cols-2 lg:gap-6">
        {programs.items.map((item) => (
          <ProgramCard key={item.key} item={item} />
        ))}
      </div>

      <div className="mt-14 flex flex-col items-center gap-5 sm:mt-16">
        <p
          id={MORE_SERVICES_LABEL_ID}
          className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.16em] text-ink-500 uppercase"
        >
          <span aria-hidden="true" className="h-px w-8 bg-linear-to-r from-transparent to-ink-300" />
          {programs.moreServicesLabel}
          <span aria-hidden="true" className="h-px w-8 bg-linear-to-l from-transparent to-ink-300" />
        </p>
        <ul
          aria-labelledby={MORE_SERVICES_LABEL_ID}
          className="flex max-w-4xl flex-wrap justify-center gap-2.5"
        >
          {moreServices.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className="group/pill inline-flex min-h-11 items-center gap-2.5 rounded-full bg-white py-1.5 pr-1.5 pl-4 text-sm font-medium text-ink-800 shadow-soft ring-1 ring-ink-200 transition duration-200 hover:-translate-y-0.5 hover:text-brand-700 hover:shadow-lift hover:ring-brand-300"
              >
                {service.label}
                <span
                  aria-hidden="true"
                  className="flex size-8 items-center justify-center rounded-full bg-ink-50 text-ink-500 ring-1 ring-ink-100 transition-colors duration-200 group-hover/pill:bg-brand-600 group-hover/pill:text-white group-hover/pill:ring-brand-600"
                >
                  <ArrowRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-200 group-hover/pill:translate-x-px"
                    strokeWidth={2.25}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function ProgramsBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-line-grid opacity-80 mask-spotlight" />
      <div className="absolute top-1/3 left-1/2 h-112 w-5xl max-w-full -translate-x-1/2 rounded-full bg-linear-to-r from-brand-200/45 via-transparent to-vital-200/45 blur-3xl" />
    </div>
  );
}
