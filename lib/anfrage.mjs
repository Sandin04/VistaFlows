// Kernlogik der Anfrage-Funktion. Ohne Abhängigkeiten, damit sie in der
// Vercel-Funktion (api/anfrage.js), im lokalen Testserver und in den Tests
// identisch läuft.
//
// Umgebungsvariablen:
//   RESEND_API_KEY   API-Schlüssel von Resend (Absender-Domain vistaflows.com dort verifiziert)
//   MAIL_FROM        Absender, z. B. "VistaFlows <anfrage@vistaflows.com>"
//   MAIL_TO          Empfänger der Benachrichtigung (Standard: info@vistaflows.com)
//   ANFRAGE_DRY_RUN  "1" = nichts senden, nur protokollieren (lokal/Tests)

export const LIMITS = {
  name: 100,
  email: 254,
  telefon: 40,
  unternehmen: 120,
  website: 200,
  paket: 120,
  nachricht: 4000,
  branche: 160,
  dienstleistung: 200,
  anschrift: 400,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[0-9+()/\-\s]{5,40}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const MIN_FILL_MS = 2500;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 6;

const OWNER = {
  name: "VistaFlows",
  person: "Sandin Jagurdzija",
  street: "Hans-Böckler-Straße 235",
  city: "46242 Bottrop",
  phone: "+49 174 3154839",
  email: "info@vistaflows.com",
  web: "https://www.vistaflows.com",
};

const REDIRECTS = {
  anfrage: "/danke",
  "ki-check": "/danke?typ=ki-check",
  widerruf: "/danke-widerruf",
};

/** Speicher für die Mengenbegrenzung. Pro Funktionsinstanz, bewusst einfach. */
export function createRateStore() {
  const hits = new Map();
  return {
    hit(key, now) {
      const list = (hits.get(key) || []).filter((t) => now - t < RATE_WINDOW_MS);
      list.push(now);
      hits.set(key, list);
      return list.length;
    },
  };
}

const defaultRateStore = createRateStore();

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clean(value, max) {
  if (typeof value !== "string") return "";
  // Steuerzeichen entfernen (außer Zeilenumbruch und Tab), Länge begrenzen
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max);
}

/** Liest Formular- oder JSON-Daten in ein flaches Objekt. */
export async function readBody(request) {
  const type = request.headers.get("content-type") || "";
  if (type.includes("application/json")) {
    const json = await request.json().catch(() => ({}));
    return json && typeof json === "object" ? json : {};
  }
  if (type.includes("application/x-www-form-urlencoded") || type.includes("multipart/form-data")) {
    const fd = await request.formData();
    const out = {};
    for (const [k, v] of fd.entries()) if (typeof v === "string") out[k] = v;
    return out;
  }
  return {};
}

/** Prüft und normalisiert die Eingaben. Gibt { data, fields } zurück; fields = ungültige Felder. */
export function validate(raw) {
  const typ = ["anfrage", "ki-check", "widerruf"].includes(raw.typ) ? raw.typ : "anfrage";
  const d = { typ };
  for (const [key, max] of Object.entries(LIMITS)) d[key] = clean(raw[key], max);
  d.bestellt_am = clean(raw.bestellt_am, 10);
  d.erhalten_am = clean(raw.erhalten_am, 10);
  d.datenschutz = raw.datenschutz === "ja" || raw.datenschutz === "on" || raw.datenschutz === true;

  const fields = [];
  if (d.name.length < 2) fields.push("name");
  if (!EMAIL.test(d.email)) fields.push("email");

  if (typ === "widerruf") {
    if (d.dienstleistung.length < 3) fields.push("dienstleistung");
    if (!DATE.test(d.bestellt_am)) fields.push("bestellt_am");
    if (d.erhalten_am && !DATE.test(d.erhalten_am)) fields.push("erhalten_am");
    if (d.anschrift.length < 3) fields.push("anschrift");
  } else {
    if (d.telefon && !PHONE.test(d.telefon)) fields.push("telefon");
    if (!d.datenschutz) fields.push("datenschutz");
    if (typ === "ki-check") {
      if (d.website.length < 3) fields.push("website");
      if (d.branche.length < 3) fields.push("branche");
      d.paket = "KI-Sichtbarkeits-Check (kostenlos)";
    }
    if (!d.paket) d.paket = "Kostenloses Erstgespräch";
  }
  return { data: d, fields };
}

const SUBJECTS = {
  anfrage: (d) => `Neue Anfrage: ${d.paket} – ${d.name}`,
  "ki-check": (d) => `KI-Sichtbarkeits-Check: ${d.branche} – ${d.name}`,
  widerruf: (d) => `Widerruf eingegangen – ${d.name}`,
};

const CONFIRM_SUBJECTS = {
  anfrage: "Deine Anfrage bei VistaFlows ist angekommen",
  "ki-check": "Dein KI-Sichtbarkeits-Check bei VistaFlows",
  widerruf: "Eingangsbestätigung deines Widerrufs",
};

