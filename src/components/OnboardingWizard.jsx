// E-002 Required questions wizard
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../state/userStore.jsx'
import { track } from '../lib/analytics'
import { GOALS, VIBES, NEUTRALS, ACCENTS, CATEGORIES, CONTEXTS, BANS, isStepValid, answersSchema } from '../state/answersSchema'

function Chip({ pressed, children, ...props }) {
  return (
    <button
      type="button"
      className="chip"
      aria-pressed={pressed ? 'true' : 'false'}
      {...props}
    >
      {children}
    </button>
  )
}

function ProgressDots({ step, total }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Step ${step} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`progress-dot ${i + 1 === step ? 'active' : ''}`} />
      ))}
    </div>
  )
}

// Options imported from answers schema

export default function OnboardingWizard() {
  const { state, dispatch } = useUserStore()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const total = 5

  useEffect(() => {
    const map = {1:'goal',2:'vibe',3:'neutrals',4:'accent'}
    track('onboarding_step_view', { step: map[step] })
  }, [step])

  const canContinue = useMemo(() => isStepValid(step, state.answers), [step, state.answers])

  function next() {
    if (step < total) setStep(step + 1)
    else finishOptionals('completed')
  }

  function back() {
    if (step > 1) setStep(step - 1)
  }

  function finishRequired() {
    dispatch({ type: 'markRequiredComplete' })
    track('onboarding_completed', { answers_count: 4 })
    // stay to optionals (step 5)
    setStep(5)
  }

  function finishOptionals(mode) {
    if (mode === 'skipped') {
      track('onboarding_optionals_skipped', {})
    } else {
      track('onboarding_optionals_completed', {
        selected_counts: {
          categories: state.answers.categories.length,
          bans: state.answers.bans.length,
        },
      })
    }
    navigate('/app')
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-6 card" role="dialog" aria-labelledby="wiz-title" aria-live="polite">
      <div className="flex items-center justify-between mb-6">
        <h1 id="wiz-title" className="text-3xl font-serif">Let’s tune your guide</h1>
        <ProgressDots step={step} total={total} />
      </div>

      {step === 1 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Primary goal</h2>
          <p className="text-sm text-gray-600 mb-4">Pick one</p>
          <div className="flex flex-wrap gap-2">
            {GOALS.map(g => (
              <Chip key={g} pressed={state.answers.goal === g} onClick={() => dispatch({ type: 'setGoal', goal: g })}>{g}</Chip>
            ))}
          </div>
        </section>
      )}

      {step === 2 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Vibe</h2>
          <p className="text-sm text-gray-600 mb-4">Pick up to two ({state.answers.vibes.length}/2)</p>
          <div className="flex flex-wrap gap-2">
            {VIBES.map(v => (
              <Chip key={v} pressed={state.answers.vibes.includes(v)} onClick={() => dispatch({ type: 'toggleVibe', vibe: v })}>{v}</Chip>
            ))}
          </div>
        </section>
      )}

      {step === 3 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Neutrals</h2>
          <p className="text-sm text-gray-600 mb-4">Pick up to two ({state.answers.neutrals.length}/2)</p>
          <div className="flex flex-wrap gap-2">
            {NEUTRALS.map(n => (
              <Chip key={n} pressed={state.answers.neutrals.includes(n)} onClick={() => dispatch({ type: 'toggleNeutral', neutral: n })}>{n}</Chip>
            ))}
          </div>
        </section>
      )}

      {step === 4 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Accent appetite</h2>
          <p className="text-sm text-gray-600 mb-4">Pick one</p>
          <div className="flex flex-wrap gap-2">
            {ACCENTS.map(a => (
              <Chip key={a} pressed={state.answers.accent === a} onClick={() => dispatch({ type: 'setAccent', accent: a })}>{a}</Chip>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-end">
            <button type="button" className="btn-primary" onClick={finishRequired}>Continue</button>
          </div>
        </section>
      )}

      {step === 5 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Tune details</h2>
          <p className="text-sm text-gray-600 mb-4">Optional</p>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Category emphasis</h3>
              <p className="text-sm text-gray-600 mb-3">Pick up to three ({state.answers.categories.length}/{answersSchema.categoriesMax})</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(c => (
                  <Chip key={c} pressed={state.answers.categories.includes(c)} onClick={() => dispatch({ type: 'toggleCategory', category: c })}>{c}</Chip>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Context</h3>
              <p className="text-sm text-gray-600 mb-3">Pick one</p>
              <div className="flex flex-wrap gap-2">
                {CONTEXTS.map(c => (
                  <Chip key={c} pressed={state.answers.context === c} onClick={() => dispatch({ type: 'setContext', context: c })}>{c}</Chip>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">No thanks list</h3>
              <div className="flex flex-wrap gap-2">
                {BANS.map(b => (
                  <Chip key={b} pressed={state.answers.bans.includes(b)} onClick={() => dispatch({ type: 'toggleBan', ban: b })}>{b}</Chip>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button type="button" className="btn-primary" onClick={() => setStep(4)}>Back</button>
            <div className="flex items-center gap-3">
              <button type="button" className="btn-primary" onClick={() => finishOptionals('skipped')}>Skip for now</button>
              <button type="button" className="btn-primary" onClick={() => finishOptionals('completed')}>Finish</button>
            </div>
          </div>
        </section>
      )}

      {step < 4 && (
        <div className="mt-8 flex items-center justify-between">
          <button type="button" className="btn-primary" onClick={back} aria-disabled={step===1? 'true':'false'} disabled={step===1}>Back</button>
          <div className="flex items-center gap-3">
            <button type="button" className="btn-primary" onClick={next} aria-disabled={canContinue? 'false':'true'} disabled={!canContinue}>Continue</button>
          </div>
        </div>
      )}
    </div>
  )
}


