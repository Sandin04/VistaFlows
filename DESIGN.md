---
name: VistaFlows
description: Websites, SEO & GEO und 360°-Rundgänge für lokale Unternehmen aus Bottrop – dunkle Premium-Flächen, Orange als Licht.
colors:
  ink: "#0a0c11"
  ink-2: "#11141b"
  ink-3: "#191d26"
  ink-night: "#06080c"
  paper: "#ffffff"
  paper-warm: "#f7f6f3"
  paper-stone: "#efede8"
  text: "#14181f"
  text-2: "#3d4551"
  muted: "#626b7a"
  on-dark: "#f4f5f7"
  on-dark-muted: "#a2aab7"
  signal-orange: "#ff7a1a"
  signal-orange-hover: "#ff8a33"
  ember: "#ff9d4d"
  accent-ink: "#b34700"
  accent-wash: "#fff1e6"
  success: "#1f7a4d"
  error: "#b42318"
typography:
  display:
    fontFamily: "Inter Variable, Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(31px, 5.1vw, 55px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.029em"
  display-s:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "clamp(30px, 4.3vw, 50px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.029em"
  headline:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "clamp(25px, 3.5vw, 39px)"
    fontWeight: 700
    lineHeight: 1.16
    letterSpacing: "-0.025em"
  headline-s:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "clamp(22px, 2.6vw, 28px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  price:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "clamp(30px, 3.2vw, 38px)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.032em"
  title:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "clamp(18px, 1.9vw, 22px)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  lead:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "clamp(16.5px, 1.4vw, 18.5px)"
    fontWeight: 400
    lineHeight: 1.68
  body-long:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "clamp(17px, 1.25vw, 18px)"
    fontWeight: 400
    lineHeight: 1.72
  body-l:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 650
    lineHeight: 1.45
  body:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  ui:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.25
  small:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  caption:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.13em"
  brand:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 750
    lineHeight: 1
    letterSpacing: "-0.028em"
  brand-s:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "17.5px"
    fontWeight: 750
    lineHeight: 1
    letterSpacing: "-0.028em"
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  2xs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  pill: "999px"
spacing:
  gutter: "clamp(18px, 5vw, 40px)"
  section: "clamp(56px, 8vw, 108px)"
  gap: "clamp(16px, 2.4vw, 28px)"
  shell: "1220px"
components:
  button-primary:
    backgroundColor: "{colors.signal-orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.signal-orange-hover}"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.pill}"
    padding: "14px 24px"
    height: "50px"
  button-secondary-on-dark:
    backgroundColor: "transparent"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.text}"
    rounded: "{rounded.md}"
    padding: "clamp(22px, 2.6vw, 30px)"
  input:
    backgroundColor: "{colors.paper-warm}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "13px 15px"
  nav:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark-muted}"
    height: "68px"
  price-label:
    backgroundColor: "{colors.accent-wash}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.pill}"
    padding: "5px 13px"
---

# Design System: VistaFlows

## Overview

**Creative North Star: "Schaufenster bei Nacht"**

Eine Straße nach Feierabend: Die Umgebung ist dunkel und ruhig, ein einziges Schaufenster ist erleuchtet, und genau dort bleibt der Blick hängen. VistaFlows gestaltet so. Dunkle Tinten-Flächen (Kopf, Hero, Bänder, Footer) sind die Nacht, die hellen, warmen Papierflächen dazwischen sind das Innere des Ladens, in dem man in Ruhe liest. Orange ist das Licht im Fenster. Es zeigt, wo man klicken soll, und sonst nichts. Die Idee stammt aus dem Kern des Angebots: Der Standort des Kunden „arbeitet digital weiter, auch nach Feierabend“.

