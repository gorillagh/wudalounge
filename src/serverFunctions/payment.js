import axios from "axios";

export const createPayment = async (id, data) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/create-payment/${id}`,
    data
  );
};

export const verifyTransactionAndCreateOrder = async (id, transaction, data) =>
  axios.post(`${process.env.REACT_APP_API_URL}/verify-transaction/${id}`, {
    transaction,
    data,
  });
