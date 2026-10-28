import type { LucideIcon } from "@/components/ui/icons";
import {
  Brain,
  CalendarCheck,
  CircleGauge,
  ClipboardPlus,
  Droplet,
  HeartPulse,
  HousePlus,
  PersonStanding,
  Plus,
  ScanHeart,
  Stethoscope,
  Weight,
  Wind,
} from "@/components/ui/icons";

/** Icon for each service / device route, shared by the desktop and mobile navs. */
const iconsByHref: Record<string, LucideIcon> = {
  "/services/remote-patient-monitoring": ScanHeart,
  "/services/chronic-care-management": ClipboardPlus,
  "/services/principal-care-management": Stethoscope,
  "/services/transitional-care-management": HousePlus,
  "/services/remote-therapeutic-monitoring": PersonStanding,
  "/services/behavioral-health-integration": Brain,
  "/services/care-coordination": CalendarCheck,
  "/devices/blood-pressure-monitor": CircleGauge,
  "/devices/glucometer": Droplet,
  "/devices/pulse-oximeter": HeartPulse,
  "/devices/weight-scale": Weight,
  "/devices/spirometer": Wind,
};

type NavIconProps = {
  href: string;
  className?: string;
};

/** Decorative icon for a nav destination (falls back to a crosshair "+"). */
export function NavIcon({ href, className }: NavIconProps) {
  const Icon = iconsByHref[href] ?? Plus;
  return <Icon aria-hidden="true" focusable="false" className={className} strokeWidth={1.75} />;
}
