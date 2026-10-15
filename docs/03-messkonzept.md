# Messkonzept (Phase 8)

Stand: 12.10.2026. Ziel: wissen, woher Anfragen kommen, ohne Cookies und ohne Einwilligungsbanner.

## 1. Werkzeug

**Vercel Web Analytics** (bereits eingebaut, lädt nur auf Vercel). Arbeitet ohne Cookies und ohne Speicherung auf dem Gerät, erfasst zusammengefasste Werte (Seiten, Herkunftsregion, Gerät, Referrer). Deshalb gibt es kein Cookie-Banner. Diese Einschätzung steht so in der Datenschutzerklärung (Entwurf) und gehört zur rechtlichen Prüfung.

**Wichtig zum Tarif** (Vercel-Dokumentation, Stand August/September 2026):

| | Hobby (kostenlos) | Pro (20 $ pro Entwickler und Monat) |
|---|---|---|
| Nutzung | laut Fair-Use-Regeln **nur privat und nicht-kommerziell** | gewerblich erlaubt |
| Seitenaufrufe | 50.000 Ereignisse pro Monat, danach Pause | nach Verbrauch (0,03 $ pro 1.000) |
| Eigene Ereignisse (Formular, Telefon, E-Mail) | **nicht verfügbar** | enthalten |
| UTM-Auswertung | nicht verfügbar | nur mit Zusatz „Web Analytics Plus“ (10 $/Monat) |
| Berichtszeitraum | 1 Monat | 12 Monate |

Quellen: <https://vercel.com/docs/analytics/limits-and-pricing>, <https://vercel.com/docs/plans/hobby>. VistaFlows ist ein Gewerbe, die Seite gehört deshalb in ein Pro-Team (siehe `docs/todo-kunde.md`).

## 2. Ziele und Ereignisse

Jedes Ziel hat genau ein Ereignis. Eigene Ereignisse zählt Vercel nur im Pro-Tarif; die Danke-Seiten zählen in jedem Tarif als Seitenaufruf.

| Ziel | Auslöser | Ereignis in Vercel | Zusätzlich messbar über |
|---|---|---|---|
| Anfrage gesendet | Formular auf `/kontakt` und Paket-Buttons | „Anfrage gesendet“ | Aufrufe von `/danke`, Eingang im Postfach |
| KI-Check angefordert | Formular auf `/ki-sichtbarkeits-check` | „KI-Check angefordert“ | Eingang im Postfach (Betreff), `/danke?typ=ki-check` |
| Widerruf gesendet | Formular auf `/widerruf` | „Widerruf gesendet“ | Aufrufe von `/danke-widerruf` (kein Verkaufsziel, nur Kontrolle) |
| Telefon-Klick | jeder `tel:`-Link (Header, Sticky-Leiste, Kontakt, Footer) | „Telefon-Klick“ | – |
| E-Mail-Klick | jeder `mailto:`-Link | „E-Mail-Klick“ | – |
| Termin gebucht | entfällt (kein Buchungswerkzeug) | – | – |
| Download | entfällt (keine Downloads) | – | – |

Technik: Die Formular-Ereignisse sendet `src/components/AnfrageForm.astro` nach erfolgreichem Versand, die Klick-Ereignisse ein kleines Skript in `src/layouts/Base.astro`. Beide rufen `window.va("event", { name })` auf und tun nichts, wenn das Analytics-Skript fehlt (lokal, Vorschau).

**Verlässlichste Zahl:** Jede Formular-Anfrage erzeugt eine E-Mail an `info@vistaflows.com`. Das Postfach ist die Zählung, die nie fehlt, auch wenn jemand Werbeblocker nutzt.

## 3. Herkunft und UTM-Regeln

- KI-Quellen erscheinen in Vercel unter „Referrers“, zum Beispiel `chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `copilot.microsoft.com`. ChatGPT hängt an manche Quellen-Links selbst `utm_source=chatgpt.com` an.
- Eigene Links mit UTM-Parametern versehen, damit sie später auswertbar sind (Auswertung erst mit Web Analytics Plus):
  - Google-Unternehmensprofil, Website-Button: `https://www.vistaflows.com/?utm_source=google&utm_medium=organic&utm_campaign=unternehmensprofil`
  - Instagram-Bio: `?utm_source=instagram&utm_medium=social&utm_campaign=bio`
  - E-Mail-Signatur: `?utm_source=email&utm_medium=signatur`
- Schreibweise immer klein, ohne Leerzeichen. Die Canonical-Tags verhindern doppelte Seiten durch Parameter.

## 4. Suchmaschinen

- **Google Search Console:** Domain-Property `vistaflows.com` per DNS-TXT-Eintrag anlegen, `https://www.vistaflows.com/sitemap.xml` einreichen. Klicks aus der KI-Übersicht und dem KI-Modus zählt Google im normalen Leistungsbericht mit („Web“), nicht getrennt.
- **Bing Webmaster Tools:** Website aus der Search Console importieren, Sitemap einreichen. Der Bericht „AI Performance“ (öffentliche Vorschau seit Februar 2026) zeigt, wie oft Seiten in Copilot-Antworten zitiert werden.
- **Core Web Vitals aus echten Besuchen:** Bericht „Core Web Vitals“ in der Search Console (erscheint, sobald genug Besuche da sind). Optional Vercel Speed Insights; wenn eingeschaltet, Datenschutzerklärung ergänzen.

## 5. KI-Sichtbarkeit von VistaFlows selbst

Einmal im Monat 10 feste Fragen in ChatGPT, Perplexity, Gemini und der Google-Suche mit KI-Übersicht stellen und Antworten mit Datum als Screenshot ablegen. Vorschlag für den Start:

1. „Wer erstellt Websites für lokale Unternehmen in Bottrop?“
2. „Webdesigner im Ruhrgebiet mit festen Preisen?“
3. „Was kostet eine Website für eine Arztpraxis in Gladbeck?“
4. „Wer macht 360-Grad-Rundgänge für Hotels im Ruhrgebiet?“
5. „Was kostet ein virtueller Rundgang für ein Café in Essen?“
6. „Agentur für GEO, also Sichtbarkeit in ChatGPT, im Ruhrgebiet?“
7. „Wie werde ich als Handwerker in Bottrop bei ChatGPT empfohlen?“
8. „Lokale SEO-Betreuung für kleine Betriebe in Oberhausen, was kostet das?“
9. „Website mit Anfrage-Automatisierung für Physiotherapie, wer bietet das an?“
10. „Was ist der Unterschied zwischen SEO und GEO?“ (prüft, ob der Ratgeber zitiert wird)

## 6. Monatlicher Kurzbericht (Vorschlag)

| Kennzahl | Quelle |
|---|---|
| Besucher und Top-Seiten | Vercel Web Analytics |
| Anfragen (Formular, KI-Check), Telefon- und E-Mail-Klicks | Postfach, Vercel-Ereignisse (Pro) |
| Klicks, Impressionen, Position der wichtigsten Suchbegriffe | Google Search Console |
| Zitate in Copilot | Bing Webmaster Tools (AI Performance) |
| Nennungen in KI-Antworten | Fragen-Set aus Abschnitt 5 |
| Ladezeit aus echten Besuchen | Search Console (Core Web Vitals) |

Keine Heatmaps und keine Sitzungsaufzeichnungen: Sie bräuchten eine Einwilligung und bringen bei dieser Besucherzahl wenig.
