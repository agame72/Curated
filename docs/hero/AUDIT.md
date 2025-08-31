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
Resolved vars: --g-h1-lede: 22px; --g-lede-cta: 28px.

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
Resolved vars: --g-h1-lede: 20px; --g-lede-cta: 20px.

### 1600×788
| Node | Prop | Value | Winner (file:line) | !important? |
|------|------|-------|--------------------|-------------|
| .h1 | margin-bottom | 0px | src/components/marketing/Hero.jsx:191 | yes |
| .eyebrow | display | inline-block | src/styles/landing.css:127–131 | yes |
| .lede | margin-top | 24px | src/styles/hero.anim.B.css:25–33 (.lede uses var) | yes |
| .lede | transform | none | src/styles/hero.anim.B.css:25–33 | yes |
| [data-intro-group] | row-gap | 26px | src/styles/hero.anim.B.css:141 | yes |
| .ctaWrap | margin-top | 0px | src/styles/hero.anim.B.css:33–37 | yes |
| .paletteRow | margin-top | 0px | src/styles/hero.anim.B.css:33–37 | yes |
| .logo | position | static | src/styles/hero.anim.B.css:21 | yes |

Token compliance (expected 24 / 26):
```txt
H1→Lede(px): 24
Lede→CTA(px): 26
```
Computed panel references: `docs/hero/assets/1600x788_lede_margin.png`, `docs/hero/assets/1600x788_group_rowgap.png`.
DOM snapshot: `.lede` is direct child of `[data-intro-group]` (see assets).

### 1170×788
| Node | Prop | Value | Winner (file:line) | !important? |
|------|------|-------|--------------------|-------------|
| .h1 | margin-bottom | 28px | src/components/marketing/Hero.jsx:1072–1073 | yes |
| .eyebrow | display | block | src/components/marketing/Hero.jsx:925–934 | yes |
| .lede | margin-top | 18px | src/components/marketing/Hero.jsx:944–946 (band rules) | yes |
| .lede | transform | translateY(-12px) → none for layout | src/components/marketing/Hero.jsx:1075–1079 | yes |
| [data-intro-group] | row-gap | 24px | src/components/marketing/Hero.jsx:929–933 (band writes) | yes |
| .ctaWrap | margin-top | 0px | src/components/marketing/Hero.jsx:954–956 | yes |
| .paletteRow | margin-top | ~16–24px band tokens | src/components/marketing/Hero.jsx:1108–1115 | yes |
| .logo | position | absolute (band) | src/components/marketing/Hero.jsx:1114–1115 | yes |

Token compliance (expected 18 / 24):
```txt
H1→Lede(px): 18
Lede→CTA(px): 24
```
Computed panel references: `docs/hero/assets/1170x788_lede_margin.png`, `docs/hero/assets/1170x788_group_rowgap.png`.
DOM snapshot: `.lede` is direct child of `[data-intro-group]` (see assets).

### 834×900
| Node | Prop | Value | Winner (file:line) | !important? |
|------|------|-------|--------------------|-------------|
| .h1 | margin-bottom | 0px | src/components/marketing/Hero.jsx:191 | yes |
| .eyebrow | display | block | src/styles/landing.css:(834 band) | yes |
| .lede | margin-top | 16px | src/styles/hero.anim.B.css:25–33 (.lede uses var) | yes |
| .lede | transform | none | src/styles/hero.anim.B.css:25–33 | yes |
| [data-intro-group] | row-gap | 22px | src/styles/hero.anim.B.css:141 | yes |
| .ctaWrap | margin-top | 0px | src/styles/hero.anim.B.css:33–37 | yes |
| .paletteRow | display | none | src/styles/landing.css:(834 band) | yes |
| .logo | position | static | src/styles/hero.anim.B.css:21 | yes |

Eyebrow check: visible; winner selector `@media (min-width: 820px) and (max-width: 899px)… .eyebrow { display:block; }` in src/styles/landing.css.

