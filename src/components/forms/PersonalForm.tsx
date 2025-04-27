import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { personalSchema } from '@/utils/schemas'
import { useContext, useEffect } from "react";
import { DataContext } from "@/utils/context";

interface Props {
    onSubmit: (data: any) => void
}

const PersonalForm = ({ onSubmit }: Props) => {
    const { personal } = useContext(DataContext);
    const form = useForm({
        resolver: yupResolver(personalSchema),
        defaultValues: { name: '', info: '', companyInfo: '' }
    })

    useEffect(() => {
      if (personal) form.reset(personal);
    }, [personal, form]);
    

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block mb-1">Name</label>
                <input
                    placeholder="Name"
                    {...form.register('name')}
                    className="w-full border rounded p-2"
                />
            </div>
            <div>
                <label className="block mb-1">Your Info</label>
                <textarea
                    placeholder="Your Info"
                    {...form.register('info')}
                    className="w-full border rounded p-2 h-40"
                />
            </div>
            <div>
                <label className="block mb-1">Company Info</label>
                <textarea
                    placeholder="Company Info"
                    {...form.register('companyInfo')}
                    className="w-full border rounded p-2 h-40"
                />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save Personal Info
            </button>
        </form>
    )
}

export default PersonalForm
