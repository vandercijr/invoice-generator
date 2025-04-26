import { useState, useEffect } from 'react'
import { getDb } from '@/utils/db'
import { fetchHarvestData } from '@/utils/api'
import TabsContainer from '@/components/tabs/TabsContainer'
import InvoicePDF from '@/components/forms/InvoicePDF'
import { PDFDownloadLink } from '@react-pdf/renderer'

const App = () => {
    const [tab, setTab] = useState('personal')
    const [harvestData, setHarvestData] = useState<any[]>([])
    const [db, setDb] = useState<any>(null)

    useEffect(() => {
        getDb().then(setDb)
    }, [])

    const handlePersonalSubmit = async (data: any) => {
        if (!db) return
        const tx = db.transaction('personal', 'readwrite')
        await tx.objectStore('personal').put({ id: 1, ...data })
        await tx.done
        alert('Personal info saved.')
    }

    const handleInvoiceSubmit = async (data: any) => {
        if (!db) return
        const tx = db.transaction('invoice', 'readwrite')
        await tx.objectStore('invoice').put({ id: 1, ...data })
        await tx.done
        // localStorage.setItem('invoiceNumber', data.number)
        alert('Invoice info saved.')
    }

    const handlePaymentSubmit = async (data: any) => {
      if (!db) return
      const tx = db.transaction('payment', 'readwrite')
      await tx.objectStore('payment').put({ id: 1, ...data })
      await tx.done
      alert('Payment info saved.')
  }

    const handleApiConfigSubmit = async (data: any) => {
      if (!db) return
      const tx = db.transaction('apiConfig', 'readwrite')
      await tx.objectStore('apiConfig').put({ id: 1, ...data })
      await tx.done
      alert('Api config saved.')
  }

    const handleFetchHarvest = async () => {
        const data = await fetchHarvestData()
        setHarvestData(data)
    }

    return (
        <div className="w-screen h-screen bg-gray-50 flex items-center justify-center">
            <div className="w-4/5 h-full flex flex-col justify-between">
                <TabsContainer
                    tab={tab}
                    setTab={setTab}
                    worktime={harvestData}
                    onFetchHarvest={handleFetchHarvest}
                    onPersonalSubmit={handlePersonalSubmit}
                    onInvoiceSubmit={handleInvoiceSubmit}
                    onPaymentSubmit={handlePaymentSubmit}
                    onApiConfigSubmit={handleApiConfigSubmit}
                />

                <div className="py-6">
                    <PDFDownloadLink
                        document={<InvoicePDF personal={{}} invoice={{}} harvest={harvestData} />}
                        fileName="invoice.pdf">
                        {({ loading }) => (
                            <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700">
                                {loading ? 'Generating...' : 'Generate PDF'}
                            </button>
                        )}
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    )
}

export default App
