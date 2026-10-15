// Alle Pakete und Preise an einer Stelle. Freigegeben von Sandin am 2026-10-12
// (Grundlage: docs/00b-wettbewerb-pakete.md). Endpreise nach § 19 UStG.
// Preise ändern: nur hier. Startseite, Preise, Leistungsseiten, FAQ-Antworten
// und strukturierte Daten lesen diese Werte.

export type Paket = {
  id: string;
  gruppe: "website" | "seo-geo" | "rundgang" | "betreuung";
  name: string;
  /** Betrag in Euro, für Schema und Sortierung */
  betrag: number;
  /** „ab“-Preis oder fester Preis */
  ab: boolean;
  /** einmalig, pro Monat oder kostenlos */
  intervall: "einmalig" | "monatlich" | "kostenlos";
  kurz: string;
  fuer: string;
  leistungen: string[];
  empfohlen?: boolean;
  /** Wert für das Feld „Paket“ im Anfrageformular */
  anfrage: string;
};

export const eur = (betrag: number) =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(betrag);

export const preisText = (p: Paket) => {
  if (p.intervall === "kostenlos") return "kostenlos";
  return `${p.ab ? "ab " : ""}${eur(p.betrag)}`;
};

export const intervallText = (p: Paket) =>
  p.intervall === "monatlich" ? "pro Monat" : p.intervall === "einmalig" ? "einmalig" : "unverbindlich";

export const websitePakete: Paket[] = [
  {
    id: "starter",
    gruppe: "website",
    name: "Starter",
    betrag: 1190,
    ab: true,
    intervall: "einmalig",
    kurz: "Vollständige Website mit bis zu 5 Seiten, Kontaktformular und sauberer SEO-Basis.",
    fuer: "Für kleine Standorte, die schnell professioneller wirken möchten.",
    leistungen: [
      "Website mit bis zu 5 Seiten oder Bereichen",
      "Mobil optimiert und schnell ladend",
      "Kontaktformular mit E-Mail-Weiterleitung",
      "Saubere SEO-Grundstruktur",
      "GEO-Grundlage: strukturierte Daten, llms.txt, KI-Crawler freigegeben",
      "Ein klarer Anfrage-Button auf jeder Seite",
    ],
    anfrage: "Website Starter",
  },
  {
    id: "professional",
    gruppe: "website",
    name: "Professional",
    betrag: 2490,
    ab: true,
    intervall: "einmalig",
    kurz: "Website mit bis zu 8 Seiten, Texten, die zur Anfrage führen, lokaler SEO und Google-Unternehmensprofil.",
    fuer: "Für Unternehmen, die aus Besuchern echte Anfragen machen wollen.",
    leistungen: [
      "Individuell gestaltete Website mit bis zu 8 Seiten",
      "Texte und Buttons, die zur Anfrage führen",
      "Lokale SEO und Einrichtung des Google-Unternehmensprofils",
      "GEO-Grundlage: strukturierte Daten, llms.txt, KI-Crawler freigegeben",
      "Seiten für Impressum, Datenschutz und AGB eingebunden",
      "Einweisung, damit du Inhalte selbst pflegen kannst",
    ],
    empfohlen: true,
    anfrage: "Website Professional",
  },
  {
    id: "growth",
    gruppe: "website",
    name: "Growth",
    betrag: 4490,
    ab: true,
    intervall: "einmalig",
    kurz: "Mehrere Landingpages, SEO-Ausbau und automatisierte Anfrage-Verarbeitung mit n8n.",
    fuer: "Für Unternehmen, die Website, Sichtbarkeit und Anfrage-Prozess zu einem System verbinden möchten.",
    leistungen: [
      "Alles aus dem Professional-Paket",
      "SEO-Landingpages für mehrere Zielgruppen oder Leistungen",
      "Anfrage-Automatisierung mit n8n (Formular → E-Mail/CRM, Erinnerungen)",
      "Erweiterte strukturierte Daten für Google und KI-Suche",
      "Review nach 4 Wochen mit konkreten nächsten Schritten",
    ],
    anfrage: "Website Growth",
  },
];

