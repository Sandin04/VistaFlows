# SEO- und GEO-Checkliste (laufend)

Für jede neue oder geänderte Seite und als Monats- und Quartalsroutine. Die technischen Punkte prüft `npm run qa` automatisch (Typprüfung, Tests, Build, Link- und SEO-Checker).

## Jede neue oder geänderte Seite

- [ ] Ein Hauptsuchbegriff pro Seite, nicht doppelt mit einer anderen Seite (Übersicht in `docs/01-sitemap.md`)
- [ ] Title höchstens 60 Zeichen, mit Suchbegriff vorn, endet auf „| VistaFlows“
- [ ] Description 110–160 Zeichen, sagt Nutzen und nächsten Schritt
- [ ] Genau eine H1, Überschriften ohne Sprünge (H2 → H3)
- [ ] Die erste Antwort steht oben: „Kurz gesagt“ in zwei bis drei Sätzen (wichtig für KI-Antworten)
- [ ] Konkrete, belegbare Fakten statt Werbesprache: Preis, Ort, Ablauf, Dauer. Zahlen mit Quelle
- [ ] Interne Links: mindestens zwei passende Seiten verlinken hierher, die Seite verlinkt auf Leistung und Kontakt
- [ ] Bilder mit sprechendem Alt-Text, über das Astro-Bildsystem (`src/assets`), nicht als großes PNG
- [ ] Strukturierte Daten passend zum Typ (Service, Article, FAQPage nur mit sichtbaren Fragen)
- [ ] Seite in `src/data/navigation.ts` bzw. Footer und HTML-Sitemap aufgenommen, wenn sie dauerhaft ist
- [ ] Bei neuem Ratgeber-Artikel: `published` und `updated` setzen, Quellen eintragen, `llms.txt` aktualisiert sich selbst
- [ ] Alte Adresse geändert? Weiterleitung in `vercel.json` und `docs/02-redirects.csv` eintragen, nie eine rankende URL ersatzlos löschen
- [ ] `npm run qa` ohne Fehler

## Monatlich (30 Minuten)

- [ ] Search Console: Klicks, Impressionen, Suchbegriffe mit Position 5–15 (dort lohnt Nachschärfen am meisten)
- [ ] Search Console: Indexierung und Fehler (Seiten nicht indexiert, 404)
- [ ] Bing Webmaster Tools: AI Performance (Zitate in Copilot)
- [ ] KI-Fragen-Set aus `docs/03-messkonzept.md` stellen, Antworten mit Datum ablegen
- [ ] Google-Unternehmensprofil: zwei Beiträge, neue Fotos, Fragen beantworten, auf Bewertungen antworten
- [ ] Anfragen im Postfach zählen und mit dem Vormonat vergleichen

## Quartalsweise (2 Stunden)

- [ ] Einen bestehenden Ratgeber-Artikel aktualisieren (Zahlen, Quellen, `updated`-Datum)
- [ ] Einen neuen Artikel zu einer echten Kundenfrage schreiben
- [ ] Firmendaten in Verzeichnissen abgleichen (Name, Adresse, Telefon exakt gleich): Google, Bing Places, Apple Maps (Apple Business Connect), Branchenbücher
- [ ] Preise in `src/data/pakete.ts` prüfen; alle Seiten, strukturierte Daten und `llms.txt` lesen die Werte von dort
- [ ] Lighthouse mobil für Start, Preise und eine Leistungsseite (Ziel weiterhin über 90, LCP unter 2,5 s)
- [ ] `npm audit` und Abhängigkeiten aktualisieren (`npm outdated`), danach `npm run qa`
- [ ] `robots.txt`: Sind die gewünschten KI-Crawler weiter erlaubt? Neue Crawler-Namen der Anbieter prüfen

## GEO-Grundsätze (gelten immer)

- Google braucht für KI-Übersicht und KI-Modus keine Sonderoptimierung: indexierbar, Snippet erlaubt, gute SEO-Grundlagen.
- KI-Systeme zitieren eindeutige, belegte Aussagen: kurze Antwort zuerst, dann Details, Zahlen mit Quelle.
- Eindeutige Entität: überall derselbe Name „VistaFlows“, dieselbe Adresse, dieselbe Telefonnummer, dieselben Leistungen.
- Erwähnungen auf anderen Seiten (lokale Presse, Kammern, Verbände, Branchenportale) zählen mehr als gekaufte Links. Keine gekauften Links.
- Die `llms.txt` ist ein freiwilliger Zusatz, kein Hebel. Sie wird bei jedem Build aus den Seitendaten erzeugt.
