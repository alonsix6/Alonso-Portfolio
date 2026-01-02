'use client'

import { Linkedin, ExternalLink, Download, Mail, Phone, MapPin } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import TextScramble from './TextScramble'

interface ContactProps {
  triggerAnimation: boolean
}

export default function Contact({ triggerAnimation }: ContactProps) {
  const { t } = useLanguage()

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Alonso Javier Ternero Fernández-Maldonado
N:Ternero Fernández-Maldonado;Alonso;Javier;;
EMAIL;TYPE=INTERNET,WORK:alonsojaviert@gmail.com
TEL;TYPE=CELL:+51984262985
ADR;TYPE=HOME:;;Jr. Enrique Salazar Barreto 216;Lima;;;Peru
TITLE:Research & Analytics at Reset Comunicaciones
ORG:Reset Comunicaciones (Fahrenheit DDB)
URL:https://pe.linkedin.com/in/alonso-ternero-413722235
URL:https://www.behance.net/alonsoternero
NOTE:Analytics engineer, developer & photographer. Building data-driven systems and capturing visual stories.
END:VCARD`

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'alonso-ternero.vcf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  return (
    <section id="contact" className="dark-section py-24 md:py-32">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <TextScramble
              text={t('contact.title')}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
              as="h2"
              trigger={triggerAnimation}
              delay={0}
              scrambled={true}
            />

            <TextScramble
              text={t('contact.description')}
              className="text-dark-text-secondary leading-relaxed mb-10"
              as="p"
              trigger={triggerAnimation}
              delay={100}
            />

            {/* Social Links */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://pe.linkedin.com/in/alonso-ternero-413722235"
                target="_blank"
                rel="noopener noreferrer"
                className="brutalist-button-outline inline-flex items-center justify-center gap-2"
                style={{
                  opacity: triggerAnimation ? 1 : 0,
                  transform: triggerAnimation ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease 0.2s'
                }}
              >
                <Linkedin size={18} />
                {t('contact.links.linkedin')}
              </a>

              <a
                href="https://www.behance.net/alonsoternero"
                target="_blank"
                rel="noopener noreferrer"
                className="brutalist-button-outline inline-flex items-center justify-center gap-2"
                style={{
                  opacity: triggerAnimation ? 1 : 0,
                  transform: triggerAnimation ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease 0.3s'
                }}
              >
                <ExternalLink size={18} />
                {t('contact.links.behance')}
              </a>

              <button
                onClick={downloadVCard}
                className="brutalist-button inline-flex items-center justify-center gap-2"
                style={{
                  opacity: triggerAnimation ? 1 : 0,
                  transform: triggerAnimation ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.5s ease 0.4s'
                }}
              >
                <Download size={18} />
                {t('contact.links.saveContact')}
              </button>
            </div>
          </div>

          {/* Right Column - Contact Methods */}
          <div className="space-y-8">
            {/* Email */}
            <div
              style={{
                opacity: triggerAnimation ? 1 : 0,
                transform: triggerAnimation ? 'translateX(0)' : 'translateX(20px)',
                transition: 'all 0.5s ease 0.3s'
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Mail size={20} className="text-dark-text-secondary" />
                <span className="text-sm font-bold tracking-[0.2em] text-dark-text-secondary">
                  {t('contact.labels.email')}
                </span>
              </div>
              <a
                href="mailto:alonsojaviert@gmail.com"
                className="text-xl md:text-2xl font-bold hover:underline"
              >
                alonsojaviert@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div
              style={{
                opacity: triggerAnimation ? 1 : 0,
                transform: triggerAnimation ? 'translateX(0)' : 'translateX(20px)',
                transition: 'all 0.5s ease 0.4s'
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <Phone size={20} className="text-dark-text-secondary" />
                <span className="text-sm font-bold tracking-[0.2em] text-dark-text-secondary">
                  {t('contact.labels.phone')}
                </span>
              </div>
              <a
                href="tel:+51984262985"
                className="text-xl md:text-2xl font-bold hover:underline"
              >
                +51 984 262 985
              </a>
            </div>

            {/* Location */}
            <div
              style={{
                opacity: triggerAnimation ? 1 : 0,
                transform: triggerAnimation ? 'translateX(0)' : 'translateX(20px)',
                transition: 'all 0.5s ease 0.5s'
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <MapPin size={20} className="text-dark-text-secondary" />
                <span className="text-sm font-bold tracking-[0.2em] text-dark-text-secondary">
                  {t('contact.labels.location')}
                </span>
              </div>
              <p className="text-xl md:text-2xl font-bold">
                Lima, Peru
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
