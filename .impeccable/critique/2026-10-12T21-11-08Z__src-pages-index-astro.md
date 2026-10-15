---
target: Startseite + SEO & GEO + 360°-Rundgang
total_score: 27
max_score: 36
na_heuristics: 7
p0_count: 0
p1_count: 0
target_identity: "file:/Users/sandinjagurdzija/Documents/Websites/August Pitches Brief/Electro Solutions Claude Code Test/vistaflows/src/pages/index.astro"
target_fingerprint: "sha256:80598d071bf94ef65013769898dfaedc799e090edeeee73591b9093b97bd31ee"
target_path: /Users/sandinjagurdzija/Documents/Websites/August Pitches Brief/Electro Solutions Claude Code Test/vistaflows/src/pages/index.astro
timestamp: 2026-10-12T21-11-08Z
slug: src-pages-index-astro
closed: true
---
⚠️ DEGRADED: single-context (Sub-Agents nicht gestartet: Die Umgebung erlaubt neue Agenten nur auf ausdrücklichen Wunsch des Nutzers)

Ziel: Startseite (src/pages/index.astro) plus /leistungen/seo-geo und /leistungen/360-grad-rundgang, gerendert unter http://localhost:4321, 1440 px und 360/390 px. Stand: vor dem Polish-Durchgang am 12.10.2026.

## Design Health Score

| # | Heuristik | Score | Wichtigster Befund |
|---|-----------|-------|--------------------|
| 1 | Sichtbarkeit des Systemstatus | 3 | Formular zeigt „Wird gesendet …“ und Fehler; Rundgang-Fehlermeldung überlagerte die Rohmeldung von Pannellum |
| 2 | Passung zur realen Welt | 3 | Klare Du-Sprache, GEO wird erklärt; einzelne Fachwörter (Entität, Crawler) nur im Ratgeber erläutert |
| 3 | Kontrolle und Freiheit | 3 | Escape schließt Menü und Infobox; längere Formular-Nachricht ging beim Wegnavigieren ohne Rückfrage verloren |
| 4 | Konsistenz und Standards | 3 | Eigene No-Kicker-Regel auf 404 und Ratgeber verletzt, 74 Schriftgrößen außerhalb der Skala |
| 5 | Fehlervermeidung | 3 | Validierung, Vorauswahl per Link; lange Namen und Adressen sprengten Karten |
| 6 | Wiedererkennen statt Erinnern | 3 | Preise und Navigation sichtbar, aktive Seite markiert |
| 7 | Flexibilität und Effizienz | n/a | Persuade-Fläche (Landingpage) |
| 8 | Ästhetik und Minimalismus | 3 | Ruhige Nacht/Papier-Welt; Icon-Kachel-Karten wirken austauschbar, Hero-Viewer dicht |
| 9 | Fehler erkennen und beheben | 3 | Formularfehler mit nächstem Schritt; Viewer-Fehler zeigte rohe Dateiadresse |
| 10 | Hilfe und Dokumentation | 3 | FAQ, Ratgeber und Telefon an jeder Entscheidungsstelle |
| **Gesamt** | | **27/36** | **Gut (75 %)** |

## Design Specificity Verdict

LLM-Einschätzung: Hero (Live-Vorschau des 360°-Rundgangs), das GEO-Antwortbeispiel und die Nacht/Papier-Welt sind produktspezifisch. Die Mittelabschnitte (Icon-Kachel über Überschrift in gleich großen Karten, nummerierte Schritte, FAQ-Akkordeon) sind Kategorie-Standard und könnten unverändert auf jeder Agenturseite stehen.

Deterministischer Scan: Quellcode 91 Funde (2 Warnungen: Seitenstreifen an der empfohlenen Preiskarte, SFMono nicht in DESIGN.md; 89 Hinweise zu Schriftgrößen, Radien und Farben außerhalb von DESIGN.md). Browser-Scan Desktop 22 und Mobil 21 Funde: 19× Icon-Kachel über Überschrift, 1× Karte in Karte (KI-Antwort-Beispiel), 1× Zeilenlänge 127 Zeichen („Kurz gesagt“), 1× Seitenstreifen. Keine Fehlalarme festgestellt.

Overlay: nicht verfügbar. Die strenge CSP der Seite (script-src 'self' mit Hashes) blockiert fremde Skripte; ersatzweise lief der URL-Scan des Detektors in einem eigenen Browser.

## Was funktioniert

- Ein Licht pro Fläche: Orange markiert nur die Handlung, die Nacht-Abschnitte rahmen das Lesen auf Papier.
- Ehrlichkeit als Gestaltungsmittel: „Was GEO nicht kann“, Beispiel-Panoramen klar gekennzeichnet, offene Preise mit „ab“.
- Technische Basis: Lighthouse 100 in allen Kategorien, Inhalte ohne JavaScript sichtbar.

## Priority Issues

- **[P2] Icon-Kacheln über Überschriften (19×)**: Warum: das austauschbarste Karten-Muster, lenkt vom Titel ab. Fix: Glyphe in der Überschriftenzeile. Befehl: $impeccable polish
- **[P2] Kicker-Labels und überlange Zeilen**: „Fehler 404“ und „Ratgeber · Thema“ über H1, Versalien-Label „Kurz gesagt“, 127 Zeichen pro Zeile. Fix: Labels entfernen, „Kurz gesagt:“ als fetter Auftakt, 60ch. Befehl: $impeccable typeset
- **[P2] Lange echte Daten brechen das Layout**: Links und lange Komposita laufen aus Paketkarten und FAQ, lange Infobox im Viewer oben abgeschnitten. Fix: overflow-wrap anywhere, Infobox scrollt in sich. Befehl: $impeccable harden
- **[P2] Ausrichtung und Umbrüche**: CTA-Band-Button zweizeilig auf Desktop, Hero- und Sticky-Button zweizeilig mobil, Preisliste ohne gemeinsame Spalten, Fußzeilen-Links nicht unterscheidbar, Porträt füllt seinen Rahmen nicht. Befehl: $impeccable layout
- **[P3] Seitenstreifen an der empfohlenen Preiskarte, Karte in Karte im KI-Beispiel**: Fix: Streifen entfernen, Antwort als Text. Befehl: $impeccable quieter

## Persona Red Flags

**Casey (mobil, eine Hand)**: Primär-Button im Hero und in der Sticky-Leiste zweizeilig; Fußzeile rund 1.500 px lang in einer Spalte; Silbentrennung zerreißt Markennamen („Perple-xity“).

**Sam (Screenreader, Tastatur)**: Ganze Leistungskarten sind ein Link, vorgelesen wird der komplette Kartentext; Gründer-Abschnitt verweist per aria-labelledby auf eine fehlende ID; Codebeispiel scrollt waagerecht ohne Tastaturfokus; leere Tabellenköpfe.

**Riley (Stresstest)**: Paket mit langem Namen erzeugt dreizeiligen Button; lange E-Mail-Adresse im Paketinhalt läuft aus der Karte; „ueber“ findet in der 404-Suche nichts.

## Minor Observations

- Fußzeilen-Unterleiste: Copyright 5 px höher als die Rechtslinks.
- Platzhaltertext im Formular 3,5:1 statt 4,5:1.
- Ungegated :hover auf Fließtext-Links und Viewer-Zoom (bleibt auf Touch hängen).

## Questions to Consider

- Braucht der Hero die vollständige Infopunkt-Liste, oder reicht der Start-Button mit einem Hinweis?
- Was wäre die erste echte Referenz, die das Muster „Leistungskarte“ ersetzen kann?
