import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JBFastMVP',
  description: 'FastAPI + Next.js starter template',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        {children}
      </body>
    </html>
  )
}
