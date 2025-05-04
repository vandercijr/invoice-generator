const environment = {
  development: {
    baseURL: "http://localhost:8000/api",
  },
  production: {
    baseURL: "http://localhost:8000/api",
  },
};

export default environment[process.env.NODE_ENV || "development"];