function rows(d) {
  const all = [
    ["Art", { anfrage: "Anfrage", "ki-check": "KI-Sichtbarkeits-Check", widerruf: "Widerruf" }[d.typ]],
    ["Paket / Anliegen", d.typ === "widerruf" ? "" : d.paket],
    ["Name", d.name],
    ["E-Mail", d.email],
    ["Telefon", d.telefon],
    ["Unternehmen", d.unternehmen],
    ["Website", d.website],
    ["Branche und Ort", d.branche],
    ["Dienstleistung", d.dienstleistung],
    ["Bestellt am", d.bestellt_am],
    ["Erhalten am", d.erhalten_am],
    ["Anschrift", d.anschrift],
    ["Nachricht", d.nachricht],
  ];
  return all.filter(([, v]) => v);
}

function htmlTable(d) {
  return `<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font:15px/1.5 Arial,sans-serif;color:#14181f">${rows(d)
    .map(
      ([k, v]) =>
        `<tr><th align="left" valign="top" style="border-bottom:1px solid #e5e3de;color:#626b7a;font-weight:600">${escapeHtml(k)}</th><td style="border-bottom:1px solid #e5e3de;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere">${escapeHtml(v)}</td></tr>`,
    )
    .join("")}</table>`;
}

function textTable(d) {
  return rows(d)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
}

const footerText = `\n\n—\n${OWNER.name} · Inhaber ${OWNER.person}\n${OWNER.street}, ${OWNER.city}\nTelefon ${OWNER.phone} · ${OWNER.email}\n${OWNER.web}`;
const footerHtml = `<p style="margin-top:28px;padding-top:14px;border-top:1px solid #e5e3de;font:13px/1.5 Arial,sans-serif;color:#626b7a">${OWNER.name} · Inhaber ${OWNER.person}<br>${OWNER.street}, ${OWNER.city}<br>Telefon ${OWNER.phone} · <a href="mailto:${OWNER.email}" style="color:#b34700">${OWNER.email}</a><br><a href="${OWNER.web}" style="color:#b34700">www.vistaflows.com</a></p>`;

const CONFIRM_INTRO = {
  anfrage: (d) => [
    `Hallo ${d.name},`,
    "danke für deine Anfrage. Sie ist bei mir angekommen und ich melde mich innerhalb von 24 Stunden an Werktagen persönlich bei dir.",
    "So geht es weiter: Im kostenlosen Erstgespräch (etwa 20 Minuten, Telefon oder Video) klären wir, was du brauchst. Danach bekommst du ein schriftliches Festpreisangebot.",
  ],
  "ki-check": (d) => [
    `Hallo ${d.name},`,
    "danke für deine Anforderung des kostenlosen KI-Sichtbarkeits-Checks.",
    `Ich stelle ChatGPT, Perplexity, Gemini und der Google-Suche mit KI-Übersicht 10 typische Fragen zu „${d.branche}“ und schicke dir das Ergebnis als Kurzbericht. Innerhalb von 24 Stunden an Werktagen melde ich mich persönlich bei dir. Danach können wir in 15 Minuten über die wichtigsten Hebel sprechen, wenn du möchtest.`,
  ],
  widerruf: (d) => [
    `Hallo ${d.name},`,
    "hiermit bestätige ich den Eingang deines Widerrufs. Ich bearbeite ihn umgehend und melde mich mit den nächsten Schritten.",
  ],
};

export function buildMails(d, { from, to }) {
  const notify = {
    from,
    to: [to],
    reply_to: d.email,
    subject: SUBJECTS[d.typ](d),
    html: `<p style="font:15px/1.5 Arial,sans-serif;color:#14181f">Neue Nachricht über das Formular auf vistaflows.com:</p>${htmlTable(d)}`,
    text: `Neue Nachricht über das Formular auf vistaflows.com:\n\n${textTable(d)}`,
    tags: [{ name: "typ", value: d.typ.replace(/[^a-z0-9_-]/gi, "") }],
  };
  const intro = CONFIRM_INTRO[d.typ](d);
  const confirm = {
    from,
    to: [d.email],
    reply_to: to,
    subject: CONFIRM_SUBJECTS[d.typ],
    html: `${intro.map((p) => `<p style="font:15px/1.6 Arial,sans-serif;color:#14181f">${escapeHtml(p)}</p>`).join("")}<p style="font:15px/1.6 Arial,sans-serif;color:#14181f">Deine Angaben im Überblick:</p>${htmlTable(d)}<p style="font:15px/1.6 Arial,sans-serif;color:#14181f">Viele Grüße<br>Sandin Jagurdzija</p>${footerHtml}`,
    text: `${intro.join("\n\n")}\n\nDeine Angaben im Überblick:\n${textTable(d)}\n\nViele Grüße\nSandin Jagurdzija${footerText}`,
  };
  return { notify, confirm };
}

