# QA-Bericht VistaFlows-Relaunch (Phase 9)

Stand: 12.10.2026, lokaler Produktions-Build (`npm run build`, Auslieferung über `tools/dev-server.mjs` mit den Headern und Weiterleitungen aus `vercel.json`). Werkzeuge: Chrome 154 (Playwright CLI 0.1.22), Lighthouse 12.8.2, axe-core 4.14.0, impeccable-Detektor, Astro 7.3.8, Node 22.17.

Kurzfassung: Alle automatisierbaren Gates sind bestanden. Lighthouse zeigt mobil und auf dem Desktop auf 10 von 10 geprüften Seiten 100/100/100/100. axe meldet 0 Verstöße auf 27 Seiten in zwei Breiten. Der Design-Detektor findet im Quellcode 0 Probleme. Offen sind Tests, die eine Live-URL oder echte Geräte brauchen (siehe „Offene Punkte“).

## 1. Ergebnisse auf einen Blick

| Gate | Ergebnis | Ziel laut website-builder.md |
|---|---|---|
| Lighthouse mobil (10 Seiten) | 100 / 100 / 100 / 100 auf allen Seiten, LCP 1,4–1,7 s, CLS 0, TBT 0 ms, 72–117 KiB | ≥ 90 / 95 / 95 / 95, LCP < 2,5 s |
| Lighthouse Desktop (10 Seiten) | 100 / 100 / 100 / 100 auf allen Seiten, LCP 0,4 s, 71–100 KiB | wie oben |
| axe (27 Seiten × 1440 und 390 px, FAQ geöffnet) | 0 Verstöße | 0 |
| Kontrast (eigene Nachrechnung, 2.806 Textelemente) | 0 unter WCAG AA | 4,5 : 1 / 3 : 1 |
| Überlauf (28 URLs × 320/360/768/1024/1440/1920 px) | 0 Elemente über dem Rand | 0 |
| Konsole (alle Seiten, alle Breiten) | 0 Fehler (außer dem gewollten 404-Status) | 0 |
| impeccable-Detektor Quellcode | vorher 91 Funde (2 Warnungen), nachher 0 | 0 Warnungen |
| impeccable-Detektor Browser (Desktop + Mobil) | vorher 22 / 21 Warnungen auf 3 Seiten, nachher 0 auf 7 Seiten | 0 |
| Interne Links, Anker, Sitemap, Überschriften, JSON-LD, Alt-Texte (`npm run check:links`) | 27 Seiten, 19 Sitemap-URLs, 0 Fehler, 0 Warnungen | 0 |
| Typprüfung (`npm run check`) | 56 Dateien, 0 Fehler, 0 Warnungen | 0 |
| Formular-Tests (`npm test`) | 18 von 18 bestanden | alle |
| `npm audit` | 0 Schwachstellen (Produktion und Entwicklung) | keine kritischen |

### Vergleich mit der Baseline aus Phase 1 (Live-Seite, 12.10.2026)

| Seite | Vorher mobil (Perf. / A11y / BP / SEO, LCP) | Nachher mobil |
|---|---|---|
| Start | 91 / 98 / 100 / 100, LCP 2,8 s, 352 KiB | 100 / 100 / 100 / 100, LCP 1,7 s, 117 KiB |
| Preise | 97 / 100 / 100 / 100, LCP 2,2 s | 100 / 100 / 100 / 100, LCP 1,4 s, 75 KiB |
| Leistungen | 98 / 95–100 / 100 / 100, LCP 2,3 s | 100 / 100 / 100 / 100, LCP 1,4 s, 73 KiB |

Rohdaten: Lighthouse-JSON im Arbeitsverzeichnis der Sitzung. Nachmessen geht jederzeit mit Lighthouse gegen `npm run preview`.

## 2. Gate 1: impeccable critique, audit, polish

**Critique** (Startseite, SEO & GEO, 360°-Rundgang; vor dem Feinschliff): 27 von 36 Punkten (75 %, „gut“), Heuristik 7 als n/a, weil es eine Landingpage ist. Ablauf ohne getrennte Sub-Agenten (Hinweis „DEGRADED“), weil diese Umgebung neue Agenten nur auf ausdrücklichen Wunsch startet. Gespeichert unter `.impeccable/critique/` und nach dem Polish geschlossen. Die Rückfragen am Ende der Critique entfielen, weil website-builder.md verlangt, Funde direkt zu beheben.

