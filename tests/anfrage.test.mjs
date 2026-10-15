import { test } from "node:test";
import assert from "node:assert/strict";
import { handleAnfrage, createRateStore, validate, buildMails, escapeHtml } from "../lib/anfrage.mjs";

const NOW = 1_800_000_000_000;
const silent = { info() {}, warn() {}, error() {} };

function req(fields, { json = true, origin = "https://www.vistaflows.com", ip = "203.0.113.7", method = "POST" } = {}) {
  const body = new URLSearchParams(fields).toString();
  return new Request("https://www.vistaflows.com/api/anfrage", {
    method,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      host: "www.vistaflows.com",
      ...(origin ? { origin } : {}),
      "x-forwarded-for": ip,
      ...(json ? { accept: "application/json" } : {}),
    },
    body: method === "POST" ? body : undefined,
  });
}

const valid = {
  typ: "anfrage",
  name: "Erika Beispiel",
  email: "erika@example.org",
  telefon: "+49 201 123456",
  paket: "Website Professional",
  nachricht: "Neue Website für unsere Praxis.",
  datenschutz: "ja",
  t: String(NOW - 20_000),
  fax: "",
};

function setup(overrides = {}) {
  const sent = [];
  const mailer = async (payload) => {
    sent.push(payload);
    return { id: "test" };
  };
  return {
    sent,
    opts: { env: { RESEND_API_KEY: "re_test", MAIL_TO: "info@vistaflows.com", MAIL_FROM: "VistaFlows <anfrage@vistaflows.com>" }, now: NOW, rateStore: createRateStore(), mailer, log: silent, ...overrides },
  };
}

test("GET wird mit 405 abgelehnt", async () => {
  const { opts } = setup();
  const res = await handleAnfrage(req({}, { method: "GET" }), opts);
  assert.equal(res.status, 405);
});

test("gültige Anfrage: Benachrichtigung an Sandin und Bestätigung an Absender", async () => {
  const { sent, opts } = setup();
  const res = await handleAnfrage(req(valid), opts);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, redirect: "/danke" });
  assert.equal(sent.length, 2);
  assert.deepEqual(sent[0].to, ["info@vistaflows.com"]);
  assert.equal(sent[0].reply_to, "erika@example.org");
  assert.match(sent[0].subject, /Website Professional – Erika Beispiel/);
  assert.deepEqual(sent[1].to, ["erika@example.org"]);
  assert.equal(sent[1].reply_to, "info@vistaflows.com");
  assert.match(sent[1].text, /Hans-Böckler-Straße 235/);
});

test("fehlende Pflichtfelder liefern 422 mit Feldliste", async () => {
  const { sent, opts } = setup();
  const res = await handleAnfrage(req({ ...valid, name: "", email: "kein-mail", datenschutz: "" }), opts);
  assert.equal(res.status, 422);
  const body = await res.json();
  assert.deepEqual(body.fields.sort(), ["datenschutz", "email", "name"]);
  assert.equal(sent.length, 0);
});

test("ungültige Telefonnummer wird erkannt", async () => {
  const { opts } = setup();
  const res = await handleAnfrage(req({ ...valid, telefon: "ruf mich an" }), opts);
  assert.equal(res.status, 422);
  assert.deepEqual((await res.json()).fields, ["telefon"]);
});

test("Honigtopf gefüllt: Erfolg vortäuschen, nichts senden", async () => {
  const { sent, opts } = setup();
  const res = await handleAnfrage(req({ ...valid, fax: "123" }), opts);
  assert.equal(res.status, 200);
  assert.equal(sent.length, 0);
});

test("zu schnell abgeschickt: Erfolg vortäuschen, nichts senden", async () => {
  const { sent, opts } = setup();
  const res = await handleAnfrage(req({ ...valid, t: String(NOW - 900) }), opts);
  assert.equal(res.status, 200);
  assert.equal(sent.length, 0);
});

test("ohne Zeitstempel (kein JavaScript) wird normal gesendet", async () => {
  const { sent, opts } = setup();
  const res = await handleAnfrage(req({ ...valid, t: "" }), opts);
  assert.equal(res.status, 200);
  assert.equal(sent.length, 2);
});

test("Mengenbegrenzung: die 7. Anfrage in 10 Minuten wird abgelehnt", async () => {
  const { opts } = setup();
  for (let i = 0; i < 6; i++) {
    const r = await handleAnfrage(req(valid), opts);
    assert.equal(r.status, 200);
  }
  const res = await handleAnfrage(req(valid), opts);
  assert.equal(res.status, 429);
});

test("fremde Herkunft wird abgelehnt", async () => {
  const { sent, opts } = setup();
  const res = await handleAnfrage(req(valid, { origin: "https://spam.example" }), opts);
  assert.equal(res.status, 403);
  assert.equal(sent.length, 0);
});

