import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { invoiceSchema } from '@/utils/schemas'
import { useEffect } from 'react'
import { fetchData } from '@/utils/db'

interface Props {
    onSubmit: (data: any) => void
}

const InvoiceForm = ({ onSubmit }: Props) => {
    const form = useForm({
        resolver: yupResolver(invoiceSchema),
        defaultValues: {
            number: '',
            issuedDate: '',
            dueDate: '',
            from: '',
            to: '',
            rate: 0
        }
    })

    useEffect(() => {
        const load = async () => {
            const config = await fetchData('invoice', 1)
            if (config) form.reset(config)
        }
        load()
    }, [form])

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block mb-1">Invoice Number</label>
                <input
                    placeholder="Invoice Number"
                    {...form.register('number')}
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label className="block mb-1">Issued Date</label>
                <input type="date" {...form.register('issuedDate')} className="w-full border rounded p-2" />
            </div>
            <div>
                <label className="block mb-1">Due Date</label>
                <input type="date" {...form.register('dueDate')} className="w-full border rounded p-2" />
            </div>
            <h2 className='font-semibold'>Billing Period</h2>
            <div>
                <label className="block mb-1">From</label>
                <input
                    type="date"
                    placeholder="From Date"
                    {...form.register('from')}
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label className="block mb-1">To</label>
                <input
                    type="date"
                    placeholder="To Date"
                    {...form.register('to')}
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label className="block mb-1">Rate</label>
                <input placeholder="Rate Price" {...form.register('rate')} className="w-full border rounded p-2" />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save Invoice Info
            </button>
        </form>
    )
}

export default InvoiceForm
