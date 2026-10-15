# 01 – Strategie, Content-Plan und Sitemap

Stand: 2026-10-12, Grundlage: `docs/00-audit.md`, `docs/00b-wettbewerb-pakete.md`, bestätigte Antworten von Sandin.

## Positionierung (2 Sätze)

VistaFlows baut für lokale Unternehmen im Ruhrgebiet Websites, die bei Google und in KI-Antworten gefunden werden und aus Besuchern Anfragen machen, mit einem persönlichen Ansprechpartner aus Bottrop statt eines Agentur-Teams. Anders als reine Webdesigner, SEO-Agenturen oder Rundgang-Fotografen gibt es Website, SEO & GEO und 360°-Rundgang aus einer Hand, zu offenen Festpreisen und ohne Abo-Pflicht.

## Conversion-Strategie

**Hauptziel:** Anfrage über das Formular (Erstgespräch oder Paketanfrage mit vorausgewähltem Paket).
**Nebenziele:** Anruf, E-Mail, Anforderung des kostenlosen KI-Sichtbarkeits-Checks.

| Einstieg (typische Suche) | Pfad | Ziel |
|---|---|---|
| „Webdesign Bottrop“, Empfehlung | Start → Leistungen/Preise → Formular | Erstgespräch |
| „bei ChatGPT gefunden werden“, „was ist GEO“ | Ratgeber → `/leistungen/seo-geo` oder `/ki-sichtbarkeits-check` | KI-Check |
| „360 Grad Rundgang erstellen lassen“ | `/leistungen/360-grad-rundgang` (Demo) → Paket → Formular | Paketanfrage Rundgang |
| „Website Kosten“, Preisvergleich | `/preise` → Paketkarte → Formular | Paketanfrage |

**CTA-Hierarchie**
1. Primär (global, Header, Sticky-Leiste mobil): „Kostenloses Erstgespräch anfragen“
2. Sekundär (kontextuell): „Kostenlosen KI-Check anfordern“ (SEO/GEO-Seiten, Ratgeber), „[Paket] anfragen“ (Preise, Leistungsseiten), „Rundgang starten“ (Demo)
3. Tertiär: „Preise ansehen“, „Ratgeber lesen“, Telefonnummer

## Vertrauensstrategie (ohne Referenzen)

Es gibt noch keine Kunden. Deshalb erscheint **nichts**, was nach Referenz aussieht: keine Logos, Bewertungen, Fallstudien, Zahlen oder „Kunden sagen“. Stattdessen:

| Beleg | Wo |
|---|---|
| Person: Foto, Name, Ich-Form, Durchwahl, Antwort in 24 h an Werktagen | Hero (Antwortversprechen), Gründer-Abschnitt, Kontakt |
| Transparenz: offene Festpreise mit Laufzeiten, „Was nicht enthalten ist“ | Preise, jede Leistungsseite |
| Ehrliche Grenzen: keine Ranking- oder KI-Garantie, „ich sage dir, wenn es sich nicht lohnt“ | SEO & GEO, Ratgeber, FAQ |
| Ablauf mit Zeitrahmen (2–3 bzw. 4–6 Wochen), Festpreis vor Start | Leistungen, Preise |
| Kontrolle: Domain und Hosting auf deinen Namen, Nutzungsrechte nach Zahlung, kein Abo beim Rundgang | Preise, FAQ, Über mich |
| Fachwissen: Ratgeber mit Quellen | Ratgeber, verlinkt aus Leistungsseiten |
| Die eigene Website als Muster: Messwerte erst nach der QA, nur echte Werte | `/leistungen/seo-geo` (Abschnitt „So ist diese Website gebaut“) |
| Echte, drehbare 360°-Demo (als CC0-Beispiel gekennzeichnet) | `/leistungen/360-grad-rundgang`, Startseite |

Die Referenz-Bausteine werden gebaut, aber nicht eingebunden (`src/components/disabled/`). Sobald es echte Projekte mit Freigabe gibt, werden sie aktiviert.

