const environment = {
  development: {
    baseURL: "http://localhost:8000/api",
  },
  production: {
    baseURL: "http://api.invoicegen.space/api",
  },
};

export default environment[process.env.NODE_ENV || "development"];
