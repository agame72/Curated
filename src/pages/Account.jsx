import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../state/userStore.jsx'
import { GOALS, VIBES, NEUTRALS, ACCENTS, CATEGORIES, CONTEXTS, BANS } from '../state/answersSchema'
import { getPaletteById } from '../data/palettes'
import { track } from '../lib/analytics'

function Chip({ pressed, children, ...props }) {
  return (
    <button type="button" className="chip" aria-pressed={pressed? 'true':'false'} {...props}>{children}</button>
  )
}

export default function Account() {
  const { state, dispatch } = useUserStore()
  const navigate = useNavigate()
  const [draft, setDraft] = useState(state.answers)

  useEffect(() => setDraft(state.answers), [state.answers])

  const palette = useMemo(() => getPaletteById(state.answers?.palette_id || '11'), [state.answers?.palette_id])
  const editsLeft = Math.max(0, 10 - state.editCount)

  function toggleArray(field, value, max) {
    setDraft(d => {
      const cur = new Set(d[field])
      if (cur.has(value)) cur.delete(value)
      else if (!max || cur.size < max) cur.add(value)
      return { ...d, [field]: Array.from(cur) }
    })
  }

  function setSingle(field, value) {
    setDraft(d => ({ ...d, [field]: value }))
  }

  function onSave() {
    dispatch({ type:'setAnswers', answers: draft })
    dispatch({ type:'incrementEditCount' })
    track('answers_updated', { count_used: state.editCount + 1, count_remaining: Math.max(0, 9 - state.editCount) })
    navigate('/app')
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-serif mb-2">Account</h1>
      <p className="text-sm text-gray-600 mb-6">Edits left: {editsLeft}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="card p-4">
          <h2 className="text-xl font-semibold mb-2">Palette</h2>
          <p className="text-sm mb-3">{palette.name}</p>
          <div className="flex gap-2">
            {palette.swatches.map((hex) => (
              <div key={hex} className="swatch" style={{ background:hex }} aria-label={`swatch ${hex}`} />
            ))}
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-xl font-semibold mb-2">Required</h2>
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Goal</div>
            <div className="flex flex-wrap gap-2">
              {GOALS.map(g => (
                <Chip key={g} pressed={draft.goal === g} onClick={() => setSingle('goal', g)}>{g}</Chip>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Vibe (up to 2)</div>
            <div className="flex flex-wrap gap-2">
              {VIBES.map(v => (
                <Chip key={v} pressed={draft.vibes.includes(v)} onClick={() => toggleArray('vibes', v, 2)}>{v}</Chip>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Neutrals (up to 2)</div>
            <div className="flex flex-wrap gap-2">
              {NEUTRALS.map(n => (
                <Chip key={n} pressed={draft.neutrals.includes(n)} onClick={() => toggleArray('neutrals', n, 2)}>{n}</Chip>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">Accent appetite</div>
            <div className="flex flex-wrap gap-2">
              {ACCENTS.map(a => (
                <Chip key={a} pressed={draft.accent === a} onClick={() => setSingle('accent', a)}>{a}</Chip>
              ))}
            </div>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-xl font-semibold mb-2">Optional</h2>
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Category emphasis (up to 3)</div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <Chip key={c} pressed={draft.categories?.includes(c)} onClick={() => toggleArray('categories', c, 3)}>{c}</Chip>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2">Context</div>
            <div className="flex flex-wrap gap-2">
              {CONTEXTS.map(c => (
                <Chip key={c} pressed={draft.context === c} onClick={() => setSingle('context', c)}>{c}</Chip>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-2">No thanks</div>
            <div className="flex flex-wrap gap-2">
              {BANS.map(b => (
                <Chip key={b} pressed={draft.bans?.includes(b)} onClick={() => toggleArray('bans', b)}>{b}</Chip>
              ))}
            </div>
          </div>
        </section>

        <section className="card p-4">
          <h2 className="text-xl font-semibold mb-2">Actions</h2>
          <div className="flex flex-wrap gap-2">
            <button className="btn-primary" onClick={onSave}>Save</button>
            <button className="btn-primary" onClick={() => setDraft(state.answers)}>Cancel</button>
            <button className="btn-primary" aria-label="Delete account…">Delete account…</button>
          </div>
        </section>
      </div>
    </div>
  )
}


