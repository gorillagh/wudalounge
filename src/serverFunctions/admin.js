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

export const getRevenueChartData = async (authtoken, filter) => {
  return await api.post(`/admin/revenue-chart-data`, filter, {
    headers: {
      authtoken,
    },
  });
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

export const getUsers = async (authtoken) => {
  return await api.post(
    "/admin/users",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const updateUser = async (authtoken, userId, data) => {
  return await api.post(`/admin/user-update/${userId}`, data, {
    headers: {
      authtoken,
    },
  });
};
