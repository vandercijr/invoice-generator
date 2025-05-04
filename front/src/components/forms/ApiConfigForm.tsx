import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiConfigSchema } from "@utils/schemas";
import { DataContext } from "@utils/context";
import { ApiConfig } from "@types";

interface Props {
  onSubmit: (name: string, data: ApiConfig, callback?: (any) => void) => void;
}

const ApiConfigForm = ({ onSubmit }: Props) => {
  const { apiConfig } = useContext(DataContext);
  const [progress, setProgress] = useState<string | null>(null);

  const form = useForm<ApiConfig>({
    resolver: yupResolver(apiConfigSchema),
    defaultValues: {
      accountId: 0,
      token: "",
    },
  });

  const submitHandler = (data: ApiConfig) => {
    if (onSubmit) {
      setProgress("Saving");
      onSubmit("apiConfig", data, () => {
        setProgress("Saved");
        setTimeout(() => {
          setProgress(null);
        }, 2000);
      });
    }
  };

  useEffect(() => {
    if (apiConfig) form.reset(apiConfig);
  }, [apiConfig, form]);

  return (
    <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label className="block mb-1">Account ID</label>
        <input
          type="number"
          {...form.register("accountId")}
          className="w-full border rounded p-2"
        />
      </div>
      <div>
        <label className="block mb-1">Token</label>
        <input
          {...form.register("token")}
          className="w-full border rounded p-2"
        />
      </div>
      <button
        type="submit"
        className="min-w-[12rem] px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {progress ?? "Save API Config"}
      </button>
    </form>
  );
};

export default ApiConfigForm;
