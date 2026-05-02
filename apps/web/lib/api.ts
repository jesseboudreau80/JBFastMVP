const API_URL = process.env.NEXT_PUBLIC_API_URL

if (!API_URL) {
  console.error('NEXT_PUBLIC_API_URL is not set')
}

export async function checkHealth(): Promise<{ status: string }> {
  const res = await fetch(`${API_URL}/health`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error(`Health check failed: ${res.status} ${res.statusText}`)
  }
  return res.json()
}
