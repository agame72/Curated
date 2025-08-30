export function initHeroCrossfade() {
  const root = document.documentElement
  const hero = document.querySelector('#hero')
  if (!hero) return

  const apply = () => {
    // Disable crossfade for sub‑desktop or if hero has no measurable height
    if (window.innerWidth < 1200) {
      root.classList.remove('after-hero')
      return
    }
    const r = hero.getBoundingClientRect()
    const h = r.height || 0
    if (h <= 1) {
      root.classList.remove('after-hero')
      return
    }
    const midpoint = h * 0.5
    const passed = r.top <= -midpoint
    root.classList.toggle('after-hero', passed)
  }

  // Always start visible
  root.classList.remove('after-hero')

  const onScroll = () => requestAnimationFrame(apply)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  window.addEventListener('orientationchange', onScroll, { passive: true })

  requestAnimationFrame(apply)
  window.addEventListener('load', apply, { once: true, passive: true })
}


