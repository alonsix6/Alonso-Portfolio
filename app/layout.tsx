import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alonso Ternero - Analytics Engineer & Photographer',
  description: 'Building data-driven systems and capturing visual stories. Portfolio of analytics engineer and photographer based in Lima, Peru.',
  keywords: ['analytics', 'developer', 'photographer', 'Lima', 'Peru', 'data', 'media buying', 'full-stack'],
  authors: [{ name: 'Alonso Javier Ternero Fernández-Maldonado' }],
  openGraph: {
    title: 'Alonso Ternero - Portfolio',
    description: 'Analytics engineer, developer & photographer',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_PE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alonso Ternero - Portfolio',
    description: 'Analytics engineer, developer & photographer',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Alonso Javier Ternero Fernández-Maldonado',
              jobTitle: 'Research & Analytics',
              worksFor: {
                '@type': 'Organization',
                name: 'Reset Comunicaciones',
              },
              alumniOf: 'Universidad Peruana de Ciencias Aplicadas',
              sameAs: [
                'https://pe.linkedin.com/in/alonso-ternero-413722235',
                'https://www.behance.net/alonsoternero',
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
