'use client'

import { useEffect, useState } from 'react'
import { checkHealth } from '@/lib/api'
import Link from 'next/link'

export default function Dashboard() {
  const [health, setHealth] = useState<{ status: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkHealth()
      .then((data) => {
        setHealth(data)
        setLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <main>
      <h1>Dashboard</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>System Status</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : (
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', fontWeight: 'bold' }}>API</td>
                <td style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', color: 'green' }}>
                  {health?.status}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </section>

      <nav style={{ marginTop: '2rem' }}>
        <Link href="/">← Back to Home</Link>
      </nav>
    </main>
  )
}
