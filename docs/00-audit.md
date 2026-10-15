# 00 – Audit Bestand VistaFlows

Stand: 2026-10-12 · Grundlage: Live-Seite <https://www.vistaflows.com> (Vercel). Sie ist byteweise identisch mit `VistaFlows-Rebranding.zip` (alle 15 HTML-Dateien und `style.css` verglichen), das Rebranding ist also schon live. Crawl per Python (Sitemap + interne Links), Screenshots mit playwright-cli (1440 / 390 px, `docs/screenshots/audit/`), Lighthouse 12.8.2 lokal (Chrome headless, das Tageskontingent der PageSpeed-API war erschöpft). Keine Search-Console-Daten, keine Rankingdaten. Original gesichert unter `archiv/rebranding-2026-08/`.

## Bestand in Zahlen

| URL | Title (Z.) | Description (Z.) | H1 | Wörter | Index |
|---|---|---|---|---|---|
| `/` | 64 ⚠ | 165 ⚠ | Eine Website, die Vertrauen aufbaut – und Anfragen bringt. | 981 | ja |
| `/leistungen` | 68 ⚠ | 159 | Alles für eine Website, die Vertrauen aufbaut und Anfragen bringt. | 816 | ja |
| `/branchen` | 61 | 147 | Jede Branche braucht andere Bilder, andere Argumente und andere Buttons. | 613 | ja |
| `/preise` | 47 | 146 | Transparente Pakete. Keine versteckten Kosten. | 589 | ja |
| `/ueber-mich` | 53 | 161 | Hinter VistaFlows steht eine Person, kein Callcenter. | 685 | ja |
| `/faq` | 61 | 150 | Antworten auf die Fragen, die vor einem Projekt wirklich gestellt werden. | 1006 | ja |
| `/kontakt` | 55 | 149 | Lass uns über dein Projekt sprechen. | 475 | ja |
| `/impressum` `/datenschutz` `/agb` `/widerruf` | 22–51 | 79–111 | je eine H1 | 439–1230 | noindex |
| `/danke` `/danke-widerruf` `/fehler` `/404` | – | – | – | – | noindex, zusätzlich per robots.txt gesperrt |

Alle URLs liefern 200, `/gibt-es-nicht` liefert echte 404. `http`, `vistaflows.com` ohne www, `*.html` und Trailing Slash leiten per 308 auf die kanonische URL ohne Slash. **Keine kaputten Links.** Nur 7 indexierbare Seiten.

**Stack:** statisches HTML ohne Build-Schritt, ein Stylesheet (1.973 Zeilen), Vanilla-JS (288 Zeilen), Hosting Vercel (`cleanUrls`), Formulare über FormSubmit.co, Vercel Web Analytics (cookielos). Header, Footer und das Icon-Sprite (ca. 13 KB) sind in jede der 15 Dateien kopiert.

**Marke:** Tinte `#0a0c11` (dunkle Flächen) + Off-Weiß `#f7f6f3` + Akzent-Orange `#ff7a1a` / `#d95c00`, Radien 8–28 px, Schrift „Inter“ (deklariert, aber **nirgends geladen**). Logo: „V“ mit orangem Pfeil (PNG 500 × 500). Tonalität: Du-Form, Ich-Perspektive des Gründers, direkt, ohne Agentur-Floskeln. Navigation: Leistungen · Branchen · Preise · Über mich · FAQ · Kontakt + CTA „Erstgespräch anfragen“.

## Lighthouse-Baseline (Live, 2026-10-12)

| Seite | Perf. mobil | Perf. desktop | A11y | Best Pr. | SEO | LCP mobil | Speed Index mobil |
|---|---|---|---|---|---|---|---|
| Start | **91** | 100 | 98 | 100 | 100 | **2,8 s** ⚠ | 5,6 s |
| Preise | 97 | 100 | 100 | 100 | 100 | 2,2 s | 3,9 s |
| Leistungen | 98 | 100 | 95–100 | 100 | 100 | 2,3 s | – |

## Top-Probleme

