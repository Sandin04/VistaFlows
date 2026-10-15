// Prüft den gebauten Stand in dist/ auf SEO-, Link- und Inhaltsfehler.
// Aufruf: npm run build && npm run check:links
// Beendet sich mit Code 1, wenn Fehler gefunden werden (Warnungen allein: Code 0).

import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE = "https://www.vistaflows.com";

const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

const files = await walk(dist);
const htmlFiles = files.filter((f) => f.endsWith(".html"));
const urlOf = (file) => {
  const rel = "/" + path.relative(dist, file).replace(/\\/g, "/");
  if (rel === "/index.html") return "/";
  return rel.replace(/\.html$/, "");
};

const pages = new Map();
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#x27;/g, "'");

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const url = urlOf(file);
  const get = (re) => {
    const m = html.match(re);
    return m ? decode(m[1]) : null;
  };
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  pages.set(url, {
    file,
    html,
    title: get(/<title>([^<]*)<\/title>/),
    description: get(/<meta name="description" content="([^"]*)"/),
    canonical: get(/<link rel="canonical" href="([^"]*)"/),
    robots: get(/<meta name="robots" content="([^"]*)"/),
    ogImage: get(/<meta property="og:image" content="([^"]*)"/),
    ids,
  });
}

const existsPath = async (p) => {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
};

async function resolveInternal(href) {
  const [p0] = href.split("#");
  const p = (p0.split("?")[0] || "/").replace(/\/+$/, "") || "/";
  if (pages.has(p)) return { ok: true, page: p };
  if (await existsPath(path.join(dist, p))) return { ok: true, page: null };
  return { ok: false };
}

const titles = new Map();
const descriptions = new Map();
let todoCount = 0;

