import { site } from '../data/site';

export interface Cta {
  label: string;
  href: string;
}

/**
 * Expand placeholders in a content-authored href.
 *
 * `{email}` becomes the studio address, so `mailto:{email}` can be written in
 * a Markdown file without duplicating the address out of site.ts.
 */
export function ctaHref(href: string): string {
  return href.replace(/\{email\}/g, site.email);
}
