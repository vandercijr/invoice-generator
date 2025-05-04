import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendEmailConfigSchema } from "@utils/schemas"; // adjust path if needed
import { DataContext } from "@utils/context";
import { useContext, useEffect, useState } from "react";
import { EmailConfig } from "@types";

interface SendEmailConfigFormProps {
  onSubmit: (name: string, data: EmailConfig, callback?: (any) => void) => void;
}

const SendEmailConfigForm = ({ onSubmit }: SendEmailConfigFormProps) => {
  const { emailConfig } = useContext(DataContext);
  const [progress, setProgress] = useState<string | null>(null);
  const form = useForm({
    resolver: yupResolver(sendEmailConfigSchema),
    defaultValues: {
      emailTo: "",
      emailSender: "",
    },
  });

  const submitHandler = (data: EmailConfig) => {
    setProgress("Saving");
    onSubmit("emailConfig", data, () => {
      setProgress("Saved");
      setTimeout(() => {
        setProgress(null);
      }, 2000);
    });
  };

  useEffect(() => {
    if (emailConfig) {
      form.reset(emailConfig);
    }
  }, [emailConfig, form]);

  return (
    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label className="block mb-1">Email To</label>
        <input
          type="email"
          placeholder="Email to"
          {...form.register("emailTo")}
          className="w-full border rounded p-2"
        />
        {form.formState.errors.emailTo && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.emailTo.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1">Reply To</label>
        <input
          type="email"
          placeholder="Reply to"
          {...form.register("emailSender")}
          className="w-full border rounded p-2"
        />
        {form.formState.errors.emailSender && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.emailSender.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="min-w-[12rem] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {progress ?? "Save Email Config"}
      </button>
    </form>
  );
};

export default SendEmailConfigForm;
