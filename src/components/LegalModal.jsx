import { useEffect, useRef, useState } from 'react'
import Modal from './Modal'
import { track } from '../lib/analytics'

export default function LegalModal() {
  const [doc, setDoc] = useState(null) // 'terms' | 'privacy' | null
  const openedViaClickRef = useRef(false)

  useEffect(() => {
    function updateFromHash() {
      const h = window.location.hash
      if (h === '#terms') { setDoc('terms'); track('legal_opened', { doc:'terms' }) }
      else if (h === '#privacy') { setDoc('privacy'); track('legal_opened', { doc:'privacy' }) }
      else setDoc(null)
    }
    updateFromHash()
    window.addEventListener('hashchange', updateFromHash)
    return () => window.removeEventListener('hashchange', updateFromHash)
  }, [])

  function onClose() {
    if (openedViaClickRef.current) window.history.back()
    else window.location.hash = ''
  }

  useEffect(() => {
    function markClick(e) {
      const t = e.target
      if (t && t.getAttribute && (t.getAttribute('href') === '#terms' || t.getAttribute('href') === '#privacy')) {
        openedViaClickRef.current = true
        setTimeout(() => { openedViaClickRef.current = false }, 1000)
      }
    }
    document.addEventListener('click', markClick)
    return () => document.removeEventListener('click', markClick)
  }, [])

  const open = Boolean(doc)
  const title = doc === 'terms' ? 'Terms' : doc === 'privacy' ? 'Privacy' : ''
  return (
    <Modal open={open} onClose={onClose} labelledBy="legal-title">
      <h2 id="legal-title" className="text-xl font-semibold mb-2">{title}</h2>
      <div className="text-sm text-gray-700 space-y-3">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed dignissim sem vel ipsum fermentum, at bibendum massa tristique.</p>
        <p>Curabitur at sem lacinia, bibendum mi at, porttitor dui. Proin id urna vitae arcu porttitor scelerisque. Donec et augue non odio aliquet gravida.</p>
        <p>Aliquam erat volutpat. Integer iaculis, quam a malesuada bibendum, nunc mi imperdiet velit, a ultrices arcu ex id nibh.</p>
      </div>
    </Modal>
  )
}


