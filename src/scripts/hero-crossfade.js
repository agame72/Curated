export function initHeroCrossfade() {
  const root = document.documentElement
  const hero = document.querySelector('[data-hero]')
  if (!hero) return

  const apply = () => {
    const r = hero.getBoundingClientRect()
    const midpoint = r.height * 0.5
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


