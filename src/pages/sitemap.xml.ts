import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { site } from "../data/site";

// Nur indexierbare Seiten (keine noindex-Seiten wie Impressum, Danke, Fehler).
// lastmod = Datum des letzten Git-Commits der Quelldatei (auf Vercel haben nach dem
// Klonen alle Dateien dasselbe Dateidatum). Ohne Git: Änderungsdatum der Datei.
const seiten: { path: string; file: string }[] = [
  { path: "/", file: "src/pages/index.astro" },
  { path: "/leistungen", file: "src/pages/leistungen.astro" },
  { path: "/leistungen/seo-geo", file: "src/pages/leistungen/seo-geo.astro" },
  { path: "/leistungen/lokale-seo", file: "src/pages/leistungen/lokale-seo.astro" },
  { path: "/leistungen/360-grad-rundgang", file: "src/pages/leistungen/360-grad-rundgang.astro" },
  { path: "/ki-sichtbarkeits-check", file: "src/pages/ki-sichtbarkeits-check.astro" },
  { path: "/preise", file: "src/pages/preise.astro" },
  { path: "/branchen", file: "src/pages/branchen.astro" },
  { path: "/ueber-mich", file: "src/pages/ueber-mich.astro" },
  { path: "/faq", file: "src/pages/faq.astro" },
  { path: "/kontakt", file: "src/pages/kontakt.astro" },
  { path: "/ratgeber", file: "src/pages/ratgeber/index.astro" },
  { path: "/sitemap", file: "src/pages/sitemap.astro" },
];

const tag = (d: Date) => d.toISOString().slice(0, 10);

function gitDatum(file: string): string | null {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", file], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
  } catch {
    return null;
  }
}

export const GET: APIRoute = async () => {
  const eintraege: { loc: string; lastmod: string }[] = [];
  for (const s of seiten) {
    const ausGit = gitDatum(s.file);
    const st = ausGit ? null : await stat(s.file).catch(() => null);
    eintraege.push({ loc: `${site.url}${s.path}`, lastmod: ausGit ?? tag(st ? st.mtime : new Date()) });
  }
  const artikel = await getCollection("ratgeber");
  for (const a of artikel.sort((x, y) => x.data.reihenfolge - y.data.reihenfolge)) {
    eintraege.push({ loc: `${site.url}/ratgeber/${a.id}`, lastmod: a.data.updated });
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${eintraege.map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </url>`).join("\n")}
</urlset>
`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
