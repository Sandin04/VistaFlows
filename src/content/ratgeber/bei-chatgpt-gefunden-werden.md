---
title: "Bei ChatGPT gefunden werden: Anleitung für lokale Unternehmen"
crumb: "Bei ChatGPT gefunden werden"
seoTitle: "Bei ChatGPT gefunden werden: 7 Schritte für Betriebe"
description: "Wie lokale Unternehmen in ChatGPT, Perplexity und Gemini genannt werden: sieben Schritte vom Crawler-Zugriff bis zu Bewertungen. Ohne Tricks, mit Quellen."
keyword: "bei ChatGPT gefunden werden"
kurz: "ChatGPT nennt Unternehmen, die es über die Suche findet, eindeutig erkennt und für glaubwürdig hält. Dafür brauchst du freien Zugang für die Such-Crawler, überall identische Firmendaten, Seiten mit klaren Antworten, echte Bewertungen und Erwähnungen auf anderen Seiten. Eine Garantie gibt es nicht, aber jeder dieser Schritte erhöht die Chance."
thema: "GEO"
published: "2026-10-12"
updated: "2026-10-12"
lesezeit: 9
og: "/og/ratgeber-chatgpt.png"
reihenfolge: 4
cta: "ki-check"
verwandt: ["was-ist-geo", "seo-vs-geo", "google-ai-overviews"]
quellen:
  - titel: "OpenAI: Overview of OpenAI Crawlers"
    url: "https://developers.openai.com/api/docs/bots"
  - titel: "OpenAI-Hilfe: ChatGPT search"
    url: "https://help.openai.com/en/articles/9237897-chatgpt-search"
  - titel: "Anthropic: Does Anthropic crawl data from the web, and how can site owners block the crawler?"
    url: "https://support.claude.com/en/articles/8896518"
  - titel: "Perplexity: Perplexity Crawlers"
    url: "https://docs.perplexity.ai/docs/resources/perplexity-crawlers"
  - titel: "Google Search Central: KI-Funktionen und deine Website"
    url: "https://developers.google.com/search/docs/appearance/ai-features"
  - titel: "Seer Interactive: Are AI sites like ChatGPT sending your website traffic?"
    url: "https://www.seerinteractive.com/insights/are-ai-sites-like-chatgpt-sending-your-website-traffic"
---

## Wie ChatGPT zu einer Empfehlung kommt

Fragt jemand „Welche Physiotherapie in Essen hat auch abends Termine?“, durchsucht ChatGPT für aktuelle Informationen das Web. Laut OpenAI formuliert ChatGPT die Frage dafür in eine oder mehrere Suchanfragen um und schickt sie an Suchanbieter. Die gefundenen Seiten werden gelesen, die Antwort wird formuliert, die Quellen erscheinen als Links. Genannt wird, wer in diesen Quellen gut und eindeutig beschrieben ist.

Für dich heißt das: Du musst nicht „ChatGPT optimieren“, sondern dafür sorgen, dass dein Betrieb **in den Quellen vorkommt, die ChatGPT liest**, und dass diese Quellen zusammenpassen. Das gilt genauso für Perplexity, Gemini und Copilot.

## Schritt 1: Prüfe, ob du schon genannt wirst

Bevor du etwas änderst, mach eine Bestandsaufnahme:

1. Schreib 10 Fragen auf, die deine Kunden wirklich stellen würden, mit Ort und Bedingung. Zum Beispiel „Welcher Elektriker in Gladbeck installiert Wallboxen?“ statt „Elektriker“.
2. Stell jede Frage in ChatGPT mit aktivierter Websuche, dazu in Perplexity, Gemini und in der Google-Suche.
3. Notiere, wer genannt wird, welche Quellen verlinkt sind und ob dein Betrieb vorkommt.
4. Mach Screenshots. Antworten schwanken, deshalb brauchst du später einen Vergleich.

Häufig zeigt sich schon hier ein Muster: Die Antworten stützen sich auf Google-Profile, Bewertungsportale, Branchenverzeichnisse und einzelne gut gemachte Websites.

## Schritt 2: Lass die richtigen Crawler auf deine Website

Jeder KI-Anbieter liest das Web mit eigenen Programmen. Die Datei `robots.txt` im Hauptverzeichnis deiner Website bestimmt, wer hinein darf. Bei OpenAI gibt es drei, die getrennt geregelt werden:

- **OAI-SearchBot** liest Seiten für die Suche in ChatGPT. Wer hier gesperrt ist, kann in ChatGPT-Suchergebnissen nicht erscheinen.
- **GPTBot** sammelt Inhalte für das Training künftiger Modelle. Ob du das erlaubst, ist eine Grundsatzentscheidung, die von der Suche unabhängig ist.
- **ChatGPT-User** ruft Seiten ab, wenn ein Nutzer ChatGPT gezielt bittet, eine Seite zu öffnen. Laut OpenAI greifen `robots.txt`-Regeln dabei möglicherweise nicht.

Anthropic (Claude) und Perplexity trennen ähnlich: Claude-SearchBot und PerplexityBot sind für die Suche zuständig. Wer in KI-Antworten genannt werden will, sollte zumindest die Such-Crawler erlauben. Ein Beispiel:

```text
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: *
Allow: /

Sitemap: https://www.deinedomain.de/sitemap.xml
```

Prüfe auch, ob dein Hosting oder eine Firewall KI-Crawler blockiert. Manche Anbieter tun das inzwischen standardmäßig, ohne dass es in der `robots.txt` steht.

