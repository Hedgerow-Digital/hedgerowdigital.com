# Changing how the Hedgerow site looks

A companion to *Editing the Hedgerow site*. That guide covers words. This one
covers colour, type, spacing, and the components those words sit inside.

**Read this first:** `DESIGN.md` is the brand's source of truth, and the site is
built to follow it. This guide tells you *where* each rule is implemented so you
can change it. It does not replace DESIGN.md — if the two ever disagree,
DESIGN.md wins and the code is wrong.

Most visual changes are one line in one file. The risky ones are flagged.

---

## The three files that control everything

| File | What it governs |
|---|---|
| `src/styles/tokens.css` | Every colour, font stack, radius, shadow, and measure |
| `src/styles/global.css` | Type scale, links, rules, tables, rendered Markdown |
| `src/data/site.ts` | Navigation, footer badges, social links |

Component-specific styling lives in a `<style>` block at the bottom of each
`.astro` file in `src/components/`. Those styles are **scoped** — they only
affect that component, which is why changing one cannot break another.

---

## Colour

Every colour in the site is a CSS custom property defined in
`src/styles/tokens.css`. Nothing hard-codes a hex value, so changing a token
changes it everywhere at once.

### The brand palette

These are literal values. They do not change between light and dark mode.

| Token | Value | Role |
|---|---|---|
| `--visited-link` | `#9933FF` | Brand violet. Wordmark, headlines, buttons, links |
| `--dialup-midnight` | `#330066` | Text, borders, hard shadows |
| `--guestbook-paper` | `#E1E8D5` | Page background |
| `--websafe-mint` | `#CCFFCC` | Logo backdrop, occasional highlight |
| `--tooltip-cream` | `#FFFFCC` | Text on violet. Callout and product panels |
| `--frameset` | `#D4DCC6` | Cards, table rows, secondary surfaces |
| `--under-construction` | `#FFCC00` | Focus rings, text selection |
| `--hit-counter` | `#FF6633` | Rare accent. Once or twice a page at most |
| `--status-bar` | `#666666` | Captions, dates, metadata |

Every colour except the two paper tones comes from the 216-colour web-safe
palette — each channel is `00`, `33`, `66`, `99`, `CC`, or `FF`. That constraint
is deliberate and worth keeping if you add a colour.

### The semantic layer

Components never reference a brand colour directly. They reference a *role*,
and the role points at a brand colour:

```css
--bg:      var(--guestbook-paper);
--surface: var(--frameset);
--text:    var(--dialup-midnight);
--muted:   var(--status-bar);
--accent:  var(--visited-link);
--focus:   var(--under-construction);
```

**This indirection is what makes dark mode work.** In dark mode only the
semantic tokens are reassigned; the brand colours stay put.

### Changing a colour

To change the page background everywhere, edit the semantic token:

```css
--bg: var(--frameset);     /* in :root */
```

To change the brand violet itself, edit `--visited-link` — but check the
contrast pairings in DESIGN.md §2 first. Several combinations are at the WCAG
AA limit, and a small shift breaks them.

### The contrast rules that constrain you

| Pairing | Ratio | Where it is safe |
|---|---|---|
| Midnight on Paper | 12.5:1 | Anything |
| Midnight on Cream | 15:1 | Anything |
| Cream on Violet | 4.8:1 | Buttons, short text |
| Status grey on Paper | 4.6:1 | Captions and metadata only |
| Violet on Paper | 3.9:1 | **Large type only — 24px and above** |

Never set small text in violet on paper or mint, and never put cream on mint or
paper — those two have nearly identical lightness and the text disappears.

---

## Dark mode

The site supports three states: light, dark, and following the operating
system. The footer control cycles between them and remembers the choice.

Dark mode is defined twice in `tokens.css`, and **both blocks must be kept in
sync**:

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) { /* ...system preference... */ }
}

