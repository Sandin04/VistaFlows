// Vercel-Funktion für alle Formulare (Anfrage, KI-Check, Widerruf).
// Logik und Tests: lib/anfrage.mjs, tests/anfrage.test.mjs
import { handleAnfrage } from "../lib/anfrage.mjs";

export const config = {
  maxDuration: 15,
};

export default {
  fetch(request) {
    return handleAnfrage(request, { env: process.env });
  },
};
