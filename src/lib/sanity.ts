/**
 * Sanity, for field notes only. Everything else lives in src/content.
 *
 * This talks to the GROQ HTTP endpoint with plain fetch rather than pulling in
 * @sanity/client — one less dependency, and CLAUDE.md keeps the stack small.
 *
 * Every failure here is non-fatal. A missing dataset, a network error or an
 * unconfigured project must never break the build: the field notes routes fall
 * back to an honest empty state instead.
 */
import type { PortableTextBlock } from './portable-text';

const projectId = import.meta.env.SANITY_PROJECT_ID ?? 'suyliru1';
const dataset = import.meta.env.SANITY_DATASET ?? 'production';
/** Pinned: an unpinned API version can change query results underneath us. */
const apiVersion = '2024-01-01';

export interface SanityImage {
  url: string | null;
  alt: string | null;
  caption: string | null;
}

export interface FieldNote {
  title: string;
  slug: string;
  excerpt: string | null;
  publishDate: string | null;
  tags: string[] | null;
  author: { name: string | null; bio: string | null } | null;
  cover: SanityImage | null;
  body: PortableTextBlock[] | null;
  seo: { title?: string | null; description?: string | null } | null;
}

/** Drafts live under a `drafts.` id prefix and must stay out of the build. */
const POSTS_QUERY = `*[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)]
  | order(publishDate desc) {
    title,
    "slug": slug.current,
    excerpt,
    publishDate,
    tags,
    author { name, bio },
    "cover": coverImage { "url": asset->url, alt, caption },
    body,
    seo { title, description }
  }`;

let cached: FieldNote[] | undefined;

/**
 * Every published field note, newest first.
 * Returns [] when Sanity is unreachable or unconfigured.
 */
export async function getFieldNotes(): Promise<FieldNote[]> {
  if (cached) return cached;

  if (!projectId || !dataset) {
    console.warn(
      '[sanity] SANITY_PROJECT_ID or SANITY_DATASET is unset. ' +
        'Field notes will render empty.',
    );
    cached = [];
    return cached;
  }

  const url =
    `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}` +
    `?query=${encodeURIComponent(POSTS_QUERY)}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(
        `[sanity] query failed: ${response.status} ${response.statusText}. ` +
          'Field notes will render empty.',
      );
      cached = [];
      return cached;
    }

    const payload = (await response.json()) as { result?: FieldNote[] };
    cached = payload.result ?? [];

    if (cached.length === 0) {
      console.warn(
        `[sanity] connected to ${projectId}/${dataset} but found no published ` +
          'posts. Field notes will render empty.',
      );
    }

    return cached;
  } catch (error) {
    console.warn(
      `[sanity] could not reach ${projectId}/${dataset}: ` +
        `${error instanceof Error ? error.message : String(error)}. ` +
        'Field notes will render empty.',
    );
    cached = [];
    return cached;
  }
}

export async function getFieldNote(slug: string): Promise<FieldNote | undefined> {
  const notes = await getFieldNotes();
  return notes.find((note) => note.slug === slug);
}

/** Sanity gives ISO strings; the rest of the site works in Dates. */
export function noteDate(note: FieldNote): Date | undefined {
  if (!note.publishDate) return undefined;
  const parsed = new Date(note.publishDate);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export const sanityConfig = { projectId, dataset, apiVersion };