export const seoGeoEinstieg: Paket[] = [
  {
    id: "ki-check",
    gruppe: "seo-geo",
    name: "KI-Sichtbarkeits-Check",
    betrag: 0,
    ab: false,
    intervall: "kostenlos",
    kurz: "10 typische Fragen deiner Kunden in ChatGPT, Perplexity, Gemini und der Google-Suche – wer wird genannt, wer nicht?",
    fuer: "Für den ersten Überblick, ohne Verpflichtung.",
    leistungen: [
      "10 echte Kundenfragen zu deiner Branche und deinem Ort",
      "Geprüft in ChatGPT, Perplexity, Gemini und der Google-Suche mit KI-Übersicht",
      "Kurzbericht per E-Mail: wer genannt wird und warum",
      "15-Minuten-Gespräch zu den drei wichtigsten Hebeln",
    ],
    anfrage: "KI-Sichtbarkeits-Check (kostenlos)",
  },
  {
    id: "audit",
    gruppe: "seo-geo",
    name: "SEO & GEO Audit",
    betrag: 490,
    ab: false,
    intervall: "einmalig",
    kurz: "Vollständige Analyse von Website, Google-Profil und KI-Sichtbarkeit mit priorisierter Maßnahmenliste.",
    fuer: "Für alle, die vor dem Start genau wissen wollen, wo sie stehen.",
    leistungen: [
      "Technik, Ladezeit, Indexierung und Seitenstruktur",
      "Inhalte, Suchbegriffe und interne Verlinkung",
      "Entitäten, strukturierte Daten, llms.txt, Zugriff für KI-Crawler",
      "Google-Unternehmensprofil und Firmendaten in Verzeichnissen",
      "KI-Vergleich mit 3 Mitbewerbern aus deiner Region",
      "Priorisierte Maßnahmenliste und 60-Minuten-Besprechung",
      "Wird angerechnet, wenn du innerhalb von 30 Tagen eine Betreuung buchst",
    ],
    anfrage: "SEO & GEO Audit (490 €)",
  },
];

export const seoGeoPakete: Paket[] = [
  {
    id: "lokal-sichtbar",
    gruppe: "seo-geo",
    name: "Lokal sichtbar",
    betrag: 390,
    ab: false,
    intervall: "monatlich",
    kurz: "Laufende Pflege von Google-Profil, Firmendaten, Technik und KI-Signalen für einen Standort.",
    fuer: "Ein Standort, eine Kernleistung, Website bis etwa 10 Seiten.",
    leistungen: [
      "Google-Unternehmensprofil pflegen: 2 Beiträge pro Monat, Fotos, Fragen",
      "Firmendaten in wichtigen Verzeichnissen einheitlich halten",
      "Technische SEO-Pflege und Ladezeit im Blick",
      "Strukturierte Daten und llms.txt aktuell halten",
      "Bewertungs-Routine: Link, QR-Code und Antwortvorlagen",
      "Jeden Monat einen bestehenden Inhalt überarbeiten",
      "Monatsbericht: Google-Sichtbarkeit und KI-Sichtbarkeit (20 feste Fragen in 4 KI-Systemen)",
    ],
    anfrage: "SEO & GEO Lokal sichtbar (390 €/Monat)",
  },
  {
    id: "wachstum",
    gruppe: "seo-geo",
    name: "Wachstum",
    betrag: 790,
    ab: false,
    intervall: "monatlich",
    kurz: "Alles aus Lokal sichtbar plus neue Inhalte, die Google und KI-Systeme zitieren können.",
    fuer: "Mehrere Leistungen oder spürbare Konkurrenz vor Ort.",
    leistungen: [
      "Alles aus „Lokal sichtbar“",
      "2 neue Inhalte pro Monat: Ratgeber, FAQ oder Leistungsseiten",
      "Themenplanung, damit die Inhalte aufeinander aufbauen",
      "Erwähnungen auf passenden Seiten aufbauen (lokale Presse, Verbände, Branchenportale)",
      "KI-Vergleich mit 3 Mitbewerbern jeden Monat",
      "Strategie-Gespräch jedes Quartal",
    ],
    anfrage: "SEO & GEO Wachstum (790 €/Monat)",
  },
  {
    id: "marktfuehrer",
    gruppe: "seo-geo",
    name: "Marktführer",
    betrag: 1490,
    ab: false,
    intervall: "monatlich",
    kurz: "Für mehrere Standorte oder Leistungsbereiche mit vier neuen Inhalten pro Monat.",
    fuer: "Mehrere Standorte oder Leistungsbereiche, starke Konkurrenz.",
    leistungen: [
      "Alles aus „Wachstum“",
      "4 neue Inhalte pro Monat",
      "Betreuung mehrerer Standorte oder Leistungsbereiche",
      "Erwähnungen und Kooperationen gezielt ausbauen",
      "Strategie-Gespräch jeden Monat",
    ],
    anfrage: "SEO & GEO Marktführer (1.490 €/Monat)",
  },
];

