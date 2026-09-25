const environment = {
  development: {
    baseURL: "http://localhost:9100/api",
  },
  production: {
    baseURL: "https://api.invoicegen.space/api",
  },
};

const defaults = environment[process.env.NODE_ENV || "development"];

export default {
  ...defaults,
  baseURL: import.meta.env.VITE_API_BASE_URL || defaults.baseURL,
};
