// Stammdaten: einzige Quelle für Name, Adresse, Kontakt und Profile.
// Werte stammen aus dem Impressum der bisherigen Seite (Stand August 2026).
// Änderungen hier wirken auf Kopf, Fuß, Kontaktseite, Rechtstexte und Schema.

export const site = {
  name: "VistaFlows",
  legalName: "VistaFlows, Inhaber Sandin Jagurdzija",
  owner: "Sandin Jagurdzija",
  url: "https://www.vistaflows.com",
  tagline: "Websites, SEO & GEO und 360°-Rundgänge für lokale Unternehmen",
  email: "info@vistaflows.com",
  phone: {
    display: "+49 174 3154839",
    href: "tel:+491743154839",
    e164: "+491743154839",
  },
  hours: {
    display: "Mo–Fr, 9–18 Uhr",
    schema: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" }],
  },
  responsePromise: "Antwort innerhalb von 24 Stunden an Werktagen",
  address: {
    street: "Hans-Böckler-Straße 235",
    zip: "46242",
    city: "Bottrop",
    region: "Nordrhein-Westfalen",
    regionCode: "DE-NW",
    country: "Deutschland",
    countryCode: "DE",
  },
  // Koordinaten aus dem Schema der bisherigen Seite übernommen.
  geo: { latitude: 51.5236, longitude: 6.9226 },
  taxNote: "Gemäß § 19 Abs. 1 UStG wird keine Umsatzsteuer berechnet (Kleinunternehmerregelung).",
  // Erst auf true setzen, wenn Impressum, Datenschutz, AGB und Widerruf von einer
  // fachkundigen Stelle geprüft wurden. Solange false, zeigen die Seiten einen Entwurfshinweis.
  rechtstexteGeprueft: false,
  rechtstexteStand: "Oktober 2026",
  priceNote: "Alle Preise sind Endpreise. Als Kleinunternehmer nach § 19 UStG weise ich keine Umsatzsteuer aus.",
  social: [
    { name: "Instagram", handle: "@vistaflows.de", url: "https://www.instagram.com/vistaflows.de", icon: "instagram" },
    { name: "Facebook", handle: "VistaFlows", url: "https://www.facebook.com/profile.php?id=61575314493623", icon: "facebook" },
    { name: "TikTok", handle: "@vistaflows.com", url: "https://www.tiktok.com/@vistaflows.com", icon: "tiktok" },
  ],
  // Vor-Ort-Termine für 360°-Aufnahmen; Website, SEO und GEO laufen deutschlandweit remote.
  onSiteArea: [
    "Bottrop",
    "Essen",
    "Oberhausen",
    "Gladbeck",
    "Gelsenkirchen",
    "Duisburg",
    "Herne",
    "Bochum",
    "Dortmund",
    "Mülheim an der Ruhr",
  ],
} as const;

export type Site = typeof site;
