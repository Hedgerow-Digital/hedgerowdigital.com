/**
 * Content collections.
 *
 * Note for Astro 7: `import { z } from 'astro:content'` is deprecated and goes
 * away in Astro 8. Zod comes from 'astro/zod' now, and it is Zod 4.
 */
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

import { PIXEL_ICON_NAMES } from './data/pixel-icons';

/**
 * Optional on every collection so the "last updated" logic is one code path:
 * frontmatter first, then the file's last git commit, then the build date.
 */
const updated = z.coerce.date().optional();

/**
 * Copy for a composed section — a heading that sits between data-driven
 * blocks (the services grid, the work list). These cannot live in the page
 * body, because collection data is interleaved between them, and CLAUDE.md
 * forbids hard-coding page copy in components. So they live here instead.
 */
const section = z.object({
  heading: z.string(),
  intro: z.string().optional(),
  linkLabel: z.string().optional(),
});

const cta = z.object({
  label: z.string(),
  href: z.string(),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated,

    /* Everything below is optional: about.md and contact.md use none of it. */

    /** Short italic line under the page title. */
    tagline: z.string().optional(),
    primaryCta: cta.optional(),
    secondaryCta: cta.optional(),
    /** Headings for the home page's composed sections. */
    sections: z
      .object({
        services: section.optional(),
        work: section.optional(),
        about: section.optional(),
        contact: section.optional(),
      })
      .optional(),
  }),
});

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /** A string, not a number: "$2,500 fixed" reads better than 2500. */
    price: z.string().optional(),
    /** Validated against the real icon set, so a typo fails the build. */
    icon: z.enum(PIXEL_ICON_NAMES),
    order: z.number().int(),
    updated,
  }),
});

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/*.mdx' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string().optional(),
      summary: z.string(),
      cover: image(),
      /** image() cannot enforce alt text, so it is its own required field. */
      coverAlt: z.string(),
      /** Shown in the window-frame title bar. */
      coverFilename: z.string().optional(),
      year: z.number().int().min(2000).max(2100),
      updated,
    }),
});

export const collections = { pages, services, work };
