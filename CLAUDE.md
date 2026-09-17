# Hedgerow Digital website

Human-first strategy, design, and marketing studio. Tagline: "Cultivating digital work that matters."

## Rules
- Follow DESIGN.md for every visual and front-end decision. It overrides general design defaults.
- Stack: Astro (static output), Vercel, Sanity for articles only. No other frameworks unless asked.
- Page content lives in src/content as Markdown/MDX. Never hard-code page copy in components.
- Site-wide settings live in src/data/site.ts.
- Minimal client JavaScript. Use Astro islands only when interaction requires it.
- Accessibility: semantic HTML, visible focus rings, WCAG AA contrast per DESIGN.md pairings, respects prefers-reduced-motion.
- No tracking cookies. Use Vercel Web Analytics only.
- Show a plan before large changes. Keep commits small and descriptive.

## Commands
- npm run dev — local dev
- npm run build — production build
- npm run preview — preview the build

## Content model
- src/content/pages — top-level pages (home, about, contact)
- src/content/services — one file per service
- src/content/work — case studies (MDX)
- Articles come from Sanity (see src/lib/sanity.ts)
