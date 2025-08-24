import { useUserStore } from '../state/userStore.jsx'
import { track } from '../lib/analytics'
import { useEffect, useId, useRef, useState } from 'react'
import { getRationale } from '../lib/copyRules'
import { colorFamilyFromItem } from '../lib/color'

export default function ItemCard({ item }) {
  const { isFavorited, toggleFavorite, state, dispatch } = useUserStore()
  const fav = isFavorited(item.item_id)
  const label = fav ? 'Remove from Favorites' : 'Add to Favorites'
  const [open, setOpen] = useState(false)
  const [mltOpen, setMltOpen] = useState(false)
  const popId = useId()
  const btnRef = useRef(null)
  const panelRef = useRef(null)
  const mltRef = useRef(null)

  useEffect(() => {
    function onKey(e){ if (e.key === 'Escape') { setOpen(false); setMltOpen(false) } }
    function onClick(e){ if (open && panelRef.current && !panelRef.current.contains(e.target) && !btnRef.current.contains(e.target)) setOpen(false); if (mltOpen && mltRef.current && !mltRef.current.contains(e.target)) setMltOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick) }
  }, [open])
  useEffect(() => { if (open && panelRef.current) panelRef.current.focus() }, [open])
  useEffect(() => { if (mltOpen && mltRef.current) mltRef.current.focus() }, [mltOpen])

  const rationale = getRationale(item, { answers: {} }, null)
  const family = colorFamilyFromItem(item)
  const suggestions = (state.__ranked || []).filter(it => (
    it.item_id !== item.item_id &&
    it.category === item.category &&
    it.color_simple === item.color_simple &&
    (it.vibes || []).some(v => (item.vibes || []).includes(v))
  )).slice(0,6)
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
        <button
          ref={btnRef}
          type="button"
          className="absolute top-2 left-2 btn-primary"
          style={{width:44, height:44, borderRadius:9999, padding:0, background: 'white', color:'#0F2A52', border:'1px solid #E6E3DC'}}
          aria-expanded={open? 'true':'false'}
          aria-controls={popId}
          aria-label="Why this"
          title="Why this"
          onClick={(e) => { e.preventDefault(); setOpen(o => !o); if (!open) track('why_this_opened', { item_id: item.item_id }) }}
        >
          <span aria-hidden>?</span>
        </button>
        <img src={item.image_url_webp} alt={`${item.title} image`} className="w-full h-full object-cover" />
        <div className="absolute left-2 bottom-2 flex gap-2">
          <button
            type="button"
            className="btn-primary"
            style={{height:44, borderRadius:9999, background:'white', color:'#0F2A52', border:'1px solid #E6E3DC'}}
            onClick={(e)=>{e.preventDefault(); setMltOpen(o=>!o); if(!mltOpen) track('more_like_this_clicked', { item_id: item.item_id })}}
          >
            More like this
          </button>
          <button
            type="button"
            className="btn-primary"
            style={{height:44, borderRadius:9999, background:'white', color:'#0F2A52', border:'1px solid #E6E3DC'}}
            onClick={(e)=>{e.preventDefault(); dispatch({ type:'excludeColorFamily', family }); track('color_hidden', { color_family: family })}}
          >
            Hide this color
          </button>
        </div>
        {mltOpen && (
          <div ref={mltRef} tabIndex={-1} className="absolute left-2 right-2 bottom-14 bg-white p-2" style={{border:'1px solid #E6E3DC', borderRadius:12, boxShadow:'0 8px 24px rgba(0,0,0,.18)'}}>
            {suggestions.length === 0 ? (
              <div className="text-sm text-gray-600">No close matches right now.</div>
            ) : (
              <div className="flex gap-2 overflow-x-auto" role="list">
                {suggestions.map(s => (
                  <a key={s.item_id} href="#" role="listitem" className="min-w-[120px]">
                    <img src={s.image_url_webp} alt={`${s.title} image`} className="w-full h-24 object-cover rounded" />
                    <div className="text-xs mt-1">{s.title}</div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
        {open && (
          <div
            id={popId}
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-label="Why this"
            className="absolute z-10 bg-white p-3"
            style={{width:320, borderRadius:12, boxShadow:'0 8px 24px rgba(0,0,0,.18)', border:'1px solid #E6E3DC', top:56, left:8}}
          >
            <p className="text-sm mb-1">{rationale.line1}</p>
            <p className="text-sm text-gray-700">{rationale.line2}</p>
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="text-sm font-medium">{item.title}</div>
        <div className="text-xs text-gray-600 capitalize">{item.category} • {item.color_simple}</div>
      </div>
    </article>
  )
}
