// Erzeugt Vorschaubilder fürs Teilen (OG, 1200 × 630) und die Vorschaubilder der Rundgänge
// (1600 × 1000) mit dem installierten Google Chrome. playwright-core lädt keinen eigenen Browser.
//
//   npm run render:og                    alle Einträge aus tools/render/og-list.json → public/og/*.png
//   npm run render:og -- ratgeber-neu    nur ein Eintrag (Feld „file“)
//   npm run render:poster                alle Szenen aus src/data/rundgaenge.ts → src/assets/img/<poster>.jpg
//   npm run render:poster -- cafe        nur eine Szene (Feld „id“)
//
// Die Vorlagen liegen in tools/render/og.html und tools/render/poster.html. Danach `npm run build`.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import sharp from "sharp";
import { szenen } from "../src/data/rundgaenge.ts";

// Projektordner ohne abschließenden Schrägstrich (sonst schlägt die Pfadprüfung unten fehl)
const root = fileURLToPath(new URL("..", import.meta.url)).replace(/[\\/]+$/, "");
const [mode, only] = process.argv.slice(2);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
};

// Kleiner Server nur für die Vorlagen und ihre Dateien (Schrift, Logo, Pannellum, Panoramen)
const server = createServer(async (req, res) => {
  try {
    const path = normalize(decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname));
    const file = join(root, path);
    if (!file.startsWith(root + sep) || !(await stat(file)).isFile()) throw new Error("nicht gefunden");
    res.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(undefined)));
const address = server.address();
const base = `http://127.0.0.1:${typeof address === "object" && address ? address.port : 0}`;

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

async function renderOg(page) {
  const list = JSON.parse(await readFile(join(root, "tools/render/og-list.json"), "utf8"));
  const todo = only ? list.filter((o) => o.file === only) : list;
  if (!todo.length) throw new Error(`Kein Eintrag „${only}“ in tools/render/og-list.json`);
  await page.setViewportSize({ width: 1200, height: 630 });
  for (const o of todo) {
    const q = new URLSearchParams({ k: o.k, t: o.t, s: o.s });
    await page.goto(`${base}/tools/render/og.html?${q}`);
    await page.waitForFunction(() => window.ready === true, null, { timeout: 15000 });
    const png = await page.screenshot({ type: "png" });
    const out = join(root, "public/og", `${o.file}.png`);
    const info = await sharp(png).png({ palette: true, quality: 90, compressionLevel: 9 }).toFile(out);
    console.log(`public/og/${o.file}.png  ${kb(info.size)}`);
  }
}

async function renderPoster(page) {
  const todo = only ? szenen.filter((s) => s.id === only) : szenen;
  if (!todo.length) throw new Error(`Keine Szene „${only}“ in src/data/rundgaenge.ts`);
  await page.setViewportSize({ width: 1600, height: 1000 });
  for (const s of todo) {
    const cfg = {
      panorama: `/public${s.panorama.gross}`,
      yaw: s.start.yaw,
      pitch: s.start.pitch,
      hfov: s.start.hfov,
      hotspots: s.infopunkte.map(({ pitch, yaw }) => ({ pitch, yaw })),
    };
    await page.goto(`${base}/tools/render/poster.html?cfg=${encodeURIComponent(JSON.stringify(cfg))}`);
    await page.waitForFunction(() => window.ready === true, null, { timeout: 60000 });
    const jpg = await page.locator("#pano").screenshot({ type: "jpeg", quality: 90 });
    const out = join(root, "src/assets/img", `${s.poster}.jpg`);
    const info = await sharp(jpg).toFile(out);
    console.log(`src/assets/img/${s.poster}.jpg  ${kb(info.size)}`);
  }
}

let browser;
try {
  if (mode !== "og" && mode !== "poster") {
    throw new Error("Aufruf: node --experimental-strip-types tools/render.mjs og|poster [Name]");
  }
  browser = await chromium.launch({ channel: "chrome" });
  const page = await browser.newPage();
  if (mode === "og") await renderOg(page);
  else await renderPoster(page);
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await browser?.close();
  server.close();
}
