import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

import { getFieldNotes, noteDate } from '../lib/sanity';
import { site } from '../data/site';

/**
 * The field notes feed. Empty until the first post is published, which is a
 * valid feed — readers handle it fine and it beats a 404.
 */
export const GET: APIRoute = async (context) => {
  const notes = await getFieldNotes();

  return rss({
    title: `${site.name} · Field notes`,
    description: `Research, working notes, and opinions from ${site.name}.`,
    site: context.site ?? site.url,
    trailingSlash: true,
    items: notes.map((note) => ({
      title: note.title,
      link: `/field-notes/${note.slug}/`,
      description: note.excerpt ?? undefined,
      pubDate: noteDate(note),
      categories: note.tags ?? undefined,
      author: note.author?.name ?? undefined,
    })),
    customData: `<language>en-us</language>`,
  });
};
