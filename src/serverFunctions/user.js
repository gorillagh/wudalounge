import { api } from "./index";

export const getUser = async (authtoken) => {
  return await api.post(
    `/get-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const addToNotificationList = async (email) => {
  return await api.post(`/add-to-notification-list`, { email });
};

export const updateUser = async (authtoken, data) => {
  return await api.post(`/update`, data, {
    headers: {
      authtoken,
    },
  });
};

export const getUserOrders = async (authtoken) => {
  return await api.post(
    `/get-orders`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const uploadImage = async (authtoken, uri) => {
  return await api.post(
    `/upload-image`,
    {
      uri,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};
