import { useEffect, useRef } from 'react'

export default function Modal({ open, onClose, labelledBy, describedBy, children }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(e){ if (e.key === 'Escape') onClose?.() }
    function onClick(e){ if (ref.current && e.target === ref.current) onClose?.() }
    document.addEventListener('keydown', onKey)
    ref.current?.addEventListener('mousedown', onClick)
    return () => { document.body.style.overflow = prevOverflow; document.removeEventListener('keydown', onKey); ref.current?.removeEventListener('mousedown', onClick) }
  }, [open, onClose])
  if (!open) return null
  return (
    <div ref={ref} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" aria-hidden={open? 'false':'true'}>
      <div role="dialog" aria-modal="true" aria-labelledby={labelledBy} aria-describedby={describedBy} tabIndex={-1} className="bg-white p-4" style={{borderRadius:12, maxWidth:560, width:'90%', maxHeight:'80vh', overflow:'auto', boxShadow:'0 12px 32px rgba(0,0,0,.2)'}}>
        {children}
      </div>
    </div>
  )
}


