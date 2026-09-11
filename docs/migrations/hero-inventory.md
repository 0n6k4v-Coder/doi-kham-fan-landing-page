# Hero Component Migration Inventory

## 1. Source of truth

- Source file: `doi-kham-hero-section.html`
- Source branch: `feat/doi-kham-landing-page`
- Source blob SHA: `3c45e2b6e712a93d45be3e22c915df190d79dd54`
- Migration branch: `feat/migrate-hero-component`
- Migration status: inventory and responsibility mapping only; no Hero source migration has been performed yet.

## 2. Purpose of this document

This document is the external migration memory for the Hero component. It records the source structure, dependencies, global-vs-component ownership decisions, invariants, and risks identified before migration.

The existing Hero implementation is the **visual and behavioral source of truth**. Migration must preserve it unless a later task explicitly authorizes a change.

## 3. Source document anatomy

The current file is a complete standalone HTML document rather than a component module. It contains:

- `<!doctype html>` and document metadata.
- A single `<style>` block containing reset, theme variables, page-level layout, Hero styling, responsive rules, and animation rules.
- A `.page` root that owns the viewport-sized composition and background.
- A `.header` with a `logo.png` image.
- A `.main` wrapper.
- A `.hero` section containing Hero content, two decorative hand images, and a scroll indicator.
- Inline SVG markup for the rotating `SCROLL DOWN` ring and the static down arrow.

## 4. CSS inventory

### 4.1 Global/base rules currently inside the Hero file

These selectors are document-level and should not remain owned by the Hero component after integration:

- `*`
- `*::before`
- `*::after`
- `html`
- `body`
- `h1`
- `p`

The current source uses a global `box-sizing` reset, zero document margins/padding, viewport sizing, `body { min-block-size: 100dvh; overflow: clip; }`, and global heading/paragraph margin reset.

### 4.2 Theme variables currently defined on `:root`

Current variables:

- `--color-bg-center: #F8EDCF`
- `--color-bg-light: #F6E9C8`
- `--color-bg-mid: #F4E5C0`
- `--color-bg-dark: #F3E2BD`
- `--color-bg-edge: #EBD3A4`
- `--color-doi-kham: #FDC000`
- `--color-text-group: #025627`
- `--color-scroll-down: #D71D1A`
- `--bg-position-x: 50%`
- `--bg-position-y: 45%`
- `--header-inline-padding: clamp(16px, 4vw, 56px)`
- `--header-block-padding: 16px`
- `--header-max-height: 100px`
- `--logo-size: 92px`
- `--hero-gap: 8px`
- `--hero-copy-gap: 8px`
- `--doi-kham-size: clamp(64px, 21cqw, 300px)`
- `--eyebrow-size: clamp(8px, 0.56vw, 10px)`
- `--headline-size: clamp(32px, 2.22vw, 40px)`
- `--release-size: clamp(18px, 1.25vw, 22px)`
- `--location-size: clamp(12px, 0.83vw, 15px)`
- `--hero-inline-padding: clamp(16px, 4vw, 56px)`
- `--hero-bottom-padding: clamp(40px, 6vh, 80px)`
- `--hand-size: clamp(180px, 25vw, 420px)`
- `--scroll-indicator-size: clamp(120px, 11vw, 170px)`
- `--scroll-indicator-offset: clamp(18px, 4vw, 56px)`
- `--scroll-indicator-bottom: clamp(18px, 4vh, 48px)`
- `--scroll-indicator-text-size: clamp(8px, 0.7vw, 11px)`
- `--scroll-indicator-arrow-size: clamp(18px, 1.4vw, 24px)`

### 4.3 Page-level rules currently mixed into the Hero file

The following are page-shell responsibilities and should be moved out of the Hero component:

- `.page` positioning, viewport sizing, overflow clipping, and isolation.
- `.page` radial-gradient background.
- `.page::before` background-effect pseudo-element.
- `.header` layout and sizing.
- `.header__logo` sizing and object-fit.
- `.main` sizing relative to `--header-max-height`.

The Hero component should not own the complete application page shell after migration.

### 4.4 Hero-owned styles

These selectors are Hero/component concerns and should remain associated with the Hero implementation:

- `.hero`
- `.hero__content`
- `.hero__title`
- `.hero__copy`
- `.hero__eyebrow`
- `.hero__headline-group`
- `.hero__headline`
- `.hero__release`
- `.hero__location`
- `.hero__hand`
- `.hero__hand--left`
- `.hero__hand--right`
- `.scroll-indicator`
- `.scroll-indicator__ring`
- `.scroll-indicator__text`
- `.scroll-indicator__arrow`
- `.scroll-indicator__arrow-line`
- `@keyframes scroll-indicator-rotate`

### 4.5 Responsive layers

The current source has four responsive rule groups in addition to the base rules:

1. Desktop: `@media (min-width: 769px)`
2. Mobile: `@media (max-width: 768px)`
3. Small mobile: `@media (max-width: 480px)`
4. Very small mobile: `@media (max-width: 360px)`
5. Wide viewport: `@media (min-aspect-ratio: 2/1)`
6. Reduced motion: `@media (prefers-reduced-motion: reduce)`

These responsive behaviors are part of the current Hero baseline and must be preserved during migration.

## 5. HTML / DOM inventory

### 5.1 Page shell currently present

The source DOM is effectively:

```html
<div class="page">
  <header class="header">
    <img class="header__logo" src="logo.png" alt="DOI KHAM">
  </header>
  <main class="main">
    <section class="hero">
      ...
    </section>
  </main>
</div>
```

The `<header>` and `<main>` wrappers are currently part of the standalone page. They should not automatically be considered part of the Hero component.

### 5.2 Hero content

Inside `.hero__content`:

- `<h1 class="hero__title">DOI KHAM</h1>`
- `.hero__copy`
  - `.hero__eyebrow`
  - `.hero__headline-group`
    - `.hero__headline` → `PURE TOMATO`
    - `.hero__headline` → `PLAYFUL GLOW.`
  - `.hero__release` → `2026.9.8 NEW DROP!!`
  - `.hero__location` → `BANGKOK THAILAND`

Decorative Hero children:

- `.hero__hand.hero__hand--left` → `left-hand.png`
- `.hero__hand.hero__hand--right` → `right-hand.png`
- `.scroll-indicator`
  - rotating circular SVG
  - repeated `SCROLL DOWN •` `<textPath>` instances
  - static down-arrow SVG

## 6. Asset inventory

The Hero source directly references these local assets:

- `logo.png`
- `left-hand.png`
- `right-hand.png`

No external image URL is present in the current source excerpt for the Hero.

Asset migration rule:

- Preserve the actual files and intended visual output.
- Do not rename or move assets during the first Hero migration unless the repository structure requires it and the references are updated consistently.
- Do not substitute assets.

## 7. Behavior inventory

### 7.1 Visual behavior

- Full viewport-oriented page composition.
- Radial-gradient background with viewport/aspect-ratio adjustments.
- Large `DOI KHAM` title with container-query-based sizing (`cqw`).
- Responsive Hero copy sizing.
- Two decorative hand images anchored near the bottom center.
- Circular `SCROLL DOWN •` text rotates continuously.
- Central down arrow remains static.

### 7.2 Interaction behavior

The Hero has no user-driven JavaScript interaction in the current source. The visible dynamic behavior is CSS animation:

- `@keyframes scroll-indicator-rotate`
- Animation duration: `12s`
- Timing: `linear`
- Iteration: `infinite`

The animation is disabled under `@media (prefers-reduced-motion: reduce)`.

## 8. Ownership decision

### Application-owned responsibilities

After migration, the application/page layer should own:

- Document structure: `<!doctype html>`, `<html>`, `<head>`, `<body>`.
- Global box-sizing reset.
- Global document sizing and default margins/padding.
- Global typography/reset rules that apply to multiple components.
- Global design tokens shared by multiple sections.
- Overall page background if it becomes a site-wide concern.
- Global overflow behavior only when required for the complete landing page.
- Shared header/navigation if the Header is later separated from Hero.
- `<main>` and page section ordering.
- Loading/registration of component modules.

### Hero-owned responsibilities

The Hero component should own:

- The `<section class="hero">` and its internal markup.
- Hero title and copy.
- Hero hands.
- Scroll indicator.
- Hero-specific layout rules.
- Hero-specific responsive behavior.
- Hero animation.
- Hero-specific CSS variables that are not shared elsewhere.

### Header decision

The current standalone source contains a Header with `logo.png`. This should be treated as **application-level/header ownership**, not automatically embedded in `<doi-kham-hero>`.

Reason: the final landing page will contain multiple sections and likely a single shared page header/navigation. Keeping Header ownership outside Hero avoids coupling Hero to the page shell.

### `.page` decision

The current `.page` wrapper owns the viewport and background treatment. This is **application/page-shell ownership**, not Hero ownership.

Potential future consideration: if the specific radial-gradient is meant to visually belong exclusively to the Hero, the background could later move to the Hero section. However, that would be a design/architecture decision and must not be done silently during migration. For the first migration, preserve the visual effect while relocating only ownership, not appearance.

### `.main` decision

`.main` is application/page structure. It should not be implemented as part of the Hero custom element.

## 9. Proposed component boundary

The intended custom-element API is:

```html
<doi-kham-hero></doi-kham-hero>
```

The custom element represents only the Hero section, not the complete standalone page.

Expected conceptual tree:

```text
Application
└── <main>
    └── <doi-kham-hero>
        └── <section class="hero">
            ├── .hero__content
            ├── .hero__hand--left
            ├── .hero__hand--right
            └── .scroll-indicator
```

## 10. Proposed file ownership

Target structure for the first migration:

```text
components/
└── hero/
    ├── doi-kham-hero.js
    └── doi-kham-hero.css

styles/
└── global.css

js/
└── app.js

index.html
```

Ownership:

- `index.html` → application entry document.
- `styles/global.css` → shared document/app foundations.
- `components/hero/doi-kham-hero.css` → Hero styles.
- `components/hero/doi-kham-hero.js` → Hero custom element and any Hero-local behavior.
- `js/app.js` → imports/registers components.

## 11. Web Components implementation constraint

Use a native custom element and register it with `customElements.define()`.

The first migration should **not use Shadow DOM**. Normal document CSS should be retained so the existing visual system can be migrated with minimal behavioral change.

This is consistent with the platform model: Web Components support custom elements, optional Shadow DOM, and templates; custom elements are registered in the global custom-element registry. Shadow DOM is deliberately deferred here to avoid introducing a new styling boundary during the baseline-preservation phase.

## 12. Migration invariants

The following must remain unchanged during the initial migration:

- Visual design.
- Content and wording.
- HTML meaning/structure where not required by the new component boundary.
- Responsive breakpoints.
- Desktop positioning and sizing.
- Mobile positioning and sizing.
- Image assets.
- Scroll-indicator animation.
- Reduced-motion behavior.
- Existing Hero CSS values unless a real integration conflict requires adjustment.
- No redesign.
- No unrelated cleanup of other landing-page sections.

## 13. Integration risks

### Risk 1 — Global reset collisions

The Hero source currently owns global selectors such as `body`, `h1`, and `p`. Leaving these untouched inside a multi-section page can affect other components. These rules must be evaluated as application-wide rules before being moved.

### Risk 2 — Variable collisions

`:root` currently owns both page-level variables and Hero-specific variables. Similar variable names may exist in other sections. Shared variables should be normalized only after inventorying the whole application.

### Risk 3 — `.page` background coupling

The background and blur effect are currently attached to `.page`. Moving them without preserving the same containing block, stacking context, and dimensions could change the visual result.

### Risk 4 — Header coupling

The current Hero source includes a header and logo even though the future application should likely have one shared header. Do not duplicate the Header when other components are integrated.

### Risk 5 — `min-block-size: inherit`

`.hero` and `.hero__content` currently depend on inherited/minimum block sizing from the standalone `.main`/`.page` structure. The new application shell must preserve the equivalent containing height or the Hero's vertical composition may shift.

### Risk 6 — Positioning containing block changes

The hands and scroll indicator use absolute positioning. Their nearest positioned ancestor and the Hero/page dimensions must remain equivalent during migration.

### Risk 7 — SVG ID uniqueness

The scroll indicator uses an SVG `<path id="scroll-indicator-circle-path">` referenced by multiple `<textPath>` elements. If the component is ever rendered more than once, the static ID could become duplicated. For the landing page there will normally be one Hero instance, so this is not an immediate blocker, but it is a known component-reusability consideration.

## 14. Validation checklist for migration implementation

Before considering the migration complete, verify:

- `<doi-kham-hero>` is defined and renders.
- Hero CSS is loaded exactly once.
- No global CSS from the old standalone document leaks unintentionally.
- `logo.png`, `left-hand.png`, and `right-hand.png` resolve from their new locations.
- Hero background treatment remains visually equivalent.
- Hero title remains correctly sized at desktop and mobile widths.
- Hero copy remains correctly positioned.
- Both hand images remain correctly anchored.
- Scroll indicator remains positioned correctly.
- Circular text keeps rotating at the same speed.
- Reduced-motion behavior still disables the rotation.
- No console errors occur.
- No other component is visually affected by Hero CSS.

## 15. Recommended next implementation task

The next implementation task is **not** to redesign or refactor the Hero.

It is to:

1. Create the Hero component files.
2. Move only the Hero markup into the custom element.
3. Move Hero-specific CSS into the component stylesheet.
4. Move genuinely global/page-shell rules into the application layer.
5. Register the component through the app module.
6. Render only `<doi-kham-hero>` from the new `index.html` during the first integration milestone.
7. Compare the rendered result against the original standalone Hero before migrating another section.

## 16. Source evidence notes

The source file uses the following major sections in its stylesheet:

- Base / Reset
- Theme
- Page / Viewport
- Background
- Background Effect
- Header
- Header / Logo
- Main
- Hero
- Hero / Content
- Hero / DOI KHAM
- Hero / Text Group
- Hero / Text — Eyebrow
- Hero / Text — Headline Group
- Hero / Text — Headline
- Hero / Text — Release
- Hero / Text — Location
- Hero / Hands
- Hero / Scroll Indicator
- Scroll Indicator / Rotating Text
- Scroll Indicator / Static Arrow
- Scroll Indicator / Animation
- Desktop
- Mobile
- Small Mobile
- Very Small Mobile
- Wide Viewport
- Reduced Motion

These names are retained in this inventory because they provide a stable map back to the original file while the implementation is being decomposed.