Prioritätsfunde und Behebung:

| Fund | Behebung |
|---|---|
| [P2] 19 Icon-Kacheln über Überschriften (austauschbares Kartenmuster) | Icon als Glyphe in der Überschriftenzeile (`.has-glyph`), Regel „The Glyph Rule“ in DESIGN.md |
| [P2] Kicker über Überschriften („Fehler 404“, „Ratgeber · Thema“), Versalien-Label „Kurz gesagt“, 127 Zeichen pro Zeile | Labels entfernt, „Kurz gesagt:“ als fetter Auftakt, Zeilenlänge 60ch |
| [P2] Lange echte Daten sprengen Karten, FAQ und Infobox | `overflow-wrap: anywhere` in Karten, FAQ und Infobox; Infobox scrollt in sich |
| [P2] CTA-Band-Button zweizeilig, Hero- und Sticky-Button mobil zweizeilig, Preisliste schief, Fußzeilen-Links nicht unterscheidbar, Porträt füllt Rahmen nicht | Aktionsspalte in Inhaltsbreite, „Kostenloses“ entfällt unter 420 px, Preisliste mit Subgrid, Fußzeile mit Abständen und zweispaltig mobil, Porträt füllt den 4:5-Rahmen |
| [P3] Seitenstreifen an der empfohlenen Preiskarte, Karte in Karte im KI-Beispiel | Streifen entfernt, KI-Antwort als Text |

**Audit** (technisch, nach dem Polish):

| # | Dimension | Score | Wichtigster Befund |
|---|---|---|---|
| 1 | Barrierefreiheit | 4 | axe 0, Tastatur vollständig, Fokus überall sichtbar; echter Screenreader-Test steht noch aus |
| 2 | Performance | 4 | Lighthouse 100, Pannellum lädt erst auf Klick, Bilder AVIF/WebP |
| 3 | Theming | 3 | Vollständige Token-Skala (Farbe, Schrift, Radius, Schatten). Kein Dunkelmodus nach Systemeinstellung (bewusst: Nacht/Papier ist die Gestaltung) |
| 4 | Responsive | 3 | 320–1920 px ohne Überlauf. Brotkrumen, Inhaltsverzeichnis und Rechtslinks 32–36 px hoch (WCAG AA 24 px erfüllt, Empfehlung 44 px nicht) |
| 5 | Implementation Integrity | 4 | Detektor 0, Schriftgrößen, Radien und Schatten nur noch aus Tokens |
| **Gesamt** | | **18/20** | **Exzellent** |

**Polish:** zusätzlich Schriftskala vereinheitlicht (98 feste Größen auf 14 Stufen plus Wortmarke, u. a. 13,5 und 14,5 px abgeschafft), Fokusring um ganze Karten, geschützte Leerzeichen (50× „€“, 15× „§“, 10× „z. B.“), Platzhalter-Kontrast 3,5 → 5,0 : 1, Druck-Stile auf Tokens, DESIGN.md und `.impeccable/design.json` aktualisiert.

## 3. Gate 2: web-design-guidelines (Vercel, aktuelle Fassung)

Befunde und Behebung (vorher → nachher):

