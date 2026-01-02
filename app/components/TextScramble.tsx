'use client'

import { useEffect, useRef, useState } from 'react'

interface TextScrambleProps {
  text: string
  className?: string
  as?: keyof JSX.IntrinsicElements
  trigger?: boolean
  delay?: number
  onComplete?: () => void
}

const CHARS = '!<>-_\\/[]{}—=+*^?#'

function randomChar(): string {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

function scrambleText(str: string): string {
  return str
    .split('')
    .map((char) => (char === ' ' ? ' ' : randomChar()))
    .join('')
}

export default function TextScramble({
  text,
  className = '',
  as: Component = 'span',
  trigger = false,
  delay = 0,
  onComplete,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(() => scrambleText(text))
  const [hasAnimated, setHasAnimated] = useState(false)
  const animationRef = useRef<number | null>(null)
  const hasStartedRef = useRef(false)

  useEffect(() => {
    // Only animate once when trigger becomes true
    if (!trigger || hasStartedRef.current) return

    const timeoutId = setTimeout(() => {
      hasStartedRef.current = true

      const targetText = text
      const queue: Array<{ from: string; to: string; start: number; end: number; char?: string }> = []

      // Build animation queue
      for (let i = 0; i < targetText.length; i++) {
        const start = Math.floor(Math.random() * 20)
        const end = start + Math.floor(Math.random() * 20) + 15
        queue.push({
          from: randomChar(),
          to: targetText[i],
          start,
          end,
        })
      }

      let frame = 0

      const animate = () => {
        let complete = 0
        const output: string[] = []

        for (let i = 0; i < queue.length; i++) {
          const item = queue[i]
          const { to, start, end } = item

          if (frame >= end) {
            complete++
            output.push(to)
          } else if (frame >= start) {
            if (!item.char || Math.random() < 0.28) {
              item.char = randomChar()
            }
            output.push(item.char)
          } else {
            output.push(item.from)
          }
        }

        setDisplayText(output.join(''))

        if (complete === queue.length) {
          setHasAnimated(true)
          if (onComplete) onComplete()
          return
        }

        frame++
        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [trigger, text, delay, onComplete])

  // Update display when text changes (language switch) after animation
  useEffect(() => {
    if (hasAnimated) {
      setDisplayText(text)
    }
  }, [text, hasAnimated])

  return (
    <Component className={className}>
      {displayText}
    </Component>
  )
}
