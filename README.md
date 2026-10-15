# VistaFlows – Website

Website von VistaFlows (Sandin Jagurdzija, Bottrop): Websites, SEO & GEO, 360°-Rundgänge und Anfrage-Automatisierung für lokale Unternehmen. Version 4 nach dem Rebranding, Stand 12.10.2026.

- 27 Seiten, davon 19 indexierbar: Start, Leistungen mit drei Unterseiten (SEO & GEO, lokale SEO, 360°-Rundgang), KI-Sichtbarkeits-Check, Preise, Branchen, Über mich, FAQ, Kontakt, Ratgeber mit 6 Artikeln, HTML-Sitemap, Rechtsseiten, Danke-, Fehler- und 404-Seite
- Anfrage-Strecke statt Shop: Paket-Buttons öffnen das Kontaktformular mit vorausgewähltem Paket (`/kontakt?paket=…`)
- 360°-Rundgang mit Pannellum (selbst gehostet, lädt erst auf Klick), Beispielpanoramen CC0 von Poly Haven, gekennzeichnet
- Ohne Cookies und ohne Einwilligungsbanner; Lighthouse 100 in allen Kategorien (mobil und Desktop)

## Stack

| Teil | Technik | Warum |
|---|---|---|
| Seiten | [Astro](https://astro.build) 7, statischer Build | schnell, kein JavaScript-Framework im Browser, Inhalte ohne JS sichtbar |
| Hosting | Vercel (`vercel.json`: saubere URLs, Weiterleitungen, Sicherheits-Header) | bestehende Plattform, Vorschau pro Änderung, Rollback |
| Formular | Vercel Function `api/anfrage.js` → `lib/anfrage.mjs` → Resend (E-Mail) | serverseitige Prüfung, Rate-Limit, Honeypot, Auto-Antwort |
| Schrift | Inter Variable, selbst gehostet über die Astro-Fonts-API | kein Google-Fonts-CDN (DSGVO) |
| 360° | Pannellum 2.5.7 (MIT), `public/vendor/pannellum/` | ohne Abo, ohne fremde Server |
| Messung | Vercel Web Analytics (cookielos) | siehe `docs/03-messkonzept.md` |
| Sicherheit | CSP mit Hashes (Astro), HSTS, Frame-Schutz, Permissions-Policy | Ziel A in Observatory/securityheaders |

## Einrichtung

Voraussetzung: Node.js 22 (`.nvmrc`), für `render:*` zusätzlich Google Chrome.

```bash
nvm use
npm install
npm run dev
```

Der Entwicklungsserver läuft unter <http://localhost:4321>. Lokal bleibt das Analytics-Skript aus, das Formular braucht `.env` (siehe unten) oder läuft über `npm run preview` im Testmodus.

## Befehle

| Befehl | Zweck |
|---|---|
| `npm run dev` | Entwicklungsserver mit Live-Aktualisierung, dazu die Testseite `/_dev/break-ui` |
| `npm run build` | statischer Build nach `dist/` |
| `npm run preview` | `dist/` lokal wie auf Vercel ausliefern (Header, Weiterleitungen, 404, Formular im Testmodus) |
| `npm run check` | TypeScript- und Astro-Prüfung |
| `npm test` | 18 Tests für die Formular-Funktion |
| `npm run check:links` | Links, Anker, Sitemap, Überschriften, JSON-LD, Alt-Texte, Title/Description in `dist/` |
| `npm run qa` | alles oben in einem Durchgang (vor jedem Veröffentlichen) |
| `npm run assets` | Favicons, Logos, Porträt und Web-Panoramen aus `assets-source/` erzeugen |
| `npm run render:og` | Vorschaubilder fürs Teilen aus `tools/render/og-list.json` |
| `npm run render:poster` | Vorschaubilder der Rundgänge aus `src/data/rundgaenge.ts` |

## Umgebungsvariablen

In Vercel unter Project → Settings → Environment Variables, lokal in `.env` (Vorlage: `.env.example`).

| Variable | Pflicht | Bedeutung |
|---|---|---|
| `RESEND_API_KEY` | ja (Produktion) | API-Schlüssel von Resend; Absender-Domain dort verifiziert |
| `MAIL_FROM` | nein | Absender, Standard `VistaFlows <anfrage@vistaflows.com>` |
| `MAIL_TO` | nein | Empfänger der Benachrichtigung, Standard `info@vistaflows.com` |
| `ANFRAGE_DRY_RUN` | nein | `1` = nichts senden, nur protokollieren (lokal, Tests) |

Ohne `RESEND_API_KEY` und ohne Testmodus antwortet das Formular mit einer verständlichen Fehlermeldung und der direkten E-Mail-Adresse.

## Deployment

1. Vercel-Projekt (Framework Astro, Build `astro build`, Ausgabe `dist`) mit einem Git-Repository verbinden. Für die gewerbliche Nutzung ist ein Pro-Team nötig (Hobby ist laut Vercel nur privat).
2. Umgebungsvariablen setzen, Web Analytics einschalten.
3. Jede Änderung erzeugt eine Vorschau-URL (`noindex`). Nach Prüfung live schalten.
4. Ablauf, Tests direkt nach dem Livegang, Rollback und DNS: `docs/launch-checkliste.md`.

Veröffentlicht wird nur nach Freigabe durch Sandin.

## Projektstruktur

```
api/anfrage.js            Vercel Function (Formular-Endpunkt)
lib/anfrage.mjs           Prüfung, Spam-Schutz, E-Mails über Resend
src/data/                 Stammdaten, Pakete und Preise, FAQ, Navigation, Rundgänge, strukturierte Daten
src/content/ratgeber/     Ratgeber-Artikel (Markdown, Schema in src/content.config.ts)
src/components/           Header, Footer, Formular, 360°-Viewer, Paketkarte, FAQ, CTA-Band …
src/layouts/              Basis-Layout (Meta, Schema, Analytics) und Rechtstext-Layout
src/pages/                Seiten; sitemap.xml.ts und llms.txt.ts erzeugen die Dateien beim Build
src/styles/               tokens.css (Designsystem) und global.css
public/                   Favicons, OG-Bilder, Panoramen, Pannellum, robots.txt, Manifest
tools/                    Assets, Render-Skript, lokaler Vercel-Server, Seiten-Checker
tests/                    Tests der Formular-Funktion
dev/break-ui/             Testseite mit Extremdaten (nur npm run dev)
assets-source/            Originale (Logo, Porträt, 8K-Panoramen)
archiv/                   bisherige Seite (Rebranding August 2026), unverändert
docs/                     Audit, Wettbewerb, Sitemap, Weiterleitungen, Messkonzept, QA-Bericht, Übergabe
```

## Dokumentation

| Datei | Inhalt |
|---|---|
| `PRODUCT.md`, `DESIGN.md` | Positionierung, Zielgruppe; Designsystem „Schaufenster bei Nacht“ mit allen Regeln |
| `docs/00-audit.md`, `docs/00b-wettbewerb-pakete.md` | Ausgangslage, Wettbewerb, Herleitung der Pakete |
| `docs/01-sitemap.md`, `docs/02-redirects.csv` | Seitenstruktur, URL-Schema, Weiterleitungen |
| `docs/03-messkonzept.md` | Ziele, Ereignisse, Search Console, KI-Sichtbarkeit |
| `docs/99-qa-report.md` | Prüfergebnisse mit Zahlen |
| `docs/todo-kunde.md` | was vor und nach dem Launch zu liefern oder zu entscheiden ist |
| `docs/launch-checkliste.md` | Livegang, erste zwei Wochen, Rollback, DNS |
| `docs/anleitung.md` | Inhalte pflegen, Panoramen, Artikel, Formulare, Wartungsplan, Einweisung |
| `docs/seo-checklist.md` | laufende SEO- und GEO-Routine |

Die Rechtstexte sind Entwürfe und müssen vor dem Livegang fachlich geprüft werden (Hinweis sichtbar, solange `rechtstexteGeprueft` in `src/data/site.ts` auf `false` steht).
