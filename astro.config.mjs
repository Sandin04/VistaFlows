// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// Testseite mit Extremdaten (lange Namen, leere Listen, große Beträge).
// Nur in `npm run dev` unter /_dev/break-ui, nie im Build.
/** @type {import("astro").AstroIntegration} */
const breakUi = {
  name: "vistaflows:break-ui",
  hooks: {
    "astro:config:setup": ({ command, injectRoute }) => {
      if (command === "dev") injectRoute({ pattern: "/_dev/break-ui", entrypoint: "./dev/break-ui/index.astro" });
    },
  },
};

// Statischer Build ohne Adapter: Vercel liefert dist/ aus, die Anfrage-Funktion
// liegt unter /api (siehe api/anfrage.js). So gelten vercel.json-Header,
// Weiterleitungen, cleanUrls und trailingSlash unverändert wie bisher.
export default defineConfig({
  site: "https://www.vistaflows.com",
  output: "static",
  integrations: [breakUi],
  trailingSlash: "never",
  // /leistungen.html → von Vercel (cleanUrls) als /leistungen ausgeliefert,
  // exakt die URLs der bisherigen Seite.
  build: {
    format: "file",
  },
  // Seit Astro 7 ist 'jsx' Standard und entfernt Leerzeichen zwischen Inline-Elementen.
  // true komprimiert verlustfrei und lässt „Text <a>Link</a> Text“ intakt.
  compressHTML: true,
  // Keine Syntax-Hervorhebung: Shiki setzt Inline-Styles, die die CSP blockieren würde.
  // Die Codebeispiele im Ratgeber sind kurz und brauchen keine Farben.
  markdown: {
    syntaxHighlight: false,
  },
  fonts: [
    {
      name: "Inter",
      cssVariable: "--font-inter",
      provider: fontProviders.local(),
      fallbacks: ["system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      options: {
        variants: [
          {
            src: ["./node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2"],
            weight: "100 900",
            style: "normal",
            display: "swap",
          },
        ],
      },
    },
  ],
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: blob:",
        "font-src 'self'",
        "connect-src 'self'",
        "media-src 'self'",
        "manifest-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "upgrade-insecure-requests",
      ],
      scriptDirective: {
        resources: ["'self'"],
      },
      styleDirective: {
        resources: ["'self'"],
      },
    },
  },
  image: {
    // Keine entfernten Bildquellen: alles liegt im Projekt (Datenschutz, Tempo).
    domains: [],
  },
});
