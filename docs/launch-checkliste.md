# Launch-Checkliste (Phase 10)

Die neue Seite ersetzt die bestehende auf `www.vistaflows.com`. Alle bisherigen Adressen bleiben erhalten (`docs/02-redirects.csv`), deshalb geht kein Ranking verloren. Veröffentlicht wird erst nach deiner ausdrücklichen Freigabe.

## 1. Vor dem Deploy

- [ ] Alle Punkte „Vor Launch“ aus `docs/todo-kunde.md` erledigt (Rechtstexte, Resend, Vercel-Tarif, AV-Verträge)
- [ ] `npm run qa` lokal ohne Fehler (Typprüfung, 18 Tests, Build, Link- und SEO-Checker)
- [ ] Umgebungsvariablen in Vercel gesetzt: `RESEND_API_KEY`, `MAIL_FROM`, `MAIL_TO` (für Production und Preview)
- [ ] Vercel Web Analytics im Projekt eingeschaltet (Project → Analytics → Enable)
- [ ] DNS-TTL der Domain 24 Stunden vorher auf 300 Sekunden gesenkt (nur nötig, wenn sich DNS-Einträge ändern; läuft die Domain schon über Vercel, entfällt das)

## 2. Deploy (Vorschau zuerst)

1. Vorschau-Deployment erstellen (Git-Branch oder `vercel deploy`). Vorschau-URLs liefert Vercel mit `X-Robots-Tag: noindex` aus, sie erscheinen nicht in Google.
2. Auf der Vorschau-URL testen:
   - [ ] Alle drei Formulare absenden: Benachrichtigung an `info@vistaflows.com` und Eingangsbestätigung kommen an (Spam-Ordner prüfen)
   - [ ] 360°-Rundgang startet, Infopunkte öffnen, Vollbild funktioniert
   - [ ] Mobilmenü, Sticky-Leiste, Telefon-Link öffnet die Telefon-App
3. Production-Deployment (`vercel deploy --prod` oder Merge in den Hauptbranch).

## 3. Direkt nach dem Livegang (30 Minuten)

- [ ] `https://www.vistaflows.com` lädt, Schloss-Symbol (SSL) gültig, `http://` leitet auf `https://` um
- [ ] Alte Adressen testen: `/leistungen`, `/preise`, `/kontakt`, `/ueber-mich`, `/impressum`, `/datenschutz`, `/agb`, `/widerruf`, `/faq` liefern 200; `/ki-check`, `/rundgang`, `/geo`, `/seo` leiten dauerhaft weiter
- [ ] `/robots.txt`, `/sitemap.xml`, `/llms.txt` erreichbar; im Seitenquelltext steht `index, follow` (nicht `noindex`) auf Start und Leistungsseiten
- [ ] Sicherheits-Header messen: <https://observatory.mozilla.org> und <https://securityheaders.com> (Ziel: A oder besser)
- [ ] Google Rich-Results-Test für Start, `/faq` und einen Ratgeber-Artikel: <https://search.google.com/test/rich-results>
- [ ] Favicon, Vorschaubild beim Teilen (z. B. Link in WhatsApp an dich selbst schicken), Social-Links im Footer
- [ ] Eine echte Testanfrage über das Kontaktformular; in Vercel Analytics erscheint der Aufruf von `/danke`
- [ ] Search Console: Sitemap einreichen, Startseite per URL-Prüfung zur Indexierung anmelden; Bing Webmaster Tools: Sitemap einreichen
- [ ] Google-Unternehmensprofil: Website-Link prüfen (mit UTM-Parametern laut Messkonzept), Name, Adresse, Telefon identisch zur Website

## 4. Geräte-Test (15 Minuten, eigenes Handy)

- [ ] iPhone Safari: Startseite, Menü, Rundgang (Wischen, Zoomen, Infopunkt), Formular mit offener Tastatur (verdeckt nichts), Querformat (Inhalt nicht unter der Notch)
- [ ] Android Chrome: dieselben Schritte
- [ ] Desktop Safari und Firefox: Startseite, Preise, Kontaktformular, Rundgang

## 5. Erste zwei Wochen

- [ ] Search Console alle paar Tage: Indexierung, Crawling-Fehler, 404-Meldungen; fehlende Weiterleitungen in `vercel.json` nachtragen
- [ ] Formular-Eingänge täglich prüfen (kommt alles an?)
- [ ] Vercel Analytics: Top-Seiten, Referrer, Aufrufe von `/danke`
- [ ] Core Web Vitals aus echten Daten beobachten (Search Console, sobald genug Besuche da sind)

## 6. Rollback-Plan

Vercel hält jedes frühere Deployment vor. Bei einem Fehler nach dem Livegang:

1. Vercel → Project → Deployments → letztes funktionierendes Deployment → „Promote to Production“ (bzw. „Instant Rollback“). Dauer: unter einer Minute, DNS bleibt unverändert.
2. Ursache auf einer Vorschau-URL beheben, erneut testen, dann wieder veröffentlichen.
3. Die alte statische Seite liegt zusätzlich unverändert in `archiv/rebranding-2026-08/` und kann notfalls als eigenes Projekt deployt werden.

## 7. DNS (nur falls die Domain neu bei Vercel eingerichtet wird)

- Apex `vistaflows.com`: A-Record auf die von Vercel angezeigte IP, oder Nameserver zu Vercel umziehen
- `www.vistaflows.com`: CNAME auf den von Vercel angezeigten Zielnamen
- In Vercel `www.vistaflows.com` als Hauptdomain festlegen, `vistaflows.com` leitet darauf um (die Canonicals zeigen auf `www`)
- E-Mail-Einträge (MX, SPF, DKIM, DMARC) beim Umzug nicht löschen; die Resend-Einträge für DKIM kommen dazu
- Die genauen Werte zeigt Vercel unter Project → Settings → Domains an; sie können sich ändern, deshalb hier keine festen IPs
