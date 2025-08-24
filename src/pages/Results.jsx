import OnboardingWizard from '../components/OnboardingWizard'
import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useUserStore } from '../state/userStore.jsx'
import Filters from '../components/Filters'
import Grid from '../components/Grid'
import { rankItems } from '../lib/ranker'
import { colorFamilyFromItem } from '../lib/color'
import Counters from '../components/Counters'
import itemsData from '../data/items.sample.json'

export default function Results() {
  const { state } = useUserStore()
  const location = useLocation()
  const showWizard = useMemo(() => {
    const search = new URLSearchParams(location.search)
    const welcome = search.get('welcome') === '1'
    return welcome && !state.flags.requiredOnboardingComplete
  }, [location.search, state.flags.requiredOnboardingComplete])

  if (showWizard) {
    return <OnboardingWizard />
  }

  // Grid + filters
  const [filters, setFilters] = useState({ categories: [], color: null, favoritesOnly: false })
  const [visibleCount, setVisibleCount] = useState(20)

  const ranked = useMemo(() => rankItems(itemsData, { answers: state.answers, favorites: state.favorites }), [state.answers, state.favorites])
  // expose ranked to cards for local suggestion strips
  useEffect(() => { state.__ranked = ranked }, [ranked])
  const filtered = useMemo(() => {
    let arr = ranked
    if (filters.favoritesOnly) {
      arr = arr.filter(it => state.favorites[it.item_id])
    }
    // session color exclusions
    const excluded = state.session?.exclusions?.colors || {}
    if (excluded && Object.keys(excluded).length) {
      arr = arr.filter(it => !excluded[colorFamilyFromItem(it)])
    }
    return arr.filter(it => {
      const byCat = filters.categories.length ? filters.categories.includes(it.category) : true
      const byColor = filters.color ? it.color_simple === filters.color : true
      return byCat && byColor
    })
  }, [ranked, filters])

  const toShow = filtered.slice(0, visibleCount)

  function loadMore() {
    setVisibleCount(c => Math.min(c + 20, filtered.length))
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('app_view', { items_shown: toShow.length })
  }, [])

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Here’s your Curated Closet</h2>
        <div className="flex items-center gap-3">
          <Counters />
          <div className="text-sm text-gray-600">{toShow.length}/{filtered.length || ranked.length}</div>
        </div>
      </div>
      <Filters value={filters} onChange={setFilters} />
      {filters.favoritesOnly && filtered.length === 0 ? (
        <div className="text-center text-gray-600 py-20">
          No favorites yet. <button className="btn-primary ml-2" onClick={() => setFilters(f => ({ ...f, favoritesOnly:false }))}>Show all</button>
        </div>
      ) : (
        <Grid items={toShow} onLoadMore={loadMore} />
      )}
    </div>
  )
}
  