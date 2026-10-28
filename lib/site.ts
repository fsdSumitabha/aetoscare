export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

export const siteConfig = {
  name: "AETOS",
  legalName: "Aetos Health",
  url: "https://aetoscare.com",
  title: "AETOS | Remote Patient Monitoring & Chronic Care Management",
  shortTitle: "AETOS",
  description:
    "AETOS runs Remote Patient Monitoring (RPM) and Chronic Care Management (CCM) for practices: first device free, EHR-integrated platform, 24/7 clinical team.",
  tagline: "Innovative care. Anytime, anywhere.",
  summary:
    "Enhance your remote care strategy with our suite of medical devices, EHR-integrated software, and dedicated 24/7 clinical team.",
  email: "info@aetoscare.com",
  phone: {
    display: "+1 (682) 416-3535",
    href: "tel:+16824163535",
    e164: "+1-682-416-3535",
  },
  demoUrl: "https://calendly.com/praveen-aetoscare/30min",
  locale: "en_US",
  /** Bump when home-page content changes; used by sitemap.xml. */
  lastUpdated: "2026-10-28",
  /** Inlined at build time from next.config.ts. */
  copyrightYear: process.env.BUILD_YEAR ?? "2026",
} as const;

export const serviceLinks: NavLink[] = [
  {
    label: "Remote Patient Monitoring",
    href: "/services/remote-patient-monitoring",
    description: "Cellular devices + 24/7 clinical review of every reading.",
  },
  {
    label: "Chronic Care Management",
    href: "/services/chronic-care-management",
    description: "Monthly RN-led care plans for patients with chronic conditions.",
  },
  {
    label: "Principal Care Management",
    href: "/services/principal-care-management",
    description: "Focused support for a single high-risk chronic condition.",
  },
  {
    label: "Transitional Care Management",
    href: "/services/transitional-care-management",
    description: "Safer hand-offs in the 30 days after discharge.",
  },
  {
    label: "Remote Therapeutic Monitoring",
    href: "/services/remote-therapeutic-monitoring",
    description: "Track therapy adherence and response between visits.",
  },
  {
    label: "Behavioral Health Integration",
    href: "/services/behavioral-health-integration",
    description: "Integrated behavioral care alongside primary care.",
  },
  {
    label: "Care Coordination",
    href: "/services/care-coordination",
    description: "Scheduling, education and follow-through handled for you.",
  },
];

export const deviceLinks: NavLink[] = [
  { label: "Blood Pressure Monitor", href: "/devices/blood-pressure-monitor" },
  { label: "Glucometer", href: "/devices/glucometer" },
  { label: "Pulse Oximeter", href: "/devices/pulse-oximeter" },
  { label: "Weight Scale", href: "/devices/weight-scale" },
  { label: "Spirometer", href: "/devices/spirometer" },
];

export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Patients", href: "/patients" },
  { label: "Services", href: "/services", children: serviceLinks },
  { label: "Devices", href: "/devices", children: deviceLinks },
  { label: "Contact", href: "/contact" },
];

export const companyLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "For Patients", href: "/patients" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

/** True for links that leave the site (rendered as <a target="_blank">). */
export function isExternal(href: string): boolean {
  return /^(https?:)?\/\//.test(href);
}
