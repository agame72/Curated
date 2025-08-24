export default function ItemCard({ item }) {
  return (
    <article className="card overflow-hidden" aria-label={item.title}>
      <div className="bg-gray-100" style={{aspectRatio:'4/5'}}>
        <img src={item.image_url_webp} alt={`${item.title} image`} className="w-full h-full object-cover" />
      </div>
      <div className="p-3">
        <div className="text-sm font-medium">{item.title}</div>
        <div className="text-xs text-gray-600 capitalize">{item.category} • {item.color_simple}</div>
      </div>
    </article>
  )
}
