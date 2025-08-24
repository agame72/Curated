export default function WhatWeConsider(){
  const items = [
    ['Body shape & proportions','Cuts and lengths that flatter how you’re built.'],
    ['Skin tone','Palettes that complement your natural coloring.'],
    ['Hair color','Warm/cool and depth guide your hardest-working neutrals.'],
    ['Eye color','Subtle cues for accents and contrast.'],
    ['Gender identity & expression','Your lane, your look.'],
    ['Occupation & lifestyle','Work, weekends, travel—what you actually do.'],
    ['Seasonal focus','Cooler/warmer needs guide fabrics and layers.'],
    ['Neutrals you live in','Black, navy, stone, cream, brown—your base set.'],
    ['Color appetite','Keep it neutral, small accents, or color-curious.'],
  ]
  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-serif mb-4">What we consider</h2>
      <ul className="space-y-2">
        {items.map(([title,sub]) => (
          <li key={title} className="card p-3">
            <div className="font-medium">{title}</div>
            <div className="text-sm text-gray-700">{sub}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}