- `src/styles/global.css`: kein `touch-action: manipulation` → für Links, Buttons, Fragen und Labels gesetzt
- `src/styles/global.css`: Tap-Highlight nur an `.btn` abgeschaltet → global, dafür Dimmen beim Antippen von Links und Fragen (`:active`, nur Touch)
- `src/styles/global.css`: `.prose a:hover`, `.text-link:hover` und Viewer-Zoom ohne Hover-Abfrage → in `@media (hover: hover) and (pointer: fine)`
- `src/styles/global.css`: Browser-Scrollleisten im Standard → `scrollbar-color` aus Tokens, schmale Leisten in Tabellen und Infopunkt-Reihe
- `src/components/AnfrageForm.astro`: E-Mail- und Website-Felder mit Autokorrektur → `spellcheck="false" autocapitalize="none" autocorrect="off"`
- `src/components/AnfrageForm.astro`: Fehlermeldung scrollte weich zur Box und kollidierte mit dem Fokus aufs erste Feld → bei Feldfehlern nur Fokus, Scrollen sonst ohne Animation bei reduzierter Bewegung
- `src/components/AnfrageForm.astro`: Nachricht ging beim Wegnavigieren verloren → Rückfrage des Browsers ab 30 Zeichen Nachricht
- Quelltexte: „590 €“, „§ 19“, „z. B.“ mit normalem Leerzeichen → geschütztes Leerzeichen
- `src/components/Header.astro`, `Footer.astro`: Wortmarke ohne `translate="no"` → ergänzt
- `src/pages/404.astro`: Suche ohne Statusmeldung für Screenreader, „ueber“ fand „Über mich“ nicht → Live-Status, Umlaut-tolerante Suche

Bewusste Abweichungen: Ich-Form statt zweiter Person (Einzelunternehmer, Vertrauen durch Person), deutsche Groß- und Kleinschreibung statt „Title Case“, Zahlen bis zwölf teils ausgeschrieben (deutscher Satz).

## 4. Gate 3: Bewegung, Extremdaten, Mobil

**emil-design-eng (Bewegung):** Es gibt genau einen inszenierten Moment (Aufleuchten des 360°-Fensters, 420 ms). Sonst bewegen sich Elemente nur, wenn es etwas erklärt. Alle Animationen nutzen `transform`/`opacity`, sind per `prefers-reduced-motion` abschaltbar und listen ihre Eigenschaften einzeln auf.

| Vorher | Nachher | Warum |
| --- | --- | --- |
| Hover an Fließtext-Links und Viewer-Zoom ohne Hover-Abfrage | in `@media (hover: hover) and (pointer: fine)` | Auf Touch bleibt der Hover-Zustand sonst nach dem Antippen hängen |
| Antippen von Links ohne Rückmeldung (Tap-Highlight aus) | `opacity: .66` auf `:active`, nur `pointer: coarse` | Rückmeldung beim Aufsetzen des Fingers, nicht erst beim Loslassen |
| `scrollIntoView({ behavior: "smooth" })` immer | ohne Animation bei reduzierter Bewegung | `prefers-reduced-motion` gilt auch für Scrollen per Skript |

`review-animations` kann nur der Nutzer selbst starten (`/review-animations`); es wurde deshalb nicht ausgeführt.

**break-ui (Extremdaten):** Testseite `/_dev/break-ui` (nur `npm run dev`, nie im Build) mit echten Komponenten und Daten in vier Zuständen (Demo, Worst case, Leer, Eins), umschaltbar per `?data=`. Dazu Tests auf echten Seiten.

| # | Schwere | Feld | Extremwert | Ergebnis vorher | Behebung |
|---|---|---|---|---|---|
| 1 | Kaputt | Paketleistung | lange URL ohne Leerzeichen | lief aus der Karte, 320 px horizontal verschoben | `overflow-wrap: anywhere` an `.plan` |
| 2 | Kaputt | FAQ-Frage | „Datenschutzgrundverordnungskonformitätsprüfung“ | Plus-Zeichen aus dem Bild geschoben | Umbruch und Silbentrennung in Fragen |
| 3 | Kaputt | Infopunkt-Text | 25 Sätze, lange E-Mail | Titel oben abgeschnitten | Infobox max. Bildhöhe, scrollt in sich |
| 4 | Hässlich | Paketname | „Website Growth mit Mehrsprachigkeit und Terminbuchung“ | dreizeiliger Button | ab 21 Zeichen „Paket anfragen“, voller Name im `aria-label` |
| 5 | Hässlich | Viewer-Fehler | Panorama nicht erreichbar | zwei Meldungen übereinander, rohe Dateiadresse | eigene Meldung mit nächstem Schritt, Pannellum-Text ausgeblendet |
| 6 | Fragil | Leistungsliste | leer | leere Liste im Code | Liste nur bei Inhalt |

