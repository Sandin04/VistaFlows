// Häufige Fragen, gruppiert. Die FAQ-Seite zeigt alle, Leistungsseiten zeigen Auszüge.
// Antworten dürfen einfache Links enthalten. Zahlen und Preise kommen aus pakete.ts.
import type { FaqEntry } from "./schema";
import { websitePakete, seoGeoPakete, rundgangPakete, eur } from "./pakete";

const w = (id: string) => websitePakete.find((p) => p.id === id)!;
const s = (id: string) => seoGeoPakete.find((p) => p.id === id)!;
const r = (id: string) => rundgangPakete.find((p) => p.id === id)!;

export const faqAllgemein: FaqEntry[] = [
  {
    q: "Was genau macht VistaFlows?",
    a: "VistaFlows baut Websites für lokale Unternehmen und macht sie sichtbar: mit lokaler Suchmaschinenoptimierung, GEO für KI-Suchsysteme wie ChatGPT und auf Wunsch mit einem 360°-Rundgang und automatisierter Anfrage-Verarbeitung mit n8n. Inhaber ist Sandin Jagurdzija, der Sitz ist in Bottrop.",
  },
  {
    q: "Für wen ist VistaFlows das Richtige?",
    a: "Für lokale Unternehmen mit Standort, bei denen Kunden vor der Anfrage online recherchieren: Hotels und Ferienwohnungen, Praxen, Studios, Showrooms, Immobilienanbieter, Handwerk, Gastronomie und Kanzleien. Wenn du keine eigene Marketingabteilung hast und einen Ansprechpartner statt eines Agentur-Teams möchtest, passt es meistens.",
  },
  {
    q: "In welchen Städten arbeitet VistaFlows?",
    a: "Für 360°-Aufnahmen komme ich ins gesamte Ruhrgebiet, unter anderem nach Bottrop, Essen, Oberhausen, Gladbeck, Gelsenkirchen, Duisburg, Herne, Bochum, Dortmund und Mülheim an der Ruhr. Website, SEO, GEO und Automatisierung setze ich ortsunabhängig für Unternehmen in ganz Deutschland um.",
  },
];

export const faqAblauf: FaqEntry[] = [
  {
    q: "Wie lange dauert eine neue Website?",
    a: "Ein Projekt aus dem Starter-Paket ist üblicherweise in zwei bis drei Wochen live. Größere Websites mit mehreren Landingpages planen wir mit vier bis sechs Wochen. Den konkreten Zeitplan bekommst du mit dem Angebot.",
  },
  {
    q: "Was muss ich selbst beisteuern?",
    a: "Informationen zu deinen Leistungen, vorhandene Fotos und Logos und eine Ansprechperson für Rückfragen. Texte kann ich komplett übernehmen. Für einen 360°-Rundgang brauche ich einmalig Zugang zu deinen Räumen.",
  },
  {
    q: "Wie schnell antwortest du auf Anfragen?",
    a: "In der Regel innerhalb von 24 Stunden an Werktagen. Wenn es eilt, erreichst du mich telefonisch unter <a href=\"tel:+491743154839\">+49 174 3154839</a>.",
  },
  {
    q: "Wem gehört die fertige Website?",
    a: "Nach vollständiger Zahlung erhältst du die vereinbarten Nutzungsrechte an allem, was ich für dich erstellt habe. Domain und Hosting laufen auf deinen Namen, du bleibst jederzeit unabhängig.",
  },
];

export const faqPreise: FaqEntry[] = [
  {
    q: "Was kostet eine Website bei VistaFlows?",
    a: `Website-Pakete beginnen bei ${eur(w("starter").betrag)} (Starter), ${eur(w("professional").betrag)} (Professional) und ${eur(w("growth").betrag)} (Growth). Das sind Ab-Preise. Nach dem kostenlosen Erstgespräch bekommst du ein schriftliches Festpreisangebot. <a href="/preise">Alle Preise im Überblick</a>.`,
  },
  {
    q: "Kommt zu den Preisen noch Umsatzsteuer dazu?",
    a: "Nein. Als Kleinunternehmer nach § 19 UStG weise ich keine Umsatzsteuer aus. Alle genannten Beträge sind Endpreise.",
  },
  {
    q: "Gibt es laufende Kosten?",
    a: "Für Domain und Hosting fallen je nach Anbieter üblicherweise 5 bis 15 € pro Monat an, direkt bei dir. Eine Betreuung (ab 39 € pro Monat) ist freiwillig. Beim 360°-Rundgang fallen keine Abo-Gebühren an, weil er in deiner Website läuft.",
  },
];

