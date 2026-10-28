import { HandCoins, Mail, ShieldCheck, Stethoscope, type LucideIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { LogoMark } from "@/components/ui/logo";
import { finalCta } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";
import { CtaBackdrop, CtaRings } from "./cta-graphics";

const trustItems: { label: string; icon: LucideIcon }[] = [
  { label: "HIPAA-compliant", icon: ShieldCheck },
  { label: "24/7/365 clinical team", icon: Stethoscope },
  { label: "Performance-based model", icon: HandCoins },
];

/** Closing call to action: a contained dark card on the light page. */
export function CtaSection() {
  return (
    <Section
      tone="light"
      id={finalCta.id}
      labelledBy="get-started-title"
      // `!` keeps these deterministic over Section's default padding (cn does not merge).
      className="py-16! sm:py-20! lg:py-24!"
    >
      <div className="relative isolate overflow-hidden rounded-5xl bg-ink-950 px-6 pt-16 pb-36 text-white shadow-lift sm:px-12 sm:pt-20 sm:pb-40 lg:px-16 lg:pt-24 lg:pb-44">
        <CtaBackdrop />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <div
            aria-hidden="true"
            className="glass-dark relative grid size-16 place-items-center rounded-full shadow-[0_0_48px_-6px_rgb(43_120_255/0.6)]"
          >
            <span className="absolute inset-0 animate-ping-slow rounded-full ring-1 ring-vital-300/50" />
            <LogoMark className="size-8 text-white" eyeClassName="fill-vital-300" />
          </div>

          <div className="relative mt-9 w-full">
            <CtaRings />
            <SectionHeading
              id="get-started-title"
              tone="dark"
              align="center"
              titleLead={finalCta.titleLead}
              titleAccent={finalCta.titleAccent}
              description={finalCta.description}
            />
          </div>

          <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
            <ButtonLink href={siteConfig.demoUrl} variant="vital" size="lg">
              {finalCta.primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={`mailto:${siteConfig.email}`}
              variant="ghost-dark"
              size="lg"
              withIcon={false}
            >
              <Mail aria-hidden="true" className="size-4" strokeWidth={2.25} />
              Email our team
            </ButtonLink>
          </div>

          {/* Mobile: one centred column with the icons aligned; sm+: a single wrapping row. */}
          <ul className="mt-12 grid w-full max-w-2xl justify-center gap-3.5 border-t border-white/10 pt-8 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-4">
            {trustItems.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2.5 text-sm font-medium text-ink-200"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/5 text-vital-300 ring-1 ring-white/10">
                  <Icon aria-hidden="true" className="size-3.5" strokeWidth={2.25} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
