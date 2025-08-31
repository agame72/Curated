# Hero CSS/Animation Audit (read-only)

## Summary (Green/Yellow/Red counts)
- Breakpoints checked: 1600×900, 1600×788, 1200×900, 1170×788, 834×900, 768×900, 428×800, 360×780
- Greens: TBD
- Yellows: TBD
- Reds: TBD
- Notes:
  - This audit is read-only. No code edits included.
  - See assets in `docs/hero/assets/` for screenshots and DOM snapshots.

## A. Winners Tables per Breakpoint
> For each breakpoint, table rows for .h1, .eyebrow, .lede, .ctaWrap, .paletteRow, .logo, [data-intro-group]
> Columns: prop, computed value, **winning selector (file:line)**, !important?

### 1600×900
| Node | Prop | Value | Winner (file:line) | !important? |
|------|------|-------|--------------------|-------------|
| .lede | margin-top | TBD | TBD | TBD |

### 1600×788
TBD

### 1200×900
TBD

### 1170×788
TBD

### 834×900
TBD

### 768×900
TBD

### 428×800
TBD

### 360×780
TBD

## B. Specificity & Ordering Map
- Selectors that hit **.lede** and **.ctaWrap** with specificity and import order: TBD
- Winner rationale: TBD

## C. DOM Shape
- Confirmation that `.lede` is a **direct child** of `[data-intro-group]` at all sizes: TBD
- DOM snapshots: see `docs/hero/assets/` (TBD)

## D. Flip Sources (must be single-source)
- `data-anim-state` write: TBD (file:line)
- `data-title-done` write: TBD (file:line)
- Extras found: TBD

## E. UA Resets & Webfonts
- `.lede { margin-block: 0 }` active at: TBD (file:line)
- CTA font family/weight and preload: TBD
- `font-display` note; step-growth risk: TBD

## F. Token Compliance (±2px)
> Paste console tables for each breakpoint using the provided snippet
> Targets:
> - 1600×900: **22 / 28**
> - 1600×788: **24 / 26**
> - 1200×900: **20 / 26**
> - 1170×788: **18 / 24**
> - 834×900:  **16 / 22** (eyebrow visible)
> - 768×900:  **16 / 22**
> - 428×800:  **16 / 20**
> - 360×780:  **14 / 18**

TBD — attach console tables.

## G. Findings & Minimal Fix Proposals
- Red items with smallest-possible fix (file:line, selector, property): TBD
- Yellow items to migrate into hero layout/anim in a follow-up: TBD
