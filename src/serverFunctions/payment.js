import { api } from "./index";

export const createPayment = async (authtoken, data) => {
  return await api.post(`/create-payment`, data, {
    headers: {
      authtoken,
    },
  });
};

export const verifyTransactionAndCreateOrder = async (
  authtoken,
  transaction,
  data
) => {
  return await api.post(
    `/verify-transaction`,
    {
      transaction,
      data,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};
