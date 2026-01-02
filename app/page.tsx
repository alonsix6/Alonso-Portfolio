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
      // Store NFC source
      localStorage.setItem('nfc_source', ref)
      localStorage.setItem('nfc_timestamp', new Date().toISOString())

      // Track analytics event (you can replace with your analytics provider)
      if (typeof window !== 'undefined' && 'gtag' in window) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'nfc_scan', {
          source: ref,
          timestamp: new Date().toISOString(),
        })
      }

      // Log for Vercel Analytics or console
      console.log('[NFC Tracking]', { source: ref, timestamp: new Date().toISOString() })
    }
  }, [])

  const scrollToSection = useCallback((sectionId: string, delay: number = 0) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) {
          const offset = 100
          const top = section.offsetTop - offset
          window.scrollTo({
            top,
            behavior: 'smooth',
          })
        }
        resolve()
      }, delay)
    })
  }, [])

  const handleInitialize = useCallback(async () => {
    // Phase 1: Hero animation
    setHeroTrigger(true)

    // Phase 2: Scroll to About and trigger animation
    await scrollToSection('about', 1500)
    setAboutTrigger(true)

    // Phase 3: Scroll to Work and trigger animation
    await scrollToSection('work', 2500)
    setWorkTrigger(true)

    // Phase 4: Scroll to Contact and trigger animation
    await scrollToSection('contact', 3500)
    setContactTrigger(true)

    // Mark as initialized
    setTimeout(() => {
      setIsInitialized(true)
    }, 4500)
  }, [scrollToSection])

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
