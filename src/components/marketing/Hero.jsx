import React, { useLayoutEffect, useRef, useEffect } from 'react'
import '../../styles/landing.css'
import { initHeroCrossfade } from '../../scripts/hero-crossfade'

export default function Hero() {
  const heroRef = useRef(null)
  const eyebrowRef = useRef(null)
  const h1Ref = useRef(null)
  const ledeRef = useRef(null)
  const stackRef = useRef(null)
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

  // Lock eyebrow at ≥1200 before paint to avoid initial jump
  useLayoutEffect(() => {
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
      // Disabled here for ≥1200; newer tokenized effect below handles ≥1200 sizing/centering
      if (wrap && btn && window.innerWidth < 1200) {
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
          const SCALE = 1.35
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

  // Breakpoint-aware token map for sizing/alignment (non-structural)
  useLayoutEffect(() => {
    const setImp = (el, prop, val) => el?.style?.setProperty(prop, val, 'important')
    const W = () => window.innerWidth
    const H = () => window.innerHeight

    const bpKey = () => {
      const w = W(), h = H()
      if (w >= 1600 && h >= 870) return 'xl'
      if (w >= 1200) return 'l'
      if (w === 900 && h === 900) return 'm2'
      if (w >= 1100) return 'm1'
      if (w >= 800) return 's'
      return 'xs'
    }

    const INK = { label: '#2A2A2A', meta: '#74726E' }
    const TOKENS = {
      xl: { align: 'center', hideEyebrow: false, ledeFS: '23.6px', ctaFS: '22px', ctaW: '560px', showPalette: true, curatedAlign: 'center' },
      l:  { align: 'center', hideEyebrow: false, ledeFS: '23.6px', ctaFS: '22px', ctaW: '540px', showPalette: true, curatedAlign: 'center' },
      m1: { align: 'left',   hideEyebrow: false, ledeFS: '22px',   ctaFS: '21px', ctaW: '520px', showPalette: true, curatedAlign: 'left' },
      m2: { align: 'left',   hideEyebrow: false, ledeFS: '21px',   ctaFS: '20px', ctaW: '500px', showPalette: true, curatedAlign: 'left' },
      s:  { align: 'center', hideEyebrow: true,  ledeFS: '21px',   ctaFS: '20px', ctaW: '480px', showPalette: false, curatedAlign: 'center' },
    }

    const ARROW_EM = 1.30
    const ARROW_NUDGE = '-1px'
    const CTA_GAP = '10px'
    const CTA_HEIGHT = '60px'
    const CTA_WEIGHT = 400

    const apply = () => {
      const key = bpKey()
      const t = TOKENS[key] ?? TOKENS.l

      // ====== 1600×788 WIDE-SHORT PIN + TOKENS (drop-in) ======
      const isLG = window.innerWidth >= 1200 && window.innerWidth < 1500
      const T_XL = { CONTENT_MAX: 880, LEDE_CH: 48, CTA_W: 520, CTA_FS: 24, CTA_MINH: 72, CTA_PADV: 20, CTA_PADH: 32, CTA_GAP: 14, ARROW_EM: 1.35 }
      const T_WS = { CONTENT_MAX: 820, LEDE_CH: 44, CTA_W: 450, CTA_FS: 24, CTA_MINH: 70, CTA_PADV: 20, CTA_PADH: 32, CTA_GAP: 10, ARROW_EM: 1.35 }

      const mqExactWS = window.matchMedia('(width:1600px) and (height:788px)').matches
      const mqWideShort = window.matchMedia('(min-width:1500px) and (max-height:820px)').matches
      const TOK = (mqExactWS || mqWideShort) ? T_WS : T_XL

      // Debug once
      // eslint-disable-next-line no-console
      console.table({ w: window.innerWidth, h: window.innerHeight, branch: TOK === T_WS ? 'WIDE-SHORT' : 'XL' })

      if (contentRef.current) {
        setImp(contentRef.current, 'text-align', t.align)
        setImp(contentRef.current, 'margin-inline', t.align === 'center' ? 'auto' : '0')
        setImp(contentRef.current, 'max-inline-size', `${TOK.CONTENT_MAX}px`)
        // Create a centering context so children can use place-self
        setImp(contentRef.current, 'display', 'grid')
        setImp(contentRef.current, 'justify-items', 'center')
      }
      if (eyebrowRef.current) {
        setImp(eyebrowRef.current, 'display', t.hideEyebrow ? 'none' : 'inline-block')
        setImp(eyebrowRef.current, 'font-size', '21px')
      }
      if (ledeRef.current) {
        setImp(ledeRef.current, 'font-size', t.ledeFS)
        setImp(ledeRef.current, 'line-height', '1.5')
        setImp(ledeRef.current, 'transform', 'translateY(-5px)')
        setImp(ledeRef.current, 'margin-bottom', '4px')
        setImp(ledeRef.current, 'color', INK.meta)
        setImp(ledeRef.current, 'font-weight', '400')
        // Line length tuned per wide‑short vs xl
        setImp(ledeRef.current, 'max-inline-size', `${TOK.LEDE_CH}ch`)
      }
      // XL-only micro nudge for lede
      if (!isLG && ledeRef.current) {
        setImp(ledeRef.current, 'transform', 'translateY(-5px)')
      }
      if (ctaWrapRef.current) {
        const W = `${TOK.CTA_W}px`
        setImp(ctaWrapRef.current, 'box-sizing', 'border-box')
        setImp(ctaWrapRef.current, 'inline-size', W)
        setImp(ctaWrapRef.current, 'width', W)
        setImp(ctaWrapRef.current, 'max-inline-size', W)
        setImp(ctaWrapRef.current, 'min-inline-size', W)
        setImp(ctaWrapRef.current, 'flex', `0 0 ${W}`)
        // Math-center within a grid container
        setImp(ctaWrapRef.current, 'margin-inline', '0')
        setImp(ctaWrapRef.current, 'justify-self', 'center')
        setImp(ctaWrapRef.current, 'place-self', 'center')
        setImp(ctaWrapRef.current, 'align-self', 'center')
        setImp(ctaWrapRef.current, 'outline', '0')
        setImp(ctaWrapRef.current, 'box-shadow', 'none')
      }
      if (ctaRef.current) {
        setImp(ctaRef.current, 'display', 'flex')
        setImp(ctaRef.current, 'box-sizing', 'border-box')
        setImp(ctaRef.current, 'align-items', 'center')
        setImp(ctaRef.current, 'justify-content', 'center')
        setImp(ctaRef.current, 'width', '100%')
        setImp(ctaRef.current, 'inline-size', '100%')
        setImp(ctaRef.current, 'min-width', '100%')
        setImp(ctaRef.current, 'max-width', '100%')
        setImp(ctaRef.current, 'gap', `${TOK.CTA_GAP}px`)
        setImp(ctaRef.current, 'min-height', `${TOK.CTA_MINH}px`)
        setImp(ctaRef.current, 'height', `${TOK.CTA_MINH}px`)
        setImp(ctaRef.current, 'padding', `${TOK.CTA_PADV}px ${TOK.CTA_PADH}px`)
        setImp(ctaRef.current, 'font-size', `${TOK.CTA_FS}px`)
        setImp(ctaRef.current, 'font-weight', CTA_WEIGHT)
        setImp(ctaRef.current, 'line-height', '1')
        setImp(ctaRef.current, 'white-space', 'nowrap')
        setImp(ctaRef.current, 'outline', '0')
        const labelEl = ctaRef.current.querySelector('.btn__label,[data-hero="cta-label"]')
        if (labelEl) {
          setImp(labelEl, 'font-weight', CTA_WEIGHT)
        }
      }
      if (ctaArrowRef.current && ctaRef.current) {
        const fontPx = parseFloat(getComputedStyle(ctaRef.current).fontSize || '22')
        const sizePx = Math.round(fontPx * 1.5) // reduce arrow ~25% from previous 2.0x
        setImp(ctaArrowRef.current, 'display', 'inline-block')
        setImp(ctaArrowRef.current, 'flex', '0 0 auto')
        setImp(ctaArrowRef.current, 'width', `${sizePx}px`)
        setImp(ctaArrowRef.current, 'height', `${sizePx}px`)
        setImp(ctaArrowRef.current, 'inline-size', `${sizePx}px`)
        setImp(ctaArrowRef.current, 'block-size', `${sizePx}px`)
        setImp(ctaArrowRef.current, 'transform', 'translateY(-1px)')
        setImp(ctaArrowRef.current, 'background-color', 'currentColor')
        setImp(ctaArrowRef.current, '-webkit-mask', "url('/icons/RightArrow.svg') no-repeat center / 100% 100%")
        setImp(ctaArrowRef.current, 'mask', "url('/icons/RightArrow.svg') no-repeat center / 100% 100%")
      }
      if (paletteRowRef.current) {
        setImp(paletteRowRef.current, 'display', TOKENS[key]?.showPalette === false ? 'none' : 'grid')
        setImp(paletteRowRef.current, 'align-items', 'center')
        setImp(paletteRowRef.current, 'justify-items', t.align === 'center' ? 'center' : 'start')
        setImp(paletteRowRef.current, 'gap', '8px')
        setImp(paletteRowRef.current, 'margin-top', '6px')
        setImp(paletteRowRef.current, 'transform', 'translateY(-5px)')
      }
      // XL-only micro nudge for palette row
      if (!isLG && paletteRowRef.current) {
        setImp(paletteRowRef.current, 'margin-top', '14px')
        setImp(paletteRowRef.current, 'transform', 'translateY(-5px)')
      }
      if (boltRef.current) {
        setImp(boltRef.current, 'width', '26px')
        setImp(boltRef.current, 'height', '26px')
        setImp(boltRef.current, 'background', 'none')
        setImp(boltRef.current, 'transform', 'translateY(-1px)')
      }
      if (paletteLabelRef.current) {
        setImp(paletteLabelRef.current, 'font-size', '24px')
        setImp(paletteLabelRef.current, 'font-weight', '400')
        setImp(paletteLabelRef.current, 'color', INK.label)
      }
      if (paletteMetaRef.current) {
        setImp(paletteMetaRef.current, 'font-size', '20px')
        setImp(paletteMetaRef.current, 'font-weight', '400')
        setImp(paletteMetaRef.current, 'color', INK.meta)
        setImp(paletteMetaRef.current, 'margin-left', '4px')
      }
      if (brandRef.current) {
        setImp(brandRef.current, 'margin-inline', t.curatedAlign === 'center' ? 'auto' : '0')
        setImp(brandRef.current, 'text-align', t.curatedAlign)
      }

      // === Exact 1600×900: nudge stack + CTA + palette up by 15px (brand stays put) ===
      if (window.matchMedia('(width:1600px) and (height:900px)').matches) {
        if (stackRef.current) setImp(stackRef.current, 'transform', 'translateY(-15px)')
        if (ctaWrapRef.current) setImp(ctaWrapRef.current, 'transform', 'translateY(-15px)')
        if (paletteRowRef.current) setImp(paletteRowRef.current, 'transform', 'translateY(-20px)')
      }
    }

    apply()
    const onR = () => apply()
    window.addEventListener('resize', onR)
    return () => window.removeEventListener('resize', onR)
  }, [])

  return (
    <section ref={heroRef} id="hero" className="hero" data-hero="root">
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
      <figure className="hero__pillar hero__pillar--left" data-hero="pillar-left" aria-hidden="true">
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
        <div className="hero__stack" ref={stackRef}>
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
            <span
              ref={ctaArrowRef}
              className="icon icon--arrow"
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: '1.3em',
                height: '1.3em',
                transform: 'translateY(-1px)',
                background: 'none',
                WebkitMaskImage: 'url(/icons/RightArrow.svg)',
                maskImage: 'url(/icons/RightArrow.svg)',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                backgroundColor: 'currentColor',
              }}
            />
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
          <span className="sep" aria-hidden="true" data-hero="palette-sep">·</span>
          <span ref={paletteMetaRef} className="meta" data-hero="palette-meta">
            30 sec
          </span>
        </div>
        <div className="brandmark hero__brand" data-hero="wordmark" ref={brandRef}>Curated</div>
      </div>

      {/* Right pillar (≥1200) */}
      <figure className="hero__pillar hero__pillar--right" data-hero="pillar-right" aria-hidden="true">
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

