import type { APIRoute } from 'astro';
import { pixelIconSvg } from '../data/pixel-icons';

/**
 * The pixel H, served as /favicon.svg. Generated from the same grid the nav
 * and style guide use, so there is one source of truth for the mark.
 */
export const GET: APIRoute = () => {
  return new Response(pixelIconSvg('favicon', 32), {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
