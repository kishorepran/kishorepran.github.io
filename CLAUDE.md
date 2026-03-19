# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal portfolio website for Pran Kishore, hosted on GitHub Pages at `kishorepran.github.io`. There is no build system, package manager, or compilation step — changes are deployed by pushing to the `master` branch.

## Viewing the Site

Open any `.html` file directly in a browser, or use a local HTTP server:

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

## Architecture

The site is built with plain HTML, CSS, and vanilla JS — no frameworks, no bundlers, no dependencies.

**Design system:** `styles/design-system.css` is the single source of truth for all visual styles. It defines CSS custom properties (design tokens) and every reusable class. Every HTML page links only to this file. The old CSS files (`common-custom.css`, `*-custom.css`, `w3.css`) are no longer linked in any page and can be ignored.

**JavaScript:** `scripts/main.js` is a single self-executing module that handles: theme toggle (dark/light, persisted in localStorage), navbar scroll behaviour, mobile hamburger menu, Intersection Observer scroll animations, active nav item detection, and hero parallax.

**Page structure pattern:** All pages share the same layout skeleton:
1. Fixed glass navbar (`<nav class="glass-nav">`) — pill-shaped nav links, theme toggle, hamburger
2. Full-viewport hero section (`<section class="hero">`) with parallax background image
3. Content sections using `<section class="section">` with glass cards (`.glass-card`), grids (`.grid-3`, `.grid-2`), or the resume two-column layout (`.resume-layout`)
4. Pre-footer CTA block (`.prefooter-cta`)
5. Footer (`.site-footer`)

**Key CSS classes in `styles/design-system.css`:**
- `.glass-card` / `.glass-card-body` — frosted glass content card
- `.portfolio-card` / `.portfolio-card-overlay` — image card with hover-reveal overlay
- `.glass-btn`, `.glass-btn--primary`, `.glass-btn--sm` — pill buttons
- `.nav-pill` / `.mobile-nav-pill` — navbar link pills
- `.company-banner` / `.company-banner-bg` — full-width background image banner (About page)
- `.resume-layout` — two-column sticky-label layout (Resume and Courtesy pages)
- `.fade-up`, `.fade-in`, `.stagger` — scroll animation triggers (JS adds `.visible` class)
- `.eyebrow` — small uppercase accent label above section titles

**CSS design tokens (most important):**
- `--glass-bg`, `--glass-border`, `--glass-shadow` — the three glass material values
- `--accent-blue` (`#0A84FF`), `--accent-purple` (`#BF5AF2`), `--accent-teal` (`#5AC8F5`) — Apple system colours
- `--blur-sm`, `--blur-md` — `backdrop-filter` values for glass surfaces
- `[data-theme="light"]` selector overrides all dark-mode tokens for light mode

**Assets:**
- `images/` — background images per page (named `background_<page>.jpg`), portfolio thumbnails, social icons
- `pdf-docs/pran-kishore-cv.pdf` — the downloadable resume PDF
- `Favicon/` — favicon and Apple touch icon
- `images/background_optimizeitsystems.jpg` — **does not exist**; the Optimize IT Systems section in `about.html` uses `.company-banner--fallback` for a CSS gradient fallback

## Making Changes

Since there are no shared templates or includes, the navbar and footer are duplicated in every HTML file. When adding a nav item or page, update all 7 HTML files.

The resume content lives in `resume.html`; the downloadable PDF at `pdf-docs/pran-kishore-cv.pdf` must be kept in sync manually.

To change colours or glass intensity, edit the CSS variables at the top of `styles/design-system.css` — they cascade everywhere automatically.