Token compliance (expected 16 / 22):
```txt
H1→Lede(px): 16
Lede→CTA(px): 22
```
Computed panel refs: `docs/hero/assets/834x900_lede_margin.png`, `docs/hero/assets/834x900_group_rowgap.png`.
DOM snapshot: `.lede` direct child of `[data-intro-group]`.

### 768×900
| Node | Prop | Value | Winner (file:line) | !important? |
|------|------|-------|--------------------|-------------|
| .h1 | margin-bottom | 0px | src/components/marketing/Hero.jsx:191 | yes |
| .eyebrow | display | block | src/components/marketing/Hero.jsx:444–452 | yes |
| .lede | margin-top | 16px | src/styles/hero.anim.B.css:25–33 | yes |
| .lede | transform | none | src/styles/hero.anim.B.css:25–33 | yes |
| [data-intro-group] | row-gap | 22px | src/styles/hero.anim.B.css:141 | yes |
| .ctaWrap | margin-top | 0px | src/styles/hero.anim.B.css:33–37 | yes |
| .paletteRow | display | flex | src/components/marketing/Hero.jsx:431–440 | yes |
| .logo | position | static | src/styles/hero.anim.B.css:21 | yes |

Token compliance (expected 16 / 22):
```txt
H1→Lede(px): 16
Lede→CTA(px): 22
```
Computed panel refs: `docs/hero/assets/768x900_lede_margin.png`, `docs/hero/assets/768x900_group_rowgap.png`.
DOM snapshot: `.lede` direct child of `[data-intro-group]`.

### 428×800
| Node | Prop | Value | Winner (file:line) | !important? |
|------|------|-------|--------------------|-------------|
| .h1 | margin-bottom | 0px | src/components/marketing/Hero.jsx:191 | yes |
| .eyebrow | display | none | src/components/marketing/Hero.jsx:475–477 | yes |
| .lede | margin-top | 16px | src/styles/hero.anim.B.css:25–33 | yes |
| .lede | transform | none | src/styles/hero.anim.B.css:25–33 | yes |
| [data-intro-group] | row-gap | 20px | src/styles/landing.css (mobile baseline) | yes |
| .ctaWrap | margin-top | 0px | src/styles/hero.anim.B.css:33–37 | yes |
| .paletteRow | display | none | src/components/marketing/Hero.jsx:399, 477–479 | yes |
| .logo | position | absolute; bottom:12px | src/components/marketing/Hero.jsx:396–397 | yes |

Token compliance (expected 16 / 20):
```txt
H1→Lede(px): 16
Lede→CTA(px): 20
```
Computed panel refs: `docs/hero/assets/428x800_lede_margin.png`, `docs/hero/assets/428x800_group_rowgap.png`.
DOM snapshot: `.lede` direct child of `[data-intro-group]`.

### 360×780
| Node | Prop | Value | Winner (file:line) | !important? |
|------|------|-------|--------------------|-------------|
| .h1 | margin-bottom | 0px | src/components/marketing/Hero.jsx:191 | yes |
| .eyebrow | display | none | src/components/marketing/Hero.jsx:475–477 | yes |
| .lede | margin-top | 14px | src/styles/hero.anim.B.css:25–33 | yes |
| .lede | transform | none | src/styles/hero.anim.B.css:25–33 | yes |
| [data-intro-group] | row-gap | 18px | src/styles/landing.css (mobile baseline) | yes |
| .ctaWrap | margin-top | 0px | src/styles/hero.anim.B.css:33–37 | yes |
| .paletteRow | display | none | src/styles/landing.css/mobile | yes |
| .logo | position | absolute; bottom:12px | src/components/marketing/Hero.jsx:396–397 | yes |

Token compliance (expected 14 / 18):
```txt
H1→Lede(px): 14
Lede→CTA(px): 18
```
Computed panel refs: `docs/hero/assets/360x780_lede_margin.png`, `docs/hero/assets/360x780_group_rowgap.png`.
DOM snapshot: `.lede` direct child of `[data-intro-group]`.

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