export const faqSeoGeo: FaqEntry[] = [
  {
    q: "Was ist der Unterschied zwischen SEO und GEO?",
    a: "SEO sorgt dafür, dass deine Website in der Google-Trefferliste gut platziert ist. GEO (Generative Engine Optimization) sorgt dafür, dass KI-Systeme wie ChatGPT, Perplexity, Gemini oder die KI-Übersicht von Google dein Unternehmen in ihren Antworten nennen und als Quelle verlinken. Beides baut auf derselben Grundlage auf: einer technisch sauberen Website mit klaren, belegbaren Inhalten. <a href=\"/ratgeber/seo-vs-geo\">Der Unterschied im Detail</a>.",
  },
  {
    q: "Kannst du garantieren, dass ChatGPT mein Unternehmen empfiehlt?",
    a: "Nein, und das kann niemand seriös. Wann und wen KI-Systeme nennen, entscheiden deren Anbieter. Ich kann die Voraussetzungen schaffen, die nachweislich helfen: auffindbare, eindeutige Firmendaten, zitierfähige Inhalte, Erwähnungen auf vertrauenswürdigen Seiten. Und ich messe jeden Monat mit denselben Fragen, ob sich etwas bewegt.",
  },
  {
    q: "Wie lange dauert es, bis SEO und GEO wirken?",
    a: "Erste Veränderungen bei Google-Profil und lokaler Suche sind oft nach wenigen Wochen sichtbar. Bei umkämpften Begriffen und bei KI-Antworten dauert es meist mehrere Monate. Deshalb hat die Betreuung eine Mindestlaufzeit von 3 Monaten und ist danach monatlich kündbar.",
  },
  {
    q: "Was kostet SEO und GEO bei VistaFlows?",
    a: `Der KI-Sichtbarkeits-Check ist kostenlos, das SEO & GEO Audit kostet einmalig 490 €. Die laufende Betreuung gibt es als ${s("lokal-sichtbar").name} für ${eur(s("lokal-sichtbar").betrag)}, ${s("wachstum").name} für ${eur(s("wachstum").betrag)} und ${s("marktfuehrer").name} für ${eur(s("marktfuehrer").betrag)} pro Monat. <a href="/preise#seo-geo">Pakete vergleichen</a>.`,
  },
  {
    q: "Brauche ich dafür eine neue Website?",
    a: "Nicht unbedingt. SEO und GEO funktionieren auch mit einer bestehenden Website, solange sie technisch erreichbar ist und sich bearbeiten lässt. Wenn sie Ranking oder Anfragen ausbremst, sage ich dir das im Audit und wie viel ein Umbau kosten würde.",
  },
];

export const faqRundgang: FaqEntry[] = [
  {
    q: "Für wen lohnt sich ein 360°-Rundgang?",
    a: "Für Unternehmen, bei denen Räume, Ausstattung oder Atmosphäre die Entscheidung beeinflussen: Hotels, Ferienwohnungen, Praxen, Studios, Showrooms, Restaurants, Veranstaltungsräume und Immobilien. Wenn deine Kunden dich vor dem ersten Besuch sehen wollen, hilft ein Rundgang. Wenn nicht, sage ich dir das ehrlich.",
  },
  {
    q: "Was kostet ein 360°-Rundgang?",
    a: `${r("rundgang-kompakt").name} mit bis zu 8 Standpunkten kostet ${eur(r("rundgang-kompakt").betrag)}, ${r("rundgang-business").name} mit bis zu 20 Standpunkten ${eur(r("rundgang-business").betrag)} und ${r("rundgang-premium").name} ab ${eur(r("rundgang-premium").betrag)}. Einmalig, Anfahrt im Ruhrgebiet inklusive, ohne Abo. <a href="/ratgeber/360-grad-rundgang-kosten">Was Rundgänge am Markt kosten</a>.`,
  },
  {
    q: "Gibt es laufende Kosten für den Rundgang?",
    a: "Nein. Der Rundgang läuft direkt in deiner Website, ohne Plattform-Abo. Viele Anbieter verlangen ab dem zweiten Jahr Hosting-Gebühren oder ein monatliches Abo, bei VistaFlows nicht.",
  },
  {
    q: "Kann der Rundgang auch bei Google erscheinen?",
    a: "Ausgewählte 360°-Fotos aus dem Rundgang veröffentliche ich in deinem Google-Unternehmensprofil, dort erscheinen sie in Google Maps. Einen begehbaren Rundgang direkt in Google Street View gibt es seit dem Ende der Street-View-App (2023) nur noch über spezielle Partner-Werkzeuge. Den vollständigen Rundgang binde ich deshalb auf deiner Website ein.",
  },
  {
    q: "Kann ich nur den Rundgang buchen, ohne neue Website?",
    a: "Ja. Ich binde den Rundgang in fast jede bestehende Website ein, etwa WordPress, Wix, Jimdo oder individuell gebaute Seiten. Du bekommst ihn als fertiges Paket mit Anleitung oder ich übernehme die Einbindung.",
  },
  {
    q: "Was passiert mit Personen, die bei der Aufnahme im Bild sind?",
    a: "Am besten sind die Räume bei der Aufnahme leer. Gesichter und Kfz-Kennzeichen, die trotzdem im Bild sind, mache ich bei der Bearbeitung unkenntlich.",
  },
];

export const faqTechnik: FaqEntry[] = [
  {
    q: "Mit welchem System baust du Websites?",
    a: "Meist als schnelle, statische Website: kein CMS, das ständig Updates braucht, kaum Angriffsfläche, sehr kurze Ladezeiten. Wenn du Inhalte regelmäßig selbst pflegen willst, wählen wir gemeinsam ein passendes System.",
  },
  {
    q: "Was bringt die Automatisierung mit n8n?",
    a: "Anfragen landen automatisch dort, wo sie hingehören: bei dir, deinem Team, in einer Tabelle oder einem CRM. Eingangsbestätigungen, Erinnerungen und Follow-ups laufen ohne manuelles Nachhalten, damit kein Kontakt verloren geht.",
  },
];