export const rundgangPakete: Paket[] = [
  {
    id: "rundgang-kompakt",
    gruppe: "rundgang",
    name: "Rundgang Kompakt",
    betrag: 590,
    ab: false,
    intervall: "einmalig",
    kurz: "Bis zu 8 Standpunkte, zum Beispiel für Praxis, Studio oder kleines Restaurant.",
    fuer: "Kleine Räume, die man vor dem ersten Besuch sehen möchte.",
    leistungen: [
      "Bis zu 8 Standpunkte, Aufnahme vor Ort",
      "Bearbeitung inklusive: Gesichter und Kennzeichen unkenntlich",
      "5 Infopunkte mit Text",
      "Dein Logo im Rundgang",
      "Einbindung in deine Website, ohne Abo",
      "Ausgewählte 360°-Fotos im Google-Unternehmensprofil veröffentlichen",
    ],
    anfrage: "360°-Rundgang Kompakt (590 €)",
  },
  {
    id: "rundgang-business",
    gruppe: "rundgang",
    name: "Rundgang Business",
    betrag: 990,
    ab: false,
    intervall: "einmalig",
    kurz: "Bis zu 20 Standpunkte mit Anfrage-Buttons direkt im Rundgang.",
    fuer: "Hotels, Praxen, Studios und Showrooms mit mehreren Bereichen.",
    leistungen: [
      "Alles aus „Kompakt“, bis zu 20 Standpunkte",
      "12 Infopunkte mit Text und Bild",
      "Anfrage- oder Buchungs-Buttons im Rundgang",
      "Navigation über deinen Grundriss",
      "5 Standbilder aus dem Rundgang für Social Media und Google",
    ],
    empfohlen: true,
    anfrage: "360°-Rundgang Business (990 €)",
  },
  {
    id: "rundgang-premium",
    gruppe: "rundgang",
    name: "Rundgang Premium",
    betrag: 1690,
    ab: true,
    intervall: "einmalig",
    kurz: "Bis zu 40 Standpunkte, mehrere Etagen oder Standorte, individuell gestaltet.",
    fuer: "Große Flächen, mehrere Etagen oder Standorte.",
    leistungen: [
      "Alles aus „Business“, bis zu 40 Standpunkte",
      "Mehrere Etagen oder Standorte in einem Rundgang",
      "Infopunkte ohne Begrenzung, auch mit Video oder PDF",
      "Gestaltung im Look deiner Marke, auf Wunsch mehrsprachig",
      "Optional: jährliche Aktualisierung der Aufnahmen",
    ],
    anfrage: "360°-Rundgang Premium (ab 1.690 €)",
  },
];

export const betreuungPakete: Paket[] = [
  {
    id: "technik",
    gruppe: "betreuung",
    name: "Technik",
    betrag: 39,
    ab: false,
    intervall: "monatlich",
    kurz: "Updates, Überwachung, Sicherungen und ein monatlicher Formular-Test.",
    fuer: "Wenn die Website einfach laufen soll.",
    leistungen: [
      "Technische Updates und Sicherheits-Header",
      "Erreichbarkeit wird überwacht",
      "Sicherungen der Website",
      "Monatlicher Test des Anfrageformulars",
    ],
    anfrage: "Betreuung Technik (39 €/Monat)",
  },
  {
    id: "pflege",
    gruppe: "betreuung",
    name: "Pflege",
    betrag: 89,
    ab: false,
    intervall: "monatlich",
    kurz: "Alles aus Technik plus 60 Minuten Änderungen pro Monat.",
    fuer: "Wenn regelmäßig Texte, Bilder oder Angebote wechseln.",
    leistungen: [
      "Alles aus „Technik“",
      "60 Minuten Änderungen pro Monat (Texte, Bilder, Angebote)",
      "Rückmeldung innerhalb von 24 Stunden an Werktagen",
    ],
    anfrage: "Betreuung Pflege (89 €/Monat)",
  },
];

export const alleSeoGeo = [...seoGeoEinstieg, ...seoGeoPakete];
export const allePakete: Paket[] = [
  ...websitePakete,
  ...seoGeoEinstieg,
  ...seoGeoPakete,
  ...rundgangPakete,
  ...betreuungPakete,
];

/** Auswahlliste im Anfrageformular (Reihenfolge = Anzeige) */
export const anfrageOptionen: { gruppe: string; optionen: string[] }[] = [
  { gruppe: "Erstgespräch", optionen: ["Kostenloses Erstgespräch"] },
  { gruppe: "Website", optionen: websitePakete.map((p) => p.anfrage).concat("Bestehende Website überarbeiten") },
  { gruppe: "SEO & GEO", optionen: alleSeoGeo.map((p) => p.anfrage) },
  { gruppe: "360°-Rundgang", optionen: rundgangPakete.map((p) => p.anfrage).concat("360°-Rundgang für bestehende Website") },
  { gruppe: "Weitere", optionen: ["Automatisierung mit n8n", ...betreuungPakete.map((p) => p.anfrage), "Sonstiges"] },
];

export const vertragsbedingungen = {
  seoGeo: "Mindestlaufzeit 3 Monate, danach monatlich kündbar. SEO und GEO brauchen einige Monate, bis sich Wirkung zeigt; eine bestimmte Platzierung bei Google oder eine Nennung in KI-Antworten kann niemand garantieren.",
  rundgang: "Einmalpreis inklusive Anfahrt im Ruhrgebiet. Der Rundgang läuft in deiner Website, es fallen keine laufenden Gebühren an. Außerhalb des Ruhrgebiets nach Absprache.",
  website: "Ab-Preise. Den finalen Umfang legen wir im kostenlosen Erstgespräch fest, du bekommst vorab ein schriftliches Festpreisangebot. Domain und Hosting laufen auf deinen Namen (üblicherweise 5–15 € pro Monat direkt beim Anbieter).",
  betreuung: "Monatlich kündbar mit einer Frist von 14 Tagen zum Monatsende. Keine Pflicht – die Website gehört dir auch ohne Betreuung.",
};
