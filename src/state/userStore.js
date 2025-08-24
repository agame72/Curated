import { createContext, useContext, useReducer, useEffect } from 'react'

const initialState = {
  answers: {
    goal: null,
    vibes: [],
    neutrals: [],
    accent: null,
  },
  flags: {
    requiredOnboardingComplete: false,
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'setGoal':
      return { ...state, answers: { ...state.answers, goal: action.goal } }
    case 'toggleVibe': {
      const exists = state.answers.vibes.includes(action.vibe)
      const next = exists
        ? state.answers.vibes.filter(v => v !== action.vibe)
        : state.answers.vibes.length < 2
          ? [...state.answers.vibes, action.vibe]
          : state.answers.vibes
      return { ...state, answers: { ...state.answers, vibes: next } }
    }
    case 'toggleNeutral': {
      const exists = state.answers.neutrals.includes(action.neutral)
      const next = exists
        ? state.answers.neutrals.filter(n => n !== action.neutral)
        : state.answers.neutrals.length < 2
          ? [...state.answers.neutrals, action.neutral]
          : state.answers.neutrals
      return { ...state, answers: { ...state.answers, neutrals: next } }
    }
    case 'setAccent':
      return { ...state, answers: { ...state.answers, accent: action.accent } }
    case 'markRequiredComplete':
      return { ...state, flags: { ...state.flags, requiredOnboardingComplete: true } }
    case 'hydrate':
      return action.state
    default:
      return state
  }
}

const StoreContext = createContext()

export function UserStoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem('curated_user_state')
      return saved ? JSON.parse(saved) : init
    } catch {
      return init
    }
  })

  useEffect(() => {
    localStorage.setItem('curated_user_state', JSON.stringify(state))
  }, [state])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useUserStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useUserStore must be used within UserStoreProvider')
  return ctx
}


