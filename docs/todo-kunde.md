# Offene Zuarbeiten und Freigaben (Sandin)

Stand: 12.10.2026. Auf der Website stehen keine Platzhalter: Was fehlte, wurde weggelassen statt erfunden. Diese Liste sammelt alles, was du liefern, entscheiden oder prüfen lassen musst. „Vor Launch“ blockiert die Veröffentlichung.

## Vor Launch

| # | Aufgabe | Warum | Wo im Projekt |
|---|---|---|---|
| 1 | **Rechtstexte prüfen lassen** (Impressum, Datenschutz, AGB, Widerruf) durch Anwalt oder Generator mit Haftung. Danach in `src/data/site.ts` `rechtstexteGeprueft: true` setzen und `rechtstexteStand` anpassen. | Die Texte sind Entwürfe. Solange `false`, zeigt jede Rechtsseite einen sichtbaren Entwurfs-Hinweis. | `src/pages/impressum.astro`, `datenschutz.astro`, `agb.astro`, `widerruf.astro` |
| 2 | Bei der Prüfung **„wir“ und „ich“ vereinheitlichen**: Die Rechtstexte sprechen von „wir“, die Website von „ich“. | einheitliche Ansprache | Rechtsseiten |
| 3 | **AGB-Entscheidungen**: Wann wird abgerechnet (z. B. SEO & GEO monatlich im Voraus)? Verfallen ungenutzte Pflege-Minuten am Monatsende? Diese Klauseln wurden nicht erfunden und fehlen deshalb. | Vertragsklarheit | `src/pages/agb.astro` |
| 4 | **Vercel-Adresse** in der Datenschutzerklärung mit dem aktuellen Impressum von Vercel abgleichen (im Entwurf: 340 S Lemon Ave #4133, Walnut, CA 91789). | Pflichtangabe Empfänger | `src/pages/datenschutz.astro`, Abschnitt Hosting |
| 5 | **Ablauf des KI-Checks bestätigen**: Die Datenschutzerklärung sagt, dass du Fragen zu Branche, Ort und Betrieb stellst und keine personenbezogenen Formulardaten in KI-Systeme eingibst. Stimmt das mit deinem Vorgehen überein? | Datenschutz-Aussage muss stimmen | `datenschutz.astro`, Abschnitt 7 |
| 6 | **Vercel-Tarif**: Laut Vercel-Regeln ist Hobby nur für private, nicht-kommerzielle Nutzung erlaubt. Die Firmenwebsite gehört in ein Pro-Team (20 $ pro Entwickler und Monat). Pro schaltet außerdem die Messereignisse frei. | Vertragsbedingungen, Messkonzept | `docs/03-messkonzept.md` |
| 7 | **AV-Verträge** abschließen bzw. akzeptieren: Vercel (Hosting, Analytics) und Resend (E-Mail-Versand). Resend speichert in den USA, ist nach dem EU-US Data Privacy Framework zertifiziert, der AV-Vertrag enthält die EU-Standardvertragsklauseln. | DSGVO Art. 28 | Dashboard von Vercel und Resend |
| 8 | **Resend einrichten**: Konto, Domain `vistaflows.com` verifizieren (DNS-Einträge für SPF und DKIM, DMARC empfohlen), API-Schlüssel erzeugen. Alternative ohne US-Dienst: SMTP deines E-Mail-Anbieters, dafür müsste `lib/anfrage.mjs` angepasst werden. | ohne Schlüssel antwortet das Formular mit „nicht zustellbar“ | `.env.example` |
| 9 | **Umgebungsvariablen** in Vercel setzen: `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO`. `ANFRAGE_DRY_RUN` in Produktion leer lassen. | Formular-Versand | Vercel → Project → Settings → Environment Variables |
| 10 | **Testanfrage** nach dem Deploy: alle drei Formulare (Kontakt, KI-Check, Widerruf) einmal absenden und prüfen, dass Benachrichtigung und Eingangsbestätigung ankommen (auch im Spam-Ordner nachsehen). | Pre-Launch-Pflicht | `docs/launch-checkliste.md` |
| 11 | **Alle Texte lesen** (Ich-Form, Rechtschreibung, stimmt jede Aussage für dich?). Besonders Leistungsversprechen wie „Anfahrt im Ruhrgebiet inklusive“, „Gesichter und Kennzeichen werden unkenntlich gemacht“, „Antwort innerhalb von 24 Stunden an Werktagen“. | Du stehst mit deinem Namen dafür | alle Seiten |
| 12 | **Paketempfehlungen je Branche** auf `/branchen` bestätigen oder anpassen. | Beratungsaussage | `src/pages/branchen.astro` |
| 13 | **Bildrechte am Porträt** bestätigen (wer hat fotografiert, darfst du es für Website und Social Media nutzen?). | Urheberrecht | `src/assets/img/sandin-jagurdzija.jpg` |
| 14 | **Geräte-Test** auf deinem iPhone bzw. Android-Handy und in Safari und Firefox (Checkliste in `docs/launch-checkliste.md`). Firefox- und WebKit-Tests per Playwright kann ich nachholen, wenn du den Download der Test-Browser (rund 150 MB) freigibst. | konnte hier nicht getestet werden | – |
| 15 | **Deploy freigeben.** Ich veröffentliche nichts ohne deine ausdrückliche Freigabe. | Absprache | – |

## Nach Launch (erste Wochen)

| # | Aufgabe | Warum |
|---|---|---|
| 16 | **Git-Repository** anlegen (z. B. GitHub, privat) und mit dem Vercel-Projekt verbinden: automatisches Deployment und eine Vorschau-URL pro Änderung. | Änderungen nachvollziehbar, Rollback per Klick |
| 17 | **Google Search Console** (Domain-Property per DNS-TXT) und **Bing Webmaster Tools** einrichten, Sitemap einreichen. Mir Lesezugriff geben, dann optimiere ich anhand echter Suchbegriffe. | Messung, Indexierung |
| 18 | **Google-Unternehmensprofil**: Website-Link mit UTM-Parametern (siehe Messkonzept), Name, Adresse und Telefon exakt wie auf der Website, Leistungen und Öffnungszeiten pflegen. | lokale SEO, KI-Antworten |
| 19 | **360°-Kamera** anschaffen und das erste eigene Panorama aufnehmen. Die Beispielpanoramen (CC0, Poly Haven) dann durch eigene ersetzen. | eigene Arbeitsprobe statt Beispiel |
| 20 | **Vektor-Logo (SVG)** liefern, dann ergänze ich das SVG-Favicon. Die PNG- und ICO-Favicons sind vorhanden. | scharfes Icon in modernen Browsern |
| 21 | **Erste echte Referenz** mit schriftlicher Freigabe des Kunden: Projekt, Ort, Leistung, belegbare Zahl mit Quelle, Zitat wörtlich. Der Baustein liegt vorbereitet in `src/components/disabled/Referenz.astro`. | stärkster Vertrauensbeweis, fehlt bewusst bis zum ersten Auftrag |
| 22 | **HSTS-Preload** bewusst entscheiden: Der Header enthält `preload`. Nur bei hstspreload.org eintragen, wenn alle Subdomains dauerhaft HTTPS haben. | schwer rückgängig zu machen |
| 23 | **BFSG klären** (Barrierefreiheitsstärkungsgesetz, seit 28.06.2025): Kleinstunternehmen, die Dienstleistungen erbringen, sind nach unserem Kenntnisstand von den Anforderungen ausgenommen, und die Leistungen richten sich vor allem an Unternehmen. Rechtlich bestätigen lassen. Die Website erfüllt unabhängig davon WCAG 2.2 AA in den automatischen Prüfungen. | Rechtssicherheit |
| 24 | **Monatlicher Kurzbericht** nach `docs/03-messkonzept.md` (Anfragen, Search Console, KI-Fragen-Set). | sehen, was wirkt |

## Bereits erledigt (zur Einordnung)

- Pakete und Preise freigegeben am 12.10.2026 (`src/data/pakete.ts`, Endpreise nach § 19 UStG).
- Beispielpanoramen: CC0-Lizenz, Fotografen genannt (Sergej Majboroda, Greg Zaal), sichtbar als Beispiel gekennzeichnet.
- Keine erfundenen Referenzen, Bewertungen oder Kennzahlen auf der Seite.
