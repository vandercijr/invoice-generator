import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { paymentSchema } from '@/utils/schemas'
import { useEffect } from 'react'
import { fetchData } from '@/utils/db'

interface Props {
    onSubmit: (data: any) => void
}

const PaymentInfoForm = ({ onSubmit }: Props) => {
    const form = useForm({
        resolver: yupResolver(paymentSchema),
        defaultValues: {
            type: '',
            accountTitle: '',
            bank: '',
            routing: '',
            account: ''
        }
    })

    useEffect(() => {
        const load = async () => {
            const config = await fetchData('payment', 1)
            if (config) form.reset(config)
        }
        load()
    }, [form])

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block mb-1">Type</label>
                <input {...form.register('type')} className="w-full border rounded p-2" />
            </div>
            <div>
                <label className="block mb-1">Account Title</label>
                <input {...form.register('accountTitle')} className="w-full border rounded p-2" />
            </div>
            <div>
                <label className="block mb-1">Bank</label>
                <input {...form.register('bank')} className="w-full border rounded p-2" />
            </div>
            <div>
                <label className="block mb-1">ACH / Routing</label>
                <input {...form.register('routing')} className="w-full border rounded p-2" />
            </div>
            <div>
                <label className="block mb-1">DDA / Account</label>
                <input {...form.register('account')} className="w-full border rounded p-2" />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save Payment Info
            </button>
        </form>
    )
}

export default PaymentInfoForm