:root[data-theme='dark'] { /* ...explicit choice... */ }
```

The first handles "follow the system". The second handles "the visitor pressed
the button". Change one without the other and the toggle stops matching the
system setting.

### Surfaces that stay light on purpose

Cream panels — the contact callout, the product card, the service price box,
the field-note byline — keep their light colours in both modes. They are brand
surfaces, not page surfaces.

This is why they set colour explicitly rather than using `--text`:

```css
background: var(--tooltip-cream);
color: var(--dialup-midnight);
```

**If you add a link or button inside one of those panels, exclude `.btn`:**

```css
.callout a:not(.btn) { color: var(--visited-link); }
```

Without `:not(.btn)` a primary button becomes violet text on a violet
background and its label vanishes. This has been introduced twice and fixed
twice — the comment in the code says so for a reason.

---

## Typography

Three typefaces, served from one Adobe Fonts kit. The stack for each is a token
in `tokens.css`.

| Token | Family | Used for |
|---|---|---|
| `--font-display` | Modulator Text VF | The wordmark only |
| `--font-serif` | Gelica | Headlines, taglines, pull quotes |
| `--font-sans` | Objektiv Mk1 | Body, UI, buttons, captions |
| `--font-mono` | Courier New | Filenames, the 404 code, counters |
| `--font-directory` | Times New Roman | The Apache-style sitemap only |

Georgia is Gelica's fallback on purpose: it was the serif of the Web 1.0 era.

### The Modulator rule you must not break

**Modulator is a unicase typeface.** Its lowercase letters are drawn at cap
height and carry the brand's distinctive forms — `e` renders as a rounded **ε**
and `w` as a rounded **ω**. Those are the letterforms in the logo.

Set the wordmark as `Hedgerow` and **never apply `text-transform: uppercase`.**
Doing so substitutes the conventional uppercase glyphs and the wordmark stops
matching the icon.

It also has **no weight axis**. The kit's copy exposes only `wdth` (0–150,
default 100), so `font-variation-settings: "wght" 900` does nothing at all.
Adjust width with `wdth` if you need to; there is no bold.

### The type scale

Set in `src/styles/global.css`:

| Element | Font | Size |
|---|---|---|
| `h1` | Gelica 600 | `clamp(2.2rem, 4.5vw, 3.5rem)` |
| `h2` | Gelica 600 | `2.5rem` |
| `h3` | Gelica 500 | `1.75rem` |
| `.tagline` | Gelica 400 italic | `1.75rem`, violet |
| Body | Objektiv 400 | `1.125rem` / 1.65 |
| `.small` | Objektiv 400 | `0.9375rem`, grey |

The `clamp()` on `h1` means it scales with the viewport between a floor and a
ceiling — edit the middle value to change how fast it grows.

### Type rules

- Sentence case for headings and buttons. No all-caps labels.
- Don't recolour or italicise a single word inside a headline.
- Serif does the talking in headlines; sans does the work everywhere else.
  Don't set body copy in Gelica.

---

## Layout and spacing

| Token | Value | Meaning |
|---|---|---|
| `--measure-page` | `68rem` | Maximum content width |
| `--measure-read` | `40rem` | Maximum width of a reading column |
| `--gutter` | `1.25rem` | Page side padding |

Apply them with the `.measure` utility class, which caps an element at reading
width. Prose blocks get it automatically.

**Responsive rule:** the site must work down to 360px. Wide content — tables,
code, the sitemap listings — scrolls inside its own container. The page itself
never scrolls sideways. If you add something wide, wrap it in a container with
`overflow-x: auto` rather than letting the page scroll.

---

## The signature details

These are what make the site feel like itself rather than a generic template.
Changing them changes the brand's character, so change them deliberately.

### Hard shadows

Solid offsets in Dial-Up Midnight. **No blur, ever.**

```css
--shadow-hard-sm: 3px 3px 0 var(--dialup-midnight);   /* buttons */
--shadow-hard-md: 6px 6px 0 var(--dialup-midnight);   /* cards, images */
```

A blurred `box-shadow` anywhere on this site is a bug.

### Borders and radius

2px solid Dial-Up Midnight on cards and panels. Radius is small and
consistent: `--radius-sm` (4px) for buttons and cards, `--radius-md` (6px) for
images. The logo's large rounded slabs are the only exception.

### The beveled rule

`<hr>` is a two-tone groove rather than a line — a dark line over a light one,
which is why `--bevel-light` and `--bevel-dark` exist as separate tokens. They
flip in dark mode; a single colour could not.

### Buttons

`src/components/Button.astro`. Two variants:

- **primary** — violet background, cream text
- **secondary** — paper background, midnight text

Pressing one moves it 3px down and right and removes the shadow, so it looks
physically depressed. That motion is wrapped in `prefers-reduced-motion`, so it
is skipped for visitors who have asked for less movement. Keep that guard on
anything you animate.

---

## Components you can reuse

All in `src/components/`. Each takes props; the table lists the ones you are
likely to set.

| Component | Props | What it does |
|---|---|---|
| `Button` | `href`, `variant` | Renders `<a>` if given `href`, else `<button>` |
| `PixelIcon` | `name`, `size`, `label` | A 16×16 pixel icon as inline SVG |
| `Tooltip` | `text` | Dotted-underline term with a cream bubble |
| `WindowFrame` | `filename`, `caption` | Wraps an image in a window with a title bar |
| `Badge88` | `lines`, `background`, `color` | An 88×31 footer badge |
| `Timestamp` | `date`, `label` | A formatted `<time>` element |
| `WebRing` | `prev`, `next`, `allHref` | The prev / all / next bar |
| `ProductCard` | `product`, `variant` | A product, as a feature panel or inline box |

### The pixel icons

Eleven icons, defined as character grids in `src/data/pixel-icons.ts`:

```
favicon  magnifier  page  monitor  sprout  envelope
folder   clock      check  arrowL   arrowR
```

Each is a 16×16 grid of letters mapped to colours — `V` violet, `C` cream,
`N` mint, `Y` yellow, `O` orange, `M` midnight. To add one, copy an existing
grid and redraw it. The build **fails** if a grid is ragged, so a miscounted row
cannot ship.

The favicon is generated from the same data at `/favicon.svg`, which means the
icon and the favicon can never drift apart.

Icons render as inline SVG with `shape-rendering: crispEdges`, so they stay
sharp at any whole-number size.

---

## Navigation and footer

Both live in `src/data/site.ts`.

### Navigation

```ts
export const nav: NavItem[] = [
  { label: 'Services', href: '/services/', icon: 'magnifier' },
  { label: 'Field notes', href: '/field-notes/', icon: 'page' },
  { label: 'About', href: '/about/', icon: 'sprout' },
  { label: 'Contact', href: '/contact/', icon: 'envelope' },
];
```

Add a line to add a nav item. `icon` must be one of the eleven names above or
the build fails. The current page is marked with `aria-current="page"` and
underlined automatically.

Four items fit comfortably. At six the nav wraps to two lines on narrow
screens — still usable, but worth seeing before you commit.

### Footer badges

The 88×31 badges, in the same file:

```ts
{ lines: ['BEST VIEWED IN', 'ANY BROWSER'], background: '...', color: '...' }
```

Exactly two short lines each. DESIGN.md's rule is that every badge must make a
claim that is actually true — "NO TRACKING COOKIES" is there because the site
genuinely sets none.

---

## Accessibility, which is not optional

The site is built to WCAG AA and these are the parts most easily broken:

- **Focus rings must stay visible.** `--focus` is the Under Construction
  yellow. Never set `outline: none` without providing a replacement.
- **Contrast pairings** are listed above and in DESIGN.md §2. Check before
  introducing a colour combination.
- **Motion** respects `prefers-reduced-motion`. Guard anything that moves.
- **Alt text** is required on case-study covers — the schema enforces it, so a
  missing one fails the build rather than shipping silently.
- **Semantic HTML.** Headings in order, one `<h1>` per page, real `<button>`
  and `<a>` elements rather than clickable `<div>`s.

---

## Checking your work

```bash
npm run dev      # see it live at http://localhost:4321
npm run build    # must pass before you push
```

Before pushing a visual change, look at all four states:

1. **Light mode** at desktop width
2. **Dark mode** — use the footer control
3. **Narrow** — resize to about 360px
4. **Keyboard** — tab through the page and watch the focus ring

Most visual regressions on this site have been one of: an invisible button
label from a colour override, something overflowing at 360px, or a dark-mode
token that was changed in one of the two blocks but not the other.

---

## When you are unsure

The honest answer for a visual change you are not confident about is to try it
in the dev server and look at it in both themes. Nothing here is irreversible,
and `git checkout <file>` undoes any single file.

For anything touching the palette, the type scale, or the Modulator rules,
re-read the relevant DESIGN.md section first. Those three have specific
reasoning behind them that is easy to undo by accident.
