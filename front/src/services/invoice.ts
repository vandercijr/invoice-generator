import environment from "../config/environment";

export const sendInvoice = async (payload) => {
  const response = await fetch(`${environment.baseURL}/invoice/send`, {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      // Accept: "application/json",
    },
    // body: JSON.stringify(payload),
    body: payload,
  });

  if (!response.ok) {
    return {
      error: "An error occurred while sending the invoice",
      status: response.status,
    };
  }

  return await response.json();
};
