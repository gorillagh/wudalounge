import { api } from "./index";

export const uploadFile = async (file) => {
  return await api.post(`/uploadfile`, file);
};

export const saveOrderToDb = async (order) => {
  return await api.post(`${process.env.REACT_APP_API_URL}/saveorder`, order);
};

export const getOrder = async (orderId) => {
  return await api.get(`/getorder/${orderId}`);
};

export const updateOrder = async (authtoken, orderId, update) => {
  return await api.post(`/update-order/${orderId}`, update, {
    headers: {
      authtoken,
    },
  });
};

export const createPaymentIntent = async (orderId, orderInfo) => {
  return await api.post(`/create-payment-intent/${orderId}`, orderInfo);
};

export const completeOrder = async (orderId, payload) => {
  return await api.post(`/complete-order/${orderId}`, payload);
};
