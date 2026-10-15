// Navigation an einer Stelle: Hauptmenü, Leistungs-Untermenü, Footer.

export type NavLink = { label: string; href: string; hint?: string };

export const leistungenMenu: NavLink[] = [
  { label: "Website-Entwicklung", href: "/leistungen#website", hint: "Das Fundament: schnell, klar, auf Anfragen ausgerichtet" },
  { label: "SEO & GEO", href: "/leistungen/seo-geo", hint: "Gefunden werden bei Google und in KI-Antworten" },
  { label: "Lokale SEO", href: "/leistungen/lokale-seo", hint: "Google-Unternehmensprofil, Maps, Bewertungen" },
  { label: "360°-Rundgang", href: "/leistungen/360-grad-rundgang", hint: "Räume zeigen, ohne Abo-Kosten" },
  { label: "Automatisierung", href: "/leistungen#automatisierung", hint: "Keine Anfrage bleibt liegen" },
];

export const hauptmenu: NavLink[] = [
  { label: "Branchen", href: "/branchen" },
  { label: "Preise", href: "/preise" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Über mich", href: "/ueber-mich" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerSpalten: { titel: string; links: NavLink[] }[] = [
  {
    titel: "Leistungen",
    links: [
      { label: "Alle Leistungen", href: "/leistungen" },
      { label: "Website-Entwicklung", href: "/leistungen#website" },
      { label: "SEO & GEO", href: "/leistungen/seo-geo" },
      { label: "Lokale SEO", href: "/leistungen/lokale-seo" },
      { label: "360°-Rundgang", href: "/leistungen/360-grad-rundgang" },
      { label: "Automatisierung", href: "/leistungen#automatisierung" },
    ],
  },
  {
    titel: "Ratgeber",
    links: [
      { label: "Was ist GEO?", href: "/ratgeber/was-ist-geo" },
      { label: "SEO und GEO: der Unterschied", href: "/ratgeber/seo-vs-geo" },
      { label: "Bei ChatGPT gefunden werden", href: "/ratgeber/bei-chatgpt-gefunden-werden" },
      { label: "360°-Rundgang: Kosten", href: "/ratgeber/360-grad-rundgang-kosten" },
      { label: "Alle Ratgeber", href: "/ratgeber" },
    ],
  },
  {
    titel: "VistaFlows",
    links: [
      { label: "Über mich", href: "/ueber-mich" },
      { label: "Preise", href: "/preise" },
      { label: "Branchen", href: "/branchen" },
      { label: "FAQ", href: "/faq" },
      { label: "KI-Sichtbarkeits-Check", href: "/ki-sichtbarkeits-check" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
];

export const rechtlichLinks: NavLink[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
  { label: "Widerruf", href: "/widerruf" },
  { label: "Sitemap", href: "/sitemap" },
];
