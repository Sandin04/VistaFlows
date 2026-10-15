// Lokaler Server für Tests, der sich wie Vercel verhält:
// cleanUrls, trailingSlash: false, Weiterleitungen und Header aus vercel.json,
// echte 404-Antwort, Brotli/Gzip, /api/anfrage über lib/anfrage.mjs.
// Aufruf: npm run build && npm run preview   (Port: PORT, Standard 4321)
// Ohne RESEND_API_KEY läuft das Formular im Testmodus (nichts wird gesendet).

import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleAnfrage } from "../lib/anfrage.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const vercel = JSON.parse(await readFile(path.join(root, "vercel.json"), "utf8"));
const PORT = Number(process.env.PORT || 4321);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};
const COMPRESSIBLE = /^(text\/|application\/(json|xml|manifest\+json|javascript))|image\/svg/;

const toRegex = (source) => new RegExp(`^${source.replace(/\(\.\*\)/g, "(.*)").replace(/:(\w+)/g, "([^/]+)")}$`);
const headerRules = (vercel.headers || []).map((h) => ({ re: toRegex(h.source), headers: h.headers }));
const redirectRules = (vercel.redirects || []).map((r) => ({ re: toRegex(r.source), to: r.destination, status: r.permanent ? 308 : 307 }));

function applyHeaders(pathname, res) {
  for (const rule of headerRules) {
    if (rule.re.test(pathname)) for (const { key, value } of rule.headers) res.setHeader(key, value);
  }
}

async function exists(p) {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
}

async function sendFile(req, res, file, status = 200) {
  const ext = path.extname(file).toLowerCase();
  const type = TYPES[ext] || "application/octet-stream";
  res.setHeader("Content-Type", type);
  const accept = req.headers["accept-encoding"] || "";
  if (COMPRESSIBLE.test(type) && /\bbr\b/.test(accept)) {
    res.writeHead(status, { "Content-Encoding": "br", Vary: "Accept-Encoding" });
    createReadStream(file).pipe(zlib.createBrotliCompress()).pipe(res);
  } else if (COMPRESSIBLE.test(type) && /\bgzip\b/.test(accept)) {
    res.writeHead(status, { "Content-Encoding": "gzip", Vary: "Accept-Encoding" });
    createReadStream(file).pipe(zlib.createGzip()).pipe(res);
  } else {
    res.writeHead(status);
    if (req.method === "HEAD") return res.end();
    createReadStream(file).pipe(res);
  }
}

async function handleApi(req, res, url) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const headers = new Headers();
  for (const [k, v] of Object.entries(req.headers)) if (typeof v === "string") headers.set(k, v);
  if (!headers.get("x-forwarded-for")) headers.set("x-forwarded-for", req.socket.remoteAddress || "127.0.0.1");
  const request = new Request(url, {
    method: req.method,
    headers,
    body: ["GET", "HEAD"].includes(req.method) ? undefined : Buffer.concat(chunks),
  });
  const env = { ...process.env };
  if (!env.RESEND_API_KEY && env.ANFRAGE_DRY_RUN === undefined) env.ANFRAGE_DRY_RUN = "1";
  const response = await handleAnfrage(request, { env });
  applyHeaders(url.pathname, res);
  response.headers.forEach((v, k) => res.setHeader(k, v));
  res.writeHead(response.status);
  res.end(Buffer.from(await response.arrayBuffer()));
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || `localhost:${PORT}`}`);
    let pathname = decodeURIComponent(url.pathname);

    if (pathname.startsWith("/api/")) {
      if (pathname === "/api/anfrage") return await handleApi(req, res, url);
      res.writeHead(404).end();
      return;
    }

    for (const r of redirectRules) {
      if (r.re.test(pathname)) {
        res.writeHead(r.status, { Location: r.to });
        return res.end();
      }
    }

    // trailingSlash: false und cleanUrls (.html entfernen)
    if (pathname.length > 1 && pathname.endsWith("/")) {
      res.writeHead(308, { Location: pathname.replace(/\/+$/, "") + url.search });
      return res.end();
    }
    if (pathname.endsWith(".html")) {
      const clean = pathname === "/index.html" ? "/" : pathname.replace(/\.html$/, "");
      res.writeHead(308, { Location: clean + url.search });
      return res.end();
    }

    applyHeaders(pathname, res);
    const direct = path.join(dist, pathname);
    if (!direct.startsWith(dist)) {
      res.writeHead(400).end();
      return;
    }
    if (pathname !== "/" && (await exists(direct))) return await sendFile(req, res, direct);
    const htmlFile = pathname === "/" ? path.join(dist, "index.html") : `${direct}.html`;
    if (await exists(htmlFile)) return await sendFile(req, res, htmlFile);

    const notFound = path.join(dist, "404.html");
    if (await exists(notFound)) return await sendFile(req, res, notFound, 404);
    res.writeHead(404).end("Not found");
  } catch (err) {
    console.error(err);
    res.writeHead(500).end("Serverfehler");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`VistaFlows lokal: http://localhost:${PORT}  (Formular: ${process.env.RESEND_API_KEY ? "Resend aktiv" : "Testmodus"})`);
});
