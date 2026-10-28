import type { ReactNode } from "react";
import { ArrowRight, ChevronDown, Mail, Menu, Phone, X } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { mainNav, siteConfig, type NavItem } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button-link";
import { Logo } from "@/components/ui/logo";
import { BrandRings } from "@/components/layout/brand-rings";
import { NavIcon } from "@/components/layout/nav-icon";

const MENU_ID = "mobile-menu";

const sheetClasses = cn(
  // Reset the UA popover box to a full-screen sheet.
  "inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 p-0",
  "overflow-x-hidden overflow-y-auto overscroll-contain bg-ink-950 text-white backdrop:bg-transparent",
  // Hidden unless open — this also keeps it hidden where popovers are unsupported.
  "hidden open:block lg:open:hidden",
  // Entry/exit fade + lift; degrades to an instant toggle without @starting-style.
  "-translate-y-3 opacity-0 open:translate-y-0 open:opacity-100 starting:open:-translate-y-3 starting:open:opacity-0",
  "transition-[opacity,translate,display,overlay] transition-discrete duration-300 ease-out",
);

const iconButton =
  "grid size-11 shrink-0 place-items-center rounded-full text-white ring-1 ring-white/15 transition-colors duration-200";

/**
 * Mobile menu (below lg), no client JS. Browsers with Invoker Commands open the
 * sheet as a modal <dialog> (page behind is inert, so Tab stays inside it);
 * older browsers fall back to the Popover API via popoverTarget.
 * Opening focuses the Close button (autofocus); Esc, Android back and Close
 * dismiss it and focus returns to the trigger.
 * Links are plain <a> on purpose: the header lives in the root layout, so a
 * soft next/link navigation would leave this top-layer sheet open on the new
 * page. A document navigation always dismisses it.
 */
