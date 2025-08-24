import { useEffect, useRef } from 'react'
import ItemCard from './ItemCard'

export default function Grid({ items, onLoadMore }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) onLoadMore && onLoadMore()
      })
    }, { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [onLoadMore])

  if (!items.length) {
    return <div className="text-center text-gray-600 py-20">No results. Try adjusting filters.</div>
  }

  return (
    <div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {items.map(it => (
          <ItemCard key={it.item_id} item={it} />
        ))}
      </div>
      <div ref={ref} className="h-2" />
    </div>
  )
}
