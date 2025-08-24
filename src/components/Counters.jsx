import { useUserStore } from '../state/userStore.jsx'

export default function Counters() {
  const { state } = useUserStore()
  const total = state.entitlements.maxRecommendations
  const used = state.usage.recommendationsUsed
  const remaining = Math.max(0, total - used)
  const accTotal = state.entitlements.maxAccessories
  const accUsed = state.usage.accessoriesUsed
  const accRemaining = Math.max(0, accTotal - accUsed)

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Guide counters">
      <Pill label="Picks" remaining={remaining} total={total} />
      {accTotal > 0 && <Pill label="Accessories" remaining={accRemaining} total={accTotal} />}
    </div>
  )
}

function Pill({ label, remaining, total }) {
  return (
    <div
      className="px-3 py-2 border rounded-full"
      style={{ borderColor:'var(--brand-navy)', color:'var(--brand-navy)', background:'var(--bg-cream)' }}
      tabIndex={0}
      aria-label={`${label} remaining ${remaining} of ${total}`}
    >
      <span className="text-sm font-medium">{label}: {remaining}/{total}</span>
    </div>
  )
}
