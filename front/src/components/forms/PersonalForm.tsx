import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { personalSchema } from "@utils/schemas";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@utils/context";
import { Personal } from "@types";

interface Props {
  onSubmit: (name: string, data: Personal, callback?: (any) => void) => void;
}

const PersonalForm = ({ onSubmit }: Props) => {
  const { personal } = useContext(DataContext);
  const [progress, setProgress] = useState<string | null>(null);
  const form = useForm({
    resolver: yupResolver(personalSchema),
    defaultValues: { name: "", info: "", companyInfo: "" },
  });

  const submitHandler = (data: Personal) => {
    setProgress("Saving");
    onSubmit("personal", data, () => {
      setProgress("Saved");
      setTimeout(() => {
        setProgress(null);
      }, 2000);
    });
  };

  useEffect(() => {
    if (personal) form.reset(personal);
  }, [personal, form]);

  return (
    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label className="block mb-1">Name</label>
        <input
          placeholder="Name"
          {...form.register("name")}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block mb-1">Your Info</label>
        <textarea
          placeholder="Your Info"
          {...form.register("info")}
          className="w-full border rounded p-2 h-40"
        />
      </div>
      <div>
        <label className="block mb-1">Company Info</label>
        <textarea
          placeholder="Company Info"
          {...form.register("companyInfo")}
          className="w-full border rounded p-2 h-40"
        />
      </div>
      <button
        type="submit"
        className="min-w-[12rem] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {progress ?? "Save Personal Info"}
      </button>
    </form>
  );
};

export default PersonalForm
