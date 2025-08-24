// Seeded deterministic ranking engine (F-002)

function mulberry32(seed) {
  let t = seed >>> 0
  return function() {
    t += 0x6D2B79F5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

function hashString(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)
  }
  return h >>> 0
}

export function rankItems(items, user, opts = {}) {
  const seedBase = JSON.stringify(user.answers || {})
  const rand = mulberry32(hashString(seedBase))
  const w = { palette: 0.35, vibe: 0.25, color: 0.15, goal: 0.15, context: 0.1 }
  const bans = new Set((user.answers?.bans) || [])

  function penalty(item) {
    if (bans.has('Leather looks') && /leather/i.test(item.title)) return -0.25
    if (bans.has('Heels') && /heel/i.test(item.title)) return -0.25
    if (bans.has('Logos') && /logo/i.test(item.title)) return -0.2
    if (bans.has('Distressed denim') && /distress|rip/i.test(item.title)) return -0.2
    return 0
  }

  const userVibes = new Set(user.answers?.vibes || [])
  const neutrals = new Set(user.answers?.neutrals || [])
  const appetite = user.answers?.accent || 'Keep it neutral'
  const neutralTarget = appetite === 'Keep it neutral' ? 0.85 : appetite === 'Small accents okay' ? 0.75 : 0.65

  const scored = items.map((it, idx) => {
    const paletteMatch = (user.answers?.palette_id && it.palette_tags?.includes(user.answers.palette_id)) ? 1 : 0.5
    const vibeOverlap = (it.vibes || []).reduce((acc, v) => acc + (userVibes.has(v) ? 1 : 0), 0) / Math.max(1, (it.vibes || []).length)
    const colorPolicy = it.color_simple === 'neutral' ? neutralTarget : 1 - neutralTarget
    const goalBonus = 0 // placeholder for quotas; applied later
    const contextAdj = (user.answers?.context === 'Cooler' && it.weight === 'cooler') || (user.answers?.context === 'Warmer' && it.weight === 'warmer') ? 1 : 0.5
    const base = w.palette*paletteMatch + w.vibe*vibeOverlap + w.color*colorPolicy + w.goal*goalBonus + w.context*contextAdj
    const jitter = (rand() - 0.5) * 0.02
    return { item: it, score: base + penalty(it) + jitter, idx }
  })

  // Simple category quotas scaling for 50-plan (approx)
  const quota100 = { top:25, 'mid-layer':18, bottom:15, outerwear:12, dresses:10, shoe:15, accessory:5 }
  const plan = 50 // MVP fixed
  const scale = plan / 100
  const remaining = Object.fromEntries(Object.entries(quota100).map(([k,v]) => [k, Math.max(1, Math.round(v*scale))]))

  const byScore = scored.sort((a,b) => b.score - a.score)
  const result = []
  const excludeRing = []
  for (const s of byScore) {
    const cat = s.item.category
    if (remaining[cat] !== undefined && remaining[cat] <= 0) continue
    // diversity guardrail: avoid >2 near-dupes in a row (title contains same noun)
    const key = (s.item.title || '').split(' ').slice(-1)[0].toLowerCase()
    const recentSimilar = excludeRing.filter(k => k === key).length
    if (recentSimilar >= 2) continue
    result.push(s.item)
    if (remaining[cat] !== undefined) remaining[cat] -= 1
    excludeRing.push(key)
    if (excludeRing.length > 5) excludeRing.shift()
    if (result.length >= (opts.limit || 50)) break
  }

  return result
}


