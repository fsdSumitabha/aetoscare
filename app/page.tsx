import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { HeroDawn } from "@/components/sections/hero-concepts/dawn/hero-dawn";
import { IntegrationsSection } from "@/components/sections/integrations/integrations-section";
import { ValuePropsSection } from "@/components/sections/value-props/value-props-section";
import { ProgramsSection } from "@/components/sections/programs/programs-section";
import { DevicesSection } from "@/components/sections/devices/devices-section";
import { CareTeamSection } from "@/components/sections/care-team/care-team-section";
import { ReimbursementSection } from "@/components/sections/reimbursement/reimbursement-section";
import { OutcomesSection } from "@/components/sections/outcomes/outcomes-section";
import { EngagementSection } from "@/components/sections/engagement/engagement-section";
import { ProcessSection } from "@/components/sections/process/process-section";
import { FaqSection } from "@/components/sections/faq/faq-section";
import { CtaSection } from "@/components/sections/cta/cta-section";
import { buildHomeJsonLd } from "@/lib/seo/structured-data";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: siteConfig.title },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildHomeJsonLd()} />
      <HeroDawn />
      <IntegrationsSection />
      <ValuePropsSection />
      <ProgramsSection />
      <ProcessSection />
      <DevicesSection />
      <CareTeamSection />
      <ReimbursementSection />
      <OutcomesSection />
      <EngagementSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
