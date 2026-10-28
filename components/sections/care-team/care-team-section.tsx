import { careTeam } from "@/lib/content/home";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CareTeamBackdrop } from "./care-team-backdrop";
import { EscalationFlow } from "./escalation-flow";
import { CareCard } from "./care-card";
import { CliniciansVisual } from "./clinicians-visual";
import { PlatformPreview } from "./platform-preview";

const TITLE_ID = "care-team-title";

/** Who oversees the data: escalation workflow, the clinical team and the platform. */
export function CareTeamSection() {
  return (
    <Section tone="dark" id={careTeam.id} labelledBy={TITLE_ID} background={<CareTeamBackdrop />}>
      <SectionHeading
        id={TITLE_ID}
        tone="dark"
        align="center"
        eyebrow={careTeam.eyebrow}
        titleLead={careTeam.titleLead}
        titleAccent={careTeam.titleAccent}
        description={careTeam.description}
      />

      <EscalationFlow className="mt-14 lg:mt-20" />

      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr]">
        <CareCard
          titleId="care-team-clinicians-title"
          title={careTeam.team.title}
          points={careTeam.team.points}
          visual={<CliniciansVisual className="h-full" />}
          glow="vital"
        />
        <CareCard
          titleId="care-team-platform-title"
          title={careTeam.platform.title}
          description={careTeam.platform.description}
          points={careTeam.platform.points}
          visual={<PlatformPreview className="h-full" />}
          glow="brand"
        />
      </div>
    </Section>
  );
}
