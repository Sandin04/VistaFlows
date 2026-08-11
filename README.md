# VistaFlows Website

Statische Multi-Page-Website. Kein Framework, kein Build-Schritt, kein `npm install` noetig.

## Seitenstruktur

| Datei | URL | Zweck |
|---|---|---|
| `index.html` | `/` | Startseite mit Hero, Demo, Leistungsuebersicht |
| `leistungen.html` | `/leistungen` | Website, 360° Tour, SEO, Automatisierung im Detail |
| `branchen.html` | `/branchen` | Hotels, Praxen, Showrooms, Fitness, Immobilien |
| `preise.html` | `/preise` | Drei Pakete mit Preisen und Ablauf |
| `ueber-mich.html` | `/ueber-mich` | Person, Arbeitsweise, Einsatzgebiet |
| `faq.html` | `/faq` | Haeufige Fragen (mit FAQ-Schema fuer Google) |
| `kontakt.html` | `/kontakt` | Kontaktformular und Erreichbarkeit |
| `impressum.html` `datenschutz.html` `agb.html` `widerruf.html` | | Rechtstexte |
| `404.html` `danke.html` `danke-widerruf.html` `fehler.html` | | Fehler- und Danke-Seiten |

## Vor dem ersten Deploy

1. **Bilder ergaenzen** — siehe `assets/BILDER-HIER-EINFUEGEN.txt`
2. **Formular aktivieren** — Der Versand laeuft ueber FormSubmit.co an info@vistaflows.com.
   Nach dem ersten echten Absenden ueber die Live-Seite kommt eine Aktivierungsmail
   an diese Adresse. Erst nach Bestaetigung werden Anfragen zugestellt.
3. **Vercel Analytics aktivieren** — im Vercel-Dashboard unter Analytics einschalten.
   Laeuft cookielos, deshalb ist kein Cookie-Banner noetig.

## Deploy

Inhalt dieses Ordners ins GitHub-Repo legen, in Vercel als Framework Preset "Other"
auswaehlen, deployen. `vercel.json` sorgt fuer saubere URLs ohne `.html`,
Cache-Header und Sicherheits-Header.

## Nach dem Deploy

- **Google Search Console**: Property anlegen und `sitemap.xml` einreichen
  (`https://www.vistaflows.com/sitemap.xml`)
- **Google Business Profil**: anlegen bzw. mit denselben Daten wie im Impressum pflegen
- **Rechtstexte pruefen lassen**: Die Texte sind sorgfaeltig erstellte Vorlagen,
  aber keine Rechtsberatung. Vor dem Livegang von einer fachkundigen Stelle pruefen lassen.

## Preise aendern

Alle Preise stehen in `preise.html` sowie als Kurzfassung in `index.html`.
Bei Wechsel zur Regelbesteuerung zusaetzlich den Hinweis unter der Preistabelle
in `preise.html` und die Angabe im `impressum.html` anpassen.

## Neu aufbauen (optional)

Die Seiten wurden aus Vorlagen erzeugt. Falls du den Generator hast:
`cd build && python3 run.py`. Fuer normale Textaenderungen brauchst du ihn nicht —
die HTML-Dateien lassen sich direkt bearbeiten.
