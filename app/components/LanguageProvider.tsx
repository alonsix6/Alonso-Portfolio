'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { translations, type Language } from '@/lib/translations'

interface TranslationsType {
  [key: string]: unknown
}

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
  tArray: (key: string) => string[]
  tRaw: (key: string) => unknown
  translations: TranslationsType
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with English translations for SSR
  const [lang, setLangState] = useState<Language>('en')
  const [currentTranslations, setCurrentTranslations] = useState<TranslationsType>(translations.en)

  useEffect(() => {
    // Check localStorage for saved preference (client-side only)
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'en' || saved === 'es')) {
      setLangState(saved)
      setCurrentTranslations(translations[saved])
    }
  }, [])

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    setCurrentTranslations(translations[newLang])
    localStorage.setItem('language', newLang)
  }

  const getValue = (key: string): unknown => {
    const keys = key.split('.')
    let value: unknown = currentTranslations

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

  // Always render children - never return null (breaks SSR)
  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tArray, tRaw, translations: currentTranslations }}>
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
