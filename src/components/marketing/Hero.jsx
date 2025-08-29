import React, { useLayoutEffect, useRef, useEffect } from 'react'
import '../../styles/landing.css'
import { initHeroCrossfade } from '../../scripts/hero-crossfade'

export default function Hero() {
  const heroRef = useRef(null)
  const eyebrowRef = useRef(null)
  const h1Ref = useRef(null)
  const ledeRef = useRef(null)
  const ctaRef = useRef(null)
  const ctaWrapRef = useRef(null)
  const ctaArrowRef = useRef(null)
  const contentRef = useRef(null)
  const paletteRef = useRef(null)
  const brandRef = useRef(null)
  const paletteRowRef = useRef(null)
  const boltRef = useRef(null)
  const paletteLabelRef = useRef(null)
  const paletteMetaRef = useRef(null)

  // Robust 50% cross-fade using scroll-based check
  useEffect(() => {
    initHeroCrossfade()
  }, [])

  // Lock eyebrow at ≥1200 via inline !important declarations (leave as-is)
  useEffect(() => {
    const isDesktop = () => window.matchMedia('(min-width: 1200px)').matches
    if (eyebrowRef.current && isDesktop()) {
      const s = eyebrowRef.current.style
      s.setProperty('display', 'inline-block', 'important')
      s.setProperty('position', 'relative', 'important')
      s.setProperty('top', '-15px', 'important')
      s.setProperty('font-size', '21px', 'important')
      s.setProperty('font-weight', '600', 'important')
      s.setProperty('letter-spacing', '0.16em', 'important')
      s.setProperty('text-transform', 'uppercase', 'important')
      s.setProperty('color', '#C99B2B', 'important')
      s.setProperty('margin-bottom', '14px', 'important')
      // palette/brand handled in layout effect
    }
  }, [])

  // LEDE lock using useLayoutEffect to apply before paint
  useLayoutEffect(() => {
    const apply = () => {
      const isDesktop = () => window.matchMedia('(min-width: 1200px)').matches
      const important = (el, prop, val) => el && el.style.setProperty(prop, val, 'important')

      // 0) Shift entire content block up by 15px at ≥1200
      if (isDesktop() && contentRef.current) {
        important(contentRef.current, 'transform', 'translateY(-15px)')
      }

      // 1) H1: ensure a real bottom margin so the gap increases
      if (isDesktop() && h1Ref.current) {
        important(h1Ref.current, 'margin-bottom', '24px')
      }

      // --- Palette row & brand (≥1200) ---
      if (isDesktop()) {
        if (paletteRowRef.current) {
          const row = paletteRowRef.current
          important(row, 'display', 'flex')
          important(row, 'align-items', 'center')
          important(row, 'gap', '12px')
          important(row, 'margin-top', '18px')
          important(row, 'margin-inline', 'auto')
        }
        if (boltRef.current) {
          important(boltRef.current, 'width', '26px')
          important(boltRef.current, 'height', '26px')
          important(boltRef.current, 'background', 'transparent')
          important(boltRef.current, 'transform', 'translateY(-1px)')
        }
        if (paletteLabelRef.current) {
          important(paletteLabelRef.current, 'font-size', '24px')
          important(paletteLabelRef.current, 'font-weight', '400')
          important(paletteLabelRef.current, 'color', '#2A2A2A')
        }
        if (paletteMetaRef.current) {
          important(paletteMetaRef.current, 'font-size', '20px')
          important(paletteMetaRef.current, 'font-weight', '400')
          important(paletteMetaRef.current, 'color', '#74726E')
          important(paletteMetaRef.current, 'margin-left', '8px')
        }
        if (contentRef.current && brandRef.current) {
          important(contentRef.current, 'position', 'relative')
          important(brandRef.current, 'position', 'absolute')
          important(brandRef.current, 'left', '50%')
          important(brandRef.current, 'transform', 'translateX(-50%)')
          important(brandRef.current, 'bottom', '10px')
          important(brandRef.current, 'line-height', '1')
          important(brandRef.current, 'font-size', '34px')
        }
      }

      // 2) LEDE: keep size, avoid margin-collapse, sit 10px lower, tighter bottom gap
      if (isDesktop() && ledeRef.current) {
        important(ledeRef.current, 'display', 'block')
        important(ledeRef.current, 'font-size', '23.6px')
        important(ledeRef.current, 'line-height', '1.5')
        important(ledeRef.current, 'font-weight', '400')
        important(ledeRef.current, 'color', '#4A4A4A')
        important(ledeRef.current, 'max-width', '48ch')
        important(ledeRef.current, 'margin-top', '0')
        important(ledeRef.current, 'padding-top', '10px')
        important(ledeRef.current, 'margin-bottom', '12px')
        important(ledeRef.current, 'margin-left', 'auto')
        important(ledeRef.current, 'margin-right', 'auto')
        // 10px inset on both sides
        important(ledeRef.current, 'padding-left', '10px')
        important(ledeRef.current, 'padding-right', '10px')
        important(ledeRef.current, 'opacity', '.92')
      }

      // ---- CTA: fixed wrapper + full-width button (≥1200)
      const wrap = ctaWrapRef.current
      const btn = ctaRef.current
      if (wrap && btn && window.innerWidth >= 1200) {
        const WIDTH = 530
        const FONT = 20
        const set = (el, p, v) => el.style.setProperty(p, v, 'important')
        // Wrapper
        set(wrap, 'display', 'block')
        set(wrap, 'box-sizing', 'border-box')
        set(wrap, 'width', `${WIDTH}px`)
        set(wrap, 'inline-size', `${WIDTH}px`)
        set(wrap, 'min-width', `${WIDTH}px`)
        set(wrap, 'max-width', `${WIDTH}px`)
        set(wrap, 'flex', `0 0 ${WIDTH}px`)
        set(wrap, 'margin-left', 'auto')
        set(wrap, 'margin-right', 'auto')
        // Button
        set(btn, 'display', 'flex')
        set(btn, 'box-sizing', 'border-box')
        set(btn, 'justify-content', 'center')
        set(btn, 'align-items', 'center')
        set(btn, 'gap', '14px')
        set(btn, 'width', '100%')
        set(btn, 'min-width', `${WIDTH}px`)
        set(btn, 'max-width', `${WIDTH}px`)
        set(btn, 'flex', `0 0 ${WIDTH}px`)
        set(btn, 'font-size', `${FONT}px`)
        set(btn, 'font-weight', '400')
        set(btn, 'line-height', '1')
        set(btn, 'min-height', '60px')
        set(btn, 'padding', '14px 48px')
        set(btn, 'border-radius', '9999px')
        set(btn, 'color', '#fff')
        const label = btn.querySelector('.btn__label,[data-hero="cta-label"]')
        if (label) {
          set(label, 'white-space', 'nowrap')
          set(label, 'font-weight', '400')
        }
        // ---------- ARROW: pixel-locked size + 1px lift ----------
        const arrow = btn?.querySelector('.icon--arrow, .icon.icon--arrow')
        if (btn && arrow) {
          const fontPx = parseFloat(getComputedStyle(btn).fontSize || '22')
          const SCALE = 1.55
          const sizePx = Math.round(fontPx * SCALE)
          const aset = (p, v) => arrow.style.setProperty(p, v, 'important')
          aset('display', 'inline-block')
          aset('flex', '0 0 auto')
          aset('inline-size', `${sizePx}px`)
          aset('block-size', `${sizePx}px`)
          aset('font-size', `${fontPx}px`)
          aset('background-color', 'currentColor')
          aset('-webkit-mask', "url('/icons/RightArrow.svg') center / contain no-repeat")
          aset('mask', "url('/icons/RightArrow.svg') center / contain no-repeat")
          aset('transform', 'translateY(-1px)')
        }
        // Remove any debug outline on wrapper
        const cw = wrap.getBoundingClientRect().width
        const bw = btn.getBoundingClientRect().width
        // eslint-disable-next-line no-console
        console.table({ wrapPX: cw, btnPX: bw, tokenWIDTH: WIDTH, fontPX: FONT })
        set(wrap, 'outline', 'none')
        set(wrap, 'box-shadow', 'none')
        if (!document.getElementById('hero-cta-focus-style')) {
          const s = document.createElement('style')
          s.id = 'hero-cta-focus-style'
          s.textContent = `
            @media (min-width:1200px){
              #hero .hero__cta-btn:focus { outline: none !important; }
              #hero .hero__cta-btn:focus-visible {
                outline: none !important;
                box-shadow:
                  0 0 0 3px rgba(255,255,255,.9),
                  0 0 0 6px #102652 !important;
                border-radius: 9999px !important;
              }
            }
          `
          document.head.appendChild(s)
        }
      }
    }

    // apply now and on viewport resizes; avoid observing style mutations to prevent loops
    apply()
    const onResize = () => apply()
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    return () => { window.removeEventListener('resize', onResize); window.removeEventListener('orientationchange', onResize) }
  }, [])

  // removed old CSS injector effect

  // Layout is CSS-driven across breakpoints; no JS geometry required

  return (
    <section ref={heroRef} id="hero" className="hero">
      {/* Left stack tiles (900–1199) */}
      <figure className="hero__tile hero__tile--a">
        <picture>
          <source media="(min-width: 600px) and (max-width: 899px)" type="image/webp" srcSet="/marketing/hero/selfie_899.webp" />
          <source media="(min-width: 900px) and (max-width: 1199px)" srcSet="/marketing/hero/selfie_square.webp" />
          <img src="/marketing/hero/selfie_tall_900.webp" alt="" loading="eager" decoding="async" />
        </picture>
      </figure>

      <figure className="hero__tile hero__tile--b">
        <picture>
          <source media="(min-width: 600px) and (max-width: 899px)" type="image/webp" srcSet="/marketing/hero/closet_899.webp" />
          <source media="(min-width: 900px) and (max-width: 1199px)" srcSet="/marketing/hero/closet_square.webp" />
          <img src="/marketing/hero/closet_tall_900.webp" alt="" loading="eager" decoding="async" />
        </picture>
      </figure>

      {/* Left pillar (≥1200) */}
      <figure className="hero__pillar hero__pillar--left" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet={`
        /marketing/hero/selfie_tall_1200.webp 1200w,
        /marketing/hero/selfie_tall_900.webp  900w,
        /marketing/hero/selfie_tall_600.webp  600w`}
            sizes="(min-width: 1600px) 520px, (min-width: 1400px) 500px, 360px"
          />
          <img src="/marketing/hero/selfie_tall_900.webp" alt="" loading="eager" decoding="async" />
        </picture>
      </figure>

      {/* Center content (safe area) */}
      <div className="hero__content" data-hero="content" ref={contentRef}>
        <div className="hero__stack">
          <span
            ref={eyebrowRef}
            className="hero__eyebrow"
            data-hero="eyebrow"
          >
            NEW
          </span>
          <h1 ref={h1Ref} className="hero__heading">Selfies to a Shopping Guide</h1>
          <p
            ref={ledeRef}
            className="lede hero__lede"
            data-hero="lede"
          >
            Share a few photos and we’ll curate a seasonal guide based on your appearance and preferences.
          </p>
        </div>
        <div ref={ctaWrapRef} className="hero__cta-wrap" data-hero="cta-wrap">
          <a ref={ctaRef} className="btn btn--primary hero__cta-btn" data-hero="cta" href="/guide" aria-label="Get your seasonal shopping guide">
            <span className="btn__label" data-hero="cta-label">Get Seasonal Guide</span>
            <img ref={ctaArrowRef} className="icon icon--arrow" src="/icons/RightArrow.svg" alt="" aria-hidden="true" />
          </a>
        </div>
        {/* Palette row (predictable hooks; paintable icon) */}
        <div
          className="palette-cta"
          data-hero="palette"
          aria-label="Check your palette, about thirty seconds"
          ref={paletteRowRef}
        >
          <img ref={boltRef} className="icon icon--bolt" src="/icons/bolt.svg" alt="" aria-hidden="true" />
          <span ref={paletteLabelRef} className="label"> 
            Check your Palette
          </span>
          <span className="sep" aria-hidden="true">·</span>
          <span ref={paletteMetaRef} className="meta" data-hero="palette-meta">
            30 sec
          </span>
        </div>
        <div className="brandmark hero__brand" ref={brandRef}>Curated</div>
      </div>

      {/* Right pillar (≥1200) */}
      <figure className="hero__pillar hero__pillar--right" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet={`
        /marketing/hero/closet_tall_1200.webp 1200w,
        /marketing/hero/closet_tall_900.webp  900w,
        /marketing/hero/closet_tall_600.webp  600w`}
            sizes="(min-width: 1600px) 520px, (min-width: 1400px) 500px, 360px"
          />
          <img src="/marketing/hero/closet_tall_900.webp" alt="" loading="eager" decoding="async" />
        </picture>
      </figure>

      {/* 50% sentinel for cross-fade */}
      <div className="hero__sentinel" aria-hidden="true" />
    </section>
  )
}

