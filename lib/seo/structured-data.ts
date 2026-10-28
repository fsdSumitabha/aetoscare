import { faq } from "@/lib/content/home";
import { serviceLinks, siteConfig } from "@/lib/site";

const ORG_ID = `${siteConfig.url}/#organization`;
const WEBSITE_ID = `${siteConfig.url}/#website`;
const WEBPAGE_ID = `${siteConfig.url}/#webpage`;

const absolute = (path: string) => new URL(path, siteConfig.url).toString();

/**
 * schema.org graph for the home page: the organisation, the website, the page
 * itself (services are listed in the organisation's offer catalog), and the
 * FAQ rendered on the page.
 */
export function buildHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalOrganization",
        "@id": ORG_ID,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        alternateName: siteConfig.legalName,
        url: siteConfig.url,
        // Google requires a logo of at least 112×112 px: use the square brand mark.
        logo: {
          "@type": "ImageObject",
          url: absolute("/apple-icon"),
          width: 180,
          height: 180,
        },
        image: absolute("/logo.svg"),
        description: siteConfig.description,
        slogan: siteConfig.tagline,
        email: siteConfig.email,
        telephone: siteConfig.phone.e164,
        areaServed: { "@type": "Country", name: "United States" },
        knowsLanguage: ["en", "es"],
        knowsAbout: [
          "Remote Patient Monitoring",
          "Chronic Care Management",
          "Principal Care Management",
          "Transitional Care Management",
          "Remote Therapeutic Monitoring",
          "Behavioral Health Integration",
          "Care Coordination",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: siteConfig.email,
            telephone: siteConfig.phone.e164,
            areaServed: "US",
            availableLanguage: ["English", "Spanish"],
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Remote care management services",
          itemListElement: serviceLinks.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.label,
              description: service.description,
              url: absolute(service.href),
              provider: { "@id": ORG_ID },
              areaServed: "US",
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: "en-US",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "WebPage",
        "@id": WEBPAGE_ID,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: "en-US",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absolute("/opengraph-image"),
        },
        dateModified: siteConfig.lastUpdated,
      },
      {
        "@type": "FAQPage",
        "@id": `${siteConfig.url}/#faq`,
        isPartOf: { "@id": WEBPAGE_ID },
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}
