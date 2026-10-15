import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// Ratgeber-Artikel als Markdown in src/content/ratgeber/.
// Neuer Artikel: Datei kopieren, Frontmatter anpassen, bauen. URL = Dateiname.
const ratgeber = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/ratgeber" }),
  schema: z.object({
    /** Überschrift (H1) */
    title: z.string(),
    /** Kurzname für Brotkrümel und Listen */
    crumb: z.string().max(40),
    /** <title>, ca. 50–60 Zeichen */
    seoTitle: z.string().max(65),
    /** Meta-Description, ca. 140–160 Zeichen */
    description: z.string().min(110).max(160),
    keyword: z.string(),
    /** „Kurz gesagt“: die Antwort in 2–3 Sätzen, steht vor dem Text */
    kurz: z.string(),
    thema: z.enum(["GEO", "SEO", "360°"]),
    published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    lesezeit: z.number().int().positive(),
    og: z.string(),
    reihenfolge: z.number().int(),
    quellen: z.array(z.object({ titel: z.string(), url: z.url() })).min(1),
    verwandt: z.array(z.string()),
    cta: z.enum(["ki-check", "rundgang", "erstgespraech"]),
  }),
});

export const collections = { ratgeber };
