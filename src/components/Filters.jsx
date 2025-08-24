import { track } from '../lib/analytics'

const CATEGORIES = ['outerwear','mid-layer','top','bottom','shoe','accessory']
const COLORS = ['neutral','accent']

export default function Filters({ value, onChange }) {
  function toggleCategory(cat) {
    const set = new Set(value.categories)
    set.has(cat) ? set.delete(cat) : set.add(cat)
    const next = { ...value, categories: Array.from(set) }
    onChange(next)
    track('filter_applied', { category: Array.from(set).join(',') || undefined, color: next.color || undefined })
  }
  function toggleFavorites() {
    const next = { ...value, favoritesOnly: !value.favoritesOnly }
    onChange(next)
    track('filter_applied', { favorites: next.favoritesOnly || undefined, category: (next.categories && next.categories.join(',')) || undefined, color: next.color || undefined })
  }
  function setColor(col) {
    const next = { ...value, color: value.color === col ? null : col }
    onChange(next)
    track('filter_applied', { category: value.categories[0], color: next.color || undefined })
  }

  return (
    <div className="card p-4 mb-4">
      <div className="mb-3">
        <div className="text-sm text-gray-600 mb-2">Category</div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button key={c} type="button" className="chip" aria-pressed={value.categories.includes(c)?'true':'false'} onClick={() => toggleCategory(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-sm text-gray-600 mb-2">Color</div>
        <div className="flex items-center gap-2">
          {COLORS.map(c => (
            <button key={c} type="button" className="chip" aria-pressed={value.color===c?'true':'false'} onClick={() => setColor(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3">
        <button type="button" className="chip" aria-pressed={value.favoritesOnly?'true':'false'} onClick={toggleFavorites}>
          Favorites
        </button>
      </div>
    </div>
  )
}