test("Vorschau-Deployments auf vercel.app sind erlaubt", async () => {
  const { opts } = setup();
  const res = await handleAnfrage(req(valid, { origin: "https://vistaflows-git-main-sandin.vercel.app" }), opts);
  assert.equal(res.status, 200);
});

test("ohne API-Schlüssel und ohne Testmodus: 503 statt stillem Verlust", async () => {
  const { opts } = setup({ env: {}, mailer: undefined });
  const res = await handleAnfrage(req(valid), opts);
  assert.equal(res.status, 503);
});

test("Testmodus sendet nichts und meldet Erfolg", async () => {
  const { opts } = setup({ env: { ANFRAGE_DRY_RUN: "1" }, mailer: undefined });
  const res = await handleAnfrage(req(valid), opts);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).dryRun, true);
});

test("ohne JavaScript: 303 auf /danke bzw. /fehler", async () => {
  const { opts } = setup();
  const ok = await handleAnfrage(req(valid, { json: false }), opts);
  assert.equal(ok.status, 303);
  assert.equal(ok.headers.get("location"), "/danke");
  const bad = await handleAnfrage(req({ ...valid, email: "x" }, { json: false }), opts);
  assert.equal(bad.status, 303);
  assert.equal(bad.headers.get("location"), "/fehler");
});

test("KI-Check verlangt Website sowie Branche und Ort", async () => {
  const { sent, opts } = setup();
  const res = await handleAnfrage(req({ typ: "ki-check", name: "Erika Beispiel", email: "erika@example.org", datenschutz: "ja" }), opts);
  assert.equal(res.status, 422);
  assert.deepEqual((await res.json()).fields.sort(), ["branche", "website"]);
  const ok = await handleAnfrage(
    req({ typ: "ki-check", name: "Erika Beispiel", email: "erika@example.org", website: "keine", branche: "Physiotherapie in Essen", datenschutz: "ja" }),
    opts,
  );
  assert.equal(ok.status, 200);
  assert.equal((await ok.json()).redirect, "/danke?typ=ki-check");
  assert.match(sent[0].subject, /KI-Sichtbarkeits-Check: Physiotherapie in Essen/);
});

test("Widerruf: eigene Pflichtfelder, keine Datenschutz-Checkbox, Bestätigung an Absender", async () => {
  const { sent, opts } = setup();
  const res = await handleAnfrage(
    req({ typ: "widerruf", name: "Erika Beispiel", email: "erika@example.org", dienstleistung: "Website Starter", bestellt_am: "2026-10-01", anschrift: "Musterweg 1, 46236 Bottrop" }),
    opts,
  );
  assert.equal(res.status, 200);
  assert.equal((await res.json()).redirect, "/danke-widerruf");
  assert.equal(sent[1].subject, "Eingangsbestätigung deines Widerrufs");
  const bad = await handleAnfrage(req({ typ: "widerruf", name: "Erika Beispiel", email: "erika@example.org", bestellt_am: "1.10.2026" }), opts);
  assert.deepEqual((await bad.json()).fields.sort(), ["anschrift", "bestellt_am", "dienstleistung"]);
});

test("Benachrichtigung scheitert: 502; nur Bestätigung scheitert: trotzdem Erfolg", async () => {
  const failAll = setup({ mailer: async () => { throw new Error("down"); } });
  const r1 = await handleAnfrage(req(valid), failAll.opts);
  assert.equal(r1.status, 502);

  let calls = 0;
  const failSecond = setup({
    mailer: async () => {
      calls += 1;
      if (calls === 2) throw new Error("Bestätigung kaputt");
      return {};
    },
  });
  const r2 = await handleAnfrage(req(valid), failSecond.opts);
  assert.equal(r2.status, 200);
});

test("HTML in Eingaben wird in den Mails maskiert", () => {
  const { data } = validate({ ...valid, name: '<img src=x onerror="alert(1)">' });
  const { notify, confirm } = buildMails(data, { from: "a@b.de", to: "c@d.de" });
  assert.ok(!notify.html.includes("<img src=x"));
  assert.ok(notify.html.includes("&lt;img src=x"));
  assert.ok(!confirm.html.includes("<img src=x"));
  assert.equal(escapeHtml(`"'<>&`), "&quot;&#39;&lt;&gt;&amp;");
});

test("überlange Eingaben werden gekürzt, Steuerzeichen entfernt", () => {
  const { data } = validate({ ...valid, nachricht: "a".repeat(5000) + "\u0007" });
  assert.equal(data.nachricht.length, 4000);
  assert.ok(!data.nachricht.includes("\u0007"));
});