Hält stand: großer Betrag (12.490 €), Ein-Zeichen-Namen, leere und einzelne Listen, Formular mit 4.000 Zeichen, Emoji, langer E-Mail-Adresse, manipuliertem `?paket=`-Parameter (wird ignoriert), Server-Fehler 502 und Netzwerkabbruch (verständliche Meldung, Button wieder aktiv), 404-Suche mit Sonderzeichen.

**mobile-native:** `viewport-fit=cover` war bereits gesetzt. Neu: Seitenrand respektiert Notch im Querformat, Sticky-Leiste verschwindet während der Eingabe, `scroll-padding-bottom` hält Fokus über der Leiste, kein Gummiband mit Maus/Trackpad (Touch behält Pull-to-Refresh), Bedienelemente nicht markierbar, `touch-action: manipulation`. Felder haben 16 px Schrift (kein iOS-Zoom), kein `user-scalable=no`. Nur auf echten Geräten prüfbar: Tap-Gefühl, Safe Areas, Tastatur über dem Formular, 360°-Gesten auf iOS.

## 5. Gate 4: Playwright

- Screenshots in 360 / 768 / 1024 / 1440 / 1920 px für Start, SEO & GEO, 360°-Rundgang, Preise, Kontakt, KI-Check, Ratgeber-Artikel und 404: `docs/screenshots/breakpoints/` (40 Bilder, Endstand). Zustand vor dem Feinschliff: `docs/screenshots/neu/`, Ausgangslage: `docs/screenshots/audit/`, Interaktionen: `docs/screenshots/tests/`.
- Navigation und Mobilmenü (Fokusfalle, Escape, Untermenü per Tastatur): bestanden.
- Formular Erfolg (Weiterleitung `/danke`, KI-Check-Variante, Widerruf) und Fehlerfall (Pflichtfelder, Server 502, kein Netz): bestanden.
- 404 (Status 404, Suche), Danke-Seiten, alle internen Links und Anker (`check:links`): bestanden.
- Karten: Klick irgendwo auf die Karte öffnet das Ziel (Desktop und Mobil), Fokusring liegt um die ganze Karte.
- Telefon- und E-Mail-Klicks lösen das Analytics-Ereignis aus (mit Attrappe geprüft).

## 6. Gate 5 und 6: Lighthouse und Barrierefreiheit

Lighthouse siehe Abschnitt 1. Barrierefreiheit:

- automatisiert: axe 0 Verstöße. axe meldet 741 Kontraste als „nicht entscheidbar“ (Text auf Verläufen und Glanzflächen); die eigene Nachrechnung gegen die tatsächliche Hintergrundfarbe ergab 0 Unterschreitungen bei 2.806 Textelementen
- behoben durch axe: unbeschrifteter Abschnitt (aria-labelledby auf fehlende ID im Gründer-Block), `aria-label` auf `div`, leere Tabellenköpfe, doppelt benannte Tabellenbereiche, nicht fokussierbarer Scrollbereich im Codebeispiel, Sticky-Leiste ohne Landmark, Link im Fließtext ohne Unterstreichung
- Tastatur: Skip-Link zuerst, 85 bis 128 Tab-Stopps je Seite, jeder mit sichtbarem Fokusring, nichts unter dem Sticky-Header, logische Reihenfolge
- Zoom 200 % (640 px): kein Überlauf auf 8 geprüften Seiten; 320 px (Reflow, WCAG 1.4.10): kein Überlauf auf 28 URLs
- Screenreader-Stichprobe über den Accessibility-Tree: Landmarks (banner, navigation, main, complementary, contentinfo), benannte Abschnitte, Überschriften H1 → H2 → H3 ohne Sprünge, Karten-Links heißen jetzt nur noch wie die Karte. Ein echter Test mit VoiceOver steht aus.
- Tippflächen: WCAG 2.2 AA (24 px) überall erfüllt; Brotkrumen, Inhaltsverzeichnis und Rechtslinks 32–36 px

## 7. Gate 7: SEO

