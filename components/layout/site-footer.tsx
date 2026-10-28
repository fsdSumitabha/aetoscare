import Link from "next/link";
import type { LucideIcon } from "@/components/ui/icons";
import { ArrowRight, ArrowUp, Headset, Languages, Mail, Phone, ShieldCheck } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import {
  companyLinks,
  deviceLinks,
  legalLinks,
  serviceLinks,
  siteConfig,
  type NavLink,
} from "@/lib/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/ui/logo";
import { FooterBackdrop, FooterWatermark, PulseDivider } from "@/components/layout/footer-graphics";

const trustBadges: { label: string; icon: LucideIcon }[] = [
  { label: "HIPAA-compliant platform", icon: ShieldCheck },
  { label: "24/7/365 clinical team", icon: Headset },
  { label: "English & Spanish", icon: Languages },
];

/** Splits the tagline after its first sentence for the serif accent. */
function splitTagline(tagline: string): [string, string] {
  const end = tagline.indexOf(". ");
  return end === -1 ? [tagline, ""] : [tagline.slice(0, end + 1), tagline.slice(end + 2)];
}

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 text-white">
      <FooterBackdrop />

      <div className="relative container-page pt-20 sm:pt-24 lg:pt-28">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <FooterBrand className="lg:col-span-4" />

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)_minmax(0,1.1fr)] lg:col-span-8 xl:col-span-7 xl:col-start-6"
          >
            <FooterLinkColumn title="Company" links={companyLinks} />
            <FooterLinkColumn
              title="Services"
              links={serviceLinks}
              className="order-last col-span-2 sm:order-none sm:col-span-1"
            />
            <FooterLinkColumn title="Devices" links={deviceLinks} />
          </nav>
        </div>

        <PulseDivider className="mt-16 sm:mt-20" />

        <div className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
          <ul aria-label="Why practices choose AETOS" className="flex flex-wrap gap-2.5">
            {trustBadges.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-white/4 py-2 pr-3.5 pl-2.5 text-xs font-medium text-ink-100 ring-1 ring-white/10"
              >
                <Icon aria-hidden="true" className="size-4 text-vital-300" strokeWidth={2} />
                {label}
              </li>
            ))}
          </ul>
          <a
            href="#main-content"
            className="group/top inline-flex h-11 items-center gap-3 self-start rounded-full pr-1.5 pl-4 text-sm font-medium text-ink-200 ring-1 ring-white/10 transition-colors duration-200 hover:bg-white/5 hover:text-white md:self-auto"
          >
            Back to top
            <span aria-hidden="true" className="grid size-8 place-items-center rounded-full bg-white/10">
              <ArrowUp
                className="size-4 transition-transform duration-200 group-hover/top:-translate-y-0.5"
                strokeWidth={2.25}
              />
            </span>
          </a>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 pb-2 text-sm text-ink-300 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.legalName}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-ink-200 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs">EHR names are trademarks of their respective owners.</p>
        </div>
      </div>

      <FooterWatermark />
    </footer>
  );
}

/** Brand block: a single column on phones and lg+, two columns on tablets. */
function FooterBrand({ className }: { className?: string }) {
  const [taglineLead, taglineAccent] = splitTagline(siteConfig.tagline);

  return (
    <div className={cn("sm:grid sm:grid-cols-2 sm:items-end sm:gap-x-10 lg:block", className)}>
      <div>
        <Link
          href="/"
          aria-label={`${siteConfig.name} home`}
          className="inline-flex h-11 items-center rounded-lg [&>svg]:h-8"
        >
          <Logo className="text-white" eyeClassName="fill-vital-300" />
        </Link>

        <p className="mt-8 max-w-sm text-[1.75rem] leading-[1.1] font-semibold tracking-[-0.03em] text-white sm:text-3xl">
          {`${taglineLead} `}
          {taglineAccent ? (
            <span className="block accent-serif text-gradient-light">{taglineAccent}</span>
          ) : null}
        </p>
        <p className="mt-4 max-w-sm leading-relaxed text-ink-200">{siteConfig.summary}</p>
      </div>

      <div className="mt-8 sm:mt-0 lg:mt-8">
        <address className="not-italic">
          <ul className="grid gap-2">
            <li>
              <ContactLink href={`mailto:${siteConfig.email}`} label="Email" icon={Mail}>
                {siteConfig.email}
              </ContactLink>
            </li>
            <li>
              <ContactLink href={siteConfig.phone.href} label="Call" icon={Phone}>
                {siteConfig.phone.display}
              </ContactLink>
            </li>
          </ul>
        </address>

        <ButtonLink href={siteConfig.demoUrl} variant="vital" className="mt-8">
          Request a demo
        </ButtonLink>
      </div>
    </div>
  );
}

type ContactLinkProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  children: string;
};

function ContactLink({ href, label, icon: Icon, children }: ContactLinkProps) {
  return (
    <a
      href={href}
      className="group/contact inline-flex min-h-11 items-center gap-3 rounded-full pr-3 text-ink-100 transition-colors duration-200 hover:text-white"
    >
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-full bg-white/5 text-vital-300 ring-1 ring-white/10 transition-colors duration-200 group-hover/contact:bg-vital-300 group-hover/contact:text-ink-950"
      >
        <Icon className="size-4" strokeWidth={2} />
      </span>
      <span className="flex flex-col">
        <span className="font-mono text-[0.65rem] tracking-[0.16em] text-ink-300 uppercase">
          {label}
        </span>
        <span className="text-[0.95rem] font-medium tabular-nums">{children}</span>
      </span>
    </a>
  );
}

type FooterLinkColumnProps = {
  title: string;
  links: NavLink[];
  className?: string;
};

function FooterLinkColumn({ title, links, className }: FooterLinkColumnProps) {
  return (
    <div className={className}>
      <h2 className="flex items-center gap-2 font-mono text-xs font-medium tracking-[0.16em] text-ink-300 uppercase">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-vital-300/80" />
        {title}
      </h2>
      <ul className="mt-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group/fl relative inline-flex min-h-11 items-center py-1 text-[0.95rem] leading-snug text-ink-200 transition-colors duration-200 hover:text-white"
            >
              {link.label}
              {/* Out of flow so the hover arrow never forces a label to wrap. */}
              <ArrowRight
                aria-hidden="true"
                className="absolute top-1/2 left-full ml-1.5 size-3.5 -translate-x-1 -translate-y-1/2 text-vital-300 opacity-0 transition duration-200 group-hover/fl:translate-x-0 group-hover/fl:opacity-100"
                strokeWidth={2.25}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
