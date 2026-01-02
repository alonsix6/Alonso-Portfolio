'use client'

import { useState, useEffect, useCallback } from 'react'
import { LanguageProvider } from './components/LanguageProvider'
import LanguageToggle from './components/LanguageToggle'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'

function Portfolio() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [heroTrigger, setHeroTrigger] = useState(false)
  const [aboutTrigger, setAboutTrigger] = useState(false)
  const [workTrigger, setWorkTrigger] = useState(false)
  const [contactTrigger, setContactTrigger] = useState(false)

  // Track NFC source on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')

    if (ref) {
      localStorage.setItem('nfc_source', ref)
      localStorage.setItem('nfc_timestamp', new Date().toISOString())
      console.log('[NFC Tracking]', { source: ref, timestamp: new Date().toISOString() })
    }
  }, [])

  const handleInitialize = useCallback(() => {
    // Trigger hero animation immediately
    setHeroTrigger(true)

    // After hero animates, scroll smoothly to About
    setTimeout(() => {
      const about = document.getElementById('about')
      if (about) {
        about.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }

      // Trigger About animation
      setAboutTrigger(true)

      // Trigger remaining sections (no scroll, just reveal)
      setTimeout(() => {
        setWorkTrigger(true)
        setContactTrigger(true)
        setIsInitialized(true)
      }, 800)
    }, 1200)
  }, [])

  return (
    <main>
      <LanguageToggle />
      <Hero
        onInitialize={handleInitialize}
        isInitialized={isInitialized}
        triggerAnimation={heroTrigger}
      />
      <About triggerAnimation={aboutTrigger} />
      <Work triggerAnimation={workTrigger} />
      <Contact triggerAnimation={contactTrigger} />
      <Footer />
    </main>
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <Portfolio />
    </LanguageProvider>
  )
}
