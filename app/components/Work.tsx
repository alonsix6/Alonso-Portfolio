'use client'

import { Code2, Heart, TrendingUp, Zap, Camera, ArrowRight } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import TextScramble from './TextScramble'

interface WorkProps {
  triggerAnimation: boolean
}

interface Project {
  category: string
  title: string
  description: string
  tech: string[]
  highlight: string | null
  link: string | null
  linkText?: string
}

const projectIcons = [Code2, Heart, TrendingUp, Zap, Camera]

export default function Work({ triggerAnimation }: WorkProps) {
  const { t, tRaw } = useLanguage()
  const projects = tRaw('work.projects') as Project[]

  return (
    <section id="work" className="py-24 md:py-32 section-container">
      {/* Section Header */}
      <div className="mb-16">
        <div className="mb-4">
          <TextScramble
            text={t('work.label')}
            className="text-sm font-bold tracking-[0.3em] text-text-tertiary"
            trigger={triggerAnimation}
            delay={0}
          />
        </div>
        <TextScramble
          text={t('work.title')}
          className="text-3xl md:text-4xl lg:text-5xl font-bold"
          as="h2"
          trigger={triggerAnimation}
          delay={100}
        />
      </div>

      {/* Project Cards */}
      <div className="space-y-8">
        {projects && projects.map((project, index) => {
          const Icon = projectIcons[index] || Code2
          const isEven = index % 2 === 0

          return (
            <div
              key={index}
              className="brutalist-card project-card"
              style={{
                opacity: triggerAnimation ? 1 : 0,
                transform: triggerAnimation ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.5s ease ${0.2 + index * 0.15}s`
              }}
            >
              <div className={`grid grid-cols-1 md:grid-cols-3 ${isEven ? '' : 'md:grid-flow-dense'}`}>
                {/* Icon Side */}
                <div
                  className={`bg-surface-alt flex items-center justify-center p-12 md:p-16 ${
                    isEven ? 'md:col-start-1' : 'md:col-start-3'
                  }`}
                >
                  <Icon
                    size={80}
                    strokeWidth={1.5}
                    className="text-text-primary"
                  />
                </div>

                {/* Content Side */}
                <div className={`p-8 md:p-12 md:col-span-2 ${isEven ? '' : 'md:col-start-1'}`}>
                  {/* Category */}
                  <TextScramble
                    text={project.category}
                    className="text-xs font-bold tracking-[0.2em] text-text-tertiary mb-3"
                    trigger={triggerAnimation}
                    delay={300 + index * 150}
                  />

                  {/* Title */}
                  <TextScramble
                    text={project.title}
                    className="text-2xl md:text-3xl font-bold mb-4"
                    as="h3"
                    trigger={triggerAnimation}
                    delay={400 + index * 150}
                  />

                  {/* Highlight Badge */}
                  {project.highlight && (
                    <div className="mb-4">
                      <span className="inline-block bg-text-primary text-surface px-3 py-1 text-sm font-bold">
                        {project.highlight}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <TextScramble
                    text={project.description}
                    className="text-text-secondary leading-relaxed mb-6"
                    as="p"
                    trigger={triggerAnimation}
                    delay={500 + index * 150}
                  />

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-text-primary font-bold hover:underline group"
                    >
                      {project.linkText || 'VIEW PROJECT'}
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
