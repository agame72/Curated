import React, { useEffect, useRef } from 'react'
import '../../styles/landing.css'
import { initHeroCrossfade } from '../../scripts/hero-crossfade'

export default function Hero() {
  const heroRef = useRef(null)

  // Robust 50% cross-fade using scroll-based check
  useEffect(() => {
    initHeroCrossfade()
  }, [])

  // Layout is CSS-driven across breakpoints; no JS geometry required

  return (
    <section
      ref={heroRef}
      className="hero fullbleed"
      data-hero
      style={{ '--left-ar': 0.75, '--right-ar': 0.75 }}
    >
      {/* Left media panel */}
      <figure className="hero__media hero__media--left">
        <img src="/marketing/hero/selfie_tall_900.webp" alt="" loading="eager" width="900" height="1350" />
      </figure>

      {/* Right media panel */}
      <figure className="hero__media hero__media--right">
        <img src="/marketing/hero/closet_tall_900.webp" alt="" loading="eager" width="900" height="1350" />
      </figure>

      {/* Center content (safe area) */}
      <div className="hero__content">
        <p className="eyebrow">NEW</p>
        <h1>Selfies to a Shopping List</h1>
        <p className="lede">Share a few photos and we’ll curate a shopping guide for your style.</p>
        <a className="btn btn--primary" href="/seasonal">Get Seasonal Guide</a>
        {/* Custom bolt icon (gold asset, immune to tinting) */}
        <button className="palette-cta" type="button">
          <span className="icon-bolt" aria-hidden="true">
            <img src="/icons/bolt.svg" width="16" height="16" alt="" />
          </span>
          <span className="txt">Check your Palette</span>
          <span className="muted">&nbsp;30 sec</span>
        </button>
        <div className="brandmark">Curated</div>
      </div>

      {/* 50% sentinel for cross-fade */}
      <div className="hero__sentinel" aria-hidden="true" />
    </section>
  )
}

