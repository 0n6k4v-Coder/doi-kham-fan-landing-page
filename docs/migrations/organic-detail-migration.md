# Organic Detail Migration Memory

## Scope

This document records Stage 1 and Stage 2 of migrating the standalone `doi-kham-hero.html` source into a reusable organic-oval detail component. It is intended to be external project memory for future work.

## Source of truth

- Source file: `doi-kham-hero.html`
- Branch: `feat/migrate-hero-component`
- Source blob SHA: `3f96226a0b7c070d4970998d430ef049b0dd155d`
- Existing Hero custom element: `<doi-kham-hero>`
- New component: `<doi-kham-organic-detail>`

## Stage 1 — Source inventory

### Content DOM

The standalone source contains a `.hero` section with one `.hero__container` and three direct children:

1. Left side: `.hero__side.hero__side--left`
2. Center: `.hero__center`
3. Right side: `.hero__side.hero__side--right`

Each side contains a 2 × 2 `.hero__side-grid` with four `.hero__grid-item` cells. The center contains:

- `.hero__center-headline`
  - `.hero__center-headline-top`
    - `PURE TOMATO,`
  - `.hero__center-headline-bottom`
    - `VIBRANT HEALTH.`
- `.hero__center-copy`
  - Four paragraph blocks containing the tomato-juice narrative copy.

The original standalone Hero also contains a page Header, but Header is not part of the new organic-detail component.

### Asset inventory

Local assets referenced by the source:

- `./assets/images/doi-kham-tomato-juice.png`
- `./assets/images/doi-kham-tomato-juice-low-sodium.png`

The source also references an external fresh-tomato PNG from Vecteezy in four grid cells.

### Source tokens

Hero-specific source values include:

- Background: `#FFF9E6`
- Block padding: `clamp(48px, 7vw, 96px)`
- Inline padding: `clamp(20px, 5vw, 72px)`
- Content width: `1440px`
- Main gap: `clamp(20px, 4vw, 64px)`
- Grid gap: `clamp(10px, 1.5vw, 24px)`
- Grid size: `clamp(280px, 30vw, 480px)`
- Center gap: `clamp(20px, 4vw, 56px)`
- Center title size: `clamp(28px, 3vw, 40px)`
- Center title weight: `900`
- Center title line height: `1`
- Headline gap: `8px`
- Copy size: `16px`
- Copy weight: `400`
- Copy line height: `1.55`
- Copy gap: `clamp(16px, 2vw, 24px)`

### Layout behavior

Desktop uses a three-column CSS Grid:

```text
left side | center content | right side
```

The two side grids use `aspect-ratio: 1` and four equal grid cells. Product images use `object-fit: contain` and selected cells receive rotations.

The component uses a named container query on `.hero__container` (`container: hero / inline-size`). Responsive changes are driven by container width rather than the viewport width directly:

- `max-width: 1100px`: narrower three-column proportions, smaller side grid/image sizes, reduced center spacing and typography.
- `max-width: 700px`: switch to a vertical flex layout; product images are hidden; left/center/right are ordered 1/2/3.
- `max-width: 480px`: reduced padding, grid size, gaps and headline size.
- `max-width: 360px`: further reductions for very small containers.

The original source's visual behavior is preserved in Stage 2. The new component does not own the page shell, header, or page background.

## Stage 2 — Component extraction

### New files

```text
components/
└── organic-detail/
    ├── doi-kham-organic-detail.js
    └── doi-kham-organic-detail.css
```

### Component boundary

The new custom element owns only the detail content:

```html
<doi-kham-organic-detail></doi-kham-organic-detail>
```

Its internal root is `.organic-detail`, followed by `.organic-detail__container` and the left/center/right content groups.

The migration deliberately excludes:

- `<!doctype html>`
- `<html>`
- `<head>`
- `<body>`
- global `*` reset
- global `html`/`body` sizing
- page-level background
- Header
- Main wrapper
- page scroll/transition behavior

### CSS ownership

All extracted selectors were renamed from `.hero__*` to `.organic-detail__*` to avoid collisions with the existing `<doi-kham-hero>` component.

The component keeps its own tokens on `doi-kham-organic-detail`, rather than adding new `:root` variables. This prevents the migrated component from leaking its implementation-specific tokens into the rest of the page.

Container queries remain component-owned and continue to use the component's inline size as their responsive input.

### Web Component implementation

The JavaScript uses a native custom element and `customElements.define()`.

The first migration intentionally does not use Shadow DOM. This keeps the styling model close to the source implementation and avoids introducing an additional style boundary during baseline migration.

The component guards against replacing existing child nodes:

```js
if (this.hasChildNodes()) {
  return;
}
```

### Integration status

Stage 2 only extracts and defines the component. It does not yet change the organic oval markup or scroll controller.

The next stage is to mount:

```html
<doi-kham-organic-detail></doi-kham-organic-detail>
```

inside `.organic-oval` and verify the containing geometry before tuning the component for the oval.

## Important integration invariants

1. The organic oval remains the owner of its shape, position, stacking, and scroll movement.
2. The detail component remains content/layout only.
3. The component must not introduce another full-screen background or flare.
4. The component must not create a second oval/wipe layer.
5. Existing Hero behavior remains unchanged.
6. Do not move or rename image assets as part of this stage.
7. Do not redesign the source layout during migration.

## Known follow-up concerns

- The external Vecteezy tomato asset should eventually be evaluated for production reliability/licensing and may later be replaced by a repository-owned asset; that is outside Stage 2.
- The original source contains an SVG/animation-based scroll indicator, but that belongs to the standalone Hero component and is intentionally not part of the organic detail component.
- The organic oval's overflow and clipping behavior must be verified when the component is mounted because the side artwork can extend beyond individual grid cells.
