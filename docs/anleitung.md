# Anleitung: Inhalte pflegen, Wartung, Einweisung

Für Sandin. Alles, was du regelmäßig änderst, liegt an wenigen Stellen. Nach jeder Änderung gilt dieselbe Runde: `npm run qa`, Vorschau ansehen, veröffentlichen.

## 1. Arbeiten am Projekt

```bash
nvm use            # Node 22 laut .nvmrc
npm install        # einmalig bzw. nach Updates
npm run dev        # Entwicklungsserver: http://localhost:4321 (Änderungen sofort sichtbar)
npm run qa         # Typprüfung, 18 Tests, Build, Link- und SEO-Prüfung
npm run preview    # gebaute Seite wie auf Vercel (Header, Weiterleitungen), Formular im Testmodus
```

Im Entwicklungsserver gibt es zusätzlich `http://localhost:4321/_dev/break-ui`: Paketkarten, FAQ und Brotkrumen mit extrem langen Texten, leeren Listen und großen Beträgen. Nach Änderungen an Karten oder Preisen kurz durchklicken (Umschalter unten in der Mitte). Die Seite existiert nur lokal.

## 2. Inhalte ändern

| Was | Wo | Wirkt auf |
|---|---|---|
| Telefon, E-Mail, Adresse, Öffnungszeiten, Social-Links, Antwortversprechen | `src/data/site.ts` | Kopf, Fuß, Kontakt, Rechtstexte, strukturierte Daten, `llms.txt` |
| Pakete und Preise | `src/data/pakete.ts` | Preisseite, Leistungsseiten, Startseite, FAQ-Antworten, strukturierte Daten, `llms.txt` |
| Häufige Fragen | `src/data/faq.ts` (Antworten dürfen einfache Links enthalten) | FAQ-Seite, FAQ-Blöcke, FAQPage-Daten |
| Menü und Fußzeile | `src/data/navigation.ts` | alle Seiten |
| Texte einer Seite | `src/pages/<seite>.astro` (HTML-ähnlich, Text zwischen den Tags ändern) | diese Seite |
| Rundgänge, Infopunkte | `src/data/rundgaenge.ts` | Startseite, Rundgang-Seite, Impressum (Bildnachweise) |
| Ratgeber-Artikel | `src/content/ratgeber/*.md` | Artikel, Ratgeber-Liste, Sitemap, `llms.txt` |

Regeln, damit es sauber bleibt (Details in `DESIGN.md`):

- Du-Form und Ich-Form beibehalten. Keine Zahlen, Bewertungen oder Referenzen ohne Beleg.
- Zwischen Zahl und Einheit ein geschütztes Leerzeichen: „590 €“, „§ 19“, „z. B.“ (auf dem Mac: Wahltaste + Leertaste).
- Keine neuen Schriftgrößen oder Farben im CSS erfinden, sondern die Variablen aus `src/styles/tokens.css` nutzen.
- Preise geändert? Die Vorschaubilder fürs Teilen nennen teils Preise: `tools/render/og-list.json` anpassen und `npm run render:og` ausführen.

## 3. Bilder tauschen

- **Porträt:** neues Foto als `assets-source/sandin-jagurdzija.jpg` ablegen (mindestens 1024 px breit, hochkant oder quadratisch, Gesicht im oberen Drittel), dann `npm run assets`. Astro erzeugt AVIF und WebP in mehreren Größen.
- **Logo:** Dateien in `assets-source/` ersetzen (`vistaflows-logo.png`, `vistaflows-logo-hell.png`), dann `npm run assets` (Favicons, Manifest-Icons, Logo für Schema und Kopf).
- **Vorschaubilder fürs Teilen (OG):** Text in `tools/render/og-list.json` (Felder `k`, `t`, `s`; Wörter zwischen `*` werden orange), dann `npm run render:og` oder für eine Seite `npm run render:og -- preise`. Braucht Google Chrome auf dem Rechner.

## 4. Eigenes 360°-Panorama einbinden

