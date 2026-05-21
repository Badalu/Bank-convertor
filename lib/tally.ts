import { Transaction } from '@/types'

export function transactionsToTallyXML(transactions: Transaction[], companyName: string = 'Imported Company'): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  
  let xml = `<?xml version="1.0"?>
<ENVELOPE>
  <HEADER>
    <TALLYREQUEST>Import Data</TALLYREQUEST>
  </HEADER>
  <BODY>
    <IMPORTDATA>
      <REQUESTDESC>
        <REPORTNAME>Vouchers</REPORTNAME>
        <STATICVARIABLES>
          <SVCURRENTCOMPANY>${companyName}</SVCURRENTCOMPANY>
        </STATICVARIABLES>
      </REQUESTDESC>
      <REQUESTDATA>`

  transactions.forEach((t, i) => {
    const tDate = formatTallyDate(t.date)
    const amount = parseFloat(t.debit.replace(/,/g, '') || '0') || -parseFloat(t.credit.replace(/,/g, '') || '0')
    const ledgerName = amount > 0 ? 'Cash' : 'Bank' // Default placeholder

    xml += `
        <TALLYMESSAGE xmlns:UDF="TallyUDF">
          <VOUCHER VCHTYPE="Payment" ACTION="Create" OBJVIEW="AccountingVoucherView">
            <DATE>${tDate}</DATE>
            <VOUCHERTYPENAME>Payment</VOUCHERTYPENAME>
            <PARTYLEDGERNAME>${ledgerName}</PARTYLEDGERNAME>
            <PERSISTEDVIEW>AccountingVoucherView</PERSISTEDVIEW>
            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>${ledgerName}</LEDGERNAME>
              <ISDEEMEDPOSITIVE>${amount > 0 ? 'YES' : 'NO'}</ISDEEMEDPOSITIVE>
              <AMOUNT>${amount}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
            <ALLLEDGERENTRIES.LIST>
              <LEDGERNAME>Suspense Account</LEDGERNAME>
              <ISDEEMEDPOSITIVE>${amount > 0 ? 'NO' : 'YES'}</ISDEEMEDPOSITIVE>
              <AMOUNT>${-amount}</AMOUNT>
            </ALLLEDGERENTRIES.LIST>
            <NARRATION>${t.description}</NARRATION>
          </VOUCHER>
        </TALLYMESSAGE>`
  })

  xml += `
      </REQUESTDATA>
    </IMPORTDATA>
  </BODY>
</ENVELOPE>`

  return xml
}

function formatTallyDate(dateStr: string): string {
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) {
      // Try to parse DD/MM/YYYY
      const parts = dateStr.split(/[-\/]/)
      if (parts.length === 3) {
        if (parts[0].length === 2) return `${parts[2]}${parts[1]}${parts[0]}`
        if (parts[0].length === 4) return `${parts[0]}${parts[1]}${parts[2]}`
      }
      return new Date().toISOString().slice(0, 10).replace(/-/g, '')
    }
    return d.toISOString().slice(0, 10).replace(/-/g, '')
  } catch {
    return new Date().toISOString().slice(0, 10).replace(/-/g, '')
  }
}