Die Dichte ist mittel und großzügig: wenige, klare Abschnitte mit viel Luft, große, eng gesetzte Überschriften, ruhige Fließtexte. Seit Oktober 2026 gilt **ruhiger und präziser**. Es gibt keine Glanz-Wischer auf Buttons, keine mausfolgenden Lichter auf Karten, keine mehrfachen Leuchtflecken, keinen Verlaufstext und keine Kicker-Labels über Überschriften: Die Überschrift trägt sich selbst. Tiefe entsteht durch den Wechsel von Nacht und Papier, durch Haarlinien und durch wenige weiche Schatten. Es gibt genau einen inszenierten Moment, das Aufleuchten des 360°-Schaufensters beim Start des Rundgangs. Jede andere Bewegung erklärt etwas (Menü öffnet, Infopunkt erscheint) oder sie entfällt. Abschnitte werden nicht beim Scrollen eingeblendet, Inhalte sind ab dem ersten Byte sichtbar.

Fotografie ist echt oder fehlt. Gezeigt werden das Porträt des Gründers und 360°-Panoramen. Fremde Beispielpanoramen sind immer als Beispiel gekennzeichnet. Icons sind eigene Linien-Icons (1,6 px Strich, runde Enden), keine Emojis. Sie stehen als Glyphe in der Zeile der Überschrift, nie als Kachel darüber.

**Key Characteristics:**
- Nacht (Tinte `#0a0c11`) gegen warmes Papier (`#f7f6f3`), hart geschnitten, ohne Verläufe zwischen den Welten
- Orange als einziges Licht: Aktionen, aktiver Zustand, Schlüsselzahlen
- Eng gesetzte, schwere Inter-Überschriften mit negativer Laufweite
- Haarlinien statt Schattenkaskaden, Pill-Buttons, weich gerundete Karten
- Echte Inhalte statt Dekoration: keine Stockfotos von Menschen, keine erfundenen Belege

## Colors

Fast neutrale Nacht- und Papiertöne mit genau einer gesättigten Farbe, einem warmen Signal-Orange.

