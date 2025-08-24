import { useUserStore } from '../state/userStore.jsx'
import { track } from '../lib/analytics'

export default function ItemCard({ item }) {
  const { isFavorited, toggleFavorite } = useUserStore()
  const fav = isFavorited(item.item_id)
  const label = fav ? 'Remove from Favorites' : 'Add to Favorites'
  return (
    <article className="card overflow-hidden" aria-label={item.title}>
      <div className="bg-gray-100 relative" style={{aspectRatio:'4/5'}}>
        <button
          type="button"
          className="absolute top-2 right-2 btn-primary"
          style={{width:44, height:44, borderRadius:9999, padding:0, background: 'white', color: fav ? 'crimson' : '#0F2A52', border:'1px solid #E6E3DC'}}
          aria-pressed={fav? 'true':'false'}
          aria-label={label}
          title={label}
          onClick={(e) => { e.preventDefault(); toggleFavorite(item.item_id); track(fav ? 'item_unfavorited' : 'item_favorited', { item_id: item.item_id }) }}
        >
          <span aria-hidden>♥</span>
        </button>
        <img src={item.image_url_webp} alt={`${item.title} image`} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <div className="text-sm font-medium">{item.title}</div>
        <div className="text-xs text-gray-600 capitalize">{item.category} • {item.color_simple}</div>
      </div>
    </article>
  )
}