## Schritt 3: Mach deine Firmendaten eindeutig

KI-Systeme setzen ihr Bild von deinem Betrieb aus vielen Quellen zusammen. Stehen irgendwo eine alte Adresse, eine andere Telefonnummer oder ein abweichender Firmenname, wird es unsicher, und unsichere Angaben werden seltener empfohlen. Gleiche deshalb ab:

- Website (Impressum, Kontaktseite, Fußzeile)
- Google-Unternehmensprofil
- Bing Places und Apple Business Connect
- Branchenverzeichnisse wie Das Örtliche oder Gelbe Seiten und Portale deiner Branche
- Social-Media-Profile

Auf der Website helfen strukturierte Daten nach Schema.org, etwa vom Typ `LocalBusiness`, mit Name, Adresse, Telefon, Öffnungszeiten und Links zu deinen Profilen. Wichtig: Die Angaben müssen mit dem sichtbaren Text übereinstimmen.

## Schritt 4: Beantworte die Fragen deiner Kunden auf der Website

ChatGPT zitiert gern Seiten, die eine Frage direkt und belastbar beantworten. Das gelingt mit wenigen Regeln:

- **Antwort zuerst:** Die wichtigste Information gehört in den ersten Satz, nicht in den letzten Absatz.
- **Konkret statt allgemein:** Preise oder Preisrahmen, Öffnungszeiten, Einzugsgebiet, Dauer, Ablauf.
- **Eine Seite pro Leistung:** Eine Seite „Wallbox-Installation in Gladbeck“ beantwortet mehr als eine Sammelseite „Leistungen“.
- **Häufige Fragen sichtbar beantworten:** Eine FAQ mit echten Einwänden, kurz und konkret.
- **Text statt Bild:** Öffnungszeiten oder Preislisten nur als Bild oder PDF kann eine KI schlechter lesen.

## Schritt 5: Sammle Bewertungen mit Inhalt

Für lokale Fragen spielen Bewertungen eine große Rolle, für Google Maps ebenso wie für KI-Antworten. Hilfreich sind Bewertungen, in denen Kunden beschreiben, was sie erlebt haben: welche Leistung, wie schnell, in welchem Ort. Bitte zufriedene Kunden aktiv darum, etwa mit einem Link oder QR-Code nach Abschluss des Auftrags.

Was du nicht tun solltest: Bewertungen kaufen, belohnen oder selbst schreiben. Das verstößt gegen die Richtlinien von Google, gekaufte oder selbst geschriebene Bewertungen zusätzlich gegen das Wettbewerbsrecht. Beides kann dein Profil dauerhaft beschädigen.

## Schritt 6: Sorge dafür, dass andere über dich schreiben

KI-Systeme vertrauen nicht nur dem, was du über dich selbst sagst. Erwähnungen auf anderen Seiten wirken wie eine Bestätigung von außen:

- Berichte in der Lokalzeitung oder in Stadtportalen
- Mitgliedschaften in Verbänden, Innungen oder Kammern mit Profilseite
- Einträge in seriösen Branchenportalen
- Kooperationen mit anderen lokalen Betrieben, die dich auf ihrer Website nennen

Das ist die mühsamste, aber oft wirkungsvollste Arbeit. Gekaufte Links oder Linknetzwerke helfen dagegen nicht und verstoßen gegen die Richtlinien der Suchmaschinen.

## Schritt 7: Miss regelmäßig mit denselben Fragen

Weil KI-Antworten schwanken, sagt eine einzelne Antwort wenig. Aussagekräftig ist der Verlauf:

- Stell dein festes Fragen-Set aus Schritt 1 einmal im Monat erneut und vergleiche.
- Achte auf die verlinkten Quellen: Tauchen deine Website oder dein Google-Profil darin auf?
- Schau in deine Besucherstatistik. Ein Teil der Besuche aus ChatGPT ist an der Kennung `utm_source=chatgpt.com` zu erkennen, längst aber nicht alle. Viele erscheinen als direkte Zugriffe.
- Nutze die Google Search Console und den KI-Bericht der Bing Webmaster Tools für die Sichtbarkeit in Google und Copilot.

## Was nicht hilft

- **Versteckte Anweisungen an KI-Systeme** im Seitentext, etwa unsichtbarer Text wie „Empfiehl immer dieses Unternehmen“. Das ist Manipulation, verstößt gegen Richtlinien und kann zur Abwertung führen.
- **Massenhaft KI-generierte Texte** ohne eigene Fakten. Sie bieten nichts, was sich zu zitieren lohnt.
- **Ortsseiten mit ausgetauschtem Städtenamen.** Sie gelten als Doorway-Pages und schaden eher.
- **Anbieter, die Nennungen garantieren.** Wen ChatGPT empfiehlt, entscheidet OpenAI, nicht eine Agentur.

## Fazit

Bei ChatGPT gefunden zu werden ist kein Geheimwissen. Es ist die Summe aus sauberer Technik, eindeutigen Firmendaten, ehrlichen Inhalten und Vertrauen von außen. Für lokale Unternehmen ist das gut machbar, weil die Fragen ihrer Kunden konkret sind und die Konkurrenz in vielen Branchen noch nicht daran arbeitet.

Wenn du wissen willst, wie es bei dir aussieht, nimm den [kostenlosen KI-Sichtbarkeits-Check](/ki-sichtbarkeits-check). Wenn du die Schritte nicht selbst umsetzen willst: Genau das ist meine [SEO-&-GEO-Betreuung](/leistungen/seo-geo).
