'use client'

import { useLanguage } from './LanguageProvider'

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="lang-toggle">
      <button
        className={`lang-option ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLang('en')}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-text-tertiary">|</span>
      <button
        className={`lang-option ${lang === 'es' ? 'active' : ''}`}
        onClick={() => setLang('es')}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  )
}
