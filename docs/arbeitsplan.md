# Arbeitsplan VistaFlows-Relaunch (To-do-Liste nach website-builder.md)

Bestätigt am 2026-10-12. TaskCreate/TaskUpdate gibt es in dieser Sitzung nicht, deshalb wird die Liste hier geführt und abgehakt.

## Phase 1–2 (erledigt)
- [x] Preflight Skills (✅/❌-Liste an Sandin)
- [x] Bestandsaufnahme Live-Seite → `docs/00-audit.md`, Screenshots `docs/screenshots/audit/`
- [x] Wettbewerb + Marktpreise + Paketvorschlag → `docs/00b-wettbewerb-pakete.md`
- [x] Fragenrunde (8 Fragen) + Bestätigung der Zusammenfassung

## Phase 3 – Strategie & Design-Fundament
- [x] Positionierung (2 Sätze), Conversion-Strategie mit CTA-Hierarchie, Vertrauensstrategie ohne Referenzen
- [x] Content-Plan: Seitenliste mit Zweck, Keyword, Intention, Zielwortzahl, Verantwortlichem
- [x] `docs/01-sitemap.md` (Baum, URL-Schema, interne Verlinkung, Navigation)
- [x] `docs/02-redirects.csv` (bestehende URLs bleiben; Anker und Kurz-URLs)
- [x] `impeccable init` → `PRODUCT.md`
- [x] Designsystem (Kontrast-Fix, selbst gehostete Schrift, Tokens) → `impeccable document` → `DESIGN.md`
- [x] Tech-Stack-Begründung (Astro + Vercel + Resend + Pannellum)

## Phase 4 – Bau
- [x] Astro-Projekt aufsetzen (gleiche URLs ohne Slash, `cleanUrls`)
- [x] Panoramen laden (CC0), fürs Web verkleinern, Vorschaubilder rendern
- [x] Tokens + Basis-CSS aus dem Rebranding übernehmen und bereinigen (Scroll-Einblendungen ganz entfernt: Inhalte sind sofort sichtbar, auch ohne JavaScript)
- [x] Layout-Komponenten: Head/SEO, Header + Mobilmenü (Fokusfalle), Footer, Breadcrumbs, Icons, CTA-Band, FAQ, Preis-Karten, Prozess, Formular (statt Modal: Kontaktseite mit Paket-Vorauswahl), Sticky-CTA, 360°-Viewer
- [x] Stammdaten und Preise zentral (`src/data/`)
- [x] Tier 1: Start, Leistungen, Preise, Kontakt, Rechtliches
- [x] Tier 1 neu: `/leistungen/seo-geo`, `/leistungen/lokale-seo`, `/leistungen/360-grad-rundgang`, `/ki-sichtbarkeits-check`
- [x] Tier 2: Über mich, FAQ, Branchen
- [x] Tier 3: `/ratgeber` + 6 Artikel, `/sitemap` (HTML)
- [x] Danke, Danke-Widerruf, Fehler, 404
- [x] Formular-Endpunkt (Vercel Function, Resend, Honeypot, Zeitfalle, Rate-Limit, Auto-Antwort) + 18 automatische Tests
- [x] Referenz-Bausteine vorbereiten, aber deaktiviert lassen

## Phase 5 – Technisches SEO
- [x] Title/Description/H1/Canonical/OG je Seite, OG-Bilder 1200×630 je Hauptseite
- [x] JSON-LD: ProfessionalService, WebSite, BreadcrumbList, Service/Offer, Article, Person, FAQPage (nur sichtbare FAQs)
- [x] `sitemap.xml` (nur indexierbare URLs, echtes lastmod), `robots.txt`, `llms.txt`
- [x] Favicons + Manifest (ICO, PNG 32/180/192/512, maskable). SVG-Favicon offen: braucht ein Vektor-Logo (todo-kunde)

## Phase 6 – Performance, Sicherheit, Technik
- [x] Bilder AVIF/WebP + Größen, Schrift selbst gehostet, LCP mobil 1,4–1,7 s (vorher 2,8 s)
- [x] Sicherheits-Header inkl. CSP (Meta-CSP mit Hashes + Header in `vercel.json`), `npm audit` 0
- [x] README, `.gitignore`, `.env.example`, `.vercelignore`, `tsconfig.json`; Typprüfung (`npm run check`) 0 Fehler; `npm run qa`
- [x] Render-Skript für OG-Bilder und Rundgang-Poster im Projekt (`npm run render:og`, `render:poster`)

## Phase 7 – Recht & Barrierefreiheit
- [x] Datenschutz aktualisiert (Vercel, Analytics inkl. Klick-Ereignisse, Formulare, Resend USA/DPF/30 Tage, KI-Check, keine Cookies, keine fremden Bilder/Schriften)
- [x] AGB/Impressum/Widerruf überarbeitet und als Entwurf gekennzeichnet (Prüfung durch Fachleute offen → `docs/todo-kunde.md`)
- [x] BFSG-Hinweis (`docs/todo-kunde.md` Nr. 23), WCAG 2.2 AA automatisch und per Tastatur geprüft

## Phase 8 – Analytics & Messung
- [x] Messkonzept `docs/03-messkonzept.md` (Formular, KI-Check, Widerruf, Telefon- und E-Mail-Klick; Danke-Seiten; Tarif-Hinweis Vercel Pro)

## Phase 9 – Qualitäts-Gates
- [x] impeccable critique (27/36) + audit (18/20) + detect → polish, Snapshot geschlossen
- [x] web-design-guidelines über den UI-Code
- [x] emil-design-eng, break-ui (`/_dev/break-ui`), mobile-native; `review-animations` nur durch dich startbar
- [x] playwright-cli: 320/360/768/1024/1440/1920, Menü, Formular (Erfolg + Fehler), 404, Danke, Links, Konsole
- [x] Lighthouse mobil + desktop: 100/100/100/100 auf 10 Seiten, Vergleich mit Baseline
- [x] Barrierefreiheit: axe 0, Kontrast-Nachrechnung, Tastatur, Zoom 200 %, Accessibility-Tree (echter Screenreader-Test offen)
- [x] SEO-Check, Sicherheits-Check, Inhalts-Check
- [x] `docs/99-qa-report.md`
- [ ] Browser-Matrix Safari, Firefox, iOS, Android (keine Geräte/Browser hier; Checkliste für dich)

## Phase 10 + Übergabe
- [x] Pre-Launch-Checkliste `docs/launch-checkliste.md` (inkl. Rollback, DNS)
- [x] `docs/seo-checklist.md`, `docs/todo-kunde.md`, `docs/anleitung.md` (Anleitung, Wartungsplan, Einweisungs-Skript)
- [x] Abschlussbericht (max. 20 Zeilen)
- [ ] Deploy – erst nach deiner Freigabe
