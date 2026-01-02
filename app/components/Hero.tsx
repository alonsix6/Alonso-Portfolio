'use client'

import { useState } from 'react'
import { useLanguage } from './LanguageProvider'
import TextScramble from './TextScramble'

interface HeroProps {
  onInitialize: () => void
  isInitialized: boolean
  triggerAnimation: boolean
}

export default function Hero({ onInitialize, isInitialized, triggerAnimation }: HeroProps) {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = () => {
    if (isInitialized || isLoading) return
    setIsLoading(true)
    onInitialize()
  }

  const scrollToContact = () => {
    const contact = document.getElementById('contact')
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center section-container py-20">
      <div className="max-w-4xl">
        {/* Eyebrow */}
        <div className="mb-6">
          <TextScramble
            text={t('hero.eyebrow') as string}
            className="text-sm md:text-base font-bold tracking-[0.3em] text-text-secondary"
            trigger={triggerAnimation}
            delay={0}
          />
        </div>

        {/* Name */}
        <h1 className="mb-6">
          <TextScramble
            text={t('hero.name') as string}
            className="block"
            trigger={triggerAnimation}
            delay={100}
          />{' '}
          <TextScramble
            text={t('hero.surname') as string}
            className="highlight-bg"
            trigger={triggerAnimation}
            delay={200}
          />
        </h1>

        {/* Tagline */}
        <div className="mb-12">
          <TextScramble
            text={t('hero.tagline') as string}
            className="text-lg md:text-xl lg:text-2xl text-text-secondary max-w-2xl leading-relaxed"
            as="p"
            trigger={triggerAnimation}
            delay={300}
          />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          {!isInitialized ? (
            <button
              onClick={handleClick}
              disabled={isLoading}
              className={`brutalist-button glow-button ${isLoading ? 'opacity-70' : ''}`}
            >
              {isLoading ? t('hero.ctaLoading') : t('hero.cta')}
            </button>
          ) : (
            <button
              onClick={scrollToContact}
              className="brutalist-button fade-in-up"
            >
              {t('hero.ctaSecondary')}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
