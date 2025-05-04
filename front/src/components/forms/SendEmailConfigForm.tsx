import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendEmailConfigSchema } from "@utils/schemas"; // adjust path if needed
import { DataContext } from "@utils/context";
import { useContext, useEffect } from "react";

interface SendEmailConfigFormProps {
  onSubmit: (data: { emailTo: string; emailSender: string }) => void;
}

const SendEmailConfigForm = ({ onSubmit }: SendEmailConfigFormProps) => {
  const { emailConfig } = useContext(DataContext);
  const form = useForm({
    resolver: yupResolver(sendEmailConfigSchema),
    defaultValues: {
      emailTo: "",
      emailSender: "",
    },
  });

  useEffect(() => {
    if (emailConfig) {
      form.reset(emailConfig);
    }
  }, [emailConfig, form]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Email Config
      </button>
    </form>
  );
};

export default SendEmailConfigForm;
