'use client'

import { useLanguage } from './LanguageProvider'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="dark-section py-8 border-t border-dark-border">
      <div className="section-container text-center">
        <p className="text-dark-text-tertiary text-sm">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  )
}
