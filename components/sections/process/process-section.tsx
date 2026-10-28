import {
  BadgeDollarSign,
  HeartPulse,
  Megaphone,
  Signature,
  Truck,
  type LucideIcon,
} from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { hero, process, reimbursement } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";
import { ProcessDial } from "./process-dial";
import { ProcessStep } from "./process-step";

/** Inform · Obtain consent · Dispatch devices · Monitor · Secure reimbursement. */
const stepIcons: readonly LucideIcon[] = [Megaphone, Signature, Truck, HeartPulse, BadgeDollarSign];

/** Unique CPT codes AETOS documents for, in billing order. */
const billingCodes: readonly string[] = Array.from(
  new Set<string>([
    reimbursement.rpm.onboarding.code,
    ...reimbursement.rpm.lines.map((line) => line.code),
    ...reimbursement.ccm.lines.map((line) => line.code),
  ]),
);

/**
 * How it works: a sticky intro column beside the five onboarding steps,
 * connected by a brand → vital timeline that ends on the reimbursement payoff.
 * The section id ("how-it-works") is the hero's secondary CTA target.
 */
export function ProcessSection() {
  return (
    <Section
      tone="light"
      id={process.id}
      labelledBy="how-it-works-title"
      background={<ProcessBackdrop />}
    >
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="how-it-works-title"
              eyebrow={process.eyebrow}
              titleLead={process.titleLead}
              titleAccent={process.titleAccent}
              description={process.description}
            />
            <ButtonLink href={siteConfig.demoUrl} variant="primary" size="lg" className="mt-9">
              {hero.primaryCta.label}
            </ButtonLink>
            <ProcessDial steps={process.steps.length} className="mt-14 hidden lg:block" />
          </div>
        </div>

        <ol className="grid grid-cols-1 gap-6 lg:col-span-7">
          {process.steps.map((step, index) => (
            <ProcessStep
              key={step.title}
              index={index}
              total={process.steps.length}
              title={step.title}
              description={step.description}
              icon={stepIcons[index] ?? Megaphone}
              billingCodes={billingCodes}
            />
          ))}
        </ol>
      </div>
    </Section>
  );
}

function ProcessBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute top-0 left-0 h-160 w-3xl max-w-full bg-dot-grid [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
      <div className="absolute right-0 bottom-0 h-96 w-2xl max-w-full rounded-full bg-linear-to-tl from-vital-100/60 to-transparent blur-3xl" />
    </div>
  );
}
