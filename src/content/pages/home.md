---
# ============================================================
# HOME PAGE
# Everything the home page shows is in this file, in the order
# it appears. Delete any optional block and that piece simply
# disappears — nothing breaks.
# `{email}` in any href expands to the studio address from
# src/data/site.ts, so it is never written out twice.
# ============================================================

# --- 1. The big headline, and what search engines see ---

title: Be found, and trusted, when your buyers ask.
# Not shown on the page. Used by Google and social cards. ~1 sentence.
description: Human-first strategy, design, and marketing studio in western Pennsylvania. We help small teams show up where their audiences look for answers.
updated: 2026-09-17

# --- 2. The panel to the right of the opening paragraph ---

tagline: Cultivating digital work that matters.
# One line each. Add or remove lines freely.
heroMeta:
  - Strategy · Design · Marketing

# --- 3. The two buttons under the opening paragraph ---

primaryCta:
  label: Book an audit
  href: /products/ai-visibility-audit/
secondaryCta:
  label: See what we do
  href: /services/

# --- 4. The sections down the page, in order ---

sections:
  # The services grid. The cards themselves come from the files
  # in src/content/services/ — edit a card there, not here.
  services:
    heading: What we do
    intro: Three services. Each one sized to what your team can actually keep up.
    link:
      label: All services
      href: /services/

  # The featured product panel. `slug` is the filename (no
  # extension) of a file in src/content/products/. The panel's
  # price, button and description come from that file.
  product:
    slug: ai-visibility-audit
    heading: Start here
    intro: One fixed-price engagement that tells you where you actually stand.

  # The cream box at the foot of the page.
  contact:
    heading: Say hello.
    intro: A note about what you are working on is plenty.
    primaryCta:
      label: Email the studio
      href: mailto:{email}
    secondaryCta:
      label: Or see what to include
      href: /contact/
---

Hedgerow Digital is a human-first strategy, design, and marketing studio based in western Pennsylvania. We help businesses cultivate digital ecosystems designed for sustained growth in a constantly changing digital landscape.
