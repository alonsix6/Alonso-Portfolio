import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f5f5f5',
        surface: '#ffffff',
        'surface-alt': '#e0e0e0',
        'text-primary': '#0a0a0a',
        'text-secondary': '#333333',
        'text-tertiary': '#666666',
        dark: {
          background: '#0a0a0a',
          surface: '#1a1a1a',
          'text-primary': '#f5f5f5',
          'text-secondary': '#999999',
          'text-tertiary': '#666666',
          border: '#333333',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'sans-serif'],
      },
      borderWidth: {
        '3': '3px',
      },
      transitionTimingFunction: {
        'brutalist': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
export default config
