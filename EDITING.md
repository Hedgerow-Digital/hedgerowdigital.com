# Editing the Hedgerow site

How to change content, preview it, and publish — without needing Claude.

Everything on this site except field notes is a plain text file in
`src/content/`. You edit the file, check it in the browser, and push. There is
no CMS to log into.

---

## The 60-second version

```bash
cd "~/Documents/Hedgerow Website/website-new"
npm run dev            # starts http://localhost:4321
```

Edit any file in `src/content/`. The browser reloads as you save.

When it looks right:

```bash
npm run build          # catches mistakes before they reach the internet
git add -A
git commit -m "Rewrite the audit service page"
git push
```

Vercel deploys automatically. Stop the dev server with `npx astro dev stop`.

**Always run `npm run build` before pushing.** It takes a few seconds and it is
the difference between finding a typo on your laptop and finding it on the live
site.

---

## Where everything lives

| What you want to change | File |
|---|---|
| Home page | `src/content/pages/home.md` |
| About page | `src/content/pages/about.md` |
| Contact page | `src/content/pages/contact.md` |
| A service | `src/content/services/<name>.mdx` |
| A product | `src/content/products/<name>.mdx` |
| A case study | `src/content/work/<name>.mdx` |
| Site name, email, nav, footer badges | `src/data/site.ts` |
| Field notes (articles) | Sanity — see the last section |

The filename becomes the URL. `src/content/services/web-design.mdx` is served at
`/services/web-design/`. Rename the file and the URL changes with it, so treat
filenames as permanent once a page is public.

---

## How a content file is built

Every file has two parts: **frontmatter** between `---` fences, and the **body**
below it.

```markdown
---
title: Content strategy
summary: Editorial systems that answer the questions your buyers really ask.
icon: page
order: 2
updated: 2026-09-17
---

The body starts here. This is ordinary Markdown.

## A heading

- A list
- Another item
```

