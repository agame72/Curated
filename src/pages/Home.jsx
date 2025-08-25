import Hero from '../components/marketing/Hero'
import HowItWorks from '../components/HowItWorks'
import WhatWeConsider from '../components/WhatWeConsider'
import ProductPreview from '../components/ProductPreview'

export default function Home() {
  return (
    <>
      <Hero />
      <div className="container px-8 md:px-12">
        <div className="next-section">
          <HowItWorks />
        </div>
      </div>
      <WhatWeConsider />
      <ProductPreview />
    </>
  )
}
