---
title: "llms.txt: was die Datei kann, was nicht, und wie du sie erstellst"
crumb: "llms.txt"
seoTitle: "llms.txt erstellen: Aufbau, Beispiel und Nutzen"
description: "Was ist eine llms.txt, wie ist sie aufgebaut und bringt sie wirklich etwas für ChatGPT & Co.? Mit Beispiel zum Kopieren und einer ehrlichen Einordnung."
keyword: "llms.txt"
kurz: "Die llms.txt ist eine Textdatei im Markdown-Format unter deinedomain.de/llms.txt. Sie gibt KI-Systemen eine kurze, kuratierte Übersicht über deine Website mit Links zu den wichtigsten Seiten. Sie ist ein freiwilliger Vorschlag, kein offizieller Standard, kostet aber kaum Aufwand."
thema: "GEO"
published: "2026-10-12"
updated: "2026-10-12"
lesezeit: 6
og: "/og/ratgeber-llms-txt.png"
reihenfolge: 3
cta: "ki-check"
verwandt: ["was-ist-geo", "bei-chatgpt-gefunden-werden", "seo-vs-geo"]
quellen:
  - titel: "llmstxt.org: The /llms.txt file (Vorschlag von Jeremy Howard, 3. September 2024)"
    url: "https://llmstxt.org/"
  - titel: "Google Search Central: KI-Funktionen und deine Website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - titel: "Google Search Central: Einführung in robots.txt"
    url: "https://developers.google.com/search/docs/crawling-indexing/robots/intro"
  - titel: "sitemaps.org: Sitemaps-Protokoll"
    url: "https://www.sitemaps.org/de/protocol.html"
---

## Was ist eine llms.txt?

Die llms.txt ist eine einfache Textdatei, die im Hauptverzeichnis einer Website liegt, also unter `deinedomain.de/llms.txt`. Sie ist in Markdown geschrieben und fasst zusammen, worum es auf der Website geht und welche Seiten wichtig sind. Die Idee: KI-Systeme sollen eine Website schnell verstehen, ohne erst viele HTML-Seiten mit Menüs, Bannern und Skripten durcharbeiten zu müssen.

Vorgeschlagen hat das Format der Entwickler Jeremy Howard am 3. September 2024. Auf der Projektseite llmstxt.org wird es seitdem weiterentwickelt. Wichtig ist die Einordnung: Die llms.txt ist **ein Vorschlag, kein Standard** einer Normungsorganisation. Niemand ist verpflichtet, sie zu lesen.

## Wie die Datei aufgebaut ist

Die Reihenfolge ist festgelegt, Pflicht ist nur die erste Zeile:

1. **Eine Überschrift erster Ebene** mit dem Namen der Website oder des Unternehmens. Das ist das einzige Pflichtelement.
2. **Ein Zitatblock** mit einer kurzen Zusammenfassung.
3. **Optional weitere Absätze oder Listen** ohne Überschriften, zum Beispiel mit Kontaktdaten.
4. **Abschnitte mit Überschriften zweiter Ebene**, die jeweils eine Liste von Links enthalten. Jeder Link kann einen kurzen Hinweis bekommen.
5. **Ein Abschnitt „Optional“** für Links, die weniger wichtig sind und bei knappem Platz weggelassen werden können.

## Ein echtes Beispiel

So sieht ein Ausschnitt der llms.txt dieser Website aus. Die vollständige Datei findest du unter [vistaflows.com/llms.txt](/llms.txt).

```markdown
# VistaFlows

> Webdesign-Studio aus Bottrop für lokale Unternehmen: Websites, lokale SEO,
> GEO für KI-Suchsysteme, Anfrage-Automatisierung mit n8n und 360°-Rundgänge.

Inhaber: Sandin Jagurdzija, Hans-Böckler-Straße 235, 46242 Bottrop.
Telefon: +49 174 3154839 · E-Mail: info@vistaflows.com

## Leistungen

- [SEO & GEO](https://www.vistaflows.com/leistungen/seo-geo): Sichtbarkeit bei Google und in KI-Antworten, ab 390 € pro Monat
- [360°-Rundgang](https://www.vistaflows.com/leistungen/360-grad-rundgang): ab 590 € einmalig, ohne Abo

## Optional

- [Ratgeber](https://www.vistaflows.com/ratgeber): Artikel zu SEO, GEO und 360°-Rundgängen
```