1. **Keine Belege.** Keine Referenzen, Kundenprojekte, Bewertungen oder Zahlen. Das größte Conversion-Problem einer Agentur-Seite.
2. **Die „360°-Demo“ ist kein 360°.** Ein statisches Unsplash-Bürofoto mit drei Punkten. Für einen Anbieter von Rundgängen ist das ein Glaubwürdigkeitsrisiko. Zusätzlich lädt jede Seite Bilder von `images.unsplash.com` (US-Server, Datenschutz).
3. **SEO und GEO haben keine eigene Seite.** „Lokale SEO“ ist ein Anker auf `/leistungen#seo`, KI-Sichtbarkeit nur ein Satz. Kein Ratgeber, kein Themencluster, keine `llms.txt` (404). Der nächste Wettbewerber (Herten) hat rund 10 GEO-Seiten.
4. **Inhalte ohne JavaScript unsichtbar.** 22 `.reveal`-Blöcke starten mit `opacity: 0` ohne JS-Schutz (Screenshot `start-ohne-javascript.png`). Das trifft Nutzer mit blockiertem Skript und rendernde Crawler und treibt den Speed Index hoch.
5. **Mobile Ladezeit.** LCP 2,8 s (Ziel < 2,5 s). Logo-PNG mit 123 KB für 40 px Anzeige, Porträt 1024² für 640 px, kein AVIF/WebP (≈ 120 KB Einsparung). Ohne geladene Schrift sieht die Marke auf Windows und Android anders aus.
6. **Widersprüchliche Preise.** Meta-Description von `/preise` und FAQ sagen „Website + 360° Rundgang ab 1.190 €“, die Paketkarte nennt den Rundgang „optional“. Das Pflegepaket hat keinen Preis. Schema `Product/AggregateOffer` passt nicht zu einer Dienstleistung.
7. **Barrierefreiheit und Bedienung.** Orange `#d95c00` auf Hell erreicht nur 3,5 : 1 (12-px-Eyebrows, Ziel 4,5 : 1). Überschriften springen im Hero von H1 auf H3. Der Button „Direkt anrufen“ auf `/kontakt` öffnet das Formular statt eines `tel:`-Links. Platzhalter „Max Mustermann“ im Formular.
8. **Technik und Recht.** FormSubmit mit `_captcha=false` (Spam, Drittanbieter, AV-Vertrag offen), keine Content-Security-Policy, `sameAs` verweist auf einen Facebook-Teilen-Link statt auf das Profil. Danke-Seiten sind per robots.txt gesperrt, dadurch sieht Google das `noindex` nicht.
9. **Wartbarkeit.** Jede neue Seite bedeutet Kopieren von Header, Footer und Sprite in jede Datei. Bei 15 zusätzlichen Landingpages wird das fehleranfällig.
10. **Marke im Detail.** Das OG-Bild zeigt ein oranges Quadrat statt des Logos. Das Favicon ist ein weißes „V“ und auf hellen Browser-Tabs kaum sichtbar. Branchen existieren nur als Anker (`/branchen#hotel` …), nicht als eigene Seiten.

## Chancen

- **GEO ist im Ruhrgebiet kaum besetzt.** Google schlägt „GEO Agentur Köln/München/Berlin/Hannover“ vor, aber keine Ruhrgebietsstadt. Aktiv ist nur deine-seo-agentur.de (Herten). Details: `docs/00b-wettbewerb-pakete.md`.
- **360°-Wettbewerber im Revier zeigen keine Preise** (VirtualXplore Bochum, bemotion-360) und auf der Startseite keine echte Demo-Tour. Transparente Preise + echter, eingebetteter Rundgang + Website + Street View + SEO aus einer Hand bietet in der Region niemand.
- **Solide Basis:** Lighthouse 91–100, SEO 100, saubere Weiterleitungen, KI-Crawler in robots.txt ausdrücklich erlaubt, klare Du-Tonalität, Gründer mit Foto.
- **Keyword-Falle vermieden:** „360 Grad Tour“ ist bei Google von einer Konzerttour belegt. Für die Rundgang-Seiten wird deshalb „360 Grad Rundgang“ und „virtueller Rundgang“ genutzt.

## Keywords (Vorschlag, ohne Volumen-Tool, Basis Google-Autocomplete + Wettbewerb)

| Seite | Haupt-Keyword | Neben / Long Tail | Intention |
|---|---|---|---|
| Start | Webdesign Bottrop | Website für lokale Unternehmen Ruhrgebiet | lokal, kommerziell |
| SEO & GEO (Pillar) | SEO und GEO Agentur Ruhrgebiet | GEO Agentur, KI-Sichtbarkeit erhöhen, KI-SEO | kommerziell |
| GEO erklärt | Generative Engine Optimization | GEO Bedeutung, GEO-Optimierung, LLM-Optimierung | informativ |
| SEO vs. GEO | SEO und GEO Unterschied | GEO SEO AEO | informativ |
| llms.txt | llms.txt | llms.txt erstellen, Beispiel, was ist das | informativ |
| ChatGPT | bei ChatGPT gefunden werden | in KI-Antworten erscheinen, Perplexity | informativ/kommerziell |
| AI Overviews | Google AI Overviews | AI Mode, AI Overviews SEO | informativ |
| KI-Check | KI-Sichtbarkeitscheck | KI-Sichtbarkeit prüfen, testen | transaktional (Lead) |
| Lokale SEO | Lokale SEO Ruhrgebiet | Google-Unternehmensprofil optimieren, Google-Maps-Ranking | kommerziell |
| 360° | 360 Grad Rundgang erstellen lassen | virtueller Rundgang, Google-Street-View-Rundgang | kommerziell |
| 360°-Kosten | 360 Grad Rundgang Kosten | Google 360 Grad Rundgang Kosten, Matterport Alternative | informativ/kommerziell |

## Risiken beim Relaunch

- Alle 11 bestehenden URLs bleiben exakt erhalten (ohne Slash). Anker wie `/leistungen#seo`, `#tour`, `/branchen#hotel` müssen weiter funktionieren, weil Footer, Startseite und eventuell externe Links darauf zeigen.
- Formular-Umstellung erst live schalten, wenn der Ersatz getestet ist. Sonst gehen Anfragen verloren.
- Name, Adresse und Telefonnummer (Hans-Böckler-Straße 235, 46242 Bottrop, +49 174 3154839) müssen auf Website, Schema und Google-Profil identisch bleiben.
- Preisdarstellung hängt am Steuerstatus (§ 19 UStG, Endpreise). Laufende SEO-Retainer erhöhen den Umsatz, die Kleinunternehmergrenze sollte geprüft werden.
