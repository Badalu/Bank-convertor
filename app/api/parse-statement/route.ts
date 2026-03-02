import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { parseCSV, parseExcel, parsePDF } from '@/lib/parser'
import { checkUsageLimit, recordUsage } from '@/lib/usage'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const fileName = file.name
    const fileSize = file.size
    const ext = fileName.split('.').pop()?.toLowerCase()

    if (!['pdf', 'csv', 'xlsx', 'xls'].includes(ext || '')) {
      return NextResponse.json({ error: 'Unsupported file type. Use PDF, CSV, or Excel.' }, { status: 400 })
    }

    if (fileSize > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })
    }

    let transactions = []
    let pageCount = 1
    let fileType: 'pdf' | 'csv' | 'excel' = 'csv'

    const buffer = await file.arrayBuffer()

    if (ext === 'pdf') {
      fileType = 'pdf'
      const result = await parsePDF(Buffer.from(buffer))
      transactions = result.transactions
      pageCount = result.pageCount
    } else if (ext === 'csv') {
      fileType = 'csv'
      const text = new TextDecoder().decode(buffer)
      transactions = await parseCSV(text)
      pageCount = Math.ceil(transactions.length / 50) || 1
    } else {
      fileType = 'excel'
      transactions = await parseExcel(buffer)
      pageCount = Math.ceil(transactions.length / 50) || 1
    }

    // Check usage limit
    const usage = await checkUsageLimit(user?.id || null, pageCount)

    if (!usage.allowed) {
      return NextResponse.json({
        error: 'Usage limit reached',
        limit: usage.limit,
        remaining: usage.remaining,
        plan: usage.plan,
        requiresUpgrade: true,
      }, { status: 429 })
    }

    // Record usage
    await recordUsage(user?.id || null, pageCount, fileType)

    return NextResponse.json({
      transactions,
      pageCount,
      fileName,
      fileType,
      usage: {
        remaining: usage.remaining - pageCount,
        limit: usage.limit,
        plan: usage.plan,
      }
    })
  } catch (error: unknown) {
    console.error('Parse error:', error)
    const message = error instanceof Error ? error.message : 'Failed to parse file'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
