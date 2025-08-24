// F-006: Copy engine for "Why this" rationale
// getRationale(item, user, palette) → { line1, line2 }

function joinVibes(vibes) {
  if (!vibes || vibes.length === 0) return null
  if (vibes.length === 1) return vibes[0]
  return `${vibes[0]} + ${vibes[1]}`
}

function neutralLine(item, user, palette) {
  const neutrals = user?.answers?.neutrals || []
  const name = (item?.title || '').toLowerCase()
  const colorSimple = item?.color_simple || 'neutral'
  const colorName = name.includes('navy') ? 'Navy'
    : name.includes('olive') ? 'Olive'
    : name.includes('camel') ? 'Camel'
    : colorSimple === 'neutral' ? 'This neutral' : 'This accent'

  if (colorSimple === 'neutral') {
    const pairA = neutrals[0] || 'stone'
    const pairB = neutrals[1] || 'cream'
    return `${colorName} sits in your neutral set and pairs with ${pairA.toLowerCase()}/${pairB.toLowerCase()}.`
  }
  // accent
  const friendly = colorName === 'Olive' ? 'a friendly accent—subtle, not loud'
    : 'a friendly accent'
  return `${colorName} is ${friendly}.`
}

function contextLine(item, user) {
  const goal = user?.answers?.goal || 'everyday'
  const vibes = joinVibes(user?.answers?.vibes || [])
  const context = user?.answers?.context || (item?.weight || 'mixed')
  const forDays = context === 'Cooler' ? 'cooler days'
    : context === 'Warmer' ? 'warmer days'
    : 'mixed days'
  const goalPhrase = goal === 'Work-smart casual' ? 'work-smart casual'
    : goal === 'Special event' ? 'special events'
    : goal.toLowerCase()
  if (vibes) {
    return `Matches your ‘${vibes}’ picks and works for ${forDays}.`
  }
  return `Clean lines keep it ${goalPhrase}.`
}

export function getRationale(item, user, palette) {
  return {
    line1: neutralLine(item, user, palette),
    line2: contextLine(item, user),
  }
}


