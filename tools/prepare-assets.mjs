// Erzeugt alle statischen Bild-Assets aus assets-source/.
// Aufruf: node tools/prepare-assets.mjs
// Ergebnis: Favicons + Manifest-Icons in public/, Logo für Schema/OG,
// Web-Panoramen in public/panoramen/, Porträt in src/assets/img/.

import sharp from "sharp";
import { mkdir, writeFile, copyFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = (p) => path.join(root, "assets-source", p);
const out = (p) => path.join(root, p);

const INK = { r: 10, g: 12, b: 17, alpha: 1 };

async function ensureDir(p) {
  await mkdir(path.dirname(p), { recursive: true });
}

/** Helles Logo („V“ weiß/orange) mittig auf eine Tinten-Kachel setzen. */
async function tile(size, { radius = 0.22, inset = 0.14 } = {}) {
  const r = Math.round(size * radius);
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="#fff"/></svg>`,
  );
  const inner = Math.round(size * (1 - inset * 2));
  // Das Quell-PNG hat viel Rand; erst beschneiden, dann einpassen.
  const mark = await sharp(src("vistaflows-logo-hell.png"))
    .trim({ threshold: 4 })
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const base = sharp({ create: { width: size, height: size, channels: 4, background: INK } })
    .composite([{ input: mark, gravity: "center" }])
    .png();
  const filled = await base.toBuffer();
  if (radius === 0) return filled;
  return sharp(filled)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

/** Minimaler ICO-Encoder: PNG-Bilder im ICO-Container (ab Windows Vista unterstützt). */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  const dir = Buffer.alloc(16 * images.length);
  let offset = 6 + dir.length;
  images.forEach(({ size, data }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += data.length;
  });
  return Buffer.concat([header, dir, ...images.map((i) => i.data)]);
}

async function favicons() {
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map(async (size) => ({ size, data: await tile(size, { radius: 0.2, inset: 0.1 }) })));
  await writeFile(out("public/favicon.ico"), buildIco(pngs));
  await writeFile(out("public/favicon-32.png"), pngs[1].data);
  // Apple: ohne Transparenz, iOS rundet selbst
  await writeFile(out("public/apple-touch-icon.png"), await sharp(await tile(180, { radius: 0, inset: 0.16 })).flatten({ background: INK }).png().toBuffer());
  await writeFile(out("public/icon-192.png"), await tile(192, { radius: 0.22, inset: 0.16 }));
  await writeFile(out("public/icon-512.png"), await tile(512, { radius: 0.22, inset: 0.16 }));
  // maskable: Motiv in der sicheren Zone (80 %), volle Fläche
  await writeFile(out("public/icon-maskable-512.png"), await tile(512, { radius: 0, inset: 0.24 }));
}

async function logos() {
  // Dunkles Logo (für helle Flächen, Schema.org) und helles Logo (Header/Footer auf Tinte)
  await ensureDir(out("public/logo/vistaflows-logo-512.png"));
  await sharp(src("vistaflows-logo.png")).trim({ threshold: 4 }).resize(512, 512, { fit: "contain", background: { r: 255, g: 255, b: 255, alpha: 0 } }).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(out("public/logo/vistaflows-logo-512.png"));
  await ensureDir(out("src/assets/img/logo-hell.png"));
  await sharp(src("vistaflows-logo-hell.png")).trim({ threshold: 4 }).resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(out("src/assets/img/logo-hell.png"));
  await sharp(src("vistaflows-logo.png")).trim({ threshold: 4 }).resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(out("src/assets/img/logo-dunkel.png"));
}

async function portrait() {
  await ensureDir(out("src/assets/img/sandin-jagurdzija.jpg"));
  await copyFile(src("sandin-jagurdzija.jpg"), out("src/assets/img/sandin-jagurdzija.jpg"));
}

async function panoramas() {
  await mkdir(out("public/panoramen"), { recursive: true });
  const list = [
    ["poly-haven-comfy-cafe-8k.jpg", "cafe"],
    ["poly-haven-hotel-room-8k.jpg", "hotelzimmer"],
  ];
  for (const [file, name] of list) {
    await sharp(src(file)).resize(4096, 2048).webp({ quality: 72, effort: 6 }).toFile(out(`public/panoramen/${name}-4096.webp`));
    await sharp(src(file)).resize(2048, 1024).webp({ quality: 74, effort: 6 }).toFile(out(`public/panoramen/${name}-2048.webp`));
  }
}

await favicons();
await logos();
await portrait();
await panoramas();

const files = [
  "public/favicon.ico",
  "public/favicon-32.png",
  "public/apple-touch-icon.png",
  "public/icon-192.png",
  "public/icon-512.png",
  "public/icon-maskable-512.png",
  "public/logo/vistaflows-logo-512.png",
  "src/assets/img/logo-hell.png",
  "src/assets/img/logo-dunkel.png",
  "src/assets/img/sandin-jagurdzija.jpg",
  "public/panoramen/cafe-4096.webp",
  "public/panoramen/cafe-2048.webp",
  "public/panoramen/hotelzimmer-4096.webp",
  "public/panoramen/hotelzimmer-2048.webp",
];
for (const f of files) {
  const s = await stat(out(f));
  console.log(`${f}  ${(s.size / 1024).toFixed(1)} KB`);
}
