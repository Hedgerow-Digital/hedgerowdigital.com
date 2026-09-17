# Hedgerow Digital — Design System

> Reference for anyone (human or AI) designing or building Hedgerow Digital's website and materials. Follow this file over general design defaults. When something isn't covered here, choose the option that feels editorial, warm, and quietly early-web — never generic SaaS.

**Version:** 1.0 · September 2026
**Tagline:** *Cultivating digital work that matters.*
**Extended (LinkedIn):** Cultivating digital work that matters. Human-first strategy, design, and marketing for the AI era.

---

## 1. Brand in one paragraph

Hedgerow Digital is a human-first strategy, design, and marketing studio in western Pennsylvania. We use AI throughout our process, but people do the thinking. The look is **editorial first, Web 1.0 second**: paper-toned backgrounds, deep violet ink, a warm soft serif, and small, deliberate nods to the early web (web-safe colors, hard-edged shadows, 88×31 badges, "last updated" stamps). The early web and today's AI moment share the same mix of wonder, weirdness, and people building personal things on purpose. The brand should feel handmade and curious, never retro-costume and never corporate.

**Metaphor:** a hedgerow is planted with intent, layered, full of life, and connects the fields around it. The logo H is two fields with a hedgerow channel running between them.

---

## 2. Color

Every brand color except the two paper tones comes from the 216-color **web-safe palette** (each channel is 00, 33, 66, 99, CC, or FF). The paper tones are the one deliberate modern exception.

### Core palette

| Name | Hex | Role |
|---|---|---|
| **Visited Link** | `#9933FF` | Brand color. Wordmark, large headlines, buttons, icon. |
| **Dial-Up Midnight** | `#330066` | Default text, dark sections, outlines, hard shadows. |
| **Guestbook Paper** | `#E1E8D5` | Default page background. |
| **Web-Safe Mint** | `#CCFFCC` | Social backdrop, icon background, occasional highlight. |
| **Tooltip Cream** | `#FFFFCC` | Text and wordmark on violet or midnight. Callout boxes. |

### Supporting palette

| Name | Hex | Role |
|---|---|---|
| **Frameset** | `#D4DCC6` | Secondary surface: cards, table rows, section bands. |
| **Under Construction** | `#FFCC00` | Highlights, "new" badges, focus rings. |
| **Hit Counter** | `#FF6633` | Rare accent for alerts and data callouts. Use sparingly. |
| **Status Bar** | `#666666` | Captions, dates, metadata on paper. |

### Approved pairings (WCAG contrast)

| Pairing | Ratio | Use |
|---|---|---|
| Midnight on Paper | 12.5:1 | All body text and headlines |
| Midnight on Cream | 15:1 | Callouts, body text |
| Construction on Midnight | 10.4:1 | Highlights in dark sections |
| Counter on Midnight | 5.4:1 | Data callouts in dark sections |
| Cream on Visited | 4.8:1 | Buttons, wordmark, short text |
| Status on Paper | 4.6:1 | Captions and metadata only |
| Visited on Mint | 4.4:1 | **Large type (24px+) and graphics only** |
| Visited on Paper | 3.9:1 | **Large type (24px+) and graphics only** |

### Color rules

- Body copy is **always Dial-Up Midnight**. Visited Link is for large type, buttons, links, and brand moments.
- **Guestbook Paper is the everyday background.** Web-Safe Mint is for impact, not full pages.
- **Never** put Tooltip Cream on Mint or Paper (nearly identical lightness; text disappears).
- **Never** set small text in Visited Link on Paper or Mint.
- Hit Counter orange appears at most once or twice per page.
- No gradients. Flat color only.

### Dark mode

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#E1E8D5` | `#1E0A3C` |
| `--surface` | `#D4DCC6` | `#2A1250` |
| `--text` | `#330066` | `#FFFFCC` |
| `--muted` | `#666666` | `#C9C3D9` |
| `--accent` | `#9933FF` | `#C58CFF` |

Brand swatches and the logo keep their literal colors in both modes.

---

## 3. Typography

Fonts are served from an Adobe Fonts web kit:

```html
<link rel="stylesheet" href="https://use.typekit.net/wde0fbj.css">
```

| Role | Family (CSS name) | Use |
|---|---|---|
| **Display / wordmark** | Modulator Text VF — `"modulator-text-vf"` | Logo lockups and rare hero moments only. **Unicase — type it as "Hedgerow", never `text-transform: uppercase`.** Tracked. |
| **Serif** | Gelica — `"gelica"` | Headlines, tagline, pull quotes. Weights 200–900 with italics. |
| **Sans** | Objektiv Mk1 — `"objektiv-mk1"` | Body, UI, buttons, card titles, captions. Weights 200–900 with italics. |

