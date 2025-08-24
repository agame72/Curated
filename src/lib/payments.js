export async function startCheckout({ plan, email }) {
  const res = await fetch('/.netlify/functions/checkout-create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan, email }),
  })
  if (!res.ok) throw new Error('Failed to start checkout')
  const { url } = await res.json()
  if (!url) throw new Error('No checkout URL')
  window.location = url
}

export async function applyEntitlementsFromStripe(sessionId) {
  const res = await fetch(`/.netlify/functions/checkout-verify?session_id=${encodeURIComponent(sessionId)}`)
  if (!res.ok) return { paid: false }
  const data = await res.json()
  return data
}


