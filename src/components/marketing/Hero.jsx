import React from 'react'
import '../../styles/landing.css'

export default function Hero() {
  return (
    <section className="hero" aria-label="Selfies to a Shopping List">
      <div className="hero-grid">
        <div className="hero-pane" data-pane="left">
          <img
            src="/marketing/hero/hero-portrait.webp"
            alt="Portrait in neutral blazer—clean, natural light."
            loading="eager"
            width="1200"
            height="1600"
          />
        </div>

        <div className="hero-center">
          <span className="label-new">NEW</span>
          <h1 className="hero-title canela">
            Selfies to a<br/>Shopping List
          </h1>
          <p className="hero-sub">
            Share a few photos and we’ll curate a shopping guide for your style.
          </p>
          <a className="btn-cta" href="/checkout?plan=style_guide">
            Get Seasonal Guide
          </a>
          <p className="hero-kicker">
            <img className="bolt" src="/icons/bolt.svg" alt="" width="18" height="18" aria-hidden="true" />
            Check your Palette <span className="muted">30 sec</span>
          </p>
        </div>

        <div className="hero-pane" data-pane="right">
          <img
            src="/marketing/hero/hero-closet.webp"
            alt="Neat rail of camel, cream, and navy pieces."
            loading="eager"
            width="1200"
            height="1600"
          />
        </div>
      </div>

      <div className="hero-brand">Curated</div>
    </section>
  )
}