export function MobileNav() {
  return (
    <>
      <button
        type="button"
        command="show-modal"
        commandfor={MENU_ID}
        popoverTarget={MENU_ID}
        aria-label="Open menu"
        className={cn(iconButton, "bg-care-900/5 text-care-950! ring-care-900/10! hover:bg-care-900/10 lg:hidden")}
      >
        <Menu aria-hidden="true" className="size-5" strokeWidth={2} />
      </button>

      <dialog id={MENU_ID} popover="auto" closedby="any" aria-label="Menu" className={sheetClasses}>
        <div className="relative isolate flex min-h-full flex-col">
          <SheetBackdrop />

          {/* Sticky so Close stays reachable after expanding a long group. */}
          <div className="sticky top-0 z-10 pt-3 sm:pt-4">
            {/* Frosted layer that fades out at its lower edge, so rows dissolve under the bar. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-ink-950/40 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]"
            />
            <div className="container-page">
              <div className="flex h-16 items-center justify-between pr-2.5 pl-3 sm:pl-4">
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- a document navigation is what closes the popover (see MobileNav). */}
                <a
                  href="/"
                  aria-label={`${siteConfig.name} home`}
                  className="inline-flex h-11 items-center rounded-full px-2 [&>svg]:h-6"
                >
                  <Logo className="text-white" eyeClassName="fill-vital-300" />
                </a>
                <button
                  type="button"
                  command="close"
                  commandfor={MENU_ID}
                  popoverTarget={MENU_ID}
                  popoverTargetAction="hide"
                  aria-label="Close menu"
                  autoFocus
                  className={cn(iconButton, "bg-white/10 hover:bg-white/15")}
                >
                  <X aria-hidden="true" className="size-5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          <nav aria-label="Mobile" className="container-page mt-6 flex-1">
            <p
              aria-hidden="true"
              className="font-mono text-[0.68rem] tracking-[0.18em] text-ink-300 uppercase"
            >
              Menu
            </p>
            <ul className="mt-3 border-t border-white/10">
              {mainNav.map((item, index) => (
                <MobileNavItem key={item.href} item={item} index={index} />
              ))}
            </ul>
          </nav>

          <div className="container-page mt-10 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <ButtonLink href={siteConfig.demoUrl} variant="vital" size="lg" className="w-full">
              Request a demo
            </ButtonLink>
            <address className="mt-3 grid gap-2 not-italic sm:grid-cols-2">
              <ContactCard href={`mailto:${siteConfig.email}`} label="Email" icon={<Mail />}>
                {siteConfig.email}
              </ContactCard>
              <ContactCard href={siteConfig.phone.href} label="Call" icon={<Phone />}>
                {siteConfig.phone.display}
              </ContactCard>
            </address>
            <p className="mt-8 text-center font-mono text-[0.68rem] tracking-[0.16em] text-ink-300 uppercase">
              {siteConfig.tagline}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}

const rowClasses =
  "flex min-h-16 items-center gap-3 py-3 text-[1.625rem] leading-tight font-semibold tracking-[-0.03em]";

function RowIndex({ index }: { index: number }) {
  return (
    <span
      aria-hidden="true"
      className="w-7 shrink-0 font-mono text-xs font-normal tracking-normal text-ink-300 tabular-nums"
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

function MobileNavItem({ item, index }: { item: NavItem; index: number }) {
  const links = item.children ?? [];

  if (links.length === 0) {
    return (
      <li className="border-b border-white/10">
        <a href={item.href} className={cn(rowClasses, "group/row")}>
          <RowIndex index={index} />
          <span className="flex-1">{item.label}</span>
          <ArrowRight
            aria-hidden="true"
            className="size-5 text-white/40 transition duration-200 group-hover/row:translate-x-0.5 group-hover/row:text-vital-300"
            strokeWidth={2}
          />
        </a>
      </li>
    );
  }

  return (
    <li className="border-b border-white/10">
      <details className="group/item">
        <summary className={cn(rowClasses, "cursor-pointer list-none")}>
          <RowIndex index={index} />
          <span className="flex-1">{item.label}</span>
          <span aria-hidden="true" className="font-mono text-xs font-normal tracking-normal text-ink-300">
            {links.length}
          </span>
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-full bg-white/5 ring-1 ring-white/10 transition-colors duration-200 group-open/item:bg-vital-300 group-open/item:text-ink-950 group-open/item:ring-vital-300"
          >
            <ChevronDown
              className="size-4 transition-transform duration-300 group-open/item:rotate-180"
              strokeWidth={2.25}
            />
          </span>
        </summary>
        <div className="pb-5">
          <ul className="grid gap-0.5 rounded-3xl bg-white/4 p-2 ring-1 ring-white/10">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="flex min-h-12 items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors duration-200 hover:bg-white/5"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/5 text-vital-300 ring-1 ring-white/10">
                    <NavIcon href={link.href} className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.95rem] font-medium text-white">{link.label}</span>
                    {link.description ? (
                      <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink-300">
                        {link.description}
                      </span>
                    ) : null}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={item.href}
            className="mt-2 flex min-h-11 items-center justify-between rounded-2xl px-4 text-sm font-semibold text-vital-300 transition-colors duration-200 hover:bg-white/5"
          >
            All {item.label.toLowerCase()}
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={2.25} />
          </a>
        </div>
      </details>
    </li>
  );
}

type ContactCardProps = {
  href: string;
  label: string;
  icon: ReactNode;
  children: ReactNode;
};

function ContactCard({ href, label, icon, children }: ContactCardProps) {
  return (
    <a
      href={href}
      className="flex min-h-14 items-center gap-3 rounded-2xl bg-white/4 px-4 py-3 ring-1 ring-white/10 transition-colors duration-200 hover:bg-white/8"
    >
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-full bg-white/5 text-vital-300 ring-1 ring-white/10 [&>svg]:size-4"
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[0.65rem] tracking-[0.16em] text-ink-300 uppercase">
          {label}
        </span>
        <span className="block truncate text-sm font-medium text-white">{children}</span>
      </span>
    </a>
  );
}

/** Dot grid, aurora glow and brand rings behind the sheet (decorative). */
function SheetBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid-dark [mask-image:linear-gradient(to_bottom,#000,transparent_75%)]" />
      <div className="absolute -top-40 -right-32 size-112 animate-aurora rounded-full bg-brand-600/30 blur-3xl" />
      <div className="absolute -bottom-32 -left-40 size-96 animate-aurora rounded-full bg-vital-400/15 blur-3xl" />
      <BrandRings className="absolute top-20 -right-48 size-120 text-white/7" />
    </div>
  );
}