/** Versand über die Resend-REST-API. */
export function resendMailer(apiKey, fetchImpl = fetch) {
  return async (payload, idempotencyKey) => {
    const res = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
    }
    return res.json().catch(() => ({}));
  };
}

function originAllowed(origin, host) {
  if (!origin) return true;
  try {
    const o = new URL(origin);
    if (o.host === host) return true;
    if (["www.vistaflows.com", "vistaflows.com"].includes(o.hostname)) return true;
    if (o.hostname.endsWith(".vercel.app")) return true;
    if (o.hostname === "localhost" || o.hostname === "127.0.0.1") return true;
    return false;
  } catch {
    return false;
  }
}

function respond(request, status, body) {
  const wantsJson = (request.headers.get("accept") || "").includes("application/json");
  if (wantsJson) {
    return new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
  const location = body.ok ? body.redirect : "/fehler";
  return new Response(null, { status: 303, headers: { Location: location, "Cache-Control": "no-store" } });
}

/**
 * Bearbeitet eine Anfrage und gibt eine Response zurück.
 * opts: { env, now, rateStore, mailer, log }
 */
export async function handleAnfrage(request, opts = {}) {
  const env = opts.env || {};
  const now = typeof opts.now === "number" ? opts.now : Date.now();
  const rateStore = opts.rateStore || defaultRateStore;
  const log = opts.log || console;

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: { Allow: "POST, OPTIONS" } });
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ ok: false, error: "Nur POST erlaubt." }), {
      status: 405,
      headers: { Allow: "POST, OPTIONS", "Content-Type": "application/json; charset=utf-8" },
    });
  }

  const host = request.headers.get("host") || "";
  if (!originAllowed(request.headers.get("origin"), host)) {
    return respond(request, 403, { ok: false, error: "Anfrage von einer fremden Seite abgelehnt." });
  }

  const ip = (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || request.headers.get("x-real-ip") || "unbekannt";
  if (rateStore.hit(ip, now) > RATE_MAX) {
    return respond(request, 429, {
      ok: false,
      error: "Zu viele Anfragen in kurzer Zeit. Bitte versuche es in ein paar Minuten erneut oder ruf an: +49 174 3154839.",
    });
  }

  let raw;
  try {
    raw = await readBody(request);
  } catch {
    return respond(request, 400, { ok: false, error: "Die Anfrage konnte nicht gelesen werden." });
  }

  const { data, fields } = validate(raw);
  const redirect = REDIRECTS[data.typ];

  // Spamschutz: Honigtopf-Feld gefüllt oder Formular in unter 2,5 s abgeschickt.
  // Bots bekommen eine Erfolgsmeldung, es wird aber nichts versendet.
  const filled = typeof raw.fax === "string" && raw.fax.trim() !== "";
  const t = Number(raw.t);
  const tooFast = Number.isFinite(t) && t > 0 && now - t < MIN_FILL_MS;
  if (filled || tooFast) {
    log.warn?.(`[anfrage] verworfen (${filled ? "Honigtopf" : "zu schnell"})`);
    return respond(request, 200, { ok: true, redirect });
  }

  if (fields.length) {
    return respond(request, 422, { ok: false, error: "Bitte prüfe die markierten Felder.", fields });
  }

  const from = env.MAIL_FROM || "VistaFlows <anfrage@vistaflows.com>";
  const to = env.MAIL_TO || OWNER.email;
  const { notify, confirm } = buildMails(data, { from, to });

  if (!env.RESEND_API_KEY) {
    if (env.ANFRAGE_DRY_RUN === "1") {
      log.info?.(`[anfrage] Testmodus, nicht gesendet:\n${notify.subject}\n${notify.text}`);
      return respond(request, 200, { ok: true, redirect, dryRun: true });
    }
    log.error?.("[anfrage] RESEND_API_KEY fehlt – Anfrage nicht zustellbar");
    return respond(request, 503, {
      ok: false,
      error: "Das Formular ist gerade nicht erreichbar. Bitte schreib an info@vistaflows.com oder ruf an: +49 174 3154839.",
    });
  }

  const mailer = opts.mailer || resendMailer(env.RESEND_API_KEY);
  const key = `${data.typ}-${data.email}-${Math.floor(now / 60000)}`;
  try {
    await mailer(notify, `n-${key}`);
  } catch (err) {
    log.error?.(`[anfrage] Benachrichtigung fehlgeschlagen: ${err?.message || err}`);
    return respond(request, 502, {
      ok: false,
      error: "Die Anfrage konnte gerade nicht gesendet werden. Bitte versuche es noch einmal oder schreib an info@vistaflows.com.",
    });
  }
  try {
    await mailer(confirm, `c-${key}`);
  } catch (err) {
    // Die Anfrage ist angekommen; nur die Bestätigung an den Absender fehlt.
    log.error?.(`[anfrage] Bestätigung an Absender fehlgeschlagen: ${err?.message || err}`);
  }
  return respond(request, 200, { ok: true, redirect });
}