1. In der Kamera-App (z. B. Insta360 Studio, Ricoh Theta) als **equirektangulares JPG im Format 2:1** in voller Auflösung exportieren. Gesichter und Kennzeichen vorher unkenntlich machen.
2. Datei nach `assets-source/` kopieren, z. B. `praxis-empfang-8k.jpg`.
3. In `tools/prepare-assets.mjs` in der Liste `panoramas()` ergänzen: `["praxis-empfang-8k.jpg", "praxis-empfang"]`, dann `npm run assets`. Ergebnis: `public/panoramen/praxis-empfang-4096.webp` und `-2048.webp`.
4. In `src/data/rundgaenge.ts` eine Szene anlegen, **ohne** `quelle` (dann gilt sie als eigene Aufnahme, der Hinweis „Beispiel-Panorama“ und der fremde Bildnachweis entfallen automatisch):
   ```ts
   {
     id: "praxis-empfang",
     titel: "Praxis",
     kurz: "Empfang und Wartebereich",
     panorama: { gross: "/panoramen/praxis-empfang-4096.webp", klein: "/panoramen/praxis-empfang-2048.webp" },
     poster: "tour-praxis-empfang",
     start: { yaw: 0, pitch: -5, hfov: 105 },
     infopunkte: [{ id: "praxis-empfang-anmeldung", pitch: -10, yaw: 30, titel: "Anmeldung", text: "…", cta: anfrage }],
   },
   ```
5. **Koordinaten finden:** `npm run dev`, Rundgang starten, Browser-Konsole öffnen (Safari: Entwickler → JavaScript-Konsole). Jeder Klick ins Panorama schreibt Pitch und Yaw in die Konsole. Diese Werte für `start` und die Infopunkte übernehmen.
6. Vorschaubild erzeugen: `npm run render:poster -- praxis-empfang` (legt `src/assets/img/tour-praxis-empfang.jpg` an).
7. Auf der Seite einbinden: in `src/pages/index.astro` bzw. `src/pages/leistungen/360-grad-rundgang.astro` die Liste `scenes={["cafe", "hotelzimmer"]}` anpassen, z. B. `scenes={["praxis-empfang", "cafe"]}`. Sobald genug eigene Aufnahmen da sind, die Beispiele dort entfernen.
8. `npm run qa`, Vorschau prüfen (auch auf dem Handy), veröffentlichen.

## 5. Neuen Ratgeber-Artikel anlegen

1. Einen bestehenden Artikel in `src/content/ratgeber/` kopieren. Der Dateiname wird die Adresse (`mein-thema.md` → `/ratgeber/mein-thema`), nur Kleinbuchstaben und Bindestriche.
2. Kopfbereich (Frontmatter) anpassen. Die Prüfung beim Bauen meldet Fehler, wenn etwas nicht passt:
   - `title` (H1), `crumb` (höchstens 40 Zeichen), `seoTitle` (höchstens 65), `description` (110–160 Zeichen)
   - `kurz`: die Antwort in zwei bis drei Sätzen, steht als „Kurz gesagt“ über dem Text
   - `thema` (`GEO`, `SEO` oder `360°`), `published` und `updated` (JJJJ-MM-TT), `lesezeit` in Minuten, `reihenfolge`
   - `quellen`: mindestens eine Quelle mit Titel und Adresse; `verwandt`: Dateinamen passender Artikel ohne `.md`
   - `cta`: `ki-check`, `rundgang` oder `erstgespraech`; `og`: `/og/ratgeber-mein-thema.png`
3. Text in Markdown schreiben: `##` für Zwischenüberschriften, `-` für Listen, `[Text](/adresse)` für Links. Tabellen in `<div class="table-scroll" tabindex="0" role="region" aria-label="Tabelle: Thema, waagerecht scrollbar">` einschließen, jede Tabelle mit eigenem Namen und gefüllter erster Kopfzelle.
4. Vorschaubild: Eintrag mit `"file": "ratgeber-mein-thema"` in `tools/render/og-list.json`, dann `npm run render:og -- ratgeber-mein-thema`.
5. `npm run qa`. Liste, Sitemap und `llms.txt` nehmen den Artikel automatisch auf.

## 6. Formulare prüfen