Für einen lokalen Betrieb gehören hinein: Name, ein Satz zum Angebot, Ort und Einzugsgebiet, Kontaktdaten, die wichtigsten Leistungsseiten mit Preisen, Öffnungszeiten und gegebenenfalls Seiten wie FAQ oder Anfahrt. Werbesprache gehört nicht hinein, nur nachprüfbare Fakten.

## Bringt die llms.txt etwas?

Hier lohnt eine ehrliche Antwort, denn das Thema wird gern überverkauft.

**Was dagegen spricht:** Google schreibt in seiner Dokumentation zu KI-Übersicht und KI-Modus ausdrücklich, dass keine neuen KI-Textdateien oder speziellen Auszeichnungen nötig sind. Für die Google-Suche bringt die llms.txt also nichts. Ob ChatGPT, Perplexity oder andere Systeme die Datei regelmäßig auswerten, haben die Anbieter nicht verbindlich erklärt.

**Was dafür spricht:** Die Datei kostet einmalig wenig Zeit. Einige KI-Werkzeuge und Agenten, die gezielt eine Website erkunden, nutzen sie als Einstieg. Und der Prozess hat einen Nebeneffekt, der fast wichtiger ist als die Datei selbst: Wer sie schreibt, muss sein Angebot in wenigen klaren Sätzen und mit eindeutigen Fakten zusammenfassen. Genau diese Klarheit hilft auch auf der Website.

**Meine Einschätzung:** Die llms.txt ist ein sinnvolles Detail, kein Hebel. Wenn die Grundlagen fehlen, also ein gepflegtes Google-Profil, eine schnelle Website und klare Inhalte, bringt sie nichts. Sind die Grundlagen da, ist sie ein günstiger Zusatz. Mehr zu den Grundlagen steht im Artikel [Was ist GEO?](/ratgeber/was-ist-geo).

## llms.txt, robots.txt und sitemap.xml: der Unterschied

<div class="table-scroll" tabindex="0" role="region" aria-label="Tabelle: llms.txt, robots.txt und sitemap.xml im Vergleich, waagerecht scrollbar">

| Datei | Zweck | Für wen |
|---|---|---|
| `robots.txt` | regelt, welche Crawler welche Bereiche lesen dürfen | Suchmaschinen und KI-Crawler, verbindlich anerkannt |
| `sitemap.xml` | listet alle Seiten auf, die indexiert werden sollen | Suchmaschinen, als Standardprotokoll |
| `llms.txt` | fasst zusammen, worum es geht, und verlinkt das Wichtigste | KI-Systeme und Agenten, freiwillig |

</div>

Achtung bei einem häufigen Widerspruch: Eine llms.txt nützt nichts, wenn dieselben KI-Crawler in der `robots.txt` ausgesperrt sind.

## So erstellst du deine llms.txt in 5 Schritten

1. **Zusammenfassung schreiben:** Wer bist du, was bietest du an, wo? Zwei bis drei Sätze, nur Fakten.
2. **Wichtigste Seiten auswählen:** Startseite, Leistungsseiten, Preise, Kontakt, FAQ. Lieber zehn gute Links als fünfzig.
3. **Kurze Hinweise ergänzen:** Hinter jeden Link ein Satz, was dort steht, gern mit Preis oder Ort.
4. **Datei als `llms.txt` speichern** und im Hauptverzeichnis der Website ablegen, sodass sie unter `/llms.txt` erreichbar ist.
5. **Prüfen und pflegen:** Datei im Browser aufrufen, Links testen und bei Preis- oder Adressänderungen mit anpassen.

## Häufige Fehler

- Die Datei liegt in einem Unterordner, den niemand findet.
- Links führen auf alte oder gelöschte Seiten.
- Die Datei enthält andere Angaben als Website und Google-Profil, etwa eine alte Telefonnummer.
- Sie besteht aus Werbesätzen statt aus Fakten.
- Die KI-Crawler sind in der `robots.txt` gesperrt.

## Fazit

Die llms.txt ist ein kleiner, freiwilliger Baustein: schnell erstellt, ohne Risiko, aber auch ohne Garantie. Sie ersetzt keine der Grundlagen, die Google und KI-Systeme tatsächlich auswerten. Bei Websites von VistaFlows ist sie im Standard enthalten, gepflegt zusammen mit den strukturierten Daten.

Ob deine Website für KI-Systeme lesbar ist und ob du genannt wirst, zeigt der [kostenlose KI-Sichtbarkeits-Check](/ki-sichtbarkeits-check).
