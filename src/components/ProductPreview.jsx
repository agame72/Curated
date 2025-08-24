import items from '../data/items.sample.json'

export default function ProductPreview(){
  const sample = items.slice(0,6)
  return (
    <section className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card p-4">
        <h2 className="text-2xl font-serif mb-2">Palette</h2>
        <p className="text-sm text-gray-700 mb-3">A friendly set of swatches tailored to you.</p>
        <div className="flex gap-2">
          {['#F3E7D3','#CDAE7D','#3C5D7C','#0F2A52','#F1C646','#EB6157'].map(hex => (
            <div key={hex} className="swatch" style={{ background:hex }} aria-label={`swatch ${hex}`} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-serif mb-2">Preview</h2>
        <div className="grid grid-cols-3 gap-3">
          {sample.map(s => (
            <article key={s.item_id} className="card overflow-hidden" aria-label={s.title}>
              <div className="bg-gray-100" style={{aspectRatio:'4/5'}}>
                <img src={s.image_url_webp} alt={`${s.title} image`} className="w-full h-full object-cover" />
              </div>
              <div className="p-2 text-xs">
                <div className="font-medium mb-1">{s.title}</div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span aria-hidden>♥</span>
                  <span aria-hidden>↻ 3×</span>
                  <span aria-hidden>?</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