Also in the kit: `modulator-vf` (non-Text Modulator, available for wordmark comparison), and partial `objektiv-mk2` / `objektiv-mk3` (not used).

**Font stacks**

```css
--font-display: "modulator-text-vf", sans-serif;
--font-serif:   "gelica", Georgia, "Times New Roman", serif;
--font-sans:    "objektiv-mk1", system-ui, sans-serif;
```

Georgia is the fallback on purpose: it was the serif of the Web 1.0 era.

**Modulator is unicase.** Its lowercase letters are drawn at cap height and carry the brand's distinctive forms: `e` renders as a rounded **ε**, `w` as a rounded **ω**. These are the letterforms in the logo. Set the wordmark as `Hedgerow` and **never apply `text-transform: uppercase`** — that substitutes the conventional uppercase glyphs and the wordmark stops matching the icon.

**Modulator has no weight axis.** Verified against the kit's font files (September 2026):

| Family | Axes | CSS weight |
|---|---|---|
| `modulator-text-vf` | `wdth` 0–150, default **100** ("Narrow") — the logo's width | 400 |
| `modulator-vf` | `wght` 25–**500**, default 100 | 25 |

So `font-variation-settings: "wght" 900` on `modulator-text-vf` is a silent no-op: there is no such axis. Adjust the display face with `"wdth"` instead. On `modulator-vf` the weight axis stops at 500, and the face turns wide and heavy well before that — it is not a drop-in bold for the wordmark.

### Type scale

| Style | Font | Size / line-height | Notes |
|---|---|---|---|
| Display | Modulator Text VF, `wdth` 100 | clamp(2.6rem, 6vw, 4.5rem) / 1 | Unicase (no `text-transform`), `letter-spacing: .06em`, Visited Link |
| H1 | Gelica 600 | clamp(2.2rem, 4.5vw, 3.5rem) / 1.05 | One per page |
| H2 | Gelica 600 | 2.5rem / 1.1 | Section titles |
| H3 | Gelica 500 | 1.75rem / 1.2 | Subsections |
| Tagline / pull quote | Gelica 400 italic | 1.75rem / 1.3 | Visited Link |
| H4 | Objektiv 700 | 1.25rem / 1.3 | Card and list titles |
| Body | Objektiv 400 | 1.125rem / 1.65 | Max ~70 characters per line |
| Small / caption | Objektiv 400 | 0.9375rem / 1.5 | Status Bar gray |
| Button | Objektiv 600 | 1rem | Sentence case |

### Type rules

