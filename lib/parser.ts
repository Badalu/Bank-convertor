import { Transaction, ParseResult } from '@/types'

// ─── CSV Parser ────────────────────────────────────────────────────────────────
export async function parseCSV(content: string): Promise<Transaction[]> {
  const lines = content.trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/"/g, ''))
  const transactions: Transaction[] = []

  // Detect column indices
  const dateIdx = headers.findIndex(h => h.includes('date'))
  const descIdx = headers.findIndex(h => h.includes('desc') || h.includes('narr') || h.includes('particular') || h.includes('detail'))
  const debitIdx = headers.findIndex(h => h.includes('debit') || h.includes('withdrawal') || h.includes('dr'))
  const creditIdx = headers.findIndex(h => h.includes('credit') || h.includes('deposit') || h.includes('cr'))
  const balanceIdx = headers.findIndex(h => h.includes('balance') || h.includes('bal'))
  const amountIdx = headers.findIndex(h => h === 'amount')

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    // Handle quoted CSV fields
    const cols = parseCSVLine(line)
    if (cols.length < 2) continue

    const transaction: Transaction = {
      date: dateIdx >= 0 ? cleanValue(cols[dateIdx]) : '',
      description: descIdx >= 0 ? cleanValue(cols[descIdx]) : cleanValue(cols[1] || ''),
      debit: debitIdx >= 0 ? cleanValue(cols[debitIdx]) : (amountIdx >= 0 && parseFloat(cols[amountIdx]) < 0 ? String(Math.abs(parseFloat(cols[amountIdx]))) : ''),
      credit: creditIdx >= 0 ? cleanValue(cols[creditIdx]) : (amountIdx >= 0 && parseFloat(cols[amountIdx]) > 0 ? cols[amountIdx] : ''),
      balance: balanceIdx >= 0 ? cleanValue(cols[balanceIdx]) : '',
    }

    if (transaction.date || transaction.description) {
      transactions.push(transaction)
    }
  }

  return transactions
}

function parseCSVLine(line: string): string[] {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }
  result.push(current.trim())
  return result
}

// ─── Excel Parser ──────────────────────────────────────────────────────────────
export async function parseExcel(buffer: ArrayBuffer): Promise<Transaction[]> {
  const XLSX = await import('xlsx')
  const workbook = XLSX.read(buffer, { type: 'array', cellDates: true })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, dateNF: 'yyyy-mm-dd' })

  if (rows.length < 2) return []

  // Find header row (first row with recognizable headers)
  let headerRow = 0
  for (let i = 0; i < Math.min(10, rows.length); i++) {
    const row = rows[i].map(c => String(c || '').toLowerCase())
    if (row.some(c => c.includes('date') || c.includes('amount') || c.includes('debit'))) {
      headerRow = i
      break
    }
  }

  const headers = rows[headerRow].map(h => String(h || '').toLowerCase().trim())
  const dateIdx = headers.findIndex(h => h.includes('date'))
  const descIdx = headers.findIndex(h => h.includes('desc') || h.includes('narr') || h.includes('particular') || h.includes('detail'))
  const debitIdx = headers.findIndex(h => h.includes('debit') || h.includes('withdrawal') || h.includes('dr'))
  const creditIdx = headers.findIndex(h => h.includes('credit') || h.includes('deposit') || h.includes('cr'))
  const balanceIdx = headers.findIndex(h => h.includes('balance') || h.includes('bal'))
  const amountIdx = headers.findIndex(h => h === 'amount')

  const transactions: Transaction[] = []

  for (let i = headerRow + 1; i < rows.length; i++) {
    const row = rows[i]
    if (!row || row.length === 0) continue

    const transaction: Transaction = {
      date: dateIdx >= 0 ? cleanValue(String(row[dateIdx] || '')) : '',
      description: descIdx >= 0 ? cleanValue(String(row[descIdx] || '')) : cleanValue(String(row[1] || '')),
      debit: debitIdx >= 0 ? cleanValue(String(row[debitIdx] || '')) : '',
      credit: creditIdx >= 0 ? cleanValue(String(row[creditIdx] || '')) : '',
      balance: balanceIdx >= 0 ? cleanValue(String(row[balanceIdx] || '')) : '',
    }

    if (amountIdx >= 0 && !transaction.debit && !transaction.credit) {
      const amount = parseFloat(String(row[amountIdx] || '0'))
      if (amount < 0) transaction.debit = String(Math.abs(amount))
      else if (amount > 0) transaction.credit = String(amount)
    }

    if (transaction.date || transaction.description) {
      transactions.push(transaction)
    }
  }

  return transactions
}

// ─── PDF Parser ────────────────────────────────────────────────────────────────
export async function parsePDF(buffer: Buffer): Promise<{ transactions: Transaction[], pageCount: number }> {
  const pdfParse = (await import('pdf-parse')).default
  const data = await pdfParse(buffer)
  const text = data.text
  const pageCount = data.numpages

  const transactions = extractTransactionsFromText(text)
  return { transactions, pageCount }
}

