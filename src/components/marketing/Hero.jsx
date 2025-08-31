import React, { useLayoutEffect, useRef, useEffect } from 'react'
import '../../styles/landing.css'
import '../../styles/hero.anim.B.css'
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
    // === INTRO ANIMATION: Variant B (three-beat) ====================
    try {
      const root = heroRef.current
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (root && !root.dataset.animDone) {
        if (reduce) {
          root.removeAttribute('data-anim-state')
          root.dataset.animDone = '1'
        } else {
          // Attributes are on markup; set tokens
          root.setAttribute('data-anim','B')
          root.style.setProperty('--h1-delay','120ms')
          root.style.setProperty('--group-gap','500ms')

          // Tag media images for parallax
          const heroEl = contentRef.current?.closest('section')
          const mediaCol = heroEl?.querySelector('[data-hero-media]') || heroEl?.querySelector('.media, .left, .heroMedia')
          const imgs = mediaCol?.querySelectorAll('img')
          if (imgs && imgs[0]) imgs[0].classList.add('is-left')
          if (imgs && imgs[1]) imgs[1].classList.add('is-right')

          // === MEDIA GATE — wait for both photos (no early start) =========
          const imp = (el, prop, val) => el?.style?.setProperty(prop, val, 'important')
          const start = () => {
            try {
              // GPU/paint hints; button simply fades with the group
              imp(ctaRef.current, 'will-change', 'opacity')
              imp(ctaRef.current, 'contain', 'layout paint')
            } catch (e) { /* noop */ }
            requestAnimationFrame(() => {
              // flip
              root?.setAttribute('data-anim-state', 'in')
              // clear inline hides to avoid future conflicts
              const show = (el) => { if (!el) return; try { el.style.opacity = ''; el.style.visibility = ''; } catch (e) { /* noop */ } }
              show(h1Ref.current)
              show(eyebrowRef.current)
              const groupEl = document.querySelector('[data-intro-group]')
              show(groupEl)
              if (root) root.dataset.animDone = '1'
            })
          }

          if (reduce) { start() }
          else {
            const waitFor = (img) => {
              if (!img) return Promise.resolve()
              if (img.decode) return img.decode().catch(() => {})
              if (img.complete) return Promise.resolve()
              return new Promise(res => img.addEventListener('load', res, { once: true }))
            }
            const leftImg  = document.querySelector('[data-hero="left"]  img')
            const rightImg = document.querySelector('[data-hero="right"] img')
            Promise.all([waitFor(leftImg), waitFor(rightImg)]).then(start)
          }
        }
      }
    } catch (e) { /* noop */ }

    const apply = () => {
      const isDesktop = () => window.matchMedia('(min-width: 1200px)').matches
      const important = (el, prop, val) => el && el.style.setProperty(prop, val, 'important')
      const setImp = (el, prop, val) => el && el.style.setProperty(prop, val, 'important')

      // 0) Shift entire content block up by 15px at ≥1200
      if (isDesktop() && contentRef.current) {
        important(contentRef.current, 'transform', 'translateY(-15px)')
      }

      // 1) H1: ensure a real bottom margin so the gap increases
      if (isDesktop() && h1Ref.current) {
        important(h1Ref.current, 'margin-bottom', '24px')
      }

      // restore tokenized lede nudge (static; not animated)
      if (ledeRef.current) {
        // Default tuck value; specific blocks may override below (e.g., 1170x788)
        setImp(ledeRef.current, 'transform', 'translateY(-5px)')
        setImp(ledeRef.current, 'transition', 'none')
      }
      // ensure the group wrapper doesn't add a pre-gap and uses grid spacing inside
      const groupEl = contentRef.current?.querySelector('[data-intro-group]')
      if (groupEl) {
        setImp(groupEl, 'margin-top', '0')
        setImp(groupEl, 'display', 'grid')
        setImp(groupEl, 'row-gap', window.innerWidth >= 1200 ? '18px' : '16px')
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
        // opacity handled via CSS; avoid inline override that disrupts intro animation
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

      // ===== M0 — Mobile baseline (<=899 width) =====
      if (window.innerWidth <= 899) {
        if (contentRef.current) {
          setImp(contentRef.current, 'text-align', 'center')
          setImp(contentRef.current, 'margin-inline', 'auto')
          setImp(contentRef.current, 'justify-items', 'center')
          setImp(contentRef.current, 'gap', '0')
        }
        const heroEl = heroRef.current || contentRef.current?.closest('section')
        const mediaCol = heroEl?.querySelector('[data-hero-media]') || heroEl?.querySelector('.media, .left, .heroMedia')
        if (mediaCol) {
          setImp(mediaCol, 'display', 'grid')
          setImp(mediaCol, 'grid-template-columns', '1fr 1fr')
          setImp(mediaCol, 'gap', '0')
          setImp(mediaCol, 'overflow', 'hidden')
          const kids = Array.from(mediaCol.children)
          if (kids[0]) kids[0].style.setProperty('grid-column', '1 / 2', 'important')
          if (kids[1]) kids[1].style.setProperty('grid-column', '2 / 3', 'important')
          kids.forEach(k => { if (k instanceof HTMLElement) { k.style.setProperty('margin','0','important'); k.style.setProperty('padding','0','important'); k.style.setProperty('width','100%','important') } })
          mediaCol.querySelectorAll('img').forEach((img, i) => {
            img.style.setProperty('display', 'block', 'important')
            img.style.setProperty('width', '100%', 'important')
            img.style.setProperty('height', '100%', 'important')
            img.style.setProperty('object-fit', 'cover', 'important')
            img.style.setProperty('object-position', i === 0 ? 'left center' : 'right center', 'important')
            img.style.setProperty('clip-path', 'none', 'important')
            img.style.setProperty('-webkit-clip-path', 'none', 'important')
          })
        }
        if (h1Ref.current) { setImp(h1Ref.current, 'font-weight', '700'); setImp(h1Ref.current, 'line-height', '1.1') }
        if (ledeRef.current) { setImp(ledeRef.current, 'line-height', '1.5'); setImp(ledeRef.current, 'color', '#74726E') }
        if (ctaWrapRef.current) { setImp(ctaWrapRef.current, 'margin-inline', 'auto'); setImp(ctaWrapRef.current, 'justify-self', 'center') }
        if (ctaRef.current) { setImp(ctaRef.current, 'justify-content', 'center'); setImp(ctaRef.current, 'border-radius', '9999px') }
        if (heroEl && brandRef.current) { setImp(heroEl, 'position', 'relative'); setImp(brandRef.current, 'position', 'absolute'); setImp(brandRef.current, 'left', '50%'); setImp(brandRef.current, 'transform', 'translateX(-50%)'); setImp(brandRef.current, 'bottom', '12px'); setImp(brandRef.current, 'color', '#9C9C9C') }
        if (eyebrowRef.current) setImp(eyebrowRef.current, 'display', 'none')
        if (paletteRowRef.current) setImp(paletteRowRef.current, 'display', 'none')
      }

      // ===== M1 — 834×900 (Tablet‑L) =====
      const is834 = (window.innerWidth === 834 && window.innerHeight >= 880) || (window.innerWidth >= 820 && window.innerWidth < 860)
      if (is834) {
        const heroEl = heroRef.current || contentRef.current?.closest('section')
        const mediaCol = heroEl?.querySelector('[data-hero-media]') || heroEl?.querySelector('.media, .left, .heroMedia')
        const MEDIA_H = 320
        if (mediaCol) { setImp(mediaCol, 'grid-auto-rows', `${MEDIA_H}px`); setImp(mediaCol, 'height', `${MEDIA_H}px`) }
        if (contentRef.current) setImp(contentRef.current, 'max-inline-size', '600px')
        if (ledeRef.current) { setImp(ledeRef.current, 'max-inline-size', '40ch'); setImp(ledeRef.current, 'transform', 'translateY(-6px)') }
        const CTA_W = 440, CTA_FS = 20, CTA_MINH = 56
        if (ctaWrapRef.current) { ['inline-size','width','max-inline-size','min-inline-size'].forEach(p => setImp(ctaWrapRef.current, p, `${CTA_W}px`)) }
        if (ctaRef.current) { setImp(ctaRef.current, 'font-size', `${CTA_FS}px`); setImp(ctaRef.current, 'min-height', `${CTA_MINH}px`); setImp(ctaRef.current, 'padding', '14px 28px'); setImp(ctaRef.current, 'gap', '12px') }
        if (brandRef.current) setImp(brandRef.current, 'font-size', '32px')
      }

      // ===== M2 — 768×900 (Tablet‑M) =====
      const is768 = (window.innerWidth === 768 && window.innerHeight >= 880) || (window.innerWidth >= 740 && window.innerWidth < 800)
      if (is768) {
        const heroEl2 = heroRef.current || contentRef.current?.closest('section')
        const mediaCol2 = heroEl2?.querySelector('[data-hero-media]') || heroEl2?.querySelector('.media, .left, .heroMedia')
        const MEDIA_H2 = 300
        if (mediaCol2) {
          setImp(mediaCol2, 'grid-auto-rows', `${MEDIA_H2}px`)
          setImp(mediaCol2, 'height', `${MEDIA_H2}px`)
        }
        if (contentRef.current) setImp(contentRef.current, 'max-inline-size', '560px')
        if (ledeRef.current) {
          setImp(ledeRef.current, 'max-inline-size', '38ch')
          setImp(ledeRef.current, 'transform', 'translateY(-6px)')
        }
        const CTA_W2 = 420, CTA_FS2 = 20, CTA_MINH2 = 56
        if (ctaWrapRef.current) {
          ;['inline-size','width','max-inline-size','min-inline-size'].forEach(p => setImp(ctaWrapRef.current, p, `${CTA_W2}px`))
        }
        if (ctaRef.current) {
          setImp(ctaRef.current, 'font-size', `${CTA_FS2}px`)
          setImp(ctaRef.current, 'min-height', `${CTA_MINH2}px`)
          setImp(ctaRef.current, 'padding', '14px 26px')
          setImp(ctaRef.current, 'gap', '12px')
        }
        // Palette ON (single line), dot removed; centered on tablet
        if (paletteRowRef.current) {
          setImp(paletteRowRef.current, 'display', 'flex')
          setImp(paletteRowRef.current, 'justify-content', 'center')
          setImp(paletteRowRef.current, 'align-items', 'center')
          setImp(paletteRowRef.current, 'gap', '12px')
          setImp(paletteRowRef.current, 'margin-top', '18px')
          const sep = paletteRowRef.current.querySelector('.sep')
          if (sep) sep.style.setProperty('display', 'none', 'important')
        }
        if (paletteLabelRef.current) { setImp(paletteLabelRef.current, 'font-size', '22px'); setImp(paletteLabelRef.current, 'color', '#2A2A2A') }
        if (paletteMetaRef.current) { setImp(paletteMetaRef.current, 'font-size', '18px'); setImp(paletteMetaRef.current, 'color', '#74726E'); setImp(paletteMetaRef.current, 'margin-left', '6px'); if (paletteMetaRef.current.textContent?.includes('·')) { paletteMetaRef.current.textContent = paletteMetaRef.current.textContent.replace('·','').trim() } }
        // Eyebrow OK to show
        if (eyebrowRef.current) {
          setImp(eyebrowRef.current, 'display', 'block')
          setImp(eyebrowRef.current, 'position', 'relative')
          setImp(eyebrowRef.current, 'top', '-12px')
          setImp(eyebrowRef.current, 'font-size', '14px')
          setImp(eyebrowRef.current, 'font-weight', '600')
          setImp(eyebrowRef.current, 'letter-spacing', '0.16em')
          setImp(eyebrowRef.current, 'color', '#C99B2B')
        }
        if (brandRef.current) setImp(brandRef.current, 'font-size', '30px')
      }

      // ===== M3 — 428×800 (Phone‑L) =====
      const is428 = (window.innerWidth === 428) || (window.innerWidth >= 410 && window.innerWidth <= 440)
      if (is428) {
        const heroEl3 = heroRef.current || contentRef.current?.closest('section')
        const mediaCol3 = heroEl3?.querySelector('[data-hero-media]') || heroEl3?.querySelector('.media, .left, .heroMedia')
        const MEDIA_H3 = 240
        if (mediaCol3) { setImp(mediaCol3, 'grid-auto-rows', `${MEDIA_H3}px`); setImp(mediaCol3, 'height', `${MEDIA_H3}px`) }
        if (contentRef.current) setImp(contentRef.current, 'max-inline-size', '360px')
        if (ledeRef.current) { setImp(ledeRef.current, 'max-inline-size', '32ch'); setImp(ledeRef.current, 'transform', 'translateY(-4px)') }
        if (eyebrowRef.current) setImp(eyebrowRef.current, 'display', 'none')
        if (paletteRowRef.current) setImp(paletteRowRef.current, 'display', 'none')
        const CTA_W3 = 320, CTA_FS3 = 18, CTA_MINH3 = 52
        if (ctaWrapRef.current) { ['inline-size','width','max-inline-size','min-inline-size'].forEach(p => setImp(ctaWrapRef.current, p, `${CTA_W3}px`)) }
        if (ctaRef.current) { setImp(ctaRef.current, 'font-size', `${CTA_FS3}px`); setImp(ctaRef.current, 'min-height', `${CTA_MINH3}px`); setImp(ctaRef.current, 'padding', '12px 22px'); setImp(ctaRef.current, 'gap', '10px') }
        if (brandRef.current) setImp(brandRef.current, 'font-size', '28px')
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
      const TOK_1170 = { CONTENT_MAX: 740, LEDE_CH: 40, CTA_W: 540, CTA_FS: 22, CTA_MINH: 66, CTA_PADV: 18, CTA_PADH: 32, CTA_GAP: 12, ARROW_EM: 1.35 }

      const mqExactWS = window.matchMedia('(width:1600px) and (height:788px)').matches
      const mqExact900 = window.matchMedia('(width:1600px) and (height:900px)').matches
      const mqWideShort = window.matchMedia('(min-width:1500px) and (max-height:820px)').matches
      const is1170x788 = (
        window.matchMedia('(width:1170px) and (height:788px)').matches ||
        (
          window.matchMedia('(min-width:1100px) and (max-width:1220px)').matches &&
          window.matchMedia('(min-height:760px) and (max-height:820px)').matches
        )
      )
      let TOK = (mqExactWS || mqWideShort) ? T_WS : T_XL
      if (is1170x788) TOK = TOK_1170

      // Debug once
      // eslint-disable-next-line no-console
      console.table({ w: window.innerWidth, h: window.innerHeight, branch: is1170x788 ? '1170x788 PILLARS' : (TOK === T_WS ? 'WIDE-SHORT' : 'XL') })

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
        // Always gold for NEW
        setImp(eyebrowRef.current, 'color', '#C99B2B')
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
        const arrowScale = mqExactWS ? 1.25 : (mqExact900 ? 1.35 : 1.5) // 900 slightly smaller than default
        const sizePx = Math.round(fontPx * arrowScale)
        setImp(ctaArrowRef.current, 'display', 'inline-block')
        setImp(ctaArrowRef.current, 'flex', '0 0 auto')
        setImp(ctaArrowRef.current, 'width', `${sizePx}px`)
        setImp(ctaArrowRef.current, 'height', `${sizePx}px`)
        setImp(ctaArrowRef.current, 'inline-size', `${sizePx}px`)
        setImp(ctaArrowRef.current, 'block-size', `${sizePx}px`)
        const lift = (mqExactWS || mqExact900) ? '-2px' : '-1px' // move up 1px at 1600×788 and 1600×900
        setImp(ctaArrowRef.current, 'transform', `translateY(${lift})`)
        setImp(ctaArrowRef.current, 'background-color', 'currentColor')
        setImp(ctaArrowRef.current, '-webkit-mask', "url('/icons/RightArrow.svg') no-repeat center / 100% 100%")
        setImp(ctaArrowRef.current, 'mask', "url('/icons/RightArrow.svg') no-repeat center / 100% 100%")
      }
      if (paletteRowRef.current) {
        const show = TOKENS[key]?.showPalette === false ? 'none' : 'flex'
        setImp(paletteRowRef.current, 'display', show)
        setImp(paletteRowRef.current, 'align-items', 'center')
        setImp(paletteRowRef.current, 'justify-content', t.align === 'center' ? 'center' : 'flex-start')
        setImp(paletteRowRef.current, 'gap', '14px')
        setImp(paletteRowRef.current, 'margin-top', '6px')
        setImp(paletteRowRef.current, 'flex-wrap', 'nowrap')
        setImp(paletteRowRef.current, 'white-space', 'nowrap')
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
        setImp(paletteLabelRef.current, 'white-space', 'nowrap')
      }
      if (paletteMetaRef.current) {
        setImp(paletteMetaRef.current, 'font-size', '20px')
        setImp(paletteMetaRef.current, 'font-weight', '400')
        setImp(paletteMetaRef.current, 'color', INK.meta)
        setImp(paletteMetaRef.current, 'margin-left', '4px')
        setImp(paletteMetaRef.current, 'white-space', 'nowrap')
      }
      if (brandRef.current) {
        setImp(brandRef.current, 'margin-inline', t.curatedAlign === 'center' ? 'auto' : '0')
        setImp(brandRef.current, 'text-align', t.curatedAlign)
        // Global color lock: ensure watermark is always quiet gray
        setImp(brandRef.current, 'color', 'var(--curated-logo, #9C9C9C)')
        setImp(brandRef.current, 'fill',  '#9C9C9C')
        // opacity handled via CSS; avoid inline override that disrupts intro animation
        setImp(brandRef.current, 'mix-blend-mode', 'normal')
        setImp(brandRef.current, 'filter', 'none')
      }

      // ===== Adaptive snap bands & gentle scaling (non-neurotic) =====
      const bandFor = (W, H) => {
        if (W >= 1500 && H >= 860) return 'XL'
        if (W >= 1500 && H < 820) return 'WS'
        if (W >= 1200 && W < 1500 && H >= 860) return 'M'
        // Treat 1100–1199 widths as left-aligned 1170 clone across a wider height band
        if (W >= 1100 && W < 1200 && H >= 640 && H <= 920) return 'S-LEFT'
        if (W >= 1100 && W < 1200 && H >= 760 && H <= 820) return 'S'
        if (W >= 900 && W < 1100 && H >= 860) return 'S-CLIP'
        return 'STACKED'
      }
      const clampNum = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
      const lerp = (a, b, tt) => a + (b - a) * tt
      const pct = (v, a, b) => clampNum((v - a) / (b - a), 0, 1)
      const scaleFrom = (anchor, W, range, opts = {}) => {
        const tfrac = pct(W, range[0], range[1])
        const Tanchor = { ...anchor }
        const contentMin = opts.CONTENT_MIN ?? (anchor.CONTENT_MAX - 120)
        const contentMax = anchor.CONTENT_MAX
        const ledeMin = opts.LEDE_MIN ?? (anchor.LEDE_CH - 4)
        const ledeMax = anchor.LEDE_CH
        const ctaMin = opts.CTA_MIN ?? (anchor.CTA_W - 80)
        const ctaMax = anchor.CTA_W
        Tanchor.CONTENT_MAX = Math.round(lerp(contentMin, contentMax, tfrac))
        Tanchor.LEDE_CH = Math.round(lerp(ledeMin, ledeMax, tfrac))
        Tanchor.CTA_W = Math.round(lerp(ctaMin, ctaMax, tfrac) / 10) * 10
        return Tanchor
      }

      // Anchor presets (re-using existing values)
      const TOKA_XL = { BRANCH: 'XL', CONTENT_MAX: T_XL.CONTENT_MAX, LEDE_CH: T_XL.LEDE_CH, CTA_W: T_XL.CTA_W }
      const TOKA_WS = { BRANCH: 'WS', CONTENT_MAX: T_WS.CONTENT_MAX, LEDE_CH: T_WS.LEDE_CH, CTA_W: T_WS.CTA_W }
      const TOKA_1200 = { BRANCH: '1200', CONTENT_MAX: 720, LEDE_CH: 48, CTA_W: 520 }
      const TOKA_1170 = { BRANCH: '1170x788 PILLARS', CONTENT_MAX: 820, LEDE_CH: 44, CTA_W: 340 }

      const Wnow = window.innerWidth
      const Hnow = window.innerHeight
      const band = bandFor(Wnow, Hnow)

      let Tband = null
      if (band === 'M') {
        Tband = scaleFrom(TOKA_1200, Wnow, [1200, 1499])
        // 1201–1439 × 900: encourage an extra wrap by narrowing column/lede a bit more
        if (Hnow >= 860 && Math.round(Hnow) === 900 && Wnow >= 1201 && Wnow <= 1439) {
          const Tstrong = scaleFrom(TOKA_1200, Wnow, [1201, 1439], {
            CONTENT_MIN: TOKA_1200.CONTENT_MAX - 180, // allow ~3rd-line wrap on H1
            LEDE_MIN:    TOKA_1200.LEDE_CH - 6,       // slightly narrower lede measure
            CTA_MIN:     Math.max(420, TOKA_1200.CTA_W - 80),
          })
          Tband = { ...Tband, ...Tstrong }
        }
      } else if (band === 'S-LEFT') {
        // Scale from 1170 anchor gently across 1100–1199
        Tband = scaleFrom(TOKA_1170, Wnow, [1100, 1199], {
          CONTENT_MIN: TOKA_1170.CONTENT_MAX - 80,
          LEDE_MIN: TOKA_1170.LEDE_CH - 2,
          CTA_MIN: Math.max(420, TOKA_1170.CTA_W - 60),
        })
      } else if (band === 'S-CLIP') {
        Tband = scaleFrom(TOKA_1170, Wnow, [900, 1099], {
          CONTENT_MIN: TOKA_1170.CONTENT_MAX - 80,
          LEDE_MIN: TOKA_1170.LEDE_CH - 2,
          CTA_MIN: 440,
        })
        Tband.SHOULD_CLIP_MEDIA = true
      } else if (band === 'XL') {
        Tband = TOKA_XL
      } else if (band === 'WS') {
        Tband = TOKA_WS
      }

      // Apply scaled widths for M and S-CLIP bands only (avoid overriding exact pinned sizes)
      if (Tband && !mqExactWS && !mqExact900 && !is1170x788) {
        if (contentRef.current) setImp(contentRef.current, 'max-inline-size', `${Tband.CONTENT_MAX}px`)
        if (ledeRef.current) setImp(ledeRef.current, 'max-inline-size', `${Tband.LEDE_CH}ch`)
        // CTA fit‑guard
        if (ctaWrapRef.current) {
          const cw = contentRef.current?.getBoundingClientRect?.().width ?? Tband.CONTENT_MAX
          const maxCta = Math.max(420, Math.min(Tband.CTA_W, Math.floor(cw - 80)))
          const Wpx = `${maxCta}px`
          ;['inline-size', 'width', 'max-inline-size', 'min-inline-size'].forEach(p => setImp(ctaWrapRef.current, p, Wpx))
          setImp(ctaWrapRef.current, 'flex', `0 0 ${Wpx}`)
          if (band === 'S-LEFT') {
            setImp(ctaWrapRef.current, 'margin-inline', '0')
            setImp(ctaWrapRef.current, 'justify-self', 'start')
            setImp(ctaWrapRef.current, 'place-self', 'start')
          }
        }
        // Left-aligned preset rules for S-LEFT band
        if (band === 'S-LEFT') {
          if (contentRef.current) {
            setImp(contentRef.current, 'text-align', 'left')
            setImp(contentRef.current, 'margin-inline', '0')
            setImp(contentRef.current, 'justify-items', 'start')
          }
          if (eyebrowRef.current) setImp(eyebrowRef.current, 'display', 'block')
          if (paletteRowRef.current) {
            setImp(paletteRowRef.current, 'display', 'flex')
            setImp(paletteRowRef.current, 'white-space', 'nowrap')
            setImp(paletteRowRef.current, 'gap', '14px')
            const sep = paletteRowRef.current.querySelector('.sep')
            if (sep) sep.style.setProperty('display', 'none', 'important')
          }
          if (brandRef.current) {
            setImp(brandRef.current, 'color', 'var(--curated-logo, #9C9C9C)')
            setImp(brandRef.current, 'align-self', 'start')
            setImp(brandRef.current, 'margin-inline', '0')
            setImp(brandRef.current, 'position', 'static')
            setImp(brandRef.current, 'transform', 'none')
            setImp(brandRef.current, 'left', 'auto')
            setImp(brandRef.current, 'bottom', 'auto')
            setImp(brandRef.current, 'font-size', '34px')
            setImp(brandRef.current, 'margin-top', '28px')
          }
          if (ctaRef.current) setImp(ctaRef.current, 'justify-content', 'center')
          if (Wnow <= 1130 && Hnow >= 880 && paletteRowRef.current) setImp(paletteRowRef.current, 'margin-top', '22px')

          // Special bottom logo cases: 1120×900 and 1170×848
          const isBottomLogoCase = (Wnow === 1120 && Hnow === 900) || (Wnow === 1170 && Hnow === 848)
          if (isBottomLogoCase && brandRef.current && contentRef.current) {
            // Anchor to the content column directly to avoid offset drift
            setImp(contentRef.current, 'position', 'relative')
            setImp(brandRef.current, 'position', 'absolute')
            try {
              const padL = parseInt(getComputedStyle(contentRef.current).paddingLeft || '0', 10) || 0
              setImp(brandRef.current, 'left', `${padL}px`)
            } catch (e) {
              setImp(brandRef.current, 'left', '24px')
            }
            setImp(brandRef.current, 'right', 'auto')
            setImp(brandRef.current, 'bottom', '47px')
            setImp(brandRef.current, 'transform', 'none')
            setImp(brandRef.current, 'color', 'var(--curated-logo, #9C9C9C)')
            setImp(brandRef.current, 'font-size', '34px')
            setImp(brandRef.current, 'margin', '0')
            setImp(brandRef.current, 'align-self', 'auto')
          }
        }
        // Optional media clipping in S-CLIP; ensure both images render identical widths
        if (Tband.SHOULD_CLIP_MEDIA && heroRef.current) {
          const heroEl = heroRef.current
          const mediaCol = heroEl?.querySelector('[data-hero-media]') || heroEl?.querySelector('.media, .left, .heroMedia, .hero__pillar--left')
          if (mediaCol) {
            // 0) Normalize column and its children
            setImp(mediaCol, 'display', 'grid')
            setImp(mediaCol, 'grid-auto-rows', 'auto')
            setImp(mediaCol, 'gap', '0')
            setImp(mediaCol, 'padding', '0')
            setImp(mediaCol, 'margin', '0')
            setImp(mediaCol, 'box-sizing', 'border-box')
            setImp(mediaCol, 'overflow', 'hidden')
            Array.from(mediaCol.children).forEach(node => {
              if (!(node instanceof HTMLElement)) return
              node.style.setProperty('margin', '0', 'important')
              node.style.setProperty('padding', '0', 'important')
              node.style.setProperty('inline-size', '100%', 'important')
              node.style.setProperty('width', '100%', 'important')
              node.style.setProperty('box-sizing', 'border-box', 'important')
              node.style.setProperty('display', 'block', 'important')
            })

            // 1) Clip the column (not each image) so both crop identically
            const t = Math.min(1, Math.max(0, (Wnow - 900) / (1099 - 900)))
            const clipRight = Math.round(25 + (18 - 25) * t)
            setImp(mediaCol, 'clip-path', `inset(0 ${clipRight}% 0 0)`)
            setImp(mediaCol, '-webkit-clip-path', `inset(0 ${clipRight}% 0 0)`)

            // 2) Images fill the column; no per-image clip
            mediaCol.querySelectorAll('img').forEach(img => {
              img.style.setProperty('display', 'block', 'important')
              img.style.setProperty('width', '100%', 'important')
              img.style.setProperty('height', 'auto', 'important')
              img.style.setProperty('max-width', 'none', 'important')
              img.style.setProperty('object-fit', 'cover', 'important')
              img.style.setProperty('object-position', 'left center', 'important')
              img.style.setProperty('clip-path', 'none', 'important')
              img.style.setProperty('-webkit-clip-path', 'none', 'important')
            })

            // 3) Debug widths while QA
            try {
              const dims = [...mediaCol.querySelectorAll('img')].map(i => Math.round(i.getBoundingClientRect().width))
              // eslint-disable-next-line no-console
              console.table({ band: 'S-CLIP', w: Wnow, h: Hnow, mediaColW: Math.round(mediaCol.getBoundingClientRect().width), imgWidths: dims })
            } catch (e) { /* noop */ }
          }
        }
        // eslint-disable-next-line no-console
        console.table({ w: Wnow, h: Hnow, band, using: Tband.BRANCH })
      }

      // === Exact 1600×900: nudge stack + CTA + palette up by 15px (brand stays put) ===
      if (window.matchMedia('(width:1600px) and (height:900px)').matches) {
        if (stackRef.current) setImp(stackRef.current, 'transform', 'translateY(-15px)')
        if (ctaWrapRef.current) setImp(ctaWrapRef.current, 'transform', 'translateY(-15px)')
        if (paletteRowRef.current) setImp(paletteRowRef.current, 'transform', 'translateY(-20px)')
      }
      // === Exact 1200×900: scale stack/CTA/palette by 15% (brand unchanged) ===
      if (window.matchMedia('(width:1200px) and (height:900px)').matches) {
        // Ensure content container itself is not transformed so the brand stays anchored
        if (contentRef.current) {
          setImp(contentRef.current, 'transform', 'none')
          setImp(contentRef.current, 'transform-origin', 'initial')
        }
        if (stackRef.current) {
          setImp(stackRef.current, 'transform-origin', 'top center')
          setImp(stackRef.current, 'transform', 'translateY(-15px) scale(0.85)')
        }
        if (ctaWrapRef.current) {
          setImp(ctaWrapRef.current, 'transform-origin', 'top center')
          setImp(ctaWrapRef.current, 'transform', 'translateY(-56px) scale(0.85)')
        }
        if (paletteRowRef.current) {
          setImp(paletteRowRef.current, 'transform-origin', 'top center')
          setImp(paletteRowRef.current, 'transform', 'translateY(-64px) scale(0.85)')
        }
      }
      // === Exact 1600×788: reduce arrow a bit and pull palette 5px closer ===
      if (mqExactWS) {
        if (paletteRowRef.current) setImp(paletteRowRef.current, 'transform', 'translateY(-10px)')
      }
      // === Exact 1170×788 — left-align pillars with tighter tokens ===
      if (window.matchMedia('(width:1170px) and (height:788px)').matches) {
        const T = {
          BRANCH: '1170x788 PILLARS',
          CONTENT_MAX: 820,
          CONTENT_SHIFT: 0,
          TEXT_ALIGN: 'left',
          LOGO_ALIGN: 'left',
          SHOW_EYEBROW: true,
          SHOW_PALETTE: true,
          EYE_FS: 21, EYE_FW: 600, EYE_LS: '0.16em', EYE_TOP: -15, EYE_COLOR: '#C99B2B',
          H1_FS: 72, H1_FW: 500, H1_LH: 1.05, H1_MB: 28,
          LEDE_CH: 44, LEDE_SHIFT: -12, LEDE_COLOR: '#74726E',
          CTA_W: 340, CTA_FS: 22, CTA_FW: 500, CTA_MINH: 60, CTA_PADV: 16, CTA_PADH: 32, CTA_GAP: 12,
          ARROW_EM: 1.35, ARROW_NUDGE: -1,
          PAL_TOP: 16, BOLT_SIZE: 24, LABEL_FS: 24, LABEL_FW: 400, LABEL_COLOR: '#2A2A2A', META_FS: 20, META_FW: 400, META_COLOR: '#74726E', PAL_GAP: 14, META_ML: 6,
          LOGO_FS: 34,
        }
        // eslint-disable-next-line no-console
        console.log(`branch: ${T.BRANCH}`)
        if (contentRef.current) {
          setImp(contentRef.current, 'max-inline-size', `${T.CONTENT_MAX}px`)
          setImp(contentRef.current, 'margin-inline', '0')
          setImp(contentRef.current, 'text-align', T.TEXT_ALIGN)
          setImp(contentRef.current, 'justify-items', 'start')
          setImp(contentRef.current, 'position', 'relative')
        }
        // Move stack (eyebrow + H1 + lede) up together by 15px
        if (stackRef.current) {
          setImp(stackRef.current, 'transform', 'translateY(-15px)')
        }
        if (eyebrowRef.current && T.SHOW_EYEBROW) {
          setImp(eyebrowRef.current, 'display', 'block')
          setImp(eyebrowRef.current, 'position', 'relative')
          setImp(eyebrowRef.current, 'top', `${T.EYE_TOP}px`)
          setImp(eyebrowRef.current, 'text-transform', 'uppercase')
          setImp(eyebrowRef.current, 'font-size', `${T.EYE_FS}px`)
          setImp(eyebrowRef.current, 'font-weight', `${T.EYE_FW}`)
          setImp(eyebrowRef.current, 'letter-spacing', T.EYE_LS)
          setImp(eyebrowRef.current, 'color', T.EYE_COLOR)
        }
        if (h1Ref.current) {
          setImp(h1Ref.current, 'font-size', `${T.H1_FS}px`)
          setImp(h1Ref.current, 'font-weight', `${T.H1_FW}`)
          setImp(h1Ref.current, 'line-height', `${T.H1_LH}`)
          setImp(h1Ref.current, 'margin-bottom', `${T.H1_MB}px`)
        }
        if (ledeRef.current) {
          setImp(ledeRef.current, 'max-inline-size', `${T.LEDE_CH}ch`)
          setImp(ledeRef.current, 'line-height', '1.5')
          setImp(ledeRef.current, 'transform', `translateY(${T.LEDE_SHIFT}px)`)
          setImp(ledeRef.current, 'color', T.LEDE_COLOR)
        }
        if (ctaWrapRef.current) {
          const W = `${T.CTA_W}px`
          ;['inline-size','width','max-inline-size','min-inline-size'].forEach(p => setImp(ctaWrapRef.current, p, W))
          setImp(ctaWrapRef.current, 'flex', `0 0 ${W}`)
          setImp(ctaWrapRef.current, 'margin-inline', '0')
          setImp(ctaWrapRef.current, 'justify-self', 'start')
          setImp(ctaWrapRef.current, 'align-self', 'start')
          setImp(ctaWrapRef.current, 'margin-top', '0px')
          setImp(ctaWrapRef.current, 'transform', 'translateY(-15px)')
        }
        if (ctaRef.current) {
          setImp(ctaRef.current, 'font-size', `${T.CTA_FS}px`)
          setImp(ctaRef.current, 'font-weight', `${T.CTA_FW}`)
          setImp(ctaRef.current, 'min-height', `${T.CTA_MINH}px`)
          setImp(ctaRef.current, 'padding', `${T.CTA_PADV}px ${T.CTA_PADH}px`)
          setImp(ctaRef.current, 'gap', `${T.CTA_GAP}px`)
        }
        if (ctaArrowRef.current && ctaRef.current) {
          setImp(ctaArrowRef.current, 'width', `${T.ARROW_EM}em`)
          setImp(ctaArrowRef.current, 'height', `${T.ARROW_EM}em`)
          setImp(ctaArrowRef.current, 'inline-size', `${T.ARROW_EM}em`)
          setImp(ctaArrowRef.current, 'block-size', `${T.ARROW_EM}em`)
          setImp(ctaArrowRef.current, 'transform', `translateY(${T.ARROW_NUDGE}px)`)
        }
        if (paletteRowRef.current && T.SHOW_PALETTE) {
          setImp(paletteRowRef.current, 'display', 'flex')
          setImp(paletteRowRef.current, 'align-items', 'center')
          setImp(paletteRowRef.current, 'gap', `${T.PAL_GAP}px`)
          setImp(paletteRowRef.current, 'margin-top', `${Math.max(0, T.PAL_TOP - 5)}px`)
          setImp(paletteRowRef.current, 'flex-wrap', 'nowrap')
          setImp(paletteRowRef.current, 'justify-content', 'flex-start')
          setImp(paletteRowRef.current, 'margin-left', '5px')
          setImp(paletteRowRef.current, 'transform', 'translateY(-20px)')
          const sep = paletteRowRef.current.querySelector('.sep')
          if (sep) sep.style.setProperty('display', 'none', 'important')
        }
        if (boltRef.current) {
          setImp(boltRef.current, 'background', 'none')
          setImp(boltRef.current, 'color', '#C99B2B')
          setImp(boltRef.current, 'width', `${T.BOLT_SIZE}px`)
          setImp(boltRef.current, 'height', `${T.BOLT_SIZE}px`)
          setImp(boltRef.current, 'inline-size', `${T.BOLT_SIZE}px`)
          setImp(boltRef.current, 'block-size', `${T.BOLT_SIZE}px`)
          setImp(boltRef.current, 'transform', 'translateY(-1px)')
        }
        if (paletteLabelRef.current) {
          setImp(paletteLabelRef.current, 'font-size', `${T.LABEL_FS}px`)
          setImp(paletteLabelRef.current, 'font-weight', `${T.LABEL_FW}`)
          setImp(paletteLabelRef.current, 'color', T.LABEL_COLOR)
        }
        if (paletteMetaRef.current) {
          setImp(paletteMetaRef.current, 'font-size', `${T.META_FS}px`)
          setImp(paletteMetaRef.current, 'font-weight', `${T.META_FW}`)
          setImp(paletteMetaRef.current, 'color', T.META_COLOR)
          setImp(paletteMetaRef.current, 'margin-left', `${T.META_ML}px`)
          if (window.matchMedia('(width:1170px) and (height:788px)').matches && paletteMetaRef.current.textContent?.includes('·')) {
            paletteMetaRef.current.textContent = paletteMetaRef.current.textContent.replace('·','').trim()
          }
        }
        if (brandRef.current) {
          setImp(brandRef.current, 'text-align', T.LOGO_ALIGN)
          setImp(brandRef.current, 'margin-inline', '0')
          setImp(brandRef.current, 'font-size', `${T.LOGO_FS}px`)
          setImp(brandRef.current, 'font-weight', '400')
          setImp(brandRef.current, 'color', 'var(--curated-logo, #9C9C9C)')
          setImp(brandRef.current, 'position', 'absolute')
          setImp(brandRef.current, 'left', '40px')
          setImp(brandRef.current, 'bottom', '45px')
        }

        // ===== Final ordering (override earlier writes) =====
        // 1) Kill grid gaps in content for accurate spacing math
        if (contentRef.current) {
          setImp(contentRef.current, 'row-gap', '0px')
          setImp(contentRef.current, 'gap', '0px')
        }
        // 2) Button: follow the group lift (up 15px)
        if (ctaWrapRef.current) {
          setImp(ctaWrapRef.current, 'transform', 'translateY(-15px)')
          setImp(ctaWrapRef.current, 'margin-top', '10px')
        }
        // 3) Palette row: right 5, follow lift (up 15px), keep room
        if (paletteRowRef.current) {
          setImp(paletteRowRef.current, 'margin-top', '24px')
          setImp(paletteRowRef.current, 'transform', 'translate(5px, -15px)')
          setImp(paletteRowRef.current, 'display', 'flex')
          setImp(paletteRowRef.current, 'align-items', 'center')
          setImp(paletteRowRef.current, 'flex-wrap', 'nowrap')
          setImp(paletteRowRef.current, 'white-space', 'nowrap')
          setImp(paletteRowRef.current, 'margin-left', '0')
          setImp(paletteRowRef.current, 'gap', '9px')
        }
        if (paletteMetaRef.current) {
          setImp(paletteMetaRef.current, 'margin-left', '2px')
        }
      }
    }

    apply()
    const onR = () => apply()
    window.addEventListener('resize', onR)
    return () => window.removeEventListener('resize', onR)
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero"
      data-hero="root"
      data-anim="B"
      data-anim-state="ready"
    >
      {/* Left stack tiles (900–1199) */}
      <figure className="hero__tile hero__tile--a" data-hero="left">
        <picture>
          <source media="(min-width: 600px) and (max-width: 899px)" type="image/webp" srcSet="/marketing/hero/selfie_899.webp" />
          <source media="(min-width: 900px) and (max-width: 1199px)" srcSet="/marketing/hero/selfie_square.webp" />
          <img src="/marketing/hero/selfie_tall_900.webp" alt="" loading="eager" decoding="async" />
        </picture>
      </figure>

      <figure className="hero__tile hero__tile--b" data-hero="right">
        <picture>
          <source media="(min-width: 600px) and (max-width: 899px)" type="image/webp" srcSet="/marketing/hero/closet_899.webp" />
          <source media="(min-width: 900px) and (max-width: 1199px)" srcSet="/marketing/hero/closet_square.webp" />
          <img src="/marketing/hero/closet_tall_900.webp" alt="" loading="eager" decoding="async" />
        </picture>
      </figure>

      {/* Left pillar (≥1200) */}
      <figure className="hero__pillar hero__pillar--left" data-hero="left" aria-hidden="true">
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
          <span ref={eyebrowRef} className="hero__eyebrow eyebrow" data-hero="eyebrow" style={{opacity:0, visibility:'hidden'}}>NEW</span>
          <h1 ref={h1Ref} className="hero__heading h1" style={{opacity:0, visibility:'hidden'}}>Selfies to a Shopping Guide</h1>
        </div>
        <div data-intro-group ref={el => (window.__heroGroup = el)} style={{opacity:0, visibility:'hidden'}}>
          <p
            ref={ledeRef}
            className="lede hero__lede lede"
            data-hero="lede"
          >
            Share a few photos and we’ll curate a seasonal guide based on your appearance and preferences.
          </p>
          <div ref={ctaWrapRef} className="hero__cta-wrap ctaWrap" data-hero="cta-wrap">
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
            className="palette-cta paletteRow"
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
          <div className="brandmark hero__brand logo" data-hero="wordmark" ref={brandRef}>Curated</div>
        </div>
      </div>

      {/* Right pillar (≥1200) */}
      <figure className="hero__pillar hero__pillar--right" data-hero="right" aria-hidden="true">
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

