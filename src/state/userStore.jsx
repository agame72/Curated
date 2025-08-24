// E-002 user store (answers + flags)
import { createContext, useContext, useReducer, useEffect } from 'react'

const initialState = {
  answers: {
    goal: null,
    vibes: [],
    neutrals: [],
    accent: null,
    // E-003 optionals
    categories: [],
    context: null,
    bans: [],
  },
  entitlements: {
    // Plan defaults; update via setEntitlements action when checkout wires in
    maxRecommendations: 50,
    maxAccessories: 0,
  },
  usage: {
    recommendationsUsed: 0,
    accessoriesUsed: 0,
  },
  favorites: {},
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
    case 'toggleFavorite': {
      const fav = { ...state.favorites }
      if (fav[action.id]) delete fav[action.id]
      else fav[action.id] = true
      return { ...state, favorites: fav }
    }
    case 'setFavorites':
      return { ...state, favorites: { ...action.favorites } }
    case 'setEntitlements':
      return { ...state, entitlements: { ...state.entitlements, ...action.entitlements } }
    // E-003 optionals
    case 'toggleCategory': {
      const exists = state.answers.categories.includes(action.category)
      const max = 3
      const next = exists
        ? state.answers.categories.filter(c => c !== action.category)
        : state.answers.categories.length < max
          ? [...state.answers.categories, action.category]
          : state.answers.categories
      return { ...state, answers: { ...state.answers, categories: next } }
    }
    case 'setContext':
      return { ...state, answers: { ...state.answers, context: action.context } }
    case 'toggleBan': {
      const exists = state.answers.bans.includes(action.ban)
      const next = exists
        ? state.answers.bans.filter(b => b !== action.ban)
        : [...state.answers.bans, action.ban]
      return { ...state, answers: { ...state.answers, bans: next } }
    }
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
  const { state, dispatch } = ctx
  const isFavorited = (id) => Boolean(state.favorites[id])
  const toggleFavorite = (id) => dispatch({ type: 'toggleFavorite', id })
  const favoriteIds = () => Object.keys(state.favorites)
  return { state, dispatch, isFavorited, toggleFavorite, favoriteIds }
}


