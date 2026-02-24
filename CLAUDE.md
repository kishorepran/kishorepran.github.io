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

The site is built with plain HTML and CSS — no JavaScript frameworks, no bundlers, no dependencies to install.

**CSS layering:** Every page loads `w3.css` (the W3Schools CSS framework bundled locally) plus `common-custom.css` for shared styles, then a page-specific `*-custom.css` for overrides. When editing styles, check `common-custom.css` first since most reusable classes live there.

**Page structure pattern:** All pages share the same layout skeleton:
1. Full-bleed header with background image (`headerBackgorundStyle` + `w3-image`)
2. Navigation bar (duplicated inline in each HTML file — no shared template/include)
3. Content sections separated by `.horizontalRule` dividers
4. Pre-footer CTA bar (`.preFooterContent`)
5. Footer with nav links and social icons (`.footerContent`)

**Key CSS classes in `common-custom.css`:**
- `.wrapper` / `.content` — portfolio card hover overlay effect
- `.borderedButtonHeader`, `.borderedButtonContent`, `.borderedButtonPrefooter` — three button variants for different contexts
- `.jumboRightAndLeftPadding` — constrains text width on wide screens
- `.bounceAnimation` — the animated chevron on the home page hero

**Assets:**
- `images/` — background images per page (named `background_<page>.jpg`), portfolio thumbnails, social icons
- `pdf-docs/pran-kishore-cv.pdf` — the downloadable resume PDF
- `Favicon/` — favicon and Apple touch icon

## Making Changes

Since there are no shared templates or includes, navigation links and the footer are duplicated across all HTML files. When adding a new page or updating a nav link, update every `.html` file.

The resume content lives in `resume.html`; the downloadable PDF is a separate file at `pdf-docs/pran-kishore-cv.pdf` that must be manually kept in sync.
