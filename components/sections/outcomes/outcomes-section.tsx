import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { OutcomeStat } from "@/components/sections/outcomes/outcome-stat";
import { OutcomesBackdrop, OutcomesEcg } from "@/components/sections/outcomes/outcomes-backdrop";
import { outcomes } from "@/lib/content/home";

const HEADING_ID = "outcomes-title";

/** Outcomes: data-art band of average patient improvements. */
export function OutcomesSection() {
  return (
    <Section
      tone="dark"
      id={outcomes.id}
      labelledBy={HEADING_ID}
      background={<OutcomesBackdrop />}
    >
      <SectionHeading
        id={HEADING_ID}
        eyebrow={outcomes.eyebrow}
        titleLead={outcomes.titleLead}
        titleAccent={outcomes.titleAccent}
        description={outcomes.description}
        align="center"
        tone="dark"
      />

      <div className="relative mt-14 sm:mt-16 lg:mt-20">
        {/*
          Full-bleed ECG whose baseline runs along a row gutter: between rows 3|4 (1 col),
          1|2 (2 cols) and 1|2 (3 cols). Painted before the cards, so it glows through the glass.
        */}
        <OutcomesEcg className="absolute top-1/2 left-1/2 h-56 w-screen -translate-x-1/2 -translate-y-[55%] sm:top-1/3 sm:h-72 lg:top-1/2" />

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {outcomes.stats.map((stat, index) => (
            <OutcomeStat key={stat.key} stat={stat} index={index} />
          ))}
        </dl>
      </div>
    </Section>
  );
}
