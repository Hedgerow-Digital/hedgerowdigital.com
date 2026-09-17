/**
 * Site-wide settings. Page copy belongs in src/content, not here — this file
 * is for things that appear on every page or describe the site itself.
 */

import type { PixelIconName } from './pixel-icons';

export interface NavItem {
  label: string;
  href: string;
  icon: PixelIconName;
}

export interface Badge {
  /** Two short lines, as on a real 88x31. */
  lines: [string, string];
  background: string;
  color: string;
  /** Only claim things that are true. */
  title: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: 'Hedgerow Digital',
  tagline: 'Cultivating digital work that matters.',
  taglineExtended:
    'Cultivating digital work that matters. Human-first strategy, design, and marketing for the AI era.',
  description:
    'Human-first strategy, design, and marketing studio in western Pennsylvania.',
  url: 'https://hedgerowdigital.com',
  email: 'hello@hedgerowdigital.com',
  locale: 'en-US',
  lang: 'en',
  /** Used in the footer copyright and the "Index of /" server line. */
  founded: 2025,
  serverSignature: 'Hedgerow/1.0 Server at hedgerowdigital.com Port 443',
} as const;

export const nav: NavItem[] = [
  { label: 'Work', href: '/work/', icon: 'monitor' },
  { label: 'Services', href: '/services/', icon: 'magnifier' },
  { label: 'Field notes', href: '/field-notes/', icon: 'page' },
  { label: 'About', href: '/about/', icon: 'sprout' },
  { label: 'Contact', href: '/contact/', icon: 'envelope' },
];

/**
 * 88x31 badges. DESIGN.md allows these in the footer only, and every claim
 * has to be true — "no tracking cookies" is, because analytics is cookieless.
 */
export const badges: Badge[] = [
  {
    lines: ['BEST VIEWED IN', 'ANY BROWSER'],
    background: '#330066',
    color: '#FFCC00',
    title: 'Built with semantic HTML. It works in whatever you are using.',
  },
  {
    lines: ['GROWN IN', 'WESTERN PA'],
    background: '#CCFFCC',
    color: '#9933FF',
    title: 'Made in western Pennsylvania.',
  },
  {
    lines: ['NO TRACKING', 'COOKIES'],
    background: '#9933FF',
    color: '#FFFFCC',
    title: 'Cookieless analytics only. Nothing follows you off this site.',
  },
];

export const social: SocialLink[] = [
  // TODO: confirm the real LinkedIn company page slug before launch.
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/hedgerow-digital' },
];

/** Default Open Graph image. Generated in a later phase. */
export const defaultOgImage = '/og-default.png';
