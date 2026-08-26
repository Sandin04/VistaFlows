# VistaFlows Website

Statische Multi-Page-Website. Kein Framework, kein Build-Schritt, kein `npm install` noetig.

## Seitenstruktur

| Datei | URL | Zweck |
|---|---|---|
| `index.html` | `/` | Startseite mit Hero, Nutzen, Leistungen, Demo, Preisen |
| `leistungen.html` | `/leistungen` | Website, SEO, Automatisierung, 360° Tour im Detail |
| `branchen.html` | `/branchen` | Hotels, Praxen, Showrooms, Fitness, Immobilien |
| `preise.html` | `/preise` | Drei Pakete mit Preisen und Ablauf |
| `ueber-mich.html` | `/ueber-mich` | Person, Arbeitsweise, Einsatzgebiet |
| `faq.html` | `/faq` | Haeufige Fragen (mit FAQ-Schema fuer Google) |
| `kontakt.html` | `/kontakt` | Kontaktformular und Erreichbarkeit |
| `impressum.html` `datenschutz.html` `agb.html` `widerruf.html` | | Rechtstexte |
| `404.html` `danke.html` `danke-widerruf.html` `fehler.html` | | Fehler- und Danke-Seiten |

## Design-System (Stand August 2026)

Das gesamte Aussehen steckt in `style.css`. Ganz oben stehen die Design-Tokens
unter `:root` — Farben, Radien, Abstaende, Schriftgroessen. Wer dort etwas
aendert, aendert es auf allen 15 Seiten gleichzeitig.

**Grundidee:** dunkle Praemium-Flaechen (Kopfbereich, Hero, Baender, Footer)
gegen helle, ruhige Inhaltsbereiche. Orange ist Akzent, nicht Grundfarbe —
es markiert Buttons, aktive Zustaende und Icons, sonst nichts.

Wichtige Tokens:

| Token | Bedeutung |
|---|---|
| `--ink` | dunkler Grundton fuer Header, Hero, Baender, Footer |
| `--surface` / `--surface-2` | Weiss und warmes Off-Weiss fuer Inhaltsflaechen |
| `--accent` / `--accent-deep` | Orange fuer Buttons, Icons, aktive Zustaende |
| `--shell` | maximale Inhaltsbreite (1220 px) |
| `--gutter` | Seitenrand, waechst mit dem Viewport |

## Icons

Es werden **keine Emojis** verwendet. Alle Symbole sind handgezeichnete
SVG-Line-Icons mit einheitlicher Strichstaerke. Sie stecken als
`<symbol>`-Sammlung ganz oben im `<body>` jeder Seite (`class="icon-sprite"`)
und werden so eingebunden:

```html
<svg class="ico" aria-hidden="true" focusable="false"><use href="#i-monitor"></use></svg>
```

Groessen: `ico` (22 px), `ico-sm` (17 px), `ico-lg` (28 px). Die Icons
uebernehmen automatisch die Textfarbe ihres Elternelements.

Vorhandene Namen: `monitor`, `cube360`, `search`, `workflow`, `eye`, `trending`,
`phone`, `mail`, `pin`, `bolt`, `chat`, `clipboard`, `wrench`, `target`,
`handshake`, `shield`, `clock`, `camera`, `users`, `sparkle`, `layers`,
`rocket`, `check`, `alert`, `menu`, `close`, `arrow`, `chevron`, `plus`,
`instagram`, `facebook`, `tiktok`.

Ein neues Icon fuegst du als weiteres `<symbol>` in die Sprite-Sammlung ein —
und zwar auf **jeder** Seite, auf der du es benutzen willst.

## Header und Footer aendern

Beide Bloecke sind auf allen 15 Seiten identisch (nur die aktive Navigation
unterscheidet sich ueber `aria-current="page"`). Wer etwas aendert, muss es
folglich in allen Dateien aendern — am einfachsten per Suchen-und-Ersetzen
ueber den ganzen Ordner.

Die Social-Media-Links stehen an drei Stellen pro Seite: in der Topbar, im
mobilen Menue und im Footer. Zusaetzlich sind sie im `sameAs`-Feld des
JSON-LD-Schemas hinterlegt, damit Google die Profile der Marke zuordnet.

## Mobile Darstellung

Getestet wurde jede Seite bei 320, 375, 414, 768, 1024, 1280 und 1440 px
Breite — ohne horizontales Ueberlaufen. Wer neue Abschnitte baut, sollte
zwei Regeln einhalten:

- Grid- und Flex-Kinder brauchen `min-width: 0`, sonst sprengen lange
  Woerter oder Bilder den Container.
- Feste Pixelbreiten vermeiden. Stattdessen `clamp()` oder `minmax()` nutzen,
  wie es im vorhandenen CSS durchgehend gemacht wird.

Unterhalb von 620 px verschwindet der Button im Kopfbereich; seine Aufgabe
uebernimmt die feste Leiste am unteren Bildschirmrand (`.sticky-cta`).

## Vor dem ersten Deploy

1. **Formular aktivieren** — Der Versand laeuft ueber FormSubmit.co an info@vistaflows.com.
   Nach dem ersten echten Absenden ueber die Live-Seite kommt eine Aktivierungsmail
   an diese Adresse. Erst nach Bestaetigung werden Anfragen zugestellt.
2. **Vercel Analytics aktivieren** — im Vercel-Dashboard unter Analytics einschalten.
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

## Offene Punkte

- **Externe Bilder**: Die Hintergruende der Branchen-Abschnitte und das Demo-Bild
  werden von `images.unsplash.com` geladen. Das ist ein Aufruf zu einem
  US-Anbieter bei jedem Seitenaufruf. Sobald eigene Fotos vorliegen, sollten
  sie in `assets/` liegen und die URLs in `style.css` ersetzt werden — das ist
  datenschutzrechtlich sauberer und laedt schneller.
- **Sitemap-Datum**: `lastmod` in `sitemap.xml` bei groesseren Aenderungen mitziehen.

## Preise aendern

Alle Preise stehen in `preise.html` sowie als Kurzfassung in `index.html`.
Bei Wechsel zur Regelbesteuerung zusaetzlich den Hinweis unter der Preistabelle
in `preise.html` und die Angabe im `impressum.html` anpassen.