function extractTransactionsFromText(text: string): Transaction[] {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
  const transactions: Transaction[] = []

  // Common bank statement patterns
  const datePatterns = [
    /^(\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4})/,
    /^(\d{2,4}[-\/]\d{1,2}[-\/]\d{1,2})/,
    /^(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{2,4})/i,
    /^((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},?\s+\d{2,4})/i,
  ]

  // Amount pattern: numbers with optional decimals, possibly with commas
  const amountPattern = /[\d,]+\.?\d{0,2}/

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    let dateMatch: RegExpMatchArray | null = null
    for (const pattern of datePatterns) {
      dateMatch = line.match(pattern)
      if (dateMatch) break
    }

    if (!dateMatch) continue

    const date = dateMatch[1]
    const rest = line.slice(dateMatch[0].length).trim()

    // Extract amounts from the line
    const amounts = rest.match(new RegExp(amountPattern.source, 'g')) || []
    const description = rest.replace(new RegExp(amountPattern.source, 'g'), '').trim().replace(/\s+/g, ' ')

    let debit = '', credit = '', balance = ''

    if (amounts.length >= 3) {
      debit = amounts[0]
      credit = amounts[1]
      balance = amounts[2]
    } else if (amounts.length === 2) {
      // Could be (debit/credit, balance) or (debit, credit)
      balance = amounts[amounts.length - 1]
      const first = parseFloat(amounts[0].replace(/,/g, ''))
      // Check next line for additional context
      if (i + 1 < lines.length && lines[i + 1].toLowerCase().includes('cr')) {
        credit = amounts[0]
      } else {
        debit = amounts[0]
      }
    } else if (amounts.length === 1) {
      balance = amounts[0]
    }

    if (date) {
      transactions.push({ date, description: description || 'Transaction', debit, credit, balance })
    }
  }

  // If structured parsing found nothing, try generic extraction
  if (transactions.length === 0) {
    return extractGenericTransactions(lines)
  }

  return transactions
}

function extractGenericTransactions(lines: string[]): Transaction[] {
  const transactions: Transaction[] = []
  const amountRegex = /\b\d{1,3}(?:,\d{3})*(?:\.\d{2})?\b/g

  for (const line of lines) {
    const amounts = line.match(amountRegex)
    if (!amounts || amounts.length < 1) continue
    if (line.length < 10) continue

    // Skip header-like lines
    if (/^(date|description|debit|credit|balance|amount|transaction)/i.test(line)) continue

    transactions.push({
      date: extractDate(line) || '',
      description: line.replace(amountRegex, '').replace(/\s+/g, ' ').trim(),
      debit: amounts.length > 1 ? amounts[0] : '',
      credit: amounts.length > 1 ? amounts[1] : '',
      balance: amounts[amounts.length - 1],
    })
  }

  return transactions.slice(0, 500) // Safety limit
}

function extractDate(text: string): string | null {
  const patterns = [
    /\d{1,2}[-\/]\d{1,2}[-\/]\d{2,4}/,
    /\d{4}[-\/]\d{1,2}[-\/]\d{1,2}/,
    /\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{2,4}/i,
  ]
  for (const p of patterns) {
    const m = text.match(p)
    if (m) return m[0]
  }
  return null
}

function cleanValue(val: string): string {
  return val.replace(/^["']|["']$/g, '').trim()
}

// ─── Export helpers ────────────────────────────────────────────────────────────
export function transactionsToCSV(transactions: Transaction[]): string {
  const header = 'Date,Description,Debit,Credit,Balance\n'
  const rows = transactions.map(t =>
    `"${t.date}","${t.description.replace(/"/g, '""')}","${t.debit}","${t.credit}","${t.balance}"`
  ).join('\n')
  return header + rows
}

export async function transactionsToExcel(transactions: Transaction[]): Promise<Buffer> {
  const ExcelJS = (await import('exceljs')).default
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet('Transactions')

  sheet.columns = [
    { header: 'Date', key: 'date', width: 15 },
    { header: 'Description', key: 'description', width: 40 },
    { header: 'Debit', key: 'debit', width: 15 },
    { header: 'Credit', key: 'credit', width: 15 },
    { header: 'Balance', key: 'balance', width: 15 },
  ]

  // Style header row
  const headerRow = sheet.getRow(1)
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } }
  headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2563EB' } }
  headerRow.alignment = { vertical: 'middle', horizontal: 'center' }

  transactions.forEach(t => {
    sheet.addRow(t)
  })

  // Alternate row colors
  for (let i = 2; i <= transactions.length + 1; i++) {
    if (i % 2 === 0) {
      sheet.getRow(i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8FAFC' } }
    }
  }

  return workbook.xlsx.writeBuffer() as Promise<Buffer>
}
