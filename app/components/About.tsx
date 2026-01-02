'use client'

import { useLanguage } from './LanguageProvider'
import TextScramble from './TextScramble'

interface AboutProps {
  triggerAnimation: boolean
}

interface Skill {
  title: string
  description: string
}

export default function About({ triggerAnimation }: AboutProps) {
  const { t } = useLanguage()
  const paragraphs = t('about.paragraphs') as string[]
  const skills = t('about.skills') as Skill[]

  return (
    <section id="about" className="py-24 md:py-32 section-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left Column - About Text */}
        <div>
          <div className="mb-4">
            <TextScramble
              text={t('about.label') as string}
              className="text-sm font-bold tracking-[0.3em] text-text-tertiary"
              trigger={triggerAnimation}
              delay={0}
            />
          </div>

          <div className="mb-8">
            <TextScramble
              text={t('about.title') as string}
              className="text-3xl md:text-4xl lg:text-5xl font-bold"
              as="h2"
              trigger={triggerAnimation}
              delay={100}
            />
          </div>

          <div className="space-y-6">
            {paragraphs && paragraphs.map((paragraph, index) => (
              <TextScramble
                key={index}
                text={paragraph}
                className="text-text-secondary leading-relaxed"
                as="p"
                trigger={triggerAnimation}
                delay={200 + index * 150}
              />
            ))}
          </div>
        </div>

        {/* Right Column - Skills */}
        <div className="space-y-8">
          {skills && skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card"
              style={{
                opacity: triggerAnimation ? 1 : 0,
                transform: triggerAnimation ? 'translateX(0)' : 'translateX(-20px)',
                transition: `all 0.5s ease ${0.5 + index * 0.15}s`
              }}
            >
              <TextScramble
                text={skill.title}
                className="text-lg font-bold mb-2"
                as="h3"
                trigger={triggerAnimation}
                delay={500 + index * 150}
              />
              <TextScramble
                text={skill.description}
                className="text-text-secondary text-sm leading-relaxed"
                as="p"
                trigger={triggerAnimation}
                delay={600 + index * 150}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
