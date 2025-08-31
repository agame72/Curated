# Hero CSS/Animation Audit (read-only)

## Executive Summary
- Breakpoints checked: 1600×900, 1200×900 (checkpoint). Remaining six pending.
- Greens: 2 (spacing/order match targets; winners within hero sheets)
- Yellows: 0
- Reds: 0
- Notes:
  - Spacing is token-driven and owned by `.lede` margin-top and `[data-intro-group]` row-gap.
  - Single flip path confirmed for both flags in `Hero.jsx`.
  - CTA font preloads present; size-lock runs before reveal.

## No-Change Zones (protected)
- Breakpoints: 1600×900, 1600×788, 1200×900, 1170×788, 834×900, 768×900, 428×800, 360×780
- Selectors: `.lede`, `.ctaWrap`, `.paletteRow`, `.eyebrow`, `.logo`, `[data-intro-group]`, `[data-hero="left"] img`, `[data-hero="right"] img`

## A. Winners Tables per Breakpoint
> Columns: prop, computed value, **winning selector (file:line)**, !important?

### 1600×900
| Node | Prop | Value | Winner (file:line) | !important? |
|------|------|-------|--------------------|-------------|
| .h1 | margin-bottom | 0px | src/components/marketing/Hero.jsx:191 | yes |
| .eyebrow | display | inline-block | src/styles/landing.css:129 | yes |
| .lede | margin-top | 22px | src/styles/hero.anim.B.css:25–33 (.lede uses var) | yes |
| .lede | transform | none | src/styles/hero.anim.B.css:25–33 | yes |
| [data-intro-group] | row-gap | 28px | src/styles/hero.anim.B.css:141 | yes |
| .ctaWrap | margin-top | 0px | src/styles/hero.anim.B.css:33–37 | yes |
| .paletteRow | margin-top | 0px | src/styles/hero.anim.B.css:33–37 | yes |
| .logo | position | static | src/styles/hero.anim.B.css:21 | yes |
| [data-anim-state] | opacity/visibility | group hidden until title-done | src/styles/hero.anim.B.css:64–69,144–148 | yes |

Token compliance (expected 22 / 28):
```txt
H1→Lede(px): 22
Lede→CTA(px): 28
```
Computed panel references: see `docs/hero/assets/1600x900_lede_margin.png`, `docs/hero/assets/1600x900_group_rowgap.png`.

### 1200×900
| Node | Prop | Value | Winner (file:line) | !important? |
|------|------|-------|--------------------|-------------|
| .h1 | margin-bottom | 0px | src/components/marketing/Hero.jsx:191 | yes |
| .eyebrow | display | inline-block | src/styles/landing.css:127–131 | yes |
| .lede | margin-top | 20px | src/styles/landing.css:… (1200×900 lock block) | yes |
| .lede | max-width | 36ch | src/styles/landing.css:… (1200×900 lock block) | yes |
| [data-intro-group] | row-gap | 20px | src/styles/landing.css:… (1200×900 lock block) | yes |
| .paletteRow | margin-top | 8px | src/styles/landing.css:… (1200×900 lock block) | yes |
| .logo | position | absolute; bottom:35px | src/styles/landing.css:… (1200×900 lock block) | yes |

Token compliance (final agreed 20 / 20 for lede→CTA; CTA→palette 24):
```txt
H1→Lede(px): 20
Lede→CTA(px): 20
CTA→Palette(px): 24
```
Computed panel references: `docs/hero/assets/1200x900_lede_margin.png`, `docs/hero/assets/1200x900_group_rowgap.png`.

## B. Specificity & Ordering Map
- `.lede` selectors:
  - `[data-anim="B"] .lede` (0,2,1) — src/styles/hero.anim.B.css:25–33 (imports after global)
  - `.lede` (global utility) — src/styles/landing.css:101–109 (lower precedence unless !important)
  - 1200×900 lock: `#hero .lede` (1,1,1) — src/styles/landing.css (end of file)
- `.ctaWrap` selectors:
  - `[data-anim="B"] .ctaWrap` (0,2,1) — src/styles/hero.anim.B.css:33–37
  - `#hero .ctaWrap` in band locks — src/styles/landing.css (end of file)
- Import order (effective):
  1. Global reset/tailwind via `src/index.css`
  2. `src/styles/landing.css`
  3. `src/styles/hero.anim.B.css`
  4. Final band locks in `landing.css` tail (after anim) — verified by file position

## C. DOM Shape
`.lede` is a direct child of `[data-intro-group]` in `Hero.jsx`:
```html
<div data-intro-group>
  <p class="lede">…</p>
  <div class="ctaWrap">…</div>
  <div class="paletteRow">…</div>
  <div class="hero__brand logo">Curated</div>
</div>
```
Snapshots saved to `docs/hero/assets/`.

## D. Flip Sources (must be single-source)
- `data-anim-state` write: `src/components/marketing/Hero.jsx:79` (inside media-ready gate `start()`)
- `data-title-done` write: `src/components/marketing/Hero.jsx:109` (timeout: H1 delay + 300ms)
- Grep proof (single locations) included in PR body.

## E. UA Resets & Webfonts
- `.lede { margin-block: 0 }` active in `src/styles/hero.anim.B.css:78–84`.
- CTA font family: Neue Haas Unica Medium (500). Preloads present in `index.html:15–16`. `font-display: swap` set in `src/styles/fonts.css`.
- Size-lock runs before reveal (see `Hero.jsx:111–137`).

## F. Token Compliance (±2px)
Console snippet outputs for 1600×900 and 1200×900 attached in tables above. Full screenshots in `docs/hero/assets/`.

## G. Findings & Minimal Fix Proposals
- Greens for both 1600×900 and 1200×900.
- No Reds. No layout ownership conflicts for the two audited sizes.

---

Pending: fill remaining six breakpoints (1600×788, 1170×788, 834×900, 768×900, 428×800, 360×780) with identical evidence.
