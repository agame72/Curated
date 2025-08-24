// Simple color family mapper based on title keywords
export function colorFamilyFromItem(item) {
  const t = (item.title || '').toLowerCase()
  if (t.includes('navy') || t.includes('indigo')) return 'navy'
  if (t.includes('olive') || t.includes('sage')) return 'olive'
  if (t.includes('camel') || t.includes('tan')) return 'camel'
  if (t.includes('black') || t.includes('charcoal')) return 'black'
  if (t.includes('cream') || t.includes('stone') || t.includes('ivory')) return 'cream'
  return item.color_simple === 'neutral' ? 'neutral' : 'accent'
}


