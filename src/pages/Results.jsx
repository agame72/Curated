import OnboardingWizard from '../components/OnboardingWizard'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useUserStore } from '../state/userStore.jsx'

export default function Results() {
  const { state } = useUserStore()
  const location = useLocation()
  const showWizard = useMemo(() => {
    const search = new URLSearchParams(location.search)
    const welcome = search.get('welcome') === '1'
    return welcome && !state.flags.requiredOnboardingComplete
  }, [location.search, state.flags.requiredOnboardingComplete])

  if (showWizard) {
    return <OnboardingWizard />
  }

  return (
    <div className="flex flex-col items-center justify-center py-24">
      <h2 className="text-2xl font-semibold mb-4">Here’s your Curated Closet</h2>
      {/* TODO: Add style DNA & product grid here */}
    </div>
  )
}
  