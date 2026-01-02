'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface TextScrambleProps {
  text: string
  className?: string
  as?: keyof JSX.IntrinsicElements
  trigger?: boolean
  delay?: number
  onComplete?: () => void
  scrambled?: boolean
}

const CHARS = '!<>-_\\/[]{}—=+*^?#'

export default function TextScramble({
  text,
  className = '',
  as: Component = 'span',
  trigger = false,
  delay = 0,
  onComplete,
  scrambled = true,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(scrambled ? scrambleText(text) : text)
  const [isAnimating, setIsAnimating] = useState(false)
  const frameRef = useRef<number | null>(null)
  const queueRef = useRef<Array<{ from: string; to: string; start: number; end: number; char?: string }>>([])

  function scrambleText(str: string): string {
    return str
      .split('')
      .map((char) => (char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]))
      .join('')
  }

  function randomChar(): string {
    return CHARS[Math.floor(Math.random() * CHARS.length)]
  }

  const animate = useCallback(() => {
    let complete = 0
    const output: string[] = []

    for (let i = 0; i < queueRef.current.length; i++) {
      const item = queueRef.current[i]
      const { from, to, start, end } = item

      if (frameRef.current === null) return

      if (frameRef.current >= end) {
        complete++
        output.push(to)
      } else if (frameRef.current >= start) {
        if (!item.char || Math.random() < 0.28) {
          item.char = randomChar()
        }
        output.push(item.char)
      } else {
        output.push(from)
      }
    }

    setDisplayText(output.join(''))

    if (complete === queueRef.current.length) {
      setIsAnimating(false)
      if (onComplete) onComplete()
      return
    }

    frameRef.current!++
    requestAnimationFrame(animate)
  }, [onComplete])

  const startAnimation = useCallback(() => {
    if (isAnimating) return

    setIsAnimating(true)
    const oldText = displayText
    const newText = text
    const length = Math.max(oldText.length, newText.length)

    queueRef.current = []

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40) + 20
      queueRef.current.push({ from, to, start, end })
    }

    frameRef.current = 0
    requestAnimationFrame(animate)
  }, [displayText, text, isAnimating, animate])

  useEffect(() => {
    if (trigger && !isAnimating) {
      const timeout = setTimeout(() => {
        startAnimation()
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [trigger, delay, startAnimation, isAnimating])

  // If not scrambled initially, just show the text
  useEffect(() => {
    if (!scrambled) {
      setDisplayText(text)
    }
  }, [text, scrambled])

  return (
    <Component className={className}>
      {displayText}
    </Component>
  )
}

// Hook for controlling multiple scramble animations
export function useScrambleSequence() {
  const [activeIndex, setActiveIndex] = useState(-1)
  const [isComplete, setIsComplete] = useState(false)

  const start = useCallback(() => {
    setActiveIndex(0)
    setIsComplete(false)
  }, [])

  const next = useCallback(() => {
    setActiveIndex((prev) => prev + 1)
  }, [])

  const complete = useCallback(() => {
    setIsComplete(true)
  }, [])

  const shouldTrigger = useCallback((index: number) => {
    return activeIndex >= index
  }, [activeIndex])

  return { start, next, complete, shouldTrigger, isComplete, activeIndex }
}
