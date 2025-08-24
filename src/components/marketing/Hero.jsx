import React from 'react'
import '../../styles/landing.css'

export default function Hero() {
  return (
    <section className="hero" aria-label="Selfies to a Shopping List">
      <div className="hero-grid">
        <div className="hero-pane" data-pane="left">
          <img
            src="/marketing/hero/hero-portrait_taller.webp"
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
          <a
            className="hero-cta"
            data-cta="hero"
            href="/checkout?plan=starter"
          >
            Get Seasonal Guide
          </a>
          <p className="hero-kicker">
            <img src="/icons/bolt.svg" alt="" className="bolt" />
            Check your Palette <span className="muted">30 sec</span>
          </p>
        </div>

        <div className="hero-pane" data-pane="right">
          <img
            src="/marketing/hero/hero-closet_taller.webp"
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