### Primary
- **Signal-Orange** (#ff7a1a): Füllung der Primär-Buttons, aktive Navigation, Infopunkte im 360°-Viewer, Fokusring. Text darauf ist immer Tinte (7,5 : 1).
- **Signal-Orange hell** (#ff8a33): Hover-Zustand der Primär-Buttons.
- **Glut** (#ff9d4d): Orange für Text und Links auf dunklen Flächen (9,5 : 1 auf Tinte).
- **Akzent-Tinte** (#b34700): Orange für Text auf hellen Flächen („Mehr erfahren“-Links, Preis-Label „Empfohlen“, Fließtext-Links). 5,1 : 1 auf Papier warm, 4,7 : 1 auf Papier Stein.
- **Orange-Hauch** (#fff1e6): Hintergrund von Labels, Häkchen und dem „Kurz gesagt“-Kasten auf hellen Flächen.

### Neutral
- **Tinte** (#0a0c11): Nacht. Header, Hero, dunkle Bänder, Footer, Text auf Orange.
- **Tinte 2 / 3** (#11141b / #191d26): Karten und Panels innerhalb der Nacht (Mobilmenü, Modal-Hintergrund dunkel).
- **Nachtblau-Schwarz** (#06080c): Abdunklung über Fotos, etwa Statusmeldungen und Verläufe im 360°-Viewer (mit 35–86 % Deckkraft).
- **Papier** (#ffffff): Karten, Formulare, FAQ-Container.
- **Papier warm** (#f7f6f3): Seitenhintergrund der hellen Abschnitte, Eingabefelder.
- **Papier Stein** (#efede8): abwechselnde Abschnitte (`section--stone`), Bildflächen beim Laden.
- **Text** (#14181f), **Text 2** (#3d4551), **Gedämpft** (#626b7a): Text auf Papier (16,5 / 9,0 / 5,0 : 1).
- **Auf Dunkel** (#f4f5f7) und **Auf Dunkel gedämpft** (#a2aab7): Text auf Tinte (17,9 / 8,4 : 1).
- Linien: Tinte mit 10 % bzw. 16 % Deckkraft auf hell, Weiß mit 11 % bzw. 20 % auf dunkel.
- **Erfolg** (#1f7a4d) und **Fehler** (#b42318): nur für Formularzustände, immer mit Icon und Text, nie allein über Farbe.

### Named Rules
**The Lit Window Rule.** Orange ist Licht, keine Farbe zum Anstreichen. Es markiert pro Bildschirm die eine Handlung, den aktiven Zustand und höchstens eine Schlüsselzahl. Unter 10 % der Fläche.

**The Ink-on-Fire Rule.** Auf Signal-Orange steht immer Tinte, nie Weiß (Weiß erreicht nur 2,6 : 1). Weißer Text steht nur auf Tinte. Platzhaltertext in Feldern nutzt Gedämpft (#626b7a, 5,0 : 1), nie ein helleres Grau.

**The One Light Source Rule.** Jede dunkle Fläche bekommt höchstens eine Lichtquelle: einen weichen Orange-Schein oben rechts mit maximal 18 % Deckkraft. Keine zweiten Flecken, keine Raster-Overlays, kein Glas und keine Unschärfe als Dekoration.

## Typography

**Display Font:** Inter Variable (selbst gehostet, Fallback system-ui, Segoe UI, Roboto)
**Body Font:** Inter Variable

**Character:** Eine Familie in vielen Gewichten. Schwere, eng gesetzte Überschriften (700–800) geben die Haltung, ein ruhiger Fließtext in 400 trägt den Inhalt. Sachlich, deutsch, ohne Schnörkel.

### Hierarchy
Jede Schriftgröße der Seite kommt aus dieser Skala (CSS-Variablen `--fs-*` in `src/styles/tokens.css`). Zwischenwerte wie 13,5 oder 14,5 px gibt es nicht.
- **Display** (800, clamp(31px, 5.1vw, 55px), 1,08): H1 der Startseite.
- **Display S** (800, clamp(30px, 4.3vw, 50px), 1,08): H1 der Unterseiten.
- **Headline** (700, clamp(25px, 3.5vw, 39px), 1,16): Abschnittsüberschriften (H2), höchstens drei Zeilen.
- **Headline S** (700, clamp(22px, 2.6vw, 28px)): H2 in Artikeln, Formularen und Rechtstexten.
- **Preis** (800, clamp(30px, 3.2vw, 38px)): Betrag in Paketkarten, mit Tabellenziffern.
- **Title** (700, clamp(18px, 1.9vw, 22px), 1,25): Karten- und Unterüberschriften (H3).
- **Lead** (400, clamp(16.5px, 1.4vw, 18.5px), 1,68): Einleitungen unter Überschriften.
- **Body lang** (400, 17–18px, 1,72): Ratgeber-Artikel.
- **Body L** (17px): H4, FAQ-Fragen, hervorgehobene Zeilen.
- **Body** (400, 16px, 1,65): Fließtext und Kartentext.
- **UI** (15px): Buttons, Navigation, Listen in Karten, Fußzeilen-Links.
- **Small** (14px): Meta, Feldhinweise, Brotkrumen, Formularlabels.
- **Caption** (13px): Bildnachweise und Kleingedrucktes.
- **Label** (700, 12px, 0,13em, Versalien): nur funktionale Marker wie „Empfohlen“, „Beispiel-Panorama“, Tabellenköpfe und Fußzeilen-Überschriften. Nie als Kicker über einer Überschrift.
- **Wortmarke** (19px, mobil 17,5px): nur „VistaFlows“ im Logo.
- **Code** (System-Monospace, 14px): ausschließlich Codebeispiele im Ratgeber, umgebrochen statt waagerecht scrollend.

Zeilenlänge: `--measure` = 60ch (bei Inter etwa 72–78 Zeichen) für Artikel, „Kurz gesagt“ und Hinweise; FAQ-Antworten 62ch, Rechtstexte 64ch.

### Named Rules
**The No-Break Headline Rule.** Überschriften werden nie automatisch getrennt („Ver-trauen“ ist verboten): `hyphens: manual` und `text-wrap: balance`. Zusammengesetzte Begriffe mit Bindestrich, die zusammenbleiben müssen („GEO-Agentur“), stehen in `.nowrap`. Fließtext darf auf schmalen Spalten getrennt werden (`lang="de"`, `hyphens: auto`), aber nur Wörter ab 12 Zeichen mit mindestens 5 Zeichen je Teil (`hyphenate-limit-chars: 12 5 5`), damit Namen wie „Perplexity“ ganz bleiben. Zwischen Zahl und Einheit („590 €“, „§ 19“, „z. B.“) steht ein geschütztes Leerzeichen.

**The One Family Rule.** Nur Inter. Hierarchie entsteht über Gewicht, Größe und Laufweite, nicht über eine zweite Schrift. Hervorhebung in Überschriften durch Signal-Orange als Vollton, nie als Verlauf.

**The No-Kicker Rule.** Über Überschriften stehen keine Eyebrow-Labels („LEISTUNGEN“, „PREISE“, „FEHLER 404“, „RATGEBER · GEO“). Die Überschrift sagt selbst, worum es geht. Ein Auftakt wie „Kurz gesagt:“ steht fett im Absatz, nicht als Label darüber.

**The Glyph Rule.** Ein Icon begleitet eine Überschrift als Glyphe in derselben Zeile (1,05em, Akzent-Tinte, auf Nacht Signal-Orange). Icon-Kacheln über Überschriften gibt es nicht.

## Layout

Ein zentriertes Raster mit maximal 1220 px Inhaltsbreite und fluidem Seitenrand (clamp(18px, 5vw, 40px)). Abschnitte haben einen vertikalen Rhythmus von clamp(56px, 8vw, 108px), Raster-Abstände clamp(16px, 2.4vw, 28px), feinere Abstände folgen dem 4/8-px-Raster.

Zweispaltige Abschnitte sind bewusst asymmetrisch (etwa 1,06 : 0,94 im Hero, 1,05 : 0,95 bei Leistungen) und klappen unter 980 px einspaltig. Kartenraster nutzen `auto-fit` mit `minmax(min(100%, 280px), 1fr)`. Grid- und Flex-Kinder haben immer `min-width: 0`. Breakpoints der bestehenden Seite: 1080 px (Navigation klappt ins Menü), 980, 860, 760, 620 px (Header-CTA weicht der Sticky-Leiste unten), 420 px (lange Button-Labels werden gekürzt: „Erstgespräch anfragen“), 400 px. Der Seitenrand respektiert im Querformat Notch und Dynamic Island (`max(var(--gutter), env(safe-area-inset-*))`).

**The Varied Rhythm Rule.** Keine Seite besteht nur aus Dreier-Kartenrastern. Zwischen Kartenabschnitten stehen Text-Bild-Splits, Listen, Tabellen oder ein dunkles Band.

## Elevation & Depth

Tiefe entsteht vor allem durch den Wechsel von Nacht und Papier und durch Haarlinien. Schatten sind weich, kühl getönt und selten.

### Shadow Vocabulary
- **Ruhe** (`box-shadow: 0 1px 2px rgba(10,12,17,.06), 0 4px 12px rgba(10,12,17,.05)`): Formular-Panel und Gründer-Karte, die über einem Abschnittswechsel liegen. Normale Karten haben in Ruhe nur die Haarlinie.
- **Anheben** (`box-shadow: 0 2px 6px rgba(10,12,17,.06), 0 16px 40px rgba(10,12,17,.09)`): Hover interaktiver Karten, Gründer-Karte, empfohlene Preiskarte.
- **Schweben** (`box-shadow: 0 4px 12px rgba(10,12,17,.07), 0 32px 72px rgba(10,12,17,.14)`): Modal, 360°-Viewer-Rahmen.
- **Nacht-Ruhe / -Anheben / -Schweben** (`0 6px 18px rgba(0,0,0,.4)`, `0 10px 30px rgba(0,0,0,.35)`, `0 20px 50px rgba(0,0,0,.4)`): nur über Fotos und dunklen Flächen, wo ein getönter Schatten nicht sichtbar wäre: Infopunkte, „Rundgang starten“, Infobox im Viewer, Untermenü im dunklen Header.

### Named Rules
**The Flat-at-Rest Rule.** Karten liegen flach mit Haarlinie. Nur klickbare Karten heben sich beim Hover (−3 px, Anheben-Schatten, nur bei `hover: hover`). Statische Karten bewegen sich nie. Die empfohlene Preiskarte hebt sich durch Akzent-Haarlinie und Anheben-Schatten ab, nicht durch Streifen.

## Shapes

Weich, aber nicht verspielt. Buttons, Labels und Chips sind Pillen (999px). Karten haben 16 px, Panels 20 px, große Bänder und der Viewer-Rahmen 24 px, Felder 12 px, kleine Schaltflächen 8 px, Fokusring, Inline-Code und die Spitze der Sprechblase 4 px. Verschachtelte Rundungen ziehen die Innenabstände ab (Rahmen 24 px, Inhalt 16 px). Linien sind immer 1 px, auch seitliche Linien an Listen. Farbige Balken gibt es nur als aktive Navigationsmarke (2 px Orange unter dem Link), nie als Streifen an Karten.

## Components

### Buttons
Selbstbewusst und klar, eine Pille pro Handlung.
- **Shape:** Pille (999px), Mindesthöhe 50 px (klein 44 px), Padding 14px 24px.
- **Primary:** Signal-Orange, Text Tinte, 600, 15 px (UI). Hover (nur Zeigegeräte): Signal-Orange hell. Aktiv: `scale(.97)` in 160 ms. Kein Glanz-Wischer, kein farbiger Leuchtschatten. Mehrzeilige Labels werden ausbalanciert (`text-wrap: balance`); auf großen Bildschirmen bleibt das CTA-Band-Label einzeilig, unter 420 px entfällt „Kostenloses“.
- **Secondary:** transparent, Haarlinie 16 % Tinte, Text Tinte. Hover: weiße Fläche, Linie in Tinte. Auf dunklem Grund: Linie 20 % Weiß, Text Auf Dunkel.
- **Fokus:** 2,5 px Ring in Signal-Orange, 3 px Abstand, auf allen Flächen sichtbar.

### Chips / Labels
- **Preis-Label „Empfohlen“:** Orange-Hauch-Fläche, Akzent-Tinte, Label-Typo, Pille. Nur auf der empfohlenen Paketkarte.
- **Versprechen-Zeile:** kleiner Signal-Orange-Punkt (8 px, statisch) vor „Antwort innerhalb von 24 Stunden an Werktagen“, Small-Typo, Auf Dunkel gedämpft.
- **„Kurz gesagt“-Kasten:** Orange-Hauch, Haarlinie Akzent 28 %, Radius 16 px; der Absatz beginnt mit fettem „Kurz gesagt:“ in Akzent-Tinte, Zeilenlänge 60ch.

### Cards / Containers
- **Corner Style:** 16 px.
- **Background:** Papier auf Papier-warm-Abschnitten.
- **Elevation:** einmal deklariert, Haarlinie 10 % Tinte in Ruhe ohne Schatten. Klickbare Karten bekommen beim Hover den Anheben-Schatten (siehe Elevation).
- **Border:** Haarlinie 10 % Tinte.
- **Internal Padding:** clamp(22px, 2.6vw, 30px).
- **Überschrift mit Glyphe:** Icon in 1,05em vor dem Titel in derselben Zeile (`.has-glyph`), keine Kachel.
- **Klickbare Karte:** Link ist nur die Überschrift (`.tile__link`), die ganze Fläche wird über `::after` klickbar. Screenreader hören den Titel statt des ganzen Kartentexts; der Fokusring liegt um die ganze Karte.
- **Lange Inhalte:** Karten, Paketlisten, FAQ und Infoboxen brechen lange Adressen und Links um (`overflow-wrap: anywhere`) statt überzulaufen.

### Inputs / Fields
- **Style:** Papier warm, Linie 16 % Tinte, Radius 12 px, Padding 13px 15px, Schrift 16 px (verhindert Zoom auf iOS). Label immer sichtbar darüber, 14 px, 600. E-Mail- und Website-Felder ohne Autokorrektur und automatische Großschreibung.
- **Focus:** Papier, Linie Signal-Orange, äußerer Ring 3,5 px Orange 12 %.
- **Error / Disabled:** Fehlerrot als Linie plus Text unter dem Feld mit Icon. Deaktiviert mit 55 % Deckkraft und `cursor: not-allowed`.

### Navigation
- **Style:** Sticky, 68 px hoch, volle Tinte ohne Glas. Links 15 px, 550, Auf Dunkel gedämpft. Hover: Weiß auf 7 % weißer Fläche. Aktiv: Weiß mit 2 px Orange-Unterstrich. „Leistungen“ öffnet ein Untermenü (Disclosure-Button, per Tastatur bedienbar, Escape schließt).
- **Mobile:** Ab 1080 px abwärts ein Menü-Button (44 px), Panel auf Tinte 2 mit Fokusfalle, Escape schließt. Unter 620 px übernimmt eine feste Leiste unten (`<aside aria-label="Schnellkontakt">`) den Anruf und das Erstgespräch; sie verschwindet, solange ein Formularfeld den Fokus hat, und `scroll-padding-bottom` hält fokussierte Elemente über ihr.

### 360°-Schaufenster (Signature Component)
Der Viewer ist das erleuchtete Fenster und der einzige inszenierte Moment der Seite: Beim Start hellt das Vorschaubild auf und der Viewer blendet über einen kurzen `clip-path`-Reveal ein (420 ms, Ease-out, bei reduzierter Bewegung nur Überblendung). Ein Rahmen mit 24 px Radius auf Tinte, darin ein Vorschaubild mit dem Button „Rundgang starten“. Erst nach Klick lädt der Viewer (Pannellum, selbst gehostet). Infopunkte sind Signal-Orange-Kreise (38 px) mit weißem Rand. Ihre Karten haben Papier-Fläche, Titel, kurzen Text und eine Anfrage-Pille. Jeder Infopunkt ist zusätzlich als Liste unter dem Viewer per Tastatur erreichbar. Lange Infoboxen scrollen in sich statt abgeschnitten zu werden. Lädt ein Panorama nicht, erscheint eine eigene Meldung mit nächstem Schritt (Pannellums Rohmeldung mit Dateipfad ist ausgeblendet). Beispielpanoramen tragen sichtbar die Kennzeichnung „Beispiel-Panorama, CC0, nicht von VistaFlows aufgenommen“.

## Do's and Don'ts

### Do:
- **Do** Orange nur für die nächste Handlung, den aktiven Zustand und eine Schlüsselzahl pro Bildschirm einsetzen (The Lit Window Rule).
- **Do** auf Signal-Orange (#ff7a1a) immer Tinte (#0a0c11) setzen und orangen Text auf Hell immer in Akzent-Tinte (#b34700).
- **Do** dunkle und helle Abschnitte hart wechseln lassen: Nacht für Hero, Bänder und Footer, Papier zum Lesen.
- **Do** Abschnitte mit Inhalten füllen, die etwas belegen: Preise, Ablauf, echte Beispiele, ehrliche Grenzen.
- **Do** Bewegung kurz halten (160–240 ms, `cubic-bezier(.22,.9,.3,1)`), `prefers-reduced-motion` respektieren und Inhalte ohne JavaScript sichtbar lassen.

### Don't:
- **Don't** Weiß auf Signal-Orange als Text verwenden.
- **Don't** mehr als eine Lichtquelle pro dunkler Fläche, keine Raster-Overlays, kein Glas.
- **Don't** Eyebrow-Labels über Überschriften, Verlaufstext, Kennzahlen-Kacheln ohne echte Zahlen oder Abschnittsnummern ohne Reihenfolge.
- **Don't** Icon-Kacheln über Überschriften, farbige Streifen an Karten oder Karten in Karten.
- **Don't** ganze Karten in einen einzigen Link packen; Link ist die Überschrift, die Fläche klickt per `::after` mit.
- **Don't** Abschnitte beim Scrollen einblenden. Inhalte sind sofort sichtbar.
- **Don't** Glanz-Wischer auf Buttons oder mausfolgende Lichter auf Karten wieder einführen.
- **Don't** Stockfotos von Menschen, Unsplash-Hotlinks oder Emojis als Icons verwenden.
- **Don't** Überschriften automatisch trennen, Fließtext unter 16 px setzen oder Schriftgrößen außerhalb der Skala verwenden.
- **Don't** fremde Beispielpanoramen ohne Kennzeichnung zeigen.
