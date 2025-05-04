import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { invoiceSchema } from "@utils/schemas";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@utils/context";
import { Invoice } from "@types";

interface Props {
  onSubmit: (name: string, data: Invoice, callback?: (any) => void) => void;
}

const InvoiceForm = ({ onSubmit }: Props) => {
  const { invoice } = useContext(DataContext);
  const [progress, setProgress] = useState<string | null>(null);

  const form = useForm({
    resolver: yupResolver(invoiceSchema),
    defaultValues: {
      number: "",
      issuedDate: "",
      dueDate: "",
      from: "",
      to: "",
      rate: 0,
    },
  });

  const submitHandler = (data: Invoice) => {
    setProgress("Saving");
    onSubmit("invoice", data, () => {
      setProgress("Saved");
      setTimeout(() => {
        setProgress(null);
      }, 2000);
    });
  };

  useEffect(() => {
    if (invoice) form.reset(invoice);
  }, [invoice, form]);

  return (
    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label className="block mb-1">Invoice Number</label>
        <input
          placeholder="Invoice Number"
          {...form.register("number")}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block mb-1">Issued Date</label>
        <input
          type="date"
          {...form.register("issuedDate")}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block mb-1">Due Date</label>
        <input
          type="date"
          {...form.register("dueDate")}
          className="w-full border rounded p-2"
        />
      </div>
      <h2 className="font-semibold">Billing Period</h2>
      <div>
        <label className="block mb-1">From</label>
        <input
          type="date"
          placeholder="From Date"
          {...form.register("from")}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block mb-1">To</label>
        <input
          type="date"
          placeholder="To Date"
          {...form.register("to")}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block mb-1">Rate</label>
        <input
          placeholder="Rate Price"
          {...form.register("rate")}
          className="w-full border rounded p-2"
        />
      </div>
      <button
        type="submit"
        className="min-w-[12rem] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {progress ?? "Save Invoice Info"}
      </button>
    </form>
  );
};

export default InvoiceForm