- Sentence case for headings and buttons. No all-caps labels (the wordmark is the only element that reads as uppercase, and it gets there through Modulator's unicase letterforms, not `text-transform`).
- Don't emphasize a single word in a headline with a color or italic swap.
- No eyebrow labels above headings unless they carry real information.
- Serif does the talking in headlines, sans does the work everywhere else. Don't set body copy in Gelica.

---

## 4. Logo

- **Primary icon:** two rounded violet (`#9933FF`) slabs forming an H with a mint channel between them; HEDGEROW wordmark in cream (`#FFFFCC`) sits where the crossbar would be. Background Web-Safe Mint.
- **Below ~120px wide:** use the H alone, without the wordmark. The Modulator E needs room to read as an E.
- **Circular avatars (LinkedIn, etc.):** H only, scaled to ~70–75% of the circle so the rounded corners aren't clipped.
- **Lockup with tagline:** wordmark above, tagline below in Gelica italic.
- Don't recolor, stretch, outline, or add effects to the logo.

---

## 5. Layout and components

### Layout

- Content max width ~68rem; reading columns max ~40rem.
- Left-aligned text by default. Center only for short, standalone moments.
- Generous vertical rhythm: sections ~3–5rem apart, separated by a 1px rule in `--text` at ~20% opacity, or a 2px solid rule for major breaks.
- Responsive down to 360px. Grids collapse to one or two columns under ~860px.
- Wide content (tables, code, diagrams) scrolls inside its own container; the page never scrolls sideways.

### Signature details

- **Hard shadows, not soft ones.** Solid Dial-Up Midnight offsets: 3px on buttons, 6px on images and feature cards. No blurred `box-shadow`.
- **Borders:** 2px solid Dial-Up Midnight on cards and swatches.
- **Radius:** small and consistent: 4px for buttons and cards, 6px for images. The logo's large rounded slabs are the exception.

### Buttons

```css
.btn {
  font-family: var(--font-sans);
  font-weight: 600;
  padding: .7rem 1.2rem;
  border-radius: 4px;
  background: #9933FF;
  color: #FFFFCC;
  border: 2px solid #330066;
  box-shadow: 3px 3px 0 #330066;
}
.btn:active { transform: translate(3px, 3px); box-shadow: none; }
```

Button labels say exactly what happens ("Book an audit", not "Submit"). No arrow glyphs appended.

### Links

- Body links use Visited Link, underlined. Visited state stays violet (it's the brand's namesake).
- Focus: 3px Under Construction (`#FFCC00`) outline, 3px offset, on every interactive element.

---

## 6. Web 1.0 details

These are seasoning, not the meal. **One early-web wink per page**, kept small.

Approved:
- 88×31 badges (e.g., "Best viewed in any browser", "Grown in western PA")
- "Last updated [date]" stamps
- A small hit counter (black box, Under Construction digits, monospace)
- Beveled/inset borders on badges only

Avoid:
- Tiled backgrounds, animated GIF clutter, blinking text, marquee scrolling, Comic Sans, busy textures
- Anything that makes the site hard to read or feel like a parody

---

## 7. Voice

- Plain, warm, and specific. Practical over hype.
- Active voice, sentence case, no filler.
- Talks about what clients get, sized to what they can actually maintain.
- Comfortable with a little wit and a little weirdness; never cute.
- Example headlines: "Be the answer when your buyers ask" · "An audit before anything else"

---

## 8. CSS tokens (copy-paste)

```css
:root {
  /* Core */
  --visited-link: #9933FF;
  --dialup-midnight: #330066;
  --guestbook-paper: #E1E8D5;
  --websafe-mint: #CCFFCC;
  --tooltip-cream: #FFFFCC;
  /* Supporting */
  --frameset: #D4DCC6;
  --under-construction: #FFCC00;
  --hit-counter: #FF6633;
  --status-bar: #666666;

  /* Semantic */
  --bg: var(--guestbook-paper);
  --surface: var(--frameset);
  --text: var(--dialup-midnight);
  --muted: var(--status-bar);
  --accent: var(--visited-link);
  --focus: var(--under-construction);
  --rule: rgb(51 0 102 / 0.2);

  /* Type */
  --font-display: "modulator-text-vf", sans-serif;
  --font-serif: "gelica", Georgia, "Times New Roman", serif;
  --font-sans: "objektiv-mk1", system-ui, sans-serif;

  /* Shape */
  --radius-sm: 4px;
  --radius-md: 6px;
  --shadow-hard-sm: 3px 3px 0 var(--dialup-midnight);
  --shadow-hard-md: 6px 6px 0 var(--dialup-midnight);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #1E0A3C;
    --surface: #2A1250;
    --text: #FFFFCC;
    --muted: #C9C3D9;
    --accent: #C58CFF;
    --rule: rgb(255 255 204 / 0.2);
  }
}
:root[data-theme="dark"] {
  --bg: #1E0A3C;
  --surface: #2A1250;
  --text: #FFFFCC;
  --muted: #C9C3D9;
  --accent: #C58CFF;
  --rule: rgb(255 255 204 / 0.2);
}
```

---

## 9. Social assets

- **Avatar (LinkedIn company page, other social):** pixel H on Web-Safe Mint, H at ~70% of the frame. Export 1080×1080 PNG with nearest-neighbor scaling (no smoothing).
- **Favicon:** the same 16×16 pixel H.
- **LinkedIn cover:** "Hedgerow horizon" — Guestbook Paper sky, pixel hedgerow band in Visited Link across the lower third over a Web-Safe Mint field, small pixel sun in Under Construction. Tagline in Gelica Italic (~70px at 2×), service line "Strategy · Design · Marketing" in Objektiv (~32px at 2×), both Dial-Up Midnight, centered. Design at 2256×382, keep text in the center 60%, keep the lower-left clear for the logo. Export PNG.
- **Detailed logo** (wordmark across the H) is for banners, headers, proposals, and decks — not small or circular spaces.

---

## 10. Checklist before shipping any page

- [ ] Adobe Fonts kit loaded; site domain added to the kit's web project
- [ ] Body text in Dial-Up Midnight; no small violet text on paper or mint
- [ ] Visible focus rings on every interactive element
- [ ] Hard shadows only; no gradients
- [ ] At most one Web 1.0 detail
- [ ] Works at 360px wide and in dark mode
- [ ] Respects `prefers-reduced-motion`
