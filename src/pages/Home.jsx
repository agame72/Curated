import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import HowItWorks from '../components/HowItWorks'
import WhatWeConsider from '../components/WhatWeConsider'
import ProductPreview from '../components/ProductPreview'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto text-left py-20 px-6">
        <h1 className="text-4xl font-bold mb-4">
          5 selfies. Your perfect wardrobe.
        </h1>
        <p className="text-gray-700 mb-8 max-w-md">
          Upload a few quick photos. We’ll instantly create a personalized, shoppable wardrobe for you—this season and next.
        </p>
        <Button onClick={() => navigate('/upload')}>
          Get Started — It’s Free
        </Button>
      </div>
      <HowItWorks />
      <WhatWeConsider />
      <ProductPreview />
    </div>
  )
}
