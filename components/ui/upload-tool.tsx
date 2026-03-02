'use client'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Transaction } from '@/types'
import { TransactionTable } from './transaction-table'
import { Button } from './button'

interface UploadToolProps {
  userId?: string
}

export function UploadTool({ userId }: UploadToolProps) {
  const [parsing, setParsing] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [error, setError] = useState<string>('')
  const [fileName, setFileName] = useState('')
  const [pageCount, setPageCount] = useState(0)
  const [usage, setUsage] = useState<{ remaining: number; limit: number; plan: string } | null>(null)
  const [requiresUpgrade, setRequiresUpgrade] = useState(false)

  const processFile = useCallback(async (file: File) => {
    setParsing(true)
    setError('')
    setRequiresUpgrade(false)
    setTransactions([])
    setFileName(file.name)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/parse-statement', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.requiresUpgrade) {
          setRequiresUpgrade(true)
          setError(data.error)
        } else {
          setError(data.error || 'Failed to parse file')
        }
        return
      }

      setTransactions(data.transactions)
      setPageCount(data.pageCount)
      setUsage(data.usage)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setParsing(false)
    }
  }, [])

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) processFile(accepted[0])
  }, [processFile])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  })

  const downloadCSV = () => {
    const header = 'Date,Description,Debit,Credit,Balance\n'
    const rows = transactions.map(t =>
      `"${t.date}","${t.description.replace(/"/g, '""')}","${t.debit}","${t.credit}","${t.balance}"`
    ).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName.replace(/\.[^.]+$/, '') + '_transactions.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadExcel = async () => {
    try {
      const XLSX = await import('xlsx')
      const ws = XLSX.utils.json_to_sheet(transactions)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Transactions')
      XLSX.writeFile(wb, fileName.replace(/\.[^.]+$/, '') + '_transactions.xlsx')
    } catch {
      alert('Failed to generate Excel file')
    }
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-200
          ${isDragActive
            ? 'border-blue-500 bg-blue-50 scale-[1.01]'
            : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/30 bg-gray-50'
          }
          ${parsing ? 'pointer-events-none opacity-60' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          {parsing ? (
            <>
              <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
              <div>
                <p className="font-semibold text-gray-900">Parsing your statement...</p>
                <p className="text-sm text-gray-500 mt-1">Extracting transactions with AI-powered parser</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-lg">
                  {isDragActive ? 'Drop your file here' : 'Upload Bank Statement'}
                </p>
                <p className="text-gray-500 mt-1">Drag & drop or click to select</p>
                <div className="flex items-center gap-2 mt-3 justify-center">
                  <span className="px-2 py-1 bg-white rounded text-xs font-mono text-gray-600 border">PDF</span>
                  <span className="px-2 py-1 bg-white rounded text-xs font-mono text-gray-600 border">CSV</span>
                  <span className="px-2 py-1 bg-white rounded text-xs font-mono text-gray-600 border">XLSX</span>
                  <span className="text-gray-400 text-xs">· Max 10MB</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className={`mt-4 p-4 rounded-xl border ${requiresUpgrade ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
          <div className="flex items-start gap-3">
            <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${requiresUpgrade ? 'text-amber-500' : 'text-red-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className={`font-medium ${requiresUpgrade ? 'text-amber-800' : 'text-red-800'}`}>{error}</p>
              {requiresUpgrade && (
                <a href="/pricing" className="text-sm text-amber-700 underline mt-1 block">
                  Upgrade your plan →
                </a>
              )}
              {!userId && !requiresUpgrade && (
                <a href="/auth/signup" className="text-sm text-red-700 underline mt-1 block">
                  Sign up for more free pages →
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {transactions.length > 0 && (
        <div className="mt-8 space-y-4">
          {/* Summary Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-green-900">
                  {transactions.length} transactions extracted
                </p>
                <p className="text-sm text-green-700">
                  from {fileName} · {pageCount} page{pageCount !== 1 ? 's' : ''}
                  {usage && ` · ${usage.remaining} pages remaining`}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={downloadCSV} variant="outline" size="sm" className="border-green-300 text-green-700 hover:bg-green-100">
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download CSV
              </Button>
              <Button onClick={downloadExcel} variant="primary" size="sm">
                <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Excel
              </Button>
            </div>
          </div>

          {/* Table */}
          <TransactionTable transactions={transactions} />
        </div>
      )}
    </div>
  )
}
