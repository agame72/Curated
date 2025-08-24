// E-002 Required questions wizard
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../state/userStore.jsx'
import { track } from '../lib/analytics'
import { GOALS, VIBES, NEUTRALS, ACCENTS, isStepValid } from '../state/answersSchema'

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
  const total = 4

  useEffect(() => {
    const map = {1:'goal',2:'vibe',3:'neutrals',4:'accent'}
    track('onboarding_step_view', { step: map[step] })
  }, [step])

  const canContinue = useMemo(() => isStepValid(step, state.answers), [step, state.answers])

  function next() {
    if (step < total) setStep(step + 1)
    else finish()
  }

  function back() {
    if (step > 1) setStep(step - 1)
  }

  function finish() {
    dispatch({ type: 'markRequiredComplete' })
    track('onboarding_completed', { answers_count: 4 })
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
        </section>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button type="button" className="btn-primary" onClick={back} aria-disabled={step===1? 'true':'false'} disabled={step===1}>Back</button>
        <div className="flex items-center gap-3">
          {step === total && (
            <button type="button" className="btn-primary" onClick={finish}>Skip optionals</button>
          )}
          <button type="button" className="btn-primary" onClick={next} aria-disabled={canContinue? 'false':'true'} disabled={!canContinue}>Continue</button>
        </div>
      </div>
    </div>
  )
}


