'use client'
import { Transaction } from '@/types'

interface TransactionTableProps {
  transactions: Transaction[]
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p>No transactions found in this statement.</p>
        <p className="text-sm mt-1">Try a different file or format.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-4 py-3 text-left font-semibold">Date</th>
            <th className="px-4 py-3 text-left font-semibold">Description</th>
            <th className="px-4 py-3 text-right font-semibold">Debit</th>
            <th className="px-4 py-3 text-right font-semibold">Credit</th>
            <th className="px-4 py-3 text-right font-semibold">Balance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((t, i) => (
            <tr
              key={i}
              className={`hover:bg-blue-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap font-mono text-xs">{t.date || '—'}</td>
              <td className="px-4 py-2.5 text-gray-900 max-w-xs truncate" title={t.description}>{t.description || '—'}</td>
              <td className="px-4 py-2.5 text-right font-mono text-red-600">
                {t.debit ? <span>{t.debit}</span> : <span className="text-gray-300">—</span>}
              </td>
              <td className="px-4 py-2.5 text-right font-mono text-green-600">
                {t.credit ? <span>{t.credit}</span> : <span className="text-gray-300">—</span>}
              </td>
              <td className="px-4 py-2.5 text-right font-mono text-gray-700">
                {t.balance || <span className="text-gray-300">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-xs text-gray-500">
        {transactions.length} transactions found
      </div>
    </div>
  )
}
