export default function HowItWorks(){
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-serif mb-2">How it works</h2>
      <p className="text-sm text-gray-700 mb-4">Quick, clear, and private.</p>
      <ol className="list-decimal pl-6 space-y-2 text-gray-800">
        <li>Share a selfie (or skip)</li>
        <li>We map your seasonal palette</li>
        <li>Get your Seasonal Guide</li>
      </ol>
      <div className="mt-4">
        <a href="/checkout" className="btn-primary">Choose your Seasonal Guide →</a>
      </div>
    </section>
  )
}