Frontmatter is structured data the templates read. The body is the prose. Get
the frontmatter wrong and the build stops with a clear message — see
[Troubleshooting](#when-the-build-complains).

### Frontmatter rules that bite

- **Indentation is two spaces.** Tabs break it.
- **Wrap in quotes if the value contains a colon.** `title: Audits: what we do`
  fails. `title: "Audits: what we do"` works.
- **Dates are `YYYY-MM-DD`**, unquoted.
- **No trailing commas**, and no quotes around numbers you mean as numbers.

---

## Editing a page

`home.md`, `about.md` and `contact.md`.

**Required:** `title`, `description`.
**Optional:** `updated`, plus the home-page-only fields below.

`description` is what Google and social cards show. One sentence, roughly 120–160
characters. It is not displayed on the page itself.

### The home page

Every word on the home page lives in `home.md` — there is nothing to edit in a
template. The frontmatter is ordered the way the page reads, top to bottom, and
commented in the file itself.

```yaml
# 1. Headline and SEO
title: Be found, and trusted, when your buyers ask.
description: Shown by Google and social cards, not on the page.

# 2. The panel beside the opening paragraph
tagline: Cultivating digital work that matters.
heroMeta:
  - Strategy · Design · Marketing
  - Butler County, Pennsylvania

# 3. The two buttons under the opening paragraph
primaryCta:
  label: Book an audit
  href: /products/ai-visibility-audit/
secondaryCta:
  label: See what we do
  href: /services/

# 4. The sections down the page
sections:
  services:
    heading: What we do
    intro: Three services, each sized to what your team can keep up.
    link:
      label: All services
      href: /services/
  product:
    slug: ai-visibility-audit
    heading: Start here
    intro: One fixed-price engagement.
  contact:
    heading: Say hello.
    intro: A note about what you are working on is plenty.
    primaryCta:
      label: Email the studio
      href: mailto:{email}
    secondaryCta:
      label: Or see what to include
      href: /contact/
```

The paragraph below the frontmatter is the opening copy, in ordinary Markdown.

**Everything except `title` and `description` is optional.** Delete a block and
that piece disappears — delete `sections.contact` and the cream box at the foot
of the page goes with it. Nothing breaks.

**`{email}` in any `href`** expands to the studio address from
`src/data/site.ts`, so the address is never written twice. Change it in one
place and every button follows.

**What is *not* in this file:** the service cards and the product panel pull
their titles, descriptions and prices from `src/content/services/` and
`src/content/products/`. `home.md` only controls the heading and intro above
them, and which product is featured.

---

## Editing a service

Files in `src/content/services/`, extension `.mdx`.

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Shown as the page heading and the card title |
| `summary` | yes | One sentence. Used on the card, the list, and as the SEO description |
| `icon` | yes | Must be one of the names below |
| `order` | yes | Whole number. Controls position in the grid and list |
| `price` | no | Free text: `"$2,500 fixed"`. Omit it and the page reads "Priced per project" |
| `updated` | no | See [Dates](#how-dates-work) |

**Valid icon names** — anything else fails the build:

```
favicon  magnifier  page  monitor  sprout  envelope
folder   clock      check  arrowL   arrowR
```

### Adding a new service

1. Copy an existing file: `cp src/content/services/web-design.mdx src/content/services/new-thing.mdx`
2. Change `title`, `summary`, `icon`, and give it an `order` number.
3. Renumber the others if you want it to appear somewhere specific.
4. Rewrite the body.

It appears automatically on `/services/`, on the home page grid, in the
"Other services" list on every other service page, and in the sitemap. Nothing
else to update.

### Removing a service

Delete the file. Then **search for links to it** before you push:

```bash
grep -rn "services/name-of-the-service" src/
```

The home page CTA in `home.md` is the one most likely to point at it.

---

## Editing a product

Files in `src/content/products/`, extension `.mdx`.

A **product** is packaged work with a price and a finish line. A **service** is
an ongoing engagement. Products have no navigation item — they surface on the
home page, from service pages, and at the end of field notes.

| Field | Required | Notes |
|---|---|---|
| `title` | yes | |
| `summary` | yes | One sentence. Used on cards and as the SEO description |
| `icon` | yes | One of the names listed above |
| `order` | yes | Whole number, sorts `/products/` |
| `price` | no | Free text: `"$2,500"`. Omit and the page reads "Priced per engagement" |
| `priceNote` | no | Sits under the price: `fixed, delivered in two weeks` |
| `availability` | no | `Next start date: October 5` |
| `ctaLabel` | no | Button text. Defaults to "Ask about the <title>" |
| `ctaHref` | no | Defaults to a mailto with the product name as the subject |
| `moreLabel` | no | The secondary link. Defaults to "What it covers" |

### Featuring a product on the home page

In `home.md`, under `sections`:

```yaml
  product:
    slug: ai-visibility-audit
    heading: Start here
    intro: One fixed-price engagement that tells you where you actually stand.
```

`slug` is the product's filename without the extension. Get it wrong and the
build stops with a message naming the slug — it will not silently render
nothing.

### Linking a product from a service

Add to the service's frontmatter:

```yaml
relatedProduct: ai-visibility-audit
```

A compact product card appears under that service's body copy.

### Linking a product from field notes

One product appears at the end of every field note. Change which one in
`src/data/site.ts`:

```ts
export const defaultProductSlug: string | null = 'ai-visibility-audit';
```

Set it to `null` to show none.

---

## Adding a case study

Files in `src/content/work/`, extension `.mdx`. These need an image.

1. Put the image in `src/content/work/` next to the `.mdx` file. JPG or PNG,
   roughly 1200×900, under about 500KB.
2. Create the `.mdx` file:

```markdown
---
title: What the project was
client: Client Name
summary: One sentence describing the work and the outcome.
cover: ./your-image.jpg
coverAlt: A plain description of the image, for screen readers.
coverFilename: north-field.jpg
year: 2026
---

## The problem

## What we did

## What changed

## What we would do differently
```

| Field | Required | Notes |
|---|---|---|
| `title` | yes | |
| `summary` | yes | Used on the work index and as the SEO description |
| `cover` | yes | Path starting `./` — the file must exist or the build fails |
| `coverAlt` | yes | Required on purpose. Describe the image; do not repeat the title |
| `year` | yes | Whole number, 2000–2100. Sorts the list, newest first |
| `client` | no | Falls back to "Studio project" |
| `coverFilename` | no | The filename shown in the image's title bar. Defaults to the slug |

The prev/next bar at the bottom of each case study wires itself up from the
`year` ordering. With only one case study, both ends read "End of the ring" —
that is correct, not a bug.

---

## Writing the body

Standard Markdown. What the site styles well:

```markdown
## A section heading
### A subheading

Plain paragraphs. Keep lines under about 70 characters of rendered width —
the layout caps the reading column automatically.

- Bulleted lists
1. Numbered lists

**Bold** and *italic*.

> A blockquote renders as a violet pull quote. Keep it to one breath.

[A link](/services/), or [an external one](https://example.com).

| Measure | Before | After |
| --- | ---: | ---: |
| Something | 10 | 40 |
```

Tables scroll sideways inside their own box on narrow screens, so wide ones are
fine.

**Avoid:** raw HTML, images inside the body of a service or page (only case
study covers are wired up), and heading level 1 — the page title is already the
`<h1>`, so start at `##`.

---

## How dates work

The "Last updated" stamp in the footer resolves in this order:

1. The `updated:` date in frontmatter, if there is one
2. Otherwise, the date of the last git commit that touched the file
3. Otherwise, the date the site was built

Right now every file has an explicit `updated:` date, which means **you have to
bump it by hand** when you make a meaningful edit.

If you would rather the date look after itself, delete the `updated:` line and
the commit date takes over. That is the more honest setting — it cannot drift
out of sync with reality. Either approach is fine, but be consistent.

---

## Site-wide settings

`src/data/site.ts` is TypeScript, not Markdown, but the top of it is plain
values you can safely edit:

- `name`, `tagline`, `email`, `url`
- `nav` — the header links. Each needs a `label`, `href`, and a valid `icon`
- `badges` — the 88×31 footer badges, two short lines each
- `social` — currently a placeholder LinkedIn URL that needs replacing

Keep the quotes and the trailing commas exactly as they are. If the build
complains about this file, `git checkout src/data/site.ts` undoes your change.

---

## Field notes (articles)

These are the one thing **not** in this repo. They come from Sanity, project
`suyliru1`, dataset `production`.

The dataset is currently empty, so `/field-notes/` shows an empty state and the
RSS feed has no items. That is expected until the first post exists.

Two things to know when you get there:

- Only **published** documents appear. Drafts are invisible to the site by
  design — the build sends no credentials.
- Publishing in Sanity does **not** rebuild the site. This is a static site, so
  you need a fresh deploy for a new post to appear: push any commit, or hit
  "Redeploy" in the Vercel dashboard.

---

## Publishing

```bash
npm run build          # must pass
git add -A
git commit -m "Describe what changed"
git push
```

Vercel builds from `main` and deploys on its own. Watch it in the Vercel
dashboard; a failed build leaves the current live site untouched.

To undo something you already pushed:

```bash
git revert HEAD
git push
```

---

## When the build complains

The build stops rather than shipping something broken. The messages name the
file and the field.

**Missing a required field**

```
[InvalidContentEntryDataError] services → web-design data does not match
collection schema.
  summary: Required
```

→ `summary:` is missing from `src/content/services/web-design.mdx`.

**A bad icon name**

```
icon: Invalid option: expected one of "favicon"|"magnifier"|"page"|"monitor"|
"sprout"|"envelope"|"folder"|"clock"|"check"|"arrowL"|"arrowR"
```

→ Typo in `icon:`. Use one from the list.

**A missing image**

```
[ImageNotFound] Could not find requested image `./cover.jpg`. Does it exist?
```

→ The `cover:` path does not match a real file. Check spelling and extension,
and that the image sits in the same folder as the `.mdx`.

**YAML complaints** (`bad indentation`, `unexpected end of stream`) almost always
mean a tab instead of spaces, or a value containing a colon that needs quotes.

**If you get stuck**, undo and start again:

```bash
git checkout src/content/path/to/file.md     # discard changes to one file
git status                                   # see what you have changed
```

---

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at http://localhost:4321, reloads on save |
| `npx astro dev stop` | Stops it |
| `npx astro dev status` | Tells you whether one is running, and on what port |
| `npm run build` | Full check. Run before every push |
| `npm run preview` | Serves the built site — the real thing, no live reload |

**One gotcha:** `npm run dev` returns immediately instead of staying in the
foreground, and if a server is already running it quietly reuses it, sometimes
on a different port. If your edits are not showing up, run `npx astro dev
status` to see what is actually running, or `npx astro dev stop` and start
fresh. Also make sure you are not looking at a stale `npm run preview` tab —
that one serves the last build and will not update as you type.
