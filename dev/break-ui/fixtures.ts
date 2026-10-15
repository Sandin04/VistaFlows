// Nur für die lokale Entwicklung (npm run dev → /_dev/break-ui). Wird nie gebaut oder ausgeliefert.
// Worst-Case-Daten im selben Format wie src/data: Sie zeigen, ob Komponenten mit realistischen
// Extremwerten zurechtkommen (lange Namen, leere Listen, große Beträge, lange Adressen).
// Alle Werte sind Testdaten. Nichts davon erscheint auf der Website.
import { websitePakete, seoGeoPakete, rundgangPakete, type Paket } from "../../src/data/pakete";
import { faqAllgemein } from "../../src/data/faq";
import type { Crumb, FaqEntry } from "../../src/data/schema";

export type Fixture = {
  plans: Paket[];
  faq: FaqEntry[];
  crumbs: Crumb[];
};

const basis = {
  gruppe: "website" as const,
  ab: true,
  intervall: "einmalig" as const,
  kurz: "",
  anfrage: "Test",
};

export const fixtures: Record<"demo" | "worst" | "empty" | "one", Fixture> = {
  // Echte Daten, so wie sie auf /preise stehen
  demo: {
    plans: [websitePakete[0], seoGeoPakete[1], rundgangPakete[1]],
    faq: faqAllgemein,
    crumbs: [
      { name: "Start", href: "/" },
      { name: "Ratgeber", href: "/ratgeber" },
      { name: "Was ist GEO?", href: "/ratgeber/was-ist-geo" },
    ],
  },

  // Realistische Extremwerte, über die Karten verteilt
  worst: {
    plans: [
      {
        ...basis,
        id: "worst-lang",
        name: "Website Growth mit Mehrsprachigkeit und Terminbuchung",
        betrag: 12490,
        empfohlen: true,
        fuer: "Für Praxisgemeinschaften und Filialbetriebe mit mehreren Standorten, eigener Terminlogik und Inhalten in Deutsch, Englisch und Türkisch.",
        leistungen: [
          "Barrierefreiheitsprüfung nach WCAG 2.2 AA inklusive Barrierefreiheitserklärung",
          "Datenschutzfreundliche Terminbuchungssystem-Einbindung",
          "Mehrsprachigkeit (DE, EN, TR) mit eigenen Adressen je Sprache",
          "Bis zu 40 Seiten oder Bereiche",
          "Schulung für drei Mitarbeitende",
          "Ansprechpartnerin: Aleksandra Wiśniewska-Kowalczyk",
          "Technische Dokumentation unter https://www.example.com/projekte/vistaflows/2026/dokumentation/technik-und-wartung",
          "Rückfragen an bartholomew.fitzgerald@northwind-industries-holdings.example.com",
          "Inhaltspflege in den ersten 3 Monaten",
          "Google-Unternehmensprofil für 6 Standorte",
          "Bewertungs-Routine je Standort",
          "Monatlicher Bericht",
        ],
      },
      {
        ...basis,
        id: "worst-kurz",
        name: "Jo",
        betrag: 1,
        ab: false,
        intervall: "monatlich",
        fuer: "",
        leistungen: ["Ein Punkt"],
      },
      {
        ...basis,
        id: "worst-leer",
        name: "Rundgang Premium Plus für mehrere Standorte",
        betrag: 1690,
        fuer: "Benachrichtigungseinstellungen-Konfigurationsassistent",
        leistungen: [],
      },
    ],
    faq: [
      {
        q: "Ich habe bereits eine Website bei einem Baukasten-Anbieter mit laufendem Vertrag bis Ende nächsten Jahres. Kann ich trotzdem jetzt schon mit SEO und GEO starten, oder muss ich zuerst wechseln?",
        a: "Ja. Langer Link ohne Leerzeichen: https://www.example.com/workspaces/acme/projects/q3-launch/docs/9f8e7d6c5b4a?tab=comments&filter=unresolved und eine lange Adresse: bartholomew.fitzgerald@northwind-industries-holdings.example.com",
      },
      { q: "Und?", a: "Ja." },
      { q: "Was kostet die Datenschutzgrundverordnungskonformitätsprüfung?", a: "<a href=\"/preise\">Preise</a>" },
    ],
    crumbs: [
      { name: "Start", href: "/" },
      { name: "Ratgeber", href: "/ratgeber" },
      { name: "Generative Engine Optimization", href: "/ratgeber" },
      { name: "Bei ChatGPT gefunden werden: Anleitung", href: "/ratgeber/bei-chatgpt-gefunden-werden" },
    ],
  },

  // Leere Listen
  empty: { plans: [], faq: [], crumbs: [] },

  // Genau ein Eintrag
  one: {
    plans: [rundgangPakete[1]],
    faq: [faqAllgemein[0]],
    crumbs: [{ name: "Start", href: "/" }],
  },
};
