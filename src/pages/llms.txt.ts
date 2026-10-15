import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { site } from "../data/site";
import { websitePakete, seoGeoPakete, rundgangPakete, seoGeoEinstieg, eur } from "../data/pakete";

// llms.txt nach dem Vorschlag von llmstxt.org: H1, Zusammenfassung als Zitat,
// Fakten ohne Überschrift, dann Abschnitte mit Linklisten, zuletzt „Optional“.
// Der Ratgeber /ratgeber/llms-txt zeigt einen Ausschnitt dieser Datei; bei Änderungen dort mitziehen.
export const GET: APIRoute = async () => {
  const u = (p: string) => `${site.url}${p}`;
  const artikel = (await getCollection("ratgeber")).sort((a, b) => a.data.reihenfolge - b.data.reihenfolge);

  const text = `# VistaFlows

> Webdesign-Studio aus Bottrop für lokale Unternehmen: Websites, lokale SEO,
> GEO für KI-Suchsysteme, Anfrage-Automatisierung mit n8n und 360°-Rundgänge.

Inhaber: ${site.owner}, ${site.address.street}, ${site.address.zip} ${site.address.city}.
Telefon: ${site.phone.display} · E-Mail: ${site.email}
Erreichbarkeit: ${site.hours.display}. ${site.responsePromise}.
Einzugsgebiet: 360°-Aufnahmen vor Ort im Ruhrgebiet (${site.onSiteArea.join(", ")}); Website, SEO, GEO und Automatisierung deutschlandweit remote.
Preise: Alle Preise sind Endpreise nach § 19 UStG (Kleinunternehmerregelung, keine Umsatzsteuer).

## Leistungen

- [SEO & GEO](${u("/leistungen/seo-geo")}): Sichtbarkeit bei Google und in KI-Antworten, ab ${eur(seoGeoPakete[0].betrag)} pro Monat
- [360°-Rundgang](${u("/leistungen/360-grad-rundgang")}): ab ${eur(rundgangPakete[0].betrag)} einmalig, ohne Abo
- [Website-Entwicklung](${u("/leistungen#website")}): Websites für lokale Unternehmen, Pakete ${websitePakete.map((p) => `${p.name} ab ${eur(p.betrag)}`).join(", ")}
- [Lokale SEO](${u("/leistungen/lokale-seo")}): Google-Unternehmensprofil, Google Maps, Bewertungen, einheitliche Firmendaten
- [KI-Sichtbarkeits-Check](${u("/ki-sichtbarkeits-check")}): kostenlos, 10 Kundenfragen in ChatGPT, Perplexity, Gemini und der Google-Suche
- [SEO & GEO Audit](${u("/preise#seo-geo")}): ${eur(seoGeoEinstieg[1].betrag)} einmalig, vollständige Analyse mit Maßnahmenliste
- [Preise](${u("/preise")}): alle Pakete für Website, SEO & GEO, 360°-Rundgang und Betreuung

## Über VistaFlows

- [Über mich](${u("/ueber-mich")}): ${site.owner}, Gründer und Inhaber, Arbeitsweise und Einsatzgebiet
- [Häufige Fragen](${u("/faq")}): Ablauf, Dauer, Preise, SEO und GEO, 360°-Rundgang
- [Kontakt](${u("/kontakt")}): Formular, Telefon, E-Mail, kostenloses Erstgespräch

## Ratgeber

${artikel.map((a) => `- [${a.data.title}](${u(`/ratgeber/${a.id}`)}): ${a.data.description}`).join("\n")}

## Optional

- [Ratgeber](${u("/ratgeber")}): Artikel zu SEO, GEO und 360°-Rundgängen
- [Branchen](${u("/branchen")}): Hotels, Praxen, Showrooms, Fitnessstudios, Immobilien
- [Impressum](${u("/impressum")})
- [Datenschutz](${u("/datenschutz")})
`;
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
