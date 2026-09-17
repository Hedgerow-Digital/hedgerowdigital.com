// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://hedgerowdigital.com',
  output: 'static',
  trailingSlash: 'always',
  build: {
    // Emit /about/index.html so URLs match the trailing-slash routes above.
    format: 'directory',
  },
  integrations: [
    mdx(),
    sitemap({
      // The Apache-style /sitemap/ page is for humans; this is the XML for crawlers.
      filter: (page) => !page.includes('/style-guide'),
    }),
  ],
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
    },
  },
});
