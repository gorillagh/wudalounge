import { api } from "./index";

export const getDashboardBriefs = async (authtoken) => {
  return await api.post(
    `/admin/dashboard-briefs`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const uploadDishImage = async (authtoken, uri) => {
  return await api.post(
    `/admin/upload-dish-image`,
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

export const getDishSubs = async (authtoken) => {
  return await api.post(
    `/admin/get-dish-subs`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createMenu = async (authtoken, type, data) => {
  return await api.post(
    `/admin/create-menu`,
    {
      type,
      data,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getAllOrders = async (authtoken) => {
  return await api.post(
    "/admin/orders",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
