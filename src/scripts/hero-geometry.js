export function initHeroGeometry() {
  const hero = document.querySelector('[data-hero]')
  if (!hero) return

  const root = document.documentElement
  const cs = (el) => getComputedStyle(el)

  const toNum = (v, fallback) => {
    const n = parseFloat(v)
    return Number.isFinite(n) ? n : fallback
  }

  const readTokens = () => {
    const sRoot = cs(root)
    const sHero = cs(hero)
    const sideMin = toNum(sHero.getPropertyValue('--side-min') || sRoot.getPropertyValue('--side-min') || '200', 200)
    const gutter = toNum(sHero.getPropertyValue('--gutter') || sRoot.getPropertyValue('--gutter') || '32', 32)
    const contentMin = toNum(sHero.getPropertyValue('--content-min') || sRoot.getPropertyValue('--content-min') || '520', 520)
    return { sideMin, gutter, contentMin }
  }

  const getVW = () => {
    const vv = window.visualViewport
    return vv ? Math.round(vv.width) : window.innerWidth
  }

  function apply() {
    const { sideMin, gutter, contentMin } = readTokens()
    const vw = getVW()
    const minNeeded = (2 * sideMin) + (2 * gutter) + contentMin
    if (vw < minNeeded) hero.classList.add('hero--stack')
    else hero.classList.remove('hero--stack')
  }

  const ro = new ResizeObserver(() => apply())
  ro.observe(hero)
  window.addEventListener('resize', apply, { passive: true })
  window.addEventListener('orientationchange', apply, { passive: true })
  requestAnimationFrame(apply)
  window.addEventListener('load', apply, { once: true, passive: true })
}