## Content-Plan

Texte schreibt Claude. Sandin prüft fachlich und gibt frei („Freigabe“), weil die Texte in seiner Ich-Form sprechen.

| URL | Zweck | Haupt-Keyword | Intention | Ziel-Wörter | Status |
|---|---|---|---|---|---|
| `/` | Überblick, Erstgespräch | Webdesign Bottrop | lokal, kommerziell | 900–1.100 | überarbeiten |
| `/leistungen` | Leistungs-Hub, alte Anker bleiben | Website erstellen lassen Ruhrgebiet | kommerziell | 900 | überarbeiten |
| `/leistungen/seo-geo` | **Pillar** SEO + GEO, Pakete | SEO und GEO Agentur Ruhrgebiet | kommerziell | 1.600–2.000 | neu |
| `/leistungen/lokale-seo` | Lokale SEO, Unternehmensprofil | Lokale SEO Ruhrgebiet | kommerziell | 1.100–1.300 | neu |
| `/leistungen/360-grad-rundgang` | Rundgang + Demo + Pakete | 360 Grad Rundgang erstellen lassen | kommerziell | 1.300–1.500 | neu |
| `/ki-sichtbarkeits-check` | Lead-Seite KI-Check | KI-Sichtbarkeitscheck | transaktional | 500–700 | neu |
| `/preise` | Alle Pakete und Bedingungen | Website Kosten | kommerziell | 900–1.200 | überarbeiten |
| `/branchen` | Branchen, Anker bleiben | Website für Hotels und Praxen | kommerziell | 800 | überarbeiten (ohne Unsplash) |
| `/ueber-mich` | Person, Arbeitsweise | Webdesigner Bottrop | Navigation/Vertrauen | 700 | überarbeiten |
| `/faq` | Einwände, inkl. SEO/GEO/360° | Website Kosten Fragen | informativ | 1.500–1.800 | erweitern |
| `/kontakt` | Formular, Erreichbarkeit | VistaFlows Kontakt | transaktional | 400 | überarbeiten |
| `/ratgeber` | Übersicht | Ratgeber SEO GEO | Navigation | 250 | neu |
| `/ratgeber/was-ist-geo` | GEO erklärt | Generative Engine Optimization | informativ | 1.600–1.900 | neu |
| `/ratgeber/seo-vs-geo` | Unterschied | SEO und GEO Unterschied | informativ | 1.200–1.500 | neu |
| `/ratgeber/llms-txt` | llms.txt mit Beispiel | llms.txt | informativ | 1.100–1.400 | neu |
| `/ratgeber/bei-chatgpt-gefunden-werden` | Praxisanleitung | bei ChatGPT gefunden werden | informativ/kommerziell | 1.500–1.800 | neu |
| `/ratgeber/google-ai-overviews` | AI Overviews und AI Mode lokal | Google AI Overviews | informativ | 1.200–1.500 | neu |
| `/ratgeber/360-grad-rundgang-kosten` | Marktpreise mit Quellen | 360 Grad Rundgang Kosten | informativ/kommerziell | 1.200–1.400 | neu |
| `/sitemap` | HTML-Sitemap | – | Navigation | – | neu |
| Rechtsseiten, Danke, Fehler, 404 | Pflicht/Service | – | – | – | aktualisieren |

## Sitemap (Baum, max. 3 Ebenen)

```
/ (Start)
├── /leistungen                         Hub (Anker #website #seo #automatisierung #tour bleiben)
│   ├── /leistungen/seo-geo             Pillar SEO & GEO
│   ├── /leistungen/lokale-seo
│   └── /leistungen/360-grad-rundgang
├── /ki-sichtbarkeits-check             Lead-Seite
├── /preise                             Anker #website #seo-geo #rundgang #betreuung
├── /branchen                           Anker #hotel #praxis #showroom #fitness #immobilien bleiben
├── /ratgeber
│   ├── /ratgeber/was-ist-geo
│   ├── /ratgeber/seo-vs-geo
│   ├── /ratgeber/llms-txt
│   ├── /ratgeber/bei-chatgpt-gefunden-werden
│   ├── /ratgeber/google-ai-overviews
│   └── /ratgeber/360-grad-rundgang-kosten
├── /ueber-mich
├── /faq
├── /kontakt → /danke
├── /sitemap
└── Rechtliches: /impressum /datenschutz /agb /widerruf → /danke-widerruf · /fehler · 404
```