- **Monatlich:** eine Testanfrage über `/kontakt` schicken. Es müssen zwei E-Mails ankommen: die Benachrichtigung an `info@vistaflows.com` (Antworten geht direkt an den Absender) und die Eingangsbestätigung an die Testadresse.
- **Kommt nichts an:** Resend-Dashboard → Emails (wurde versendet? abgelehnt?), Resend → Domains (ist `vistaflows.com` noch verifiziert?), Vercel → Project → Logs (Fehlermeldungen von `/api/anfrage`), Vercel → Settings → Environment Variables (`RESEND_API_KEY` gesetzt?).
- **Spam-Schutz:** Honeypot-Feld, Mindest-Ausfüllzeit (2,5 s) und höchstens 6 Anfragen pro 10 Minuten je Adresse. Bots bekommen eine Erfolgsmeldung, es wird aber nichts versendet.
- **Lokal testen:** `npm run preview` setzt den Testmodus (`ANFRAGE_DRY_RUN`), es wird nichts versendet, die Anfrage steht im Terminal.

## 7. Veröffentlichen

- Mit Git (empfohlen): Änderung in einen Branch, Vercel erstellt automatisch eine Vorschau-URL, nach Prüfung in den Hauptbranch übernehmen.
- Ohne Git: `vercel deploy` (Vorschau) und `vercel deploy --prod` (live).
- Fehler nach dem Livegang: Vercel → Deployments → letztes gutes Deployment → „Promote to Production“ / „Instant Rollback“. Details in `docs/launch-checkliste.md`.

## 8. Wartungsplan

| Wann | Aufgabe |
|---|---|
| wöchentlich | Formular-Eingänge beantworten; bei Auffälligkeiten Vercel-Logs ansehen |
| monatlich | Testanfrage; Search Console und Bing (Fehler, neue Suchbegriffe); KI-Fragen-Set; Google-Unternehmensprofil pflegen; Kurzbericht nach `docs/03-messkonzept.md` |
| quartalsweise | `npm outdated` und `npm audit`, kleinere Updates einspielen, `npm run qa`, Vorschau testen; einen Ratgeber-Artikel aktualisieren; Firmendaten in Verzeichnissen abgleichen; Lighthouse für Start, Preise, eine Leistungsseite |
| jährlich | Rechtstexte gegenprüfen lassen (Dienste, Adressen, Gesetzesänderungen); Preise und Pakete überprüfen; große Updates (neue Astro-Hauptversion) in einem eigenen Branch testen |
| laufend | Erreichbarkeit überwachen, z. B. mit einem kostenlosen Uptime-Dienst, der alle 5 Minuten die Startseite aufruft (falls eingesetzt: Datenschutzerklärung prüfen, der Dienst ruft nur die Seite auf) |

**Backups:** Der Code liegt im Git-Repository (sobald angelegt) und als jedes frühere Deployment bei Vercel. Formular-Daten werden nicht gespeichert, sondern als E-Mail zugestellt; das Postfach ist das Archiv. Die Original-Bilder liegen in `assets-source/`, die alte Seite in `archiv/rebranding-2026-08/`.

**Hilfe bei Problemen:** Vercel-Support (im Pro-Tarif per E-Mail), Resend-Support (Dashboard), Astro-Dokumentation (docs.astro.build). Die Projektstruktur steht in `README.md`.

## 9. Einweisung (Skript für 1,5 Stunden, auch als Bildschirmvideo nutzbar)

| Zeit | Thema | Was gezeigt wird |
|---|---|---|
| 0:00–0:10 | Überblick | Seitenstruktur (`docs/01-sitemap.md`), Gestaltungsidee „Schaufenster bei Nacht“, wo Anfragen herkommen |
| 0:10–0:25 | Projekt starten | `npm install`, `npm run dev`, Ordner `src/data`, `src/pages`, `src/content`, `public` |
| 0:25–0:45 | Inhalte ändern (live) | Öffnungszeiten in `site.ts`, einen Preis in `pakete.ts`, eine FAQ in `faq.ts`; Ergebnis im Browser; `npm run qa` |
| 0:45–1:00 | Neuer Artikel | Artikel kopieren, Frontmatter, Text, OG-Bild mit `npm run render:og`, Fehlermeldungen der Prüfung lesen |
| 1:00–1:10 | Bilder und Panoramen | Porträt tauschen, Panorama-Ablauf aus Abschnitt 4 mit Koordinaten-Konsole |
| 1:10–1:20 | Formular und Messung | Testanfrage, Resend-Dashboard, Vercel Analytics (`/danke`, Ereignisse), Search Console |
| 1:20–1:30 | Veröffentlichen und zurückrollen | Vorschau-URL, Live-Schaltung, Instant Rollback; Fragen |