for (const [url, pg] of pages) {
  const noindex = (pg.robots || "").includes("noindex");
  const isSpecial = url === "/404";

  if (!pg.title) err(url, "kein <title>");
  else {
    if (pg.title.length > 60) warn(url, `Title ${pg.title.length} Zeichen (> 60): ${pg.title}`);
    if (pg.title.length < 30) warn(url, `Title kurz (${pg.title.length})`);
    titles.set(pg.title, [...(titles.get(pg.title) || []), url]);
  }
  if (!pg.description) err(url, "keine Meta-Description");
  else {
    const n = pg.description.length;
    if (n > 160) warn(url, `Description ${n} Zeichen (> 160)`);
    if (n < 110 && !noindex) warn(url, `Description kurz (${n})`);
    descriptions.set(pg.description, [...(descriptions.get(pg.description) || []), url]);
  }
  const expectedCanonical = `${SITE}${url === "/" ? "/" : url}`;
  if (!isSpecial && pg.canonical !== expectedCanonical) err(url, `Canonical ${pg.canonical} statt ${expectedCanonical}`);

  const h1 = (pg.html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) err(url, `${h1} × H1`);

  // Überschriften-Reihenfolge (nur im <main>)
  const main = pg.html.slice(pg.html.indexOf("<main"), pg.html.indexOf("</main>"));
  const levels = [...main.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1) {
      err(url, `Überschrift springt von H${levels[i - 1]} auf H${levels[i]}`);
      break;
    }
  }

  // JSON-LD
  for (const m of pg.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      err(url, `JSON-LD ungültig: ${e.message}`);
    }
  }

  // Bilder mit alt
  for (const m of pg.html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt(=|\s|>|\/)/.test(m[0])) err(url, `Bild ohne alt: ${m[0].slice(0, 90)}`);
  }

  // OG-Bild vorhanden
  if (pg.ogImage) {
    const local = pg.ogImage.replace(SITE, "");
    if (!(await existsPath(path.join(dist, local)))) err(url, `OG-Bild fehlt: ${local}`);
  } else err(url, "kein og:image");

  // style-Attribute (CSP) und Inline-Handler
  const styleAttrs = (pg.html.match(/\sstyle="/g) || []).length;
  if (styleAttrs) err(url, `${styleAttrs} style-Attribut(e), werden von der CSP blockiert`);
  if (/\son(click|load|error|submit|change|input)=/.test(pg.html)) err(url, "Inline-Event-Handler gefunden");

  // Platzhalter
  const todos = (pg.html.match(/\[TODO-KUNDE/g) || []).length;
  if (todos) {
    todoCount += todos;
    warn(url, `${todos} × [TODO-KUNDE]`);
  }
  if (/lorem ipsum|max mustermann/i.test(pg.html)) err(url, "Platzhaltertext gefunden");

  // Interne Links und Anker
  for (const m of pg.html.matchAll(/<a\b[^>]*\shref="([^"]+)"/g)) {
    const href = decode(m[1]);
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      if (href.startsWith(SITE)) warn(url, `absoluter interner Link: ${href}`);
      continue;
    }
    if (href.startsWith("#")) {
      if (href.length > 1 && !pg.ids.has(href.slice(1))) err(url, `Anker fehlt auf derselben Seite: ${href}`);
      continue;
    }
    if (!href.startsWith("/")) {
      warn(url, `relativer Link: ${href}`);
      continue;
    }
    if (/\.html(\?|#|$)/.test(href)) err(url, `Link mit .html: ${href}`);
    if (/.\/(\?|#|$)/.test(href)) err(url, `Link mit abschließendem Slash: ${href}`);
    const r = await resolveInternal(href);
    if (!r.ok) {
      err(url, `toter Link: ${href}`);
      continue;
    }
    const hash = href.split("#")[1];
    if (hash && r.page && !pages.get(r.page).ids.has(hash)) err(url, `Anker fehlt: ${href}`);
  }
}

for (const [t, urls] of titles) if (urls.length > 1) err(urls.join(", "), `doppelter Title: ${t}`);
for (const [d, urls] of descriptions) if (urls.length > 1) err(urls.join(", "), `doppelte Description: ${d.slice(0, 60)}…`);

// Sitemap
const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8").catch(() => "");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, "") || "/");
for (const loc of locs) {
  const pg = pages.get(loc);
  if (!pg) err("sitemap.xml", `URL ohne Seite: ${loc}`);
  else if ((pg.robots || "").includes("noindex")) err("sitemap.xml", `noindex-Seite in der Sitemap: ${loc}`);
}
for (const [url, pg] of pages) {
  const indexable = !(pg.robots || "").includes("noindex") && url !== "/404";
  if (indexable && !locs.includes(url)) err("sitemap.xml", `indexierbare Seite fehlt: ${url}`);
}

// robots.txt und llms.txt
const robots = await readFile(path.join(dist, "robots.txt"), "utf8").catch(() => "");
if (!robots.includes("Sitemap: https://www.vistaflows.com/sitemap.xml")) err("robots.txt", "Sitemap-Verweis fehlt");
if (/Disallow:\s*\/\s*$/m.test(robots)) err("robots.txt", "Disallow: / gefunden");
const llms = await readFile(path.join(dist, "llms.txt"), "utf8").catch(() => "");
if (!llms.startsWith("# VistaFlows")) err("llms.txt", "fehlt oder beginnt nicht mit H1");
for (const m of llms.matchAll(/\]\((https:\/\/www\.vistaflows\.com[^)]*)\)/g)) {
  const r = await resolveInternal(m[1].replace(SITE, "") || "/");
  if (!r.ok) err("llms.txt", `toter Link: ${m[1]}`);
}

console.log(`Seiten: ${pages.size} · Sitemap-URLs: ${locs.length} · offene [TODO-KUNDE]: ${todoCount}`);
console.log(`Fehler: ${errors.length} · Warnungen: ${warnings.length}`);
if (errors.length) console.log("\nFEHLER\n" + errors.map((e) => `  ✗ ${e}`).join("\n"));
if (warnings.length) console.log("\nWARNUNGEN\n" + warnings.map((w) => `  ! ${w}`).join("\n"));
process.exit(errors.length ? 1 : 0);