Jede wichtige Seite ist in höchstens zwei Klicks von der Startseite erreichbar.

## URL-Schema

Kleinbuchstaben, Bindestriche, keine Umlaute, keine Parameter, **kein abschließender Slash** (wie die bestehende Seite, Vercel `cleanUrls` + `trailingSlash: false`). Leistungen unter `/leistungen/…`, Artikel unter `/ratgeber/…`, Lead-Seite kurz auf oberster Ebene.

## Navigation

- **Hauptmenü (6 Punkte):** Leistungen ▾ (Website-Entwicklung, SEO & GEO, Lokale SEO, 360°-Rundgang, Automatisierung, Alle Leistungen) · Branchen · Preise · Ratgeber · Über mich · Kontakt, dazu CTA „Erstgespräch anfragen“. FAQ wandert in den Footer und wird aus Preise, Kontakt und den Leistungsseiten verlinkt.
- **Footer:** Leistungen · Ratgeber (Top 4 + Übersicht) · Unternehmen (Über mich, Preise, FAQ, Kontakt, KI-Check) · Rechtliches (Impressum, Datenschutz, AGB, Widerruf, Sitemap).
- **Breadcrumbs** auf allen Unterseiten (sichtbar + `BreadcrumbList`).
- **HTML-Sitemap** unter `/sitemap`, verlinkt im Footer.

## Interne Verlinkung (Pillar und Cluster)

| Von | Nach (Ankertext) |
|---|---|
| Alle GEO-Ratgeber | `/leistungen/seo-geo` („SEO & GEO für lokale Unternehmen“), `/ki-sichtbarkeits-check` („kostenloser KI-Sichtbarkeits-Check“) |
| `/ratgeber/was-ist-geo` | `/ratgeber/seo-vs-geo`, `/ratgeber/llms-txt`, `/ratgeber/bei-chatgpt-gefunden-werden`, `/ratgeber/google-ai-overviews` |
| `/leistungen/seo-geo` | alle GEO-Ratgeber, `/leistungen/lokale-seo`, `/preise#seo-geo` |
| `/leistungen/lokale-seo` | `/ratgeber/google-ai-overviews`, `/ratgeber/bei-chatgpt-gefunden-werden`, `/leistungen/360-grad-rundgang` („Rundgang im Google-Unternehmensprofil“) |
| `/leistungen/360-grad-rundgang` | `/ratgeber/360-grad-rundgang-kosten`, `/branchen`, `/preise#rundgang` |
| `/ratgeber/360-grad-rundgang-kosten` | `/leistungen/360-grad-rundgang`, `/preise#rundgang` |
| Start | `/leistungen`, alle drei Leistungsseiten, `/preise`, `/ratgeber`, `/ki-sichtbarkeits-check` |
| `/leistungen` (alte Anker) | `#seo` → `/leistungen/seo-geo` und `/leistungen/lokale-seo`, `#tour` → `/leistungen/360-grad-rundgang` |
| `/faq` | jeweilige Leistungsseite und `/preise` |

## Tech-Stack (Begründung)

Astro erzeugt wie bisher reines statisches HTML (schnell, sicher, SEO-stark), aber aus Komponenten: Kopf, Fuß und Icons existieren nur noch einmal statt 15-mal, Ratgeber werden als Markdown gepflegt. Vercel bleibt (Preview-URLs, CDN, HTTPS), das Formular läuft über eine eigene Funktion mit Resend (EU) statt FormSubmit. Pannellum (MIT) zeigt Rundgänge selbst gehostet ohne Abo, und das wird gleichzeitig Sandins Produkt für Kunden.
