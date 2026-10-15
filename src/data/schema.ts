// Strukturierte Daten (JSON-LD). Werte kommen aus site.ts und pakete.ts,
// damit Schema, Impressum und Seiteninhalt immer übereinstimmen.

import { site } from "./site";
import type { Paket } from "./pakete";

const ORG_ID = `${site.url}/#organisation`;
const WEBSITE_ID = `${site.url}/#website`;
const PERSON_ID = `${site.url}/#sandin-jagurdzija`;

export const organisation = () => ({
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: site.name,
  alternateName: "VistaFlows – Websites, SEO & GEO und 360°-Rundgänge",
  description:
    "VistaFlows baut Websites für lokale Unternehmen und macht sie sichtbar: lokale SEO, GEO für KI-Suchsysteme, Anfrage-Automatisierung mit n8n und 360°-Rundgänge. Inhaber ist Sandin Jagurdzija, Sitz in Bottrop.",
  url: `${site.url}/`,
  email: site.email,
  telephone: site.phone.e164.replace(/^\+49/, "+49 "),
  logo: `${site.url}/logo/vistaflows-logo-512.png`,
  image: `${site.url}/og/start.png`,
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Überweisung",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.zip,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: site.address.countryCode,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.latitude, longitude: site.geo.longitude },
  openingHoursSpecification: site.hours.schema.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
  founder: { "@id": PERSON_ID },
  areaServed: [
    ...site.onSiteArea.map((name) => ({ "@type": "City", name })),
    { "@type": "AdministrativeArea", name: "Ruhrgebiet" },
    { "@type": "Country", name: "Deutschland" },
  ],
  knowsAbout: [
    "Webdesign",
    "Website-Entwicklung",
    "Suchmaschinenoptimierung",
    "Lokale SEO",
    "Generative Engine Optimization",
    "KI-Sichtbarkeit",
    "Google Unternehmensprofil",
    "Strukturierte Daten",
    "360-Grad-Rundgang",
    "Virtueller Rundgang",
    "Workflow-Automatisierung mit n8n",
  ],
  sameAs: site.social.map((s) => s.url),
});

export const person = () => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.owner,
  jobTitle: "Gründer und Inhaber von VistaFlows",
  worksFor: { "@id": ORG_ID },
  image: `${site.url}/og/ueber-mich.png`,
  address: { "@type": "PostalAddress", addressLocality: site.address.city, addressCountry: site.address.countryCode },
  knowsAbout: ["Webdesign", "SEO", "GEO", "360-Grad-Rundgänge", "n8n"],
  sameAs: site.social.map((s) => s.url),
});

export const website = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${site.url}/`,
  name: site.name,
  inLanguage: "de-DE",
  publisher: { "@id": ORG_ID },
});

export type Crumb = { name: string; href: string };

export const breadcrumbs = (items: Crumb[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: `${site.url}${c.href === "/" ? "/" : c.href}`,
  })),
});

const offer = (p: Paket) => {
  const base: Record<string, unknown> = {
    "@type": "Offer",
    name: p.name,
    description: p.kurz,
    priceCurrency: "EUR",
    url: `${site.url}/preise#${p.gruppe}`,
    seller: { "@id": ORG_ID },
  };
  if (p.intervall === "monatlich") {
    base.priceSpecification = {
      "@type": "UnitPriceSpecification",
      price: p.betrag,
      priceCurrency: "EUR",
      unitText: "Monat",
      referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
      valueAddedTaxIncluded: false,
    };
    base.price = p.betrag;
  } else if (p.ab) {
    base.priceSpecification = {
      "@type": "PriceSpecification",
      minPrice: p.betrag,
      priceCurrency: "EUR",
      valueAddedTaxIncluded: false,
    };
  } else {
    base.price = p.betrag;
  }
  return base;
};

export const service = (opts: { name: string; serviceType: string; description: string; url: string; pakete?: Paket[]; area?: "region" | "de" }) => ({
  "@type": "Service",
  name: opts.name,
  serviceType: opts.serviceType,
  description: opts.description,
  url: `${site.url}${opts.url}`,
  provider: { "@id": ORG_ID },
  areaServed:
    opts.area === "region"
      ? [{ "@type": "AdministrativeArea", name: "Ruhrgebiet" }, { "@type": "State", name: "Nordrhein-Westfalen" }]
      : { "@type": "Country", name: "Deutschland" },
  ...(opts.pakete && opts.pakete.length
    ? {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: opts.name,
          itemListElement: opts.pakete.map(offer),
        },
      }
    : {}),
});

export type FaqEntry = { q: string; a: string };

export const faqPage = (entries: FaqEntry[]) => ({
  "@type": "FAQPage",
  mainEntity: entries.map((e) => ({
    "@type": "Question",
    name: e.q,
    acceptedAnswer: { "@type": "Answer", text: e.a },
  })),
});

export const article = (opts: { title: string; description: string; url: string; published: string; updated: string; image: string }) => ({
  "@type": "Article",
  headline: opts.title,
  description: opts.description,
  url: `${site.url}${opts.url}`,
  mainEntityOfPage: `${site.url}${opts.url}`,
  datePublished: opts.published,
  dateModified: opts.updated,
  inLanguage: "de-DE",
  image: `${site.url}${opts.image}`,
  author: { "@id": PERSON_ID },
  publisher: { "@id": ORG_ID },
});

/** Ein @graph pro Seite: Organisation, Website und die seitenspezifischen Knoten. */
export const graph = (nodes: object[]) =>
  JSON.stringify({ "@context": "https://schema.org", "@graph": [organisation(), website(), ...nodes] });
