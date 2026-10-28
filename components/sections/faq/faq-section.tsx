import { Headset, Mail, Phone } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button-link";
import { LogoMark } from "@/components/ui/logo";
import { faq } from "@/lib/content/home";
import { siteConfig } from "@/lib/site";
import { FaqItem } from "./faq-item";

/**
 * Frequently asked questions as an exclusive, JavaScript-free accordion.
 * The FAQPage JSON-LD is generated in app/page.tsx from the same `faq` data.
 */
export function FaqSection() {
  return (
    <Section tone="light" id={faq.id} labelledBy="faq-title" background={<FaqBackdrop />}>
      {/* Source order is heading → questions → contact card, so on mobile the answers
          come first. At lg the card moves under the heading and stays in view. */}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 xl:gap-x-24">
        <SectionHeading
          id="faq-title"
          eyebrow={faq.eyebrow}
          titleLead={faq.titleLead}
          titleAccent={faq.titleAccent}
          description={faq.description}
          className="lg:col-start-1 lg:row-start-1"
        />

        <div className="flex flex-col gap-3 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          {faq.items.map((item, index) => (
            <FaqItem
              key={item.question}
              group="faq"
              index={index}
              question={item.question}
              answer={item.answer}
              defaultOpen={index === 0}
            />
          ))}
        </div>

        <FaqContactCard className="lg:sticky lg:top-32 lg:col-start-1 lg:row-start-2 lg:self-start" />
      </div>
    </Section>
  );
}

const contactLinkClasses =
  "group/link inline-flex min-h-11 items-center gap-3 rounded-xl pr-2 text-[0.95rem] font-medium text-ink-900 transition-colors hover:text-brand-700";

const contactIconClasses =
  "grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors group-hover/link:bg-brand-600 group-hover/link:text-white group-hover/link:ring-brand-600";

function FaqContactCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative isolate w-full max-w-md overflow-hidden rounded-4xl bg-white p-6 shadow-soft ring-1 ring-ink-100 sm:p-7 md:max-w-none lg:max-w-md",
        className,
      )}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-brand-400 to-transparent" />
        <div className="absolute -top-16 -right-16 size-52 rounded-full bg-brand-100/60 blur-2xl" />
        <svg
          viewBox="-100 -100 200 200"
          fill="none"
          focusable="false"
          className="absolute -top-14 -right-14 size-48 text-ink-900"
        >
          <g stroke="currentColor">
            <circle r="40" strokeOpacity="0.08" />
            <circle r="65" strokeOpacity="0.07" />
            <circle r="92" strokeOpacity="0.05" />
            <path d="M-100 0H-50M50 0H100M0 -100V-50M0 50V100" strokeOpacity="0.1" strokeDasharray="2 5" />
          </g>
        </svg>
        <LogoMark
          className="absolute top-3.5 right-3.5 size-10 text-ink-900/10 md:max-lg:hidden"
          eyeClassName="fill-brand-500/40"
        />
      </div>

      {/* Tablet: full-width card with copy left and contact actions right. */}
      <div className="md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-x-12 lg:block">
        <div>
          <div className="flex items-center gap-3.5">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-ink-950 text-vital-300">
              <Headset aria-hidden="true" className="size-5" strokeWidth={1.75} />
            </span>
            <h3 className="text-lg font-semibold tracking-[-0.015em] text-ink-950">
              Still have questions?
            </h3>
          </div>
          <p className="mt-4 max-w-sm text-[0.95rem] leading-relaxed text-ink-500">
            Talk with our team about launching RPM and CCM at your practice.
          </p>
        </div>

        <div className="mt-5 md:mt-0 lg:mt-5">
          <ContactActions />
        </div>
      </div>
    </div>
  );
}

function ContactActions() {
  return (
    <>
      <ul className="flex flex-col gap-1.5">
        <li>
          <a href={`mailto:${siteConfig.email}`} className={contactLinkClasses}>
            <span className={contactIconClasses}>
              <Mail aria-hidden="true" className="size-4" strokeWidth={2} />
            </span>
            <span className="underline decoration-ink-200 underline-offset-4 transition-colors group-hover/link:decoration-brand-400">
              <span className="sr-only">Email </span>
              {siteConfig.email}
            </span>
          </a>
        </li>
        <li>
          <a href={siteConfig.phone.href} className={contactLinkClasses}>
            <span className={contactIconClasses}>
              <Phone aria-hidden="true" className="size-4" strokeWidth={2} />
            </span>
            <span className="font-mono text-[0.9rem] tabular-nums">
              <span className="sr-only">Call </span>
              {siteConfig.phone.display}
            </span>
          </a>
        </li>
      </ul>

      <ButtonLink href={siteConfig.demoUrl} variant="secondary" className="mt-6">
        Request a demo
      </ButtonLink>
    </>
  );
}

function FaqBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-x-0 top-0 h-[34rem] bg-dot-grid [mask-image:radial-gradient(ellipse_55%_75%_at_12%_0%,black,transparent_72%)]" />
      <div className="absolute top-24 -left-40 size-[28rem] rounded-full bg-brand-100/50 blur-3xl" />
    </div>
  );
}
