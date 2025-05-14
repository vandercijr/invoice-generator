import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { additionalsSchema } from "@utils/schemas";
import { useContext, useEffect, useMemo, useState } from "react";
import { DataContext } from "@utils/context";
import { Additionals, Invoice } from "@types";

interface Props {
  onSubmit: (name: string, data: Invoice, callback?: (any) => void) => void;
}

const AdditionalsForm = ({ onSubmit }: Props) => {
  const { additionals } = useContext(DataContext);
  const [progress, setProgress] = useState<string | null>(null);
  const emptyAdditional = useMemo(
    () => ({ description: "", clientName: "", value: 0, view: false }),
    []
  );

  const form = useForm({
    resolver: yupResolver(additionalsSchema),
    defaultValues: {
      additionals: [{ description: "", value: 0, clientName: "", view: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "additionals",
  });

  const submitHandler = (data: Additionals) => {
    setProgress("Saving");
    onSubmit("additionals", data, () => {
      setProgress("Saved");
      setTimeout(() => {
        setProgress(null);
      }, 2000);
    });
  };

  useEffect(() => {
    if (additionals.length > 0) {
      form.reset({
        additionals: additionals[0].additionals ?? [emptyAdditional],
      });
    }
  }, [additionals, emptyAdditional, form]);

  return (
    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-4 gap-4 items-center">
            <input
              placeholder="Description"
              {...form.register(`additionals.${index}.description`)}
              className="border rounded p-2"
            />
            <input
              placeholder="Client Name"
              {...form.register(`additionals.${index}.clientName`)}
              className="border rounded p-2"
            />
            <input
              type="number"
              placeholder="Value"
              {...form.register(`additionals.${index}.value`)}
              className="border rounded p-2"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...form.register(`additionals.${index}.view`)}
              />
              <span>View</span>
            </label>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800"
                title="Remove"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => append(emptyAdditional)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          + Add
        </button>
      </div>

      <button
        type="submit"
        className="min-w-[12rem] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {progress ?? "Save Additionals Info"}
      </button>
    </form>
  );
};

export default AdditionalsForm;
