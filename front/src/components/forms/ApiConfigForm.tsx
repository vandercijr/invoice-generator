import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiConfigSchema } from "@utils/schemas";
import { DataContext } from "@utils/context";

interface ApiConfig {
  accountId: number;
  token: string;
}

interface Props {
  onSubmit: (data: ApiConfig) => void;
}

const ApiConfigForm = ({ onSubmit }: Props) => {
  const { apiConfig } = useContext(DataContext);

  const form = useForm<ApiConfig>({
    resolver: yupResolver(apiConfigSchema),
    defaultValues: {
      accountId: 0,
      token: "",
    },
  });

  useEffect(() => {
    if (apiConfig) form.reset(apiConfig);
  }, [apiConfig, form]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save API Config
      </button>
    </form>
  );
};

export default ApiConfigForm;
