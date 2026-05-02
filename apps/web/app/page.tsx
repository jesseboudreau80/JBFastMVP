'use client'

import { useEffect, useState } from 'react'
import { checkHealth } from '@/lib/api'
import Link from 'next/link'

export default function Home() {
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkHealth()
      .then((data) => setStatus(data.status))
      .catch((err: Error) => setError(err.message))
  }, [])

  return (
    <main>
      <h1>JBFastMVP</h1>
      <p>FastAPI + Next.js starter template</p>

      <section style={{ marginTop: '2rem' }}>
        <h2>API Health</h2>
        {error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : status ? (
          <p style={{ color: 'green' }}>Status: <strong>{status}</strong></p>
        ) : (
          <p>Checking API...</p>
        )}
      </section>

      <nav style={{ marginTop: '2rem' }}>
        <Link href="/dashboard">Go to Dashboard →</Link>
      </nav>
    </main>
  )
}