27 Seiten, jede mit eigenem Title und eigener Description (0 doppelt), genau einer H1 und selbstreferenzierendem Canonical. `noindex` nur auf Impressum, Datenschutz, AGB, Widerruf, Danke, Danke-Widerruf, Fehler und 404. JSON-LD auf allen Seiten gültig (ProfessionalService, WebSite, BreadcrumbList, Service, FAQPage, Article, Person, ContactPage, CollectionPage). `sitemap.xml` (19 URLs), `robots.txt` und `llms.txt` erreichbar. Weiterleitungen geprüft: `/ki-check`, `/rundgang`, `/geo`, `/seo`, Slash-Varianten und `.html` → 308 (dauerhaft, von Google wie 301 behandelt). Rich-Results-Test von Google erst mit Live-URL möglich.

## 8. Gate 8: Sicherheit

Header auf jeder Antwort: Content-Security-Policy (`frame-ancestors 'none'` als Header, dazu Meta-CSP mit Hashes, keine Inline-Skripte ohne Hash, keine fremden Quellen), X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy, Cross-Origin-Opener-Policy same-origin, Strict-Transport-Security (2 Jahre, includeSubDomains, preload). Keine `http://`-Verweise (Mixed Content 0). Formular: serverseitige Prüfung, Rate-Limit (6 pro 10 Minuten), Honeypot, Zeitfalle, kein Geheimnis im Client. `npm audit`: 0. Mozilla Observatory und securityheaders.com brauchen die Live-URL.

## 9. Gate 9: Browser-Matrix

Getestet: Chrome 154 (Chromium, deckt die Engine von Edge ab). Nicht getestet, weil auf diesem Rechner nicht installiert bzw. kein Gerät angeschlossen: Firefox, Safari, Edge selbst, iOS Safari, Chrome auf Android. Für die Engines Firefox und WebKit kann Playwright die Browser nachladen (rund 150 MB, nur mit deiner Freigabe). Echte Geräte prüfst du am besten selbst vor dem Livegang (Checkliste in `docs/launch-checkliste.md`).

## 10. Gate 10: Inhalt

- Platzhalter `[TODO-KUNDE]` auf der Seite: 0 (fehlende Inhalte wurden nicht erfunden, sondern weggelassen; offene Zuarbeiten stehen in `docs/todo-kunde.md`)
- Anrede: durchgehend „du“; die einzigen „Sie“ sind „sie“ (Plural) am Satzanfang und ein zitiertes Negativbeispiel
- Kontaktdaten: eine Telefonnummer, eine E-Mail-Adresse, eine Anschrift, überall identisch
- Typografie: 0 gerade Anführungszeichen, 0 „...“, 0 englische Anführungszeichen, 0 Bindestriche als Gedankenstrich
- Alt-Texte: alle Bilder (Prüfung im Checker)
- Rechtschreibung: kein deutsches Prüfwörterbuch auf dem Rechner, manuelle Durchsicht der geänderten Texte. Eine Durchsicht aller Texte in deiner Ich-Form gehört in `docs/todo-kunde.md`.
- Hinweis: Die Rechtstexte (Entwürfe) sprechen von „wir“, die übrige Seite von „ich“. Bei der rechtlichen Prüfung vereinheitlichen.

## 11. Offene Punkte

| Punkt | Warum offen | Wer |
|---|---|---|
| Tests auf iPhone/Android, Safari, Firefox | keine Geräte und Browser hier verfügbar | Sandin (Checkliste) |
| Formular-Testmail, Auto-Antwort | braucht Resend-Konto, Domain-Verifizierung, API-Schlüssel | Sandin |
| Mozilla Observatory, securityheaders.com, Rich-Results-Test | brauchen die Live-URL | nach Deploy |
| Echter Screenreader-Test (VoiceOver) | nur manuell möglich | Sandin oder nach Deploy |
| Rechtstexte prüfen lassen (Entwürfe), danach `rechtstexteGeprueft: true` | Rechtsberatung | Anwalt / Generator mit Haftung |
| Vercel-Tarif: Hobby nur nicht-kommerziell, Firmenwebsite braucht Pro | Vertrags-/Kostenentscheidung | Sandin |
| Nebenlinks 32–36 px (unter 44-px-Empfehlung) | bewusst kompakt, AA erfüllt | optional |
| Hero mit vollständiger Infopunkt-Liste recht dicht | Gestaltungsfrage aus der Critique | optional |
