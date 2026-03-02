'use client'
import { useState } from 'react'

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false)

  const handleManage = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'portal' }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      alert('Failed to open billing portal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleManage}
      disabled={loading}
      className="w-full text-center py-2 px-4 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
    >
      {loading ? 'Loading...' : 'Manage Subscription'}
    </button>
  )
}
