import environment from "../config/environment";

export const sendInvoice = async (payload) => {
  const response = await fetch(`${environment.baseURL}/invoice/send`, {
    method: "POST",
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
