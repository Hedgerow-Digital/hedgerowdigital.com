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
 * A link or button. `href` accepts the `{email}` placeholder, which expands to
 * site.email — so the studio address stays defined in exactly one place.
 */
const cta = z.object({
  label: z.string(),
  href: z.string(),
});

/**
 * Copy for a composed section — the headings and buttons that sit between
 * data-driven blocks (the services grid, the featured product). These cannot
 * live in the page body, because collection data is interleaved between them,
 * and CLAUDE.md forbids hard-coding page copy in components.
 *
 * Every field but `heading` is optional: omit one and that element simply does
 * not render.
 */
const section = z.object({
  heading: z.string(),
  intro: z.string().optional(),
  /** Small link beside the heading, e.g. "All services". */
  link: cta.optional(),
  primaryCta: cta.optional(),
  secondaryCta: cta.optional(),
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
    /** Small lines beside the hero, above the "last updated" stamp. */
    heroMeta: z.array(z.string()).optional(),
    primaryCta: cta.optional(),
    secondaryCta: cta.optional(),
    /** Headings for the home page's composed sections. */
    sections: z
      .object({
        services: section.optional(),
        /** `slug` names which product to feature. */
        product: section.extend({ slug: z.string() }).optional(),
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
    /** Slug of a product to cross-link from this service page. */
    relatedProduct: z.string().optional(),
    updated,
  }),
});

/**
 * Products are distinct from services: a fixed, packaged thing with a price
 * and a turnaround, rather than an ongoing engagement. They are surfaced
 * contextually — on the home page, from service pages, and from field notes —
 * rather than through the main navigation.
 */
const products = defineCollection({
  loader: glob({ base: './src/content/products', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    icon: z.enum(PIXEL_ICON_NAMES),
    order: z.number().int(),
    /** Free text: "$2,500" reads better than a number. */
    price: z.string().optional(),
    /** Sits beside the price: "fixed, delivered in two weeks". */
    priceNote: z.string().optional(),
    /** "Next start date: October 5", or how many run at once. */
    availability: z.string().optional(),
    ctaLabel: z.string().optional(),
    /** Secondary link under the CTA. */
    moreLabel: z.string().optional(),
    /** Small label above the title on a product card. */
    kicker: z.string().optional(),
    /** Defaults to a mailto with the product name as the subject. */
    ctaHref: z.string().optional(),
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

export const collections = { pages, services, products, work };
