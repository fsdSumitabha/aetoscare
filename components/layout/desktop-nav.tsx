import Link from "next/link";
import { ChevronDown } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { mainNav, type NavItem } from "@/lib/site";
import { ListPanel, NavDropdown, ServicesPanel } from "@/components/layout/nav-panels";
import { NavDisclosure } from "@/components/layout/nav-disclosure";

const linkBase =
  "inline-flex h-11 items-center rounded-full text-[0.9rem] font-medium tracking-[-0.01em] text-care-900/75 transition-colors duration-200 hover:bg-care-900/5 hover:text-care-950";

/** Micro-copy for the devices dropdown kicker (from the devices section copy). */
const DEVICES_KICKER = "4G cellular · No Wi-Fi needed";

/**
 * Primary navigation (lg+). Dropdown panels are server-rendered nested lists
 * inside each <li>, so every destination is in the HTML; a small client
 * island (NavDisclosure) only toggles their visibility.
 */
export function DesktopNav() {
  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        {mainNav.map((item) => (
          <DesktopNavItem key={item.href} item={item} />
        ))}
      </ul>
    </nav>
  );
}

function DesktopNavItem({ item }: { item: NavItem }) {
  const links = item.children ?? [];

  if (links.length === 0) {
    return (
      <li>
        <Link href={item.href} className={cn(linkBase, "px-3.5")}>
          {item.label}
        </Link>
      </li>
    );
  }

  const isMega = links.some((link) => Boolean(link.description));
  const panelId = `nav-panel${item.href.replace(/\//g, "-")}`;

  return (
    <NavDisclosure
      label={item.label}
      panelId={panelId}
      trigger={
        <Link
          href={item.href}
          className="inline-flex h-11 items-center rounded-full pr-1 pl-3.5 text-[0.9rem] font-medium tracking-[-0.01em]"
        >
          {item.label}
        </Link>
      }
      icon={
        <ChevronDown
          aria-hidden="true"
          className="size-3.5 opacity-70 transition-transform duration-200 group-data-open/item:rotate-180"
          strokeWidth={2.25}
        />
      }
    >
      <NavDropdown id={panelId} wide={isMega}>
        {isMega ? (
          <ServicesPanel item={item} links={links} />
        ) : (
          <ListPanel
            item={item}
            links={links}
            kicker={item.href === "/devices" ? DEVICES_KICKER : undefined}
          />
        )}
      </NavDropdown>
    </NavDisclosure>
  );
}
