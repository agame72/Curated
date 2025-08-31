export function initHeroCrossfade() {
  const root = document.documentElement
  const hero = document.querySelector('#hero')
  if (!hero) return

  const content = hero.querySelector('[data-hero="content"]') || hero

  const apply = () => {
    if (window.innerWidth < 1200) {
      root.classList.remove('after-hero')
      hero.style.removeProperty('opacity')
      content.style.removeProperty('transform')
      return
    }
    const r = hero.getBoundingClientRect()
    const vh = window.innerHeight || 1
    // Fade sooner: start at 4% of viewport, fully faded by 24%
    const start = vh * 0.04
    const end = vh * 0.24
    const scrolled = -r.top // positive as we scroll down
    const effective = Math.max(0, scrolled - start)
    const f = Math.min(1, effective / Math.max(1, (end - start)))
    const opacity = 1 - f
    hero.style.setProperty('opacity', String(opacity))
    // Exaggerated lift of center content as it fades (up to -40px)
    const lift = f * 40
    content.style.setProperty('transform', `translateY(${-lift}px)`)
  }

  const onScroll = () => requestAnimationFrame(apply)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  window.addEventListener('orientationchange', onScroll, { passive: true })

  requestAnimationFrame(apply)
  window.addEventListener('load', apply, { once: true, passive: true })
}


