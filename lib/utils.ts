export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getRandomChar(): string {
  const chars = '!<>-_\\/[]{}—=+*^?#'
  return chars[Math.floor(Math.random() * chars.length)]
}

export function scrambleString(str: string): string {
  return str
    .split('')
    .map((char) => (char === ' ' ? ' ' : getRandomChar()))
    .join('')
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/(\+\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')
}

export function trackEvent(eventName: string, data: Record<string, unknown>) {
  // For Vercel Analytics
  if (typeof window !== 'undefined') {
    console.log('[Analytics Event]', eventName, data)

    // Google Analytics 4
    if ('gtag' in window) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', eventName, data)
    }
  }
}

export function getNFCSource(): { source: string | null; timestamp: string | null } {
  if (typeof window === 'undefined') {
    return { source: null, timestamp: null }
  }

  return {
    source: localStorage.getItem('nfc_source'),
    timestamp: localStorage.getItem('nfc_timestamp'),
  }
}
