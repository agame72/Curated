export function track(eventName, payload = {}) {
  // MVP stub: console-based analytics queue
  try {
    // eslint-disable-next-line no-console
    console.log('[analytics]', eventName, payload)
  } catch {}
}


