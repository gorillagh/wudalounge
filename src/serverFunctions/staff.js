import { api } from "./index";

export const getDashboardBriefs = async (authtoken) => {
  return await api.post(
    `/staff/dashboard-briefs`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getAllOrders = async (authtoken) => {
  return await api.post(
    "/staff/orders",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getAllReports = async (authtoken) => {
  return await api.post(
    "/staff/reports",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
