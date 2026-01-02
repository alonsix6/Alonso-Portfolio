'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'en' | 'es'

interface Translations {
  [key: string]: unknown
}

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
  tArray: (key: string) => string[]
  tRaw: (key: string) => unknown
  translations: Translations
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')
  const [translations, setTranslations] = useState<Translations>({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'en' || saved === 'es')) {
      setLangState(saved)
    }
    loadTranslations(saved || 'en')
  }, [])

  const loadTranslations = async (language: Language) => {
    try {
      const response = await fetch(`/locales/${language}.json`)
      const data = await response.json()
      setTranslations(data)
      setIsLoaded(true)
    } catch (error) {
      console.error('Failed to load translations:', error)
    }
  }

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem('language', newLang)
    loadTranslations(newLang)
  }

  const getValue = (key: string): unknown => {
    const keys = key.split('.')
    let value: unknown = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key // Return key if translation not found
      }
    }

    return value
  }

  const t = (key: string): string => {
    const value = getValue(key)
    return typeof value === 'string' ? value : key
  }

  const tArray = (key: string): string[] => {
    const value = getValue(key)
    return Array.isArray(value) ? value : []
  }

  const tRaw = (key: string): unknown => {
    return getValue(key)
  }

  if (!isLoaded) {
    return null // Or a loading state
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tArray, tRaw, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
